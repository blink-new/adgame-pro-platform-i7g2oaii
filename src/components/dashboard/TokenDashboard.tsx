import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Coins, 
  Trophy, 
  TrendingUp, 
  Target, 
  Gift, 
  Crown,
  Zap,
  Star,
  Award,
  Users
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface TokenStats {
  currentTokens: number
  totalEarned: number
  monthlySpend: number
  rank: number
  nextReward: string
  tokensToNext: number
}

interface LeaderboardEntry {
  rank: number
  name: string
  location: string
  tokens: number
  avatar?: string
  badge?: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  unlocked: boolean
  progress?: number
  maxProgress?: number
}

export function TokenDashboard() {
  const [tokenStats] = useState<TokenStats>({
    currentTokens: 847,
    totalEarned: 2340,
    monthlySpend: 450,
    rank: 3,
    nextReward: 'Brand Swag Package',
    tokensToNext: 153
  })

  const [leaderboard] = useState<LeaderboardEntry[]>([
    { rank: 1, name: 'Sarah Chen', location: 'Downtown Seattle', tokens: 1250, badge: 'Champion' },
    { rank: 2, name: 'Mike Rodriguez', location: 'Austin Central', tokens: 1180, badge: 'Elite' },
    { rank: 3, name: 'You', location: 'Portland Main', tokens: 847, badge: 'Rising Star' },
    { rank: 4, name: 'Emma Thompson', location: 'Denver West', tokens: 720 },
    { rank: 5, name: 'James Park', location: 'Phoenix North', tokens: 680 },
    { rank: 6, name: 'Lisa Wang', location: 'San Diego Bay', tokens: 650 },
    { rank: 7, name: 'David Kim', location: 'Miami Beach', tokens: 590 },
    { rank: 8, name: 'Rachel Green', location: 'Chicago Loop', tokens: 540 }
  ])

  const [achievements] = useState<Achievement[]>([
    {
      id: 'first-campaign',
      title: 'First Campaign',
      description: 'Launch your first ad campaign',
      icon: Target,
      unlocked: true
    },
    {
      id: 'big-spender',
      title: 'Big Spender',
      description: 'Spend $500 in a single month',
      icon: Coins,
      unlocked: true
    },
    {
      id: 'top-performer',
      title: 'Top Performer',
      description: 'Reach top 5 in monthly leaderboard',
      icon: Trophy,
      unlocked: true
    },
    {
      id: 'consistency-king',
      title: 'Consistency King',
      description: 'Run campaigns for 6 months straight',
      icon: Crown,
      unlocked: false,
      progress: 4,
      maxProgress: 6
    },
    {
      id: 'ai-master',
      title: 'AI Master',
      description: 'Generate 100 AI-powered ads',
      icon: Zap,
      unlocked: false,
      progress: 67,
      maxProgress: 100
    },
    {
      id: 'brand-champion',
      title: 'Brand Champion',
      description: 'Maintain 100% brand compliance for 3 months',
      icon: Star,
      unlocked: false,
      progress: 2,
      maxProgress: 3
    }
  ])

  const rewards = [
    { tokens: 1000, reward: 'Brand Swag Package', description: 'T-shirt, mug, stickers' },
    { tokens: 2500, reward: 'Weekend Getaway', description: '2-night hotel stay' },
    { tokens: 5000, reward: '$500 Ad Credit', description: 'Free advertising budget' },
    { tokens: 10000, reward: 'Annual Conference', description: 'All-expenses-paid trip' }
  ]

  return (
    <div className="space-y-6">
      {/* Token Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Current Tokens</p>
                <p className="text-3xl font-bold text-yellow-900">{tokenStats.currentTokens.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Coins className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold">{tokenStats.totalEarned.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Spend</p>
                <p className="text-2xl font-bold">${tokenStats.monthlySpend}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Leaderboard Rank</p>
                <p className="text-2xl font-bold">#{tokenStats.rank}</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Reward Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Next Reward Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{tokenStats.nextReward}</span>
              <span className="text-sm text-muted-foreground">
                {tokenStats.tokensToNext} tokens to go
              </span>
            </div>
            <Progress 
              value={(tokenStats.currentTokens / (tokenStats.currentTokens + tokenStats.tokensToNext)) * 100} 
              className="h-3"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{tokenStats.currentTokens} tokens</span>
              <span>{tokenStats.currentTokens + tokenStats.tokensToNext} tokens</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Franchise Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    entry.name === 'You' ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background border">
                    {entry.rank <= 3 ? (
                      <Crown className={`h-4 w-4 ${
                        entry.rank === 1 ? 'text-yellow-500' : 
                        entry.rank === 2 ? 'text-gray-400' : 'text-orange-500'
                      }`} />
                    ) : (
                      <span className="text-sm font-medium">#{entry.rank}</span>
                    )}
                  </div>
                  
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback>{entry.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{entry.name}</span>
                      {entry.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {entry.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.location}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold">{entry.tokens}</p>
                    <p className="text-xs text-muted-foreground">tokens</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    achievement.unlocked ? 'bg-green-50 border border-green-200' : 'bg-muted/50'
                  }`}
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? 'bg-green-100' : 'bg-muted'
                  }`}>
                    <achievement.icon className={`h-5 w-5 ${
                      achievement.unlocked ? 'text-green-600' : 'text-muted-foreground'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{achievement.title}</span>
                      {achievement.unlocked && (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    
                    {!achievement.unlocked && achievement.progress !== undefined && (
                      <div className="mt-2">
                        <Progress 
                          value={(achievement.progress! / achievement.maxProgress!) * 100} 
                          className="h-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {achievement.progress}/{achievement.maxProgress}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reward Store */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Reward Store
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewards.map((reward, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="text-center">
                  <p className="font-bold text-lg">{reward.tokens} tokens</p>
                  <h3 className="font-semibold">{reward.reward}</h3>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                </div>
                <Button 
                  className="w-full" 
                  disabled={tokenStats.currentTokens < reward.tokens}
                  variant={tokenStats.currentTokens >= reward.tokens ? "default" : "outline"}
                >
                  {tokenStats.currentTokens >= reward.tokens ? 'Redeem' : 'Not Enough Tokens'}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}