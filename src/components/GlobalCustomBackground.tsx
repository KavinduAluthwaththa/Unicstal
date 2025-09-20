'use client';

import React from 'react';

const GlobalCustomBackground: React.FC = () => {
  return (
    <>
      {/* Purple angled background - positioned behind section 2 */}
      <div style={{
        position: 'absolute',
        top: '100vh',
        left: '-10%',
        width: '120%',
        height: '800px',
        background: 'linear-gradient(135deg, #5d34af 0%, #4d11b6 100%)',
        transform: 'skew(20deg) rotate(21deg)',
        WebkitTransform: 'skew(20deg) rotate(21deg)',
        MozTransform: 'skew(20deg) rotate(21deg)',
        zIndex: -1,
        pointerEvents: 'none',
        boxShadow: '0 20px 50px rgba(93, 52, 175, 0.3)'
      }}></div>
      
      {/* Original backgrounds */}
      <div className="global-custom-bg">      </div>
    </>
  );
};

export default GlobalCustomBackground;