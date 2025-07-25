import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Coins,
  Zap,
  Target,
  Palette,
  Clock
} from 'lucide-react'
import { useSubscription } from '../../hooks/useSubscription'
import { SUBSCRIPTION_PLANS } from '../../types/subscription'

export const WalletDashboard: React.FC = () => {
  const { 
    wallet, 
    subscription, 
    currentPlan, 
    availablePlans,
    purchaseTokens,
    getTransactionHistory,
    subscribeToPlan
  } = useSubscription()
  
  const [tokenAmount, setTokenAmount] = useState(5000)
  const [isLoading, setIsLoading] = useState(false)

  const transactions = getTransactionHistory()
  const recentTransactions = transactions.slice(0, 10)

  const handlePurchaseTokens = async () => {
    setIsLoading(true)
    try {
      await purchaseTokens(tokenAmount)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpgradePlan = async (planId: string) => {
    setIsLoading(true)
    try {
      await subscribeToPlan(planId)
    } finally {
      setIsLoading(false)
    }
  }

  const getTransactionIcon = (category: string, type: string) => {
    if (type === 'earned') return <ArrowDownRight className="h-4 w-4 text-green-500" />
    if (category === 'media') return <Target className="h-4 w-4 text-blue-500" />
    if (category === 'creative') return <Palette className="h-4 w-4 text-purple-500" />
    if (category === 'targeting') return <Zap className="h-4 w-4 text-orange-500" />
    return <ArrowUpRight className="h-4 w-4 text-red-500" />
  }

  const getTransactionColor = (type: string) => {
    return type === 'earned' ? 'text-green-600' : 'text-red-600'
  }

  if (!wallet || !subscription || !currentPlan) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Wallet className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Loading wallet...</p>
        </div>
      </div>
    )
  }

  const tokensUsedPercent = (subscription.tokensUsedThisCycle / (subscription.tokensUsedThisCycle + subscription.tokensRemainingThisCycle)) * 100
  const tokenCost = currentPlan.alaCarteTokenPrice * tokenAmount

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="enhanced-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token Balance</CardTitle>
            <Coins className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wallet.totalTokens.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                Media: {wallet.mediaTokens.toLocaleString()}
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                Creative: {wallet.creativeTokens.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enhanced-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentPlan.name}</div>
            <div className="text-xs text-muted-foreground">
              ${currentPlan.monthlyFee}/month
            </div>
            <Badge variant="secondary" className="mt-2">
              {subscription.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="enhanced-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tokensUsedPercent.toFixed(1)}%</div>
            <Progress value={tokensUsedPercent} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-2">
              {subscription.tokensRemainingThisCycle.toLocaleString()} tokens remaining
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="purchase" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="purchase">Buy Tokens</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
          <TabsTrigger value="plans">Upgrade Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="purchase" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Additional Tokens</CardTitle>
              <p className="text-sm text-muted-foreground">
                Buy tokens at ${currentPlan.alaCarteTokenPrice.toFixed(3)} per token
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token-amount">Number of Tokens</Label>
                <Input
                  id="token-amount"
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(Number(e.target.value))}
                  min="1000"
                  step="1000"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tokens:</span>
                  <span>{tokenAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Price per token:</span>
                  <span>${currentPlan.alaCarteTokenPrice.toFixed(3)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total Cost:</span>
                  <span>${tokenCost.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                onClick={handlePurchaseTokens} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Processing...' : `Purchase ${tokenAmount.toLocaleString()} Tokens`}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getTransactionIcon(transaction.category, transaction.type)}
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.timestamp.toLocaleDateString()} • {transaction.category}
                        </p>
                      </div>
                    </div>
                    <div className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'earned' ? '+' : ''}{transaction.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {availablePlans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.id === currentPlan.id ? 'ring-2 ring-blue-500' : ''}`}>
                {plan.isPopular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <div className="text-2xl font-bold">
                    {plan.monthlyFee > 0 ? `$${plan.monthlyFee}` : 'Custom'}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.tokensIncluded > 0 ? `${plan.tokensIncluded.toLocaleString()} tokens` : 'Custom tokens'}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {plan.id !== currentPlan.id && (
                    <Button 
                      onClick={() => handleUpgradePlan(plan.id)}
                      disabled={isLoading || plan.id === 'enterprise'}
                      className="w-full"
                      variant={plan.isPopular ? 'default' : 'outline'}
                    >
                      {plan.id === 'enterprise' ? 'Contact Sales' : 'Upgrade'}
                    </Button>
                  )}
                  
                  {plan.id === currentPlan.id && (
                    <Badge variant="secondary" className="w-full justify-center">
                      Current Plan
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Next Billing */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Billing Information</CardTitle>
          <Calendar className="h-5 w-5 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">Next Billing Date</p>
              <p className="text-lg">{subscription.nextBillingDate.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Billing Amount</p>
              <p className="text-lg">${currentPlan.monthlyFee}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Free Creatives Used</p>
              <p className="text-lg">{subscription.freeCreativesUsed} / 10</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}