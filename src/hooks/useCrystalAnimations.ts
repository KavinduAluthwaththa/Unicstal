'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useCrystalAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (typeof window === 'undefined' || !containerRef.current) return;

      const container = containerRef.current;
      const title = titleRef.current;
      const paragraph = paragraphRef.current;
      const button = buttonRef.current;
      const showcase = showcaseRef.current;

      // Initial states - set elements to invisible and positioned from left
      if (title && paragraph && button) {
        gsap.set([title, paragraph, button], {
          x: -100,
          opacity: 0
        });
      }
      if (showcase) {
        gsap.set(showcase, {
          x: -80,
          opacity: 0
        });
      }

      // Create timeline for entrance animations when section comes into view
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      });

      if (title) {
        entranceTl.to(title, {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out"
        });
      }
      if (paragraph) {
        entranceTl.to(paragraph, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }, "-=0.8");
      }
      if (button) {
        entranceTl.to(button, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6");
      }
      if (showcase) {
        entranceTl.to(showcase, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }, "-=0.4");
      }

      // Scroll-based exit animation (slide to the LEFT - opposite of manifest)
      if (container) {
        gsap.to(container, {
          xPercent: -150, // Negative value for left slide
          opacity: 0,
          scrollTrigger: {
            trigger: "#section-four", // Target section 4 as trigger
            start: "top bottom",
            end: "top 80%",
            scrub: 1,
            immediateRender: false
          }
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, []);

  return {
    containerRef,
    titleRef,
    paragraphRef,
    buttonRef,
    showcaseRef
  };
};