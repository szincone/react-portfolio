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

// Shared gradient defs; `p` prefixes ids so variants never collide
const SuitDefs: React.FC<{ p: string }> = ({ p }) => (
  <defs>
    <linearGradient id={`${p}suit`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#ffffff" />
      <stop offset="1" stopColor="#d4dee8" />
    </linearGradient>
    <linearGradient id={`${p}visor`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#3a4a6b" />
      <stop offset="1" stopColor="#0b1220" />
    </linearGradient>
  </defs>
);

// Helmet + torso + legs shared by the human astronauts; variants add arms and props
const AstronautBase: React.FC<{ p: string }> = ({ p }) => (
  <>
    {/* backpack */}
    <rect x="71" y="90" width="58" height="34" rx="10" fill="#c2cdd8" opacity="0.95" />
    {/* helmet */}
    <circle cx="100" cy="62" r="29" fill={`url(#${p}suit)`} />
    <circle cx="73" cy="62" r="4.5" fill="#c2cdd8" />
    <circle cx="127" cy="62" r="4.5" fill="#c2cdd8" />
    <rect x="82" y="49" width="36" height="26" rx="13" fill={`url(#${p}visor)`} />
    <path d="M90 58 q7 -4.5 14 -2.5" stroke="#8fd9ff" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.55" />
    <circle cx="89" cy="62" r="1.3" fill="#8fd9ff" opacity="0.4" />
    {/* collar + torso */}
    <rect x="88" y="87" width="24" height="7" rx="3.5" fill="#b3bfcc" />
    <rect x="80" y="92" width="40" height="46" rx="15" fill={`url(#${p}suit)`} />
    <rect x="90" y="102" width="20" height="13" rx="4" fill="#b3bfcc" opacity="0.9" />
    <circle cx="96" cy="108.5" r="1.8" fill="#69d2ff" />
    <circle cx="104" cy="108.5" r="1.8" fill="#ffb86b" />
    {/* legs + boots */}
    <rect x="84" y="136" width="13" height="22" rx="6.5" fill={`url(#${p}suit)`} />
    <rect x="103" y="136" width="13" height="22" rx="6.5" fill={`url(#${p}suit)`} />
    <rect x="82.5" y="152" width="16" height="10" rx="5" fill="#c2cdd8" />
    <rect x="101.5" y="152" width="16" height="10" rx="5" fill="#c2cdd8" />
  </>
);

const Baller: React.FC = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <SuitDefs p="ba" />
    <defs>
      <radialGradient id="baball" cx="0.35" cy="0.3" r="0.85">
        <stop offset="0" stopColor="#ffb35c" />
        <stop offset="0.55" stopColor="#f57c20" />
        <stop offset="1" stopColor="#b1490a" />
      </radialGradient>
    </defs>
    <AstronautBase p="ba" />
    {/* left arm relaxed, right arm raised to the ball */}
    <rect x="66" y="96" width="13" height="33" rx="6.5" fill="url(#basuit)" transform="rotate(14 72.5 100)" />
    <circle cx="79.5" cy="128" r="5.5" fill="#e8eef4" />
    <rect x="121" y="56" width="13" height="46" rx="6.5" fill="url(#basuit)" transform="rotate(30 127.5 102)" />
    <circle cx="150" cy="61" r="5.5" fill="#e8eef4" />
    {/* basketball */}
    <circle cx="151" cy="38" r="17" fill="url(#baball)" />
    <g stroke="#7a3208" strokeWidth="1.6" strokeLinecap="round" opacity="0.85">
      <path d="M134.5 38 q16.5 5 33 0" />
      <path d="M151 21.5 q-5 16.5 0 33" />
      <path d="M141 25.5 c-7 7.5 -7 17.5 0 25" />
      <path d="M161 25.5 c7 7.5 7 17.5 0 25" />
    </g>
    {/* spin motion */}
    <path d="M138 16 a 18 18 0 0 1 26 0" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.45" />
  </svg>
);

const Guitarist: React.FC = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <SuitDefs p="gu" />
    <defs>
      <radialGradient id="guwood" cx="0.4" cy="0.35" r="0.9">
        <stop offset="0" stopColor="#c08a52" />
        <stop offset="1" stopColor="#85572c" />
      </radialGradient>
    </defs>
    <AstronautBase p="gu" />
    {/* guitar slung across the chest */}
    <g transform="rotate(-28 100 122)">
      <rect x="120" y="118.5" width="44" height="6.5" rx="2.5" fill="#6b4a2b" />
      <g stroke="#c9a87a" strokeWidth="0.9">
        <path d="M131 118.5 v6.5" />
        <path d="M141 118.5 v6.5" />
        <path d="M151 118.5 v6.5" />
      </g>
      <rect x="161" y="116" width="14" height="11.5" rx="3.5" fill="#4e351f" />
      <circle cx="165" cy="114.5" r="1.3" fill="#d9c9a8" />
      <circle cx="169" cy="114.5" r="1.3" fill="#d9c9a8" />
      <circle cx="173" cy="114.5" r="1.3" fill="#d9c9a8" />
      <circle cx="88" cy="126" r="18" fill="url(#guwood)" />
      <circle cx="110" cy="122" r="13" fill="url(#guwood)" />
      <circle cx="97" cy="123.5" r="7" stroke="#e3c193" strokeWidth="1" opacity="0.6" />
      <circle cx="97" cy="123.5" r="5.5" fill="#2e1c10" />
      <rect x="80" y="130" width="12" height="3.5" rx="1.75" fill="#3a2415" />
      <path d="M84 121 H162" stroke="#f0e3c8" strokeWidth="0.8" opacity="0.9" />
      <path d="M84 123.5 H162" stroke="#f0e3c8" strokeWidth="0.8" opacity="0.55" />
    </g>
    {/* fretting + strumming arms over the guitar */}
    <rect x="118" y="96" width="13" height="26" rx="6.5" fill="url(#gusuit)" transform="rotate(-55 124.5 96)" />
    <circle cx="146" cy="110" r="5.5" fill="#e8eef4" />
    <rect x="69" y="98" width="13" height="32" rx="6.5" fill="url(#gusuit)" transform="rotate(-18 75.5 102)" />
    <circle cx="85" cy="128" r="5.5" fill="#e8eef4" />
    {/* drifting notes */}
    <g fill="#ffffff" opacity="0.7">
      <g transform="translate(48 62)">
        <ellipse cx="0" cy="9" rx="3.2" ry="2.4" transform="rotate(-20 0 9)" />
        <path d="M2.9 8.2 V -3.5 q4.5 1.2 5.5 4.5" stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(152 142) scale(0.8)" opacity="0.75">
        <ellipse cx="0" cy="9" rx="3.2" ry="2.4" transform="rotate(-20 0 9)" />
        <path d="M2.9 8.2 V -3.5 q4.5 1.2 5.5 4.5" stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
    </g>
  </svg>
);

