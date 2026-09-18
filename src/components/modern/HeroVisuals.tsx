import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useAppearance } from '../../lib/appearance';
import { IamurelSymbol } from '../brand/IamurelBrand';
import { Play, Pause, Sparkles, CheckCircle, Eye, ArrowUpRight } from 'lucide-react';

export function HeroVisuals() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const appearance = useAppearance();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Default high-end visual showcase items if none uploaded
  const defaultShowcaseCards = [
    {
      type: 'CARROSSEL ESTRATÉGICO',
      aspect: '4:5',
      title: 'A anatomia do cliente que paga sem pechinchar',
      category: 'Educação & Filtro',
      badge: 'Pronto para Postar',
      accent: '#FF4A1C',
      format: '1080 × 1350 px',
      sampleUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80',
    },
    {
      type: 'IDENTIDADE VISUAL',
      aspect: '1:1',
      title: 'Sistema de marca com contraste mineral',
      category: 'Design System',
      badge: 'Vetor + Manual',
      accent: '#0F4C5C',
      format: 'SVG / PDF / Figma',
      sampleUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
    },
    {
      type: 'KEY VISUAL DE CAMPANHA',
      aspect: '9:16',
      title: 'Narrativa de lançamento com alta retenção',
      category: 'Campanha & Anúncios',
      badge: 'Reels / Stories',
      accent: '#E53A0E',
      format: '1080 × 1920 px',
      sampleUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    }
  ];

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVideoPlaying]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-surface to-bg border border-border/80 mt-10 mb-6 shadow-sm">
      {/* Background Subtle Noise & Grid */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h32v32H0z' fill='none'/%3E%3Ccircle cx='16' cy='16' r='1' fill='%23000000'/%3E%3C/svg%3E")`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Editorial Watermark */}
      <div className="absolute right-4 bottom-2 opacity-[0.03] pointer-events-none select-none">
        <span className="font-display font-black text-8xl md:text-9xl tracking-tighter text-text">IAMUREL</span>
      </div>

      {/* Header bar of the Showcase Stage */}
      <div className="px-6 py-3.5 border-b border-border/70 flex items-center justify-between bg-surface/60 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-action animate-pulse" />
          <span className="text-[11px] font-bold font-mono tracking-wider uppercase text-text/80">
            Showroom Editorial Ativo • Peças com Direção Humana & IA
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-muted font-medium">
          <span className="flex items-center gap-1">
            <CheckCircle size={12} className="text-action" /> Sem templates genéricos
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle size={12} className="text-action" /> 100% pronto para publicação
          </span>
        </div>
      </div>

      {/* Interactive Main Stage */}
      <div className="p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Video / Dynamic Motion Showcase */}
        <div className="lg:col-span-5 flex flex-col items-center sm:items-start space-y-4">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] mx-auto rounded-2xl md:rounded-[2rem] overflow-hidden bg-dark shadow-2xl border-2 border-border-dark group">
            {appearance?.hero_video_url ? (
              <video 
                ref={videoRef}
                src={appearance.hero_video_url} 
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted
                playsInline
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-surface to-dark flex flex-col items-center justify-between p-6 text-center text-white">
                <div className="w-full flex items-center justify-between text-[10px] text-white/50 border-b border-white/10 pb-3">
                  <span className="font-mono text-action uppercase tracking-widest font-bold">REELS & STORIES 9:16</span>
                  <span>1080 × 1920</span>
                </div>

                <div className="space-y-4 my-auto">
                  <div className="w-14 h-14 rounded-full bg-action/20 border border-action/40 flex items-center justify-center mx-auto text-action shadow-lg">
                    <IamurelSymbol className="w-8 h-8" color="currentColor" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-display font-bold text-white tracking-wide">
                      Ritmo Visual & Ganchos Fortes
                    </p>
                    <p className="text-[11px] text-white/60 max-w-[200px] mx-auto leading-relaxed">
                      Vídeos e animações pensados para prender a atenção nos 3 primeiros segundos.
                    </p>
                  </div>
                </div>

                <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
                  <span className="font-semibold text-action">Vídeo Demonstração</span>
                  <span>Pausar / Play</span>
                </div>
              </div>
            )}

            {/* Play/Pause Button Overlay */}
            <button 
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              aria-label={isVideoPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
              className={`absolute inset-0 flex items-center justify-center transition-all cursor-pointer z-20 ${isVideoPlaying ? 'bg-transparent hover:bg-black/20' : 'bg-black/25 hover:bg-black/15'}`}
            >
              <div className={`w-14 h-14 rounded-full backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all transform ${isVideoPlaying ? 'opacity-0 hover:opacity-100 bg-black/50' : 'bg-action hover:scale-105 shadow-xl'}`}>
                {isVideoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" fill="currentColor" />}
              </div>
            </button>
          </div>

          <div className="w-full max-w-[320px] mx-auto flex items-center justify-between text-xs text-muted px-2">
            <span className="font-mono text-[10px] uppercase font-bold text-text">Formato Mobile First</span>
            <span className="text-[11px]">Alta Retenção</span>
          </div>
        </div>

        {/* Right: Rich Editorial Pieces Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-action/10 text-action text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Padrão de Acabamento IAMUREL</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-text tracking-tight">
              Peças que comunicam autoridade imediata sem ruído visual.
            </h3>
            <p className="text-sm text-muted leading-relaxed max-w-xl">
              Cada elemento gráfico passa por direção de arte rigorosa: tipografia calculada, contraste cromático de alto impacto e cópia focada em clientes dispostos a pagar pelo seu valor.
            </p>
          </div>

          {/* 3 Interactive Showcase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {defaultShowcaseCards.map((card, idx) => {
              const hasCustomImg = idx === 0 ? appearance?.hero_image_1_url : idx === 1 ? appearance?.hero_image_2_url : appearance?.hero_image_3_url;
              const imgUrl = hasCustomImg || card.sampleUrl;

              return (
                <div
                  key={idx}
                  onClick={() => setActivePresetIndex(idx)}
                  className={`group relative bg-surface border rounded-2xl overflow-hidden p-3.5 space-y-3 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    activePresetIndex === idx
                      ? 'border-action ring-2 ring-action/20 shadow-md'
                      : 'border-border hover:border-text/30'
                  }`}
                >
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-dark relative border border-border/40">
                    <img 
                      src={imgUrl} 
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent flex flex-col justify-between p-3 text-white">
                      <span className="text-[9px] font-mono font-extrabold bg-action/90 text-white px-2 py-0.5 rounded uppercase tracking-wider self-start">
                        {card.badge}
                      </span>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-white/70 font-semibold block">
                          {card.format}
                        </span>
                        <p className="text-xs font-bold text-white font-display leading-tight line-clamp-2">
                          {card.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-action font-bold uppercase">
                        {card.type}
                      </span>
                      <ArrowUpRight size={13} className="text-muted group-hover:text-action transition-colors" />
                    </div>
                    <p className="text-xs font-bold text-text truncate">
                      {card.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Banner Inside Hero */}
          <div className="p-4 rounded-xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-action/10 text-action flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <p className="font-bold text-text">Direção Criativa Humana + IA</p>
                <p className="text-muted text-[11px]">Você recebe os arquivos finais em vetor, PDF e PNG prontos para circulação.</p>
              </div>
            </div>
            <a
              href="#portfolio"
              className="text-action hover:underline font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer"
            >
              Ver casos detalhados →
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
