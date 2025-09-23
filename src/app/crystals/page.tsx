'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useReactiveCrystalData } from '@/hooks/useReactiveData';
import { Crystal } from '@/data/crystals';
import Navbar from '@/components/Navbar';
import { useStarBackground } from '@/hooks/useStarBackground';

const CrystalsPage = () => {
  const crystals = useReactiveCrystalData();
  const [manualRefresh, setManualRefresh] = React.useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Initialize star background
  useStarBackground(headerRef);

  console.log('🔍 CrystalsPage: Current crystals data:', crystals);
  console.log('🔍 CrystalsPage: Number of crystals:', crystals.length);

  // Function to manually check localStorage and log data
  const checkLocalStorage = () => {
    const saved = localStorage.getItem('crystalData');
    console.log('🔍 Manual localStorage check:', saved ? JSON.parse(saved).length + ' items' : 'no data');
    setManualRefresh(prev => prev + 1);
  };

  return (
    <div className="crystals-page">
      <Navbar />
      <div ref={headerRef} className="crystals-header">
        <canvas className="crystals-header-star-bg" />
        <div className="crystals-header-content">
          <h1>Our Crystal Collection</h1>
          <p>Discover the healing power and beauty of our carefully curated crystal collection.</p>
        </div>
      </div>

      <div className="crystals-container">
        <div className="crystals-grid">
          {crystals.map((crystal: Crystal) => {
            const crystalUrl = `/crystals/${crystal.slug}`;
            console.log('🔗 Crystal Link:', crystal.name, '→', crystalUrl);
            return (
            <Link 
              href={crystalUrl} 
              key={crystal.id}
              className="crystal-card-link"
            >
              <article className="crystal-card">
                <div className="crystal-card-image">
                  <Image
                    src={crystal.image}
                    alt={crystal.name}
                    width={300}
                    height={300}
                    className="crystal-image"
                  />
                  <div className="crystal-card-type">
                    {crystal.type}
                  </div>
                  <button className="crystal-add-to-cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="m1 1 4 4 4.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L17 8H7.68"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="crystal-card-content">
                  <h2 className="crystal-card-name">{crystal.name}</h2>
                  <p className="crystal-card-description">{crystal.description}</p>
                  <div className="crystal-card-price">${crystal.price}</div>
                  
                  {crystal.properties && (
                    <div className="crystal-card-properties">
                      {crystal.properties.slice(0, 3).map((property: string) => (
                        <span key={property} className="crystal-property">
                          {property}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CrystalsPage;