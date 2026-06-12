import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Each drifter is a small personal easter egg: the two cats, basketball,
// guitar, and weight lifting — all suited up for spacewalks.
type DrifterVariant = 'orangeCat' | 'grayCat' | 'baller' | 'guitarist' | 'lifter';

const VARIANTS: DrifterVariant[] = ['orangeCat', 'grayCat', 'baller', 'guitarist', 'lifter'];

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
    size: 56 + Math.random() * 22,
  };
};

// Shared bits for the human astronauts
const AstronautBase: React.FC = () => (
  <>
    {/* helmet */}
    <circle cx="100" cy="62" r="32" fill="#FFFFFF" opacity="0.85" />
    <circle cx="100" cy="62" r="27" fill="#E8E8E8" opacity="0.6" />
    <ellipse cx="100" cy="63" rx="19" ry="15" fill="#9fd9ff" opacity="0.45" />
    <circle cx="93" cy="56" r="4" fill="#FFFFFF" opacity="0.7" />
    {/* torso */}
    <rect x="78" y="92" width="44" height="54" rx="10" fill="#FFFFFF" opacity="0.85" />
    <rect x="87" y="102" width="26" height="22" rx="4" fill="#E8E8E8" opacity="0.65" />
    {/* legs */}
    <rect x="82" y="144" width="14" height="28" rx="7" fill="#FFFFFF" opacity="0.8" />
    <rect x="104" y="144" width="14" height="28" rx="7" fill="#FFFFFF" opacity="0.8" />
  </>
);

const Baller: React.FC = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <AstronautBase />
    {/* left arm relaxed */}
    <rect x="60" y="96" width="13" height="40" rx="6" fill="#FFFFFF" opacity="0.75" />
    {/* right arm raised, spinning the ball */}
    <rect x="124" y="58" width="13" height="44" rx="6" fill="#FFFFFF" opacity="0.75" transform="rotate(-32 130 100)" />
    {/* basketball */}
    <circle cx="151" cy="38" r="16" fill="#e07020" opacity="0.95" />
    <path d="M135 38 H167 M151 22 V54 M140 26 C147 33, 147 43, 140 50 M162 26 C155 33, 155 43, 162 50" stroke="#5b2c08" strokeWidth="1.6" opacity="0.8" />
    {/* spin sparkle */}
    <path d="M151 14 l1.6 3.6 3.6 1.6 -3.6 1.6 -1.6 3.6 -1.6 -3.6 -3.6 -1.6 3.6 -1.6 z" fill="#FFFFFF" opacity="0.8" />
  </svg>
);

const Guitarist: React.FC = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <AstronautBase />
    {/* guitar slung across the body */}
    <g transform="rotate(-32 100 130)">
      <rect x="114" y="126" width="48" height="7" rx="3" fill="#8a5a33" opacity="0.95" />
      <rect x="158" y="122" width="13" height="14" rx="3" fill="#6e4426" opacity="0.95" />
      <circle cx="94" cy="132" r="20" fill="#d29a5b" opacity="0.95" />
      <circle cx="114" cy="128" r="14" fill="#d29a5b" opacity="0.95" />
      <circle cx="101" cy="130" r="6" fill="#3a2415" opacity="0.95" />
      <path d="M86 130 H160" stroke="#f3e3c5" strokeWidth="0.8" opacity="0.9" />
      <path d="M86 133 H160" stroke="#f3e3c5" strokeWidth="0.8" opacity="0.7" />
    </g>
    {/* strumming arms */}
    <rect x="62" y="98" width="13" height="36" rx="6" fill="#FFFFFF" opacity="0.75" transform="rotate(28 68 100)" />
    <rect x="124" y="96" width="13" height="34" rx="6" fill="#FFFFFF" opacity="0.75" transform="rotate(-20 130 98)" />
    {/* floating notes */}
    <text x="42" y="78" fill="#FFFFFF" opacity="0.7" fontSize="15">♪</text>
    <text x="158" y="64" fill="#FFFFFF" opacity="0.55" fontSize="12">♫</text>
  </svg>
);

