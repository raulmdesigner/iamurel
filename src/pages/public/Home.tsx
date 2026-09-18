import { LoadError } from '../../components/ui/LoadError';
import { errorMessage } from '../../lib/errors';
import { useAppearance } from '../../lib/appearance';
import type { Service } from '../../types';
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { dataLayer } from '../../lib/data';
import { SiteSettings, FAQ, Package, Showcase, AppearanceSettings } from '../../types';
import { IamurelLogo, IamurelSymbol } from '../../components/brand/IamurelBrand';
import { HeroVisuals } from '../../components/modern/HeroVisuals';
import { RotatingWordHero } from '../../components/modern/RotatingWordHero';
import { InfiniteMarquee } from '../../components/modern/InfiniteMarquee';
import { ScrollReveal } from '../../components/modern/ScrollReveal';
import { ThreeRoutes } from '../../components/modern/ThreeRoutes';
import { FitCheck } from '../../components/modern/FitCheck';
import { MonthlyContentTable } from '../../components/modern/MonthlyContentTable';
import { PortfolioSection } from '../../components/modern/PortfolioSection';
import { PackagesSection } from '../../components/modern/PackagesSection';
import { MethodSection } from '../../components/modern/MethodSection';
import { ProcessSection } from '../../components/modern/ProcessSection';
import { ApplicationForm } from '../../components/modern/ApplicationForm';
import {
  ArrowRight,
  Check,
  Send,
  MessageCircle,
  Sparkles,
  Layers,
  FileCode,
  ShieldCheck,
  Store,
  Stethoscope,
  Scissors,
  Briefcase,
  TrendingUp,
  ChevronDown,
  ExternalLink,
  Smartphone,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck
} from 'lucide-react';

