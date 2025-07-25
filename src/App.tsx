import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthProvider } from '@/contexts/AuthProvider'
import { BusinessProvider } from '@/contexts/BusinessContext'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'
import { useAuth } from '@/hooks/useAuth'
import Homepage from '@/components/homepage/Homepage'
import LandingPage from '@/components/landing/LandingPage'
import { LoginPage } from '@/components/auth/LoginPage'
import { Sidebar } from '@/components/layout/Sidebar'
import { Dashboard } from '@/components/dashboard/Dashboard'
import CampaignBuilder from '@/components/campaign/CampaignBuilder'
import PaymentPage from '@/components/payment/PaymentPage'
import AICreativeStudio from '@/components/ai/AICreativeStudio'
import { TokenDashboard } from '@/components/dashboard/TokenDashboard'
import { BrandCompliance } from '@/components/brand/BrandCompliance'
import BusinessROIAnalytics from '@/components/analytics/BusinessROIAnalytics'
import DynamicTemplates from '@/components/templates/DynamicTemplates'
import { WalletDashboard } from '@/components/wallet/WalletDashboard'
import { Toaster } from '@/components/ui/toaster'

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showPaymentPage, setShowPaymentPage] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setShowPaymentPage(false) // Reset payment page when switching tabs
  }

  const handleGetStarted = () => {
    setShowLogin(true)
  }

  const handleLogin = () => {
    setShowLogin(false)
  }

  // Set showLogin to true when user logs out
  React.useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      // User is not authenticated and not loading, show login page
      setShowLogin(true)
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  // Show landing page first for unauthenticated users (only on initial load)
  if (!isAuthenticated && !showLogin) {
    return <LandingPage onGetStarted={handleGetStarted} onSignIn={handleGetStarted} />
  }

  // Show login page when user clicks get started or after logout
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'tokens':
        return <TokenDashboard />
      case 'campaigns':
        return showPaymentPage ? (
          <PaymentPage onBack={() => setShowPaymentPage(false)} />
        ) : (
          <CampaignBuilder onLaunchCampaign={() => setShowPaymentPage(true)} />
        )
      case 'ai-creative':
        return <AICreativeStudio />
      case 'templates':
        return <DynamicTemplates />
      case 'brand-center':
        return <BrandCompliance />
      case 'analytics':
        return <BusinessROIAnalytics />
      case 'subscription':
        return <WalletDashboard />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="ml-64 min-h-screen">
        <div className="container mx-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Toaster />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <BusinessProvider>
          <AppContent />
        </BusinessProvider>
      </SubscriptionProvider>
    </AuthProvider>
  )
}

export default App