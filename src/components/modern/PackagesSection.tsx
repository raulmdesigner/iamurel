import React from 'react';
import { Check, XCircle, Sparkles, Clock, ArrowRight, Layers } from 'lucide-react';
import { Package } from '../../types';
import { ScrollReveal } from './ScrollReveal';

interface PackagesSectionProps {
  packages: Package[];
  onSelectPlan: (planLevel: string) => void;
}

export function PackagesSection({ packages, onSelectPlan }: PackagesSectionProps) {
  const activePackages = packages
    .filter((p) => p.status === 'active')
    .sort((a, b) => a.order_index - b.order_index);

  return (
    <section id="pacotes" className="py-20 md:py-28 px-6 bg-bg border-b border-border relative overflow-hidden">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs uppercase tracking-widest text-action font-extrabold flex items-center gap-2">
                <Layers size={16} />
                Formatos & Prazos
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">
                Planos com Escopo Fechado & Previsibilidade
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Cada pacote foi estruturado para atender uma fase clara de maturidade do seu negócio, sem cobranças surpresa ou prazos indeterminados.
              </p>
            </div>

            <div className="text-xs font-mono text-muted bg-surface border border-border px-4 py-2.5 rounded-xl shrink-0">
              Prazos Contratuais em Dias Úteis
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {activePackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-3xl p-8 sm:p-9 flex flex-col justify-between space-y-8 transition-all duration-300 relative group ${
                  pkg.is_highlighted
                    ? 'bg-surface border-2 border-action shadow-2xl md:-translate-y-2 ring-4 ring-action/10'
                    : 'bg-surface border border-border/90 hover:border-action/40 hover:shadow-lg'
                }`}
              >
                {pkg.is_highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-action text-white px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 shadow-md">
                    <Sparkles size={12} />
                    <span>Mais Solicitado • Recomendado</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Top metadata */}
                  <div className="space-y-1.5">
                    <span
                      className={`text-[11px] font-mono font-extrabold uppercase tracking-wider block ${
                        pkg.is_highlighted ? 'text-action' : 'text-muted'
                      }`}
                    >
                      {pkg.commercial_role}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-text">
                      {pkg.level}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed pt-1">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price and timeframe box */}
                  <div className="p-5 rounded-2xl bg-bg border border-border space-y-2">
                    <span className="text-[10px] font-mono text-muted uppercase font-bold tracking-wider block">
                      Investimento Estimado
                    </span>
                    <p className="text-2xl sm:text-3xl font-extrabold font-display text-text tracking-tight">
                      {pkg.price_type === 'hidden'
                        ? 'Sob Consulta'
                        : pkg.price_type === 'starting_at'
                        ? `A partir de R$ ${pkg.price?.toLocaleString('pt-BR')}`
                        : pkg.price_type === 'fixed'
                        ? `R$ ${pkg.price?.toLocaleString('pt-BR')}`
                        : 'Sob Consulta'}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-action font-semibold pt-1 border-t border-border/70">
                      <Clock size={13} className="shrink-0" />
                      <span>Prazo médio: {pkg.timeframe}</span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-text font-bold block">
                      Entregáveis do Pacote:
                    </span>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-text/90">
                      {pkg.items?.map((item) => (
                        <li
                          key={item.id}
                          className={`flex items-start gap-2.5 ${
                            item.is_included === false ? 'opacity-40 line-through' : ''
                          }`}
                        >
                          {item.is_included === false ? (
                            <XCircle size={15} className="text-muted shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-action/10 text-action flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={11} className="stroke-[3]" />
                            </div>
                          )}
                          <span className="leading-snug">
                            {item.quantity && <strong className="text-text">{item.quantity}× </strong>}
                            {item.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => onSelectPlan(pkg.level)}
                    className={`w-full py-3.5 px-5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                      pkg.is_highlighted
                        ? 'bg-action hover:bg-action-hover text-white shadow-md'
                        : 'bg-bg hover:bg-surface border border-border hover:border-action/40 text-text hover:text-action'
                    }`}
                  >
                    <span>Falar sobre o plano {pkg.level}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
