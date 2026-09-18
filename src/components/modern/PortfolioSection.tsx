import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Sparkles, Smartphone, Layers, Eye, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { IamurelSymbol } from '../brand/IamurelBrand';

interface PortfolioSectionProps {
  onSelectPlan: (plan: string) => void;
}

export function PortfolioSection({ onSelectPlan }: PortfolioSectionProps) {
  const [activeTab, setActiveTab] = useState<'demonstracoes' | 'realizados'>('demonstracoes');
  const [activeCase, setActiveCase] = useState<number>(0);

  const cases = [
    {
      id: 0,
      badge: 'Estudo Conceitual Autoral',
      title: 'Black Beard Studio',
      segment: 'Barbearia Premium & Grooming',
      problem: 'O estúdio oferecia um serviço de excelência com atendimento impecável, mas o perfil parecia uma barbearia comum de bairro, atraindo clientes que pechinchavam preço.',
      direction: 'Identidade visual com base em carvão mineral e âmbar queimado, carrosséis educativos de alto impacto sobre barba e couro cabeludo, e peças de anúncio com estética cinematográfica.',
      pieces: [
        'Manual de marca e sistema de identidade visual',
        '8 carrosséis estratégicos 4:5 de retenção e autoridade',
        'Criativos verticais 9:16 para anúncios geolocalizados',
        'Cardápio digital de serviços e sinalização de ponto físico'
      ],
      projectedImpact: 'Aumentar a percepção de valor e alinhar o perfil ao padrão do ambiente físico, reduzindo objeções de preço e atraindo clientes que buscam cuidado premium.',
      mockupData: {
        primaryTag: 'CARROSSEL 4:5',
        primaryTitle: 'O que destrói a barba antes mesmo de crescer',
        primarySubtitle: '3 hábitos comuns que você repete todo dia e causam falhas no contorno.',
        accentColor: '#D95B43',
        storyTag: 'REELS 9:16',
        storyTitle: 'Rito de Cuidado',
        storyNote: 'Vídeo institucional com ritmo sóbrio e iluminação lateral dramática.'
      }
    },
    {
      id: 1,
      badge: 'Estudo Conceitual Autoral',
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
      projectedImpact: 'Reduzir a aparência genérica e educar os pacientes antes da consulta, organizando a comunicação clínica com sobriedade.',
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
      badge: 'Estudo Conceitual Autoral',
      title: 'Grão & Origem',
      segment: 'Cafeteria Especial & Torrefação Própria',
      problem: 'Concorrência intensa de cafeterias de rede convencionais e dificuldade de justificar o preço superior de cafés de origem única para o público local.',
      direction: 'Comunicação sensorial valorizando a história dos pequenos produtores, embalagens minimalistas com selo de safra e carrosséis explicando a pontuação SCA de cafés especiais.',
      pieces: [
        'Cardápio físico e digital de fácil leitura e navegação',
        'Rótulos e embalagens para linha de grãos especiais',
        'Campanha de lançamento para redes sociais',
        'Pôsteres editoriais de ambiente e ponto de encontro'
      ],
      projectedImpact: 'Criar uma base visual sólida para embalagens e campanhas, facilitando a diferenciação de cafés especiais frente a opções comerciais.',
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
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header section with required title and conceptual warning badge */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-action font-extrabold flex items-center gap-2">
                <Sparkles size={14} />
                Casos de Aplicação
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">
                Demonstrações autorais do método
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Estudos desenvolvidos para demonstrar na prática como atuamos no diagnóstico, na direção de arte e na entrega final.
              </p>
              
              {/* Selo visível obrigatório */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg border border-border text-[11px] font-mono text-muted font-semibold">
                <ShieldCheck size={14} className="text-action shrink-0" />
                <span>Projeto conceitual — não representa resultado comercial medido.</span>
              </div>
            </div>

            {/* Abas: Demonstrações Autorais vs Projetos Realizados */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex bg-bg p-1.5 rounded-2xl border border-border gap-1.5 overflow-x-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('demonstracoes')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'demonstracoes'
                      ? 'bg-action text-white shadow-xs'
                      : 'text-muted hover:text-text hover:bg-surface'
                  }`}
                >
                  Demonstrações autorais
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('realizados')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'realizados'
                      ? 'bg-action text-white shadow-xs'
                      : 'text-muted hover:text-text hover:bg-surface'
                  }`}
                >
                  Projetos realizados
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'realizados' ? (
            <div className="p-12 text-center bg-bg rounded-3xl border border-border space-y-4">
              <h3 className="text-xl font-bold font-display text-text">Projetos Realizados em Atualização</h3>
              <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                Estamos organizando as autorizações de veiculação e métricas consolidadas dos clientes em operação contínua. Consulte os estudos autorais para ver o padrão técnico de entrega.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('demonstracoes')}
                className="text-action font-bold text-xs hover:underline cursor-pointer"
              >
                Voltar às demonstrações autorais →
              </button>
            </div>
          ) : (
            <>
              {/* Case selector pills */}
              <div className="flex bg-bg p-1.5 rounded-2xl border border-border gap-1.5 overflow-x-auto">
                {cases.map((c, idx) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCase(idx)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                      activeCase === idx
                        ? 'bg-action text-white shadow-xs'
                        : 'text-muted hover:text-text hover:bg-surface'
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>

              {/* Active Case Showcase Container */}
              <div className="bg-bg border border-border rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch shadow-xs">
                
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
                      <div className="p-5 bg-surface border border-rose-200/60 rounded-2xl space-y-1.5">
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
                        Peças Desenvolvidas:
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
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-action font-bold block tracking-wider">
                        Impacto projetado
                      </span>
                      <p className="text-xs text-text/90 font-medium max-w-sm leading-relaxed">
                        {current.projectedImpact}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectPlan(`Quero uma direção similar ao projeto: ${current.title}`)}
                      className="px-5 py-3 rounded-xl bg-action hover:bg-action-hover text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-xs transition-all shrink-0"
                    >
                      <span>Quero Esse Padrão</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Right Column: High-Fidelity Editorial Mockups */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div className="bg-surface border border-border/90 rounded-2xl p-6 shadow-xs space-y-6 flex-grow flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs pb-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-action" />
                        <span className="font-bold text-text">Simulação Real das Peças</span>
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
                      <div className="sm:col-span-4 bg-surface border-2 border-border/80 rounded-2xl p-4 space-y-3 shadow-sm flex flex-col justify-between h-full min-h-[200px]">
                        <div className="flex items-center justify-between text-[10px] border-b border-border pb-2">
                          <span className="font-mono font-bold text-action uppercase">
                            {current.mockupData.storyTag}
                          </span>
                          <Smartphone size={12} className="text-muted" />
                        </div>

                        <div className="space-y-1.5 my-auto">
                          <p className="text-xs font-bold text-text font-display">
                            {current.mockupData.storyTitle}
                          </p>
                          <p className="text-[11px] text-muted leading-tight">
                            {current.mockupData.storyNote}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-border text-[9px] font-mono text-muted">
                          Vertical 1080×1920
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-bg border border-border text-xs text-muted flex items-center justify-between">
                      <span>Entrega organizada com links em nuvem</span>
                      <span className="text-action font-bold font-mono">100% autoral</span>
                    </div>
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
