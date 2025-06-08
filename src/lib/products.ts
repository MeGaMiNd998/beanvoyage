import { Product } from '@/context/CartContext'

const fallbackProducts: Product[] = [
  {
    id: '1',
    name: 'Caramel Coffee',
    price: 24.99,
    image_url: '/images/products/Caramal.jpg',
    description: 'Rich and smooth coffee with delicious caramel notes. Perfect for those who love sweet, indulgent flavors.',
    category: 'Flavored',
    stock_quantity: 50,
    is_active: true
  },
  {
    id: '2',
    name: 'Cinnamon Spice',
    price: 22.99,
    image_url: '/images/products/Cinnamon.jpg',
    description: 'Warm and aromatic coffee infused with natural cinnamon spice. A perfect morning pick-me-up.',
    category: 'Flavored',
    stock_quantity: 45,
    is_active: true
  },
  {
    id: '3',
    name: 'Dark Roast',
    price: 21.99,
    image_url: '/images/products/Dark_roast.jpg',
    description: 'Bold and intense dark roasted coffee with a rich, smoky flavor and minimal acidity.',
    category: 'Dark Roast',
    stock_quantity: 60,
    is_active: true
  },
  {
    id: '4',
    name: 'Espresso Blend',
    price: 25.99,
    image_url: '/images/products/Espresso_blend.jpg',
    description: 'Specially crafted espresso blend with rich crema and balanced flavor profile. Perfect for espresso lovers.',
    category: 'Espresso',
    stock_quantity: 40,
    is_active: true
  },
  {
    id: '5',
    name: 'Hazelnut Coffee',
    price: 23.99,
    image_url: '/images/products/Hazelnut.jpg',
    description: 'Smooth coffee with rich hazelnut flavor. A nutty and aromatic experience in every cup.',
    category: 'Flavored',
    stock_quantity: 35,
    is_active: true
  },
  {
    id: '6',
    name: 'Light Roast',
    price: 20.99,
    image_url: '/images/products/Light_roast.jpg',
    description: 'Bright and crisp light roast with floral notes and natural sweetness. Perfect for morning brewing.',
    category: 'Light Roast',
    stock_quantity: 55,
    is_active: true
  },
  {
    id: '7',
    name: 'Medium Roast',
    price: 22.99,
    image_url: '/images/products/Medium_roast.jpg',
    description: 'Well-balanced medium roast with perfect harmony of flavor and aroma. Our most popular choice.',
    category: 'Medium Roast',
    stock_quantity: 70,
    is_active: true
  },
  {
    id: '8',
    name: 'Vanilla Coffee',
    price: 24.99,
    image_url: '/images/products/Vanilla.jpg',
    description: 'Smooth and creamy coffee with natural vanilla flavoring. A sweet and aromatic delight.',
    category: 'Flavored',
    stock_quantity: 42,
    is_active: true
  }
]

export async function getProducts(): Promise<Product[]> {
  return fallbackProducts

  // Commented out Supabase connection until database is properly set up
  /*
  if (!isSupabaseConfigured) {
    console.log('Using fallback products - Supabase not configured')
    return fallbackProducts
  }

  try {
    const supabase = createSupabaseClient()

    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products from Supabase:', error)
      console.log('Falling back to demo products')
      return fallbackProducts
    }

    if (!products || products.length === 0) {
      console.log('No products found in database, using fallback products')
      return fallbackProducts
    }

    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      description: product.description,
      category: product.category,
      stock_quantity: product.stock_quantity,
      is_active: product.is_active
    }))
  } catch (error) {
    console.error('Failed to connect to Supabase:', error)
    console.log('Using fallback products')
    return fallbackProducts
  }
  */
}

export async function getProductById(id: string): Promise<Product | null> {
  return fallbackProducts.find(p => p.id === id) || null
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return category === 'All'
    ? fallbackProducts
    : fallbackProducts.filter(p => p.category === category)
}

export async function searchProducts(searchTerm: string): Promise<Product[]> {
  return fallbackProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export async function getCategories(): Promise<string[]> {
  const categories = Array.from(new Set(fallbackProducts.map(p => p.category)))
  return ['All', ...categories.sort()]
}
