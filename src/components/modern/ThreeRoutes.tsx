import React from 'react';
import { Palette, CalendarCheck, Megaphone, ArrowRight, Check, Sparkles, Layers } from 'lucide-react';
import { SiteSettings } from '../../types';
import { ScrollReveal } from './ScrollReveal';

interface ThreeRoutesProps {
  settings: SiteSettings;
  onSelectRoute: (routeName: string) => void;
}

export function ThreeRoutes({ settings, onSelectRoute }: ThreeRoutesProps) {
  const routes = [
    {
      id: 'fundacao',
      name: 'Fundação',
      problem: 'Para marcas sem base sólida, que parecem genéricas e precisam reposicionar a percepção de valor antes de investir em tráfego.',
      deliverables: [
        'Manual de Identidade Visual',
        'Arquivos em vetor (SVG/EPS/PDF)',
        'Guia tipográfico e cromático',
        'Aplicações em embalagem e digital'
      ],
      cta: 'Quero construir a base da minha marca',
      targetPlan: 'Fundação (Identidade Visual)',
      icon: Palette,
      featured: false,
    },
    {
      id: 'constancia',
      name: 'Constância',
      badgeExplanation: 'Mais procurado por negócios que já possuem identidade e precisam publicar com consistência',
      problem: 'Para quem já tem marca validada e precisa de frequência editorial, carrosséis estratégicos, roteiros e peças prontas todo mês.',
      deliverables: [
        '12 a 20 peças finais mensais',
        'Carrosséis 4:5 e artes estáticas',
        'Copywriting e legendas prontas',
        'Roteiros com ganchos para Reels'
      ],
      cta: 'Quero avaliar o fluxo mensal',
      targetPlan: 'Constância (Conteúdo Mensal)',
      icon: CalendarCheck,
      featured: true,
    },
    {
      id: 'conversao',
      name: 'Conversão',
      problem: 'Para marcas com oferta, lançamento ou produto específico que necessitam de narrativa visual focada em venda rápida.',
      deliverables: [
        'Key visuals de campanha',
        'Criativos verticais para anúncios',
        'Página de vendas ou captura',
        'Materiais visuais de suporte comercial'
      ],
      cta: 'Quero estruturar uma campanha',
      targetPlan: 'Conversão (Campanha Específica)',
      icon: Megaphone,
      featured: false,
    },
  ];

  return (
    <section id="como-funciona" className="py-20 md:py-28 px-6 bg-surface border-b border-border relative">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs uppercase tracking-widest text-action font-extrabold flex items-center gap-1.5">
                <Layers size={14} />
                Rotas de Entrada
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">
                {settings.routes_title || 'Qual é o momento atual da sua marca?'}
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {settings.routes_subtitle || 'Escolha a rota de acordo com o gargalo que o seu negócio precisa resolver agora:'}
              </p>
            </div>

            <div className="text-xs text-muted font-mono bg-bg border border-border px-4 py-2.5 rounded-xl shrink-0 self-start md:self-end">
              3 Rotas Definidas
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <div
                  key={route.id}
                  className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 ${
                    route.featured
                      ? 'bg-bg border-2 border-action shadow-xl relative md:-translate-y-1 ring-2 ring-action/10'
                      : 'bg-bg border border-border hover:border-action/40 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-5">
                    {/* Top Name and Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                          route.featured ? 'bg-action text-white' : 'bg-surface border border-border text-action'
                        }`}>
                          <Icon size={20} />
                        </div>
                        <h3 className="text-2xl font-bold font-display text-text">
                          {route.name}
                        </h3>
                      </div>
                    </div>

                    {/* Explicação de Destaque se for Constância */}
                    {route.badgeExplanation && (
                      <p className="text-[11px] font-semibold text-action bg-action/10 border border-action/20 px-3 py-1.5 rounded-lg leading-snug">
                        {route.badgeExplanation}
                      </p>
                    )}

                    {/* 2. O problema que resolve */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-muted tracking-wider block">
                        Problema que resolve:
                      </span>
                      <p className="text-xs sm:text-sm text-text/85 leading-relaxed">
                        {route.problem}
                      </p>
                    </div>

                    {/* 3. Quatro entregáveis principais */}
                    <div className="space-y-2 pt-2 border-t border-border">
                      <span className="text-[10px] font-mono uppercase font-bold text-muted tracking-wider block">
                        4 Entregáveis principais:
                      </span>
                      <ul className="space-y-2">
                        {route.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-text/90">
                            <div className="w-4 h-4 rounded-full bg-action/10 text-action flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={11} className="stroke-[3]" />
                            </div>
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 4. CTA específico */}
                  <div className="pt-4 border-t border-border">
                    <button
                      type="button"
                      onClick={() => onSelectRoute(route.targetPlan)}
                      className={`w-full py-3.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                        route.featured
                          ? 'bg-action hover:bg-action-hover text-white shadow-sm'
                          : 'bg-surface hover:bg-surface-hover border border-border text-text hover:text-action hover:border-action/40'
                      }`}
                    >
                      <span>{route.cta}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
