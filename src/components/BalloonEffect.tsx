/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Particle } from '../types';

interface BalloonEffectProps {
  isActive: boolean;
}

// Gorgeous, classic formal pastel colors with corresponding knot colors
const BALLOON_PALETTES = [
  { color: '#ff7675', knot: '#d63031' }, // Velvet Red
  { color: '#74b9ff', knot: '#0984e3' }, // Classic Blue
  { color: '#ffeaa7', knot: '#fdcb6e' }, // Soft Canary Gold
  { color: '#a29bfe', knot: '#6c5ce7' }, // Lilac Lavender
  { color: '#55efc4', knot: '#00b894' }, // Warm Mint Green
  { color: '#ffb142', knot: '#cc8e35' }, // Coral Amber
  { color: '#fda7df', knot: '#d980fa' }, // Pastel Orchid Pink
];

export default function BalloonEffect({ isActive }: BalloonEffectProps) {
  const [balloons, setBalloons] = useState<Particle[]>([]);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      // Spawn balloons regularly
      spawnIntervalRef.current = setInterval(() => {
        const id = Math.random().toString(36).substring(2, 9);
        const palette = BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)];
        
        const newBalloon: Particle = {
          id,
          x: 10 + Math.random() * 80, // random starting left position (between 10% and 90% to avoid edges)
          size: 34 + Math.random() * 12, // medium size width: 34px to 46px
          speed: 4.5 + Math.random() * 2.0, // 4.5s to 6.5s float duration
          drift: 4 + Math.random() * 8, // horizontal sway amplitude
          color: JSON.stringify(palette), // pass serialized palette
          angle: Math.random() * Math.PI, // offset angle for swaying string
          stringSway: 5 + Math.random() * 10
        };

        setBalloons((prev) => [...prev, newBalloon]);
      }, 180); // Spawn every 180ms to fill screen elegantly without overpopulating
    } else {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
        spawnIntervalRef.current = null;
      }
    }

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }
    };
  }, [isActive]);

  const handleRemove = (id: string) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <AnimatePresence>
        {balloons.map((balloon) => {
          const palette = JSON.parse(balloon.color || '{}');
          const startX = balloon.x;
          const swayAmt = balloon.drift;

          // Define smooth wind sway horizontal path
          const keyframesX = [
            `${startX}%`,
            `${startX - swayAmt}%`,
            `${startX + swayAmt}%`,
            `${startX - swayAmt * 0.5}%`,
          ];

          return (
            <motion.div
              key={balloon.id}
              initial={{ 
                top: '105%', 
                left: `${balloon.x}%`, 
                opacity: 0,
                rotate: -10,
                scale: 0.95
              }}
              animate={{
                top: '-20%',
                left: keyframesX,
                opacity: [0, 1, 1, 0.9],
                rotate: [-8, 8, -6, 6, -3],
                scale: 1
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: balloon.speed,
                ease: 'easeOut',
                opacity: { times: [0, 0.1, 0.9, 1], duration: balloon.speed },
                rotate: { duration: balloon.speed, ease: 'easeInOut' }
              }}
              onAnimationComplete={() => handleRemove(balloon.id)}
              className="absolute drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] filter"
              style={{
                width: balloon.size,
                height: balloon.size * 2, // Allocate double height for the string
              }}
              id={`balloon-${balloon.id}`}
            >
              <svg viewBox="0 0 40 80" className="w-full h-full overflow-visible">
                <defs>
                  {/* Subtle 3D volumetric radial gradient */}
                  <radialGradient id={`grad-${balloon.id}`} cx="35%" cy="30%" r="55%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity={0.4} />
                    <stop offset="30%" stopColor={palette.color} />
                    <stop offset="100%" stopColor={palette.knot} />
                  </radialGradient>
                </defs>

                {/* Classic balloon shape */}
                <path 
                  d="M 20,2 C 8,2 2,13 2,24 C 2,37 13,48 20,51 C 27,48 38,37 38,24 C 38,13 32,2 20,2 Z" 
                  fill={`url(#grad-${balloon.id})`}
                />

                {/* Knot at bottom */}
                <polygon 
                  points="20,49 16,55 24,55" 
                  fill={palette.knot} 
                />

                {/* Thin, graceful string swaying underneath */}
                <path 
                  d="M 20,55 Q 23,62 17,68 T 21,78" 
                  fill="none" 
                  stroke="currentColor" 
                  className="text-slate-400/50 dark:text-slate-500/50" 
                  strokeWidth="1.2" 
                />
              </svg>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
