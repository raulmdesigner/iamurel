import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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
  'lucrativas'
];

export function RotatingWordHero({
  prefix,
  words = defaultWords,
  suffix = '.',
  interval = 3000
}: RotatingWordProps) {
  const [index, setIndex] = useState(0);

  const heroPrefix = prefix?.trim() || 'Criamos conteúdo para marcas que querem se tornar';

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-text tracking-tight leading-[1.15] md:text-center">
      {heroPrefix}{' '}
      <span className="inline-grid align-bottom">
        {words.map((word, i) => (
          <motion.span
            key={word}
            initial={false}
            animate={{
              opacity: i === index ? 1 : 0,
              y: i === index ? 0 : 15,
              filter: i === index ? 'blur(0px)' : 'blur(4px)',
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`col-start-1 row-start-1 text-action italic pr-1 ${
              i === index ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            aria-hidden={i !== index}
          >
            {word}
          </motion.span>
        ))}
      </span>
      {suffix}
    </h1>
  );
}
