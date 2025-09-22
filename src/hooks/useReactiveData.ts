'use client';

import { useState, useEffect } from 'react';
import { Crystal, crystalData } from '@/data/crystals';
import { BlogPost, blogData } from '@/data/blog';

// Custom hook for reactive crystal data
export const useReactiveCrystalData = () => {
  const [crystals, setCrystals] = useState<Crystal[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const loadCrystalData = () => {
    if (typeof window === 'undefined') return crystalData;
    
    // Get saved data and deleted items list
    const saved = localStorage.getItem('crystalData');
    const deletedIds = JSON.parse(localStorage.getItem('deletedCrystals') || '[]');
    
    console.log('📦 loadCrystalData: localStorage saved data:', saved ? 'exists' : 'not found');
    console.log('🗑️ loadCrystalData: deleted IDs:', deletedIds);
    
    let currentData: Crystal[];
    
    if (saved) {
      currentData = JSON.parse(saved);
      console.log('📄 loadCrystalData: parsed saved data count:', currentData.length);
    } else {
      // Start with original data but filter out any previously deleted items
      currentData = crystalData.filter(item => !deletedIds.includes(item.id));
      localStorage.setItem('crystalData', JSON.stringify(currentData));
      console.log('🆕 loadCrystalData: initialized with original data, count:', currentData.length);
    }
    
    // Always filter out deleted items (in case they were re-added somehow)
    const finalData = currentData.filter(item => !deletedIds.includes(item.id));
    console.log('✅ loadCrystalData: final data count:', finalData.length);
    return finalData;
  };

  const updateCrystals = () => {
    const data = loadCrystalData();
    console.log('🔄 useReactiveCrystalData: Loading crystal data:', data.length, 'crystals');
    console.log('🔍 Crystal data items:', data.map(c => ({id: c.id, name: c.name, slug: c.slug})));
    setCrystals(data);
    setIsInitialized(true);
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
      setRefreshTrigger(prev => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('crystalDataUpdated', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('crystalDataUpdated', handleCustomUpdate);
    };
  }, []);

  // Effect to handle refresh triggers
  useEffect(() => {
    if (refreshTrigger > 0) {
      console.log('🔄 Refresh trigger activated, updating crystals...');
      updateCrystals();
    }
  }, [refreshTrigger]);

  return crystals;
};

// Custom hook for reactive blog data
export const useReactiveBlogData = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const loadBlogData = () => {
    if (typeof window === 'undefined') return blogData;
    
    // Get saved data and deleted items list
    const saved = localStorage.getItem('blogData');
    const deletedIds = JSON.parse(localStorage.getItem('deletedBlogs') || '[]');
    
    console.log('📦 loadBlogData: localStorage saved data:', saved ? 'exists' : 'not found');
    console.log('🗑️ loadBlogData: deleted IDs:', deletedIds);
    
    let currentData: BlogPost[];
    
    if (saved) {
      currentData = JSON.parse(saved);
      console.log('📄 loadBlogData: parsed saved data count:', currentData.length);
    } else {
      // Start with original data but filter out any previously deleted items
      currentData = blogData.filter(item => !deletedIds.includes(item.id));
      localStorage.setItem('blogData', JSON.stringify(currentData));
      console.log('🆕 loadBlogData: initialized with original data, count:', currentData.length);
    }
    
    // Always filter out deleted items (in case they were re-added somehow)
    const finalData = currentData.filter(item => !deletedIds.includes(item.id));
    console.log('✅ loadBlogData: final data count:', finalData.length);
    return finalData;
  };

  const updateBlogs = () => {
    const data = loadBlogData();
    console.log('🔄 useReactiveBlogData: Loading blog data:', data.length, 'blogs');
    console.log('🔍 Blog data items:', data.map(b => ({id: b.id, title: b.title, slug: b.slug})));
    setBlogs(data);
    setIsInitialized(true);
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
      setRefreshTrigger(prev => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('blogDataUpdated', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('blogDataUpdated', handleCustomUpdate);
    };
  }, []);

  // Effect to handle refresh triggers
  useEffect(() => {
    if (refreshTrigger > 0) {
      console.log('🔄 Refresh trigger activated, updating blogs...');
      updateBlogs();
    }
  }, [refreshTrigger]);

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