'use client';

import { useEffect, useRef } from 'react';

const STAR_COUNT = 80; // Reduced for the purple section
const STAR_COLORS = [
  '#E0B4E8', // light purple/pink
  '#C084FC', // light purple
  '#DDD6FE', // very light purple
  '#fff',    // white
  '#F3E8FF', // almost white purple
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
  const r = randomBetween(0.5, 1.8); // Smaller stars for purple background
  const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
  const speed = randomBetween(0.05, 0.15); // Slower movement
  return { x, y, r, color, speed, twinkle: Math.random() * 2 }; // More varied twinkle
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
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.className = 'star-bg-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    
    // Set container position if needed
    const computedStyle = window.getComputedStyle(container);
    if (computedStyle.position === 'static') {
      container.style.position = 'relative';
    }
    
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize function with proper pixel ratio handling
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      ctx.scale(pixelRatio, pixelRatio);
      
      // Recreate stars with new dimensions
      starsRef.current = Array.from({ length: STAR_COUNT }, () => 
        createStar(canvas, ctx, rect.width, rect.height)
      );
    };
    
    // Initial resize
    resize();
    window.addEventListener('resize', resize);

    // Create initial stars
    starsRef.current = Array.from({ length: STAR_COUNT }, () => 
      createStar(canvas, ctx, canvas.width, canvas.height)
    );
    
    // Start animation
    const animate = () => {
      if (!canvas || !ctx) return;
      
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      for (const star of starsRef.current) {
        // Gentle twinkle effect for purple background
        const alpha = 0.4 + 0.4 * Math.sin(Date.now() * 0.001 * star.twinkle + star.x);
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 6; // Softer glow
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Gentle horizontal drift
        star.x += star.speed;
        if (star.x > rect.width + 5) star.x = -5;
      }
      
      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (canvasRef.current && container.contains(canvasRef.current)) {
        container.removeChild(canvasRef.current);
      }
    };
  }, [containerRef]);

  return canvasRef;
};