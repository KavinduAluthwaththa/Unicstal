'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import type { Crystal } from '@/types/crystal';
import { useReactiveCrystalData } from '@/hooks/useReactiveData';
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

  // Refs for both rows
  const firstRowRef = React.useRef<HTMLDivElement>(null);
  const secondRowRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll both rows in opposite directions
  useEffect(() => {
    // Ensure parent containers have overflow hidden
    const setOverflowHidden = (rowRef: React.RefObject<HTMLDivElement | null>) => {
      if (rowRef.current && rowRef.current.parentElement) {
        rowRef.current.parentElement.style.overflow = 'hidden';
      }
    };

    const animateRow = (rowRef: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right', rowName = '') => {
      if (!rowRef.current) return;
      const row = rowRef.current;
      setOverflowHidden(rowRef);
      // Cleanup previous animation and clones
      gsap.killTweensOf(row);
      gsap.set(row, { x: 0 });
      row.style.animation = 'none';
      row.style.transform = '';
      row.querySelectorAll('.crystal-component.clone').forEach(clone => clone.remove());
      // Wait for cards to render
      setTimeout(() => {
        // Reliably select only original cards
        const cards = row.querySelectorAll('.crystal-component:not(.clone)');
        if (cards.length < 2) {
          // eslint-disable-next-line no-console
          console.warn(`Not enough cards to scroll for ${rowName}`);
          return;
        }
        // Clone enough cards to cover visible area
        const cardWidth = (cards[0] as HTMLElement)?.offsetWidth || 200;
        const parentWidth = row.parentElement?.offsetWidth || (cardWidth * cards.length);
        const visibleCount = Math.ceil(parentWidth / cardWidth);
        let cloneWidth = 0;
        if (rowName === 'bottom row') {
          // Prepend clones to the left for infinite rightward scroll
          for (let i = visibleCount - 1; i >= 0; i--) {
            const clone = (cards[i % cards.length] as HTMLElement).cloneNode(true) as HTMLElement;
            clone.classList.add('clone');
            row.insertBefore(clone, row.firstChild);
            cloneWidth += cardWidth;
          }
        } else {
          // Default: append clones to the right
          for (let i = 0; i < visibleCount; i++) {
            const clone = (cards[i % cards.length] as HTMLElement).cloneNode(true) as HTMLElement;
            clone.classList.add('clone');
            row.appendChild(clone);
          }
        }
        // Calculate total width
        const totalCards = cards.length + visibleCount;
        const totalWidth = cardWidth * totalCards;
        row.style.minWidth = `${totalWidth}px`;
        // Animate x for infinite loop
        if (rowName === 'bottom row') {
          // Start at negative offset so clones are visible on the left
          gsap.set(row, { x: -cloneWidth });
          gsap.to(row, {
            x: totalWidth - cloneWidth,
            duration: totalCards * 2,
            ease: 'none',
            repeat: -1,
            onRepeat: () => {
              gsap.set(row, { x: -cloneWidth });
              // eslint-disable-next-line no-console
              console.log(`Looped ${rowName}`);
            }
          });
        } else {
          gsap.to(row, {
            x: -totalWidth,
            duration: totalCards * 2,
            ease: 'none',
            repeat: -1,
            onRepeat: () => {
              gsap.set(row, { x: 0 });
              // eslint-disable-next-line no-console
              console.log(`Looped ${rowName}`);
            }
          });
        }
      }, 100);
      // Cleanup on unmount
      return () => {
        gsap.killTweensOf(row);
        gsap.set(row, { x: 0, xPercent: 0 });
        row.style.animation = '';
        row.style.transform = '';
        row.querySelectorAll('.crystal-component.clone').forEach(clone => clone.remove());
      };
    };
    // Animate both rows
  const cleanup1 = animateRow(firstRowRef, 'left', 'top row');
  const cleanup2 = animateRow(secondRowRef, 'right', 'bottom row');
    return () => {
      cleanup1 && cleanup1();
      cleanup2 && cleanup2();
    };
  }, [crystals, isMobile]);

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
            <div className={`crystal-row ${isMobile ? 'mobile-row' : ''}`} ref={firstRowRef} style={{ width: 'max-content' }}>
              {firstRow.map((crystal) => (
                <CrystalCard 
                  key={crystal.id} 
                  crystal={crystal} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            <div className={`crystal-row ${isMobile ? 'mobile-row' : ''}`} ref={secondRowRef} style={{ width: 'max-content' }}>
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