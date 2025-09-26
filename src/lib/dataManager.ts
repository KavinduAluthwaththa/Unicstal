import { crystalData } from '@/data/crystals';
import { blogData } from '@/data/blog';
import type { Crystal } from '@/types/crystal';
import type { BlogPost } from '@/types/blog';

export const getCrystalData = (): Crystal[] => {
  if (typeof window === 'undefined') return crystalData;
  
  const saved = localStorage.getItem('crystalData');
  return saved ? JSON.parse(saved) : crystalData;
};

export const getBlogData = (): BlogPost[] => {
  if (typeof window === 'undefined') return blogData;
  
  const saved = localStorage.getItem('blogData');
  return saved ? JSON.parse(saved) : blogData;
};

export const setCrystalData = (data: Crystal[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('crystalData', JSON.stringify(data));
};

export const setBlogData = (data: BlogPost[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('blogData', JSON.stringify(data));
};