'use client';

import { useEffect, useRef } from 'react';

export const useScrollSlideIn = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state - hidden and translated down
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Slide in when element comes into view
            const target = entry.target as HTMLElement;
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '-50px 0px', // Start animation 50px before element enters viewport
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return elementRef;
};