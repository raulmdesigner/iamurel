import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { IamurelSymbol } from '../brand/IamurelBrand';
import { Play, Pause } from 'lucide-react';
import { dataLayer } from '../../lib/data';
import { AppearanceSettings } from '../../types';

export function HeroVisuals() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [appearance, setAppearance] = useState<AppearanceSettings | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    dataLayer.getAppearance().then(setAppearance);
  }, []);

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
    <div className="relative w-full aspect-[4/3] md:aspect-[21/9] lg:aspect-[2.5/1] rounded-3xl overflow-hidden bg-surface border border-border mt-12 mb-8">
      {/* Background Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Ccircle cx='12' cy='12' r='1' fill='%23000'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Abstract Typographic Element */}
      <div className="absolute -right-20 -bottom-32 opacity-[0.02] pointer-events-none select-none flex items-center justify-center">
        <span className="font-serif italic font-black text-[30rem] leading-none">&</span>
      </div>

      <div className="absolute inset-0 p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center md:justify-between">
        
        {/* Left: Video Pill */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="relative w-48 md:w-64 aspect-[9/16] rounded-full overflow-hidden bg-dark shadow-2xl flex-shrink-0 group border-4 border-surface"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark to-dark-hover flex items-center justify-center">
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
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white/50 px-6 text-center">
                <IamurelSymbol className="w-8 h-8 opacity-20" color="white" />
                <span className="text-xs uppercase tracking-widest font-bold">Video Place<br/>holder</span>
              </div>
            )}
            
            <button 
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              className={`absolute inset-0 flex items-center justify-center transition-colors z-10 ${isVideoPlaying ? 'bg-transparent hover:bg-black/10' : 'bg-black/20 hover:bg-black/10'}`}
            >
              <div className={`w-12 h-12 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all ${isVideoPlaying ? 'opacity-0 hover:opacity-100 bg-black/40' : 'bg-white/10 hover:scale-110'}`}>
                {isVideoPlaying ? (
                  <Pause className="w-5 h-5" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5 ml-1" fill="currentColor" />
                )}
              </div>
            </button>
          </div>
        </motion.div>

        {/* Right: Real Work Image Composition */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center md:justify-end pt-12 md:pt-0">
          
          {/* Main Image */}
          <motion.div 
            initial={{ opacity: 0, y: 30, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.3 }}
            className="absolute z-20 w-48 md:w-72 aspect-[4/5] bg-dark rounded-xl shadow-2xl overflow-hidden border-2 border-surface flex items-center justify-center"
          >
             {appearance?.hero_image_1_url ? (
               <img src={appearance.hero_image_1_url} alt="Hero 1" className="w-full h-full object-cover" />
             ) : (
               <span className="text-xs uppercase font-bold text-white/30">IMG Supabase 1</span>
             )}
          </motion.div>

          {/* Secondary Image Background Right */}
          <motion.div 
            initial={{ opacity: 0, x: 30, rotate: 8 }}
            animate={{ opacity: 1, x: 0, rotate: 6 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.3 }}
            className="absolute z-10 w-40 md:w-60 aspect-[4/5] bg-bg rounded-xl shadow-xl overflow-hidden border border-border flex items-center justify-center ml-24 md:ml-40 mt-8"
          >
            {appearance?.hero_image_2_url ? (
               <img src={appearance.hero_image_2_url} alt="Hero 2" className="w-full h-full object-cover" />
             ) : (
               <span className="text-xs uppercase font-bold text-text/30">IMG Supabase 2</span>
             )}
          </motion.div>

          {/* Secondary Image Background Left */}
          <motion.div 
            initial={{ opacity: 0, x: -30, rotate: -12 }}
            animate={{ opacity: 1, x: 0, rotate: -8 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", bounce: 0.3 }}
            className="absolute z-10 w-40 md:w-56 aspect-square bg-surface-hover rounded-xl shadow-lg overflow-hidden border border-border flex items-center justify-center mr-32 md:mr-48 -mt-16"
          >
            {appearance?.hero_image_3_url ? (
               <img src={appearance.hero_image_3_url} alt="Hero 3" className="w-full h-full object-cover" />
             ) : (
               <span className="text-xs uppercase font-bold text-muted/50">IMG Supabase 3</span>
             )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
