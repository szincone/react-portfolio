import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import orangeCatSvg from './assets/orange-cat-astronaut.svg';
import grayCatSvg from './assets/gray-cat-astronaut.svg';
import ballerSvg from './assets/basketball-astronaut.svg';
import guitaristSvg from './assets/guitar-astronaut.svg';
import lifterSvg from './assets/weights-astronaut.svg';

// Each drifter is a small personal easter egg: the two cats, basketball,
// guitar, and weight lifting — all suited up for spacewalks.
type DrifterVariant = 'orangeCat' | 'grayCat' | 'baller' | 'guitarist' | 'lifter';

const VARIANTS: DrifterVariant[] = ['orangeCat', 'grayCat', 'baller', 'guitarist', 'lifter'];

const VARIANT_ART: Record<DrifterVariant, string> = {
  orangeCat: orangeCatSvg,
  grayCat: grayCatSvg,
  baller: ballerSvg,
  guitarist: guitaristSvg,
  lifter: lifterSvg,
};

interface Trajectory {
  from: { x: string; y: string; rotate: number };
  to: { x: string; y: string; rotate: number };
}

const TRAJECTORIES: Trajectory[] = [
  { from: { x: '-15vw', y: '110vh', rotate: -14 }, to: { x: '115vw', y: '-15vh', rotate: 12 } },
  { from: { x: '115vw', y: '95vh', rotate: 10 }, to: { x: '-15vw', y: '-10vh', rotate: -14 } },
  { from: { x: '-15vw', y: '20vh', rotate: -8 }, to: { x: '115vw', y: '55vh', rotate: 8 } },
  { from: { x: '110vw', y: '-15vh', rotate: 8 }, to: { x: '-15vw', y: '70vh', rotate: -10 } },
];

interface DrifterConfig {
  variant: DrifterVariant;
  trajectory: Trajectory;
  duration: number;
  size: number;
}

const randomConfig = (previous?: DrifterVariant): DrifterConfig => {
  let variant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
  if (variant === previous) {
    variant = VARIANTS[(VARIANTS.indexOf(variant) + 1) % VARIANTS.length];
  }
  return {
    variant,
    trajectory: TRAJECTORIES[Math.floor(Math.random() * TRAJECTORIES.length)],
    duration: 13 + Math.random() * 6,
    size: 64 + Math.random() * 26,
  };
};

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SpaceDrifter: React.FC = () => {
  const [config, setConfig] = useState<DrifterConfig | null>(null);
  const lastVariant = useRef<DrifterVariant | undefined>(undefined);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    let hideTimeout: ReturnType<typeof setTimeout>;
    let showTimeout: ReturnType<typeof setTimeout>;

    const scheduleNext = (delay: number) => {
      showTimeout = setTimeout(() => {
        const next = randomConfig(lastVariant.current);
        lastVariant.current = next.variant;
        setConfig(next);
        hideTimeout = setTimeout(() => {
          setConfig(null);
          // next visitor shows up 12–30 seconds later
          scheduleNext(12000 + Math.random() * 18000);
        }, next.duration * 1000);
      }, delay);
    };

    // first fly-by happens soon after load so visitors actually catch one
    scheduleNext(4000 + Math.random() * 5000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {config && (
        <motion.div
          key={config.variant}
          initial={{
            x: config.trajectory.from.x,
            y: config.trajectory.from.y,
            rotate: config.trajectory.from.rotate,
            opacity: 0,
          }}
          animate={{
            x: config.trajectory.to.x,
            y: config.trajectory.to.y,
            rotate: config.trajectory.to.rotate,
            opacity: [0, 0.85, 0.85, 0.85, 0],
            transition: {
              duration: config.duration,
              ease: 'linear',
              opacity: {
                times: [0, 0.08, 0.8, 0.92, 1],
                duration: config.duration,
              },
            },
          }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${config.size}px`,
            height: `${config.size * 1.08}px`,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <img
            src={VARIANT_ART[config.variant]}
            alt=""
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpaceDrifter;
