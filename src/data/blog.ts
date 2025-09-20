export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
  image: string;
  slug: string;
}

export const blogData: BlogPost[] = [
  {
    id: '1',
    title: 'Crystal Meditation: A Beginner\'s Guide',
    excerpt: 'Learn how to incorporate healing crystals into your daily meditation practice for enhanced spiritual connection.',
    author: 'Sarah Crystal',
    readTime: '5 min read',
    date: 'Dec 10',
    image: '/assets/images/blog1.jpg',
    slug: 'crystal-meditation-beginners-guide'
  },
  {
    id: '2',
    title: 'The Science Behind Crystal Energy',
    excerpt: 'Explore the fascinating intersection of geology and metaphysics in understanding crystal vibrations.',
    author: 'Dr. Michael Stone',
    readTime: '8 min read',
    date: 'Dec 8',
    image: '/assets/images/blog2.jpg',
    slug: 'science-behind-crystal-energy'
  },
  {
    id: '3',
    title: 'Choosing Your First Crystal Collection',
    excerpt: 'A comprehensive guide to selecting crystals that align with your personal energy and intentions.',
    author: 'Luna Rivers',
    readTime: '6 min read',
    date: 'Dec 5',
    image: '/assets/images/blog3.jpg',
    slug: 'choosing-first-crystal-collection'
  },
  {
    id: '4',
    title: 'Cleansing and Charging Your Crystals',
    excerpt: 'Essential techniques for maintaining the energetic purity and power of your crystal companions.',
    author: 'Marcus Sage',
    readTime: '4 min read',
    date: 'Dec 3',
    image: '/assets/images/blog4.jpg',
    slug: 'cleansing-charging-crystals'
  }
];