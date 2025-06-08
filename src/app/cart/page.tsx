'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <ShoppingBag className="h-24 w-24 text-coffee-300 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-coffee-800 mb-4">Your Cart is Empty</h1>
          <p className="text-xl text-coffee-600 mb-8">
            Looks like you haven't added any coffee to your cart yet.
          </p>
          <Link href="/products" className="btn-primary text-lg px-8 py-3">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-coffee-800">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-coffee-600 hover:text-red-600 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="card p-6">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <Link 
                      href={`/products/${item.id}`}
                      className="text-lg font-semibold text-coffee-800 hover:text-coffee-900 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-coffee-600 text-sm mt-1">{item.category}</p>
                    <p className="text-lg font-bold text-coffee-800 mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-coffee-100 rounded transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-coffee-100 rounded transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-coffee-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 mt-2 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-coffee-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-coffee-600">Subtotal</span>
                  <span className="font-semibold">${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coffee-600">Shipping</span>
                  <span className="font-semibold">
                    {state.total > 50 ? 'Free' : '$5.99'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coffee-600">Tax</span>
                  <span className="font-semibold">${(state.total * 0.08).toFixed(2)}</span>
                </div>
                <hr className="border-coffee-200" />
                <div className="flex justify-between text-xl font-bold text-coffee-800">
                  <span>Total</span>
                  <span>
                    ${(state.total + (state.total > 50 ? 0 : 5.99) + state.total * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              {state.total > 50 ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                  <p className="text-green-800 text-sm font-medium">
                    🎉 You qualify for free shipping!
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                  <p className="text-yellow-800 text-sm">
                    Add ${(50 - state.total).toFixed(2)} more for free shipping
                  </p>
                </div>
              )}

              <Link 
                href="/checkout" 
                className="w-full btn-primary text-center block text-lg py-3 mb-4"
              >
                Proceed to Checkout
              </Link>
              
              <Link 
                href="/products" 
                className="w-full text-center block text-coffee-600 hover:text-coffee-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
