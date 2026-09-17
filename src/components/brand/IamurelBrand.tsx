import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'symbol' | 'text';
  color?: 'currentColor' | 'white' | 'dark' | 'action';
}

/**
 * Logomarca oficial IAMUREL baseada nos vetores e PNGs enviados pelo cliente.
 * Símbolo: Monograma 'ia' geométrico com detalhe de estrela de 4 pontas no pingo do 'i'.
 * Tipografia: Lettering 'iamurel' em caixa baixa, geométrico, encorpado e com cantos arredondados proprietários.
 */
export function IamurelSymbol({ className = 'w-8 h-8', color = 'currentColor' }: { className?: string; color?: string }) {
  const fillColor = color === 'white' ? '#FFFFFF' : color === 'action' ? '#FF4A1C' : color === 'dark' ? '#091A24' : 'currentColor';

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="IAMUREL Símbolo"
    >
      {/* Símbolo IA estilizado: pingo do i em estrela / brilho + corpo do i + letra 'a' em squircle */}
      {/* Pingo do 'i' estilizado (estrela/brilho de 4 pontas) */}
      <path
        d="M13 3C13 10 7 16 0 16C7 16 13 22 13 29C13 22 19 16 26 16C19 16 13 10 13 3Z"
        fill={fillColor}
      />
      {/* Corpo do 'i' (haste vertical com cantos arredondados) */}
      <rect x="0" y="34" width="26" height="66" rx="9" fill={fillColor} />

      {/* Letra 'a' externa com cantos arredondados */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37 10C37 4.5 41.5 0 47 0H88C94.5 0 100 5.5 100 12V88C100 94.5 94.5 100 88 100H47C41.5 100 37 95.5 37 90V10ZM56 34C56 28.5 60.5 24 66 24H71C76.5 24 81 28.5 81 34V66C81 71.5 76.5 76 71 76H66C60.5 76 56 71.5 56 66V34Z"
        fill={fillColor}
      />
    </svg>
  );
}

export function IamurelText({ className = 'h-7', color = 'currentColor' }: { className?: string; color?: string }) {
  const fillColor = color === 'white' ? '#FFFFFF' : color === 'action' ? '#FF4A1C' : color === 'dark' ? '#091A24' : 'currentColor';

  return (
    <svg
      viewBox="0 0 340 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="iamurel"
    >
      {/* 'i' */}
      <path d="M10 2C10 7 5.5 11 0 11C5.5 11 10 15 10 20C10 15 14.5 11 20 11C14.5 11 10 7 10 2Z" fill={fillColor} />
      <rect x="1" y="24" width="18" height="46" rx="6" fill={fillColor} />

      {/* 'a' */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 30C30 26.5 33 24 37 24H68C72 24 75 27 75 31V63C75 67 72 70 68 70H37C33 70 30 67 30 63V30ZM45 38C45 35 47 33 50 33H55C58 33 60 35 60 38V56C60 59 58 61 55 61H50C47 61 45 59 45 56V38Z"
        fill={fillColor}
      />

      {/* 'm' */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M85 31C85 26.5 88.5 24 93 24H135C139.5 24 143 27 143 31.5V70H127V40C127 37 125 35 122 35H119C116 35 114 37 114 40V70H101V38C101 36 99.5 35 98 35C96 35 95 36.5 95 38.5V70H85V31Z"
        fill={fillColor}
      />

      {/* 'u' */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M153 24H167V54C167 58 170 60 174 60C178 60 181 58 181 54V24H195V63C195 67 191.5 70 187 70H161C156.5 70 153 67 153 63V24Z"
        fill={fillColor}
      />

      {/* 'r' */}
      <path
        d="M205 24H219V36C222 28 228 24 236 24V37C228 37 220 41 219 46V70H205V24Z"
        fill={fillColor}
      />

      {/* 'e' */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M246 31C246 26.5 249.5 24 254 24H284C288.5 24 292 27.5 292 32V47H260C260 55 264 59 272 59C277 59 281 57 284 54L291 61C286 67 279 70 271 70C256 70 246 60 246 45V31ZM260 40H278C278 35 275 32 270 32C264.5 32 261 35.5 260 40Z"
        fill={fillColor}
      />

      {/* 'l' */}
      <rect x="302" y="10" width="14" height="60" rx="5" fill={fillColor} />
    </svg>
  );
}

export function IamurelLogo({
  className = 'h-8',
  variant = 'full',
  color = 'currentColor'
}: LogoProps) {
  if (variant === 'symbol') {
    return <IamurelSymbol className={className} color={color} />;
  }

  if (variant === 'text') {
    return <IamurelText className={className} color={color} />;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <IamurelSymbol className="h-full w-auto aspect-square shrink-0" color={color} />
      <IamurelText className="h-[82%] w-auto" color={color} />
    </div>
  );
}
