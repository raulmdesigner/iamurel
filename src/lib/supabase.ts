/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';

function getSupabaseCredentials() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  
  if (typeof window !== 'undefined') {
    const localUrl = localStorage.getItem('iamurel_supabase_url');
    const localKey = localStorage.getItem('iamurel_supabase_key');
    if (localUrl && localKey && localUrl.startsWith('http')) {
      return { url: localUrl, key: localKey, source: 'localStorage' as const };
    }
  }

  if (envUrl && envKey && !envUrl.includes('your-project-id')) {
    return { url: envUrl, key: envKey, source: 'env' as const };
  }

  return { url: '', key: '', source: 'none' as const };
}

const credentials = getSupabaseCredentials();

export const isSupabaseConfigured = Boolean(credentials.url && credentials.key);

export let supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(credentials.url, credentials.key)
  : null;

export function reconfigureSupabase(url: string, key: string): { success: boolean; error?: string } {
  try {
    if (!url || !key) {
      localStorage.removeItem('iamurel_supabase_url');
      localStorage.removeItem('iamurel_supabase_key');
      supabase = null;
      return { success: true };
    }
    
    if (!url.startsWith('https://')) {
      return { success: false, error: 'A URL do Supabase deve começar com https://' };
    }

    const testClient = createClient(url, key);
    supabase = testClient;
    localStorage.setItem('iamurel_supabase_url', url);
    localStorage.setItem('iamurel_supabase_key', key);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Falha ao conectar cliente Supabase' };
  }
}

export function getActiveSupabaseConfig() {
  return getSupabaseCredentials();
}
