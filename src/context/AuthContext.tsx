'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createSupabaseClient } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if Supabase is configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co'

  const supabase = isSupabaseConfigured ? createSupabaseClient() : null

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Create or update user profile when user signs up or signs in
        if (event === 'SIGNED_IN' && session?.user) {
          // Don't wait for profile creation to avoid blocking login
          createOrUpdateProfile(session.user).catch(err =>
            console.log('Profile creation skipped:', err.message)
          )
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  const createOrUpdateProfile = async (user: User) => {
    if (!supabase) return

    try {
      // Check if profiles table exists by trying to query it
      const { data: existingProfile, error: selectError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      // If table doesn't exist, skip profile creation
      if (selectError && selectError.message.includes('relation "public.profiles" does not exist')) {
        console.log('Profiles table not set up yet, skipping profile creation')
        return
      }

      if (!existingProfile && !selectError) {
        // Create new profile only if table exists and user doesn't have one
        const { error: insertError } = await supabase.from('profiles').insert({
          id: user.id,
          email: user.email!,
          first_name: user.user_metadata?.first_name || null,
          last_name: user.user_metadata?.last_name || null,
          avatar_url: user.user_metadata?.avatar_url || null,
          is_admin: false
        })

        if (insertError) {
          console.log('Could not create profile:', insertError.message)
        }
      }
    } catch (error: any) {
      console.log('Profile creation skipped due to database setup:', error.message)
    }
  }

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { data, error }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
