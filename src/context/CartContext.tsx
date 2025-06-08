'use client'

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { useAuth } from './AuthContext'

export interface Product {
  id: string
  name: string
  price: number
  image_url: string
  description: string
  category: string
  stock_quantity?: number
  is_active?: boolean
}

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        return {
          items: newItems,
          total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        }
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0)
      
      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0 }

    case 'LOAD_CART': {
      const items = action.payload
      return {
        items,
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
    }

    default:
      return state
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })
  const { user } = useAuth()

  // Check if Supabase is configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co'

  const supabase = isSupabaseConfigured ? createSupabaseClient() : null

  // Load cart from Supabase when user logs in
  useEffect(() => {
    if (user && supabase) {
      loadCartFromDatabase()
    } else {
      dispatch({ type: 'CLEAR_CART' })
    }
  }, [user, supabase])

  // Save cart to database whenever cart changes
  useEffect(() => {
    if (user && supabase && state.items.length > 0) {
      saveCartToDatabase()
    }
  }, [state.items, user, supabase])

  const loadCartFromDatabase = async () => {
    if (!user || !supabase) return

    try {
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products (
            id,
            name,
            price,
            image_url,
            description,
            category,
            stock_quantity,
            is_active
          )
        `)
        .eq('user_id', user.id)

      if (error) throw error

      const formattedItems: CartItem[] = cartItems?.map((item: any) => ({
        id: item.products.id,
        name: item.products.name,
        price: item.products.price,
        image_url: item.products.image_url,
        description: item.products.description,
        category: item.products.category,
        stock_quantity: item.products.stock_quantity,
        is_active: item.products.is_active,
        quantity: item.quantity
      })) || []

      dispatch({ type: 'LOAD_CART', payload: formattedItems })
    } catch (error) {
      console.error('Error loading cart:', error)
    }
  }

  const saveCartToDatabase = async () => {
    if (!user || !supabase) return

    try {
      // Clear existing cart items
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)

      // Insert new cart items
      if (state.items.length > 0) {
        const cartItemsToInsert = state.items.map(item => ({
          user_id: user.id,
          product_id: item.id,
          quantity: item.quantity
        }))

        await supabase
          .from('cart_items')
          .insert(cartItemsToInsert)
      }
    } catch (error) {
      console.error('Error saving cart:', error)
    }
  }

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
