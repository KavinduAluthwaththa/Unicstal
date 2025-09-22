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
    name: 'Rainbow Moonstone',
    type: 'Goddess Collection',
    price: 380,
    image: '/assets/images/crystal1.jpeg',
    description: 'Divine feminine energy and mystical lunar connection',
    slug: 'rainbow-moonstone',
    fullDescription: 'Rainbow Moonstone is a stunning variety of labradorite that exhibits brilliant flashes of blue, green, and gold. Known as the stone of the goddess, it connects you deeply to lunar energies and divine feminine wisdom. This mystical crystal enhances psychic abilities, promotes lucid dreaming, and helps you navigate life transitions with grace and intuition.',
    properties: ['Divine Feminine', 'Psychic Enhancement', 'Emotional Balance', 'New Beginnings', 'Dream Work'],
    chakras: ['Third Eye', 'Crown', 'Sacral'],
    origin: 'Sri Lanka',
    hardness: '6-6.5 Mohs',
    size: '2.5-3.5 inches',
    weight: '180-250g'
  },
  {
    id: '2',
    name: 'Dragon Blood Jasper',
    type: 'Warrior Collection',
    price: 295,
    image: '/assets/images/crystal2.jpeg',
    description: 'Fierce courage and life force activation',
    slug: 'dragon-blood-jasper',
    fullDescription: 'Dragon Blood Jasper is a powerful stone of courage, strength, and vitality. Its deep green base with red inclusions resembles the blood of ancient dragons, making it a favorite among those seeking to awaken their inner warrior. This crystal enhances life force energy, promotes fearless action, and helps overcome challenges with determination and bravery.',
    properties: ['Courage', 'Life Force', 'Strength', 'Vitality', 'Protection'],
    chakras: ['Root', 'Heart'],
    origin: 'Australia',
    hardness: '6.5-7 Mohs',
    size: '3-4 inches',
    weight: '220-320g'
  },
  {
    id: '3',
    name: 'Peacock Ore Chalcopyrite',
    type: 'Mystical Collection',
    price: 240,
    image: '/assets/images/crystal3.jpg',
    description: 'Rainbow bridge to higher dimensions',
    slug: 'peacock-ore-chalcopyrite',
    fullDescription: 'Peacock Ore, also known as Chalcopyrite, displays mesmerizing rainbow colors that seem to dance across its surface. This mystical stone is known as the "Stone of the Mystic" and helps bridge the gap between the physical and spiritual realms. It enhances perception, removes energy blockages, and connects you to higher dimensional awareness.',
    properties: ['Mystical Awareness', 'Energy Bridge', 'Perception', 'Transformation', 'Joy'],
    chakras: ['All Chakras'],
    origin: 'Mexico',
    hardness: '3.5-4 Mohs',
    size: '2-3 inches',
    weight: '150-200g'
  },
  {
    id: '4',
    name: 'Lemurian Seed Quartz',
    type: 'Ancient Wisdom',
    price: 450,
    image: '/assets/images/crystal4.jpg',
    description: 'Ancient knowledge from the lost civilization of Lemuria',
    slug: 'lemurian-seed-quartz',
    fullDescription: 'Lemurian Seed Crystals are unique quartz formations believed to contain the wisdom and healing knowledge of the ancient civilization of Lemuria. These special crystals have distinctive horizontal striations and are said to be "seeded" with information for humanity\'s spiritual evolution. They are powerful tools for healing, meditation, and accessing ancient wisdom.',
    properties: ['Ancient Wisdom', 'Spiritual Evolution', 'Healing Knowledge', 'Unity Consciousness', 'Light Activation'],
    chakras: ['All Chakras', 'Soul Star'],
    origin: 'Brazil (Minas Gerais)',
    hardness: '7 Mohs',
    size: '4-6 inches',
    weight: '350-500g'
  },
  {
    id: '5',
    name: 'Moldavite',
    type: 'Meteorite Collection',
    price: 680,
    image: '/assets/images/crystal5.jpg',
    description: 'Extraterrestrial transformation catalyst',
    slug: 'moldavite',
    fullDescription: 'Moldavite is a rare tektite formed from a meteorite impact in the Czech Republic approximately 15 million years ago. Known as the "Stone of Transformation," Moldavite carries intense frequency that can catalyze rapid spiritual evolution and consciousness expansion. This cosmic glass is highly sought after for its ability to accelerate personal growth and connect with star wisdom.',
    properties: ['Rapid Transformation', 'Cosmic Connection', 'Spiritual Acceleration', 'Psychic Enhancement', 'Higher Consciousness'],
    chakras: ['Heart', 'Third Eye', 'Crown'],
    origin: 'Czech Republic',
    hardness: '5.5-6.5 Mohs',
    size: '1-2 inches',
    weight: '15-35g'
  },
  {
    id: '6',
    name: 'Labradorite Palm Stone',
    type: 'Magic Collection',
    price: 165,
    image: '/assets/images/crystal6.jpg',
    description: 'Stone of magic and mystical transformation',
    slug: 'labradorite-palm-stone',
    fullDescription: 'Labradorite is renowned as the stone of magic and transformation. This mystical feldspar mineral displays spectacular labradorescence - flashes of blue, green, gold, and purple that seem to hold the Northern Lights within. Labradorite awakens psychic abilities, protects the aura, and helps you discover your magical potential and unique gifts.',
    properties: ['Magic', 'Psychic Protection', 'Transformation', 'Intuition', 'Synchronicity'],
    chakras: ['Third Eye', 'Throat'],
    origin: 'Madagascar',
    hardness: '6-6.5 Mohs',
    size: '2.5-3 inches',
    weight: '120-180g'
  },
  {
    id: '7',
    name: 'Herkimer Diamond',
    type: 'Light Being Collection',
    price: 320,
    image: '/assets/images/crystal7.jpg',
    description: 'Pure light frequency and spiritual clarity',
    slug: 'herkimer-diamond',
    fullDescription: 'Herkimer Diamonds are exceptionally clear, naturally double-terminated quartz crystals found only in Herkimer County, New York. These "diamonds" are prized for their brilliant clarity and high vibrational frequency. They are powerful amplifiers of spiritual energy, enhance telepathic communication, and help attune to higher dimensions of light and consciousness.',
    properties: ['High Vibration', 'Clarity', 'Telepathy', 'Light Body Activation', 'Spiritual Communication'],
    chakras: ['Third Eye', 'Crown', 'Soul Star'],
    origin: 'New York, USA',
    hardness: '7.5 Mohs',
    size: '1-2 inches',
    weight: '25-60g'
  },
  {
    id: '8',
    name: 'Celestite Cluster',
    type: 'Angelic Collection',
    price: 285,
    image: '/assets/images/crystal8.jpg',
    description: 'Heavenly peace and angelic communication',
    slug: 'celestite-cluster',
    fullDescription: 'Celestite, also known as Celestine, is a gentle blue crystal that connects you to celestial realms and angelic beings. This peaceful stone emanates soft, calming energy that soothes anxiety and promotes inner peace. Celestite facilitates communication with angels, enhances meditation, and helps you access divine guidance and heavenly wisdom.',
    properties: ['Angelic Communication', 'Inner Peace', 'Divine Guidance', 'Serenity', 'Meditation Enhancement'],
    chakras: ['Throat', 'Third Eye', 'Crown'],
    origin: 'Madagascar',
    hardness: '3-3.5 Mohs',
    size: '3-5 inches',
    weight: '200-400g'
  },
  {
    id: '9',
    name: 'Phantom Quartz',
    type: 'Evolution Collection',
    price: 225,
    image: '/assets/images/crystal1.jpeg',
    description: 'Growth patterns and spiritual evolution',
    slug: 'phantom-quartz',
    fullDescription: 'Phantom Quartz contains visible "phantoms" or ghost-like inclusions that show the crystal\'s growth stages over time. These fascinating formations represent spiritual evolution, personal growth, and the ability to move through different phases of life. Phantom Quartz helps you understand your soul\'s journey and embrace transformation with wisdom and grace.',
    properties: ['Soul Growth', 'Life Phases', 'Evolution', 'Past Life Healing', 'Wisdom'],
    chakras: ['All Chakras'],
    origin: 'Arkansas, USA',
    hardness: '7 Mohs',
    size: '3-4 inches',
    weight: '180-280g'
  },
  {
    id: '10',
    name: 'Atlantisite',
    type: 'Lost Civilization',
    price: 195,
    image: '/assets/images/crystal2.jpeg',
    description: 'Ancient Atlantean wisdom and earth healing',
    slug: 'atlantisite',
    fullDescription: 'Atlantisite is a rare combination of green serpentine and purple stichtite, creating a powerful stone that connects to ancient Atlantean wisdom. This unique crystal promotes earth healing, environmental consciousness, and access to advanced healing techniques from past civilizations. Atlantisite helps bridge ancient knowledge with modern healing practices.',
    properties: ['Ancient Wisdom', 'Earth Healing', 'Environmental Consciousness', 'Advanced Healing', 'Kundalini Activation'],
    chakras: ['Heart', 'Crown'],
    origin: 'Tasmania, Australia',
    hardness: '2.5-4 Mohs',
    size: '2-3 inches',
    weight: '100-160g'
  }
];