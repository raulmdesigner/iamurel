import React, { useState, useEffect } from 'react';

interface RotatingWordProps {
  prefix?: string;
  words?: string[];
  suffix?: string;
  interval?: number;
}

const defaultWords = [
  'profissionais',
  'consistentes',
  'memoráveis',
  'autorais',
  'desejadas'
];

export function RotatingWordHero({
  prefix = 'Criamos conteúdo para marcas que querem parecer mais',
  words = defaultWords,
  suffix = '.',
  interval = 2800
}: RotatingWordProps) {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsFading(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-text tracking-tight leading-[1.12]">
      <span>{prefix} </span>
      <span
        className={`inline-block text-action underline decoration-action/30 underline-offset-8 transition-all duration-300 transform ${
          isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        {words[index]}
      </span>
      <span>{suffix}</span>
    </h1>
  );
}
