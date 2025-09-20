export interface Crystal {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  description?: string;
}

export const crystalData: Crystal[] = [
  {
    id: '1',
    name: 'Amethyst',
    type: 'Special Sale Item',
    price: 450,
    image: '/assets/images/crystal1.jpeg',
    description: 'A powerful protective stone with healing properties'
  },
  {
    id: '2',
    name: 'Rose Quartz Set',
    type: 'Special Sale Item',
    price: 200,
    image: '/assets/images/crystal3.jpg',
    description: 'The stone of unconditional love and healing'
  },
  {
    id: '3',
    name: 'Clear Quartz',
    type: 'Special Sale Item',
    price: 100,
    image: '/assets/images/crystal4.jpg',
    description: 'The master healer and amplifier of energy'
  },
  {
    id: '4',
    name: 'Citrine',
    type: 'Special Sale Item',
    price: 210,
    image: '/assets/images/crystal8.jpg',
    description: 'The merchant stone for abundance and prosperity'
  },
  {
    id: '5',
    name: 'Purple Agate',
    type: 'Limited Edition',
    price: 320,
    image: '/assets/images/crystal2.jpeg',
    description: 'A rare stone for spiritual transformation'
  },
  {
    id: '6',
    name: 'Green Fluorite',
    type: 'New Arrival',
    price: 180,
    image: '/assets/images/crystal5.jpg',
    description: 'The genius stone for mental clarity'
  },
  {
    id: '7',
    name: 'Black Obsidian',
    type: 'Protection Stone',
    price: 150,
    image: '/assets/images/crystal7.jpg',
    description: 'Powerful protection and grounding stone'
  },
  {
    id: '8',
    name: 'Lapis Lazuli',
    type: 'Wisdom Stone',
    price: 275,
    image: '/assets/images/crystal6.jpg',
    description: 'The stone of truth and enlightenment'
  }
];