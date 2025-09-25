'use client';

import React, { useState, useEffect } from 'react';

const LoadingBar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setIsLoading(false);
          return 100;
        }
        // Simulate realistic loading with varying speeds
        const increment = Math.random() * 15 + 5; // Random between 5-20
        return Math.min(prevProgress + increment, 100);
      });
    }, 150);

    // Cleanup timer
    return () => clearInterval(timer);
  }, []);

  // Hide component after loading completes with a small delay
  useEffect(() => {
    if (progress === 100) {
      const hideTimer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(hideTimer);
    }
  }, [progress]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-bar-container">
          <div 
            className="loading-bar-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-text">
          Loading... {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;