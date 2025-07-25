import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  Users, 
  Shield, 
  Zap,
  ArrowRight,
  Play,
  Heart,
  MessageCircle,
  Share,
  Star
} from 'lucide-react'

interface HomepageProps {
  onGetStarted: () => void
}

const creativeOfTheWeek = [
  {
    id: 1,
    industry: 'Auto',
    business: 'Elite Motors',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop',
    headline: '2024 Model Clearance!',
    description: 'Up to $8,000 off select vehicles',
    engagement: '2.4K',
    style: 'Viral'
  },
  {
    id: 2,
    industry: 'Medical',
    business: 'Smile Studio',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=400&fit=crop',
    headline: 'Transform Your Smile',
    description: 'Free consultation this month',
    engagement: '1.8K',
    style: 'Professional'
  },
  {
    id: 3,
    industry: 'QSR',
    business: 'Burger Palace',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
    headline: 'BOGO Burger Tuesdays!',
    description: 'Every Tuesday this summer',
    engagement: '3.2K',
    style: 'Viral'
  },
  {
    id: 4,
    industry: 'Real Estate',
    business: 'Premier Realty',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop',
    headline: '$599,000',
    description: '3 bed • 2 bath • 1,850 sqft',
    engagement: '1.5K',
    style: 'Professional'
  },
  {
    id: 5,
    industry: 'Home Services',
    business: 'Pro Plumbing',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop',
    headline: '24/7 Emergency Service',
    description: 'Same day repairs guaranteed',
    engagement: '892',
    style: 'Friendly'
  }
]

