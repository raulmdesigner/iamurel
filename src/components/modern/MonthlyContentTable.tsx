import React from 'react';
import { Layers, CheckCircle2, XCircle, Clock, RefreshCw, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';
import { SiteSettings } from '../../types';
import { ScrollReveal } from './ScrollReveal';

interface MonthlyContentTableProps {
  settings: SiteSettings;
  onSelectPlan: (planName: string) => void;
}

export function MonthlyContentTable({ settings, onSelectPlan }: MonthlyContentTableProps) {
  const defaultDeliverables = [
    'Carrosséis estratégicos 4:5 e artes estáticas de alto impacto',
    'Copywriting e legendas prontas com direcionamento de tom de voz',
    'Roteiros com ganchos magnéticos para gravação de Reels e vídeos curtos',
    'Revisão estruturada de layout antes do fechamento do lote',
    'Pastas compartilhadas em nuvem com arquivos finais organizados em altíssima resolução',
  ];

  const defaultNotIncluded = [
    'Captação e filmagem presencial com câmera no local da sua empresa',
    'Gestão de tráfego pago e investimento em anúncios (Meta/Google Ads)',
    'Resposta de mensagens diretas (DMs) e moderação de comentários',
    'Edição complexa de vídeos longos (YouTube, podcasts ou documentários)',
  ];

  const deliverables = settings.monthly_deliverables
    ? settings.monthly_deliverables.split('\n').filter((l) => l.trim().length > 0)
    : defaultDeliverables;

  const notIncluded = settings.monthly_not_included
    ? settings.monthly_not_included.split('\n').filter((l) => l.trim().length > 0)
    : defaultNotIncluded;

  const priceAnchor = settings.monthly_price_anchor || 'A partir de R$ 1.800/mês para esteira contínua';
  const revisions = settings.monthly_revisions || 'Até 2 rodadas estruturadas de ajustes por lote quinzenal';

  return (
    <section id="operacao-mensal" className="py-20 md:py-28 px-6 bg-surface border-b border-border relative">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs uppercase tracking-widest text-action font-extrabold flex items-center gap-2">
                <Layers size={16} />
                Contrato Sem Burocracia
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">
                {settings.monthly_title || 'Operação de Conteúdo Mensal'}
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {settings.monthly_subtitle || 'Produção editorial contínua com direção criativa humana e velocidade de inteligência artificial. Sem sustos ou escopos ocultos.'}
              </p>
            </div>

            <div className="bg-bg border-2 border-action/40 p-5 rounded-2xl shrink-0 space-y-1 text-left md:text-right shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted font-bold block">
                ÂNCORA DE INVESTIMENTO
              </span>
              <p className="text-xl sm:text-2xl font-extrabold text-action font-display">
                {priceAnchor}
              </p>
              <span className="text-[11px] text-muted block">Escopo fechado com cronograma previsível</span>
            </div>
          </div>

          {/* Tabela de Detalhamento de Escopo */}
          <div className="bg-bg border border-border rounded-3xl overflow-hidden shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
              {/* Entregáveis Incluídos */}
              <div className="p-8 sm:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 block">
                      ENTREGÁVEIS CONFIRMADOS
                    </span>
                    <h3 className="text-lg font-bold text-text font-display">
                      O que está 100% INCLUÍDO no ciclo mensal:
                    </h3>
                  </div>
                </div>

                <ul className="space-y-4">
                  {deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-xs sm:text-sm text-text leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={13} className="stroke-[3]" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limites & O que NÃO está incluído */}
              <div className="p-8 sm:p-10 space-y-6 bg-surface/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
                    <XCircle size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 block">
                      FRONTEIRAS DE ESCOPO
                    </span>
                    <h3 className="text-lg font-bold text-text font-display">
                      O que FICA DE FORA (Sem pegadinhas):
                    </h3>
                  </div>
                </div>

                <ul className="space-y-4">
                  {notIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-xs sm:text-sm text-muted leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                        <XCircle size={13} className="stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rodapé da tabela com Políticas de Revisão e Prazos */}
            <div className="bg-surface p-6 sm:p-8 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-action/10 text-action flex items-center justify-center shrink-0">
                  <RefreshCw size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-bold block">
                    Política de Revisões
                  </span>
                  <p className="text-xs font-bold text-text">
                    {revisions}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-action/10 text-action flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-bold block">
                    Ciclo de Entrega
                  </span>
                  <p className="text-xs font-bold text-text">
                    Lotes quinzenais organizados na nuvem
                  </p>
                </div>
              </div>

              <div className="flex justify-start md:justify-end">
                <button
                  type="button"
                  onClick={() => onSelectPlan('Produzir Conteúdo com Consistência (Plano Mensal)')}
                  className="w-full md:w-auto px-7 py-4 bg-action hover:bg-action-hover text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-md active:scale-[0.98]"
                >
                  <span>Solicitar Diagnóstico Mensal</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
