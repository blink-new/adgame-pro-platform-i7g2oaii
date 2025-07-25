import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Trophy, 
  Zap, 
  Target, 
  Sparkles, 
  Facebook, 
  Chrome,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast'

interface LoginPageProps {
  onLogin: () => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  
  const { 
    isLoading, 
    login, 
    loginWithGoogle, 
    loginWithFacebook, 
    connectLeadsie,
    user 
  } = useAuth()

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await login(email, password)
      toast({
        title: isSignUp ? "Account Created!" : "Welcome back!",
        description: isSignUp 
          ? "Welcome to AdControl! Your account has been created successfully."
          : "You've been logged in successfully.",
      })
      onLogin()
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Please try again or use social login.",
        variant: "destructive"
      })
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      toast({
        title: "Welcome!",
        description: "Successfully logged in with Google.",
      })
      onLogin()
    } catch (error) {
      toast({
        title: "Google Login Failed",
        description: "Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleFacebookLogin = async () => {
    try {
      await loginWithFacebook()
      toast({
        title: "Welcome!",
        description: "Successfully logged in with Facebook.",
      })
      onLogin()
    } catch (error) {
      toast({
        title: "Facebook Login Failed",
        description: "Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleLeadsieConnect = async () => {
    try {
      await connectLeadsie()
      toast({
        title: "Leadsie Connected!",
        description: "Your Facebook Ad accounts are now accessible through AdControl.",
      })
    } catch (error) {
      toast({
        title: "Leadsie Connection Failed",
        description: "Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding & Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AdControl
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground max-w-md"
            >
              The gamified advertising platform that makes Meta ads fun, profitable, and brand-compliant for franchise owners.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-card border">
              <Trophy className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Earn Tokens & Rewards</h3>
                <p className="text-sm text-muted-foreground">1 token per $100 spent + exclusive rewards</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-card border">
              <Target className="w-8 h-8 text-accent" />
              <div>
                <h3 className="font-semibold">Brand Compliance</h3>
                <p className="text-sm text-muted-foreground">AI-powered brand guideline enforcement</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-card border">
              <Sparkles className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">AI Creative Studio</h3>
                <p className="text-sm text-muted-foreground">Generate compliant ads with AI assistance</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            <Badge variant="secondary">Home Services</Badge>
            <Badge variant="secondary">Restaurant/QSR</Badge>
            <Badge variant="secondary">Real Estate</Badge>
            <Badge variant="secondary">Automotive</Badge>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </CardTitle>
              <CardDescription className="text-center">
                {isSignUp 
                  ? 'Start your gamified advertising journey' 
                  : 'Sign in to your AdControl account'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleFacebookLogin}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
              </div>

              {/* Leadsie Integration */}
              <div className="space-y-2">
                <Button
                  variant={user?.leadsieConnected ? "default" : "outline"}
                  onClick={handleLeadsieConnect}
                  disabled={isLoading || user?.leadsieConnected}
                  className="w-full"
                >
                  {user?.leadsieConnected ? (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Leadsie Connected
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Connect Leadsie
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Connect Leadsie to access your Facebook Ad accounts
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    isSignUp ? 'Create Account' : 'Sign In'
                  )}
                </Button>
              </form>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign in' 
                    : "Don't have an account? Sign up"
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}