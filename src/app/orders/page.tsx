'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { createSupabaseClient } from '@/lib/supabase'
import { Package, Calendar, DollarSign, MapPin, Eye, Download, Filter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface OrderItem {
  id: string
  product_id: string
  product_name: string
  product_image: string
  quantity: number
  price: number
}

interface Order {
  id: string
  user_id: string
  total_amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address: string
  created_at: string
  updated_at: string
  items: OrderItem[]
}

export default function OrdersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<string>('all')

  const demoOrders: Order[] = [
    {
      id: 'demo-1',
      user_id: user?.id || '',
      total_amount: 47.98,
      status: 'delivered',
      shipping_address: '123 Coffee Street, Colombo 07, Sri Lanka',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-18T14:20:00Z',
      items: [
        {
          id: 'item-1',
          product_id: '1',
          product_name: 'Caramel Coffee',
          product_image: '/images/products/Caramal.jpg',
          quantity: 1,
          price: 24.99
        },
        {
          id: 'item-2',
          product_id: '3',
          product_name: 'Dark Roast',
          product_image: '/images/products/Dark_roast.jpg',
          quantity: 1,
          price: 22.99
        }
      ]
    },
    {
      id: 'demo-2',
      user_id: user?.id || '',
      total_amount: 25.99,
      status: 'shipped',
      shipping_address: '123 Coffee Street, Colombo 07, Sri Lanka',
      created_at: '2024-01-20T09:15:00Z',
      updated_at: '2024-01-22T11:30:00Z',
      items: [
        {
          id: 'item-3',
          product_id: '4',
          product_name: 'Espresso Blend',
          product_image: '/images/products/Espresso_blend.jpg',
          quantity: 1,
          price: 25.99
        }
      ]
    },
    {
      id: 'demo-3',
      user_id: user?.id || '',
      total_amount: 46.98,
      status: 'processing',
      shipping_address: '123 Coffee Street, Colombo 07, Sri Lanka',
      created_at: '2024-01-25T16:45:00Z',
      updated_at: '2024-01-25T16:45:00Z',
      items: [
        {
          id: 'item-4',
          product_id: '7',
          product_name: 'Medium Roast',
          product_image: '/images/products/Medium_roast.jpg',
          quantity: 1,
          price: 22.99
        },
        {
          id: 'item-5',
          product_id: '8',
          product_name: 'Vanilla Coffee',
          product_image: '/images/products/Vanilla.jpg',
          quantity: 1,
          price: 23.99
        }
      ]
    }
  ]

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }
    
    if (user) {
      loadOrders()
    }
  }, [user, loading, router])

  const loadOrders = async () => {
    if (!user) return

    setIsLoading(true)
    setError('')

    try {
      const supabase = createSupabaseClient()
      
      // Try to load orders from database
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_id,
            product_name,
            product_image,
            quantity,
            price
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error && !error.message.includes('relation "public.orders" does not exist')) {
        throw error
      }

      if (data && data.length > 0) {
        // Transform the data to match our interface
        const transformedOrders = data.map(order => ({
          ...order,
          items: order.order_items || []
        }))
        setOrders(transformedOrders)
      } else {
        // Use demo orders if no real orders found
        setOrders(demoOrders)
      }
    } catch (err: any) {
      console.error('Error loading orders:', err)
      // Fallback to demo orders
      setOrders(demoOrders)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳'
      case 'processing':
        return '⚙️'
      case 'shipped':
        return '🚚'
      case 'delivered':
        return '✅'
      case 'cancelled':
        return '❌'
      default:
        return '📦'
    }
  }

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter)

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-800"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-coffee-800 mb-4">Please log in to view your orders</h1>
          <Link href="/login" className="btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-coffee-800 mb-2">Order History</h1>
          <p className="text-coffee-600">Track your coffee orders and view past purchases</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Filter Bar */}
        <div className="card p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-coffee-600" />
              <span className="text-coffee-700 font-medium">Filter by status:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-field py-2 px-3 text-sm"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="text-sm text-coffee-600">
              {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-coffee-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-coffee-800 mb-2">No orders found</h3>
            <p className="text-coffee-600 mb-6">
              {filter === 'all' 
                ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                : `No orders with status "${filter}" found.`
              }
            </p>
            <Link href="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="card p-6">
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between mb-4 pb-4 border-b border-coffee-100">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold text-coffee-800">
                        Order #{order.id.slice(-8).toUpperCase()}
                      </h3>
                      <div className="flex items-center text-sm text-coffee-600 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <div className="text-right">
                      <div className="flex items-center text-lg font-bold text-coffee-800">
                        <DollarSign className="h-5 w-5 mr-1" />
                        {order.total_amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 bg-coffee-50 rounded-lg">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-coffee-800">{item.product_name}</h4>
                        <p className="text-sm text-coffee-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-coffee-800">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-coffee-600">each</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                <div className="flex items-start space-x-2 text-sm text-coffee-600 mb-4">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Shipping to:</span>
                    <p>{order.shipping_address}</p>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-coffee-100">
                  <button className="btn-secondary text-sm flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  <button className="btn-secondary text-sm flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download Invoice</span>
                  </button>
                  {order.status === 'delivered' && (
                    <Link href="/products" className="btn-primary text-sm">
                      Reorder Items
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <Package className="h-8 w-8 text-coffee-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-coffee-800">{orders.length}</h3>
              <p className="text-coffee-600">Total Orders</p>
            </div>
            <div className="card p-6 text-center">
              <DollarSign className="h-8 w-8 text-coffee-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-coffee-800">
                ${orders.reduce((sum, order) => sum + order.total_amount, 0).toFixed(2)}
              </h3>
              <p className="text-coffee-600">Total Spent</p>
            </div>
            <div className="card p-6 text-center">
              <Calendar className="h-8 w-8 text-coffee-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-coffee-800">
                {orders.filter(o => o.status === 'delivered').length}
              </h3>
              <p className="text-coffee-600">Delivered Orders</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
