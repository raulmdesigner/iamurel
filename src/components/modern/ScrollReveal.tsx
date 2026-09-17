import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }: ScrollRevealProps) {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up': return { y: 50, x: 0 };
      case 'down': return { y: -50, x: 0 };
      case 'left': return { x: 50, y: 0 };
      case 'right': return { x: -50, y: 0 };
      default: return { y: 50, x: 0 };
    }
  };

  const initial = { opacity: 0, filter: 'blur(10px)', scale: 0.98, ...getInitialOffset() };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0, x: 0 }}
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
