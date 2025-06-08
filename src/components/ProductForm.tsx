'use client'

import { useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { X, Upload } from 'lucide-react'

interface ProductFormProps {
  onClose: () => void
  onSuccess: () => void
  product?: any // For editing existing products
}

export default function ProductForm({ onClose, onSuccess, product }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || 'Medium Roast',
    stock_quantity: product?.stock_quantity || '',
    image_url: product?.image_url || ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const categories = [
    'Light Roast',
    'Medium Roast', 
    'Dark Roast',
    'Espresso',
    'Flavored',
    'Decaf',
    'Single Origin',
    'Blends'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createSupabaseClient()
      
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock_quantity: parseInt(formData.stock_quantity),
        image_url: formData.image_url,
        is_active: true
      }

      if (product) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id)

        if (error) throw error
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert([productData])

        if (error) throw error
      }

      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-coffee-800">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-coffee-600 hover:text-coffee-800"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., Ethiopian Yirgacheffe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="input-field"
              placeholder="Describe the coffee's flavor profile and characteristics..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                required
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="input-field"
                placeholder="24.99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock_quantity"
                required
                min="0"
                value={formData.stock_quantity}
                onChange={handleChange}
                className="input-field"
                placeholder="50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-1">
              Image URL *
            </label>
            <input
              type="url"
              name="image_url"
              required
              value={formData.image_url}
              onChange={handleChange}
              className="input-field"
              placeholder="/images/products/your-coffee.jpg or https://..."
            />
            <p className="text-sm text-coffee-500 mt-1">
              Use local images: /images/products/filename.jpg or external URLs
            </p>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-coffee-300 text-coffee-700 rounded-lg hover:bg-coffee-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-6 py-2 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
