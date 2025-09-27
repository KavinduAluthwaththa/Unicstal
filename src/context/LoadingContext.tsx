"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';



interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
  stagedProgress: number;
  setStagedProgress: (progress: number) => void;
  loadingStart: () => void;
  stagedDone: boolean;
  setStagedDone: (done: boolean) => void;
  modelDone: boolean;
  setModelDone: (done: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);




export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stagedProgress, setStagedProgress] = useState(0);
  const [stagedDone, setStagedDone] = useState(false);
  const [modelDone, setModelDone] = useState(false);

  // Start staged loading animation
  const loadingStart = () => {
    setIsLoading(true);
    setProgress(0);
    setStagedProgress(0);
    setStagedDone(false);
    setModelDone(false);
  const start = Date.now();
    let timer: NodeJS.Timeout;
    const animate = () => {
      const elapsed = (Date.now() - start) / 1000;
      if (elapsed < 5) {
        setStagedProgress(Math.min(73, (elapsed / 5) * 73));
        timer = setTimeout(animate, 16);
      } else {
        setStagedProgress(73);
        setStagedDone(true);
      }
    };
    animate();
    return () => clearTimeout(timer);
  };

  // Hide overlay only when both staged and model are done
  React.useEffect(() => {
    if (stagedDone && modelDone && stagedProgress < 100) {
      let cancelled = false;
  const start = stagedProgress;
  const startTime = Date.now();
      const animate = () => {
        if (cancelled) return;
        const elapsed = (Date.now() - startTime) / 1000;
        const next = Math.min(100, start + (elapsed / 1) * (100 - start));
        setStagedProgress(next);
        if (next < 100) {
          setTimeout(animate, 16);
        } else {
          setIsLoading(false);
        }
      };
      animate();
      return () => { cancelled = true; };
    }
  }, [stagedDone, modelDone]);

  return (
    <LoadingContext.Provider value={{
      isLoading,
      setIsLoading,
      progress,
      setProgress,
      stagedProgress,
      setStagedProgress,
      loadingStart,
      stagedDone,
      setStagedDone,
      modelDone,
      setModelDone,
    }}>
      {children}
    </LoadingContext.Provider>
  );

  return (
    <LoadingContext.Provider value={{
      isLoading,
      setIsLoading,
      progress,
      setProgress,
      stagedProgress,
      setStagedProgress,
      loadingStart,
      stagedDone,
      setStagedDone,
      modelDone,
      setModelDone,
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
