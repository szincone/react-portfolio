import React, { useEffect, useRef } from 'react';
import { paletteColors, withAlpha } from '../../theme';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleAmp: number;
  twinkleFreq: number;
  twinklePhase: number;
  depth: number; // 0 (far) .. 1 (near), drives parallax + drift speed
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // seconds alive
  maxLife: number;
}

interface ConstellationPoint {
  x: number;
  y: number;
}

interface Constellation {
  name: string;
  points: ConstellationPoint[];
  lines: Array<[number, number]>;
  aspect: number; // height relative to width
}

// Easter-egg constellations, points in a normalized 0..1 box
const CONSTELLATIONS: Constellation[] = [
  {
    // sitting cat, side profile
    name: 'FELIS MAJOR',
    aspect: 1,
    points: [
      { x: 0.04, y: 0.78 }, // tail tip
      { x: 0.14, y: 0.94 }, // tail curve
      { x: 0.3, y: 0.9 }, // back haunch
      { x: 0.42, y: 0.52 }, // back
      { x: 0.52, y: 0.3 }, // neck
      { x: 0.52, y: 0.08 }, // left ear tip
      { x: 0.62, y: 0.18 }, // between ears
      { x: 0.72, y: 0.06 }, // right ear tip
      { x: 0.78, y: 0.26 }, // face
      { x: 0.76, y: 0.42 }, // chin
      { x: 0.68, y: 0.62 }, // chest
      { x: 0.7, y: 0.92 }, // front paw
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
      [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 2],
    ],
  },
  {
    // acoustic guitar
    name: 'THE SIX-STRING',
    aspect: 1,
    points: [
      { x: 0.08, y: 0.06 }, // headstock
      { x: 0.18, y: 0.16 }, // nut
      { x: 0.46, y: 0.46 }, // neck joins body
      { x: 0.6, y: 0.38 }, // upper bout right
      { x: 0.74, y: 0.46 },
      { x: 0.82, y: 0.62 }, // lower bout right
      { x: 0.74, y: 0.8 },
      { x: 0.58, y: 0.86 }, // bottom
      { x: 0.44, y: 0.76 }, // lower bout left
      { x: 0.4, y: 0.58 }, // waist left
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
      [6, 7], [7, 8], [8, 9], [9, 2],
    ],
  },
  {
    // dumbbell
    name: 'THE DUMBBELL',
    aspect: 0.55,
    points: [
      { x: 0.06, y: 0.18 }, // left outer plate top
      { x: 0.06, y: 0.82 }, // left outer plate bottom
      { x: 0.18, y: 0.08 }, // left inner plate top
      { x: 0.18, y: 0.92 }, // left inner plate bottom
      { x: 0.18, y: 0.5 }, // bar left
      { x: 0.82, y: 0.5 }, // bar right
      { x: 0.82, y: 0.08 }, // right inner plate top
      { x: 0.82, y: 0.92 }, // right inner plate bottom
      { x: 0.94, y: 0.18 }, // right outer plate top
      { x: 0.94, y: 0.82 }, // right outer plate bottom
    ],
    lines: [
      [0, 1], [2, 3], [4, 5], [6, 7], [8, 9],
      [0, 2], [1, 3], [6, 8], [7, 9],
    ],
  },
  {
    // ball arcing toward a hoop
    name: 'THE BUZZER BEATER',
    aspect: 0.8,
    points: [
      { x: 0.06, y: 0.78 }, // shot release
      { x: 0.18, y: 0.5 },
      { x: 0.32, y: 0.32 }, // arc apex
      { x: 0.48, y: 0.26 },
      { x: 0.6, y: 0.32 }, // ball at rim
      { x: 0.68, y: 0.42 }, // rim front
      { x: 0.82, y: 0.42 }, // rim back
      { x: 0.86, y: 0.12 }, // backboard top
      { x: 0.86, y: 0.5 }, // backboard bottom
      { x: 0.7, y: 0.66 }, // net left
      { x: 0.8, y: 0.66 }, // net right
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [5, 6], [6, 7], [6, 8], [5, 9], [6, 10], [9, 10],
    ],
  },
];

