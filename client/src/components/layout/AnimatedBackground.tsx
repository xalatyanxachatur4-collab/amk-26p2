import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext.js';

export const AnimatedBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes representing mechanical flow
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }

    const particles: Particle[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.3 + 0.1,
    }));

    let gearAngle = 0;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = mediaQuery.matches;

    const updateMotionPref = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', updateMotionPref);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const gridColor = isDark ? 'rgba(56, 189, 248, 0.035)' : 'rgba(2, 132, 199, 0.04)';
      const nodeColor = isDark ? 'rgba(56, 189, 248, ' : 'rgba(3, 105, 161, ';
      const gearStroke = isDark ? 'rgba(56, 189, 248, 0.04)' : 'rgba(2, 132, 199, 0.035)';

      // 1. Draw subtle technical blueprint grid
      const gridSize = 64;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Draw subtle rotating gear in upper-right corner
      if (!isReducedMotion) {
        gearAngle += 0.002;
      }
      drawGear(ctx, width - 120, 160, 140, 14, gearAngle, gearStroke);
      drawGear(ctx, width - 240, 240, 70, 8, -gearAngle * 2, gearStroke);

      // 3. Draw subtle kinematic motion nodes and connection vectors
      particles.forEach((p, idx) => {
        if (!isReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.fillStyle = `${nodeColor}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes with blueprint line
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `${nodeColor}${(1 - dist / 130) * 0.08})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', updateMotionPref);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};

function drawGear(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  teeth: number,
  angle: number,
  strokeColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1.5;

  const toothDepth = radius * 0.12;
  const innerRadius = radius - toothDepth;

  ctx.beginPath();
  for (let i = 0; i < teeth; i++) {
    const a1 = (i / teeth) * Math.PI * 2;
    const a2 = a1 + Math.PI / teeth / 2;
    const a3 = a2 + Math.PI / teeth / 2;
    const a4 = a3 + Math.PI / teeth / 2;

    const r1 = radius;
    const r2 = innerRadius;

    ctx.lineTo(Math.cos(a1) * r2, Math.sin(a1) * r2);
    ctx.lineTo(Math.cos(a2) * r1, Math.sin(a2) * r1);
    ctx.lineTo(Math.cos(a3) * r1, Math.sin(a3) * r1);
    ctx.lineTo(Math.cos(a4) * r2, Math.sin(a4) * r2);
  }
  ctx.closePath();
  ctx.stroke();

  // Center hub & bore
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.15, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}
