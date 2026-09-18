import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  LayoutTemplate,
  Palette,
  Database,
  ExternalLink,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';
import { AdminLogin } from '../auth/AdminLogin';
import { withTimeout, errorMessage } from '../../lib/errors';

const navItems = [
  { label: 'Visão Geral', path: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Pipeline de Leads', path: '/admin/leads', icon: Users, end: false },
  { label: 'Conteúdo & Seções', path: '/admin/content', icon: LayoutTemplate, end: false },
  { label: 'Aparência & Estilo', path: '/admin/appearance', icon: Palette, end: false },
  { label: 'Banco & Backups', path: '/admin/database', icon: Database, end: false }
];

export default function AdminLayout() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!supabase) { setIsCheckingAuth(false); return; }
    let active = true;
    let revision = 0;
    const applySession = async (session: unknown) => {
      const request = ++revision;
      try {
        if (!session) {
          if (active) setIsAuthenticated(false);
          return;
        }
        const { data, error } = await withTimeout(supabase!.rpc('iamurel_is_admin'));
        if (error) throw new Error('A configuração de acesso do IAMUREL precisa ser atualizada no Supabase. Execute a migração fornecida.');
        if (!data) throw new Error('Este usuário não tem permissão de administrador do IAMUREL.');
        if (active && request === revision) { setIsAuthenticated(true); setAuthError(''); }
      } catch (error) {
        if (active && request === revision) { setIsAuthenticated(false); setAuthError(errorMessage(error)); }
      } finally {
        if (active && request === revision) setIsCheckingAuth(false);
      }
    };
    // Defer database calls outside the auth callback to avoid the auth lock.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => { if (active) void applySession(session); }, 0);
    });
    const timer = setTimeout(() => {
      if (active) { setIsCheckingAuth(false); setAuthError('Não foi possível verificar a sessão. Tente entrar novamente.'); }
    }, 16000);
    withTimeout(supabase.auth.getSession()).then(({ data, error }) => {
      if (error) throw error;
      return applySession(data.session);
    }).catch(error => {
      if (active) { setAuthError(errorMessage(error)); setIsCheckingAuth(false); }
    }).finally(() => clearTimeout(timer));
    return () => { active = false; clearTimeout(timer); subscription.unsubscribe(); };
  }, []);

  const handleLogout = async () => {
    if (supabase) {
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error) { alert(error.message); return; }
      setIsAuthenticated(false);
    }
  };

  if (isCheckingAuth) {
    return <div className="min-h-screen bg-bg flex items-center justify-center">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLogin sessionError={authError} onLogin={() => setAuthError('')} />;
  }

  const currentNav = navItems.find(item =>
    item.end ? location.pathname === item.path : location.pathname.startsWith(item.path)
  ) || navItems[0];

  return (
    <div className="min-h-screen bg-bg flex flex-col md:flex-row font-body text-text">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface border-r border-border flex flex-col md:min-h-screen shrink-0">
        <div className="h-20 flex items-center justify-between px-6 border-b border-border">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="text-xl font-display font-bold tracking-tight text-text">IAMUREL</span>
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold px-2 py-0.5 bg-bg border border-border rounded text-action">
              Gestão
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map(item => {
            const isActive = item.end
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-text text-bg shadow-xs'
                    : 'text-muted hover:bg-bg hover:text-text'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer da Sidebar com Acesso ao Site Público */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="p-3 bg-bg border border-border rounded text-[11px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-muted font-mono uppercase text-[9px]">Sincronização</span>
              <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500' : 'bg-blue-500'}`} />
            </div>
            <p className="text-text font-medium truncate">
              {isSupabaseConfigured ? 'Supabase Nuvem' : 'Armazenamento Local'}
            </p>
          </div>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-muted hover:text-action transition-colors rounded border border-transparent hover:border-border"
          >
            <span>Ver Site Público</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-20 bg-surface border-b border-border flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span>IAMUREL</span>
            <ChevronRight size={14} />
            <span className="font-semibold text-text">{currentNav.label}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-xs font-semibold text-muted hover:text-action flex items-center gap-1 transition-colors"
            >
              <span>Abrir Página Pública</span>
              <ExternalLink size={12} />
            </Link>
            
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors border-l border-border pl-6"
            >
              <span>Sair</span>
              <LogOut size={12} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-bg/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

