'use client';

import React from 'react';
import { useLoading } from '@/context/LoadingContext';

const LoadingBar: React.FC = () => {
  const { isLoading, stagedProgress } = useLoading();
  const [slideDown, setSlideDown] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    if (stagedProgress === 100 && isLoading) {
      const timer = setTimeout(() => setSlideDown(true), 200);
      return () => clearTimeout(timer);
    }
  }, [stagedProgress, isLoading]);

  React.useEffect(() => {
    if (slideDown) {
      const timer = setTimeout(() => {
        setSlideDown(false);
        setFinished(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [slideDown]);

  React.useEffect(() => {
    if (isLoading) setFinished(false);
  }, [isLoading]);

  if ((!isLoading && !slideDown) || finished) return null;

  return (
    <div className={`loading-overlay${slideDown ? ' slide-down' : ''}`}>
      <div className="loading-container">
        <div className="loading-bar-container">
          <div className="loading-bar-fill" style={{ width: `${stagedProgress}%` }} />
        </div>
        <div className="loading-text">Loading... {Math.round(stagedProgress)}%</div>
      </div>
    </div>
  );
};

export default LoadingBar;