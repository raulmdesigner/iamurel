import React, { useState } from 'react';
import { supabase, configurationError } from '../../lib/supabase';
import { withTimeout } from '../../lib/errors';
import { IamurelSymbol } from '../brand/IamurelBrand';

export function AdminLogin({ onLogin, sessionError }: { onLogin: () => void; sessionError?: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase || loading) return;
    setLoading(true); setError('');
    try {
      const { data, error } = await withTimeout(supabase.auth.signInWithPassword({ email: email.trim(), password }));
      if (error) throw error;
      if (!data.session) throw new Error('Não foi possível iniciar a sessão.');
      onLogin();
    } catch (error: any) {
      setError(error.message === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : error.message);
    } finally { setLoading(false); }
  }
  return <main className="min-h-screen bg-bg flex items-center justify-center p-6">
    <form onSubmit={handleLogin} className="max-w-md w-full bg-surface border border-border p-8 rounded-2xl shadow-xl space-y-6">
      <IamurelSymbol className="w-16 h-16 mx-auto text-action" />
      <h1 className="text-2xl text-center font-bold">Painel IAMUREL</h1>
      {(error || sessionError || configurationError) && <p role="alert" className="p-4 bg-red-50 text-red-800 rounded">{error || sessionError || configurationError}</p>}
      <label className="block">E-mail<input aria-label="E-mail" autoComplete="username" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full border rounded p-3" /></label>
      <label className="block">Senha<input aria-label="Senha" autoComplete="current-password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full border rounded p-3" /></label>
      <button disabled={loading || !supabase} className="w-full bg-action text-white rounded p-3 disabled:opacity-50">{loading ? 'Entrando...' : 'Entrar no painel'}</button>
      <a className="block text-center text-sm underline" href={import.meta.env.BASE_URL}>Voltar ao site</a>
    </form>
  </main>;
}
