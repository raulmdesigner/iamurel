import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { dataLayer } from '../../lib/data';
import { SiteSettings } from '../../types';
import { X, FileText, ShieldCheck, Mail, ArrowUpRight, Menu, MessageCircle } from 'lucide-react';
import { IamurelLogo } from '../brand/IamurelBrand';

export default function PublicLayout() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const handlePointerDown = () => {
    pressTimer.current = setTimeout(() => {
      navigate('/admin');
    }, 6000);
  };

  const handlePointerUp = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  useEffect(() => {
    dataLayer.getSettings().then(setSettings);
  }, []);

  const whatsappLink = settings?.whatsapp_number
    ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20o%20conte%C3%BAdo%20e%20design%20da%20minha%20marca%20com%20a%20IAMUREL.`
    : '#contato';

  return (
    <div className="min-h-screen flex flex-col font-body bg-bg text-text selection:bg-action selection:text-white">
      {/* 1. Header Compacto */}
      <header className="w-full border-b border-border bg-surface/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <IamurelLogo className="h-7 sm:h-8 text-text group-hover:text-action transition-colors" />
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-muted border-l border-border pl-3 font-semibold">
              Conteúdo & Identidade Visual
            </span>
          </Link>

          {/* Links Principais: Serviços, Portfólio, Como funciona, Pacotes */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-wider font-semibold text-text/80">
            <a href="#como-funciona" className="hover:text-action transition-colors">Como funciona</a>
            <a href="#portfolio" className="hover:text-action transition-colors">Portfólio</a>
            <a href="#pacotes" className="hover:text-action transition-colors">Pacotes & Serviços</a>
          </nav>

          {/* Botão Primário Único */}
          <div className="flex items-center gap-3">
            <a
              href="#contato"
              className="bg-action hover:bg-action-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-[0.98]"
            >
              Falar com a IAMUREL
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-bg text-text transition-colors cursor-pointer"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface px-6 py-5 space-y-4 text-sm font-semibold shadow-xl">
            <a
              href="#servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-text hover:text-action py-1"
            >
              Serviços
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-text hover:text-action py-1"
            >
              Portfólio
            </a>
            <a
              href="#como-funciona"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-text hover:text-action py-1"
            >
              Como funciona
            </a>
            <div className="pt-3 border-t border-border">
              <a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-3 bg-action text-white rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                Falar com a IAMUREL
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Conteúdo Principal da Página */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Botão Fixo Discreto no Mobile (WhatsApp / Contato Direto) */}
      <div className="sm:hidden fixed bottom-4 right-4 z-40">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-action hover:bg-action-hover text-white px-4 py-3 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider"
        >
          <MessageCircle size={17} />
          <span>Falar com a IAMUREL</span>
        </a>
      </div>

      {/* 12. Footer com Contato, WhatsApp, LGPD e Termos */}
      <footer className="bg-dark text-bg/90 border-t border-border-dark pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border-dark/80">
            {/* Coluna Marca & Propósito */}
            <div className="md:col-span-5 space-y-4">
              <Link to="/" className="inline-block text-white group">
                <IamurelLogo className="h-8 group-hover:opacity-90 transition-opacity" color="white" />
              </Link>
              <p className="text-bg/70 text-sm leading-relaxed max-w-sm">
                Conteúdo e identidade visual para negócios que precisam parecer tão bons quanto realmente são. Velocidade de inteligência artificial com direção criativa e acabamento 100% humanos.
              </p>
              {settings?.company_info && (
                <p className="text-xs text-bg/40">{settings.company_info}</p>
              )}
            </div>

            {/* Coluna Navegação Rápida */}
            <div className="md:col-span-3 space-y-3">
              <p className="text-xs uppercase tracking-wider text-bg/50 font-bold mb-3">Navegação</p>
              <ul className="space-y-2 text-sm text-bg/80">
                <li><a href="#servicos" className="hover:text-action transition-colors">Serviços & Categorias</a></li>
                <li><a href="#portfolio" className="hover:text-action transition-colors">Portfólio por Aplicação</a></li>
                <li><a href="#como-funciona" className="hover:text-action transition-colors">Como a IA e a Direção Atuam</a></li>
                <li><a href="#planos" className="hover:text-action transition-colors">Opções Comerciais</a></li>
                <li><a href="#faq" className="hover:text-action transition-colors">Perguntas Frequentes</a></li>
              </ul>
            </div>

            {/* Coluna Contato & Segurança Legal */}
            <div className="md:col-span-4 space-y-4">
              <p className="text-xs uppercase tracking-wider text-bg/50 font-bold mb-3">Canais Diretos</p>
              <div className="space-y-2.5 text-sm">
                <a
                  href={`mailto:${settings?.contact_email || 'iamurelbrasil@gmail.com'}`}
                  className="flex items-center gap-2 text-bg/80 hover:text-action transition-colors"
                >
                  <Mail size={16} />
                  <span>{settings?.contact_email || 'iamurelbrasil@gmail.com'}</span>
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-action font-semibold hover:underline"
                >
                  <MessageCircle size={16} />
                  <span>Conversar no WhatsApp Comercial</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-bg/60">
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Termos de Uso
                </button>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Política de Privacidade (LGPD)
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bg/50">
            <p 
              onPointerDown={handlePointerDown} 
              onPointerUp={handlePointerUp} 
              onPointerLeave={handlePointerUp}
              className="cursor-text select-none"
            >
              IAMUREL™ {new Date().getFullYear()}. Todos os direitos reservados. Sem atalhos, sem AI slop.
            </p>
            
            <div className="flex items-center gap-4">
              <span>Conteúdo com direção. Design com intenção.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal: Termos de Uso */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface text-text max-w-2xl w-full max-h-[85vh] rounded-xl border border-border shadow-2xl flex flex-col overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between bg-bg/60">
              <div className="flex items-center gap-2.5">
                <FileText size={20} className="text-action" />
                <h3 className="text-xl font-display font-bold">Termos de Uso & Prestação de Serviço</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded hover:bg-border/60 transition-colors text-muted hover:text-text cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-sm leading-relaxed text-muted">
              {settings?.terms_of_use?.split('\n').map((line, idx) => (
                <p key={idx} className="text-text/90">{line}</p>
              )) || (
                <p>Termos de serviço em conformidade com as diretrizes comerciais da IAMUREL.</p>
              )}
            </div>
            <div className="p-4 border-t border-border bg-bg flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-text text-white rounded-lg text-xs font-semibold hover:bg-text/90 transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Política de Privacidade (LGPD) */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface text-text max-w-2xl w-full max-h-[85vh] rounded-xl border border-border shadow-2xl flex flex-col overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between bg-bg/60">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-trust" />
                <h3 className="text-xl font-display font-bold">Política de Privacidade & LGPD</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded hover:bg-border/60 transition-colors text-muted hover:text-text cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-sm leading-relaxed text-muted">
              {settings?.privacy_policy?.split('\n').map((line, idx) => (
                <p key={idx} className="text-text/90">{line}</p>
              )) || (
                <p>Os dados coletados destinam-se exclusivamente ao retorno comercial e elaboração da proposta, em total conformidade com a LGPD (Lei nº 13.709/2018).</p>
              )}
            </div>
            <div className="p-4 border-t border-border bg-bg flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-text text-white rounded-lg text-xs font-semibold hover:bg-text/90 transition-colors cursor-pointer"
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
