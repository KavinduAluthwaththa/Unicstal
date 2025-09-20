'use client';

import React from 'react';
import { useHeroAnimations } from '@/hooks/useHeroAnimations';

const HeroSection = () => {
  const { containerRef, titleRef, paragraphRef, buttonRef } = useHeroAnimations();

  return (
    <section className="section first" id="section-one">
      <div className="section--one--container" ref={containerRef}>
        <h1 
          ref={titleRef}
          className="first"
        >
          Manifest Your Dreams with the Power of <span className="highlight-text">Crystals</span>
        </h1>
        
        <p ref={paragraphRef}>
          Align your energy, raise your vibration, and attract abundance — One Crystal at a time.
        </p>
        
        <button 
          ref={buttonRef}
          className="button--hero"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
        >
          Crystals That Help You Attract
        </button>
      </div>
    </section>
  );
};

export default HeroSection;