import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Lock, LogIn, AlertCircle } from 'lucide-react';
import { IamurelSymbol } from '../brand/IamurelBrand';

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if already logged in
    supabase?.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        onLogin();
      }
    });
  }, [onLogin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError('Supabase não está configurado.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const [setupUrl, setSetupUrl] = useState('');
  const [setupKey, setSetupKey] = useState('');
  const [setupError, setSetupError] = useState<string | null>(null);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetupError(null);
    try {
      const { reconfigureSupabase } = await import('../../lib/supabase');
      const res = reconfigureSupabase(setupUrl, setupKey);
      if (res.success) {
        window.location.reload();
      } else {
        setSetupError(res.error || 'Erro de configuração.');
      }
    } catch (err) {
      setSetupError('Erro ao carregar o módulo.');
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface border border-border p-8 rounded-2xl shadow-xl space-y-6">
          <div className="text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-action mx-auto" />
            <h2 className="text-xl font-display font-bold text-text">Conectar ao Supabase</h2>
            <p className="text-sm text-muted">
              Como você está em um ambiente estático, insira as credenciais do seu projeto Supabase para habilitar o painel.
            </p>
          </div>

          <form onSubmit={handleSetup} className="space-y-4">
            {setupError && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {setupError}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-text mb-1.5 uppercase tracking-wider">Project URL</label>
              <input
                type="url"
                required
                value={setupUrl}
                onChange={(e) => setSetupUrl(e.target.value)}
                className="w-full px-4 py-2.5 bg-bg border border-border rounded-lg text-sm focus:border-action outline-none transition-all"
                placeholder="https://sua-url.supabase.co"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-text mb-1.5 uppercase tracking-wider">Anon / Public Key</label>
              <input
                type="password"
                required
                value={setupKey}
                onChange={(e) => setSetupKey(e.target.value)}
                className="w-full px-4 py-2.5 bg-bg border border-border rounded-lg text-sm focus:border-action outline-none transition-all font-mono"
                placeholder="eyJh..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-text hover:bg-black text-bg rounded-lg font-bold text-sm transition-all"
            >
              Conectar Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <IamurelSymbol className="w-16 h-16 mx-auto mb-6 text-action" />
          <h1 className="text-2xl font-display font-bold text-text">Acesso Restrito</h1>
          <p className="text-sm text-muted mt-2">Painel de Administração IAMUREL</p>
        </div>

        <form onSubmit={handleLogin} className="bg-surface border border-border p-8 rounded-2xl shadow-xl space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex gap-3 items-start">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-text mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-sm focus:border-action focus:ring-1 focus:ring-action outline-none transition-all"
                placeholder="admin@iamurel.com"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-text mb-1.5 uppercase tracking-wider">Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-bg border border-border rounded-lg text-sm focus:border-action focus:ring-1 focus:ring-action outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-action hover:bg-action-hover text-white rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={18} />
                <span>Entrar no Painel</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