export default function Home() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const appearance = useAppearance();
  const [services, setServices] = useState<Service[]>([]);
  const [loadError, setLoadError] = useState('');
  const [packages, setPackages] = useState<Package[]>([]);
  const [cases, setCases] = useState<Showcase[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNeed, setSelectedNeed] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        const [st, fq, pkgs, svcs] = await Promise.all([
          dataLayer.getSettings(),
          dataLayer.getFaq(),
          dataLayer.getPackages(),
          dataLayer.getServices()
        ]);
        setSettings(st);
        setFaqs(fq.length > 0 ? fq : (await import('../../lib/mockData')).mockFaq);
        setPackages(pkgs.length > 0 ? pkgs : (await import('../../lib/mockData')).mockPackages);
        setServices(svcs.length > 0 ? svcs : (await import('../../lib/mockData')).mockServices);
      } catch (error) {
        console.warn('Erro ao carregar dados do Supabase. Carregando dados de contingência locais:', error);
        // Fallback resiliente: o visitante nunca vê tela vermelha
        const { mockSettings, mockFaq, mockPackages, mockServices } = await import('../../lib/mockData');
        setSettings(mockSettings);
        setFaqs(mockFaq);
        setPackages(mockPackages);
        setServices(mockServices);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSelectPlan = (planName: string) => {
    setSelectedNeed(planName);
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappDirect = settings?.whatsapp_number
    ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20o%20conte%C3%BAdo%20e%20design%20da%20minha%20marca%20com%20a%20IAMUREL.`
    : '#contato';

  if (loadError) return <LoadError message={loadError} />;
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-8 animate-pulse">
        <div className="h-8 w-64 bg-border rounded-md"></div>
        <div className="h-16 w-3/4 bg-border rounded-md"></div>
        <div className="h-96 w-full bg-border/50 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 2. HERO */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-6 bg-bg overflow-hidden border-b border-border">
        <div className="max-w-7xl mx-auto space-y-12">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border shadow-xs">
                <span className="w-2 h-2 rounded-full bg-action animate-pulse"></span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-text/80 font-bold">
                  Estúdio Criativo de Conteúdo & Design
                </span>
              </div>

              <RotatingWordHero
                title={
                  settings?.hero_title && settings.hero_title !== 'Conteúdo com direção. Design com intenção.'
                    ? settings.hero_title
                    : 'Identidade e conteúdo para marcas que precisam se comunicar com autoridade.'
                }
              />

              <p className="text-base sm:text-lg lg:text-xl text-muted leading-relaxed max-w-2xl font-normal">
                {settings?.hero_subtitle || 'Design autoral e estratégia sob medida para marcas que se recusam a parecer genéricas no digital.'}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center gap-2.5 bg-action hover:bg-action-hover text-white px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <span>{settings?.primary_cta_text || 'Solicitar Diagnóstico Visual'}</span>
                  <ArrowRight size={17} />
                </a>

                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center gap-2 bg-surface hover:bg-surface-hover border border-border/80 text-text px-7 py-4 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-xs"
                >
                  <span>{settings?.secondary_cta_text || 'Ver Estudos de Caso'}</span>
                </a>
              </div>

              <div className="pt-4 flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-xs text-muted">
                <span className="flex items-center gap-2 font-medium text-text">
                  <Check size={16} className="text-action stroke-[3]" />
                  Direção criativa humana com agilidade assistida por IA
                </span>
                <span className="flex items-center gap-2 font-medium text-text">
                  <Check size={16} className="text-action stroke-[3]" />
                  Entregas finalizadas prontas para publicação imediata
                </span>
              </div>
            </div>
          </ScrollReveal>
          {/* 3. VISUAL HERO */}
          <ScrollReveal direction="up" delay={0.3}><HeroVisuals /></ScrollReveal>
        </div>
      </section>

      {appearance?.enable_text_banner !== false && <InfiniteMarquee />}

      {/* 5. ROTAS CLARAS DE ENTRADA (DIAGNÓSTICO MANUS) */}
      {appearance?.enable_three_routes !== false && settings && (
        <ThreeRoutes settings={settings} onSelectRoute={handleSelectPlan} />
      )}

      {/* 6. PORTFÓLIO (DEMONSTRAÇÕES AUTORAIS DO MÉTODO) */}
      {appearance?.enable_showcase !== false && <PortfolioSection onSelectPlan={handleSelectPlan} />}

      {/* 8. MÉTODO "IA + DIREÇÃO HUMANA" */}
      <MethodSection />

      {/* 9. TRANSPARÊNCIA OPERACIONAL E PROCESSO */}
      <ProcessSection />

      {/* 10. TABELA DE ESCOPO MENSAL (DENTRO VS FORA) */}
      {appearance?.enable_monthly_table !== false && settings && (
        <MonthlyContentTable settings={settings} onSelectPlan={handleSelectPlan} />
      )}

      {/* PACOTES ESTRUTURADOS */}
      {appearance?.enable_packages !== false && (
        <PackagesSection packages={packages} onSelectPlan={handleSelectPlan} />
      )}

      {/* 7. FIT CHECK: PARA QUEM É E PARA QUEM NÃO É */}
      {appearance?.enable_fit_check !== false && settings && (
        <FitCheck settings={settings} />
      )}

      {/* PERGUNTAS FREQUENTES */}
      {appearance?.enable_faq !== false && (
        <div className="faq-wrapper">
          <section id="faq" className="py-16 md:py-24 px-6 bg-dark border-b border-border-dark relative overflow-hidden">
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-40 -left-20 w-[500px] h-[500px] bg-action/20 rounded-full blur-[120px] pointer-events-none" />
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-trust/30 rounded-full blur-[140px] pointer-events-none" />
            <ScrollReveal>
              <div className="max-w-3xl mx-auto space-y-10 relative z-10">
                <div className="text-center space-y-3">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                    Perguntas Frequentes
                  </h2>
                </div>

                <FaqAccordion faqs={faqs} />
              </div>
            </ScrollReveal>
          </section>
        </div>
      )}

      {/* 11. FORMULÁRIO DE APLICAÇÃO E QUALIFICAÇÃO */}
      {appearance?.enable_contact_form !== false && (
        <section id="contato" className="py-16 md:py-24 px-6 bg-bg border-b border-border">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="bg-surface border border-border rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-xs uppercase tracking-wider text-action font-extrabold">
                    Aplicação para Diagnóstico Visual
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-text">
                    Vamos avaliar o momento da sua marca?
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    Responda às 5 perguntas de qualificação para alinharmos a rota ideal e retornarmos com um direcionamento prático em até 24 horas úteis.
                  </p>
                </div>

                {settings && (
                  <ApplicationForm
                    settings={settings}
                    selectedPlan={selectedNeed}
                  />
                )}
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// 10. FAQ ACCORDION
// ----------------------------------------------------------------------
function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const defaultFaqs: FAQ[] = [
    {
      id: 'faq-1',
      question: 'Como a IA é usada?',
      answer: 'A IA atua como motor de pesquisa e variação de formatos. Toda a estratégia, direção de arte, texto persuasivo e acabamento final continuam sendo feitos por profissionais humanos experientes.',
      order_index: 1
    },
    {
      id: 'faq-2',
      question: 'O que é entregue?',
      answer: 'Peças 100% finalizadas em alta resolução (PNG, PDF ou vetor). Entregamos o material pronto para postar ou imprimir, sem necessidade de edições da sua parte.',
      order_index: 2
    },
    {
      id: 'faq-3',
      question: 'Qual é o prazo?',
      answer: 'Projetos pontuais levam de 2 a 5 dias úteis. Projetos de conteúdo contínuo têm entregas semanais ou quinzenais acordadas no cronograma.',
      order_index: 3
    },
    {
      id: 'faq-4',
      question: 'Como começa o projeto?',
      answer: 'Basta enviar uma mensagem no WhatsApp. Não precisamos de reuniões demoradas; um áudio curto explicando a sua demanda já nos permite estruturar os próximos passos.',
      order_index: 4
    }
  ];

  const listToRender = faqs.length > 0 ? faqs : defaultFaqs;
  const [openId, setOpenId] = useState<string | null>(listToRender[0]?.id || null);

  return (
    <div className="space-y-3">
      {listToRender.map(item => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl overflow-hidden transition-all duration-300 relative border ${isOpen ? 'bg-white/5 border-action/30 shadow-lg' : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
            style={{
              boxShadow: isOpen ? 'inset 0 1px 0 rgba(255,255,255,1), 0 10px 25px -5px rgba(0, 150, 180, 0.2)' : 'inset 0 1px 0 rgba(255,255,255,0.8), 0 4px 10px rgba(0,0,0,0.03)'
            }}
          >
            
            
            
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer relative z-10"
            >
              <span className={`text-base font-bold font-display transition-colors text-white`}>
                {item.question}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-action text-white shadow-[0_0_15px_rgba(255,74,28,0.5)]' : 'bg-white/10 text-white/50 border border-white/10'}`}>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-xs sm:text-sm text-white/70 leading-relaxed relative z-10">
                <div className="pt-4 border-t border-white/10">
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
