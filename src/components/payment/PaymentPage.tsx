import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Zap, Shield, Star, CreditCard, Sparkles } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'

interface PendingCampaign {
  name: string
  industry: string
  platform: string
  package: string
  budget: number
  startDate: string
  endDate: string
  objective: string
  targetAudience: string
}

export default function PaymentPage({ onBack }: { onBack: () => void }) {
  const [pendingCampaign, setPendingCampaign] = useState<PendingCampaign | null>(null)
  const [isSubscription, setIsSubscription] = useState(true)

  useEffect(() => {
    const campaignData = localStorage.getItem('pendingCampaign')
    if (campaignData) {
      setPendingCampaign(JSON.parse(campaignData))
    }
  }, [])

  const calculateCosts = () => {
    if (!pendingCampaign) return { platformFee: 0, managementFee: 0, adSpend: 0, total: 0 }

    const adSpend = pendingCampaign.budget
    const platformFee = isSubscription ? 120 : 50
    const managementFee = Math.round(adSpend * 0.1)
    const total = platformFee + managementFee + adSpend

    return { platformFee, managementFee, adSpend, total }
  }

  const costs = calculateCosts()

  const handlePayment = () => {
    console.log('Processing payment:', { isSubscription, campaign: pendingCampaign, costs })
  }

  if (!pendingCampaign) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">No Campaign Selected</h2>
          <p className="text-gray-500">Please create a campaign first.</p>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Campaigns
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button variant="ghost" onClick={onBack} className="text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Launch Your Campaign
            </h1>
            <p className="text-gray-600">Ready to boost "{pendingCampaign.name}"?</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Campaign & Pricing */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Campaign Summary */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  {pendingCampaign.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Budget</span>
                  <span className="text-2xl font-bold text-purple-600">
                    ${pendingCampaign.budget.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Platform</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Meta Ads
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Objective</span>
                  <span className="capitalize font-medium">
                    {pendingCampaign.objective.replace('-', ' ')}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Toggle */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {isSubscription ? 'Monthly Subscription' : 'One-Time Campaign'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isSubscription ? 'Unlimited campaigns + better rates' : 'Single campaign launch'}
                    </p>
                  </div>
                  <Switch
                    checked={isSubscription}
                    onCheckedChange={setIsSubscription}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing Breakdown */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-lg">Investment Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Ad Spend</span>
                  <span className="font-semibold">${costs.adSpend.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isSubscription ? 'Platform Access' : 'Campaign Setup'}</span>
                  <span className="font-semibold">${costs.platformFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Management (10%)</span>
                  <span className="font-semibold">${costs.managementFee}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total {isSubscription ? 'Monthly' : ''}</span>
                  <span className="text-purple-600">${costs.total.toLocaleString()}</span>
                </div>
                {isSubscription && (
                  <div className="text-center text-sm text-green-600 font-medium">
                    Save $30/month vs one-time campaigns
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Benefits & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Main Benefits */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">What You Get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold">AI-Powered Optimization</div>
                    <div className="text-sm text-gray-600">Smart targeting & budget allocation</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Brand Protection</div>
                    <div className="text-sm text-gray-600">Automatic compliance checking</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Expert Support</div>
                    <div className="text-sm text-gray-600">Professional guidance included</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Perks */}
            {isSubscription && (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Subscription Perks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Unlimited campaigns</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Advanced AI features</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>25% better rates</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <div className="space-y-4">
              <Button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg font-semibold shadow-lg"
                size="lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {isSubscription ? 'Start Subscription' : 'Launch Campaign'}
              </Button>
              
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  Secure payment by Stripe
                </div>
                <div className="text-xs text-green-600 font-medium">
                  30-day money-back guarantee
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}