export interface Article {
  id: string;
  title: string;
  category: string;
  image: string;
  likes: number;
  description?: string;
}

export const articleData: Article[] = [
  {
    id: '1',
    title: 'Money & Financial Abundance',
    category: 'HIGH QUALITY',
    image: '/assets/images/crystal1.jpeg',
    likes: 200,
    description: 'Discover crystals that attract prosperity and financial success into your life.'
  },
  {
    id: '2',
    title: 'Love & Relationships',
    category: 'PREMIUM',
    image: '/assets/images/crystal2.jpeg',
    likes: 200,
    description: 'Enhance your romantic connections with powerful love-attracting crystals.'
  },
  {
    id: '3',
    title: 'Career Growth & Success',
    category: 'CALM',
    image: '/assets/images/crystal3.jpg',
    likes: 200,
    description: 'Boost your professional life with crystals for ambition and achievement.'
  },
  {
    id: '4',
    title: 'Peace of Mind & Inner Clarity',
    category: 'PROTECT',
    image: '/assets/images/crystal4.jpg',
    likes: 200,
    description: 'Find tranquility and mental clarity with calming crystal energies.'
  },
  {
    id: '5',
    title: 'Healing & Wellness',
    category: 'CLEAN',
    image: '/assets/images/crystal5.jpg',
    likes: 200,
    description: 'Support your physical and emotional healing journey with therapeutic crystals.'
  },
  {
    id: '6',
    title: 'Spiritual Protection',
    category: 'PROTECT',
    image: '/assets/images/crystal6.jpg',
    likes: 200,
    description: 'Shield yourself from negative energies with powerful protective stones.'
  },
  {
    id: '7',
    title: 'Energy Cleansing',
    category: 'CLEAN',
    image: '/assets/images/crystal7.jpg',
    likes: 200,
    description: 'Purify your space and aura with cleansing crystal vibrations.'
  },
  {
    id: '8',
    title: 'Manifestation Power',
    category: 'PREMIUM',
    image: '/assets/images/crystal8.jpg',
    likes: 200,
    description: 'Amplify your manifestation abilities with high-vibrational crystals.'
  }
];