const STAR_COLORS = ['#ffffff', '#ffffff', '#ffffff', '#cfe8ff', '#ffe9c4'];

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SpaceScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reducedMotion = prefersReducedMotion();
    const accent = paletteColors.secondary.main;
    const accent2 = paletteColors.accent.main;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let nextShootingStarAt = 3 + Math.random() * 5;
    let animationFrame = 0;

    // smoothed mouse parallax, in -1..1
    let mouseX = 0;
    let mouseY = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    // constellation cycle state
    let activeConstellation = Math.floor(Math.random() * CONSTELLATIONS.length);
    let constellationStart = 6 + Math.random() * 6;
    let constellationOrigin = { x: 0.1, y: 0.15, size: 220 };
    const CONSTELLATION_VISIBLE = 11; // fade in 2.5s, hold 6s, fade out 2.5s
    const CONSTELLATION_GAP = 14;

    const placeConstellation = () => {
      // keep to the side/corner zones so it never sits behind the main content
      const zones = [
        { x: 0.04, y: 0.12 },
        { x: 0.72, y: 0.55 },
        { x: 0.05, y: 0.55 },
        { x: 0.68, y: 0.1 },
      ];
      const zone = zones[Math.floor(Math.random() * zones.length)];
      const size = Math.min(240, Math.max(150, width * 0.16));
      constellationOrigin = {
        x: zone.x * width,
        y: zone.y * height,
        size,
      };
    };

    const buildStars = () => {
      stars = [];
      const count = Math.min(420, Math.floor((width * height) / 3800));
      for (let i = 0; i < count; i += 1) {
        const depth = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0.4 + depth * 1.6 + Math.random() * 0.4,
          baseAlpha: 0.25 + depth * 0.45,
          twinkleAmp: 0.1 + Math.random() * 0.35,
          twinkleFreq: 0.3 + Math.random() * 1.2,
          twinklePhase: Math.random() * Math.PI * 2,
          depth,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
      placeConstellation();
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / width) * 2 - 1;
      mouseY = (event.clientY / height) * 2 - 1;
    };

    const spawnShootingStar = () => {
      const fromLeft = Math.random() > 0.5;
      const speed = 600 + Math.random() * 500;
      const angle = (20 + Math.random() * 18) * (Math.PI / 180);
      shootingStars.push({
        x: fromLeft ? -40 : width * (0.3 + Math.random() * 0.7),
        y: Math.random() * height * 0.45,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : 1),
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.7 + Math.random() * 0.5,
      });
    };

    const drawStars = (t: number) => {
      stars.forEach((star) => {
        const drift = reducedMotion ? 0 : t * (2 + star.depth * 6);
        const px = parallaxX * star.depth * 18;
        const py = parallaxY * star.depth * 12;
        const x = (star.x + drift + px + width) % width;
        const y = (star.y + py + height) % height;
        const twinkle = reducedMotion
          ? 0
          : Math.sin(t * star.twinkleFreq + star.twinklePhase) * star.twinkleAmp;
        const alpha = Math.max(0.05, Math.min(1, star.baseAlpha + twinkle));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();
        // soft glow on the nearest stars
        if (star.depth > 0.82) {
          ctx.globalAlpha = alpha * 0.25;
          ctx.beginPath();
          ctx.arc(x, y, star.size * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
    };

    const drawShootingStars = (dt: number) => {
      shootingStars = shootingStars.filter((s) => s.life < s.maxLife);
      shootingStars.forEach((s) => {
        s.life += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        const progress = s.life / s.maxLife;
        const alpha = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;
        const tailX = s.x - s.vx * 0.12;
        const tailY = s.y - s.vy * 0.12;
        const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * alpha})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      });
    };

    // The basketball planet: a shaded orange sphere with rotating seams,
    // an atmospheric glow, a ring band, and a small moon in orbit
    const drawBasketballPlanet = (t: number) => {
      const radius = Math.max(26, Math.min(52, width * 0.038));
      const cx = width * 0.84 + parallaxX * 8;
      const cy = height * 0.2 + (reducedMotion ? 0 : Math.sin(t * 0.25) * 8) + parallaxY * 6;
      const ringTilt = -0.38;
      const ringRx = radius * 1.9;
      const ringRy = radius * 0.52;

      const moonAngle = t * 0.45;
      const moonX = cx + Math.cos(moonAngle) * radius * 2.5;
      const moonY = cy + Math.sin(moonAngle) * radius * 0.75;
      const moonBehind = Math.sin(moonAngle) < 0;

      const drawMoon = () => {
        const moonR = radius * 0.16;
        const moonGradient = ctx.createRadialGradient(
          moonX - moonR * 0.4, moonY - moonR * 0.4, moonR * 0.15,
          moonX, moonY, moonR,
        );
        moonGradient.addColorStop(0, '#eef2f5');
        moonGradient.addColorStop(1, '#8d9aa6');
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = moonGradient;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      };

      const strokeRing = (start: number, end: number, alpha: number) => {
        const ringGradient = ctx.createLinearGradient(cx - ringRx, cy, cx + ringRx, cy);
        ringGradient.addColorStop(0, withAlpha(accent, 0));
        ringGradient.addColorStop(0.35, withAlpha(accent, alpha));
        ringGradient.addColorStop(0.65, withAlpha(accent, alpha));
        ringGradient.addColorStop(1, withAlpha(accent, 0.1 * alpha));
        // soft outer pass, then a brighter core line
        ctx.strokeStyle = ringGradient;
        ctx.lineWidth = 6;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.ellipse(cx, cy, ringRx, ringRy, ringTilt, start, end);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, ringRx, ringRy, ringTilt, start, end);
        ctx.stroke();
      };

      ctx.save();

      // atmospheric glow
      const halo = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 2.2);
      halo.addColorStop(0, 'rgba(255, 145, 60, 0.18)');
      halo.addColorStop(1, 'rgba(255, 145, 60, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      if (moonBehind) drawMoon();
      strokeRing(Math.PI, Math.PI * 2, 0.45);

      // ball body
      const bodyGradient = ctx.createRadialGradient(
        cx - radius * 0.4, cy - radius * 0.4, radius * 0.1,
        cx, cy, radius * 1.05,
      );
      bodyGradient.addColorStop(0, '#ffc078');
      bodyGradient.addColorStop(0.4, '#f08a2e');
      bodyGradient.addColorStop(0.75, '#cf5f12');
      bodyGradient.addColorStop(1, '#7e3a08');
      ctx.fillStyle = bodyGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // seams + shading, clipped to the ball
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // slowly rotating basketball seams
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(reducedMotion ? 0.4 : t * 0.05);
      ctx.strokeStyle = 'rgba(85, 38, 8, 0.5)';
      ctx.lineWidth = Math.max(1.5, radius * 0.05);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-radius, 0);
      ctx.quadraticCurveTo(0, radius * 0.14, radius, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.3, radius, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(-radius * 1.35, 0, radius * 1.05, radius * 1.45, 0, -0.5, 0.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(radius * 1.35, 0, radius * 1.05, radius * 1.45, 0, Math.PI - 0.5, Math.PI + 0.5);
      ctx.stroke();
      ctx.restore();

      // terminator: darken the limb away from the light
      const shade = ctx.createRadialGradient(
        cx - radius * 0.45, cy - radius * 0.45, radius * 0.35,
        cx - radius * 0.45, cy - radius * 0.45, radius * 1.8,
      );
      shade.addColorStop(0, 'rgba(25, 12, 35, 0)');
      shade.addColorStop(0.6, 'rgba(25, 12, 35, 0.12)');
      shade.addColorStop(1, 'rgba(25, 12, 35, 0.55)');
      ctx.fillStyle = shade;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      // specular highlight
      const spec = ctx.createRadialGradient(
        cx - radius * 0.45, cy - radius * 0.5, 0,
        cx - radius * 0.45, cy - radius * 0.5, radius * 0.55,
      );
      spec.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      spec.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = spec;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      ctx.restore();

      strokeRing(0, Math.PI, 0.6);
      if (!moonBehind) drawMoon();

      ctx.restore();
    };

    const drawConstellation = (t: number) => {
      const elapsed = t - constellationStart;
      if (elapsed < 0) return;
      if (elapsed > CONSTELLATION_VISIBLE) {
        // schedule the next one
        activeConstellation = (activeConstellation + 1 + Math.floor(Math.random() * (CONSTELLATIONS.length - 1))) % CONSTELLATIONS.length;
        constellationStart = t + CONSTELLATION_GAP;
        placeConstellation();
        return;
      }
      let alpha = 1;
      if (elapsed < 2.5) alpha = elapsed / 2.5;
      else if (elapsed > CONSTELLATION_VISIBLE - 2.5) alpha = (CONSTELLATION_VISIBLE - elapsed) / 2.5;

      const constellation = CONSTELLATIONS[activeConstellation];
      const { x: ox, y: oy, size } = constellationOrigin;
      const scaleY = size * constellation.aspect;

      const px = (p: ConstellationPoint) => ox + p.x * size;
      const py = (p: ConstellationPoint) => oy + p.y * scaleY;

      ctx.save();
      // connecting lines
      ctx.strokeStyle = withAlpha(accent, 0.28 * alpha);
      ctx.lineWidth = 1;
      constellation.lines.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(px(constellation.points[a]), py(constellation.points[a]));
        ctx.lineTo(px(constellation.points[b]), py(constellation.points[b]));
        ctx.stroke();
      });
      // stars at the vertices
      constellation.points.forEach((p, i) => {
        const sparkle = reducedMotion ? 0 : Math.sin(t * 1.5 + i) * 0.15;
        ctx.globalAlpha = Math.max(0, (0.75 + sparkle) * alpha);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px(p), py(p), 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
      // name plate
      ctx.globalAlpha = 0.45 * alpha;
      ctx.fillStyle = paletteColors.text.secondary;
      ctx.font = '500 11px "Space Grotesk", "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(constellation.name, ox + size / 2, oy + scaleY + 22);
      ctx.restore();
      ctx.globalAlpha = 1;
    };

    let lastFrame = performance.now();
    const start = lastFrame;

    const render = (now: number) => {
      const t = (now - start) / 1000;
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;

      parallaxX += (mouseX - parallaxX) * 0.04;
      parallaxY += (mouseY - parallaxY) * 0.04;

      ctx.clearRect(0, 0, width, height);
      drawStars(t);
      drawBasketballPlanet(t);
      drawConstellation(t);

      if (!reducedMotion) {
        if (t > nextShootingStarAt) {
          spawnShootingStar();
          nextShootingStarAt = t + 4 + Math.random() * 8;
        }
        drawShootingStars(dt);
      }

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    if (!reducedMotion) {
      window.addEventListener('mousemove', onMouseMove);
      animationFrame = requestAnimationFrame(render);
    } else {
      // single static frame: stars + planet, no motion
      render(performance.now());
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default SpaceScene;
