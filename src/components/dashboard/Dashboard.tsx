import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target,
  Plus,
  Zap,
  Trophy,
  Sparkles,
  Rocket,
  Star,
  TrendingDown,
  BarChart3,
  Activity,
  Award,
  Coffee,
  MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { StatsCard } from './StatsCard'
import { CampaignCard } from './CampaignCard'
import { Campaign, Achievement } from '@/types'
import { blink } from '@/blink/client'

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Home Services Boost',
    status: 'active',
    industry: { id: 'home', name: 'Home Services', icon: '🏠', templates: [] },
    budget: 5000,
    spent: 3200,
    impressions: 45000,
    clicks: 1200,
    conversions: 48,
    roi: 180,
    goal: { type: 'leads', target: 100, current: 48, deadline: '2024-08-31' },
    progress: 48,
    createdAt: '2024-07-01',
    updatedAt: '2024-07-20',
    userId: 'user1'
  },
  {
    id: '2',
    name: 'Restaurant Weekend Special',
    status: 'active',
    industry: { id: 'restaurant', name: 'Restaurant', icon: '🍕', templates: [] },
    budget: 2000,
    spent: 800,
    impressions: 28000,
    clicks: 850,
    conversions: 32,
    roi: 220,
    goal: { type: 'sales', target: 50, current: 32, deadline: '2024-07-31' },
    progress: 64,
    createdAt: '2024-07-15',
    updatedAt: '2024-07-20',
    userId: 'user1'
  }
]

export function Dashboard() {
  const [user, setUser] = useState(null)
  const [campaigns] = useState(mockCampaigns)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0)
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0)
  const avgRoi = campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length

  // Calculate revenue generated (assuming average customer value)
  const avgCustomerValue = 150 // This could be dynamic based on industry
  const revenueGenerated = totalConversions * avgCustomerValue

  // Calculate budget usage percentage
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0)
  const budgetUsagePercent = (totalSpent / totalBudget) * 100

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome back, {user.displayName?.split(' ')[0] || 'Champion'}! 🎉
          </h1>
          <p className="text-gray-600 text-lg">
            Your campaigns are crushing it today
          </p>
        </motion.div>

        {/* Key Stats - Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Revenue Generated */}
          <Card className="enhanced-card bg-white border-0 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/10" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/50 rounded-full -mr-12 -mt-12" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
                  <Rocket className="h-6 w-6 text-emerald-600" />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  +24.5%
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-emerald-600">
                  ${revenueGenerated.toLocaleString()}
                </div>
                <p className="text-sm font-medium text-emerald-700">Revenue Generated</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>From ${totalSpent.toLocaleString()} invested</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ROI */}
          <Card className="enhanced-card bg-white border-0 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/10" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/50 rounded-full -mr-12 -mt-12" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  Excellent
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">{avgRoi.toFixed(1)}%</div>
                <p className="text-sm font-medium text-blue-700">Average ROI</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Activity className="h-3 w-3" />
                  <span>Above industry avg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Customers */}
          <Card className="enhanced-card bg-white border-0 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/10" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100/50 rounded-full -mr-12 -mt-12" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                  +15.3%
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-purple-600">{totalConversions}</div>
                <p className="text-sm font-medium text-purple-700">New Customers</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Star className="h-3 w-3" />
                  <span>This month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ad Spend Efficiency - Redesigned */}
          <Card className="enhanced-card bg-gradient-to-br from-amber-50 to-orange-50 border-0 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-800 mb-2">
                Smart Spending 💰
              </h3>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-amber-700">
                  ${totalSpent.toLocaleString()}
                </div>
                <p className="text-sm text-amber-600">
                  of ${totalBudget.toLocaleString()} allocated
                </p>
                <Badge className="bg-amber-200 text-amber-800 px-3 py-1">
                  {budgetUsagePercent.toFixed(0)}% Utilized
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-2xl font-serif font-bold mb-6 text-gray-800">What would you like to do?</h2>
          <div className="grid gap-4 md:grid-cols-3 max-w-3xl mx-auto">
            <Button 
              size="lg" 
              className="h-24 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 enhanced-card border-0"
            >
              <div className="flex flex-col items-center gap-3">
                <Plus className="h-7 w-7" />
                <div className="text-center">
                  <div className="font-semibold">New Campaign</div>
                  <div className="text-xs opacity-90">Launch in minutes</div>
                </div>
              </div>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-24 border-2 border-purple-200 hover:bg-purple-50 enhanced-card transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-3">
                <Sparkles className="h-7 w-7 text-purple-600" />
                <div className="text-center">
                  <div className="font-semibold text-purple-700">AI Studio</div>
                  <div className="text-xs text-purple-600">Create with AI</div>
                </div>
              </div>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-24 border-2 border-blue-200 hover:bg-blue-50 enhanced-card transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-3">
                <TrendingUp className="h-7 w-7 text-blue-600" />
                <div className="text-center">
                  <div className="font-semibold text-blue-700">Analytics</div>
                  <div className="text-xs text-blue-600">Track performance</div>
                </div>
              </div>
            </Button>
          </div>
        </motion.div>

        {/* Active Campaigns - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="enhanced-card bg-white border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-serif flex items-center justify-center gap-3">
                <Zap className="h-6 w-6 text-purple-600" />
                Your Active Campaigns
                <Badge className="bg-purple-100 text-purple-700">{activeCampaigns} Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
              {campaigns.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No campaigns yet</h3>
                  <p className="text-gray-500 mb-6">Ready to launch your first campaign?</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white enhanced-card">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Campaign
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievement Badge - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Card className="max-w-md mx-auto enhanced-card bg-gradient-to-br from-yellow-50 to-orange-50 border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-yellow-800 mb-2">You're Crushing It! 🏆</h3>
              <p className="text-sm text-yellow-700 mb-4">
                Your ROI is 40% above industry average
              </p>
              <Badge className="bg-yellow-200 text-yellow-800 px-4 py-1">
                Top Performer
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}