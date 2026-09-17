import React, { useState, useEffect } from 'react';
import { dataLayer } from '../../lib/data';
import { SiteSettings, Service, Package, Showcase, FAQ } from '../../types';
import {
  ArrowRight,
  Layers,
  FileCheck2,
  Check,
  Send,
  SlidersHorizontal,
  Compass,
  ChevronDown
} from 'lucide-react';

export default function Home() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [showcases, setShowcases] = useState<Showcase[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [st, sv, pk, sh, fq] = await Promise.all([
          dataLayer.getSettings(),
          dataLayer.getServices(),
          dataLayer.getPackages(),
          dataLayer.getShowcases(),
          dataLayer.getFaq()
        ]);
        setSettings(st);
        setServices(sv);
        setPackages(pk);
        setShowcases(sh);
        setFaqs(fq);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <HomeSkeletonLoader />;
  }

  return (
    <div className="w-full">
      {/* 1. Abertura com Demonstração Visual Tangível */}
      <HeroSection settings={settings!} />

      {/* 2. Diagnóstico Real (Sem cards repetitivos com checkmarks) */}
      <DiagnosisSection />

      {/* 3. Como a IAMUREL Trabalha (Entradas, Decisões Humanas e Entregas) */}
      <MethodProcessSection />

      {/* 4. Mostruário Tangível & Estudos Autorais */}
      <TangibleShowcaseSection showcases={showcases} />

      {/* 5. Especialidades & Escopos Claros (Com o que NÃO está incluso) */}
      <ServicesSection services={services} />

      {/* 6. Pacotes Comerciais Flexíveis */}
      <PackagesSection packages={packages} />

      {/* 7. Perguntas Frequentes (FAQ Estratégico) */}
      <FaqSection faqs={faqs} />

      {/* 8. Formulário de Contato & Qualificação Sem Fricção */}
      <ContactSection />
    </div>
  );
}

// ----------------------------------------------------------------------
// SKELETON LOADER REAL
// ----------------------------------------------------------------------
function HomeSkeletonLoader() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-16 animate-pulse">
      <div className="max-w-3xl space-y-6">
        <div className="h-6 w-48 bg-border rounded"></div>
        <div className="h-16 w-full bg-border rounded"></div>
        <div className="h-6 w-3/4 bg-border/60 rounded"></div>
      </div>
      <div className="h-96 w-full bg-border/40 rounded-lg"></div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 1. HERO SECTION (ABERTURA EDITORIAL)
