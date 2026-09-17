import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'symbol';
  color?: 'dark' | 'white' | 'currentColor';
  alt?: string;
}

const BASE_URL = import.meta.env.BASE_URL || '/';
const normalizePath = (path: string) => `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

/**
 * Logomarca oficial IAMUREL.
 * Carrega exclusivamente os arquivos de imagem oficiais da pasta /assets/brand/
 * preservando proporções, espaçamento, cores e sem qualquer SVG recriado inline.
 */
export function IamurelSymbol({
  className = 'w-8 h-8',
  color = 'dark',
  alt = 'IAMUREL'
}: {
  className?: string;
  color?: 'dark' | 'white' | 'currentColor';
  alt?: string;
}) {
  const isWhite = color === 'white';
  const src = normalizePath(isWhite ? 'assets/brand/logo-symbol-white.svg' : 'assets/brand/logo-symbol.svg');

  return (
    <img
      src={src}
      alt={alt}
      className={`inline-block object-contain ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}

export function IamurelLogo({
  className = 'h-8',
  variant = 'full',
  color = 'dark',
  alt = 'IAMUREL'
}: LogoProps) {
  if (variant === 'symbol') {
    return <IamurelSymbol className={className} color={color} alt={alt} />;
  }

  const isWhite = color === 'white';
  const src = normalizePath(isWhite ? 'assets/brand/logo-white.svg' : 'assets/brand/logo.svg');

  return (
    <img
      src={src}
      alt={alt}
      className={`inline-block object-contain ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}

export default IamurelLogo;
