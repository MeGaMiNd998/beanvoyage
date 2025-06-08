'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { createSupabaseClient } from '@/lib/supabase'
import { Product } from '@/context/CartContext'
import { Plus, Edit, Trash2, Eye, EyeOff, Loader, AlertCircle } from 'lucide-react'

export default function AdminPage() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const supabase = createSupabaseClient()

  useEffect(() => {
    checkAdminStatus()
    loadProducts()
  }, [user])

  const checkAdminStatus = async () => {
    if (!user) return

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()

      setIsAdmin(profile?.is_admin || false)
    } catch (error) {
      console.error('Error checking admin status:', error)
    }
  }

  const loadProducts = async () => {
    setLoading(true)
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setProducts(products?.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        description: product.description,
        category: product.category,
        stock_quantity: product.stock_quantity,
        is_active: product.is_active
      })) || [])
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleProductStatus = async (productId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !currentStatus })
        .eq('id', productId)

      if (error) throw error

      setProducts(products.map(p => 
        p.id === productId ? { ...p, is_active: !currentStatus } : p
      ))
    } catch (error) {
      console.error('Error updating product status:', error)
    }
  }

  const deleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) throw error

      setProducts(products.filter(p => p.id !== productId))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-coffee-800 mb-4">Please log in to access admin panel</h1>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-coffee-800 mb-4">Access Denied</h1>
          <p className="text-coffee-600">You don't have admin privileges to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-coffee-800">Admin Panel</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="h-8 w-8 animate-spin text-coffee-600" />
            <span className="ml-2 text-coffee-600">Loading products...</span>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-coffee-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Image</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left">Stock</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-coffee-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-coffee-50">
                      <td className="px-6 py-4">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-coffee-800">{product.name}</div>
                        <div className="text-sm text-coffee-600 truncate max-w-xs">
                          {product.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-coffee-600">{product.category}</td>
                      <td className="px-6 py-4 font-semibold text-coffee-800">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-coffee-600">{product.stock_quantity}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => toggleProductStatus(product.id, product.is_active!)}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          >
                            {product.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Product Modal would go here */}
        {(showAddForm || editingProduct) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-coffee-800 mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-coffee-600 mb-4">
                Product form would be implemented here with full CRUD functionality.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingProduct(null)
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button className="btn-primary">
                  {editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
