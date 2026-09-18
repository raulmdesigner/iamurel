-- IAMUREL repair: execute once in Supabase SQL Editor (safe to repeat).
-- Existing content is preserved. Only IAMUREL tables and its upload prefix change.
BEGIN;
ALTER TABLE public.iamurel_site_settings
  ADD COLUMN IF NOT EXISTS contact_phone text,
  ADD COLUMN IF NOT EXISTS whatsapp_number text,
  ADD COLUMN IF NOT EXISTS instagram_handle text,
  ADD COLUMN IF NOT EXISTS linkedin_url text,
  ADD COLUMN IF NOT EXISTS company_info text,
  ADD COLUMN IF NOT EXISTS terms_of_use text,
  ADD COLUMN IF NOT EXISTS privacy_policy text;
CREATE TABLE IF NOT EXISTS public.iamurel_appearance (id uuid PRIMARY KEY DEFAULT gen_random_uuid());
ALTER TABLE public.iamurel_appearance
  ADD COLUMN IF NOT EXISTS primary_color text DEFAULT '#14171A',
  ADD COLUMN IF NOT EXISTS action_color text DEFAULT '#FF4A1C',
  ADD COLUMN IF NOT EXISTS bg_tone text DEFAULT 'neutral_white',
  ADD COLUMN IF NOT EXISTS border_style text DEFAULT 'minimal',
  ADD COLUMN IF NOT EXISTS motion_level text DEFAULT 'balanced',
  ADD COLUMN IF NOT EXISTS font_pairing text DEFAULT 'contemporary',
  ADD COLUMN IF NOT EXISTS hero_video_url text,
  ADD COLUMN IF NOT EXISTS hero_image_1_url text,
  ADD COLUMN IF NOT EXISTS hero_image_2_url text,
  ADD COLUMN IF NOT EXISTS hero_image_3_url text,
  ADD COLUMN IF NOT EXISTS enable_3d boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS enable_text_banner boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS enable_faq boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS enable_showcase boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS enable_services boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS enable_clients boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS enable_packages boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS enable_contact_form boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
ALTER TABLE public.iamurel_package_items ADD COLUMN IF NOT EXISTS is_included boolean DEFAULT true;
-- The CMS allows custom plan names; the historical enum rejected renaming.
ALTER TABLE public.iamurel_packages ALTER COLUMN level TYPE text USING level::text;
ALTER TABLE public.iamurel_showcases
  ADD COLUMN IF NOT EXISTS type text,
  ADD COLUMN IF NOT EXISTS slides jsonb,
  ADD COLUMN IF NOT EXISTS specimens jsonb;

CREATE TABLE IF NOT EXISTS public.iamurel_admins (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);
ALTER TABLE public.iamurel_admins ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.iamurel_admins FROM anon, authenticated;
INSERT INTO public.iamurel_admins(user_id)
  SELECT id FROM auth.users WHERE lower(email) = 'raul@portfolio.com'
  ON CONFLICT DO NOTHING;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.iamurel_admins) THEN
    RAISE EXCEPTION 'Crie o usuário administrador no Supabase Authentication antes de continuar.';
  END IF;
END $$;
CREATE OR REPLACE FUNCTION public.iamurel_is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $$ SELECT EXISTS (SELECT 1 FROM public.iamurel_admins WHERE user_id = (SELECT auth.uid())); $$;
REVOKE ALL ON FUNCTION public.iamurel_is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.iamurel_is_admin() TO anon, authenticated;

-- Replace permissive policies only on the IAMUREL tables.
DO $$
DECLARE t text; p record;
BEGIN
  FOREACH t IN ARRAY ARRAY['iamurel_site_settings','iamurel_appearance','iamurel_services',
    'iamurel_packages','iamurel_package_items','iamurel_showcases','iamurel_faq',
    'iamurel_leads','iamurel_lead_notes','iamurel_lead_events','iamurel_tasks','iamurel_audit_log']
  LOOP
    IF to_regclass('public.' || t) IS NULL THEN CONTINUE; END IF;
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    FOR p IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = t LOOP
      EXECUTE format('DROP POLICY %I ON public.%I', p.policyname, t);
    END LOOP;
    EXECUTE format('CREATE POLICY iamurel_admin ON public.%I FOR ALL TO authenticated USING (public.iamurel_is_admin()) WITH CHECK (public.iamurel_is_admin())', t);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('REVOKE ALL ON public.%I FROM anon', t);
  END LOOP;
  FOREACH t IN ARRAY ARRAY['iamurel_site_settings','iamurel_appearance','iamurel_showcases','iamurel_faq'] LOOP
    EXECUTE format('CREATE POLICY iamurel_public_read ON public.%I FOR SELECT TO anon, authenticated USING (true)', t);
    EXECUTE format('GRANT SELECT ON public.%I TO anon', t);
  END LOOP;
END $$;
CREATE POLICY iamurel_public_read ON public.iamurel_services FOR SELECT TO anon, authenticated USING (status = 'active');
CREATE POLICY iamurel_public_read ON public.iamurel_packages FOR SELECT TO anon, authenticated USING (status = 'active');
CREATE POLICY iamurel_public_read ON public.iamurel_package_items FOR SELECT TO anon, authenticated USING (
  EXISTS (SELECT 1 FROM public.iamurel_packages p WHERE p.id = package_id AND p.status = 'active')
);
GRANT SELECT ON public.iamurel_services, public.iamurel_packages, public.iamurel_package_items TO anon;
GRANT INSERT ON public.iamurel_leads TO anon;
CREATE POLICY iamurel_public_submit ON public.iamurel_leads FOR INSERT TO anon, authenticated WITH CHECK (
  consent = true AND status = 'novo' AND priority = 'medium'
  AND length(trim(name)) BETWEEN 1 AND 200 AND length(trim(phone)) BETWEEN 1 AND 50
  AND assigned_to IS NULL AND last_contact_at IS NULL AND next_follow_up_at IS NULL
);

