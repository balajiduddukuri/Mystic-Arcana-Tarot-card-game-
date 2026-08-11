import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number; // percentage or px spread
  y: number;
  size: number;
  color: string;
  symbol: string;
  duration: number;
  delay: number;
  rotation: number;
  scale: number;
}

interface StardustConfettiProps {
  isActive: boolean;
  onComplete?: () => void;
}

const PARTICLES_COUNT = 45;

const CELESTIAL_SYMBOLS = ['✨', '✦', '⭐', '💫', '🌟', '🌙', '✧', '♦'];
const STARDUST_COLORS = [
  '#fde047', // Amber / Gold
  '#fef08a', // Light yellow
  '#e9d5ff', // Purple shine
  '#c084fc', // Bright violet
  '#67e8f9', // Cyan starlight
  '#ffffff', // White star
];

export const StardustConfetti: React.FC<StardustConfettiProps> = ({ isActive, onComplete }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isActive) {
      const generated: Particle[] = Array.from({ length: PARTICLES_COUNT }).map((_, i) => {
        const symbol = CELESTIAL_SYMBOLS[Math.floor(Math.random() * CELESTIAL_SYMBOLS.length)];
        const color = STARDUST_COLORS[Math.floor(Math.random() * STARDUST_COLORS.length)];
        
        // Random angle & burst distance
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 320; // radius explosion

        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - (40 + Math.random() * 120), // slight upward drift
          size: Math.floor(Math.random() * 18) + 12,
          color,
          symbol,
          duration: 1.8 + Math.random() * 1.2,
          delay: Math.random() * 0.3,
          rotation: (Math.random() - 0.5) * 360,
          scale: 0.6 + Math.random() * 0.8,
        };
      });

      setParticles(generated);

      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 3200);

      return () => clearTimeout(timer);
    } else {
      setParticles([]);
    }
  }, [isActive]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {/* Central Burst Aura Light */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.8, 2.5], opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute w-96 h-96 rounded-full bg-radial from-amber-300/30 via-purple-500/20 to-transparent blur-2xl"
        />

        {/* Floating Stardust Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.2,
              rotate: 0,
            }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: [0, 1, 0.9, 0],
              scale: [0.2, p.scale * 1.3, p.scale, 0],
              rotate: [0, p.rotation],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              position: 'absolute',
              color: p.color,
              fontSize: `${p.size}px`,
              textShadow: `0 0 12px ${p.color}, 0 0 20px rgba(251, 191, 36, 0.6)`,
            }}
            className="select-none font-serif"
          >
            {p.symbol}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
