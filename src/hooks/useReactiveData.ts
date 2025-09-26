'use client';

import { useState, useEffect } from 'react';
// Sample types
import type { Crystal } from '../types/crystal';

import type { BlogPost } from '../types/blog';

// Custom hook for reactive crystal data
export const useReactiveCrystalData = () => {
  const [crystals, setCrystals] = useState<Crystal[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const loadCrystalData = () => {
    if (typeof window === 'undefined') return [];
    const savedData = localStorage.getItem('crystalData');
    const deletedIds = JSON.parse(localStorage.getItem('deletedCrystals') || '[]');
    let data: Crystal[];
    if (savedData) {
      data = JSON.parse(savedData).filter((item: Crystal) => !deletedIds.includes(item.id));
      console.log('📦 loadCrystalData: loaded from localStorage, count:', data.length);
    } else {
      // Populate sample data only once, never again
      data = [
        {
          id: '1',
          name: 'Amethyst',
          slug: 'amethyst',
          description: 'A calming stone for peace and clarity.',
          image: '/assets/images/crystal1.jpeg',
        },
        {
          id: '2',
          name: 'Rose Quartz',
          slug: 'rose-quartz',
          description: 'The stone of universal love and harmony.',
          image: '/assets/images/crystal2.jpeg',
        },
        {
          id: '3',
          name: 'Citrine',
          slug: 'citrine',
          description: 'A stone for abundance and manifestation.',
          image: '/assets/images/crystal3.jpg',
        },
      ];
      localStorage.setItem('crystalData', JSON.stringify(data));
      console.log('📦 loadCrystalData: initialized with sample data, count:', data.length);
    }
    return data;
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
    if (typeof window === 'undefined') return [];
    const savedData = localStorage.getItem('blogData');
    const deletedIds = JSON.parse(localStorage.getItem('deletedBlogs') || '[]');
    let data: BlogPost[];
    if (savedData) {
      data = JSON.parse(savedData).filter((item: BlogPost) => !deletedIds.includes(item.id));
      console.log('📦 loadBlogData: loaded from localStorage, count:', data.length);
    } else {
      // Populate sample data only once, never again
      data = [
        {
          id: '1',
          title: 'The Power of Amethyst',
          excerpt: 'Discover the calming and spiritual benefits of amethyst crystals.',
          author: 'Crystal Guru',
          date: 'September 1, 2025',
          readTime: '4 min read',
          image: '/assets/images/blog1.jpg',
          slug: 'the-power-of-amethyst',
          content: 'Amethyst is known for its calming energy and spiritual protection...',
          tags: ['amethyst', 'healing'],
          category: 'Crystals',
        },
        {
          id: '2',
          title: 'Rose Quartz: Love and Harmony',
          excerpt: 'How rose quartz can help you attract love and heal relationships.',
          author: 'Gemstone Sage',
          date: 'September 10, 2025',
          readTime: '3 min read',
          image: '/assets/images/blog2.jpg',
          slug: 'rose-quartz-love-harmony',
          content: 'Rose Quartz is the stone of universal love...',
          tags: ['rose quartz', 'love'],
          category: 'Crystals',
        },
        {
          id: '3',
          title: 'Citrine for Abundance',
          excerpt: 'Manifest abundance and success with citrine.',
          author: 'Crystal Coach',
          date: 'September 20, 2025',
          readTime: '5 min read',
          image: '/assets/images/blog3.jpg',
          slug: 'citrine-for-abundance',
          content: 'Citrine is a powerful stone for manifestation...',
          tags: ['citrine', 'abundance'],
          category: 'Crystals',
        },
      ];
      localStorage.setItem('blogData', JSON.stringify(data));
      console.log('📦 loadBlogData: initialized with sample data, count:', data.length);
    }
    return data;
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