'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Crystal } from '@/data/crystals';
import { useReactiveCrystalData } from '@/hooks/useReactiveData';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useCrystalAnimations } from '@/hooks/useCrystalAnimations';

const CrystalCard = ({ crystal, onAddToCart }: { crystal: Crystal; onAddToCart: (crystal: Crystal) => void }) => {
  return (
    <div 
      className="crystal-component"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02) translateY(-8px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
      }}
    >
      <div className="crystal-image" style={{ backgroundImage: `url(${crystal.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <button 
          onClick={() => onAddToCart(crystal)}
          className="add-to-cart-btn"
          title="Add to Cart"
        >
          +
        </button>
      </div>
      
      <h3 className="crystal-name">{crystal.name}</h3>
      <p className="crystal-type">{crystal.type}</p>
      <p className="crystal-price">${crystal.price}</p>
    </div>
  );
};

const CrystalSection = () => {
  const { firstRowRef, secondRowRef } = useAutoScroll();
  const { containerRef, titleRef, paragraphRef, buttonRef, showcaseRef } = useCrystalAnimations();
  const [cartItems, setCartItems] = useState<Crystal[]>([]);
  const crystals = useReactiveCrystalData(); // Use reactive hook instead of state
  
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
        
        <div className="crystal-showcase" ref={showcaseRef}>
          <div className="crystal-carousel">
            <div className="crystal-row auto-scroll-row" ref={firstRowRef}>
              {firstRow.map((crystal) => (
                <CrystalCard 
                  key={crystal.id} 
                  crystal={crystal} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            <div className="crystal-row auto-scroll-row" ref={secondRowRef}>
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
      </div>
    </section>
  );
};

export default CrystalSection;