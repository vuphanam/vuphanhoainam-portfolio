/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { Particle } from '../types';

interface HeartEffectProps {
  isActive: boolean;
}

export default function HeartEffect({ isActive }: HeartEffectProps) {
  const [hearts, setHearts] = useState<Particle[]>([]);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      // Start spawning red hearts at regular intervals
      spawnIntervalRef.current = setInterval(() => {
        const id = Math.random().toString(36).substring(2, 9);
        const newHeart: Particle = {
          id,
          x: Math.random() * 100, // random start horizontal %
          size: 32 + Math.random() * 28, // doubled size: 32px to 60px
          speed: 4.0 + Math.random() * 2.5, // 4.0s to 6.5s fall duration
          drift: 6 + Math.random() * 12, // horizontal drift amplitude
          angle: -15 + Math.random() * 30, // slight starting tilt offset
        };

        setHearts((prev) => [...prev, newHeart]);
      }, 130);
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
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <AnimatePresence>
        {hearts.map((heart) => {
          // Calculate drift keyframes using sine wave behavior
          const startX = heart.x;
          const driftOffset = heart.drift;
          const keyframesX = [
            `${startX}%`,
            `${startX + driftOffset}%`,
            `${startX - driftOffset}%`,
            `${startX + driftOffset * 0.5}%`,
          ];

          return (
            <motion.div
              key={heart.id}
              initial={{ 
                top: '-10%', 
                left: `${heart.x}%`, 
                opacity: 0, 
                rotate: heart.angle || 0,
                scale: 0.7
              }}
              animate={{
                top: '110%',
                left: keyframesX,
                opacity: [0, 1, 1, 0],
                rotate: (heart.angle || 0) + (Math.random() > 0.5 ? 45 : -45),
                scale: 1
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: heart.speed,
                ease: 'easeInOut',
                opacity: { times: [0, 0.1, 0.85, 1], duration: heart.speed },
              }}
              onAnimationComplete={() => handleRemove(heart.id)}
              className="absolute text-red-500 drop-shadow-[0_4px_10px_rgba(239,68,68,0.4)]"
              style={{
                width: heart.size,
                height: heart.size,
              }}
              id={`heart-${heart.id}`}
            >
              <Heart 
                fill="currentColor"
                style={{ 
                  width: heart.size, 
                  height: heart.size,
                  strokeWidth: 1.5 
                }} 
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
