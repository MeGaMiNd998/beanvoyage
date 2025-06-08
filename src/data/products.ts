import { Product } from '@/context/CartContext'

export const products: Product[] = [
  {
    id: '1',
    name: 'Ethiopian Yirgacheffe',
    price: 24.99,
    image_url: '/images/products/Caramal.jpg',
    description: 'A bright and floral coffee with notes of lemon and tea-like qualities. Grown in the highlands of Ethiopia.',
    category: 'Single Origin'
  },
  {
    id: '2',
    name: 'Colombian Supremo',
    price: 22.99,
    image_url: '/images/products/Cinnamon.jpg',
    description: 'Full-bodied with a rich, chocolatey flavor and hints of caramel. Perfect for espresso or drip brewing.',
    category: 'Single Origin'
  },
  {
    id: '3',
    name: 'House Blend',
    price: 19.99,
    image_url: '/images/products/Dark_roast.jpg',
    description: 'Our signature blend of Central and South American beans. Balanced and smooth.',
    category: 'Blends'
  },
  {
    id: '4',
    name: 'French Roast',
    price: 21.99,
    image_url: '/images/products/Espresso_blend.jpg',
    description: 'Dark roasted beans with a smoky, intense flavor and low acidity.',
    category: 'Dark Roast'
  },
  {
    id: '5',
    name: 'Guatemala Antigua',
    price: 26.99,
    image_url: '/images/products/Hazelnut.jpg',
    description: 'Complex and spicy with a full body and smoky undertones. Grown in volcanic soil.',
    category: 'Single Origin'
  },
  {
    id: '6',
    name: 'Decaf Colombian',
    price: 23.99,
    image_url: '/images/products/Light_roast.jpg',
    description: 'All the flavor of our Colombian beans without the caffeine. Swiss water processed.',
    category: 'Decaf'
  },
  {
    id: '7',
    name: 'Espresso Blend',
    price: 25.99,
    image_url: '/images/products/Medium_roast.jpg',
    description: 'Specially crafted for espresso with a rich crema and balanced flavor profile.',
    category: 'Espresso'
  },
  {
    id: '8',
    name: 'Cold Brew Concentrate',
    price: 18.99,
    image_url: '/images/products/Vanilla.jpg',
    description: 'Smooth and refreshing cold brew concentrate. Just add water or milk to taste.',
    category: 'Cold Brew'
  },
  {
    id: '9',
    name: 'Vanilla Flavored',
    price: 20.99,
    image_url: '/images/products/Caramal.jpg',
    description: 'Medium roast coffee infused with natural vanilla flavoring for a sweet, aromatic experience.',
    category: 'Flavored'
  },
  {
    id: '10',
    name: 'Organic Fair Trade',
    price: 28.99,
    image_url: '/images/products/Cinnamon.jpg',
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





