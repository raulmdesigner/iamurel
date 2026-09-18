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
import { PostContactJourney } from '../../components/modern/PostContactJourney';
import { PortfolioSection } from '../../components/modern/PortfolioSection';
import { PackagesSection } from '../../components/modern/PackagesSection';
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
                prefix={
                  settings?.hero_title && settings.hero_title !== 'Conteúdo com direção. Design com intenção.'
                    ? settings.hero_title
                    : 'Criamos conteúdo para marcas que querem se tornar'
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

      {/* ROTAS CLARAS DE ENTRADA (DIAGNÓSTICO MANUS) */}
      {appearance?.enable_three_routes !== false && settings && (
        <ThreeRoutes settings={settings} onSelectRoute={handleSelectPlan} />
      )}

      {/* 3. PORTFÓLIO (ESTUDOS CONCRETOS) */}
      {appearance?.enable_showcase !== false && <PortfolioSection onSelectPlan={handleSelectPlan} />}

      {/* 4. SERVIÇOS (TRÊS CAMINHOS) */}
      {appearance?.enable_services !== false && (
      <section id="como-funciona" className="py-16 md:py-24 px-6 bg-bg border-b border-border">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-wider text-action font-bold">
              Método Transparente
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text">
              Como a IA e a direção humana trabalham juntas.
            </h2>
            <p className="text-muted text-sm sm:text-base">
              A IA acelera a pesquisa, exploração de ideias e variações de formato. A direção humana decide a estratégia, o tom de voz e o acabamento final.
            </p>
          </div>

          
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.filter(service => service.status === 'active').map((service, index) => (
              <article key={service.id} className="p-8 rounded-2xl bg-surface border border-border/80 hover:border-action/40 transition-all space-y-5 flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-display font-black text-action/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted px-2.5 py-1 rounded bg-bg border border-border">
                      Etapa Metodológica
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-text">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">{service.problem_solved}</p>
                  
                  <div className="pt-3 border-t border-border/80 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-muted font-bold block">Entregável:</span>
                    <p className="text-xs text-text/90 font-medium">{service.deliverables}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                  {service.timeframe && (
                    <span className="text-muted flex items-center gap-1">
                      <Clock size={12} className="text-action" />
                      {service.timeframe}
                    </span>
                  )}
                  {service.investment_range && (
                    <span className="font-bold text-text font-mono ml-auto">
                      {service.investment_range}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

        </div>
        </ScrollReveal>
      </section>
      )}
      {/* 5. SEÇÃO "PARA QUEM É" (EXEMPLOS REAIS DE CLIENTES) */}
      {appearance?.enable_clients !== false && (
      <section className="py-20 md:py-28 px-6 bg-surface border-b border-border">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-action font-extrabold flex items-center gap-2">
                  <UserCheck size={16} />
                  Público & Perfis Atendidos
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text leading-tight">
                  Para marcas que querem fugir do "mais do mesmo".
                </h2>
                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  Trabalhamos com marcas que reconhecem que uma presença visual desleixada custa caro em termos de credibilidade e ticket médio.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-bg border border-border flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-action/10 text-action flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-text">Empresas e Negócios Locais</h4>
                    <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
                      Que precisam renovar a marca ou profissionalizar os posts no Instagram com agilidade sem burocracia de agências gigantescas.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-bg border border-border flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-action/10 text-action flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-text">Especialistas & Profissionais Liberais</h4>
                    <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
                      Médicos, consultores e líderes que buscam autoridade imediata, carrosséis de alto impacto e peças com acabamento de revista.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-bg border border-border flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-action/10 text-action flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-text">Marcas em Lançamento ou Rebranding</h4>
                    <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
                      Que necessitam de manual de marca, identidade visual sólida e assets digitais completos prontos para veicular no mercado.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] sm:aspect-square bg-dark rounded-3xl border border-border-dark overflow-hidden relative shadow-2xl p-8 sm:p-12 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-action font-extrabold bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                    Acabamento Autoral
                  </span>
                  <div className="w-8 h-8 rounded-full bg-action/20 text-action flex items-center justify-center">
                    <Sparkles size={16} />
                  </div>
                </div>

                <div className="space-y-3 my-auto py-6">
                  <span className="text-xs font-mono text-white/60 uppercase tracking-widest">Compromisso IAMUREL</span>
                  <p className="text-2xl sm:text-3xl font-display font-extrabold leading-tight text-white/95">
                    "Cada postagem deve reforçar o porquê o seu negócio merece ser escolhido."
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                  <span>Padrão 1080×1350 & 1080×1920</span>
                  <span className="font-mono text-action font-bold">100% Vetor & Alta Resolução</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-bg border border-border p-5 rounded-2xl shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-action/10 flex items-center justify-center text-action font-black text-xl">
                  +3
                </div>
                <div>
                  <p className="text-xs font-bold text-text">Dias Úteis de Entrega</p>
                  <p className="text-[11px] text-muted">Média de ciclo de peças com aprovação ágil</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
      )}
      {/* FIT CHECK: PARA QUEM É E PARA QUEM NÃO É (DIAGNÓSTICO MANUS) */}
      {appearance?.enable_fit_check !== false && settings && (
        <FitCheck settings={settings} />
      )}

      {/* DETALHAMENTO DA OPERAÇÃO DE CONTEÚDO MENSAL (DIAGNÓSTICO MANUS) */}
      {appearance?.enable_monthly_table !== false && settings && (
        <MonthlyContentTable settings={settings} onSelectPlan={handleSelectPlan} />
      )}

      {/* 6. SERVIÇOS E PACOTES ESTRUTURADOS */}
      {appearance?.enable_packages !== false && (
        <PackagesSection packages={packages} onSelectPlan={handleSelectPlan} />
      )}

      {appearance?.enable_faq !== false && (
      <div className="faq-wrapper">
      {/* 7. FAQ CURTA E OBJETIVA */}
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
      {/* 8. CTA FINAL FORTE COM LOGO IAMUREL */}
      {appearance?.enable_contact_form !== false && (
      <section className="py-20 md:py-28 px-6 bg-dark text-white relative overflow-hidden border-b border-border-dark">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex flex-col items-center">
            <IamurelLogo className="h-10 sm:h-12 justify-center" color="white" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-display font-bold max-w-xl mx-auto leading-tight text-white/95">
            Pronto para fazer sua marca parecer tão profissional quanto o seu serviço?
          </h2>

          <p className="text-sm sm:text-base text-bg/75 max-w-lg mx-auto leading-relaxed">
            Envie uma mensagem e vamos conversar sobre as necessidades do seu projeto.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contato"
              className="bg-action hover:bg-action-hover text-white px-9 py-4 rounded-xl text-sm font-bold tracking-wide shadow-lg transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Falar com a IAMUREL</span>
              <ArrowRight size={17} />
            </a>

            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:bg-white/5 text-white/90 hover:text-white px-7 py-4 rounded-xl text-sm font-semibold transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle size={17} className="text-action" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
      )}

      {/* JORNADA PÓS-CONTATO: O QUE ACONTECE APÓS ENVIAR (DIAGNÓSTICO MANUS) */}
      {appearance?.enable_journey_steps !== false && settings && (
        <PostContactJourney settings={settings} />
      )}

      {/* FORMULÁRIO DE CONTATO DIRETO E OBJETIVO */}
      {appearance?.enable_contact_form !== false && (
      <section id="contato" className="py-16 md:py-24 px-6 bg-bg">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="bg-surface border border-border rounded-2xl p-8 sm:p-12 shadow-sm space-y-8">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-wider text-action font-bold">
                Retorno em até 24h
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-text">
                Vamos falar sobre a sua marca?
              </h3>
              <p className="text-xs sm:text-sm text-muted">
                Preencha os campos básicos abaixo ou, se preferir agilidade, envie uma mensagem direta pelo WhatsApp.
              </p>
            </div>

            <QuickContactForm
              selectedNeed={selectedNeed}
              settings={settings!}
            />
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

// ----------------------------------------------------------------------
// FORMULÁRIO ENXUTO E DIRETO (SEM BUROCRACIA)
// ----------------------------------------------------------------------
function QuickContactForm({
  selectedNeed,
  settings
}: {
  selectedNeed: string;
  settings: SiteSettings;
}) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const leadPayload = {
      consent: formData.get('consent') === 'on',
      name: formData.get('name') as string,
      business_name: formData.get('business_name') as string,
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || '',
      need: (formData.get('need') as string) || selectedNeed || 'Alinhamento Geral',
      message: (formData.get('message') as string) || null,
      objective: 'Crescimento e Autoridade da Marca',
      timeframe: 'Próximas semanas',
      investment_range: 'A combinar',
      preferred_channel: 'whatsapp',
      origin: 'Landing Page Oficial - Redesign Ágil'
    };

    try {
      const res = await dataLayer.submitLead(leadPayload);
      if (res.success) {
        setSubmitted(true);
        form.reset();
      } else {
        setErrorMessage(res.error || 'Não foi possível enviar a solicitação. Tente pelo WhatsApp.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao enviar. Pode nos chamar diretamente no WhatsApp!');
    } finally {
      setLoading(false);
    }
  }

  const whatsappDirect = settings?.whatsapp_number
    ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}?text=Ol%C3%A1%2C%20quero%20conversar%20sobre%20o%20conte%C3%BAdo%20e%20design%20da%20minha%20marca.`
    : null;

  if (submitted) {
    return (
      <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-4 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto font-bold text-xl">
          ✓
        </div>
        <h4 className="text-xl font-bold font-display text-emerald-950">
          Mensagem Recebida com Sucesso!
        </h4>
        <p className="text-xs sm:text-sm text-emerald-900 max-w-md mx-auto leading-relaxed">
          Nossa equipe entrará em contato pelo WhatsApp informado em até 24 horas úteis com um diagnóstico inicial.
        </p>
        {whatsappDirect && (
          <div className="pt-2">
            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors"
            >
              <MessageCircle size={15} />
              <span>Chamar no WhatsApp agora</span>
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text block">
            Seu Nome <span className="text-action">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Ex: Carlos Silva"
            className="w-full px-3.5 py-2.5 bg-bg border border-border rounded-lg text-xs text-text focus:border-action focus:ring-1 focus:ring-action outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text block">
            Nome do seu Negócio / Empresa <span className="text-action">*</span>
          </label>
          <input
            type="text"
            name="business_name"
            required
            placeholder="Ex: Barbearia Black, Clínica Reis..."
            className="w-full px-3.5 py-2.5 bg-bg border border-border rounded-lg text-xs text-text focus:border-action focus:ring-1 focus:ring-action outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text block">
            WhatsApp para Contato <span className="text-action">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="(00) 00000-0000"
            className="w-full px-3.5 py-2.5 bg-bg border border-border rounded-lg text-xs text-text focus:border-action focus:ring-1 focus:ring-action outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text block">
            Principal Necessidade Hoje
          </label>
          <select
            name="need"
            defaultValue={selectedNeed || 'Produzir Conteúdo com Consistência'}
            key={selectedNeed}
            className="w-full px-3.5 py-2.5 bg-bg border border-border rounded-lg text-xs text-text focus:border-action focus:ring-1 focus:ring-action outline-none transition-all cursor-pointer"
          >
            {selectedNeed && !['Produzir Conteúdo com Consistência', 'Criar ou Reposicionar Minha Marca', 'Lançar uma Campanha', 'Materiais Físicos e Outdoor', 'Diagnóstico Geral'].includes(selectedNeed) && (
              <option value={selectedNeed}>{selectedNeed}</option>
            )}
            <option value="Produzir Conteúdo com Consistência">Produzir Conteúdo com Consistência (Plano Mensal)</option>
            <option value="Criar ou Reposicionar Minha Marca">Criar ou Reposicionar Minha Marca</option>
            <option value="Lançar uma Campanha">Lançar uma Campanha de Anúncios</option>
            <option value="Materiais Físicos e Outdoor">Materiais Físicos / Fachada / Outdoor</option>
            <option value="Diagnóstico Geral">Quero um diagnóstico geral</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text block">
          Conte brevemente sobre o seu momento (opcional)
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Ex: Já temos clientes recorrentes, mas nosso perfil no Instagram não passa a autoridade que queremos..."
          className="w-full px-3.5 py-2.5 bg-bg border border-border rounded-lg text-xs text-text focus:border-action focus:ring-1 focus:ring-action outline-none transition-all resize-none"
        ></textarea>
      </div>

      <label className="flex items-start gap-2 text-xs"><input type="checkbox" name="consent" required /> Autorizo o uso dos dados informados para receber retorno sobre minha solicitação.</label>
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3.5 bg-action hover:bg-action-hover text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-[0.98] cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Falar com a IAMUREL'}
        </button>

        {whatsappDirect && (
          <a
            href={whatsappDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-muted hover:text-action inline-flex items-center gap-1.5 transition-colors"
          >
            <MessageCircle size={15} />
            <span>Prefiro chamar direto no WhatsApp</span>
          </a>
        )}
      </div>
    </form>
  );
}
