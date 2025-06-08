import { Product } from '@/context/CartContext'

export const products: Product[] = [
  {
    id: '1',
    name: 'Ethiopian Yirgacheffe',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    description: 'A bright and floral coffee with notes of lemon and tea-like qualities. Grown in the highlands of Ethiopia.',
    category: 'Single Origin'
  },
  {
    id: '2',
    name: 'Colombian Supremo',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0d9?w=400&h=400&fit=crop',
    description: 'Full-bodied with a rich, chocolatey flavor and hints of caramel. Perfect for espresso or drip brewing.',
    category: 'Single Origin'
  },
  {
    id: '3',
    name: 'House Blend',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=400&fit=crop',
    description: 'Our signature blend combining beans from Central and South America for a balanced, smooth taste.',
    category: 'Blends'
  },
  {
    id: '4',
    name: 'French Roast',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    description: 'Dark roasted to perfection with a bold, smoky flavor and minimal acidity.',
    category: 'Dark Roast'
  },
  {
    id: '5',
    name: 'Guatemala Antigua',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&h=400&fit=crop',
    description: 'Complex and spicy with a full body and smoky undertones. Grown in volcanic soil.',
    category: 'Single Origin'
  },
  {
    id: '6',
    name: 'Decaf Colombian',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    description: 'All the flavor of our Colombian beans without the caffeine. Swiss water processed.',
    category: 'Decaf'
  },
  {
    id: '7',
    name: 'Espresso Blend',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0d9?w=400&h=400&fit=crop',
    description: 'Specially crafted for espresso with a rich crema and balanced flavor profile.',
    category: 'Espresso'
  },
  {
    id: '8',
    name: 'Cold Brew Concentrate',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
    description: 'Smooth and refreshing cold brew concentrate. Just add water or milk to taste.',
    category: 'Cold Brew'
  },
  {
    id: '9',
    name: 'Vanilla Flavored',
    price: 20.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    description: 'Medium roast coffee infused with natural vanilla flavoring for a sweet, aromatic experience.',
    category: 'Flavored'
  },
  {
    id: '10',
    name: 'Organic Fair Trade',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&h=400&fit=crop',
    description: 'Ethically sourced organic coffee supporting sustainable farming practices.',
    category: 'Organic'
  }
]

export const categories = [
  'All',
  'Single Origin',
  'Blends',
  'Dark Roast',
  'Decaf',
  'Espresso',
  'Cold Brew',
  'Flavored',
  'Organic'
]