const Lifter: React.FC = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <SuitDefs p="li" />
    <defs>
      <linearGradient id="libar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#dde6ee" />
        <stop offset="1" stopColor="#94a5b5" />
      </linearGradient>
      <radialGradient id="liplate" cx="0.38" cy="0.32" r="0.9">
        <stop offset="0" stopColor="#67788a" />
        <stop offset="1" stopColor="#323e4c" />
      </radialGradient>
    </defs>
    <AstronautBase p="li" />
    {/* arms down to the bar */}
    <rect x="76" y="96" width="13" height="30" rx="6.5" fill="url(#lisuit)" transform="rotate(6 82.5 100)" />
    <rect x="111" y="96" width="13" height="30" rx="6.5" fill="url(#lisuit)" transform="rotate(-6 117.5 100)" />
    {/* barbell */}
    <rect x="44" y="120" width="112" height="5" rx="2.5" fill="url(#libar)" />
    <rect x="67" y="117" width="4" height="11" rx="2" fill="#c2cdd8" />
    <rect x="129" y="117" width="4" height="11" rx="2" fill="#c2cdd8" />
    <circle cx="56" cy="122.5" r="17" fill="url(#liplate)" />
    <circle cx="56" cy="122.5" r="16" stroke="#7e91a3" strokeWidth="1" opacity="0.7" />
    <circle cx="56" cy="122.5" r="5" fill="#222c36" />
    <circle cx="42" cy="122.5" r="12" fill="url(#liplate)" />
    <circle cx="42" cy="122.5" r="3.8" fill="#222c36" />
    <circle cx="144" cy="122.5" r="17" fill="url(#liplate)" />
    <circle cx="144" cy="122.5" r="16" stroke="#7e91a3" strokeWidth="1" opacity="0.7" />
    <circle cx="144" cy="122.5" r="5" fill="#222c36" />
    <circle cx="158" cy="122.5" r="12" fill="url(#liplate)" />
    <circle cx="158" cy="122.5" r="3.8" fill="#222c36" />
    {/* gloves on the bar */}
    <circle cx="84" cy="122.5" r="5.5" fill="#e8eef4" />
    <circle cx="116" cy="122.5" r="5.5" fill="#e8eef4" />
    {/* effort */}
    <g stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.45">
      <path d="M70 36 l-5 -7" />
      <path d="M130 36 l5 -7" />
    </g>
  </svg>
);

interface CatProps {
  p: string;
  fur: string;
  furDark: string;
  tabby?: boolean;
  waving?: boolean;
}

