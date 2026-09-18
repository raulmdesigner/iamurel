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
      id: 'identidade',
      icon: Palette,
      num: '01',
      badge: 'Rota 1 • Fundação',
      title: settings.route_1_title || '1. Identidade Visual & Base de Marca',
      desc: settings.route_1_desc || 'Para empresas sem base sólida, que parecem amadoras no feed e precisam reposicionar a percepção de valor antes de investir em tráfego.',
      cta: settings.route_1_cta || 'Quero criar ou renovar minha marca',
      tag: 'Ideal para reposicionamento',
      targetPlan: 'Identidade Visual & Base de Marca',
      visualPreview: {
        label: 'Entregáveis Típicos',
        bullets: ['Manual de Marca', 'Vetor SVG/EPS', 'Tipografia & Cores', 'Aplicações Reais'],
        accentBg: 'bg-stone-900',
        accentText: 'text-stone-100',
        badgeColor: 'bg-stone-800 text-stone-200'
      }
    },
    {
      id: 'conteudo',
      icon: CalendarCheck,
      num: '02',
      badge: 'Rota 2 • Constância',
      title: settings.route_2_title || '2. Conteúdo Mensal & Constância',
      desc: settings.route_2_desc || 'Para quem já tem marca validada e precisa de frequência editorial, carrosséis estratégicos, roteiros e peças prontas todo mês.',
      cta: settings.route_2_cta || 'Quero avaliar o plano mensal',
      tag: 'Mais procurado por clínicas e serviços',
      targetPlan: 'Conteúdo Mensal & Constância',
      featured: true,
      visualPreview: {
        label: 'Operação Mensal',
        bullets: ['12 a 20 Peças/Mês', 'Copy & Roteiros', 'Carrosséis 4:5', 'Pasta Compartilhada'],
        accentBg: 'bg-dark',
        accentText: 'text-white',
        badgeColor: 'bg-action text-white'
      }
    },
    {
      id: 'campanha',
      icon: Megaphone,
      num: '03',
      badge: 'Rota 3 • Conversão',
      title: settings.route_3_title || '3. Campanhas & Lançamentos',
      desc: settings.route_3_desc || 'Para quem tem uma oferta, produto, evento ou coleção específica e precisa de narrativa, key visuals, páginas e anúncios de alta conversão.',
      cta: settings.route_3_cta || 'Quero estruturar uma campanha',
      tag: 'Pontual para momentos estratégicos',
      targetPlan: 'Campanhas & Lançamentos',
      visualPreview: {
        label: 'Tiro Curto & Foco',
        bullets: ['Key Visuals', 'Anúncios Meta/Google', 'Página de Vendas', 'Materiais de Apoio'],
        accentBg: 'bg-trust',
        accentText: 'text-white',
        badgeColor: 'bg-teal-800 text-teal-100'
      }
    },
  ];

  return (
    <section id="como-comecar" className="py-20 md:py-28 px-6 bg-surface border-b border-border relative">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs uppercase tracking-widest text-action font-extrabold flex items-center gap-1.5">
                <Layers size={14} />
                Direcionamento Estratégico
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">
                {settings.routes_title || 'Qual é o momento atual da sua marca?'}
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {settings.routes_subtitle || 'Não force a sua empresa em um molde genérico. Escolha a rota exata que resolve o seu gargalo hoje:'}
              </p>
            </div>

            <div className="text-xs text-muted font-mono bg-bg border border-border px-4 py-2.5 rounded-xl shrink-0 self-start md:self-end">
              3 Rotas Definidas • Escolha Sem Burocracia
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <div
                  key={route.id}
                  className={`rounded-3xl flex flex-col justify-between transition-all duration-300 overflow-hidden group ${
                    route.featured
                      ? 'bg-bg border-2 border-action shadow-xl relative md:-translate-y-2'
                      : 'bg-bg border border-border/90 hover:border-action/40 hover:shadow-lg'
                  }`}
                >
                  {route.featured && (
                    <div className="bg-action text-white px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-sm">
                      <Sparkles size={13} />
                      <span>Plano Mais Solicitado • Operação Ativa</span>
                    </div>
                  )}

                  <div className="p-7 sm:p-8 space-y-6 flex-grow">
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                        route.featured ? 'bg-action text-white shadow-md' : 'bg-surface border border-border text-action'
                      }`}>
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-muted bg-surface px-3 py-1 rounded-full border border-border">
                        {route.tag}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <div className="space-y-2.5">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-action font-extrabold block">
                        {route.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-text leading-snug">
                        {route.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        {route.desc}
                      </p>
                    </div>

                    {/* Visual Card Preview Inside Route */}
                    <div className={`p-4 rounded-2xl ${route.visualPreview.accentBg} ${route.visualPreview.accentText} space-y-3 shadow-inner`}>
                      <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider opacity-75 border-b border-white/10 pb-2">
                        <span>{route.visualPreview.label}</span>
                        <span className="font-mono">{route.num}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {route.visualPreview.bullets.map((bullet, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px]">
                            <Check size={13} className="text-action shrink-0 stroke-[3]" />
                            <span className="truncate opacity-90">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Bottom Button */}
                  <div className="p-7 sm:p-8 pt-0">
                    <button
                      type="button"
                      onClick={() => onSelectRoute(route.targetPlan)}
                      className={`w-full py-3.5 px-5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] ${
                        route.featured
                          ? 'bg-action hover:bg-action-hover text-white shadow-md'
                          : 'bg-surface hover:bg-surface-hover border border-border text-text hover:text-action hover:border-action/40'
                      }`}
                    >
                      <span>{route.cta}</span>
                      <ArrowRight size={15} />
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
