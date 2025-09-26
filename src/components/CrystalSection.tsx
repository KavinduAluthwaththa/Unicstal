'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Crystal } from '@/types/crystal';
import { useReactiveCrystalData } from '@/hooks/useReactiveData';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useCrystalAnimations } from '@/hooks/useCrystalAnimations';

const CrystalCard = ({ crystal, onAddToCart }: { crystal: Crystal; onAddToCart: (crystal: Crystal) => void }) => {
  return (
    <Link 
      href={`/crystals/${crystal.slug || crystal.name.toLowerCase().replace(/\s+/g, '-')}`} 
      className="crystal-card-link"
      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
    >
      <div 
        className="crystal-component"
        style={{ 
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02) translateY(-8px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
        }}
      >
        <div className="crystal-image" style={{ backgroundImage: `url(${crystal.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        
        <h3 className="crystal-name">{crystal.name}</h3>
        <p className="crystal-type">{crystal.type}</p>
        <p className="crystal-price">${crystal.price}</p>
      </div>
    </Link>
  );
};

const CrystalSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { firstRowRef, secondRowRef } = useAutoScroll(isMobile);
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

  return (
    <section className="section third" id="section-three">
      <div className="section--third--container" ref={containerRef}>
        <h2 ref={titleRef}>
          YOUR <span className="crystal-gradient-journey">JOURNEY,</span> YOUR <span className="crystal-gradient-stones">STONES.</span>
        </h2>
        
        <div className={`crystal-showcase ${isMobile ? 'mobile-swipe' : ''}`} ref={showcaseRef}>
          {/* Right fade for mobile horizontal scroll */}
          {isMobile && <div className="crystal-showcase__right-fade" />}
          <div className={`crystal-carousel ${isMobile ? 'mobile-swipe' : ''}`}>
            <div className={`crystal-row ${isMobile ? 'mobile-row' : 'auto-scroll-row'}`} ref={firstRowRef}>
              {firstRow.map((crystal) => (
                <CrystalCard 
                  key={crystal.id} 
                  crystal={crystal} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            <div className={`crystal-row ${isMobile ? 'mobile-row' : 'auto-scroll-row'}`} ref={secondRowRef}>
              {secondRow.map((crystal) => (
                <CrystalCard 
                  key={crystal.id} 
                  crystal={crystal} 
                  onAddToCart={handleAddToCart}
                />
              ))}
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