-- Atomic CMS list saves, including removals and package items.
CREATE OR REPLACE FUNCTION public.iamurel_replace_collection(target_table text, rows jsonb)
RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path = ''
AS $$
DECLARE row_data jsonb; cols text; updates text; item_data jsonb;
BEGIN
  IF NOT public.iamurel_is_admin() THEN RAISE EXCEPTION 'Acesso negado' USING ERRCODE = '42501'; END IF;
  IF target_table NOT IN ('iamurel_services','iamurel_packages','iamurel_showcases','iamurel_faq') THEN
    RAISE EXCEPTION 'Coleção inválida';
  END IF;
  IF rows IS NULL OR jsonb_typeof(rows) <> 'array' THEN RAISE EXCEPTION 'Lista inválida'; END IF;
  IF EXISTS (SELECT 1 FROM jsonb_array_elements(rows) x WHERE jsonb_typeof(x) <> 'object' OR coalesce(x->>'id','') = '') THEN
    RAISE EXCEPTION 'Registro sem identificador';
  END IF;
  IF (SELECT count(*) FROM jsonb_array_elements(rows)) <>
     (SELECT count(DISTINCT x->>'id') FROM jsonb_array_elements(rows) x) THEN RAISE EXCEPTION 'Identificadores duplicados'; END IF;
  PERFORM pg_advisory_xact_lock(hashtext('iamurel:' || target_table));
  EXECUTE format('DELETE FROM public.%I WHERE id::text NOT IN (SELECT x->>''id'' FROM jsonb_array_elements($1) x)', target_table) USING rows;
  FOR row_data IN SELECT value FROM jsonb_array_elements(rows) LOOP
    SELECT string_agg(format('%I', a.attname), ', ' ORDER BY a.attnum),
           string_agg(format('%I = EXCLUDED.%I', a.attname, a.attname), ', ' ORDER BY a.attnum) FILTER (WHERE a.attname <> 'id')
      INTO cols, updates
      FROM pg_attribute a
      WHERE a.attrelid = to_regclass('public.' || target_table) AND a.attnum > 0 AND NOT a.attisdropped
        AND row_data ? a.attname AND a.attname <> 'items';
    IF updates IS NULL THEN RAISE EXCEPTION 'Registro incompleto'; END IF;
    EXECUTE format('INSERT INTO public.%I (%s) SELECT %s FROM jsonb_populate_record(NULL::public.%I, $1) ON CONFLICT (id) DO UPDATE SET %s',
      target_table, cols, cols, target_table, updates) USING row_data;
    IF target_table = 'iamurel_packages' THEN
      IF jsonb_typeof(coalesce(row_data->'items', '[]'::jsonb)) <> 'array' THEN RAISE EXCEPTION 'Itens inválidos'; END IF;
      DELETE FROM public.iamurel_package_items WHERE package_id::text = row_data->>'id';
      FOR item_data IN SELECT value FROM jsonb_array_elements(coalesce(row_data->'items', '[]'::jsonb)) LOOP
        INSERT INTO public.iamurel_package_items(id, package_id, title, quantity, order_index, is_included)
        VALUES ((item_data->>'id')::uuid, (row_data->>'id')::uuid, item_data->>'title',
          item_data->>'quantity', coalesce((item_data->>'order_index')::integer,0),
          coalesce((item_data->>'is_included')::boolean,true));
      END LOOP;
    END IF;
  END LOOP;
END $$;
REVOKE ALL ON FUNCTION public.iamurel_replace_collection(text,jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.iamurel_replace_collection(text,jsonb) TO authenticated;

INSERT INTO storage.buckets(id, name, public) VALUES ('media','media',true) ON CONFLICT (id) DO NOTHING;
DROP POLICY IF EXISTS iamurel_media_read ON storage.objects;
DROP POLICY IF EXISTS iamurel_media_upload ON storage.objects;
CREATE POLICY iamurel_media_read ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'media' AND (storage.foldername(name))[1] = 'iamurel');
CREATE POLICY iamurel_media_upload ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND (storage.foldername(name))[1] = 'iamurel' AND public.iamurel_is_admin());
-- Restrictive policy protects the new prefix even if an older shared policy
-- grants public uploads. Other sites' storage paths retain their permissions.
DROP POLICY IF EXISTS iamurel_media_guard_insert ON storage.objects;
CREATE POLICY iamurel_media_guard_insert ON storage.objects AS RESTRICTIVE FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id <> 'media' OR (storage.foldername(name))[1] IS DISTINCT FROM 'iamurel' OR public.iamurel_is_admin());
DROP POLICY IF EXISTS iamurel_media_guard_update ON storage.objects;
CREATE POLICY iamurel_media_guard_update ON storage.objects AS RESTRICTIVE FOR UPDATE TO anon, authenticated
USING (bucket_id <> 'media' OR (storage.foldername(name))[1] IS DISTINCT FROM 'iamurel' OR public.iamurel_is_admin())
WITH CHECK (bucket_id <> 'media' OR (storage.foldername(name))[1] IS DISTINCT FROM 'iamurel' OR public.iamurel_is_admin());
DROP POLICY IF EXISTS iamurel_media_guard_delete ON storage.objects;
CREATE POLICY iamurel_media_guard_delete ON storage.objects AS RESTRICTIVE FOR DELETE TO anon, authenticated
USING (bucket_id <> 'media' OR (storage.foldername(name))[1] IS DISTINCT FROM 'iamurel' OR public.iamurel_is_admin())
;
COMMIT;
NOTIFY pgrst, 'reload schema';
