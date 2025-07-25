import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Target, 
  Sparkles, 
  BarChart3, 
  CreditCard,
  Trophy,
  Settings,
  LogOut,
  Coins,
  Shield,
  User,
  Facebook,
  Chrome,
  ChevronDown,
  ChevronRight,
  Palette,
  Building2,
  Wand2,
  Layers3,
  Brain
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tokens', label: 'Tokens & Rewards', icon: Coins, badge: 'HOT' },
  { id: 'campaigns', label: 'Campaigns', icon: Target },
  { 
    id: 'studio', 
    label: 'Creative Studio', 
    icon: Layers3, 
    badge: 'AI',
    subItems: [
      { id: 'ai-creative', label: 'AI Creative', icon: Brain },
      { id: 'templates', label: 'Templates', icon: Palette },
      { id: 'brand-center', label: 'Brand Center', icon: Shield },
    ]
  },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'subscription', label: 'Subscription', icon: CreditCard },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(['studio'])
  const { user, logout, connectLeadsie } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleConnectLeadsie = async () => {
    try {
      await connectLeadsie()
      toast({
        title: "Leadsie Connected!",
        description: "Your Facebook Ad accounts are now accessible.",
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect Leadsie. Please try again.",
        variant: "destructive"
      })
    }
  }

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const getProviderIcon = () => {
    switch (user?.provider) {
      case 'google':
        return <Chrome className="h-3 w-3" />
      case 'facebook':
        return <Facebook className="h-3 w-3" />
      default:
        return <User className="h-3 w-3" />
    }
  }

  const isActiveTab = (itemId: string, subItems?: any[]) => {
    if (subItems) {
      return subItems.some(sub => activeTab === sub.id) || activeTab === itemId
    }
    return activeTab === itemId
  }

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border px-4">
          <motion.div
            layout
            className="flex items-center gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Target className="h-4 w-4" />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-lg font-bold text-foreground">AdControl</h1>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => (
            <div key={item.id}>
              <Button
                variant={isActiveTab(item.id, item.subItems) ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  isCollapsed && "px-2"
                )}
                onClick={() => {
                  if (item.subItems) {
                    toggleExpanded(item.id)
                    // If studio is clicked and no sub-item is active, default to ai-creative
                    if (!item.subItems.some(sub => activeTab === sub.id)) {
                      onTabChange('ai-creative')
                    }
                  } else {
                    onTabChange(item.id)
                  }
                }}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 flex-1"
                  >
                    <span className="flex-1 text-left">{item.label}</span>
                    <div className="flex items-center gap-1">
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {item.subItems && (
                        expandedItems.includes(item.id) ? 
                          <ChevronDown className="h-3 w-3" /> : 
                          <ChevronRight className="h-3 w-3" />
                      )}
                    </div>
                  </motion.div>
                )}
              </Button>
              
              {/* Sub-items */}
              {item.subItems && !isCollapsed && expandedItems.includes(item.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-6 mt-2 space-y-1 border-l-2 border-muted pl-4"
                >
                  {item.subItems.map((subItem) => (
                    <Button
                      key={subItem.id}
                      variant={activeTab === subItem.id ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "w-full justify-start gap-3 h-8 text-sm relative",
                        activeTab === subItem.id 
                          ? "bg-primary text-primary-foreground shadow-sm" 
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => onTabChange(subItem.id)}
                    >
                      <div className="absolute -left-6 top-1/2 w-2 h-2 bg-muted rounded-full transform -translate-y-1/2" />
                      <subItem.icon className="h-4 w-4 flex-shrink-0" />
                      <span>{subItem.label}</span>
                    </Button>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-border p-4">
          {/* User Profile */}
          {!isCollapsed && user && (
            <div className="mb-4 p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-xs">
                    {user.displayName?.charAt(0) || user.email.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.displayName || user.email.split('@')[0]}
                  </p>
                  <div className="flex items-center gap-1">
                    {getProviderIcon()}
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Leadsie Status */}
              <div className="mt-3 pt-3 border-t border-border/50">
                {user.leadsieConnected ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-green-600 font-medium">
                      Leadsie Connected
                    </span>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-7 text-xs"
                    onClick={handleConnectLeadsie}
                  >
                    <Target className="h-3 w-3 mr-1" />
                    Connect Leadsie
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-10",
                isCollapsed && "px-2"
              )}
            >
              <Settings className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={cn(
                "w-full justify-start gap-3 h-10 text-destructive hover:text-destructive",
                isCollapsed && "px-2"
              )}
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && <span>Sign Out</span>}
            </Button>
          </div>
        </div>

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-background shadow-md"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.div>
        </Button>
      </div>
    </motion.div>
  )
}