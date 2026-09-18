import React, { useState } from 'react';
import { IamurelSymbol, IamurelLogo } from '../brand/IamurelBrand';
import { Sparkles, Eye, ArrowUpRight, Check, Layers, Smartphone } from 'lucide-react';

export function HeroVisuals() {
  const [activeItem, setActiveItem] = useState(0);

  const pieces = [
    {
      type: 'Carrossel 4:5',
      format: '1080 × 1350 px',
      objective: 'Educação e filtro de clientes para uma clínica estética',
      context: 'Carrossel com ritmo editorial e alto contraste tipográfico para posicionar procedimentos com sobriedade médica.',
      badge: 'Demonstração autoral',
      accent: '#1A5F6A',
      mockup: {
        tag: 'SLIDE 01 DE 06',
        title: 'Ácido Hialurônico: O que nunca te contaram sobre naturalidade',
        subtitle: 'Como o excesso de volumização altera a harmonia facial e por que a moderação gera resultados invisíveis.',
        visualDetail: 'Tipografia editorial serifada • Paleta marfim pergaminho & verde mineral',
      }
    },
    {
      type: 'Identidade visual',
      format: 'Sistema Vetor & Manual',
      objective: 'Sistema de marca com aplicações para digital e impressão',
      context: 'Logotipo com símbolo geométrico proprietário, paleta sóbria mineral e regras de aplicação em papelaria e embalagem.',
      badge: 'Demonstração autoral',
      accent: '#FF4A1C',
      mockup: {
        tag: 'BRAND SYSTEM 1:1',
        title: 'Sistema de Identidade & Contraste Mineral',
        subtitle: 'Manual de marca completo com arquivos em vetor SVG, EPS, PDF e tipografia corporativa sob medida.',
        visualDetail: 'Aplicações para fachada, rótulos, crachás e feed padronizado',
      }
    },
    {
      type: 'Campanha',
      format: '1080 × 1920 px',
      objective: 'Key visual, anúncios e peças de lançamento',
      context: 'Criativos verticais para Stories e Reels desenhados para retenção nos primeiros 3 segundos e conversão direta no WhatsApp.',
      badge: 'Demonstração autoral',
      accent: '#C86D3B',
      mockup: {
        tag: 'KEY VISUAL 9:16',
        title: 'Lançamento de Safra Especial & Origem',
        subtitle: 'Criativos em ritmo acelerado com fotografia sensorial e chamadas objetivas para compra de microlotes.',
        visualDetail: 'Formatos para tráfego pago no Meta Ads e Google Ads',
      }
    }
  ];

  const current = pieces[activeItem];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-surface border border-border mt-8 mb-4 shadow-sm">
      {/* Top Bar */}
      <div className="px-6 py-3.5 border-b border-border bg-bg/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-action animate-pulse" />
          <span className="text-[11px] font-bold font-mono tracking-wider uppercase text-text/85">
            Showroom Visual • Demonstrações Autorais
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted bg-surface px-2.5 py-1 rounded border border-border">
          Formatos em proporção real
        </span>
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Real-Scale Showcase Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl bg-dark text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden border border-border-dark shadow-xl">
            {/* Background subtle geometry */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none">
              <IamurelSymbol className="w-64 h-64 text-white -mb-16 -mr-16" />
            </div>

            {/* Header info */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-action font-bold bg-white/10 px-2.5 py-0.5 rounded">
                  {current.type}
                </span>
                <span className="text-[10px] font-mono text-white/60">
                  {current.format}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/50 uppercase">
                {current.badge}
              </span>
            </div>

            {/* Simulated Piece Real Display */}
            <div className="space-y-4 my-auto py-4 relative z-10">
              <span className="text-[11px] font-mono text-action font-semibold uppercase tracking-widest block">
                {current.mockup.tag}
              </span>
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-white leading-tight max-w-lg">
                "{current.mockup.title}"
              </h4>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-md font-sans">
                {current.mockup.subtitle}
              </p>
            </div>

            {/* Footer info inside canvas */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-white/60 relative z-10">
              <span className="text-white/80 font-medium">
                {current.mockup.visualDetail}
              </span>
              <span className="font-mono text-action text-[10px] uppercase font-bold">
                Entrega em vetor e alta resolução
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted px-1">
            <span>Selecione ao lado para alternar formatos e objetivos</span>
            <span className="font-mono text-[11px] text-text font-semibold">Peça {activeItem + 1} de {pieces.length}</span>
          </div>
        </div>

        {/* Right: Three Selectable Spec Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="pb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-action font-bold block mb-1">
              Capacidade de Produção
            </span>
            <h3 className="text-lg font-bold font-display text-text">
              Peças desenhadas para objetivos de negócio
            </h3>
          </div>

          {pieces.map((item, index) => {
            const isSelected = activeItem === index;
            return (
              <button
                key={item.type}
                type="button"
                onClick={() => setActiveItem(index)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-bg border-action ring-1 ring-action/30 shadow-xs'
                    : 'bg-surface border-border hover:border-text/30 hover:bg-bg/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold font-display text-text">
                    {item.type}
                  </span>
                  <span className="text-[10px] font-mono text-muted">
                    {item.format}
                  </span>
                </div>
                <p className="text-xs font-semibold text-text/90 mb-1 leading-snug">
                  {item.objective}
                </p>
                <p className="text-[11px] text-muted leading-relaxed line-clamp-2">
                  {item.context}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
