'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useAutoScroll = () => {
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !firstRowRef.current || !secondRowRef.current) return;

    const firstRow = firstRowRef.current;
    const secondRow = secondRowRef.current;

    // Wait for content to be rendered
    setTimeout(() => {
      // Clone the crystal cards for seamless infinite loop
      const firstRowCards = Array.from(firstRow.querySelectorAll('.crystal-component'));
      const secondRowCards = Array.from(secondRow.querySelectorAll('.crystal-component'));

      if (firstRowCards.length === 0 || secondRowCards.length === 0) return;

      // Clone cards multiple times for smoother infinite scroll
      for (let i = 0; i < 3; i++) {
        firstRowCards.forEach(card => {
          const clone = card.cloneNode(true) as HTMLElement;
          firstRow.appendChild(clone);
        });

        secondRowCards.forEach(card => {
          const clone = card.cloneNode(true) as HTMLElement;
          secondRow.appendChild(clone);
        });
      }

      // Calculate the width of one set of cards
      const cardWidth = 280 + 20; // card width + gap
      const firstRowWidth = cardWidth * firstRowCards.length;
      const secondRowWidth = cardWidth * secondRowCards.length;

      // Auto-scroll first row to the LEFT (negative direction)
      const firstRowAnimation = gsap.fromTo(firstRow, 
        { x: 0 },
        {
          x: -firstRowWidth,
          duration: 15,
          ease: "none",
          repeat: -1,
        }
      );

      // Auto-scroll second row to the RIGHT (positive direction)  
      const secondRowAnimation = gsap.fromTo(secondRow,
        { x: -secondRowWidth },
        {
          x: 0,
          duration: 18, // Different speed for variety
          ease: "none",
          repeat: -1,
        }
      );

      // Pause animations on hover for better UX
      const pauseAnimation = (animation: gsap.core.Tween) => {
        animation.pause();
      };

      const playAnimation = (animation: gsap.core.Tween) => {
        animation.play();
      };

      const firstRowMouseEnter = () => pauseAnimation(firstRowAnimation);
      const firstRowMouseLeave = () => playAnimation(firstRowAnimation);
      const secondRowMouseEnter = () => pauseAnimation(secondRowAnimation);
      const secondRowMouseLeave = () => playAnimation(secondRowAnimation);

      firstRow.addEventListener('mouseenter', firstRowMouseEnter);
      firstRow.addEventListener('mouseleave', firstRowMouseLeave);
      secondRow.addEventListener('mouseenter', secondRowMouseEnter);
      secondRow.addEventListener('mouseleave', secondRowMouseLeave);

      return () => {
        firstRowAnimation.kill();
        secondRowAnimation.kill();
        firstRow.removeEventListener('mouseenter', firstRowMouseEnter);
        firstRow.removeEventListener('mouseleave', firstRowMouseLeave);
        secondRow.removeEventListener('mouseenter', secondRowMouseEnter);
        secondRow.removeEventListener('mouseleave', secondRowMouseLeave);
      };
    }, 100);
  }, []);

  return {
    firstRowRef,
    secondRowRef
  };
};