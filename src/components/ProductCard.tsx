'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product, useCart } from '@/context/CartContext'
import { ShoppingCart, Eye } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  return (
    <div className="card overflow-hidden group">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-coffee-800 text-white px-2 py-1 rounded-full text-sm font-medium">
              {product.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-coffee-800 mb-2 group-hover:text-coffee-900 transition-colors">
            {product.name}
          </h3>
          <p className="text-coffee-600 mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-coffee-800">
              ${product.price.toFixed(2)}
            </span>
            
            <div className="flex gap-2">
              <Link 
                href={`/products/${product.id}`}
                className="p-2 bg-coffee-100 hover:bg-coffee-200 text-coffee-800 rounded-lg transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className="h-5 w-5" />
              </Link>
              
              <button
                onClick={handleAddToCart}
                className="p-2 bg-yellow-400 hover:bg-yellow-500 text-coffee-800 rounded-lg transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
