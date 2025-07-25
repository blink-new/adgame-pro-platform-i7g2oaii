import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  Trophy,
  Calculator,
  Store,
  Car,
  Home,
  UtensilsCrossed,
  Sparkles
} from 'lucide-react'

interface IndustryData {
  name: string
  icon: React.ReactNode
  webToStoreRate: number
  avgTicket: number
  repeatCustomerRate: number
}

const industryData: Record<string, IndustryData> = {
  'home-services': {
    name: 'Home Services',
    icon: <Home className="h-4 w-4" />,
    webToStoreRate: 0.12,
    avgTicket: 285,
    repeatCustomerRate: 0.35
  },
  'restaurant': {
    name: 'Restaurant/QSR',
    icon: <UtensilsCrossed className="h-4 w-4" />,
    webToStoreRate: 0.08,
    avgTicket: 28,
    repeatCustomerRate: 0.65
  },
  'real-estate': {
    name: 'Real Estate',
    icon: <Store className="h-4 w-4" />,
    webToStoreRate: 0.15,
    avgTicket: 8500,
    repeatCustomerRate: 0.25
  },
  'auto': {
    name: 'Auto',
    icon: <Car className="h-4 w-4" />,
    webToStoreRate: 0.18,
    avgTicket: 1200,
    repeatCustomerRate: 0.45
  }
}

export default function BusinessROIAnalytics() {
  const [selectedIndustry, setSelectedIndustry] = useState('home-services')
  const [customTicket, setCustomTicket] = useState('')
  const [adSpend, setAdSpend] = useState('500')
  const [websiteTraffic] = useState(2847)
  const [socialReach] = useState(15420)
  const [engagement] = useState(1247)

  const industry = industryData[selectedIndustry]
  const avgTicket = customTicket ? parseFloat(customTicket) : industry.avgTicket
  const estimatedVisits = Math.round(websiteTraffic * industry.webToStoreRate)
  const estimatedRevenue = estimatedVisits * avgTicket
  const roas = estimatedRevenue / parseFloat(adSpend)
  const newCustomers = Math.round(socialReach * 0.08)
  const brandMentions = Math.round(engagement * 0.3)

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-purple-50 via-white to-blue-50 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Your Business Impact
        </h2>
        <p className="text-gray-600">Real metrics that show your success</p>
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-48 mx-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(industryData).map(([key, data]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center gap-2">
                  {data.icon}
                  {data.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="roi" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="roi">💰 ROI</TabsTrigger>
          <TabsTrigger value="buzz">📢 Buzz</TabsTrigger>
          <TabsTrigger value="growth">🏆 Growth</TabsTrigger>
        </TabsList>

        {/* ROI Calculator Tab */}
        <TabsContent value="roi" className="space-y-6">
          {/* Quick Calculator */}
          <Card className="max-w-md mx-auto border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Calculator className="h-5 w-5 text-purple-500" />
                ROI Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="adSpend">Monthly Ad Spend</Label>
                <Input
                  id="adSpend"
                  type="number"
                  value={adSpend}
                  onChange={(e) => setAdSpend(e.target.value)}
                  className="text-center text-lg"
                />
              </div>
              <div>
                <Label htmlFor="avgTicket">Average Sale Amount</Label>
                <Input
                  id="avgTicket"
                  type="number"
                  value={customTicket}
                  onChange={(e) => setCustomTicket(e.target.value)}
                  placeholder={`$${industry.avgTicket} (industry avg)`}
                  className="text-center text-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6 text-center">
                <Store className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-600">{estimatedVisits}</div>
                <p className="text-sm text-green-700">New Customers</p>
                <p className="text-xs text-gray-600 mt-1">From {websiteTraffic.toLocaleString()} website visits</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-blue-600">${estimatedRevenue.toLocaleString()}</div>
                <p className="text-sm text-blue-700">Revenue Generated</p>
                <p className="text-xs text-gray-600 mt-1">This month</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-purple-600">{roas.toFixed(1)}x</div>
                <p className="text-sm text-purple-700">Return on Ad Spend</p>
                <p className="text-xs text-gray-600 mt-1">Every $1 returns ${roas.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Feel Good Metrics */}
          <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-600" />
                Your Business Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-600">{Math.round(estimatedVisits * 12)}</div>
                  <p className="text-sm text-orange-700">Customers Served This Year</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">4.8★</div>
                  <p className="text-sm text-yellow-700">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Buzz Tab */}
        <TabsContent value="buzz" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-blue-600">{brandMentions.toLocaleString()}</div>
                <p className="text-sm text-blue-700">People Talking About You</p>
                <p className="text-xs text-gray-600 mt-1">Brand mentions this month</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-teal-50">
              <CardContent className="p-6 text-center">
                <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-600">{newCustomers.toLocaleString()}</div>
                <p className="text-sm text-green-700">New People Know You</p>
                <p className="text-xs text-gray-600 mt-1">Brand awareness growth</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-50">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-red-600">{((engagement / socialReach) * 100).toFixed(1)}%</div>
                <p className="text-sm text-red-700">Engagement Rate</p>
                <p className="text-xs text-gray-600 mt-1">Above industry average</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-purple-600">78%</div>
                <p className="text-sm text-purple-700">Positive Sentiment</p>
                <p className="text-xs text-gray-600 mt-1">What people are saying</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Growth Metrics Tab */}
        <TabsContent value="growth" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50">
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-4xl font-bold text-yellow-600">8.7</div>
                <p className="text-sm text-yellow-700">Business Growth Score</p>
                <div className="mt-3">
                  <Progress value={87} className="h-2" />
                </div>
                <p className="text-xs text-green-600 mt-2">+0.3 from last month</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-4xl font-bold text-blue-600">23%</div>
                <p className="text-sm text-blue-700">Market Share</p>
                <div className="mt-3">
                  <Progress value={23} className="h-2" />
                </div>
                <p className="text-xs text-green-600 mt-2">Rank #3 in your area</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-4xl font-bold text-green-600">${(avgTicket * 4.2).toFixed(0)}</div>
                <p className="text-sm text-green-700">Customer Lifetime Value</p>
                <div className="mt-3">
                  <Progress value={75} className="h-2" />
                </div>
                <p className="text-xs text-green-600 mt-2">+12% from last quarter</p>
              </CardContent>
            </Card>
          </div>

          {/* Achievement Badge */}
          <Card className="max-w-md mx-auto border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-purple-800 mb-2">Top Performer!</h3>
              <p className="text-sm text-purple-700">You're in the top 15% of businesses in your industry</p>
              <Badge className="mt-3 bg-purple-100 text-purple-800">Growth Champion</Badge>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}