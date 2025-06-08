'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { createSupabaseClient } from '@/lib/supabase'
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface UserProfile {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  address: string | null
  city: string | null
  postal_code: string | null
  avatar_url: string | null
  created_at: string
  is_admin: boolean
}

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: ''
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }
    
    if (user) {
      loadProfile()
    }
  }, [user, loading, router])

  const loadProfile = async () => {
    if (!user) return

    try {
      const supabase = createSupabaseClient()
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && !error.message.includes('relation "public.profiles" does not exist')) {
        console.error('Error loading profile:', error)
        // Create basic profile from user data
        setProfile({
          id: user.id,
          email: user.email!,
          first_name: user.user_metadata?.first_name || null,
          last_name: user.user_metadata?.last_name || null,
          phone: null,
          address: null,
          city: null,
          postal_code: null,
          avatar_url: user.user_metadata?.avatar_url || null,
          created_at: user.created_at,
          is_admin: false
        })
      } else if (data) {
        setProfile(data)
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          postal_code: data.postal_code || ''
        })
      } else {
        // No profile found, create from user metadata
        setProfile({
          id: user.id,
          email: user.email!,
          first_name: user.user_metadata?.first_name || null,
          last_name: user.user_metadata?.last_name || null,
          phone: null,
          address: null,
          city: null,
          postal_code: null,
          avatar_url: user.user_metadata?.avatar_url || null,
          created_at: user.created_at,
          is_admin: false
        })
        setFormData({
          first_name: user.user_metadata?.first_name || '',
          last_name: user.user_metadata?.last_name || '',
          phone: '',
          address: '',
          city: '',
          postal_code: ''
        })
      }
    } catch (err: any) {
      console.error('Profile loading error:', err)
      // Fallback to user data
      if (user) {
        setProfile({
          id: user.id,
          email: user.email!,
          first_name: user.user_metadata?.first_name || null,
          last_name: user.user_metadata?.last_name || null,
          phone: null,
          address: null,
          city: null,
          postal_code: null,
          avatar_url: user.user_metadata?.avatar_url || null,
          created_at: user.created_at,
          is_admin: false
        })
      }
    }
  }

  const handleSave = async () => {
    if (!user || !profile) return

    setIsSaving(true)
    setError('')
    setSuccess('')

    try {
      const supabase = createSupabaseClient()
      
      const updateData = {
        first_name: formData.first_name || null,
        last_name: formData.last_name || null,
        phone: formData.phone || null,
        address: formData.address || null,
        city: formData.city || null,
        postal_code: formData.postal_code || null,
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email!,
          ...updateData
        })

      if (error && !error.message.includes('relation "public.profiles" does not exist')) {
        throw error
      }

      // Update local state
      setProfile(prev => prev ? { ...prev, ...updateData } : null)
      setIsEditing(false)
      setSuccess('Profile updated successfully!')
      
      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        postal_code: profile.postal_code || ''
      })
    }
    setIsEditing(false)
    setError('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-800"></div>
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-coffee-800 mb-4">Loading Profile...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-coffee-800 mb-2">My Profile</h1>
          <p className="text-coffee-600">Manage your account information and preferences</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700">{success}</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 text-center">
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-coffee-200 rounded-full mx-auto flex items-center justify-center">
                  {profile.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-16 w-16 text-coffee-600" />
                  )}
                </div>
                <button className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 bg-coffee-800 text-white p-2 rounded-full hover:bg-coffee-900 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              {/* Basic Info */}
              <h2 className="text-2xl font-bold text-coffee-800 mb-2">
                {profile.first_name && profile.last_name 
                  ? `${profile.first_name} ${profile.last_name}`
                  : profile.email
                }
              </h2>
              <p className="text-coffee-600 mb-4">{profile.email}</p>
              
              {profile.is_admin && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full mb-4">
                  Admin
                </span>
              )}

              <div className="text-sm text-coffee-500">
                <p className="flex items-center justify-center mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  Member since {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-coffee-800">Profile Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>{isSaving ? 'Saving...' : 'Save'}</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Enter your first name"
                    />
                  ) : (
                    <p className="text-coffee-600 py-2">{profile.first_name || 'Not provided'}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Enter your last name"
                    />
                  ) : (
                    <p className="text-coffee-600 py-2">{profile.last_name || 'Not provided'}</p>
                  )}
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-coffee-400 mr-2" />
                    <p className="text-coffee-600 py-2">{profile.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-coffee-400 mr-2" />
                      <p className="text-coffee-600 py-2">{profile.phone || 'Not provided'}</p>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-coffee-700 mb-1">
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-coffee-400 mr-2" />
                      <p className="text-coffee-600 py-2">{profile.address || 'Not provided'}</p>
                    </div>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Enter your city"
                    />
                  ) : (
                    <p className="text-coffee-600 py-2">{profile.city || 'Not provided'}</p>
                  )}
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">
                    Postal Code
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Enter your postal code"
                    />
                  ) : (
                    <p className="text-coffee-600 py-2">{profile.postal_code || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
