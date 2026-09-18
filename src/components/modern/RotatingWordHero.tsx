import React from 'react';

interface StableHeroHeadlineProps {
  title?: string;
  prefix?: string;
  className?: string;
}

export function RotatingWordHero({
  title,
  prefix,
  className = ''
}: StableHeroHeadlineProps) {
  const displayTitle = title || prefix || 'Identidade e conteúdo para marcas que precisam se comunicar com autoridade.';
  return (
    <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-text tracking-tight leading-[1.12] text-center max-w-4xl mx-auto ${className}`}>
      {displayTitle}
    </h1>
  );
}