const CatAstronaut: React.FC<CatProps> = ({ p, fur, furDark, tabby, waving }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <SuitDefs p={p} />
    <defs>
      <radialGradient id={`${p}fur`} cx="0.38" cy="0.3" r="0.95">
        <stop offset="0" stopColor={fur} />
        <stop offset="1" stopColor={furDark} />
      </radialGradient>
    </defs>
    {/* tail, poking out of the suit */}
    <path d="M116 138 C142 148 154 124 142 108" stroke={fur} strokeWidth="7" strokeLinecap="round" fill="none" />
    <circle cx="142" cy="108" r="4.5" fill={tabby ? furDark : '#e8eef4'} />
    {/* head inside the bubble */}
    <polygon points="86,63 90,45 101,56" fill={fur} stroke={fur} strokeWidth="3" strokeLinejoin="round" />
    <polygon points="99,56 110,45 114,63" fill={fur} stroke={fur} strokeWidth="3" strokeLinejoin="round" />
    <polygon points="89.5,59 91.5,49.5 98,55.5" fill="#f2b0c2" />
    <polygon points="102,55.5 108.5,49.5 110.5,59" fill="#f2b0c2" />
    <circle cx="100" cy="72" r="20" fill={`url(#${p}fur)`} />
    {tabby && (
      <g stroke={furDark} strokeWidth="2.4" strokeLinecap="round" opacity="0.8">
        <path d="M93 53.5 q-0.6 4 0 7" />
        <path d="M100 52 v8" />
        <path d="M107 53.5 q0.6 4 0 7" />
      </g>
    )}
    {!tabby && <ellipse cx="100" cy="80" rx="7.5" ry="5.5" fill="#f1f4f7" opacity="0.9" />}
    {/* face */}
    <circle cx="91.5" cy="70" r="2.7" fill="#2d2d2d" />
    <circle cx="108.5" cy="70" r="2.7" fill="#2d2d2d" />
    <circle cx="90.6" cy="69" r="0.9" fill="#ffffff" />
    <circle cx="107.6" cy="69" r="0.9" fill="#ffffff" />
    <path d="M97.8 77.5 q2.2 -1.6 4.4 0 q-1 2.8 -2.2 2.8 q-1.2 0 -2.2 -2.8 Z" fill="#e98ea4" />
    <g stroke="#2d2d2d" strokeWidth="1.3" strokeLinecap="round" fill="none">
      <path d="M100 80.3 q-1.5 3 -4.5 1.6" />
      <path d="M100 80.3 q1.5 3 4.5 1.6" />
    </g>
    <g stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.55">
      <path d="M81 71 L68 69" />
      <path d="M81 75 L67 76" />
      <path d="M81 79 L69 83" />
      <path d="M119 71 L132 69" />
      <path d="M119 75 L133 76" />
      <path d="M119 79 L131 83" />
    </g>
    {/* glass bubble over everything above */}
    <circle cx="100" cy="66" r="37" fill="#ffffff" opacity="0.07" />
    <circle cx="100" cy="66" r="37" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
    <path d="M75 53 A 28 28 0 0 1 91 33.5" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
    {/* collar + suit */}
    <ellipse cx="100" cy="102" rx="15" ry="4.5" fill="#b3bfcc" />
    <rect x="82" y="104" width="36" height="40" rx="15" fill={`url(#${p}suit)`} />
    <rect x="90" y="112" width="20" height="13" rx="4" fill="#b3bfcc" opacity="0.9" />
    <circle cx="96" cy="118.5" r="1.8" fill="#69d2ff" />
    <circle cx="104" cy="118.5" r="1.8" fill="#ffb86b" />
    {/* arms with fur mitts */}
    {waving ? (
      <>
        <rect x="120" y="76" width="12" height="32" rx="6" fill={`url(#${p}suit)`} transform="rotate(44 126 105)" />
        <circle cx="146" cy="84" r="5.5" fill={fur} />
      </>
    ) : (
      <>
        <rect x="119" y="106" width="12" height="28" rx="6" fill={`url(#${p}suit)`} transform="rotate(-10 125 109)" />
        <circle cx="129" cy="135" r="5.5" fill={fur} />
      </>
    )}
    <rect x="69" y="106" width="12" height="28" rx="6" fill={`url(#${p}suit)`} transform="rotate(10 75 109)" />
    <circle cx="79.5" cy="134" r="5.5" fill={fur} />
    {/* legs + boots */}
    <rect x="86" y="142" width="12" height="18" rx="6" fill={`url(#${p}suit)`} />
    <rect x="102" y="142" width="12" height="18" rx="6" fill={`url(#${p}suit)`} />
    <rect x="84.5" y="155" width="15" height="9" rx="4.5" fill="#c2cdd8" />
    <rect x="100.5" y="155" width="15" height="9" rx="4.5" fill="#c2cdd8" />
  </svg>
);

export const renderVariant = (variant: DrifterVariant) => {
  switch (variant) {
    case 'orangeCat':
      return <CatAstronaut p="oc" fur="#e8924a" furDark="#b05f1d" tabby />;
    case 'grayCat':
      return <CatAstronaut p="gc" fur="#9aa5b1" furDark="#6e7a87" waving />;
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
