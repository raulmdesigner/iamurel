import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Sparkles, Smartphone, Layers, Eye, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { IamurelSymbol } from '../brand/IamurelBrand';

interface PortfolioSectionProps {
  onSelectPlan: (plan: string) => void;
}

export function PortfolioSection({ onSelectPlan }: PortfolioSectionProps) {
  const [activeCase, setActiveCase] = useState<number>(0);

  const cases = [
    {
      id: 0,
      badge: 'Estudo Autoral • Estética & Experiência',
      title: 'Black Beard Studio',
      segment: 'Barbearia Premium & Grooming',
      problem: 'O estúdio oferecia um serviço de excelência com café especial e atendimento impecável, mas o perfil parecia uma barbearia genérica de bairro, atraindo clientes que pechinchavam preço.',
      direction: 'Identidade visual com base em carvão mineral e âmbar queimado, carrosséis educativos de alto impacto sobre barba e couro cabeludo, e peças de anúncio geolocalizado com estética cinematográfica.',
      pieces: [
        'Manual de marca e sistema de identidade visual',
        '8 carrosséis estratégicos 4:5 de retenção e autoridade',
        'Criativos verticais 9:16 para tráfego pago local',
        'Cardápio digital de serviços e sinalização de ponto físico'
      ],
      resultObservation: 'Elevação do ticket médio em 35% e atração de clientes executivos dispostos a pagar pelo padrão premium.',
      mockupData: {
        primaryTag: 'CARROSSEL 4:5',
        primaryTitle: 'O que destrói a barba antes mesmo de crescer',
        primarySubtitle: '3 hábitos comuns que você repete todo dia e causam falhas no contorno.',
        accentColor: '#D95B43',
        storyTag: 'REELS 9:16',
        storyTitle: 'Rito de Cuidado',
        storyNote: 'Vídeo institucional com ritmo lento e iluminação lateral dramática.'
      }
    },
    {
      id: 1,
      badge: 'Estudo Autoral • Saúde & Clínica',
      title: 'Dra. Juliana Reis',
      segment: 'Dermatologia & Procedimentos Médicos',
      problem: 'Perfil repleto de posts técnicos com termos acadêmicos e fotos de banco de imagens desconectadas. Baixa retenção e poucos pacientes particulares agendando consultas.',
      direction: 'Linguagem visual refinada, paleta marfim pergaminho e verde petróleo (#1A5F6A), carrosséis desmistificando mitos populares e roteiros para vídeos curtos sem afetação.',
      pieces: [
        'Guia tipográfico editorial e paleta sóbria mineral',
        'Série mensal de carrosséis educativos estruturados',
        'Templates de stories para resposta a dúvidas frequentes',
        'Criativos de captação ética com foco em primeira consulta'
      ],
      resultObservation: 'Pacientes chegam ao consultório educados pelo conteúdo, eliminando dúvidas básicas e acelerando o fechamento de planos.',
      mockupData: {
        primaryTag: 'CARROSSEL EDUCATIVO',
        primaryTitle: 'Ácido Hialurônico: O que nunca te contaram sobre naturalidade',
        primarySubtitle: 'Por que o excesso de produto causa o efeito almofada e como evitar.',
        accentColor: '#1A5F6A',
        storyTag: 'PERGUNTAS 9:16',
        storyTitle: 'Dúvidas Reais',
        storyNote: 'Stories estruturados com caixas de perguntas e respostas em tipografia legível.'
      }
    },
    {
      id: 2,
      badge: 'Estudo Autoral • Gastronomia & Torrefação',
      title: 'Grão & Origem',
      segment: 'Cafeteria Especial & Torrefação Própria',
      problem: 'Concorrência intensa de cafeterias de rede convencionais e dificuldade de justificar o preço superior de cafés de origem única para o público local.',
      direction: 'Comunicação sensorial valorizando a história dos pequenos produtores, embalagens minimalistas com selo de safra e carrosséis explicando a pontuação SCA de cafés especiais.',
      pieces: [
        'Cardápio físico e digital de fácil leitura e navegação',
        'Rótulos e embalagens para linha de grãos especiais',
        'Campanha de lançamento de inverno para redes sociais',
        'Pôsteres editoriais de ambiente e ponto de encontro'
      ],
      resultObservation: 'Venda de pacotes de café em grão para viagem superou o consumo de xícaras no balcão no terceiro mês.',
      mockupData: {
        primaryTag: 'SENSORIAL 4:5',
        primaryTitle: 'A diferença entre café amargo e café doce naturalmente',
        primarySubtitle: 'Entenda como o processo de torra revela notas de caramelo sem adicionar açúcar.',
        accentColor: '#C86D3B',
        storyTag: 'MENU STORY',
        storyTitle: 'Origens da Semana',
        storyNote: 'Destaque visual para os microlotes disponíveis na prensa francesa.'
      }
    }
  ];

  const current = cases[activeCase];

  return (
    <section id="portfolio" className="py-20 md:py-28 px-6 bg-surface border-b border-border relative">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-action font-extrabold flex items-center gap-2">
                <Sparkles size={14} />
                Casos de Aplicação Prática
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">
                Veja a entrega da IAMUREL em ação.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Demonstrações autorais que mostram como diagnosticamos o problema, definimos a direção estética e finalizamos as peças prontas para circulação.
              </p>
            </div>

            {/* Case selector pills */}
            <div className="flex bg-bg p-1.5 rounded-2xl border border-border gap-1.5 overflow-x-auto shrink-0 max-w-full">
              {cases.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCase(idx)}
                  className={`px-5 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                    activeCase === idx
                      ? 'bg-action text-white shadow-md'
                      : 'text-muted hover:text-text hover:bg-surface'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Case Showcase Container */}
          <div className="bg-bg border border-border rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch shadow-md">
            
            {/* Left Column: Diagnostics & Direction */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-action bg-action/10 px-3 py-1 rounded-full">
                    {current.badge}
                  </span>
                  <span className="text-xs font-mono text-muted">
                    Nicho: {current.segment}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-text tracking-tight">
                    {current.title}
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-5 bg-surface border border-rose-200/50 rounded-2xl space-y-1.5">
                    <span className="font-extrabold text-rose-600 block uppercase text-[10px] font-mono tracking-wider">
                      O Gargalo Anterior:
                    </span>
                    <p className="text-text/90 leading-relaxed">{current.problem}</p>
                  </div>

                  <div className="p-5 bg-surface border border-action/30 rounded-2xl space-y-1.5">
                    <span className="font-extrabold text-action block uppercase text-[10px] font-mono tracking-wider">
                      A Solução Criativa da IAMUREL:
                    </span>
                    <p className="text-text/90 leading-relaxed">{current.direction}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold font-mono text-text uppercase block tracking-wider">
                    Peças Produzidas no Ecossistema:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text/85">
                    {current.pieces.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-border/70">
                        <Check size={14} className="text-action shrink-0 stroke-[3]" />
                        <span className="truncate">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted block">Impacto Comercial</span>
                  <p className="text-xs font-bold text-text">{current.resultObservation}</p>
                </div>
                <button
                  onClick={() => onSelectPlan(`Quero uma direção similar ao projeto: ${current.title}`)}
                  className="px-5 py-3 rounded-xl bg-action hover:bg-action-hover text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  <span>Quero Esse Padrão</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Right Column: High-Fidelity Editorial Mockups */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="bg-surface border border-border/90 rounded-2xl p-6 shadow-sm space-y-6 flex-grow flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-action" />
                    <span className="font-bold text-text">Simulação Real das Peças em Circulação</span>
                  </div>
                  <span className="text-[11px] font-mono text-muted">Arquivos Finais</span>
                </div>

                {/* Editorial Visual Composition */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center my-auto">
                  
                  {/* Primary 4:5 Carousel Card */}
                  <div className="sm:col-span-8 bg-dark text-white rounded-2xl p-5 space-y-4 border border-border-dark shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between text-[10px] border-b border-white/10 pb-2">
                      <span className="font-mono font-bold text-action uppercase tracking-widest">
                        {current.mockupData.primaryTag}
                      </span>
                      <IamurelSymbol className="w-4 h-4 text-action" />
                    </div>

                    <div className="space-y-2 py-2">
                      <h4 className="text-lg font-display font-black text-white leading-snug">
                        "{current.mockupData.primaryTitle}"
                      </h4>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {current.mockupData.primarySubtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50">
                      <span>Proporção 1080 × 1350 px</span>
                      <span className="text-action font-bold">Deslize para ler →</span>
                    </div>
                  </div>

                  {/* Secondary 9:16 Vertical Story / Mobile Card */}
                  <div className="sm:col-span-4 bg-surface border-2 border-border/80 rounded-2xl p-4 space-y-3 shadow-md flex flex-col justify-between h-full min-h-[200px]">
                    <div className="flex items-center justify-between text-[10px] border-b border-border pb-2">
                      <span className="font-mono font-bold text-action uppercase">
                        {current.mockupData.storyTag}
                      </span>
                      <Smartphone size={12} className="text-muted" />
                    </div>

                    <div className="space-y-1.5 my-auto">
                      <p className="text-xs font-bold font-display text-text leading-tight">
                        {current.mockupData.storyTitle}
                      </p>
                      <p className="text-[11px] text-muted leading-relaxed">
                        {current.mockupData.storyNote}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border text-[9px] font-mono text-muted text-center">
                      9:16 • Pronto para postar
                    </div>
                  </div>

                </div>

                {/* Transparency footnote */}
                <div className="p-3.5 bg-bg border border-border rounded-xl text-xs text-muted flex items-start gap-2.5 leading-relaxed">
                  <ShieldCheck size={16} className="text-action shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-text font-semibold">Demonstração Autoral:</strong> Estudos e soluções reais baseadas na metodologia da IAMUREL para empresas que buscam se afastar do aspecto amador.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
