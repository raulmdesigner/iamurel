import React, { useState } from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'symbol';
  color?: 'dark' | 'white' | 'currentColor';
  alt?: string;
}

export function IamurelSymbol({
  className = 'w-8 h-8',
  color = 'currentColor',
  alt = 'IAMUREL'
}: {
  className?: string;
  color?: 'dark' | 'white' | 'currentColor';
  alt?: string;
}) {
  const fill = color === 'white' ? '#FFFFFF' : (color === 'dark' ? '#091A24' : 'currentColor');
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <motion.div
      className="inline-flex items-center justify-center cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      animate={{ rotateY: isFlipped ? 360 : 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      style={{ perspective: 1000 }}
    >
      <svg viewBox="0 0 1500 1500" className={`inline-block object-contain ${className}`} fill={fill} xmlns="http://www.w3.org/2000/svg" aria-label={alt}>
        <defs>
          <clipPath clipPathUnits="userSpaceOnUse" id="cp1_sym">
            <path d="m3979.48-2283.58v6044.77h-6044.78v-6044.77z"/>
          </clipPath>
        </defs>
        <g clipPath="url(#cp1_sym)">
          <path d="m299.63 1.02c0 164.12-133.12 297.23-297.24 297.23v-297.23z"/>
          <path d="m299.63 673.3l-0.12 695.44c-0.01 69.88-56.66 126.51-126.53 126.51h-170.59v-1119.18c164.12 0 297.24 133.05 297.24 297.23z"/>
          <path d="m377.44 1.02c0 164.12 133.05 297.23 297.24 297.23l508.16-0.13v77.95h-508.16c-164.16 0-297.24 133.08-297.24 297.23v695.42c0 69.88 56.66 126.54 126.54 126.54h992.65v-1367.71c0-69.88-56.65-126.53-126.53-126.53zm755.55 1213.02h-327.53c-27.53 0-49.85-22.32-49.85-49.85v-458.07c0-27.53 22.32-49.84 49.85-49.84h327.53c27.53 0 49.85 22.31 49.85 49.84v458.07c0 27.53-22.32 49.85-49.85 49.85z"/>
        </g>
      </svg>
    </motion.div>
  );
}

export function IamurelLogo({
  className = 'h-8',
  variant = 'full',
  color = 'currentColor',
  alt = 'IAMUREL'
}: LogoProps) {
  if (variant === 'symbol') {
    return <IamurelSymbol className={className} color={color} alt={alt} />;
  }
  
  const fill = color === 'white' ? '#FFFFFF' : (color === 'dark' ? '#091A24' : 'currentColor');
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="inline-flex items-center justify-center cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      animate={{ rotateY: isFlipped ? 360 : 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      style={{ perspective: 1000 }}
    >
      <svg viewBox="0 0 1500 414" className={`inline-block object-contain ${className}`} fill={fill} xmlns="http://www.w3.org/2000/svg" aria-label={alt}>
        <defs>
          <clipPath clipPathUnits="userSpaceOnUse" id="cp1_logo">
            <path d="m1592.78-610.19v1668.36h-1670.1v-1668.36z"/>
          </clipPath>
          <clipPath clipPathUnits="userSpaceOnUse" id="cp2_logo">
            <path d="m1592.78-610.19v1668.36h-1670.1v-1668.36z"/>
          </clipPath>
        </defs>
        <g clipPath="url(#cp1_logo)">
          <path d="m950.66 113.42v207.17h-46.12v-181.73h-38.27v181.73h-46.12v-181.73h-40.18v181.73h-46.01v-207.17c0-11.55 9.32-20.86 20.87-20.86h174.96c11.45 0 20.87 9.31 20.87 20.86z"/>
          <path d="m1231.34 159.72h-46.12v-20.86h-32.91v181.73h-46.01v-228.03h104.17c11.45 0 20.87 9.31 20.87 20.86z"/>
          <path d="m1473.16 320.59h-9.01c-20.49 0-37.11-16.6-37.11-37.07v-190.96h46.12z"/>
          <path d="m1092.67 302.67c0 11.71-9.44 21.15-21.17 21.15h-86.41c-11.72 0-21.17-9.44-21.17-21.15v-210.11h46.78v187.03h35.31v-187.03h46.66z"/>
          <path fillRule="evenodd" clipRule="evenodd" d="m1498.82 277.09v43.5h-35.96v-43.5z"/>
        </g>
        <g clipPath="url(#cp2_logo)">
          <path d="m538.81 92.56c0 25.05-20.34 45.36-45.41 45.36v-45.36z"/>
          <path d="m538.81 195.16l-0.02 106.12c0 10.67-8.65 19.31-19.33 19.31h-26.06v-170.79c25.07 0 45.41 20.3 45.41 45.36z"/>
          <path d="m550.7 92.56c0 25.05 20.32 45.36 45.4 45.36l77.63-0.02v11.9h-77.63c-25.07 0-45.4 20.31-45.4 45.36v106.12c0 10.67 8.65 19.31 19.33 19.31h151.64v-208.72c0-10.66-8.66-19.31-19.33-19.31zm115.42 185.11h-50.04c-4.2 0-7.61-3.4-7.61-7.6v-69.9c0-4.21 3.41-7.61 7.61-7.61h50.04c4.2 0 7.61 3.4 7.61 7.61v69.9c0 4.2-3.41 7.6-7.61 7.6z"/>
          <path d="m1413.48 320.59c0-25.05-20.32-45.36-45.4-45.36l-77.63 0.02v-11.89h77.63c25.07 0 45.4-20.31 45.4-45.36v-106.13c0-10.66-8.65-19.31-19.33-19.31h-151.64v208.72c0 10.67 8.66 19.31 19.33 19.31zm-115.42-185.11h50.04c4.2 0 7.61 3.41 7.61 7.61v69.9c0 4.2-3.41 7.61-7.61 7.61h-50.04c-4.2 0-7.61-3.41-7.61-7.61v-69.9c0-4.2 3.41-7.61 7.61-7.61z"/>
          <path d="m83.32 0.37c0 45.3-36.78 82.04-82.13 82.04v-82.04z"/>
          <path d="m83.32 185.92l-0.04 191.94c0 19.29-15.65 34.92-34.96 34.92h-47.13v-308.89c45.35 0 82.13 36.72 82.13 82.03z"/>
          <path d="m103.82 1.37c0 45.3 36.76 82.04 82.12 82.04l140.4-0.04v21.52h-140.4c-45.36 0-82.12 36.73-82.12 82.03v191.94c0 19.29 15.65 34.92 34.96 34.92h274.26v-377.48c0-19.29-15.66-34.93-34.97-34.93zm208.76 334.79h-90.5c-7.6 0-13.77-6.15-13.77-13.75v-126.43c0-7.6 6.17-13.76 13.77-13.76h90.5c7.6 0 13.77 6.16 13.77 13.76v126.43c0 7.6-6.17 13.75-13.77 13.75z"/>
        </g>
      </svg>
    </motion.div>
  );
}

export default IamurelLogo;
