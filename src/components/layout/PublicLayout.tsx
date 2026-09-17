import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { dataLayer } from '../../lib/data';
import { SiteSettings } from '../../types';
import { X, FileText, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export default function PublicLayout() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);

  useEffect(() => {
    dataLayer.getSettings().then(setSettings);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-body bg-bg text-text selection:bg-action selection:text-white">
      {/* Editorial Header */}
      <header className="w-full border-b border-border bg-bg/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="text-2xl md:text-3xl font-display font-bold tracking-tight text-text group-hover:text-action transition-colors">
              IAMUREL
            </span>
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-muted border-l border-border pl-3 font-medium">
              Direção Criativa & Conteúdo
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-text/80">
            <a href="#proposta" className="hover:text-action transition-colors">O Problema</a>
            <a href="#metodo" className="hover:text-action transition-colors">Método & Processo</a>
            <a href="#demonstracoes" className="hover:text-action transition-colors">Mostruário Tangível</a>
            <a href="#servicos" className="hover:text-action transition-colors">Especialidades</a>
            <a href="#pacotes" className="hover:text-action transition-colors">Pacotes</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contato"
              className="bg-action hover:bg-action-hover text-white px-5 py-2.5 rounded text-sm font-medium transition-all shadow-sm active:scale-[0.98]"
            >
              Iniciar Conversa
            </a>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* High-End Editorial Footer */}
      <footer className="bg-text text-bg border-t border-text/10 pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-bg/10">
            {/* Coluna Marca */}
            <div className="md:col-span-5 space-y-4">
              <Link to="/" className="text-3xl font-display font-bold tracking-tight inline-block text-bg">
                IAMUREL
              </Link>
              <p className="text-bg/70 text-sm leading-relaxed max-w-md">
                Aceleramos a pesquisa e desdobramento com inteligência artificial, mas mantemos o contexto, a curadoria e a direção de arte estritamente humanas. Construído para marcas que exigem presença autoral e intenção comercial.
              </p>
              {settings?.company_info && (
                <p className="text-xs text-bg/40 pt-2">{settings.company_info}</p>
              )}
            </div>

            {/* Coluna Navegação */}
            <div className="md:col-span-3 space-y-3">
              <p className="text-xs uppercase tracking-widest text-bg/50 font-bold mb-4">Navegação Rápida</p>
              <ul className="space-y-2.5 text-sm text-bg/80">
                <li><a href="#proposta" className="hover:text-action transition-colors">O Diagnóstico Real</a></li>
                <li><a href="#metodo" className="hover:text-action transition-colors">Como Trabalhamos</a></li>
                <li><a href="#demonstracoes" className="hover:text-action transition-colors">Mostruário Tangível</a></li>
                <li><a href="#servicos" className="hover:text-action transition-colors">Especialidades & Escopos</a></li>
                <li><a href="#pacotes" className="hover:text-action transition-colors">Pacotes Comerciais</a></li>
              </ul>
            </div>

            {/* Coluna Contato & Transparência */}
            <div className="md:col-span-4 space-y-4">
              <p className="text-xs uppercase tracking-widest text-bg/50 font-bold mb-4">Canais Diretos</p>
              <div className="space-y-3 text-sm">
                <a
                  href={`mailto:${settings?.contact_email || 'contato@iamurel.com'}`}
                  className="flex items-center gap-2 text-bg/80 hover:text-action transition-colors"
                >
                  <Mail size={16} />
                  <span>{settings?.contact_email || 'contato@iamurel.com'}</span>
                </a>
                {settings?.whatsapp_number && (
                  <a
                    href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto%20com%20a%20IAMUREL.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-bg/80 hover:text-action transition-colors"
                  >
                    <span>Falar via WhatsApp Comercial</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
              <div className="pt-4 flex items-center gap-6 text-xs text-bg/60">
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-bg transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Termos de Uso
                </button>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-bg transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Política de Privacidade (LGPD)
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bg/50">
            <p>© {new Date().getFullYear()} IAMUREL. Todos os direitos reservados. Sem atalhos, sem AI slop.</p>
            <p>Design com intenção. Conteúdo com direção.</p>
          </div>
        </div>
      </footer>

      {/* Modal: Termos de Uso */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface text-text max-w-2xl w-full max-h-[85vh] rounded-lg border border-border shadow-2xl flex flex-col overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between bg-bg/50">
              <div className="flex items-center gap-2.5">
                <FileText size={20} className="text-action" />
                <h3 className="text-xl font-display font-bold">Termos de Uso & Prestação de Serviço</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded hover:bg-border/60 transition-colors text-muted hover:text-text"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-sm leading-relaxed text-muted">
              {settings?.terms_of_use?.split('\n').map((line, idx) => (
                <p key={idx} className="text-text/90">{line}</p>
              )) || (
                <p>Termos de serviço em atualização.</p>
              )}
            </div>
            <div className="p-4 border-t border-border bg-bg flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-text text-bg rounded text-xs font-medium hover:bg-text/90 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Política de Privacidade */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface text-text max-w-2xl w-full max-h-[85vh] rounded-lg border border-border shadow-2xl flex flex-col overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between bg-bg/50">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-trust" />
                <h3 className="text-xl font-display font-bold">Política de Privacidade & LGPD</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded hover:bg-border/60 transition-colors text-muted hover:text-text"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-sm leading-relaxed text-muted">
              {settings?.privacy_policy?.split('\n').map((line, idx) => (
                <p key={idx} className="text-text/90">{line}</p>
              )) || (
                <p>Política de privacidade em conformidade com a Lei 13.709/2018 (LGPD).</p>
              )}
            </div>
            <div className="p-4 border-t border-border bg-bg flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-text text-bg rounded text-xs font-medium hover:bg-text/90 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
