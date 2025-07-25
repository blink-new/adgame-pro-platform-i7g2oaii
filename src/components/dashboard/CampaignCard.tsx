import { motion } from 'framer-motion'
import { MoreHorizontal, Play, Pause, TrendingUp, Target } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Campaign } from '@/types'
import { cn } from '@/lib/utils'

interface CampaignCardProps {
  campaign: Campaign
  onEdit?: (campaign: Campaign) => void
  onPause?: (campaign: Campaign) => void
  onResume?: (campaign: Campaign) => void
}

export function CampaignCard({ campaign, onEdit, onPause, onResume }: CampaignCardProps) {
  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return 'bg-accent text-accent-foreground'
      case 'paused': return 'bg-yellow-500 text-white'
      case 'draft': return 'bg-muted text-muted-foreground'
      case 'completed': return 'bg-primary text-primary-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const roi = ((campaign.conversions * 100 - campaign.spent) / campaign.spent) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{campaign.name}</h3>
              <div className="flex items-center gap-2">
                <Badge className={cn("text-xs", getStatusColor(campaign.status))}>
                  {campaign.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {campaign.industry.name}
                </span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(campaign)}>
                  Edit Campaign
                </DropdownMenuItem>
                {campaign.status === 'active' ? (
                  <DropdownMenuItem onClick={() => onPause?.(campaign)}>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Campaign
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => onResume?.(campaign)}>
                    <Play className="h-4 w-4 mr-2" />
                    Resume Campaign
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Goal Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="font-medium">{campaign.goal.type} Goal</span>
              </div>
              <span className="text-muted-foreground">
                {campaign.goal.current} / {campaign.goal.target}
              </span>
            </div>
            <Progress value={campaign.progress} className="h-2" />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Spent</p>
              <p className="font-semibold">{formatCurrency(campaign.spent)}</p>
              <p className="text-xs text-muted-foreground">
                of {formatCurrency(campaign.budget)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">ROI</p>
              <div className="flex items-center gap-1">
                <p className={cn(
                  "font-semibold",
                  roi > 0 ? "text-accent" : "text-destructive"
                )}>
                  {roi > 0 ? '+' : ''}{roi.toFixed(1)}%
                </p>
                <TrendingUp className={cn(
                  "h-3 w-3",
                  roi > 0 ? "text-accent" : "text-destructive"
                )} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Impressions</p>
              <p className="font-semibold">{formatNumber(campaign.impressions)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Conversions</p>
              <p className="font-semibold">{campaign.conversions}</p>
            </div>
          </div>

          {/* Budget Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Budget Used</span>
              <span>{((campaign.spent / campaign.budget) * 100).toFixed(1)}%</span>
            </div>
            <Progress 
              value={(campaign.spent / campaign.budget) * 100} 
              className="h-1"
            />
          </div>
        </CardContent>

        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  )
}