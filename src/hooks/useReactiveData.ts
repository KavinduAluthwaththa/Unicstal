'use client';

import { useState, useEffect } from 'react';
import { Crystal, crystalData } from '@/data/crystals';
import { BlogPost, blogData } from '@/data/blog';

// Custom hook for reactive crystal data
export const useReactiveCrystalData = () => {
  const [crystals, setCrystals] = useState<Crystal[]>([]);

  const loadCrystalData = () => {
    if (typeof window === 'undefined') return crystalData;
    
    // Get saved data and deleted items list
    const saved = localStorage.getItem('crystalData');
    const deletedIds = JSON.parse(localStorage.getItem('deletedCrystals') || '[]');
    
    let currentData: Crystal[];
    
    if (saved) {
      currentData = JSON.parse(saved);
    } else {
      // Start with original data but filter out any previously deleted items
      currentData = crystalData.filter(item => !deletedIds.includes(item.id));
      localStorage.setItem('crystalData', JSON.stringify(currentData));
    }
    
    // Always filter out deleted items (in case they were re-added somehow)
    return currentData.filter(item => !deletedIds.includes(item.id));
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
      console.log('🔄 Crystal data custom update received, reloading...');
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
    
    // Get saved data and deleted items list
    const saved = localStorage.getItem('blogData');
    const deletedIds = JSON.parse(localStorage.getItem('deletedBlogs') || '[]');
    
    let currentData: BlogPost[];
    
    if (saved) {
      currentData = JSON.parse(saved);
    } else {
      // Start with original data but filter out any previously deleted items
      currentData = blogData.filter(item => !deletedIds.includes(item.id));
      localStorage.setItem('blogData', JSON.stringify(currentData));
    }
    
    // Always filter out deleted items (in case they were re-added somehow)
    return currentData.filter(item => !deletedIds.includes(item.id));
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
      console.log('🔄 Blog data custom update received, reloading...');
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
    console.log('🔔 Crystal data update notification dispatched');
    window.dispatchEvent(new CustomEvent('crystalDataUpdated'));
  }
};

export const notifyBlogDataUpdate = () => {
  if (typeof window !== 'undefined') {
    console.log('🔔 Blog data update notification dispatched');
    window.dispatchEvent(new CustomEvent('blogDataUpdated'));
  }
};

// Permanent deletion functions
export const permanentlyDeleteCrystal = (id: string) => {
  if (typeof window === 'undefined') return;
  
  const deletedIds = JSON.parse(localStorage.getItem('deletedCrystals') || '[]');
  if (!deletedIds.includes(id)) {
    deletedIds.push(id);
    localStorage.setItem('deletedCrystals', JSON.stringify(deletedIds));
    console.log(`💀 Crystal ${id} permanently deleted`);
  }
};

export const permanentlyDeleteBlog = (id: string) => {
  if (typeof window === 'undefined') return;
  
  const deletedIds = JSON.parse(localStorage.getItem('deletedBlogs') || '[]');
  if (!deletedIds.includes(id)) {
    deletedIds.push(id);
    localStorage.setItem('deletedBlogs', JSON.stringify(deletedIds));
    console.log(`💀 Blog ${id} permanently deleted`);
  }
};

// Reset functions to clear deletion history
export const resetCrystalDeletions = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('deletedCrystals');
  localStorage.removeItem('crystalData');
  console.log('🔄 Crystal deletion history reset');
};

export const resetBlogDeletions = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('deletedBlogs');
  localStorage.removeItem('blogData');
  console.log('🔄 Blog deletion history reset');
};