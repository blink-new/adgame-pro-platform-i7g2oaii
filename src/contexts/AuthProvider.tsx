import { useState, useEffect, ReactNode } from 'react'
import { AuthContext } from './auth-context'
import { User, AuthContextType } from '@/types/auth'
import { blink } from '@/blink/client'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      if (state.user) {
        setUser({
          id: state.user.id,
          email: state.user.email,
          displayName: state.user.displayName,
          avatar: state.user.avatar,
          provider: 'email', // Default, would be determined by actual auth
          leadsieConnected: false,
          facebookAdAccounts: []
        })
      } else {
        setUser(null)
      }
      setIsLoading(state.isLoading)
    })

    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would call the actual auth service
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: 'user_' + Date.now(),
        email,
        displayName: email.split('@')[0],
        provider: 'email',
        leadsieConnected: false,
        facebookAdAccounts: []
      }
      setUser(mockUser)
    } catch (error) {
      throw new Error('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would integrate with Google OAuth
      const mockUser: User = {
        id: 'google_' + Date.now(),
        email: 'user@gmail.com',
        displayName: 'Google User',
        avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
        provider: 'google',
        leadsieConnected: false,
        facebookAdAccounts: []
      }
      setUser(mockUser)
    } catch (error) {
      throw new Error('Google login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithFacebook = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would integrate with Facebook OAuth
      const mockUser: User = {
        id: 'facebook_' + Date.now(),
        email: 'user@facebook.com',
        displayName: 'Facebook User',
        avatar: 'https://graph.facebook.com/me/picture?type=large',
        provider: 'facebook',
        leadsieConnected: false,
        facebookAdAccounts: []
      }
      setUser(mockUser)
    } catch (error) {
      throw new Error('Facebook login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      // For demo purposes, we'll just clear the user state
      // In a real app, this would call the actual auth service
      setUser(null)
      // Small delay to ensure state updates properly
      await new Promise(resolve => setTimeout(resolve, 100))
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const connectLeadsie = async () => {
    if (!user) return
    
    setIsLoading(true)
    try {
      // Simulate Leadsie API integration
      const mockAdAccounts = [
        { id: 'act_123456789', name: 'Main Business Account', accountId: '123456789' },
        { id: 'act_987654321', name: 'Secondary Account', accountId: '987654321' }
      ]

      const updatedUser = {
        ...user,
        leadsieConnected: true,
        facebookAdAccounts: mockAdAccounts
      }
      
      setUser(updatedUser)
    } catch (error) {
      throw new Error('Leadsie connection failed')
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    connectLeadsie,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}