import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Users, 
  DollarSign, 
  Eye,
  MousePointer,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  TestTube,
  Trophy,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'

interface CampaignMetrics {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed'
  spend: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  roas: number
  tokens_earned: number
}

interface ABTest {
  id: string
  name: string
  status: 'running' | 'completed' | 'draft'
  variants: {
    name: string
    impressions: number
    clicks: number
    conversions: number
    ctr: number
    confidence: number
  }[]
  winner?: string
  significance: number
}

export function PerformanceTracker() {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedCampaign, setSelectedCampaign] = useState('all')

  const [campaigns] = useState<CampaignMetrics[]>([
    {
      id: 'camp-1',
      name: 'Coffee Shop Grand Opening',
      status: 'active',
      spend: 450,
      impressions: 12500,
      clicks: 875,
      conversions: 42,
      ctr: 7.0,
      cpc: 0.51,
      roas: 3.2,
      tokens_earned: 4
    },
    {
      id: 'camp-2', 
      name: 'Weekend Special Promotion',
      status: 'active',
      spend: 320,
      impressions: 8900,
      clicks: 623,
      conversions: 28,
      ctr: 7.0,
      cpc: 0.51,
      roas: 2.8,
      tokens_earned: 3
    },
    {
      id: 'camp-3',
      name: 'New Menu Launch',
      status: 'completed',
      spend: 680,
      impressions: 18200,
      clicks: 1240,
      conversions: 67,
      ctr: 6.8,
      cpc: 0.55,
      roas: 4.1,
      tokens_earned: 6
    }
  ])

  const [abTests] = useState<ABTest[]>([
    {
      id: 'test-1',
      name: 'Headline A/B Test',
      status: 'running',
      variants: [
        { name: 'Variant A: "Best Coffee in Town"', impressions: 5200, clicks: 364, conversions: 18, ctr: 7.0, confidence: 85 },
        { name: 'Variant B: "Fresh Roasted Daily"', impressions: 5100, clicks: 408, conversions: 24, ctr: 8.0, confidence: 95 }
      ],
      winner: 'Variant B',
      significance: 95
    },
    {
      id: 'test-2',
      name: 'CTA Button Test',
      status: 'completed',
      variants: [
        { name: 'Variant A: "Order Now"', impressions: 8200, clicks: 574, conversions: 28, ctr: 7.0, confidence: 99 },
        { name: 'Variant B: "Get Your Coffee"', impressions: 8100, clicks: 486, conversions: 19, ctr: 6.0, confidence: 99 }
      ],
      winner: 'Variant A',
      significance: 99
    }
  ])

  const totalMetrics = {
    totalSpend: campaigns.reduce((sum, c) => sum + c.spend, 0),
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    totalClicks: campaigns.reduce((sum, c) => sum + c.clicks, 0),
    totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
    totalTokens: campaigns.reduce((sum, c) => sum + c.tokens_earned, 0),
    avgCTR: campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length,
    avgROAS: campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'paused': return 'bg-yellow-100 text-yellow-700'
      case 'completed': return 'bg-blue-100 text-blue-700'
      case 'running': return 'bg-green-100 text-green-700'
      case 'draft': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPerformanceIcon = (value: number, benchmark: number) => {
    if (value > benchmark) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Performance Analytics</h2>
          <p className="text-muted-foreground">
            Track campaign performance and optimize with A/B testing
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spend</p>
                <p className="text-2xl font-bold">${totalMetrics.totalSpend.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getPerformanceIcon(totalMetrics.totalSpend, 1000)}
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Impressions</p>
                <p className="text-2xl font-bold">{totalMetrics.totalImpressions.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getPerformanceIcon(totalMetrics.totalImpressions, 30000)}
                  <span className="text-xs text-muted-foreground">+12% vs last period</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clicks</p>
                <p className="text-2xl font-bold">{totalMetrics.totalClicks.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getPerformanceIcon(totalMetrics.totalClicks, 2000)}
                  <span className="text-xs text-muted-foreground">+8% vs last period</span>
                </div>
              </div>
              <MousePointer className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tokens Earned</p>
                <p className="text-2xl font-bold">{totalMetrics.totalTokens}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-muted-foreground">+2 this period</span>
                </div>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
          <TabsTrigger value="abtests">A/B Tests</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Campaign Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-yellow-600">
                          +{campaign.tokens_earned} tokens
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Spend</p>
                        <p className="font-semibold">${campaign.spend}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Impressions</p>
                        <p className="font-semibold">{campaign.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Clicks</p>
                        <p className="font-semibold">{campaign.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Conversions</p>
                        <p className="font-semibold">{campaign.conversions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">CTR</p>
                        <p className="font-semibold flex items-center gap-1">
                          {campaign.ctr.toFixed(1)}%
                          {getPerformanceIcon(campaign.ctr, 5.0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">CPC</p>
                        <p className="font-semibold">${campaign.cpc.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">ROAS</p>
                        <p className="font-semibold flex items-center gap-1">
                          {campaign.roas.toFixed(1)}x
                          {getPerformanceIcon(campaign.roas, 3.0)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abtests" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">A/B Tests</h3>
            <Button>
              <TestTube className="h-4 w-4 mr-2" />
              Create New Test
            </Button>
          </div>

          <div className="space-y-6">
            {abTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <TestTube className="h-5 w-5" />
                        {test.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                        {test.winner && (
                          <Badge className="bg-green-100 text-green-700">
                            Winner: {test.winner}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {test.variants.map((variant, variantIndex) => (
                        <div key={variantIndex} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{variant.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {variant.confidence}% confidence
                              </Badge>
                              {test.winner === variant.name && (
                                <Trophy className="h-4 w-4 text-yellow-500" />
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-4 mb-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Impressions</p>
                              <p className="font-semibold">{variant.impressions.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Clicks</p>
                              <p className="font-semibold">{variant.clicks.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Conversions</p>
                              <p className="font-semibold">{variant.conversions}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">CTR</p>
                              <p className="font-semibold">{variant.ctr.toFixed(1)}%</p>
                            </div>
                          </div>
                          
                          <Progress value={variant.confidence} className="h-2" />
                        </div>
                      ))}
                      
                      {test.status === 'completed' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-700">
                              Test completed with {test.significance}% statistical significance
                            </span>
                          </div>
                          <p className="text-sm text-green-600 mt-1">
                            {test.winner} is the winning variant. Consider implementing this across all campaigns.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  AI Optimization Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    type: 'high',
                    title: 'Increase Budget for Coffee Shop Grand Opening',
                    description: 'This campaign has a 3.2x ROAS. Consider increasing budget by 50% to maximize returns.',
                    impact: '+$340 potential revenue'
                  },
                  {
                    type: 'medium',
                    title: 'Optimize Ad Schedule',
                    description: 'Your ads perform 40% better between 7-9 AM and 2-4 PM. Adjust scheduling to focus on these hours.',
                    impact: '+15% CTR improvement'
                  },
                  {
                    type: 'low',
                    title: 'Test New Creative Formats',
                    description: 'Video ads in your industry typically see 25% higher engagement. Consider testing video content.',
                    impact: '+25% engagement potential'
                  }
                ].map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            className={
                              insight.type === 'high' ? 'bg-red-100 text-red-700' :
                              insight.type === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }
                          >
                            {insight.type} priority
                          </Badge>
                        </div>
                        <h4 className="font-medium mb-1">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <p className="text-sm font-medium text-green-600">{insight.impact}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Apply
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Performance Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Click-Through Rate</span>
                      <span className="text-sm text-muted-foreground">7.0% avg</span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Above industry average (5.2%)</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Conversion Rate</span>
                      <span className="text-sm text-muted-foreground">4.8% avg</span>
                    </div>
                    <Progress value={48} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Slightly below industry average (5.1%)</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Return on Ad Spend</span>
                      <span className="text-sm text-muted-foreground">3.4x avg</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Excellent performance (target: 3.0x)</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Brand Compliance</span>
                      <span className="text-sm text-muted-foreground">98% avg</span>
                    </div>
                    <Progress value={98} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Outstanding brand adherence</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}