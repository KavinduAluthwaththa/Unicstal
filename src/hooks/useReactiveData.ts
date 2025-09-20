'use client';

import { useState, useEffect } from 'react';
import { Crystal, crystalData } from '@/data/crystals';
import { BlogPost, blogData } from '@/data/blog';

// Custom hook for reactive crystal data
export const useReactiveCrystalData = () => {
  const [crystals, setCrystals] = useState<Crystal[]>([]);

  const loadCrystalData = () => {
    if (typeof window === 'undefined') return crystalData;
    const saved = localStorage.getItem('crystalData');
    return saved ? JSON.parse(saved) : crystalData;
  };

  const updateCrystals = () => {
    setCrystals(loadCrystalData());
  };

  useEffect(() => {
    // Initial load
    updateCrystals();

    // Listen for storage changes from admin panel
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'crystalData') {
        updateCrystals();
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleCustomUpdate = () => {
      updateCrystals();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('crystalDataUpdated', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('crystalDataUpdated', handleCustomUpdate);
    };
  }, []);

  return crystals;
};

// Custom hook for reactive blog data
export const useReactiveBlogData = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  const loadBlogData = () => {
    if (typeof window === 'undefined') return blogData;
    const saved = localStorage.getItem('blogData');
    return saved ? JSON.parse(saved) : blogData;
  };

  const updateBlogs = () => {
    setBlogs(loadBlogData());
  };

  useEffect(() => {
    // Initial load
    updateBlogs();

    // Listen for storage changes from admin panel
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'blogData') {
        updateBlogs();
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleCustomUpdate = () => {
      updateBlogs();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('blogDataUpdated', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('blogDataUpdated', handleCustomUpdate);
    };
  }, []);

  return blogs;
};

// Helper functions to trigger updates
export const notifyCrystalDataUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('crystalDataUpdated'));
  }
};

export const notifyBlogDataUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('blogDataUpdated'));
  }
};