export default function Homepage({ onGetStarted }: HomepageProps) {
  const [audienceType, setAudienceType] = useState<'franchise' | 'brand'>('franchise')

  const CreativeCard = ({ creative }: { creative: typeof creativeOfTheWeek[0] }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={creative.image} 
          alt={creative.headline}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="text-lg sm:text-xl font-bold mb-1">{creative.headline}</div>
          <div className="text-sm opacity-90">{creative.description}</div>
        </div>
        <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900 hover:bg-white">
          {creative.style}
        </Badge>
        <Badge className="absolute top-3 right-3 bg-purple-600 hover:bg-purple-700">
          {creative.industry}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-gray-900">{creative.business}</div>
          <div className="flex items-center space-x-3 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{creative.engagement}</span>
            </div>
            <MessageCircle className="w-4 h-4" />
            <Share className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
          {/* Adoption Incentive Banner */}
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 text-base sm:text-lg font-semibold animate-pulse">
              🎉 $0 Sign-up for 3 Months - Limited Time!
            </Badge>
          </div>

          {/* Audience Toggle */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <Tabs value={audienceType} onValueChange={(value) => setAudienceType(value as 'franchise' | 'brand')} className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="franchise" className="text-sm sm:text-base">Franchise Owners</TabsTrigger>
                <TabsTrigger value="brand" className="text-sm sm:text-base">Brand Partners</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <TabsContent value="franchise" className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Turn Advertising Into Your
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Favorite Game</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Earn tokens, climb leaderboards, and win rewards while growing your business with Meta ads. 
              It's like investing, but for advertising - simple, fun, and profitable.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-purple-100">
                <div className="text-3xl mb-3">🎮</div>
                <div className="font-semibold text-gray-900 mb-2">Gamified Experience</div>
                <div className="text-sm text-gray-600">Earn 1 token per $100 spent. Compete with other franchise owners!</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-blue-100">
                <div className="text-3xl mb-3">🏆</div>
                <div className="font-semibold text-gray-900 mb-2">Win Real Rewards</div>
                <div className="text-sm text-gray-600">Redeem tokens for brand swag, trips, and ad credits</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-green-100">
                <div className="text-3xl mb-3">📈</div>
                <div className="font-semibold text-gray-900 mb-2">Guaranteed Growth</div>
                <div className="text-sm text-gray-600">AI-powered campaigns that actually drive customers to your door</div>
              </div>
            </div>

            {/* Subscription Plans for Franchise Owners */}
            <div className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Plan</h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Starter Plan */}
                <div className="bg-white/90 backdrop-blur rounded-2xl p-6 border border-gray-200 relative">
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Starter</h4>
                    <div className="text-3xl font-bold text-purple-600 mb-1">$100<span className="text-lg text-gray-500">/month</span></div>
                    <div className="text-sm text-gray-600 mb-4">10,000 tokens included</div>
                    <div className="space-y-2 text-sm text-gray-700 mb-6">
                      <div className="flex items-center justify-center">
                        <span>✓ Campaign creation</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span>✓ AI creative generation</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span>✓ Basic analytics</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span>✓ Token rewards</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">$0.01 per token</div>
                  </div>
                </div>

                {/* Growth Plan - Most Popular */}
                <div className="bg-white/90 backdrop-blur rounded-2xl p-6 border-2 border-purple-500 relative">
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white">
                    Most Popular
                  </Badge>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Growth</h4>
                    <div className="text-3xl font-bold text-purple-600 mb-1">$250<span className="text-lg text-gray-500">/month</span></div>
                    <div className="text-sm text-gray-600 mb-4">30,000 tokens included</div>
                    <div className="space-y-2 text-sm text-gray-700 mb-6">
                      <div className="flex items-center justify-center">
                        <span>✓ Everything in Starter</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span>✓ Advanced targeting</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span>✓ A/B testing</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span>✓ Priority support</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">$0.0083 per token</div>
                  </div>
                </div>

                {/* Pro Plan */}
                <div className="bg-white/90 backdrop-blur rounded-2xl p-6 border border-gray-200 relative">
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Pro</h4>
                    <div className="text-3xl font-bold text-purple-600 mb-1">$500<span className="text-lg text-gray-500">/month</span></div>
                    <div className="text-sm text-gray-600 mb-4">70,000 tokens included</div>
                    <div className="space-y-2 text-sm text-gray-700 mb-6">
                      <div className="flex items-center justify-center">
                        <span>✓ Everything in Growth</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span>✓ White-label options</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span>✓ Custom integrations</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span>✓ Dedicated manager</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">$0.0071 per token</div>
                  </div>
                </div>
              </div>

              {/* Pricing Example */}
              <div className="bg-gray-50 rounded-xl p-6 max-w-2xl mx-auto mt-8">
                <h4 className="font-semibold text-gray-900 mb-4 text-center">How It Works</h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <div className="flex justify-between">
                    <span>Monthly subscription (Growth plan):</span>
                    <span className="font-semibold">$250</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tokens included:</span>
                    <span>30,000 tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Example: 10,000 impressions:</span>
                    <span>10,000 tokens used</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining tokens:</span>
                    <span>20,000 tokens</span>
                  </div>
                  <div className="border-t pt-2 mt-2 text-center text-xs text-gray-600">
                    Additional tokens available à la carte if needed
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="brand" className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Scale Your Brand Through
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Distributed Growth</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Turn every franchise owner into a growth engine. Our platform ensures brand compliance while 
              enabling distributed advertising that scales your entire network.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-purple-100">
                <div className="text-3xl mb-3">🛡️</div>
                <div className="font-semibold text-gray-900 mb-2">Brand Compliance</div>
                <div className="text-sm text-gray-600">AI ensures every ad meets your brand guidelines automatically</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-blue-100">
                <div className="text-3xl mb-3">📊</div>
                <div className="font-semibold text-gray-900 mb-2">Unified Analytics</div>
                <div className="text-sm text-gray-600">See performance across all locations in one dashboard</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-green-100">
                <div className="text-3xl mb-3">⚡</div>
                <div className="font-semibold text-gray-900 mb-2">Rapid Deployment</div>
                <div className="text-sm text-gray-600">Launch campaigns across 100+ locations in minutes</div>
              </div>
            </div>

            {/* Enterprise Pricing */}
            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 sm:p-8 border border-gray-200 max-w-2xl mx-auto mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Enterprise Partnership</h3>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-4">Custom Pricing</div>
                <div className="text-gray-600 mb-6">For brands with 300+ locations</div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Negotiated seat fees</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span>Dedicated account management</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Zap className="w-4 h-4 text-green-500" />
                    <span>Custom integrations</span>
                  </div>
                </div>
                <Button variant="outline" className="mt-4">
                  Contact Partnership Team
                </Button>
              </div>
            </div>
          </TabsContent>

          <div className="text-center">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-gray-500 mt-3">No credit card required • 3 months free</p>
          </div>
        </div>
      </div>

      {/* Creative of the Week Section */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 mb-4">
              ✨ Creative Showcase
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Creative of the Week</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See the most viral, engaging ads created by businesses just like yours. 
              Get inspired and create your own winning campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {creativeOfTheWeek.map((creative) => (
              <CreativeCard key={creative.id} creative={creative} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              View All Creatives <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Meta Growth Education Section */}
      <div className="py-16 sm:py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center bg-blue-600 rounded-full p-3 mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meta Ads: Your Growth Machine
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              This isn't about boosting posts or managing your organic profile. 
              Meta ads are strategic growth advertising that drives real customers to your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
              <Target className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Precise Targeting</h3>
              <p className="text-sm text-gray-600">
                Reach exactly who you want - by location, age, interests, and behaviors. No wasted ad spend.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Measurable Results</h3>
              <p className="text-sm text-gray-600">
                Track every click, call, and conversion. See exactly how much revenue each dollar generates.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
              <Zap className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Scale What Works</h3>
              <p className="text-sm text-gray-600">
                Start small, find what converts, then scale up. Meta's AI optimizes for your best customers.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Local + Digital</h3>
              <p className="text-sm text-gray-600">
                Perfect for businesses that serve local customers. Drive foot traffic and phone calls.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white rounded-xl p-6 sm:p-8 max-w-2xl mx-auto border border-blue-100">
              <div className="flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-blue-600 mr-2" />
                <span className="font-semibold text-gray-900">Ready to see the difference?</span>
              </div>
              <p className="text-gray-600 mb-6">
                Join thousands of franchise owners who've discovered that Meta ads are the fastest way to grow their local business.
              </p>
              <Button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Start Your First Campaign
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Trusted by franchise owners across industries
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-lg font-semibold text-gray-500">Home Services</div>
            <div className="text-lg font-semibold text-gray-500">Restaurant/QSR</div>
            <div className="text-lg font-semibold text-gray-500">Real Estate</div>
            <div className="text-lg font-semibold text-gray-500">Auto Dealers</div>
          </div>
          <div className="mt-8 flex justify-center items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-gray-600">4.9/5 from 2,000+ franchise owners</span>
          </div>
        </div>
      </div>
    </div>
  )
}