-- IAMUREL SUPABASE INITIALIZATION SCRIPT

-- 1. Tabela de Configurações do Site
CREATE TABLE IF NOT EXISTS iamurel_site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  description TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  primary_cta_text TEXT,
  secondary_cta_text TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  whatsapp_number TEXT,
  instagram_handle TEXT,
  linkedin_url TEXT,
  company_info TEXT,
  terms_of_use TEXT,
  privacy_policy TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Tabela de Serviços (Especialidades)
CREATE TABLE IF NOT EXISTS iamurel_services (
  id TEXT PRIMARY KEY,
  title TEXT,
  problem_solved TEXT,
  deliverables TEXT,
  target_audience TEXT,
  not_included TEXT,
  timeframe TEXT,
  investment_range TEXT,
  image_url TEXT,
  order_index INTEGER,
  status TEXT
);

-- 3. Tabela de Pacotes (Planos)
CREATE TABLE IF NOT EXISTS iamurel_packages (
  id TEXT PRIMARY KEY,
  level TEXT,
  commercial_role TEXT,
  description TEXT,
  price NUMERIC,
  price_type TEXT,
  timeframe TEXT,
  revisions TEXT,
  is_highlighted BOOLEAN,
  order_index INTEGER,
  status TEXT,
  items JSONB
);

-- 4. Tabela de Aparência (Customizações)
CREATE TABLE IF NOT EXISTS iamurel_appearance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_color TEXT,
  action_color TEXT,
  bg_tone TEXT,
  border_style TEXT,
  motion_level TEXT,
  font_pairing TEXT,
  hero_video_url TEXT,
  hero_image_1_url TEXT,
  hero_image_2_url TEXT,
  hero_image_3_url TEXT,
  enable_3d BOOLEAN,
  enable_text_banner BOOLEAN,
  enable_faq BOOLEAN,
  enable_showcase BOOLEAN,
  enable_services BOOLEAN,
  enable_clients BOOLEAN,
  enable_packages BOOLEAN,
  enable_contact_form BOOLEAN,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Bucket de Mídia
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'media' );

CREATE POLICY "Public Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'media' );


-- 6. Tabela de FAQ
CREATE TABLE IF NOT EXISTS iamurel_faq (
  id TEXT PRIMARY KEY,
  question TEXT,
  answer TEXT,
  order_index INTEGER
);

-- 7. Tabela de Portfólio (Showcase)
CREATE TABLE IF NOT EXISTS iamurel_showcase (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  image_url TEXT,
  type TEXT,
  order_index INTEGER
);

-- 8. Tabela de Leads
CREATE TABLE IF NOT EXISTS iamurel_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  contact_info TEXT,
  service_interest TEXT,
  message TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
