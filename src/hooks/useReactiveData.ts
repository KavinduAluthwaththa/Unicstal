'use client';

import { useState, useEffect } from 'react';
// Sample types
import type { Crystal } from '../types/crystal';
import { crystalData as initialCrystalData } from '../data/crystals';

import type { BlogPost } from '../types/blog';
import { blogData as initialBlogData } from '../data/blog';

// Custom hook for reactive crystal data
export const useReactiveCrystalData = () => {
  const [crystals, setCrystals] = useState<Crystal[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const loadCrystalData = async () => {
    try {
      const { supabase } = await import('../lib/supabaseClient');
      const { data, error } = await supabase.from('crystals').select('*');
      if (error) throw error;
      if (data && Array.isArray(data)) {
        console.log('📦 loadCrystalData: loaded from Supabase, count:', data.length);
        return data;
      }
    } catch (err) {
      console.error('❌ Supabase fetch failed, falling back to localStorage/static data:', err);
    }
    // Fallback to localStorage/static data
    if (typeof window === 'undefined') return [];
    const savedData = localStorage.getItem('crystalData');
    const deletedIds = JSON.parse(localStorage.getItem('deletedCrystals') || '[]');
    let data: Crystal[];
    if (savedData) {
      data = JSON.parse(savedData).filter((item: Crystal) => !deletedIds.includes(item.id));
      console.log('📦 loadCrystalData: loaded from localStorage, count:', data.length);
    } else {
      data = initialCrystalData.filter((item: Crystal) => !deletedIds.includes(item.id));
      localStorage.setItem('crystalData', JSON.stringify(data));
      console.log('📦 loadCrystalData: initialized with full data, count:', data.length);
    }
    return data;
  };

  const updateCrystals = async () => {
    const data = await loadCrystalData();
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

  const loadBlogData = async () => {
    try {
      const { supabase } = await import('../lib/supabaseClient');
      const { data, error } = await supabase.from('blogs').select('*');
      if (error) throw error;
      if (data && Array.isArray(data)) {
        console.log('📦 loadBlogData: loaded from Supabase, count:', data.length);
        return data;
      }
    } catch (err) {
      console.error('❌ Supabase fetch failed, falling back to localStorage/static data:', err);
    }
    // Fallback to localStorage/static data
    if (typeof window === 'undefined') return [];
    const savedData = localStorage.getItem('blogData');
    const deletedIds = JSON.parse(localStorage.getItem('deletedBlogs') || '[]');
    let data: BlogPost[];
    if (savedData) {
      data = JSON.parse(savedData).filter((item: BlogPost) => !deletedIds.includes(item.id));
      console.log('📦 loadBlogData: loaded from localStorage, count:', data.length);
    } else {
      data = initialBlogData.filter((item: BlogPost) => !deletedIds.includes(item.id));
      localStorage.setItem('blogData', JSON.stringify(data));
      console.log('📦 loadBlogData: initialized with full data, count:', data.length);
    }
    return data;
  };

  const updateBlogs = async () => {
    const data = await loadBlogData();
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