'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Loader2, AlertCircle } from 'lucide-react'

import { account } from '@/lib/appwrite'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function LeadsPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await account.get()
        if (!currentUser) {
          router.push('/login')
        } else {
          setUser(currentUser)
          setLoading(false)
        }
      } catch (err) {
        console.error('Error checking authentication:', err)
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await account.deleteSession('current')
      router.push('/login')
    } catch (err) {
      console.error('Logout error:', err)
      router.push('/login')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[350px]">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Loading Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Please wait while we load your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Header with Logout */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary"></div>
            <span className="font-semibold text-xl">Axis Acquisition CRM</span>
            {user && (
              <span className="ml-4 text-sm text-muted-foreground">
                Welcome back,{' '}
                <span className="font-medium text-foreground">
                  {user.name || user.email}
                </span>
              </span>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Placeholder Content */}
        <div className="flex items-center justify-center py-20">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                Dashboard Under Development
              </CardTitle>
              <CardDescription>
                The leads dashboard is currently being updated.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lead tables and associated components have been temporarily
                removed. Check back soon for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
