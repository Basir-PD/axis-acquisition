'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { Models } from 'appwrite'
import { account, authHelpers, UserProfile, UserRole, ID } from '@/lib/appwrite'

interface AuthContextType {
  user: Models.User<Models.Preferences> | null
  profile: UserProfile | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  isAdmin: boolean
  isManager: boolean
  isClient: boolean
  hasRole: (roles: UserRole[]) => boolean
}

interface SignUpData {
  email: string
  password: string
  name: string
  company?: string
  phone?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadUserProfile = useCallback(async (userId: string) => {
    const userProfile = await authHelpers.getUserProfile(userId)
    setProfile(userProfile)
  }, [])

  const checkSession = useCallback(async () => {
    try {
      setLoading(true)
      const currentUser = await authHelpers.getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        await loadUserProfile(currentUser.$id)
      }
    } catch {
      setUser(null)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }, [loadUserProfile])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      await account.createEmailPasswordSession(email, password)
      const currentUser = await account.get()
      setUser(currentUser)
      await loadUserProfile(currentUser.$id)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Sign in failed. Please try again.'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (data: SignUpData) => {
    try {
      setError(null)
      setLoading(true)

      // Create Appwrite account
      const newUser = await account.create(
        ID.unique(),
        data.email,
        data.password,
        data.name,
      )

      // Create session
      await account.createEmailPasswordSession(data.email, data.password)

      // Create user profile in database with 'client' role
      const userProfile = await authHelpers.createUserProfile({
        userId: newUser.$id,
        email: data.email,
        name: data.name,
        role: 'client',
        company: data.company,
        phone: data.phone,
      })

      setUser(newUser)
      setProfile(userProfile)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Sign up failed. Please try again.'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      await account.deleteSession('current')
      setUser(null)
      setProfile(null)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Sign out failed. Please try again.'
      setError(message)
      throw err
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.$id)
    }
  }

  const hasRole = (roles: UserRole[]): boolean => {
    return authHelpers.hasRole(profile, roles)
  }

  const value: AuthContextType = {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    refreshProfile,
    isAdmin: authHelpers.isAdmin(profile),
    isManager: authHelpers.hasRole(profile, ['manager']),
    isClient: authHelpers.hasRole(profile, ['client']),
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
