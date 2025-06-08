import Image from 'next/image'
import { Coffee, Award, Users, Leaf, Heart, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-white">
        <div className="absolute inset-0 coffee-gradient opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=500&fit=crop)'
          }}
        ></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About
            <span className="block text-yellow-400">BeanVoyage</span>
          </h1>
          <p className="text-xl md:text-2xl text-coffee-100">
            Crafting exceptional coffee experiences since our journey began
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-coffee-800 mb-6">Our Story</h2>
              <p className="text-lg text-coffee-600 mb-6">
                BeanVoyage began as a passion project in the heart of Colombo, Sri Lanka. 
                Our founders, driven by a love for exceptional coffee, embarked on a journey 
                to discover the finest beans from around the world and bring them to your cup.
              </p>
              <p className="text-lg text-coffee-600 mb-6">
                What started as a small roastery on Kandy Road has grown into a beloved 
                coffee destination, but our commitment to quality and craftsmanship remains unchanged. 
                Every bean is carefully selected, expertly roasted, and passionately prepared.
              </p>
              <p className="text-lg text-coffee-600">
                Today, BeanVoyage continues to explore new flavors, support sustainable farming 
                practices, and create memorable coffee experiences for our community.
              </p>
            </div>
            <div className="relative h-96">
              <Image
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=400&fit=crop"
                alt="Coffee roasting process"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-to-br from-coffee-50 to-gold-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-coffee-800 mb-4">Our Values</h2>
            <p className="text-xl text-coffee-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-coffee-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-3">Quality First</h3>
              <p className="text-coffee-600">
                We never compromise on quality. From bean selection to the final cup, 
                excellence is our standard.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-coffee-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-3">Sustainability</h3>
              <p className="text-coffee-600">
                We support sustainable farming practices and work directly with farmers 
                to ensure fair trade and environmental responsibility.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-coffee-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-3">Community</h3>
              <p className="text-coffee-600">
                Coffee brings people together. We're proud to be part of the Sri Lankan 
                coffee community and beyond.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-coffee-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-3">Passion</h3>
              <p className="text-coffee-600">
                Every cup is crafted with love and dedication. Our passion for coffee 
                drives us to constantly improve and innovate.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-coffee-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-3">Global Reach</h3>
              <p className="text-coffee-600">
                While rooted in Sri Lanka, we source the finest beans from coffee 
                regions around the world.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-coffee-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-3">Craftsmanship</h3>
              <p className="text-coffee-600">
                Every roast is carefully monitored and perfected by our skilled 
                roasters who understand the art and science of coffee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-coffee-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-coffee-600">The passionate people behind BeanVoyage</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-coffee-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Coffee className="h-16 w-16 text-coffee-800" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-2">Rohan Silva</h3>
              <p className="text-coffee-600 mb-3">Head Roaster & Co-Founder</p>
              <p className="text-sm text-coffee-500">
                With over 15 years of experience, Rohan brings expertise in coffee roasting 
                and a deep understanding of flavor profiles.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-coffee-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-coffee-800" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-2">Priya Fernando</h3>
              <p className="text-coffee-600 mb-3">Operations Manager</p>
              <p className="text-sm text-coffee-500">
                Priya ensures every aspect of our operations runs smoothly, from sourcing 
                to customer satisfaction.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-coffee-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-16 w-16 text-coffee-800" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-2">Kasun Perera</h3>
              <p className="text-coffee-600 mb-3">Sustainability Coordinator</p>
              <p className="text-sm text-coffee-500">
                Kasun works directly with farmers to ensure sustainable practices and 
                fair trade relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-16 bg-coffee-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Visit Our Roastery</h2>
          <p className="text-xl text-coffee-200 mb-8 max-w-2xl mx-auto">
            Experience the art of coffee roasting firsthand. Visit our roastery on Kandy Road 
            for tours, tastings, and to meet the team behind your favorite coffee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-secondary text-lg px-8 py-3">
              Get Directions
            </a>
            <a href="/products" className="border-2 border-white text-white hover:bg-white hover:text-coffee-800 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Shop Our Coffee
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
