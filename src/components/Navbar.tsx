'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { ShoppingCart, Coffee, User, Menu, X, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { state } = useCart()
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const handleSignOut = async () => {
    await signOut()
    setIsUserMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-coffee-800" />
            <span className="text-2xl font-bold text-coffee-800">BeanVoyage</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-coffee-700 hover:text-coffee-800 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-coffee-700 hover:text-coffee-800 font-medium transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-coffee-700 hover:text-coffee-800 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-coffee-700 hover:text-coffee-800 font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* User Account */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-coffee-700 hover:text-coffee-800 transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:block text-sm font-medium">
                    {user.user_metadata?.first_name || user.email}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-coffee-200 z-50">
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-coffee-700 hover:bg-coffee-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center px-4 py-2 text-coffee-700 hover:bg-coffee-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Order History
                      </Link>
                      <hr className="my-2 border-coffee-200" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-coffee-700 hover:bg-coffee-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-coffee-700 hover:text-coffee-800 transition-colors">
                <User className="h-6 w-6" />
              </Link>
            )}

            {/* Shopping Cart */}
            <Link href="/cart" className="relative text-coffee-700 hover:text-coffee-800 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-coffee-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-coffee-700 hover:text-coffee-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-coffee-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-coffee-700 hover:text-coffee-800 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-coffee-700 hover:text-coffee-800 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-coffee-700 hover:text-coffee-800 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-coffee-700 hover:text-coffee-800 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
