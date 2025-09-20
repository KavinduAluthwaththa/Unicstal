'use client';

import { useEffect, useRef } from 'react';
import { useThreeScene } from '@/hooks/useThreeScene';

const ThreeBackground = () => {
  const { mountRef, isLoaded } = useThreeScene();

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0"
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
};

export default ThreeBackground;