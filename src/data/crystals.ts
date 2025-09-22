export interface Crystal {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  description?: string;
  slug?: string;
  fullDescription?: string;
  properties?: string[];
  chakras?: string[];
  origin?: string;
  hardness?: string;
  size?: string;
  weight?: string;
}

export const crystalData: Crystal[] = [
  {
    id: '1',
    name: 'Amethyst',
    type: 'Special Sale Item',
    price: 450,
    image: '/assets/images/crystal1.jpeg',
    description: 'A powerful protective stone with healing properties',
    slug: 'amethyst',
    fullDescription: 'Amethyst is one of the most beloved crystals in the metaphysical world. This beautiful purple variety of quartz has been treasured for centuries for its stunning beauty and powerful spiritual properties. Known as the stone of spiritual protection and purification, Amethyst creates a protective shield of light around the body, allowing one to remain clear and centered while opening to spiritual direction.',
    properties: ['Spiritual Protection', 'Enhanced Intuition', 'Emotional Balance', 'Stress Relief', 'Better Sleep'],
    chakras: ['Third Eye', 'Crown'],
    origin: 'Brazil',
    hardness: '7 Mohs',
    size: '3-4 inches',
    weight: '200-300g'
  },
  {
    id: '2',
    name: 'Rose Quartz Set',
    type: 'Special Sale Item',
    price: 200,
    image: '/assets/images/crystal3.jpg',
    description: 'The stone of unconditional love and healing',
    slug: 'rose-quartz-set',
    fullDescription: 'Rose Quartz is the stone of unconditional love. It carries a soft feminine energy of compassion and peace, tenderness and healing, nourishment and comfort. Its gentle pink essence is a balm to the heart and soul, healing emotional wounds and pain with loving energy.',
    properties: ['Unconditional Love', 'Emotional Healing', 'Self-Love', 'Compassion', 'Heart Chakra Opening'],
    chakras: ['Heart'],
    origin: 'Madagascar',
    hardness: '7 Mohs',
    size: '2-3 inches each (set of 3)',
    weight: '150-200g total'
  },
  {
    id: '3',
    name: 'Clear Quartz',
    type: 'Special Sale Item',
    price: 100,
    image: '/assets/images/crystal4.jpg',
    description: 'The master healer and amplifier of energy',
    slug: 'clear-quartz',
    fullDescription: 'Clear Quartz is known as the "Master Healer" and will amplify energy and thought, as well as the effect of other crystals. It absorbs, stores, releases and regulates energy. Clear Quartz draws off negative energy of all kinds, neutralizing background radiation.',
    properties: ['Energy Amplification', 'Clarity', 'Healing', 'Purification', 'Programming'],
    chakras: ['All Chakras'],
    origin: 'Arkansas, USA',
    hardness: '7 Mohs',
    size: '4-5 inches',
    weight: '300-400g'
  },
  {
    id: '4',
    name: 'Citrine',
    type: 'Special Sale Item',
    price: 210,
    image: '/assets/images/crystal8.jpg',
    description: 'The merchant stone for abundance and prosperity',
    slug: 'citrine',
    fullDescription: 'Citrine energizes every level of life. It cleanses the chakras and opens the intuition. Citrine attracts wealth, prosperity and success. It imparts joy, wonder, delight and enthusiasm. Raises self-esteem and self-confidence.',
    properties: ['Abundance', 'Manifestation', 'Confidence', 'Joy', 'Success'],
    chakras: ['Solar Plexus', 'Sacral'],
    origin: 'Brazil',
    hardness: '7 Mohs',
    size: '2-3 inches',
    weight: '100-150g'
  },
  {
    id: '5',
    name: 'Purple Agate',
    type: 'Limited Edition',
    price: 320,
    image: '/assets/images/crystal2.jpeg',
    description: 'A rare stone for spiritual transformation',
    slug: 'purple-agate',
    fullDescription: 'Purple Agate is a highly spiritual stone that enhances intuition and connects you to universal energies. This beautiful crystal promotes inner stability, composure, and maturity. Its warm, protective properties encourage security and self-confidence.',
    properties: ['Spiritual Growth', 'Inner Stability', 'Intuition', 'Protection', 'Grounding'],
    chakras: ['Third Eye', 'Crown'],
    origin: 'Uruguay',
    hardness: '6.5-7 Mohs',
    size: '3-4 inches',
    weight: '250-350g'
  },
  {
    id: '6',
    name: 'Green Fluorite',
    type: 'New Arrival',
    price: 180,
    image: '/assets/images/crystal5.jpg',
    description: 'The genius stone for mental clarity',
    slug: 'green-fluorite',
    fullDescription: 'Green Fluorite brings hormones into balance and harmonizes the chakras. It grounds excess energy and is excellent for absorbing negative energies from the environment. Green Fluorite is particularly healing to the Heart Chakra.',
    properties: ['Mental Clarity', 'Focus', 'Learning', 'Heart Healing', 'Emotional Balance'],
    chakras: ['Heart'],
    origin: 'China',
    hardness: '4 Mohs',
    size: '2-3 inches',
    weight: '120-180g'
  },
  {
    id: '7',
    name: 'Black Obsidian',
    type: 'Protection Stone',
    price: 150,
    image: '/assets/images/crystal7.jpg',
    description: 'Powerful protection and grounding stone',
    slug: 'black-obsidian',
    fullDescription: 'Black Obsidian is a very powerful and creative stone. It grounds the soul and spiritual forces into the physical plane. Obsidian dissolves emotional blockages and ancient traumas. It promotes qualities of compassion and strength.',
    properties: ['Protection', 'Grounding', 'Emotional Release', 'Truth', 'Clarity'],
    chakras: ['Root'],
    origin: 'Mexico',
    hardness: '5-6 Mohs',
    size: '3-4 inches',
    weight: '200-300g'
  },
  {
    id: '8',
    name: 'Lapis Lazuli',
    type: 'Wisdom Stone',
    price: 275,
    image: '/assets/images/crystal6.jpg',
    description: 'The stone of truth and enlightenment',
    slug: 'lapis-lazuli',
    fullDescription: 'Lapis Lazuli quickly releases stress, bringing deep peace. It brings harmony and deep inner self-knowledge. Encourages self-awareness, allows self-expression and reveals inner truth, providing qualities of honesty, compassion and morality to the personality.',
    properties: ['Truth', 'Wisdom', 'Communication', 'Inner Vision', 'Royalty'],
    chakras: ['Throat', 'Third Eye'],
    origin: 'Afghanistan',
    hardness: '5-6 Mohs',
    size: '2-3 inches',
    weight: '150-200g'
  }
];