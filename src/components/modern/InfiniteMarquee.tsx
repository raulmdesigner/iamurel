import React from 'react';
import { IamurelSymbol } from '../brand/IamurelBrand';

interface MarqueeProps {
  items?: string[];
  speed?: 'normal' | 'slow';
  className?: string;
}

const defaultItems = [
  'CONTEÚDO COM DIREÇÃO',
  'DESIGN COM INTENÇÃO',
  'IDENTIDADE VISUAL AUTORAL',
  'CARROSSÉIS 4:5 DE ALTA RETENÇÃO',
  'DIREÇÃO HUMANA + AGILIDADE DE IA',
  'PEÇAS PRONTAS PARA CIRCULAÇÃO',
  'SEM TEMPLATES GENÉRICOS'
];

export function InfiniteMarquee({
  items = defaultItems,
  speed = 'normal',
  className = ''
}: MarqueeProps) {
  return (
    <div
      className={`w-full overflow-hidden whitespace-nowrap bg-dark text-white border-y border-border-dark py-3 relative group select-none ${className}`}
      aria-label="Manifesto e pilares da IAMUREL"
    >
      <div className="inline-flex animate-marquee group-hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((text, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-5 text-xs font-mono font-extrabold uppercase tracking-widest text-bg/90 px-6"
          >
            <span className="hover:text-action transition-colors">{text}</span>
            <span className="inline-flex items-center justify-center opacity-40 text-action">
              <IamurelSymbol className="w-3.5 h-3.5" color="currentColor" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
