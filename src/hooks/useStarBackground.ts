'use client';

import { useEffect, useRef } from 'react';

const STAR_COUNT = 160;
const STAR_COLORS = [
  '#A084E8', // main purple
  '#C084FC', // light purple
  '#8B5CF6', // accent
  '#fff',    // white
];

interface Star {
  x: number;
  y: number;
  r: number;
  color: string;
  speed: number;
  twinkle: number;
}

function randomBetween(a: number, b: number): number {
  return a + Math.random() * (b - a);
}

function createStar(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, width: number, height: number): Star {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const r = randomBetween(0.7, 2.2);
  const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
  const speed = randomBetween(0.08, 0.25);
  return { x, y, r, color, speed, twinkle: Math.random() };
}

function animateStars(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, stars: Star[]): void {
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const star of stars) {
      // Twinkle effect
      const alpha = 0.7 + 0.3 * Math.sin(Date.now() * 0.002 * star.twinkle + star.x);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
      ctx.fillStyle = star.color;
      ctx.shadowColor = star.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Move star horizontally for subtle motion
      star.x += star.speed;
      if (star.x > canvas.width + 5) star.x = -5;
    }
    
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  };
  
  animate();
}

export const useStarBackground = (containerRef: React.RefObject<HTMLElement | null>) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const canvas = document.createElement('canvas');
    canvas.className = 'star-bg-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    
    // Set container position if needed
    const computedStyle = window.getComputedStyle(container);
    if (computedStyle.position === 'static') {
      container.style.position = 'relative';
    }
    
    container.prepend(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: STAR_COUNT }, () => 
      createStar(canvas, ctx, canvas.width, canvas.height)
    );
    
    animateStars(canvas, ctx, stars);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      if (canvasRef.current && container.contains(canvasRef.current)) {
        container.removeChild(canvasRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [containerRef]);

  return canvasRef;
};