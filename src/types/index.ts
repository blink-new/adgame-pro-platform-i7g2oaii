export interface User {
  id: string
  email: string
  displayName?: string
  avatar?: string
  subscription?: SubscriptionTier
}

export interface Campaign {
  id: string
  name: string
  status: 'draft' | 'active' | 'paused' | 'completed'
  industry: Industry
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  roi: number
  goal: CampaignGoal
  progress: number
  createdAt: string
  updatedAt: string
  userId: string
}

export interface CampaignGoal {
  type: 'leads' | 'sales' | 'traffic' | 'awareness'
  target: number
  current: number
  deadline: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
  progress: number
  maxProgress: number
}

export interface Industry {
  id: string
  name: string
  icon: string
  templates: CampaignTemplate[]
}

export interface CampaignTemplate {
  id: string
  name: string
  description: string
  industry: string
  estimatedBudget: number
  expectedRoi: number
  duration: number
}

export interface SubscriptionTier {
  id: string
  name: string
  price: number
  features: string[]
  campaignLimit: number
  aiCredits: number
}

export interface PerformanceMetric {
  label: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  format: 'currency' | 'percentage' | 'number'
}