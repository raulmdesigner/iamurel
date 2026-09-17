import React from 'react';
import { useState, useEffect } from 'react';
import { dataLayer } from '../../lib/data';

import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }: ScrollRevealProps) {
  const [enable3d, setEnable3d] = useState(true);
  useEffect(() => {
    dataLayer.getAppearance().then(app => {
      if (app.enable_3d === false) setEnable3d(false);
    });
  }, []);
  const getInitialOffset = () => {
    switch (direction) {
      case 'up': return { y: 50, x: 0 };
      case 'down': return { y: -50, x: 0 };
      case 'left': return { x: 50, y: 0 };
      case 'right': return { x: -50, y: 0 };
      default: return { y: 50, x: 0 };
    }
  };

  const initial = enable3d 
    ? { opacity: 0, filter: 'blur(10px)', scale: 0.98, rotateX: 10, ...getInitialOffset() }
    : { opacity: 0, y: 30 };

  return (
    <motion.div
      initial={initial}
      whileInView={enable3d ? { opacity: 1, filter: 'blur(0px)', scale: 1, rotateX: 0, y: 0, x: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1], // Custom premium ease out (similar to Apple)
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
