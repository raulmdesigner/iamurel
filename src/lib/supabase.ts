/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';
const url = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const key = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
export let configurationError = '';
export const supabase = (() => {
  if (!url || !key) {
    configurationError = 'Configure VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env e gere o site novamente.';
    return null;
  }
  try {
    if (key.startsWith('sb_secret_')) throw new Error('Use somente a chave pública do Supabase.');
    if (key.startsWith('eyJ') && JSON.parse(atob(key.split('.')[1])).role !== 'anon') throw new Error('Use a chave anon ou publishable, nunca service_role.');
    return createClient(url, key, {
      auth: { storageKey: 'iamurel-auth', persistSession: true, autoRefreshToken: true },
      global: { fetch: (input, init) => fetch(input, {
        ...init, signal: init?.signal ? AbortSignal.any([init.signal, AbortSignal.timeout(15000)]) : AbortSignal.timeout(15000),
      }) },
    });
  } catch (error) {
    configurationError = error instanceof Error ? error.message : 'Configuração do Supabase inválida.';
    return null;
  }
})();
export const isSupabaseConfigured = Boolean(supabase);
export function getActiveSupabaseConfig() { return { url, key, source: isSupabaseConfigured ? 'env' : 'none' }; }

export async function uploadMediaToSupabase(file: File, bucket = 'media'): Promise<{ url: string | null; error: string | null }> {
  if (!supabase) return { url: null, error: configurationError };
  try {
    if (!/^(image|video)\//.test(file.type)) throw new Error('Escolha uma imagem ou vídeo.');
    if (file.size > 50 * 1024 * 1024) throw new Error('O arquivo deve ter no máximo 50 MB.');
    const extension = file.name.split('.').pop()?.replace(/[^a-z0-9]/gi, '') || 'bin';
    const path = 'iamurel/' + crypto.randomUUID() + '.' + extension;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
    if (error) throw error;
    return { url: supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl, error: null };
  } catch (error: any) { return { url: null, error: error.message }; }
}