const Lifter: React.FC = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <AstronautBase />
    {/* arms curling the bar */}
    <rect x="62" y="98" width="13" height="34" rx="6" fill="#FFFFFF" opacity="0.75" />
    <rect x="125" y="98" width="13" height="34" rx="6" fill="#FFFFFF" opacity="0.75" />
    {/* barbell */}
    <rect x="48" y="128" width="104" height="7" rx="3" fill="#b0bec5" opacity="0.95" />
    <rect x="42" y="114" width="10" height="36" rx="3" fill="#90a4ae" opacity="0.95" />
    <rect x="34" y="120" width="8" height="24" rx="3" fill="#78909c" opacity="0.95" />
    <rect x="148" y="114" width="10" height="36" rx="3" fill="#90a4ae" opacity="0.95" />
    <rect x="158" y="120" width="8" height="24" rx="3" fill="#78909c" opacity="0.95" />
    {/* effort lines */}
    <path d="M70 46 l-6 -8 M130 46 l6 -8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

interface CatProps {
  fur: string;
  furDark: string;
  tabby?: boolean;
  waving?: boolean;
}

const CatAstronaut: React.FC<CatProps> = ({ fur, furDark, tabby, waving }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* tail, suited in fur */}
    <path d="M122 146 C152 156, 162 130, 150 112" stroke={fur} strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.9" />
    {/* helmet bubble — big enough for the ears */}
    <circle cx="100" cy="68" r="38" fill="#FFFFFF" opacity="0.18" />
    <circle cx="100" cy="68" r="38" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.75" />
    <circle cx="86" cy="52" r="6" fill="#FFFFFF" opacity="0.5" />
    {/* ears */}
    <path d="M82 62 L88 40 L98 56 Z" fill={fur} opacity="0.95" />
    <path d="M102 56 L112 40 L118 62 Z" fill={fur} opacity="0.95" />
    <path d="M86 58 L89 47 L94 55 Z" fill="#f2b8c6" opacity="0.85" />
    <path d="M105 55 L111 47 L114 58 Z" fill="#f2b8c6" opacity="0.85" />
    {/* head */}
    <circle cx="100" cy="74" r="21" fill={fur} opacity="0.97" />
    {tabby && (
      <path d="M93 56 v8 M100 54 v9 M107 56 v8" stroke={furDark} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    )}
    {/* face */}
    <circle cx="92" cy="72" r="2.6" fill="#2b2b2b" />
    <circle cx="108" cy="72" r="2.6" fill="#2b2b2b" />
    <path d="M97 80 L100 83 L103 80 Z" fill="#f2b8c6" />
    <path d="M100 83 v3 M100 86 c-2 3 -5 3 -7 1 M100 86 c2 3 5 3 7 1" stroke="#2b2b2b" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.85" />
    <path d="M78 76 h-12 M78 81 l-11 3 M122 76 h12 M122 81 l11 3" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
    {/* suit */}
    <rect x="79" y="104" width="42" height="44" rx="10" fill="#FFFFFF" opacity="0.85" />
    <rect x="88" y="112" width="24" height="16" rx="4" fill="#E8E8E8" opacity="0.65" />
    {/* paws */}
    {waving ? (
      <rect x="124" y="70" width="12" height="34" rx="6" fill="#FFFFFF" opacity="0.8" transform="rotate(-38 130 104)" />
    ) : (
      <rect x="121" y="108" width="12" height="30" rx="6" fill="#FFFFFF" opacity="0.8" />
    )}
    <rect x="67" y="108" width="12" height="30" rx="6" fill="#FFFFFF" opacity="0.8" />
    {waving ? (
      <circle cx="143" cy="68" r="5.5" fill={fur} opacity="0.95" />
    ) : (
      <circle cx="127" cy="140" r="5.5" fill={fur} opacity="0.95" />
    )}
    <circle cx="73" cy="140" r="5.5" fill={fur} opacity="0.95" />
    {/* legs */}
    <rect x="84" y="146" width="13" height="24" rx="6" fill="#FFFFFF" opacity="0.8" />
    <rect x="103" y="146" width="13" height="24" rx="6" fill="#FFFFFF" opacity="0.8" />
  </svg>
);

const renderVariant = (variant: DrifterVariant) => {
  switch (variant) {
    case 'orangeCat':
      return <CatAstronaut fur="#e8924a" furDark="#b05f1d" tabby />;
    case 'grayCat':
      return <CatAstronaut fur="#9aa5b1" furDark="#6e7a87" waving />;
    case 'baller':
      return <Baller />;
    case 'guitarist':
      return <Guitarist />;
    case 'lifter':
    default:
      return <Lifter />;
  }
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
            opacity: [0, 0.8, 0.8, 0.8, 0],
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
            height: `${config.size}px`,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          {renderVariant(config.variant)}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpaceDrifter;
