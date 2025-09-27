'use client';

import React, { useEffect } from 'react';
import { crystalData } from '@/data/crystals';
import type { Crystal } from '@/types/crystal';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useReactiveCrystalData } from '@/hooks/useReactiveData';
import Navbar from '@/components/Navbar';

interface CrystalPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CrystalPage = ({ params }: CrystalPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { slug } = React.use(params);
  const crystals = useReactiveCrystalData();
  const [isLoading, setIsLoading] = React.useState(true);
  
  console.log('🔍 Crystal Page - Looking for slug:', slug);
  console.log('🔍 Available crystals:', crystals.map(c => ({ id: c.id, name: c.name, slug: c.slug })));
  console.log('🔍 Crystals length:', crystals.length);
  
  // Check if crystals are still loading
  React.useEffect(() => {
    if (crystals.length > 0) {
      setIsLoading(false);
    } else {
      // Give some time for localStorage to load
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [crystals]);
  
  let crystal: Crystal | undefined = undefined;

  // Wait for crystals to load before searching
  if (isLoading) {
    return (
      <div className="crystal-detail-page">
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <svg className="loading-spinner" width="160" height="160" viewBox="0 0 100 100">
            <circle className="path" cx="50" cy="50" r="40" fill="none" strokeWidth="12" />
          </svg>
        </div>
      </div>
    );
  }

  if (crystals.length > 0) {
    crystal = crystals.find(c => c.slug === slug);
  }
  // Fallback: if no crystal found in reactive data, check original data
  if (!crystal) {
    crystal = crystalData.find((c: Crystal) => c.slug === slug);
    console.log('🔄 Using fallback original data, found:', crystal ? crystal.name : 'NOT FOUND');
  }
  console.log('🔍 Found crystal:', crystal ? crystal.name : 'NOT FOUND');

  if (!crystal) {
    notFound();
  }

  return (
    <div className="crystal-detail-page">
      <Navbar />
      
      <div className="crystal-detail-container">
        <div className="crystal-detail-content">
          <div className="crystal-detail-image-section">
            <Image
              src={crystal.image}
              alt={crystal.name}
              width={500}
              height={500}
              className="crystal-detail-image"
            />
          </div>
          
          <div className="crystal-detail-info">
            <div className="crystal-detail-header">
              <span className="crystal-detail-type">{crystal.type}</span>
              <h1 className="crystal-detail-name">{crystal.name}</h1>
              <div className="crystal-detail-price">${crystal.price}</div>
            </div>
            
            <div className="crystal-detail-description">
              <h3>About This Crystal</h3>
              <p>{crystal.full_description || crystal.description}</p>
            </div>
            
            {crystal.properties && (
              <div className="crystal-detail-properties">
                <h3>Healing Properties</h3>
                <div className="crystal-properties-grid">
                  {crystal.properties.map((property: string) => (
                    <span key={property} className="crystal-detail-property">
                      {property}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {crystal.chakras && (
              <div className="crystal-detail-chakras">
                <h3>Associated Chakras</h3>
                <div className="crystal-chakras-list">
                  {crystal.chakras.map((chakra: string) => (
                    <span key={chakra} className="crystal-chakra">
                      {chakra}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="crystal-detail-specs">
              <h3>Specifications</h3>
              <div className="crystal-specs-grid">
                {crystal.origin && (
                  <div className="crystal-spec">
                    <strong>Origin:</strong> {crystal.origin}
                  </div>
                )}
                {crystal.hardness && (
                  <div className="crystal-spec">
                    <strong>Hardness:</strong> {crystal.hardness}
                  </div>
                )}
                {crystal.size && (
                  <div className="crystal-spec">
                    <strong>Size:</strong> {crystal.size}
                  </div>
                )}
                {crystal.weight && (
                  <div className="crystal-spec">
                    <strong>Weight:</strong> {crystal.weight}
                  </div>
                )}
              </div>
            </div>
            
            <div className="crystal-detail-actions">
              <button className="crystal-add-to-cart-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="m1 1 4 4 4.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L17 8H7.68"></path>
                </svg>
                Add to Cart
              </button>
              <button className="crystal-favorite-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="crystal-detail-navigation">
        <Link href="/crystals" className="back-to-crystals-btn">
          ← Back to All Crystals
        </Link>
      </div>
    </div>
  );
};

export default CrystalPage;