// ----------------------------------------------------------------------
function HeroSection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-6 border-b border-border bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Lado Esquerdo: Mensagem Forte e Posicionamento */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-text/5 border border-border text-xs uppercase tracking-widest font-semibold text-text/80 rounded">
            <span>Estúdio Editorial & Direção Visual</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display leading-[1.08] text-text tracking-tight">
            {settings.hero_title}
          </h1>

          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            {settings.hero_subtitle}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 bg-action hover:bg-action-hover text-white px-8 py-4 rounded text-base font-medium transition-all shadow-sm active:scale-[0.98]"
            >
              <span>{settings.primary_cta_text}</span>
              <ArrowRight size={18} />
            </a>

            <a
              href="#demonstracoes"
              className="inline-flex items-center justify-center gap-2 bg-surface border border-border hover:border-text/40 text-text px-6 py-4 rounded text-base font-medium transition-all"
            >
              <span>{settings.secondary_cta_text}</span>
            </a>
          </div>

          <div className="pt-6 flex items-center gap-6 text-xs text-muted border-t border-border/60">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
              Sem terceirização cega
            </span>
            <span>•</span>
            <span>Acompanhamento direto</span>
            <span>•</span>
            <span>Escopos previsíveis</span>
          </div>
        </div>

        {/* Lado Direito: Demonstração Visual Tangível e Real do Trabalho */}
        <div className="lg:col-span-5">
          <div className="relative bg-surface border border-border rounded-lg shadow-sm p-6 overflow-hidden">
            {/* Header de prancheta */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border text-xs text-muted">
              <div className="flex items-center gap-2 font-mono">
                <span className="w-2 h-2 bg-action rounded-full"></span>
                <span>IAMUREL_SPEC_01.fig</span>
              </div>
              <span className="uppercase tracking-wider font-semibold text-[10px] bg-bg px-2 py-0.5 rounded border border-border">
                Demonstração Autoral
              </span>
            </div>

            {/* Simulação de Prancheta Editorial Real */}
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-bg border border-border rounded p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between items-start text-xs text-muted font-mono">
                  <span>ATO 01 — QUEBRA DE PADRÃO</span>
                  <span>CARROSSEL 4:5</span>
                </div>

                <div className="my-auto space-y-3">
                  <span className="text-xs uppercase tracking-widest text-action font-semibold">Tese Editorial</span>
                  <h3 className="text-2xl sm:text-3xl font-display leading-tight text-text">
                    "Produzir mais não significa comunicar melhor."
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    A maioria dos perfis publica 5 vezes na semana para falar de nada com ninguém. Conteúdo com direção é aquele que resolve uma dúvida real e filtra clientes qualificados.
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-text/60 font-mono">
                  <span>DIREÇÃO CRIATIVA: IAMUREL</span>
                  <span>SLIDE 01/05</span>
                </div>
              </div>

              {/* Guia de Intenção */}
              <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-2.5 bg-bg rounded border border-border">
                  <p className="text-muted font-mono text-[10px] uppercase">Tipografia</p>
                  <p className="font-semibold text-text">Playfair Display 600</p>
                </div>
                <div className="p-2.5 bg-bg rounded border border-border">
                  <p className="text-muted font-mono text-[10px] uppercase">Paleta Mineral</p>
                  <p className="font-semibold text-text">Marfim + Carvão</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// 2. DIAGNÓSTICO REAL (COMPOSIÇÃO EDITORIAL ASSIMÉTRICA)
// ----------------------------------------------------------------------
function DiagnosisSection() {
  const frictions = [
    {
      title: "O paradoxo da competência invisível",
      body: "Você entrega um serviço de excelência e cobra o valor que ele vale, mas quem descobre seu perfil tem a impressão de um negócio amador ou recém-criado.",
      quote: "Sua marca não pode parecer menor do que a sua entrega real."
    },
    {
      title: "O ciclo da ansiedade de postar",
      body: "Você passa dias pensando no que publicar, tenta resumir seu conhecimento no Canva, fica insatisfeito com o acabamento e acaba não postando nada.",
      quote: "Falta de processo drena sua energia executiva."
    },
    {
      title: "Imunidade a templates genéricos",
      body: "O público já aprendeu a ignorar posts que parecem 'mais do mesmo'. Layouts de IA automáticos e cores neon saturadas transmitem superficialidade imediata.",
      quote: "Sem intenção editorial, seu post é apenas ruído no feed."
    }
  ];

  return (
    <section id="proposta" className="py-20 md:py-28 px-6 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Coluna de Contexto */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <span className="text-xs uppercase tracking-widest text-action font-semibold">O Diagnóstico Honesto</span>
            <h2 className="text-3xl md:text-4xl font-display text-text leading-tight">
              O problema da maioria dos negócios não é falta de ideias. É falta de direção e acabamento.
            </h2>
            <p className="text-muted text-base leading-relaxed">
              Quando a identidade visual é fraca ou o conteúdo não possui uma linha editorial clara, o cliente ideal duvida do seu preço e você passa a ser comparado por quem cobra barato.
            </p>
            <div className="pt-4">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 text-action font-medium hover:gap-3 transition-all text-sm"
              >
                <span>Falar sobre o gargalo da sua comunicação</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Coluna de Fricções Reais */}
          <div className="lg:col-span-7 space-y-6">
            {frictions.map((fric, index) => (
              <div
                key={index}
                className="p-8 bg-bg rounded-lg border border-border space-y-3 transition-colors hover:border-text/30"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-action font-bold">0{index + 1}</span>
                  <h3 className="text-xl font-bold text-text">{fric.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {fric.body}
                </p>
                <div className="pt-2">
                  <span className="text-xs font-mono uppercase tracking-wide text-trust/90 font-medium block">
                    ↳ {fric.quote}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// 3. COMO TRABALHAMOS (ENTRADAS, DECISÕES E ENTREGAS)
// ----------------------------------------------------------------------
function MethodProcessSection() {
  const steps = [
    {
      step: "Passo 01",
      title: "Entrada Descomplicada",
      input: "Áudios de WhatsApp de 5 minutos, notas rápidas ou o briefing essencial do seu negócio.",
      aiRole: "Aceleramos a compilação de dados e o mapeamento de referências de mercado em minutos.",
      humanRole: "Filtramos o que realmente interessa comercialmente para o seu momento de marca."
    },
    {
      step: "Passo 02",
      title: "Decisão Criativa & Roteirização",
      input: "Definição do ângulo de abordagem e do gancho que chamará atenção qualificada.",
      aiRole: "Exploramos dezenas de variações de títulos e testes semânticos sem lentidão.",
      humanRole: "Direção de arte define a cadência do texto, o tom de voz e os pontos de pausa e ênfase."
    },
    {
      step: "Passo 03",
      title: "Design Gráfico & Acabamento de Alta Resolução",
      input: "Aplicação sobre grid editorial com hierarquia matemática de tamanhos e respiro visual.",
      aiRole: "Auxilia na formatação rápida de arquivos e adaptação de proporções (1:1, 4:5, 9:16).",
      humanRole: "Ajuste manual de entrelinhas, contraste de cor, kerning e curadoria estética."
    },
    {
      step: "Passo 04",
      title: "Entrega Pronta para Circulação",
      input: "Pacote final organizado com autonomia total para sua equipe publicar.",
      aiRole: "Geração de resumos de publicação e sugestões de horários e tags temáticas.",
      humanRole: "Entrega em arquivos abertos no Figma, exportação em PNG/SVG e guia de publicação."
    }
  ];

  return (
    <section id="metodo" className="py-20 md:py-28 px-6 bg-bg border-b border-border">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-widest text-action font-semibold">Método Prático</span>
          <h2 className="text-3xl md:text-5xl font-display text-text leading-tight">
            Como a IA e a Direção Humana convivem no nosso dia a dia.
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Não entregamos textos crus de robô e nem cobramos os prazos lentos de agências tradicionais. A IA nos dá agilidade de pesquisa; a direção humana garante que o resultado tenha alma, contexto e bom gosto.
          </p>
        </div>

        {/* Grade de Processo com Divisão Clara de Papéis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((item, idx) => (
            <div key={idx} className="p-8 bg-surface border border-border rounded-lg flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">{item.step}</span>
                <h3 className="text-2xl font-bold font-display text-text">{item.title}</h3>
                <p className="text-sm text-text/80 leading-relaxed pt-1">
                  <strong className="text-text">O que você nos passa:</strong> {item.input}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/80 text-xs">
                <div className="p-3 bg-bg rounded border border-border/60">
                  <span className="text-muted font-semibold block mb-1">Onde a IA acelera:</span>
                  <span className="text-text/80">{item.aiRole}</span>
                </div>
                <div className="p-3 bg-trust/5 rounded border border-trust/20">
                  <span className="text-trust font-semibold block mb-1">Onde a Direção Humana decide:</span>
                  <span className="text-text/90 font-medium">{item.humanRole}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// 4. MOSTRUÁRIO TANGÍVEL & ESTUDOS AUTORAIS (SHOWCASE REAL)
// ----------------------------------------------------------------------
function TangibleShowcaseSection({ showcases }: { showcases: Showcase[] }) {
  const [activeTab, setActiveTab] = useState<'carousel' | 'identity' | 'script'>('carousel');
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselItem = showcases.find(s => s.type === 'carousel') || showcases[0];
  const identityItem = showcases.find(s => s.type === 'identity') || showcases[1];

  return (
    <section id="demonstracoes" className="py-20 md:py-28 px-6 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-action font-semibold">Mostruário Tangível</span>
            <h2 className="text-3xl md:text-4xl font-display text-text leading-tight">
              Demonstrações reais do padrão de entrega.
            </h2>
            <p className="text-muted text-sm sm:text-base">
              Sem dados fictícios de clientes inexistentes. Aqui você vê exatamente o formato de diagramação, curadoria cromática e roteirização que entregamos.
            </p>
          </div>

          {/* Seletor de Abas de Demonstração */}
          <div className="flex items-center gap-2 p-1.5 bg-bg rounded-lg border border-border text-xs font-medium shrink-0">
            <button
              onClick={() => setActiveTab('carousel')}
              className={`px-4 py-2 rounded transition-all cursor-pointer ${
                activeTab === 'carousel' ? 'bg-text text-bg shadow-sm' : 'text-muted hover:text-text'
              }`}
            >
              Carrossel Editorial 4:5
            </button>
            <button
              onClick={() => setActiveTab('identity')}
              className={`px-4 py-2 rounded transition-all cursor-pointer ${
                activeTab === 'identity' ? 'bg-text text-bg shadow-sm' : 'text-muted hover:text-text'
              }`}
            >
              Sistema de Cores & Tipos
            </button>
          </div>
        </div>

        {/* Conteúdo da Aba Ativa */}
        {activeTab === 'carousel' && carouselItem && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Simulador Interativo de Carrossel */}
            <div className="lg:col-span-7 bg-bg border border-border rounded-lg p-6 sm:p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border text-xs text-muted">
                <span className="font-mono">PRANCHETA_SLIDE_{activeSlide + 1}_DE_4</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-action">
                  {carouselItem.slides?.[activeSlide]?.title || 'Slide Editorial'}
                </span>
              </div>

              <div className="my-8 py-6 space-y-6 min-h-[220px] flex flex-col justify-center">
                <span className="font-mono text-xs text-muted">0{activeSlide + 1} — RITMO EDITORIAL</span>
                <h4 className="text-2xl sm:text-3xl font-display leading-tight text-text">
                  "{carouselItem.slides?.[activeSlide]?.body}"
                </h4>
                <div className="p-3 bg-surface rounded border border-border/80 text-xs text-muted">
                  <strong className="text-text font-medium">Decisão de Arte:</strong> {carouselItem.slides?.[activeSlide]?.note}
                </div>
              </div>

              {/* Controles de Slides */}
              <div className="pt-6 border-t border-border flex items-center justify-between">
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map(idx => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeSlide === idx ? 'w-8 bg-action' : 'w-2 bg-border hover:bg-muted'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSlide(prev => (prev > 0 ? prev - 1 : 3))}
                    className="px-3 py-1.5 text-xs bg-surface border border-border rounded hover:border-text transition-colors cursor-pointer"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setActiveSlide(prev => (prev < 3 ? prev + 1 : 0))}
                    className="px-3 py-1.5 text-xs bg-surface border border-border rounded hover:border-text transition-colors cursor-pointer"
                  >
                    Próximo Slide
                  </button>
                </div>
              </div>
            </div>

            {/* Contexto da Entrega */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-center p-6 sm:p-8 bg-surface border border-border rounded-lg">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-trust font-semibold">
                  Estrutura Técnica da Peça
                </span>
                <h3 className="text-2xl font-display text-text font-bold">
                  {carouselItem.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {carouselItem.context}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-border text-sm">
                <div>
                  <span className="text-xs uppercase font-mono text-muted block mb-1">Decisão de Curadoria:</span>
                  <p className="text-text font-medium">{carouselItem.decision}</p>
                </div>
                <div>
                  <span className="text-xs uppercase font-mono text-muted block mb-1">Entregável Final:</span>
                  <p className="text-text font-medium">{carouselItem.deliverable}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'identity' && (
          <div className="p-8 bg-bg border border-border rounded-lg space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-action font-semibold">Sistema de Cores & Contrastes</span>
              <h3 className="text-2xl font-display text-text font-bold">Paleta Mineral & Tipografia Editorial</h3>
              <p className="text-sm text-muted">
                Zero arco-íris ou gradientes fluorescentes. Cores selecionadas para leitura prolongada, contraste WCAG AA e presença refinada em qualquer dispositivo.
              </p>
            </div>

            {/* Amostras de Cores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {identityItem?.specimens?.colors?.map((c, i) => (
                <div key={i} className="bg-surface border border-border rounded overflow-hidden">
                  <div className="h-20 w-full" style={{ backgroundColor: c.hex }}></div>
                  <div className="p-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-text">{c.name}</span>
                      <span className="text-xs font-mono text-muted">{c.hex}</span>
                    </div>
                    <p className="text-xs text-muted leading-tight">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Amostras de Tipos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
              <div className="p-6 bg-surface border border-border rounded space-y-2">
                <span className="text-xs font-mono text-muted uppercase">Tipografia de Títulos</span>
                <p className="text-3xl font-display text-text font-bold">Playfair Display</p>
                <p className="text-xs text-muted">Serifas desenhadas para autoridade, capas institucionais e citações de alto impacto.</p>
              </div>
              <div className="p-6 bg-surface border border-border rounded space-y-2">
                <span className="text-xs font-mono text-muted uppercase">Tipografia de Leitura</span>
                <p className="text-2xl font-body text-text font-semibold">Plus Jakarta Sans</p>
                <p className="text-xs text-muted">Desenho limpo e contemporâneo para parágrafos corridos, botões e dados analíticos.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// 5. ESPECIALIDADES & ESCOPOS CLAROS (SERVIÇOS)
// ----------------------------------------------------------------------
function ServicesSection({ services }: { services: Service[] }) {
  const activeServices = services.filter(s => s.status === 'active').sort((a, b) => a.order_index - b.order_index);

  return (
    <section id="servicos" className="py-20 md:py-28 px-6 bg-bg border-b border-border">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs uppercase tracking-widest text-action font-semibold">Especialidades</span>
          <h2 className="text-3xl md:text-5xl font-display text-text leading-tight">
            Escopos transparentes com limites bem definidos.
          </h2>
          <p className="text-muted text-base leading-relaxed">
            Acreditamos que boa relação comercial nasce da clareza. Você sabe exatamente o que recebe e o que não faz parte do serviço antes de qualquer contrato.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeServices.map(service => (
            <div
              key={service.id}
              className="p-8 bg-surface border border-border rounded-lg flex flex-col justify-between space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold font-display text-text">{service.title}</h3>
                  {service.investment_range && (
                    <span className="text-xs font-mono font-medium px-2.5 py-1 bg-bg border border-border rounded shrink-0">
                      {service.investment_range}
                    </span>
                  )}
                </div>

                <div className="p-3 bg-bg rounded text-sm text-muted border border-border/60">
                  <strong className="text-text font-medium">O problema que resolve:</strong> {service.problem_solved}
                </div>

                <div className="space-y-3 pt-2 text-sm">
                  <div>
                    <span className="text-xs uppercase font-mono text-action font-semibold block mb-1">
                      O que está incluído:
                    </span>
                    <p className="text-text/90 leading-relaxed">{service.deliverables}</p>
                  </div>

                  <div>
                    <span className="text-xs uppercase font-mono text-muted font-semibold block mb-1">
                      Para quem é indicado:
                    </span>
                    <p className="text-muted leading-relaxed">{service.target_audience}</p>
                  </div>

                  <div className="pt-2 border-t border-border/60">
                    <span className="text-xs uppercase font-mono text-red-600/80 font-semibold block mb-1">
                      O que NÃO está incluído:
                    </span>
                    <p className="text-xs text-muted leading-relaxed">{service.not_included}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted">
                <span>Prazo de execução: <strong>{service.timeframe}</strong></span>
                <a
                  href="#contato"
                  className="inline-flex items-center gap-1 text-action font-semibold hover:underline"
                >
                  Consultar formato <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// 6. PACOTES COMERCIAIS FLEXÍVEIS
// ----------------------------------------------------------------------
function PackagesSection({ packages }: { packages: Package[] }) {
  const activePkgs = packages.filter(p => p.status === 'active').sort((a, b) => a.order_index - b.order_index);

  return (
    <section id="pacotes" className="py-20 md:py-28 px-6 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs uppercase tracking-widest text-action font-semibold">Planos & Pacotes</span>
          <h2 className="text-3xl md:text-5xl font-display text-text leading-tight">
            Estrutura comercial adaptável ao seu momento.
          </h2>
          <p className="text-muted text-base leading-relaxed">
            Seja para criar sua base visual inicial ou para governar o conteúdo contínuo da sua marca com direção de arte semanal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activePkgs.map(pkg => (
            <div
              key={pkg.id}
              className={`p-6 sm:p-8 rounded-lg flex flex-col justify-between transition-all ${
                pkg.is_highlighted
                  ? 'bg-bg border-2 border-action shadow-md relative'
                  : 'bg-bg border border-border'
              }`}
            >
              {pkg.is_highlighted && (
                <div className="absolute -top-3 left-6 bg-action text-white px-3 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  Recomendado para Negócios
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold font-display text-text">{pkg.level}</h3>
                  <p className="text-xs text-muted mt-1 leading-snug">{pkg.commercial_role}</p>
                </div>

                <div className="py-2 border-y border-border">
                  <p className="text-xs text-muted uppercase font-mono">Investimento Estimado</p>
                  <p className="text-2xl font-bold font-display text-text mt-1">
                    {pkg.price_type === 'on_request'
                      ? 'Sob Consulta'
                      : pkg.price_type === 'starting_at'
                      ? `A partir de R$ ${pkg.price?.toLocaleString('pt-BR')}`
                      : `R$ ${pkg.price?.toLocaleString('pt-BR')}`}
                  </p>
                </div>

                <p className="text-xs text-muted leading-relaxed">{pkg.description}</p>

                <div className="space-y-2 pt-2">
                  <p className="text-[11px] uppercase font-mono text-text/80 font-bold">O que compõe a entrega:</p>
                  <ul className="space-y-2 text-xs text-text/90">
                    {pkg.items?.sort((a, b) => a.order_index - b.order_index).map(item => (
                      <li key={item.id} className="flex items-start gap-2">
                        <Check size={14} className="text-action shrink-0 mt-0.5" />
                        <span>
                          {item.quantity ? <strong className="font-semibold">{item.quantity} </strong> : null}
                          {item.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border space-y-3">
                <div className="text-[11px] text-muted space-y-1">
                  <p>Prazo: {pkg.timeframe}</p>
                  <p>Refinamento: {pkg.revisions}</p>
                </div>

                <a
                  href="#contato"
                  className={`w-full py-3 rounded text-center text-xs font-semibold block transition-colors ${
                    pkg.is_highlighted
                      ? 'bg-action hover:bg-action-hover text-white shadow-sm'
                      : 'bg-surface border border-border hover:border-text text-text'
                  }`}
                >
                  Iniciar com o {pkg.level}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// 7. PERGUNTAS FREQUENTES (FAQ ESTRATÉGICO)
// ----------------------------------------------------------------------
function FaqSection({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.id || null);

  if (!faqs.length) return null;

  return (
    <section className="py-20 md:py-28 px-6 bg-bg border-b border-border">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-action font-semibold">Respostas Transparentes</span>
          <h2 className="text-3xl md:text-4xl font-display text-text font-bold">Perguntas Frequentes</h2>
          <p className="text-sm sm:text-base text-muted max-w-xl mx-auto">
            Tudo o que você precisa saber sobre prazos, autoria, uso de tecnologia e o fluxo prático de trabalho.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.sort((a, b) => a.order_index - b.order_index).map(faq => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-surface border border-border rounded-lg overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-bg/50 transition-colors"
                >
                  <span className="text-base font-bold text-text font-display">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-muted transition-transform shrink-0 ${isOpen ? 'rotate-180 text-action' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-muted leading-relaxed border-t border-border/50 pt-4 bg-bg/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// 8. FORMULÁRIO DE CONTATO & QUALIFICAÇÃO SEM FRICÇÃO
// ----------------------------------------------------------------------
function ContactSection() {
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
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      business_name: formData.get('business_name') as string,
      need: formData.get('need') as string,
      objective: formData.get('objective') as string,
      timeframe: formData.get('timeframe') as string,
      investment_range: formData.get('investment_range') as string,
      preferred_channel: (formData.get('preferred_channel') as string) || 'whatsapp',
      message: (formData.get('message') as string) || null,
      origin: 'Site Institucional - Formulário Principal'
    };

    try {
      const res = await dataLayer.submitLead(leadPayload);
      if (res.success) {
        setSubmitted(true);
        form.reset();
      } else {
        setErrorMessage(res.error || 'Não foi possível enviar sua mensagem no momento. Tente novamente.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro de conexão ao enviar o formulário.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contato" className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-4xl mx-auto">
        <div className="bg-bg border border-border rounded-xl p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl space-y-3 mb-10">
            <span className="text-xs uppercase tracking-widest text-action font-semibold">Contato Direto</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">
              Vamos alinhar a direção do seu projeto?
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Preencha os dados essenciais abaixo. Analisamos seu segmento e retornamos em até 1 dia útil pelo canal da sua preferência, com um diagnóstico preliminar e sugestão de escopo.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg space-y-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <FileCheck2 size={28} className="text-emerald-700" />
                <h3 className="text-xl font-bold font-display">Mensagem recebida com sucesso.</h3>
              </div>
              <p className="text-sm leading-relaxed text-emerald-800">
                Obrigado pelo contato. Nós analisamos cuidadosamente as informações recebidas e entraremos em contato diretamente com você em até 1 dia útil.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold underline underline-offset-4 text-emerald-950 hover:text-emerald-800 cursor-pointer"
              >
                Enviar outra mensagem ou atualizar dados
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text uppercase tracking-wider block">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Ex: Amanda Carvalho"
                    className="w-full px-4 py-3 bg-surface border border-border rounded text-sm focus:outline-none focus:border-action transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text uppercase tracking-wider block">
                    Nome da sua Empresa / Negócio *
                  </label>
                  <input
                    type="text"
                    name="business_name"
                    required
                    placeholder="Ex: Carvalho & Associados"
                    className="w-full px-4 py-3 bg-surface border border-border rounded text-sm focus:outline-none focus:border-action transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text uppercase tracking-wider block">
                    Seu Melhor E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="amanda@seuemail.com"
                    className="w-full px-4 py-3 bg-surface border border-border rounded text-sm focus:outline-none focus:border-action transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text uppercase tracking-wider block">
                    WhatsApp Comercial com DDD *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(11) 98765-4321"
                    className="w-full px-4 py-3 bg-surface border border-border rounded text-sm focus:outline-none focus:border-action transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text uppercase tracking-wider block">
                    Qual é o principal desafio hoje? *
                  </label>
                  <select
                    name="need"
                    required
                    className="w-full px-4 py-3 bg-surface border border-border rounded text-sm focus:outline-none focus:border-action transition-colors text-text"
                  >
                    <option value="">Selecione uma opção...</option>
                    <option value="Criar ou Reposicionar Identidade Visual">Criar ou Reposicionar Identidade Visual</option>
                    <option value="Direção Editorial e Roteiros Mensais">Direção Editorial e Roteiros Mensais</option>
                    <option value="Design de Carrosséis e Peças para Redes">Design de Carrosséis e Peças para Redes</option>
                    <option value="Comunicação de Campanha ou Lançamento">Comunicação de Campanha ou Lançamento</option>
                    <option value="Outro desafio personalizado">Outro desafio personalizado</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text uppercase tracking-wider block">
                    Prazo Desejado para Início *
                  </label>
                  <select
                    name="timeframe"
                    required
                    className="w-full px-4 py-3 bg-surface border border-border rounded text-sm focus:outline-none focus:border-action transition-colors text-text"
                  >
                    <option value="Imediato (próximos 7 dias)">Imediato (próximos 7 dias)</option>
                    <option value="Nas próximas 2 a 3 semanas">Nas próximas 2 a 3 semanas</option>
                    <option value="No próximo mês">No próximo mês</option>
                    <option value="Apenas pesquisando referências">Apenas pesquisando referências</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-text uppercase tracking-wider block">
                  Contexto ou Mensagem Adicional (Opcional)
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Conte brevemente sobre o seu momento, canais atuais ou referências que você aprecia..."
                  className="w-full px-4 py-3 bg-surface border border-border rounded text-sm focus:outline-none focus:border-action transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="font-semibold text-text">Preferência de Retorno:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="preferred_channel" value="whatsapp" defaultChecked />
                    <span>WhatsApp</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="preferred_channel" value="email" />
                    <span>E-mail</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-action hover:bg-action-hover disabled:opacity-50 text-white rounded text-sm font-semibold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                >
                  <Send size={16} />
                  <span>{loading ? 'Enviando...' : 'Enviar Solicitação de Contato'}</span>
                </button>
              </div>

              <p className="text-[11px] text-muted text-center pt-2">
                Respeitamos sua privacidade. Seus dados nunca serão compartilhados com terceiros em conformidade com a LGPD.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
