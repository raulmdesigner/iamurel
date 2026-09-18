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
  Clock
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
        setFaqs(fq);
        setPackages(pkgs);
        setServices(svcs);
      } catch (error) { setLoadError(errorMessage(error)); } finally {
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
          <ScrollReveal direction="up" delay={0.1}><div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center text-center">
            <RotatingWordHero
              prefix={
                settings?.hero_title && settings.hero_title !== 'Conteúdo com direção. Design com intenção.'
                  ? settings.hero_title
                  : 'Criamos conteúdo para marcas que querem se tornar'
              }
            />
              
            

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl font-normal">
              {settings?.hero_subtitle}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3.5">
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2.5 bg-action hover:bg-action-hover text-white px-7 py-3.5 rounded-lg text-sm font-bold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <span>{settings?.primary_cta_text}</span>
                <ArrowRight size={17} />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 bg-surface hover:bg-surface-hover border border-border text-text px-6 py-3.5 rounded-lg text-sm font-semibold transition-all cursor-pointer"
              >
                <span>{settings?.secondary_cta_text}</span>
              </a>
            </div>

            <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs text-muted">
              <span className="flex items-center gap-1.5 font-medium text-text">
                <Check size={15} className="text-action stroke-[3]" />
                Peças pensadas para o seu negócio, não para preencher espaço no feed.
              </span>
            </div>
          </div>

          </ScrollReveal>
          {/* 3. VISUAL HERO */}
          <ScrollReveal direction="up" delay={0.3}><HeroVisuals /></ScrollReveal>
        </div>
      </section>

      {appearance?.enable_text_banner !== false && <InfiniteMarquee />}

      {/* 3. PORTFÓLIO (ESTUDOS CONCRETOS) */}
      {appearance?.enable_showcase !== false && <PortfolioCentralSection onSelectPlan={handleSelectPlan} />}

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
            {services.filter(service => service.status === 'active').map((service, index) => <article key={service.id} className="space-y-4">
              <span className="text-4xl font-display text-muted/30">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-sm text-muted">{service.problem_solved}</p>
              <p className="text-sm">{service.deliverables}</p>
              {service.timeframe && <p className="text-xs text-muted">Prazo: {service.timeframe}</p>}
              {service.investment_range && <p className="text-sm font-bold">{service.investment_range}</p>}
            </article>)}
          </div>

        </div>
        </ScrollReveal>
      </section>
      )}
      {/* 5. SEÇÃO "PARA QUEM É" (EXEMPLOS REAIS DE CLIENTES) */}
      {appearance?.enable_clients !== false && (
      <section className="py-16 md:py-24 px-6 bg-surface border-b border-border">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text leading-tight">
                Para marcas que querem fugir do "mais do mesmo".
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-action shrink-0 mt-0.5" />
                  <p className="text-sm text-muted">Empresas que precisam renovar a marca mas têm urgência.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-action shrink-0 mt-0.5" />
                  <p className="text-sm text-muted">Especialistas e infoprodutores buscando autoridade visual.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-action shrink-0 mt-0.5" />
                  <p className="text-sm text-muted">Negócios locais querendo profissionalizar a comunicação no Instagram.</p>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-bg rounded-2xl border border-border overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-action/5 to-transparent z-10 pointer-events-none" />
                {/* Placeholder para uma imagem de bastidores ou resultado */}
                <div className="absolute inset-0 flex items-center justify-center text-muted flex-col gap-2 bg-surface/50 backdrop-blur-sm">
                  <Smartphone className="w-8 h-8 opacity-20" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">Direção Criativa</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-bg border border-border p-4 rounded-xl shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-action/10 flex items-center justify-center text-action font-bold text-xl">
                  +3
                </div>
                <div>
                  <p className="text-xs font-bold text-text">Dias úteis</p>
                  <p className="text-[10px] text-muted">Prazo médio de entregas mensais</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
      )}
      {/* 6. SERVIÇOS (TRÊS CAMINHOS) */}
      {appearance?.enable_packages !== false && (
      <section id="pacotes" className="py-16 md:py-24 px-6 bg-bg border-b border-border">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text">
              Serviços e Pacotes
            </h2>
            <p className="text-muted text-sm sm:text-base">
              Escolha o formato que resolve a necessidade da sua marca hoje.
            </p>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.filter(p => p.status === 'active').sort((a, b) => a.order_index - b.order_index).map((pkg) => (
            <div key={pkg.id} className={`p-8 bg-surface border-2 ${pkg.is_highlighted ? 'border-action shadow-md relative' : 'border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1'} rounded-2xl flex flex-col justify-between space-y-6 group`}>
              {pkg.is_highlighted && (
                <div className="absolute -top-3 left-8 bg-action text-white px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                  Mais Solicitado
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <span className={`text-xs font-bold uppercase ${pkg.is_highlighted ? 'text-action' : 'text-muted'}`}>{pkg.commercial_role}</span>
                  <h3 className="text-2xl font-bold font-display text-text mt-1">
                    {pkg.level}
                  </h3>
                  <p className="text-xs text-muted mt-2">
                    {pkg.description}
                  </p>
                </div>
                <div className="py-3 border-y border-border">
                  <span className="text-[11px] text-muted block uppercase">Investimento</span>
                  <p className="text-2xl font-bold font-display text-text">
                    {pkg.price_type === 'hidden' ? 'Consulte-nos' : 
                     pkg.price_type === 'starting_at' ? `A partir de R$ ${pkg.price?.toLocaleString('pt-BR')}` :
                     pkg.price_type === 'fixed' ? `R$ ${pkg.price?.toLocaleString('pt-BR')}` :
                     'Sob consulta'}
                  </p>
                  <span className="text-[11px] text-muted">{pkg.timeframe}</span>
                </div>
                <ul className="space-y-2 text-xs text-text/90">
                  {pkg.items?.map(item => (
                    <li key={item.id} className={`flex items-start gap-2 ${item.is_included === false ? 'opacity-50 line-through' : ''}`}>
                      {item.is_included === false ? (
                        <XCircle size={14} className="text-muted shrink-0 mt-0.5" />
                      ) : (
                        <Check size={14} className="text-action shrink-0 mt-0.5" />
                      )}
                      <span>{item.quantity ? `${item.quantity} ` : ''}{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleSelectPlan(pkg.level)}
                className={`w-full py-3 font-bold text-xs rounded-lg transition-colors cursor-pointer ${pkg.is_highlighted ? 'bg-action hover:bg-action-hover text-white shadow-sm' : 'bg-bg border border-border hover:border-text text-text'}`}
              >
                Falar sobre este pacote
              </button>
            </div>
            ))}
          </div>

        </div>
        </ScrollReveal>
      </section>
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
// 6. SEÇÃO DE PORTFÓLIO CENTRAL (ESTUDOS CONCRETOS)
// ----------------------------------------------------------------------
function PortfolioCentralSection({ onSelectPlan }: { onSelectPlan: (plan: string) => void }) {
  const [activeCase, setActiveCase] = useState<number>(0);

  const cases = [
    {
      id: 0,
      badge: 'Estudo Conceitual • Barbearia & Estética',
      title: 'Black Beard Studio',
      segment: 'Barbearia Premium & Experiência Masculina',
      problem: 'O estúdio oferecia um serviço impecável, mas seu Instagram parecia de uma barbearia comum de bairro. Os clientes insistiam em pechinchar.',
      direction: 'Desenvolvimento de uma identidade visual com base em azul escuro e laranja mineral, com carrosséis focados em cuidados reais e valorização do profissional.',
      pieces: [
        'Identidade visual completa com manual de marca',
        'Série de 8 carrosséis estratégicos 4:5 finalizados em alta resolução',
        'Criativos de tráfego pago para agendamento local',
        'Banner de fachada e cartaz de ponto de venda'
      ],
      resultObservation: 'Elevação do valor percebido e atração de clientes dispostos a pagar pelo serviço premium.'
    },
    {
      id: 1,
      badge: 'Estudo Conceitual • Saúde & Clínica',
      title: 'Dra. Juliana Reis',
      segment: 'Dermatologia & Procedimentos Estéticos',
      problem: 'Posts técnicos cheios de termos médicos que ninguém lia ou comentava, além de artes genéricas de banco de imagens que não transmitiam autoridade.',
      direction: 'Linguagem visual limpa, fotografias reais com tratamento cromático uniforme e ganchos em carrossel que respondem às maiores inseguranças dos pacientes.',
      pieces: [
        'Guia tipográfico e paleta suave de contraste alto',
        'Carrosséis educativos sobre cuidados com a pele',
        'Templates de stories interativos de perguntas e respostas',
        'Anúncios de captação ética com foco em consulta particular'
      ],
      resultObservation: 'Pacientes passaram a chegar na clínica já conhecendo o método e prontos para iniciar o tratamento.'
    },
    {
      id: 2,
      badge: 'Estudo Conceitual • Gastronomia Local',
      title: 'Grão & Origem',
      segment: 'Cafeteria Artesanal & Torrefação',
      problem: 'Concorrência forte de franquias convencionais e dificuldade em fazer o público entender a diferença de preço de um café especial.',
      direction: 'Comunicação focada na sensorialidade, com cartazes impressos de alto impacto, cardápio diagramado e posts que contam a história de cada produtor.',
      pieces: [
        'Cardápio físico e digital de fácil leitura',
        'Embalagens de café em grãos com selo autoral',
        'Campanha de lançamento de inverno nas redes sociais',
        'Outdoor de rua com chamada rápida e memorável'
      ],
      resultObservation: 'Aumento do ticket médio com venda de cafés para levar e consolidação como ponto de encontro na cidade.'
    }
  ];

  const current = cases[activeCase];

  return (
    <section id="portfolio" className="py-16 md:py-24 px-6 bg-surface border-b border-border">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-wider text-action font-bold">
              Portfólio por Aplicação
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text">
              Veja a qualidade da entrega na prática.
            </h2>
            <p className="text-muted text-sm sm:text-base">
              Demonstrações autorais claramente identificadas, mostrando como o problema é analisado, a direção é definida e as peças são entregues.
            </p>
          </div>

          {/* Seletores dos Casos */}
          <div className="flex bg-bg p-1.5 rounded-xl border border-border gap-1.5 overflow-x-auto shrink-0">
            {cases.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setActiveCase(idx)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCase === idx
                    ? 'bg-action text-white shadow-xs'
                    : 'text-muted hover:text-text'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Card Detalhado do Caso Selecionado */}
        <div className="bg-bg border border-border rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Lado Esquerdo: Diagnóstico e Decisões */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3 py-1 bg-surface border border-border rounded-full text-[11px] font-bold text-action uppercase">
              {current.badge}
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-text">
                {current.title}
              </h3>
              <p className="text-xs text-muted font-semibold mt-1">
                Segmento: {current.segment}
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
                <span className="font-bold text-red-600 block uppercase text-[10px]">
                  O Desafio Anterior:
                </span>
                <p className="text-text/90 leading-relaxed">{current.problem}</p>
              </div>

              <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
                <span className="font-bold text-action block uppercase text-[10px]">
                  A Direção Adotada:
                </span>
                <p className="text-text/90 leading-relaxed">{current.direction}</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-text uppercase block">
                Peças Produzidas no Projeto:
              </span>
              <ul className="space-y-1.5 text-xs text-text/80">
                {current.pieces.map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check size={14} className="text-action shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectPlan(`Interesse em projeto similar ao: ${current.title}`)}
                className="inline-flex items-center gap-2 text-xs font-bold text-action hover:underline cursor-pointer"
              >
                <span>Quero um resultado parecido para o meu negócio</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Lado Direito: Representação das Peças Reais */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-border">
                <span className="font-bold text-text">Preview do Ecossistema</span>
                <span className="text-[11px] text-muted">Peças 100% Prontas para Postar</span>
              </div>

              {/* Mockup simplificado de peças prontas para circulação */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-bg border border-border rounded-lg space-y-2">
                  <span className="text-[10px] font-mono text-action font-bold uppercase block">
                    Post Carrossel
                  </span>
                  <div className="h-20 bg-surface border border-border/80 rounded p-2 flex flex-col justify-between">
                    <div className="w-12 h-1.5 bg-action rounded"></div>
                    <div className="space-y-1">
                      <div className="w-full h-2 bg-text/80 rounded"></div>
                      <div className="w-3/4 h-2 bg-text/50 rounded"></div>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted block">Carrossel estruturado para facilitar a leitura</span>
                </div>

                <div className="p-4 bg-bg border border-border rounded-lg space-y-2">
                  <span className="text-[10px] font-mono text-action font-bold uppercase block">
                    Story / Vídeo
                  </span>
                  <div className="h-20 bg-dark rounded p-2 flex flex-col justify-between text-white">
                    <div className="w-8 h-1 bg-action rounded"></div>
                    <div className="space-y-1">
                      <div className="w-full h-1.5 bg-white/70 rounded"></div>
                      <div className="w-2/3 h-1.5 bg-white/40 rounded"></div>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted block">Formato Vertical 9:16</span>
                </div>
              </div>

              <div className="p-3.5 bg-bg border border-border rounded-lg text-xs text-muted flex items-center justify-between">
                <span>Efeito esperado da direção visual:</span>
                <span className="font-bold text-text">{current.resultObservation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </ScrollReveal>
    </section>
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
