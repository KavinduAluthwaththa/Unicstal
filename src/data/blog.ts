export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
  image: string;
  slug: string;
  content?: string;
  tags?: string[];
  category?: string;
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
    slug: 'crystal-meditation-beginners-guide',
    category: 'Meditation',
    tags: ['meditation', 'beginners', 'spiritual'],
    content: `
      <h2>Introduction to Crystal Meditation</h2>
      <p>Crystal meditation combines the ancient practice of meditation with the healing properties of crystals. This powerful combination can enhance your spiritual practice and deepen your connection to inner wisdom.</p>
      
      <h3>Getting Started</h3>
      <p>Begin by selecting crystals that resonate with your intentions. Clear quartz is perfect for beginners as it amplifies energy and promotes clarity.</p>
      
      <h3>Basic Techniques</h3>
      <p>Hold your chosen crystal in your palm while meditating, or place it on your third eye chakra. Focus on the crystal's energy and allow it to guide your meditation.</p>
      
      <h3>Benefits of Crystal Meditation</h3>
      <ul>
        <li>Enhanced focus and clarity</li>
        <li>Deeper spiritual connection</li>
        <li>Emotional balance and healing</li>
        <li>Increased intuition</li>
      </ul>
      
      <p>Remember, crystal meditation is a personal journey. Trust your intuition and allow the crystals to work with your natural energy.</p>
    `
  },
  {
    id: '2',
    title: 'The Science Behind Crystal Energy',
    excerpt: 'Explore the fascinating intersection of geology and metaphysics in understanding crystal vibrations.',
    author: 'Dr. Michael Stone',
    readTime: '8 min read',
    date: 'Dec 8',
    image: '/assets/images/blog2.jpg',
    slug: 'science-behind-crystal-energy',
    category: 'Science',
    tags: ['science', 'energy', 'geology'],
    content: `
      <h2>The Scientific Foundation</h2>
      <p>While crystals have been used for healing for thousands of years, modern science offers fascinating insights into their unique properties and potential effects.</p>
      
      <h3>Crystal Structure and Vibration</h3>
      <p>Crystals form through precise molecular arrangements that create regular, repeating patterns. This structured formation allows crystals to vibrate at specific frequencies when subjected to pressure or electrical current - a phenomenon known as the piezoelectric effect.</p>
      
      <h3>Electromagnetic Properties</h3>
      <p>Many crystals contain minerals that interact with electromagnetic fields. Quartz, for example, is used in modern technology precisely because of its ability to maintain stable frequencies.</p>
      
      <h3>The Human Energy Field</h3>
      <p>The human body generates its own electromagnetic field through neural activity and cellular processes. Some researchers theorize that crystals may interact with these bioelectric fields.</p>
      
      <p>While the mechanisms are still being studied, the consistent experiences of crystal practitioners worldwide suggest there's more to discover about these remarkable formations.</p>
    `
  },
  {
    id: '3',
    title: 'Choosing Your First Crystal Collection',
    excerpt: 'A comprehensive guide to selecting crystals that align with your personal energy and intentions.',
    author: 'Luna Rivers',
    readTime: '6 min read',
    date: 'Dec 5',
    image: '/assets/images/blog3.jpg',
    slug: 'choosing-first-crystal-collection',
    category: 'Beginners',
    tags: ['beginners', 'collection', 'guide'],
    content: `
      <h2>Starting Your Crystal Journey</h2>
      <p>Building your first crystal collection is an exciting and deeply personal journey. The right crystals will call to you, but understanding their properties can help guide your choices.</p>
      
      <h3>Essential Crystals for Beginners</h3>
      <h4>Clear Quartz - The Master Healer</h4>
      <p>Known as the "master healer," clear quartz amplifies energy and promotes clarity of thought. It's versatile and works well with other crystals.</p>
      
      <h4>Amethyst - For Spiritual Growth</h4>
      <p>This beautiful purple stone enhances intuition and spiritual awareness. It's also known for its calming properties and ability to aid in meditation.</p>
      
      <h4>Rose Quartz - The Stone of Love</h4>
      <p>Rose quartz promotes self-love and emotional healing. It's gentle and nurturing, perfect for heart chakra work.</p>
      
      <h3>How to Choose Your Crystals</h3>
      <p>Trust your intuition when selecting crystals. Hold different stones and notice which ones feel warm, tingly, or simply "right" in your hands.</p>
      
      <h3>Caring for Your Collection</h3>
      <p>Keep your crystals cleansed and charged. Simple methods include moonlight charging and cleansing with sage or running water.</p>
    `
  },
  {
    id: '4',
    title: 'Cleansing and Charging Your Crystals',
    excerpt: 'Essential techniques for maintaining the energetic purity and power of your crystal companions.',
    author: 'Marcus Sage',
    readTime: '4 min read',
    date: 'Dec 3',
    image: '/assets/images/blog4.jpg',
    slug: 'cleansing-charging-crystals',
    category: 'Care',
    tags: ['cleansing', 'charging', 'maintenance'],
    content: `
      <h2>Why Cleanse and Charge Crystals?</h2>
      <p>Crystals absorb and store energy from their environment. Regular cleansing removes unwanted energies, while charging restores their natural vibrational power.</p>
      
      <h3>Cleansing Methods</h3>
      <h4>Water Cleansing</h4>
      <p>Hold your crystals under running water for 1-2 minutes. Visualize negative energy washing away. Note: Some crystals like selenite should not be cleansed with water.</p>
      
      <h4>Sage Smudging</h4>
      <p>Pass your crystals through sage smoke while setting the intention to cleanse and purify their energy.</p>
      
      <h4>Sound Cleansing</h4>
      <p>Use singing bowls, bells, or tuning forks to cleanse crystals with sound vibrations.</p>
      
      <h3>Charging Methods</h3>
      <h4>Moonlight Charging</h4>
      <p>Place crystals outside or on a windowsill during the full moon for powerful lunar charging.</p>
      
      <h4>Sunlight Charging</h4>
      <p>Brief exposure to morning sunlight can energize most crystals. Avoid prolonged exposure for colored stones that may fade.</p>
      
      <h4>Earth Charging</h4>
      <p>Bury crystals in soil overnight to reconnect them with Earth's grounding energy.</p>
      
      <p>Regular maintenance keeps your crystals at their energetic peak and ready to support your intentions.</p>
    `
  }
];