'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useHeroAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const container = containerRef.current;
    const title = titleRef.current;
    const paragraph = paragraphRef.current;
    const button = buttonRef.current;

    // Initial states - set elements to invisible and positioned from left
    gsap.set([title, paragraph, button], {
      x: -100,
      opacity: 0
    });

    // Create timeline for entrance animations when section comes into view
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse"
      }
    });

    entranceTl
      .to(title, {
        x: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out"
      })
      .to(paragraph, {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out"
      }, "-=0.7") // Start 0.7s before previous animation ends
      .to(button, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6"); // Start 0.6s before previous animation ends

    // Scroll-based exit animation (based on old project pattern)
    gsap.to(container, {
      xPercent: -150,
      opacity: 0,
      scrollTrigger: {
        trigger: "#section-two", // Target section 2 as in old project
        start: "top bottom",
        end: "top 80%",
        scrub: 1,
        immediateRender: false
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return {
    containerRef,
    titleRef,
    paragraphRef,
    buttonRef
  };
};