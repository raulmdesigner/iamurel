import React from 'react';

interface MarqueeProps {
  items?: string[];
  speed?: 'normal' | 'slow';
  className?: string;
}

const defaultItems = [
  'CONTEÚDO COM DIREÇÃO',
  'DESIGN COM INTENÇÃO',
  'IDENTIDADE VISUAL',
  'CAMPANHAS ESTRATÉGICAS',
  'CARROSSÉIS 4:5 DE ALTA RETENÇÃO',
  'IA COM CRITÉRIO HUMANO',
  'PEÇAS PRONTAS PARA POSTAR',
  'SEM TEMPLATES GENÉRICOS'
];

export function InfiniteMarquee({
  items = defaultItems,
  speed = 'normal',
  className = ''
}: MarqueeProps) {
  return (
    <div
      className={`w-full overflow-hidden whitespace-nowrap bg-surface border-y border-border py-3.5 relative group ${className}`}
      aria-label="Destaques dos serviços IAMUREL"
    >
      <div className="inline-flex animate-marquee group-hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((text, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-4 text-xs sm:text-sm font-display font-extrabold uppercase tracking-widest text-text/85 px-4"
          >
            <span>{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-action shrink-0 opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}
