'use client';

import React from 'react';
import Link from 'next/link';
import { useManifestAnimations } from '@/hooks/useManifestAnimations';

const ManifestSection = () => {
  const { containerRef, titleRef, paragraphRef, buttonRef } = useManifestAnimations();

  return (
    <section className="section second" id="section-two">
      <div 
        className="section--two--container"
        ref={containerRef}
      >
        <h2 
          ref={titleRef}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.textShadow = '0 0 20px rgba(255,255,255,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.textShadow = 'none';
          }}
        >
          What do you want to Manifest?
        </h2>
        
        <p 
          ref={paragraphRef}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          "Your thoughts are powerful. Set your intention, align your energy, and call in the life you desire — one crystal at a time."
        </p>
        
        <Link href='/blogs'>
          <button 
            ref={buttonRef}
            className="button--hero"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
          >
            Learn More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ManifestSection;