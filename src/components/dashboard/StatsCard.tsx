import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string
  change: number
  trend: 'up' | 'down' | 'stable'
  icon: React.ComponentType<{ className?: string }>
  format?: 'currency' | 'percentage' | 'number'
  className?: string
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  format = 'number',
  className 
}: StatsCardProps) {
  const formatChange = (value: number) => {
    const prefix = value > 0 ? '+' : ''
    const suffix = format === 'percentage' ? '%' : ''
    return `${prefix}${value}${suffix}`
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-accent'
    if (trend === 'down') return 'text-destructive'
    return 'text-muted-foreground'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn("relative overflow-hidden", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <p className="text-2xl font-bold">
                {value}
              </p>
              <div className={cn("flex items-center text-sm", getTrendColor())}>
                <span>{formatChange(change)}</span>
                <span className="ml-1 text-muted-foreground">vs last month</span>
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}