'use client'

import { useState, useEffect, useCallback } from 'react'
import { account, ID } from '@/lib/appwrite'
import { useRouter } from 'next/navigation'
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  AlertCircle,
  Loader2,
} from 'lucide-react'

const LoginPage = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [sendingRequest, setSendingRequest] = useState(false)

  const checkSession = useCallback(async () => {
    try {
      const user = await account.get()
      setLoggedInUser(user)
      router.push('/leads')
    } catch (error) {
      console.error('No active session:', error)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const login = async (email: string, password: string) => {
    try {
      setSendingRequest(true)
      setError(null)
      await account.createEmailPasswordSession(email, password)
      const user = await account.get()
      if (!user.emailVerification) {
        throw new Error('Email not verified')
      }
      setLoggedInUser(user)
      router.push('/leads')
    } catch (error) {
      console.error('Login failed:', error)
      setError(
        error instanceof Error
          ? error.message
          : 'Login failed. Please try again.',
      )
    } finally {
      setSendingRequest(false)
    }
  }

  const register = async () => {
    try {
      setSendingRequest(true)
      setError(null)
      await account.create(ID.unique(), email, password, name)
      await login(email, password)
    } catch (error) {
      console.error('Registration failed:', error)
      setError(
        error instanceof Error
          ? error.message
          : 'Registration failed. Please try again.',
      )
    } finally {
      setSendingRequest(false)
    }
  }

  const logout = async () => {
    try {
      await account.deleteSession('current')
      setLoggedInUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
      setError(
        error instanceof Error
          ? error.message
          : 'Logout failed. Please try again.',
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-600 dark:text-neutral-400" />
          <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (loggedInUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
            Welcome Back!
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            You are logged in as{' '}
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {loggedInUser.name || loggedInUser.email}
            </span>
          </p>
          <button
            type="button"
            onClick={logout}
            className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-3 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:ring-offset-2"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-neutral-700 dark:text-neutral-300" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            {isRegistering ? 'Create Account' : 'Sign in'}
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-400 p-4 rounded-xl mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        <form className="space-y-5">
          {isRegistering && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400 dark:text-neutral-500" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:border-transparent transition-all duration-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400 dark:text-neutral-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:border-transparent transition-all duration-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400 dark:text-neutral-500" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:border-transparent transition-all duration-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-2">
            {isRegistering ? (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={register}
                  disabled={sendingRequest || !email || !password || !name}
                  className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-3 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                >
                  {sendingRequest ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>

                <div className="text-center">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsRegistering(false)
                        setError(null)
                      }}
                      className="text-neutral-900 dark:text-neutral-100 hover:text-neutral-700 dark:hover:text-neutral-300 focus:outline-none font-medium transition ease-in-out duration-150"
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => login(email, password)}
                  disabled={sendingRequest || !email || !password}
                  className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-3 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                >
                  {sendingRequest ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <div className="text-center">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsRegistering(true)
                        setError(null)
                      }}
                      className="text-neutral-900 dark:text-neutral-100 hover:text-neutral-700 dark:hover:text-neutral-300 focus:outline-none font-medium transition ease-in-out duration-150"
                    >
                      Create one here
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
