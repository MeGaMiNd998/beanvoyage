'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getProductById, getProductsByCategory } from '@/lib/products'
import { Product } from '@/context/CartContext'
import { useCart } from '@/context/CartContext'
import { ShoppingCart, ArrowLeft, Plus, Minus, Star, Loader } from 'lucide-react'

export default function ProductPage() {
  const params = useParams()
  const { dispatch } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      if (typeof params.id === 'string') {
        setLoading(true)
        try {
          const productData = await getProductById(params.id)
          setProduct(productData)

          if (productData) {
            const related = await getProductsByCategory(productData.category)
            setRelatedProducts(related.filter(p => p.id !== productData.id).slice(0, 4))
          }
        } catch (error) {
          console.error('Error loading product:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    loadProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-coffee-600 mx-auto mb-4" />
          <p className="text-coffee-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-coffee-800 mb-4">Product Not Found</h1>
          <Link href="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product })
    }
  }



  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/products" 
          className="inline-flex items-center text-coffee-600 hover:text-coffee-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </Link>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative h-96 lg:h-[500px]">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-coffee-800 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold text-coffee-800 mb-4">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-coffee-600">(4.8/5 - 124 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-coffee-800 mb-6">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-3">Description</h3>
              <p className="text-coffee-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-coffee-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-coffee-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-coffee-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex items-center space-x-2 btn-primary text-lg px-8 py-3"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="bg-coffee-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-coffee-800 mb-4">Product Features</h3>
              <ul className="space-y-2 text-coffee-600">
                <li>• Premium quality beans</li>
                <li>• Freshly roasted to order</li>
                <li>• Ethically sourced</li>
                <li>• Perfect for all brewing methods</li>
                <li>• 30-day freshness guarantee</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-coffee-800 mb-8">Related Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="card overflow-hidden">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={relatedProduct.image_url}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-coffee-800 mb-2">{relatedProduct.name}</h3>
                      <p className="text-coffee-600 text-sm mb-2 line-clamp-2">{relatedProduct.description}</p>
                      <span className="text-lg font-bold text-coffee-800">${relatedProduct.price.toFixed(2)}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
