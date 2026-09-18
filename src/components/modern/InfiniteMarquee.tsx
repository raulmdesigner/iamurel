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
  'IA COM CRITÉRIO HUMANO',
  'PEÇAS PRONTAS PARA CIRCULAR'
];

export function InfiniteMarquee({
  items = defaultItems,
  className = ''
}: MarqueeProps) {
  return (
    <div
      className={`w-full overflow-hidden whitespace-nowrap bg-dark text-white border-y border-border-dark py-3.5 relative group select-none ${className}`}
      aria-label="Pilares da IAMUREL"
    >
      <div className="inline-flex animate-marquee group-hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((text, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-6 text-xs font-mono font-bold uppercase tracking-widest text-bg/90 px-6"
          >
            <span>{text}</span>
            <span className="inline-flex items-center justify-center text-action/70">
              <IamurelSymbol className="w-3 h-3" color="currentColor" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
