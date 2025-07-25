import React, { createContext, useState, useEffect, useCallback } from 'react'
import { 
  SubscriptionPlan, 
  UserSubscription, 
  UserWallet, 
  TokenTransaction, 
  TokenSpendCalculation,
  CampaignOrder,
  SUBSCRIPTION_PLANS,
  TOKEN_COSTS,
  CPM_MAPPING
} from '../types/subscription'
import { useAuth } from '../hooks/useAuth'

interface SubscriptionContextType {
  // Subscription Management
  currentPlan: SubscriptionPlan | null
  subscription: UserSubscription | null
  availablePlans: SubscriptionPlan[]
  
  // Wallet Management
  wallet: UserWallet | null
  
  // Actions
  subscribeToPlan: (planId: string) => Promise<boolean>
  purchaseTokens: (amount: number) => Promise<boolean>
  calculateTokenCost: (campaignParams: any) => TokenSpendCalculation
  spendTokens: (calculation: TokenSpendCalculation, campaignId: string) => Promise<CampaignOrder | null>
  
  // Utilities
  canAfford: (tokenCost: number) => boolean
  getTokenBalance: () => number
  getTransactionHistory: () => TokenTransaction[]
  refreshWallet: () => Promise<void>
}

// eslint-disable-next-line react-refresh/only-export-components
export const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null)
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [wallet, setWallet] = useState<UserWallet | null>(null)

  const canAfford = useCallback((tokenCost: number): boolean => {
    return wallet ? wallet.totalTokens >= tokenCost : false
  }, [wallet])

  const initializeMockData = useCallback(() => {
    // Mock subscription data
    const mockSubscription: UserSubscription = {
      userId: user?.id || 'demo-user',
      planId: 'growth',
      status: 'active',
      currentPeriodStart: new Date(2024, 0, 1),
      currentPeriodEnd: new Date(2024, 1, 1),
      tokensUsedThisCycle: 7500,
      tokensRemainingThisCycle: 20000,
      freeCreativesUsed: 3,
      nextBillingDate: new Date(2024, 1, 1)
    }

    // Mock wallet data
    const mockWallet: UserWallet = {
      userId: user?.id || 'demo-user',
      totalTokens: 20000,
      mediaTokens: 16000,
      creativeTokens: 4000,
      lastUpdated: new Date(),
      transactions: [
        {
          id: 'tx-1',
          userId: user?.id || 'demo-user',
          type: 'earned',
          category: 'subscription',
          amount: 27500,
          description: 'Monthly token allocation - Growth Plan',
          timestamp: new Date(2024, 0, 1)
        },
        {
          id: 'tx-2',
          userId: user?.id || 'demo-user',
          type: 'spent',
          category: 'media',
          amount: -5000,
          description: 'Campaign: Coffee Shop Grand Opening',
          campaignId: 'camp-1',
          timestamp: new Date(2024, 0, 15),
          metadata: {
            impressions: 5000,
            cpmEquivalent: 10,
            mediaSpend: 50
          }
        },
        {
          id: 'tx-3',
          userId: user?.id || 'demo-user',
          type: 'spent',
          category: 'creative',
          amount: -1500,
          description: 'AI Creative Generation - 3 assets',
          timestamp: new Date(2024, 0, 20),
          metadata: {
            creativeType: 'Social Media Posts'
          }
        },
        {
          id: 'tx-4',
          userId: user?.id || 'demo-user',
          type: 'purchased',
          category: 'media',
          amount: 5000,
          description: 'Token Pack Purchase - 5,000 tokens',
          timestamp: new Date(2024, 0, 25)
        }
      ]
    }

    setSubscription(mockSubscription)
    setWallet(mockWallet)
    setCurrentPlan(SUBSCRIPTION_PLANS.find(p => p.id === mockSubscription.planId) || null)
  }, [user])

  // Initialize mock data for demo
  useEffect(() => {
    if (user) {
      initializeMockData()
    }
  }, [user, initializeMockData])

  const subscribeToPlan = async (planId: string): Promise<boolean> => {
    try {
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId)
      if (!plan) return false

      // In real implementation, this would call Stripe API
      const newSubscription: UserSubscription = {
        userId: user?.id || 'demo-user',
        planId,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        tokensUsedThisCycle: 0,
        tokensRemainingThisCycle: plan.tokensIncluded,
        freeCreativesUsed: 0,
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }

      // Update wallet with new tokens
      const newWallet: UserWallet = {
        userId: user?.id || 'demo-user',
        totalTokens: plan.tokensIncluded,
        mediaTokens: Math.floor(plan.tokensIncluded * 0.8),
        creativeTokens: Math.floor(plan.tokensIncluded * 0.2),
        lastUpdated: new Date(),
        transactions: [
          {
            id: `tx-${Date.now()}`,
            userId: user?.id || 'demo-user',
            type: 'earned',
            category: 'subscription',
            amount: plan.tokensIncluded,
            description: `Monthly token allocation - ${plan.name} Plan`,
            timestamp: new Date()
          }
        ]
      }

      setSubscription(newSubscription)
      setWallet(newWallet)
      setCurrentPlan(plan)
      return true
    } catch (error) {
      console.error('Failed to subscribe to plan:', error)
      return false
    }
  }

  const purchaseTokens = async (amount: number): Promise<boolean> => {
    try {
      if (!currentPlan || !wallet) return false

      const cost = amount * currentPlan.alaCarteTokenPrice
      
      // In real implementation, this would process payment
      const newTransaction: TokenTransaction = {
        id: `tx-${Date.now()}`,
        userId: user?.id || 'demo-user',
        type: 'purchased',
        category: 'media',
        amount,
        description: `Token Pack Purchase - ${amount.toLocaleString()} tokens ($${cost.toFixed(2)})`,
        timestamp: new Date()
      }

      const updatedWallet: UserWallet = {
        ...wallet,
        totalTokens: wallet.totalTokens + amount,
        mediaTokens: wallet.mediaTokens + Math.floor(amount * 0.8),
        creativeTokens: wallet.creativeTokens + Math.floor(amount * 0.2),
        lastUpdated: new Date(),
        transactions: [...wallet.transactions, newTransaction]
      }

      setWallet(updatedWallet)
      return true
    } catch (error) {
      console.error('Failed to purchase tokens:', error)
      return false
    }
  }

  const calculateTokenCost = (campaignParams: any): TokenSpendCalculation => {
    const {
      impressions = 1000,
      hasAdvancedTargeting = false,
      hasPriorityQueue = false,
      creativeAssets = 0,
      abVariants = 0
    } = campaignParams

    const mediaTokens = impressions * TOKEN_COSTS.MEDIA_IMPRESSION
    const targetingTokens = hasAdvancedTargeting ? TOKEN_COSTS.ADVANCED_TARGETING : 0
    const priorityTokens = hasPriorityQueue ? TOKEN_COSTS.PRIORITY_QUEUE : 0
    
    // Calculate creative tokens (first 10 are free per user)
    const freeCreativesRemaining = Math.max(0, TOKEN_COSTS.CREATIVE_ASSET.FREE_LIMIT - (subscription?.freeCreativesUsed || 0))
    const paidCreatives = Math.max(0, creativeAssets - freeCreativesRemaining)
    const creativeTokens = paidCreatives * TOKEN_COSTS.CREATIVE_ASSET.MIN + (abVariants * TOKEN_COSTS.AB_VARIANT)

    const totalTokens = mediaTokens + creativeTokens + targetingTokens + priorityTokens
    const estimatedMediaSpend = mediaTokens / CPM_MAPPING.TOKENS_PER_DOLLAR

    const breakdown = [
      { category: 'Media Impressions', tokens: mediaTokens, description: `${impressions.toLocaleString()} impressions` },
      ...(creativeTokens > 0 ? [{ category: 'Creative Assets', tokens: creativeTokens, description: `${creativeAssets} assets + ${abVariants} variants` }] : []),
      ...(targetingTokens > 0 ? [{ category: 'Advanced Targeting', tokens: targetingTokens, description: 'Radius & demographic targeting' }] : []),
      ...(priorityTokens > 0 ? [{ category: 'Priority Queue', tokens: priorityTokens, description: 'Faster campaign processing' }] : [])
    ]

    return {
      mediaTokens,
      creativeTokens,
      targetingTokens,
      priorityTokens,
      totalTokens,
      estimatedImpressions: impressions,
      estimatedMediaSpend,
      breakdown
    }
  }

  const spendTokens = async (calculation: TokenSpendCalculation, campaignId: string): Promise<CampaignOrder | null> => {
    try {
      if (!wallet || !canAfford(calculation.totalTokens)) {
        return null
      }

      // Create campaign order
      const order: CampaignOrder = {
        id: `order-${Date.now()}`,
        userId: user?.id || 'demo-user',
        campaignId,
        tokensSpent: calculation,
        status: 'pending',
        createdAt: new Date()
      }

      // Create transaction
      const transaction: TokenTransaction = {
        id: `tx-${Date.now()}`,
        userId: user?.id || 'demo-user',
        type: 'spent',
        category: 'media',
        amount: -calculation.totalTokens,
        description: `Campaign Launch: ${campaignId}`,
        campaignId,
        timestamp: new Date(),
        metadata: {
          impressions: calculation.estimatedImpressions,
          cpmEquivalent: CPM_MAPPING.DEFAULT_CPM,
          mediaSpend: calculation.estimatedMediaSpend
        }
      }

      // Update wallet
      const updatedWallet: UserWallet = {
        ...wallet,
        totalTokens: wallet.totalTokens - calculation.totalTokens,
        mediaTokens: wallet.mediaTokens - calculation.mediaTokens,
        creativeTokens: wallet.creativeTokens - calculation.creativeTokens,
        lastUpdated: new Date(),
        transactions: [...wallet.transactions, transaction]
      }

      // Update subscription usage
      if (subscription) {
        const updatedSubscription: UserSubscription = {
          ...subscription,
          tokensUsedThisCycle: subscription.tokensUsedThisCycle + calculation.totalTokens,
          tokensRemainingThisCycle: subscription.tokensRemainingThisCycle - calculation.totalTokens
        }
        setSubscription(updatedSubscription)
      }

      setWallet(updatedWallet)
      return order
    } catch (error) {
      console.error('Failed to spend tokens:', error)
      return null
    }
  }



  const getTokenBalance = (): number => {
    return wallet?.totalTokens || 0
  }

  const getTransactionHistory = (): TokenTransaction[] => {
    return wallet?.transactions || []
  }

  const refreshWallet = async (): Promise<void> => {
    // In real implementation, this would fetch from API
    if (user) {
      initializeMockData()
    }
  }

  const value: SubscriptionContextType = {
    currentPlan,
    subscription,
    availablePlans: SUBSCRIPTION_PLANS,
    wallet,
    subscribeToPlan,
    purchaseTokens,
    calculateTokenCost,
    spendTokens,
    canAfford,
    getTokenBalance,
    getTransactionHistory,
    refreshWallet
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}