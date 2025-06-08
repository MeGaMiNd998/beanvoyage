'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/lib/products'
import { Product } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'
import { Coffee, Star, Truck, Shield } from 'lucide-react'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [coffeeClicked, setCoffeeClicked] = useState(false)

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      const products = await getProducts()
      setFeaturedProducts(products.slice(0, 4))
    }
    loadFeaturedProducts()
  }, [])

  const handleCoffeeClick = () => {
    setCoffeeClicked(true)
    setTimeout(() => setCoffeeClicked(false), 1000)
  }

  return (
    <div className="min-h-screen">
      {/* Interactive Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 coffee-gradient opacity-90"></div>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear hover:scale-110"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=600&fit=crop)'
            }}
          ></div>

          {/* Floating Coffee Beans Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-4 h-4 bg-yellow-400 rounded-full opacity-20 animate-pulse`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${8 + i}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Interactive Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Animated Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="inline-block animate-fade-in">Welcome to</span>
              <span className="block text-yellow-400 animate-fade-in" style={{animationDelay: '0.5s'}}>
                BeanVoyage
              </span>
            </h1>

            {/* Subtitle with typing effect */}
            <div className="h-16 flex items-center justify-center">
              <p className="text-xl md:text-2xl text-coffee-100 animate-fade-in" style={{animationDelay: '1s'}}>
                Discover the world's finest coffee beans, expertly roasted to perfection
              </p>
            </div>
          </div>

          {/* Interactive Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8 max-w-2xl mx-auto">
            <div className="group cursor-pointer transform hover:scale-110 transition-all duration-300 animate-fade-in" style={{animationDelay: '1.5s'}}>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 border border-white border-opacity-20">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400 group-hover:animate-bounce">8+</div>
                <div className="text-sm md:text-base text-coffee-100">Coffee Varieties</div>
              </div>
            </div>
            <div className="group cursor-pointer transform hover:scale-110 transition-all duration-300 animate-fade-in" style={{animationDelay: '1.7s'}}>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 border border-white border-opacity-20">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400 group-hover:animate-bounce">100%</div>
                <div className="text-sm md:text-base text-coffee-100">Premium Quality</div>
              </div>
            </div>
            <div className="group cursor-pointer transform hover:scale-110 transition-all duration-300 animate-fade-in" style={{animationDelay: '1.9s'}}>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 border border-white border-opacity-20">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400 group-hover:animate-bounce">24/7</div>
                <div className="text-sm md:text-base text-coffee-100">Fresh Roasted</div>
              </div>
            </div>
          </div>

          {/* Interactive Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in" style={{animationDelay: '2.1s'}}>
            <Link
              href="/products"
              className="group relative overflow-hidden bg-yellow-400 text-coffee-800 font-bold text-lg px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <span className="relative z-10">Shop Coffee</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
            <Link
              href="/about"
              className="group border-2 border-white text-white hover:bg-white hover:text-coffee-800 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm"
            >
              <span className="group-hover:animate-pulse">Our Story</span>
            </Link>
          </div>

          {/* Interactive Coffee Cup Animation */}
          <div className="flex justify-center mb-8 animate-fade-in" style={{animationDelay: '2.3s'}}>
            <div className="relative group cursor-pointer" onClick={handleCoffeeClick}>
              <div className={`w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 group-hover:scale-110 shadow-lg ${coffeeClicked ? 'animate-bounce scale-125' : ''}`}>
                <div className="text-2xl md:text-3xl group-hover:animate-bounce">☕</div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white bg-opacity-20 rounded-full animate-ping"></div>
              {coffeeClicked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-yellow-400 text-4xl animate-ping">✨</div>
                </div>
              )}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-coffee-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {coffeeClicked ? 'Delicious! ☕✨' : 'Taste the magic!'}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
            <p className="text-xs text-coffee-100 mt-2">Scroll to explore</p>
          </div>
        </div>

        {/* Interactive Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Coffee className="h-12 w-12 text-coffee-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-coffee-800 mb-2">Premium Quality</h3>
              <p className="text-coffee-600">Hand-selected beans from the finest coffee regions</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-coffee-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-coffee-800 mb-2">Expert Roasting</h3>
              <p className="text-coffee-600">Roasted in small batches for optimal flavor</p>
            </div>
            <div className="text-center">
              <Truck className="h-12 w-12 text-coffee-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-coffee-800 mb-2">Fast Delivery</h3>
              <p className="text-coffee-600">Fresh coffee delivered to your door</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-coffee-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-coffee-800 mb-2">Quality Guarantee</h3>
              <p className="text-coffee-600">100% satisfaction guaranteed or money back</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-coffee-50 to-gold-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-coffee-800 mb-4">Featured Products</h2>
            <p className="text-xl text-coffee-600">Discover our most popular coffee selections</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products" className="btn-primary text-lg px-8 py-3">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-coffee-800 mb-6">Our Story</h2>
              <p className="text-lg text-coffee-600 mb-6">
                Founded in 2010, BeanVoyage has been dedicated to bringing you the finest coffee
                experience. We work directly with farmers to source the highest quality beans and
                roast them to perfection in our local facility.
              </p>
              <p className="text-lg text-coffee-600 mb-8">
                Every cup tells a story of passion, craftsmanship, and the pursuit of the perfect brew. 
                Join us on this journey and taste the difference that quality makes.
              </p>
              <Link href="/about" className="btn-secondary">
                Learn More About Us
              </Link>
            </div>
            <div className="relative h-96">
              <Image
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop"
                alt="Coffee roasting process"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
