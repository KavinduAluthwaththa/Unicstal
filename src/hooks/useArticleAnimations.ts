'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useArticleAnimations = (
  sectionRef: React.RefObject<HTMLElement | null>,
  titleRef?: React.RefObject<HTMLHeadingElement | null>,
  paragraphRef?: React.RefObject<HTMLParagraphElement | null>,
  showcaseRef?: React.RefObject<HTMLDivElement | null>,
  buttonRef?: React.RefObject<HTMLButtonElement | null>
) => {
  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    
    // Find elements using the actual class names in the component
    const title = titleRef?.current || section.querySelector('h2');
    const paragraph = paragraphRef?.current || section.querySelector('p');
    const categoryFilter = section.querySelector('.category-filter');
    const showcase = showcaseRef?.current || section.querySelector('.article-showcase');
    const button = buttonRef?.current || section.querySelector('.button--hero');

    // Only animate elements that exist
    const elementsToAnimate = [title, paragraph, categoryFilter, showcase, button].filter(Boolean);

    if (elementsToAnimate.length === 0) return;

    // Set initial states
    gsap.set(elementsToAnimate, {
      x: 100,
      opacity: 0
    });

    // Create timeline for slide-in animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate elements sliding in from left with stagger
    elementsToAnimate.forEach((element, index) => {
      if (element) {
        tl.to(element, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }, index === 0 ? 0 : "-=0.4");
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [sectionRef, titleRef, paragraphRef, showcaseRef, buttonRef]);
};