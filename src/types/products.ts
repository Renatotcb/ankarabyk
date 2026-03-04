import { Product } from '../types';

export const ALL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ensemble décontracté Ankara',
    description: 'Ensemble court (haut à manches courtes et short) avec des motifs géométriques marron, ocre et noir.',
    price: 12000,
    category: 'Gamme Tendance',
    fabric_type: 'Ankara',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://i.ibb.co/d05zM9t1/Whats-App-Image-2026-03-03-at-09-35-37-1.jpg',
      'https://i.ibb.co/DPchk6j5/Whats-App-Image-2026-03-03-at-09-35-37.jpg',
      'https://i.ibb.co/wNbLL9j3/Whats-App-Image-2026-03-03-at-09-35-36.jpg'
    ],
    featured: false,
    inStock: false // Sold Out
  },
  {
    id: '2',
    name: 'Pièce unique Ankarabyk (Adiré)',
    description: 'Une chemise longue à manches longues avec des motifs Adiré artisanaux dans les tons orangés.',
    price: 7000,
    category: 'Gamme Accessibilité',
    fabric_type: 'Adiré',
    sizes: ['Standard'],
    images: [
      'https://i.ibb.co/QxSc33z/Whats-App-Image-2026-03-03-at-10-29-06.jpg',
      'https://i.ibb.co/1YHDbwtP/Whats-App-Image-2026-03-03-at-10-29-05-1.jpg'
    ],
    featured: true,
    inStock: false
  },
  {
    id: '3',
    name: 'Boubou wax décontracté sexy',
    description: 'Robe longue de type boubou avec des bretelles croisées dans le dos.',
    price: 15000,
    category: 'Gamme Élégance',
    fabric_type: 'Wax',
    sizes: ['Standard'],
    images: [
      'https://i.ibb.co/Kx9R93Nn/Whats-App-Image-2026-03-03-at-10-38-19.jpg',
      'https://i.ibb.co/mCngJBgL/Whats-App-Image-2026-03-03-at-10-38-18-1.jpg'
    ],
    featured: false,
    inStock: false
  },
  {
    id: '7',
    name: 'Boubou wax élégant premium',
    description: 'Boubou de luxe en wax premium pour vos grandes occasions.',
    price: 20000,
    category: 'Gamme Prestige',
    fabric_type: 'Wax',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://i.ibb.co/27dtKSts/Whats-App-Image-2026-03-03-at-10-59-13.jpg',
      'https://i.ibb.co/tPcXJVhS/Whats-App-Image-2026-03-03-at-10-59-12-2.jpg'
    ],
    featured: true,
    inStock: true // Disponible
  },
  {
    id: '8',
    name: 'Robe Wax premium',
    description: 'Robe élégante avec coupe moderne en wax de haute qualité.',
    price: 12000,
    category: 'Gamme Élégance',
    fabric_type: 'Wax',
    sizes: ['S', 'M', 'L'],
    images: [
      'https://i.ibb.co/xtPgmkTg/Whats-App-Image-2026-03-03-at-11-01-08.jpg'
    ],
    featured: false,
    inStock: true // Disponible
  }
];