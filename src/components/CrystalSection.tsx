'use client';

import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import type { Crystal } from '@/types/crystal';
import { useReactiveCrystalData } from '@/hooks/useReactiveData';
import { useCrystalAnimations } from '@/hooks/useCrystalAnimations';

const CrystalCard = ({ crystal, onAddToCart }: { crystal: Crystal; onAddToCart: (crystal: Crystal) => void }) => {
  return (
    <div 
      className="crystal-component"
      style={{ 
        width: '220px', // fixed width for all cards
        height: '270px', // uniform height for all cards
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
        <div 
          className="crystal-image" 
          style={{ 
            backgroundImage: `url(${crystal.image})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            height: '100px',
            width: '100%',
            borderRadius: '12px'
          }}
        ></div>
        
        <h3 className="crystal-name">{crystal.name}</h3>
        <p className="crystal-type">{crystal.type}</p>
        <p className="crystal-price">${crystal.price}</p>
      </div>
  );
};

const CrystalSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  // Removed auto-scroll feature
  const { containerRef, titleRef, paragraphRef, buttonRef, showcaseRef } = useCrystalAnimations();
  const [cartItems, setCartItems] = useState<Crystal[]>([]);
  const crystals = useReactiveCrystalData(); // Use reactive hook instead of state
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const handleAddToCart = (crystal: Crystal) => {
    setCartItems(prev => [...prev, crystal]);
    console.log(`Added ${crystal.name} to cart`);
  };

  // Split crystals into two rows for display
  const firstRow = crystals.slice(0, 4);
  const secondRow = crystals.slice(4, 8);

  // No auto-scroll animation. Rows are static.

  return (
    <section className="section third" id="section-three">
      <div className="section--third--container" ref={containerRef}>
        <h2 ref={titleRef}>
          YOUR <span className="crystal-gradient-journey">JOURNEY,</span> YOUR <span className="crystal-gradient-stones">STONES.</span>
        </h2>
        
        <div className={`crystal-showcase ${isMobile ? 'mobile-swipe' : ''}`} ref={showcaseRef}>
          {/* Right fade for mobile horizontal scroll */}
          {isMobile && <div className="crystal-showcase__right-fade" />}
          <div className="crystal-carousel">
            <div style={{ width: '100%',paddingTop:'20px' }}>
              <Marquee pauseOnHover className="[--duration:10s]">
                {[...firstRow, ...firstRow].map((crystal, idx) => (
                  <div style={{ display: 'inline-block', marginRight: '2rem' }} key={crystal.id + '-clone-' + idx}>
                    <CrystalCard
                      crystal={crystal}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
              </Marquee>
            </div>
            <div style={{ width: '100%' }}>
              <Marquee direction="right" pauseOnHover className="[--duration:10s]" style={{ padding: '20px' }}>
                {[...secondRow, ...secondRow].map((crystal, idx) => (
                  <div style={{ display: 'inline-block', marginRight: '2rem' }} key={crystal.id + '-clone-' + idx}>
                    <CrystalCard
                      crystal={crystal}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>

        <Link href="/crystals">
          <button 
            ref={buttonRef}
            className="button--hero"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            VIEW ALL CRYSTALS
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CrystalSection;