'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useScrollAnimations = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Hero section animations
    const heroTl = gsap.timeline();
    heroTl.from('.hero-title', { duration: 1, y: 100, opacity: 0, ease: "power2.out" })
          .from('.hero-subtitle', { duration: 1, y: 50, opacity: 0, ease: "power2.out" }, "-=0.5")
          .from('.hero-button', { duration: 1, y: 30, opacity: 0, ease: "power2.out" }, "-=0.5");

    // Section scroll triggers
    gsap.utils.toArray('.scroll-section').forEach((section) => {
      const el = section as Element;
      gsap.fromTo(el, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Crystal cards stagger animation
    ScrollTrigger.batch('.crystal-card', {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { y: 60, opacity: 0, scale: 0.8 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            duration: 0.8, 
            stagger: 0.1,
            ease: "back.out(1.7)" 
          }
        );
      },
      onLeave: (elements) => {
        gsap.to(elements, { opacity: 0.3, duration: 0.3 });
      },
      onEnterBack: (elements) => {
        gsap.to(elements, { opacity: 1, duration: 0.3 });
      }
    });

    // Blog cards hover effects
    gsap.utils.toArray('.blog-card').forEach((card) => {
      const el = card as HTMLElement;
      const tl = gsap.timeline({ paused: true });
      
      tl.to(el, { 
        y: -10, 
        scale: 1.02, 
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        duration: 0.3,
        ease: "power2.out" 
      });

      el.addEventListener('mouseenter', () => tl.play());
      el.addEventListener('mouseleave', () => tl.reverse());
    });

    // Parallax effect for background elements
    gsap.utils.toArray('.parallax-bg').forEach((element) => {
      const el = element as HTMLElement;
      gsap.to(el, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const animateOnScroll = (selector: string, animation: Record<string, unknown>) => {
    if (typeof window === 'undefined') return;
    
    ScrollTrigger.create({
      trigger: selector,
      start: "top 80%",
      onEnter: () => gsap.to(selector, animation)
    });
  };

  return { animateOnScroll };
};