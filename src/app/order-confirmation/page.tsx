import Link from 'next/link'
import { CheckCircle, Coffee, Home, Package } from 'lucide-react'

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-coffee-800 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-coffee-600">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details */}
          <div className="card p-8 mb-8 text-left">
            <h2 className="text-2xl font-bold text-coffee-800 mb-6 text-center">Order Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-coffee-800 mb-2">Order Number</h3>
                <p className="text-coffee-600">#CF-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-coffee-800 mb-2">Estimated Delivery</h3>
                <p className="text-coffee-600">3-5 business days</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-coffee-800 mb-2">Payment Method</h3>
                <p className="text-coffee-600">Credit Card (Demo)</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-coffee-800 mb-2">Order Status</h3>
                <p className="text-green-600 font-semibold">Confirmed</p>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-coffee-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-coffee-800 mb-6">What's Next?</h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Package className="h-12 w-12 text-coffee-600 mx-auto mb-4" />
                <h3 className="font-semibold text-coffee-800 mb-2">Processing</h3>
                <p className="text-coffee-600 text-sm">We'll prepare your order with care</p>
              </div>
              
              <div>
                <Coffee className="h-12 w-12 text-coffee-600 mx-auto mb-4" />
                <h3 className="font-semibold text-coffee-800 mb-2">Roasting</h3>
                <p className="text-coffee-600 text-sm">Fresh roasted just for you</p>
              </div>
              
              <div>
                <Home className="h-12 w-12 text-coffee-600 mx-auto mb-4" />
                <h3 className="font-semibold text-coffee-800 mb-2">Delivery</h3>
                <p className="text-coffee-600 text-sm">Delivered fresh to your door</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary text-lg px-8 py-3">
              Continue Shopping
            </Link>
            <Link href="/" className="btn-secondary text-lg px-8 py-3">
              Back to Home
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-coffee-600">
            <p className="mb-2">
              Questions about your order? Contact us at{' '}
              <a href="mailto:hello@beanvoyage.com" className="text-coffee-800 hover:underline">
                hello@beanvoyage.com
              </a>
            </p>
            <p>or call us at +94 11 234 5678</p>
          </div>
        </div>
      </div>
    </div>
  )
}
