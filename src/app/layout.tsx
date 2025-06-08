import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BeanVoyage - Premium Coffee & More',
  description: 'Discover our premium coffee selection, freshly roasted beans, and delicious treats from BeanVoyage Roastery.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-gold-50">
              <Navbar />
              <main>{children}</main>
              <footer className="bg-coffee-800 text-white py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                  <p>&copy; 2024 BeanVoyage. All rights reserved.</p>
                  <p className="mt-2 text-coffee-200">Brewing happiness, one cup at a time.</p>
                </div>
              </footer>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
