export interface SubscriptionPlan {
  id: string
  name: string
  monthlyFee: number
  tokensIncluded: number
  costPerToken: number
  alaCarteTokenPrice: number
  features: string[]
  isPopular?: boolean
}

export interface TokenTransaction {
  id: string
  userId: string
  type: 'earned' | 'spent' | 'purchased'
  category: 'media' | 'creative' | 'targeting' | 'priority' | 'subscription'
  amount: number
  description: string
  campaignId?: string
  timestamp: Date
  metadata?: {
    impressions?: number
    cpmEquivalent?: number
    mediaSpend?: number
    creativeType?: string
    targetingOptions?: string[]
  }
}

export interface UserWallet {
  userId: string
  totalTokens: number
  mediaTokens: number
  creativeTokens: number
  lastUpdated: Date
  transactions: TokenTransaction[]
}

export interface UserSubscription {
  userId: string
  planId: string
  status: 'active' | 'cancelled' | 'past_due' | 'trialing'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  tokensUsedThisCycle: number
  tokensRemainingThisCycle: number
  freeCreativesUsed: number
  nextBillingDate: Date
  pendingPlanChange?: string
}

export interface TokenSpendCalculation {
  mediaTokens: number
  creativeTokens: number
  targetingTokens: number
  priorityTokens: number
  totalTokens: number
  estimatedImpressions: number
  estimatedMediaSpend: number
  breakdown: {
    category: string
    tokens: number
    description: string
  }[]
}

export interface CampaignOrder {
  id: string
  userId: string
  campaignId: string
  tokensSpent: TokenSpendCalculation
  status: 'pending' | 'processing' | 'active' | 'completed' | 'failed'
  createdAt: Date
  fulfillmentData?: {
    mediaSpendAllocated: number
    impressionsDelivered: number
    platformsUsed: string[]
    cpmAchieved: number
  }
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyFee: 150,
    tokensIncluded: 15000,
    costPerToken: 0.01,
    alaCarteTokenPrice: 0.015,
    features: [
      'Perfect for single locations',
      'All-inclusive pricing',
      'Meta & Google Ads',
      'AI creative generation',
      'Basic analytics',
      'Email support'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyFee: 275,
    tokensIncluded: 27500,
    costPerToken: 0.01,
    alaCarteTokenPrice: 0.012,
    isPopular: true,
    features: [
      'Most popular choice',
      'All-inclusive pricing',
      'Multi-platform advertising',
      'Advanced AI features',
      'A/B testing & optimization',
      'Priority support',
      'Advanced analytics'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyFee: 500,
    tokensIncluded: 50000,
    costPerToken: 0.01,
    alaCarteTokenPrice: 0.010,
    features: [
      'For established franchises',
      'All-inclusive pricing',
      'Premium ad placements',
      'Custom creative templates',
      'Dedicated account manager',
      'Priority queue processing',
      'Custom reporting & API'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyFee: 0, // Custom pricing
    tokensIncluded: 0, // Custom
    costPerToken: 0, // Custom
    alaCarteTokenPrice: 0, // Custom
    features: [
      'Custom for 300+ locations',
      'Volume pricing discounts',
      'White-label platform',
      'Dedicated success team',
      'Custom integrations',
      'SLA guarantees',
      'Advanced security & compliance'
    ]
  }
]

export const TOKEN_COSTS = {
  MEDIA_IMPRESSION: 1, // 1 token = 1 impression
  CREATIVE_ASSET: {
    MIN: 500,
    MAX: 2000,
    FREE_LIMIT: 10
  },
  AB_VARIANT: 250,
  ADVANCED_TARGETING: 500,
  PRIORITY_QUEUE: 1000
}

export const CPM_MAPPING = {
  TOKENS_PER_DOLLAR: 100, // 1000 tokens = $10 CPM = $10 media spend
  DEFAULT_CPM: 10
}