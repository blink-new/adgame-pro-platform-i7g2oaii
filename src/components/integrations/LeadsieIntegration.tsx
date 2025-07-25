import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Facebook, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Zap,
  Users,
  DollarSign,
  TrendingUp
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast'

export function LeadsieIntegration() {
  const { user, connectLeadsie } = useAuth()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      await connectLeadsie()
      toast({
        title: "Leadsie Connected!",
        description: "Your Facebook Ad accounts are now accessible through AdControl.",
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect Leadsie. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Leadsie Integration</h2>
        <p className="text-muted-foreground">
          Connect your Facebook Ad accounts through Leadsie for seamless campaign management
        </p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Leadsie Connection
                  {user?.leadsieConnected ? (
                    <Badge variant="default" className="bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Not Connected
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {user?.leadsieConnected 
                    ? 'Your Facebook Ad accounts are accessible'
                    : 'Connect to access your Facebook Ad accounts'
                  }
                </CardDescription>
              </div>
            </div>
            
            {!user?.leadsieConnected && (
              <Button onClick={handleConnect} disabled={isConnecting}>
                {isConnecting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <Zap className="w-4 h-4 mr-2" />
                )}
                Connect Leadsie
              </Button>
            )}
          </div>
        </CardHeader>

        {user?.leadsieConnected && (
          <CardContent className="space-y-4">
            <Separator />
            
            {/* Connected Ad Accounts */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-600" />
                Connected Facebook Ad Accounts
              </h3>
              
              <div className="grid gap-3">
                {user.facebookAdAccounts?.map((account) => (
                  <motion.div
                    key={account.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{account.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Account ID: {account.accountId}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Mock Account Stats */}
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center gap-1 text-sm font-medium">
                            <Users className="w-3 h-3" />
                            2.4K
                          </div>
                          <p className="text-xs text-muted-foreground">Reach</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 text-sm font-medium">
                            <DollarSign className="w-3 h-3" />
                            $1,250
                          </div>
                          <p className="text-xs text-muted-foreground">Spent</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 text-sm font-medium text-green-600">
                            <TrendingUp className="w-3 h-3" />
                            +12%
                          </div>
                          <p className="text-xs text-muted-foreground">ROAS</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Why Connect Leadsie?</CardTitle>
          <CardDescription>
            Unlock powerful features for your Facebook advertising
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Direct Campaign Management</h4>
                <p className="text-sm text-muted-foreground">
                  Create and manage Facebook campaigns directly from AdControl
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Brand Compliance</h4>
                <p className="text-sm text-muted-foreground">
                  Ensure all campaigns meet your brand guidelines automatically
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium">Real-time Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Get instant insights and performance metrics for all your campaigns
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}