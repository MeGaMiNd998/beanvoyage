'use client'

import { useState, useEffect } from 'react'
import { getProducts, getCategories, searchProducts, getProductsByCategory } from '@/lib/products'
import { Product } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'
import { Search, Filter, Loader } from 'lucide-react'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [loading, setLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        console.log('Loading products and categories...')
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ])
        console.log('Products loaded:', productsData.length)
        console.log('Categories loaded:', categoriesData)
        setProducts(productsData)
        setCategories(categoriesData)
        setFilteredProducts(productsData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Filter products when category or search changes
  useEffect(() => {
    const filterProducts = async () => {
      if (searchTerm.trim()) {
        // If there's a search term, search products
        const searchResults = await searchProducts(searchTerm)
        const categoryFiltered = selectedCategory === 'All'
          ? searchResults
          : searchResults.filter(p => p.category === selectedCategory)
        setFilteredProducts(categoryFiltered)
      } else {
        // If no search term, filter by category
        const categoryResults = await getProductsByCategory(selectedCategory)
        setFilteredProducts(categoryResults)
      }
    }

    if (!loading) {
      filterProducts()
    }
  }, [selectedCategory, searchTerm, loading])

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-coffee-800 mb-4">Our Coffee Collection</h1>
          <p className="text-xl text-coffee-600">Discover premium coffee beans from around the world</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search coffee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-coffee-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-coffee-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-coffee-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent bg-white text-coffee-900"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-coffee-600">
            {loading ? 'Loading...' : (
              <>
                Showing {filteredProducts.length} of {products.length} products
                {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
                {searchTerm && ` matching "${searchTerm}"`}
              </>
            )}
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="h-8 w-8 animate-spin text-coffee-600" />
            <span className="ml-2 text-coffee-600">Loading products...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-coffee-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-coffee-800 mb-2">No products available</h3>
            <p className="text-coffee-600 mb-6">
              There seems to be an issue loading products. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Refresh Page
            </button>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
          <div className="text-center py-16">
            <div className="text-coffee-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-coffee-800 mb-2">No products found</h3>
            <p className="text-coffee-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  )
}
