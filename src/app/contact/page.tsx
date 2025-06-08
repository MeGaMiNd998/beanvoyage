'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Globe, Instagram, Clock, Send, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-coffee-800 mb-4">Get In Touch</h1>
          <p className="text-xl text-coffee-600 max-w-2xl mx-auto">
            Have a question about our coffee or want to learn more about BeanVoyage? 
            We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-coffee-800 mb-6">Contact Information</h2>
              <p className="text-coffee-600 mb-8">
                Visit our roastery, give us a call, or drop us a message. We're here to help 
                you discover the perfect coffee experience.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-coffee-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-coffee-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-coffee-800 mb-1">Address</h3>
                  <p className="text-coffee-600">
                    BeanVoyage Roastery & HQ<br />
                    45 Kandy Road<br />
                    Colombo 07, Sri Lanka
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-coffee-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-coffee-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-coffee-800 mb-1">Phone</h3>
                  <a 
                    href="tel:+94112345678" 
                    className="text-coffee-600 hover:text-coffee-800 transition-colors"
                  >
                    +94 11 234 5678
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-coffee-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-coffee-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-coffee-800 mb-1">Email</h3>
                  <a 
                    href="mailto:hello@beanvoyage.com" 
                    className="text-coffee-600 hover:text-coffee-800 transition-colors"
                  >
                    hello@beanvoyage.com
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start space-x-4">
                <div className="bg-coffee-100 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-coffee-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-coffee-800 mb-1">Website</h3>
                  <a 
                    href="https://www.beanvoyage.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-coffee-600 hover:text-coffee-800 transition-colors"
                  >
                    www.beanvoyage.com
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start space-x-4">
                <div className="bg-coffee-100 p-3 rounded-lg">
                  <Instagram className="h-6 w-6 text-coffee-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-coffee-800 mb-1">Instagram</h3>
                  <a 
                    href="https://instagram.com/beanvoyagecoffee" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-coffee-600 hover:text-coffee-800 transition-colors"
                  >
                    @beanvoyagecoffee
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-coffee-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-coffee-800" />
                <h3 className="text-xl font-semibold text-coffee-800">Business Hours</h3>
              </div>
              <div className="space-y-2 text-coffee-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>7:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <MessageCircle className="h-6 w-6 text-coffee-800" />
              <h2 className="text-2xl font-bold text-coffee-800">Send us a Message</h2>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="text-green-800 font-semibold mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-700">
                    Thank you for contacting BeanVoyage. We'll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="wholesale">Wholesale Orders</option>
                    <option value="coffee-consultation">Coffee Consultation</option>
                    <option value="roastery-visit">Roastery Visit</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Tell us about your coffee needs or ask us anything..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-coffee-800 mb-8 text-center">Visit Our Roastery</h2>
          <div className="card overflow-hidden">
            <div className="bg-coffee-100 p-8 text-center">
              <MapPin className="h-12 w-12 text-coffee-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-coffee-800 mb-2">BeanVoyage Roastery & HQ</h3>
              <p className="text-coffee-600 mb-4">45 Kandy Road, Colombo 07, Sri Lanka</p>
              <p className="text-coffee-600 mb-6">
                Come visit our roastery to see our coffee-making process, enjoy fresh brews, 
                and learn about our journey from bean to cup.
              </p>
              <a
                href="https://maps.google.com/?q=45+Kandy+Road+Colombo+07+Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <MapPin className="h-5 w-5" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
