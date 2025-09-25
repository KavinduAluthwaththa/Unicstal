'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useAutoScroll = (isMobile?: boolean) => {
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !firstRowRef.current || !secondRowRef.current) return;

    const firstRow = firstRowRef.current;
    const secondRow = secondRowRef.current;

    // On mobile, enable slow auto-scroll in both directions (like desktop, but slower)
    if (isMobile) {
      gsap.killTweensOf(firstRow);
      gsap.killTweensOf(secondRow);
      gsap.set(firstRow, { x: 0 });
      gsap.set(secondRow, { x: 0 });

      // Clone cards for seamless loop (same as desktop)
      setTimeout(() => {
        // Only keep the original set of cards before cloning
        const resetRow = (row: HTMLElement) => {
          const cards = Array.from(row.querySelectorAll('.crystal-component'));
          // Remove all but the first N (originals)
          const originals = cards.slice(0, 4); // assumes 4 originals per row
          while (row.children.length > originals.length) {
            row.removeChild(row.lastChild!);
          }
        };
        resetRow(firstRow);
        resetRow(secondRow);
        const firstRowCards = Array.from(firstRow.querySelectorAll('.crystal-component'));
        const secondRowCards = Array.from(secondRow.querySelectorAll('.crystal-component'));
        if (firstRowCards.length === 0 || secondRowCards.length === 0) return;
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
        const cardWidth = 280 + 20;
        const firstRowWidth = cardWidth * firstRowCards.length;
        const secondRowWidth = cardWidth * secondRowCards.length;
        // Slow auto-scroll for mobile
        const firstRowAnimation = gsap.fromTo(firstRow, 
          { x: 0 },
          {
            x: -firstRowWidth,
            duration: 20, // slower for mobile
            ease: "none",
            repeat: -1,
          }
        );
        const secondRowAnimation = gsap.fromTo(secondRow,
          { x: -secondRowWidth },
          {
            x: 0,
            duration: 20, // slower for mobile
            ease: "none",
            repeat: -1,
          }
        );
        // Pause on touch/hover for mobile
        const pauseAnimation = (animation: gsap.core.Tween) => animation.pause();
        const playAnimation = (animation: gsap.core.Tween) => animation.play();
        const firstRowEnter = () => pauseAnimation(firstRowAnimation);
        const firstRowLeave = () => playAnimation(firstRowAnimation);
        const secondRowEnter = () => pauseAnimation(secondRowAnimation);
        const secondRowLeave = () => playAnimation(secondRowAnimation);
        firstRow.addEventListener('mouseenter', firstRowEnter);
        firstRow.addEventListener('mouseleave', firstRowLeave);
        firstRow.addEventListener('touchstart', firstRowEnter);
        firstRow.addEventListener('touchend', firstRowLeave);
        secondRow.addEventListener('mouseenter', secondRowEnter);
        secondRow.addEventListener('mouseleave', secondRowLeave);
        secondRow.addEventListener('touchstart', secondRowEnter);
        secondRow.addEventListener('touchend', secondRowLeave);
        return () => {
          firstRowAnimation.kill();
          secondRowAnimation.kill();
          firstRow.removeEventListener('mouseenter', firstRowEnter);
          firstRow.removeEventListener('mouseleave', firstRowLeave);
          firstRow.removeEventListener('touchstart', firstRowEnter);
          firstRow.removeEventListener('touchend', firstRowLeave);
          secondRow.removeEventListener('mouseenter', secondRowEnter);
          secondRow.removeEventListener('mouseleave', secondRowLeave);
          secondRow.removeEventListener('touchstart', secondRowEnter);
          secondRow.removeEventListener('touchend', secondRowLeave);
        };
      }, 100);
      return;
    }

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
          duration: 20,
          ease: "none",
          repeat: -1,
        }
      );

      // Auto-scroll second row to the RIGHT (positive direction)  
      const secondRowAnimation = gsap.fromTo(secondRow,
        { x: -secondRowWidth },
        {
          x: 0,
          duration: 20, // speed
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
  }, [isMobile]);  return {
    firstRowRef,
    secondRowRef
  };
};