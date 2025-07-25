import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Target, Zap, Rocket, TrendingUp, Users, MapPin, Clock, Facebook, Chrome, Music, Coffee, Building2, Coins, AlertCircle } from 'lucide-react'
import { useBusiness } from '@/hooks/useBusiness'
import { useSubscription } from '@/hooks/useSubscription'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Slider } from '../ui/slider'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'

interface CampaignPackage {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  features: string[]
  recommendedBudget: number
  estimatedReach: string
  popular?: boolean
}

interface Industry {
  id: string
  name: string
  icon: React.ReactNode
  packages: CampaignPackage[]
}

const industries: Industry[] = [
  {
    id: 'home-services',
    name: 'Home Services',
    icon: <Target className="w-5 h-5" />,
    packages: [
      {
        id: 'local-leads',
        name: 'Local Lead Generator',
        description: 'Drive calls and form submissions from nearby customers',
        icon: <MapPin className="w-4 h-4" />,
        features: ['Location targeting', 'Call tracking', 'Lead forms', 'Service area mapping'],
        recommendedBudget: 500,
        estimatedReach: '2K-5K locals',
        popular: true
      },
      {
        id: 'emergency-boost',
        name: 'Emergency Service Boost',
        description: 'Capture urgent service requests 24/7',
        icon: <Zap className="w-4 h-4" />,
        features: ['24/7 scheduling', 'Urgent keywords', 'Mobile-first ads', 'Quick response setup'],
        recommendedBudget: 800,
        estimatedReach: '1K-3K urgent'
      },
      {
        id: 'seasonal-promo',
        name: 'Seasonal Promotions',
        description: 'Capitalize on seasonal demand spikes',
        icon: <TrendingUp className="w-4 h-4" />,
        features: ['Seasonal targeting', 'Promo codes', 'Limited-time offers', 'Weather triggers'],
        recommendedBudget: 600,
        estimatedReach: '3K-7K seasonal'
      }
    ]
  },
  {
    id: 'restaurant',
    name: 'Restaurant/QSR',
    icon: <Users className="w-5 h-5" />,
    packages: [
      {
        id: 'delivery-driver',
        name: 'Delivery & Pickup Driver',
        description: 'Boost online orders and delivery sales',
        icon: <Rocket className="w-4 h-4" />,
        features: ['App install ads', 'Menu showcases', 'Delivery radius targeting', 'Order tracking'],
        recommendedBudget: 400,
        estimatedReach: '5K-10K hungry',
        popular: true
      },
      {
        id: 'happy-hour',
        name: 'Happy Hour & Events',
        description: 'Fill seats during slow periods',
        icon: <Clock className="w-4 h-4" />,
        features: ['Time-based targeting', 'Event promotion', 'Group bookings', 'Social proof'],
        recommendedBudget: 300,
        estimatedReach: '2K-4K locals'
      },
      {
        id: 'grand-opening',
        name: 'Grand Opening Blast',
        description: 'Launch new locations with maximum impact',
        icon: <Zap className="w-4 h-4" />,
        features: ['Grand opening buzz', 'Free trial offers', 'Community targeting', 'Influencer reach'],
        recommendedBudget: 1000,
        estimatedReach: '10K-20K new'
      }
    ]
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: <TrendingUp className="w-5 h-5" />,
    packages: [
      {
        id: 'listing-showcase',
        name: 'Listing Showcase',
        description: 'Get your properties in front of serious buyers',
        icon: <Target className="w-4 h-4" />,
        features: ['Property carousels', 'Virtual tours', 'Buyer targeting', 'Lead capture forms'],
        recommendedBudget: 600,
        estimatedReach: '3K-6K buyers',
        popular: true
      },
      {
        id: 'seller-leads',
        name: 'Seller Lead Magnet',
        description: 'Attract homeowners ready to sell',
        icon: <Users className="w-4 h-4" />,
        features: ['Home valuation offers', 'Market reports', 'Seller targeting', 'CRM integration'],
        recommendedBudget: 800,
        estimatedReach: '1K-3K sellers'
      },
      {
        id: 'first-time-buyer',
        name: 'First-Time Buyer Program',
        description: 'Connect with new homebuyers',
        icon: <Rocket className="w-4 h-4" />,
        features: ['First-time buyer targeting', 'Educational content', 'Mortgage partnerships', 'Webinar signups'],
        recommendedBudget: 500,
        estimatedReach: '4K-8K prospects'
      }
    ]
  },
  {
    id: 'auto',
    name: 'Automotive',
    icon: <Rocket className="w-5 h-5" />,
    packages: [
      {
        id: 'vehicle-showcase',
        name: 'Vehicle Showcase',
        description: 'Show off your inventory to ready buyers',
        icon: <Target className="w-4 h-4" />,
        features: ['Dynamic inventory ads', 'Vehicle details', 'Financing options', 'Test drive booking'],
        recommendedBudget: 700,
        estimatedReach: '4K-8K buyers',
        popular: true
      },
      {
        id: 'service-reminder',
        name: 'Service & Maintenance',
        description: 'Keep customers coming back for service',
        icon: <Clock className="w-4 h-4" />,
        features: ['Service reminders', 'Maintenance packages', 'Loyalty programs', 'Appointment booking'],
        recommendedBudget: 400,
        estimatedReach: '2K-5K existing'
      },
      {
        id: 'trade-in-promo',
        name: 'Trade-In Promotions',
        description: 'Drive trade-ins and upgrade sales',
        icon: <TrendingUp className="w-4 h-4" />,
        features: ['Trade-in calculators', 'Upgrade incentives', 'Value assessments', 'Quick appraisals'],
        recommendedBudget: 600,
        estimatedReach: '3K-6K owners'
      }
    ]
  },
  {
    id: 'medical',
    name: 'Medical',
    icon: <Users className="w-5 h-5" />,
    packages: [
      {
        id: 'wellness-package',
        name: 'Wellness & Beauty',
        description: 'Attract clients for med-spa and aesthetic services',
        icon: <Target className="w-4 h-4" />,
        features: ['Treatment showcases', 'Before/after galleries', 'Consultation booking', 'Special offers'],
        recommendedBudget: 600,
        estimatedReach: '3K-6K prospects',
        popular: true
      },
      {
        id: 'pain-relief',
        name: 'Pain Relief Solutions',
        description: 'Connect with patients seeking chiropractic care',
        icon: <Zap className="w-4 h-4" />,
        features: ['Pain point targeting', 'Treatment education', 'Insurance verification', 'Emergency appointments'],
        recommendedBudget: 500,
        estimatedReach: '2K-4K patients'
      },
      {
        id: 'dental-care',
        name: 'Dental Care Campaigns',
        description: 'Fill your dental practice with new patients',
        icon: <Clock className="w-4 h-4" />,
        features: ['Preventive care reminders', 'Cosmetic consultations', 'Insurance acceptance', 'Family packages'],
        recommendedBudget: 450,
        estimatedReach: '4K-8K families'
      }
    ]
  }
]

export default function CampaignBuilder({ onLaunchCampaign }: { onLaunchCampaign?: () => void }) {
  const { selectedBusiness, businesses, setSelectedBusiness } = useBusiness()
  const { 
    wallet, 
    calculateTokenCost, 
    canAfford, 
    spendTokens,
    currentPlan 
  } = useSubscription()
  
  const [selectedIndustry, setSelectedIndustry] = useState<string>('')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('')
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  const [budget, setBudget] = useState([500])
  const [campaignName, setCampaignName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [objective, setObjective] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [hasAdvancedTargeting, setHasAdvancedTargeting] = useState(false)
  const [hasPriorityQueue, setHasPriorityQueue] = useState(false)
  const [creativeAssets, setCreativeAssets] = useState(1)

  const platforms = [
    {
      id: 'meta',
      name: 'Meta (Facebook & Instagram)',
      icon: <Facebook className="w-5 h-5" />,
      description: 'Reach billions on Facebook and Instagram',
      available: true,
      features: ['Advanced targeting', 'Visual storytelling', 'Shopping integration', 'Messenger ads']
    },
    {
      id: 'google',
      name: 'Google Ads',
      icon: <Chrome className="w-5 h-5" />,
      description: 'Capture high-intent search traffic',
      available: false,
      features: ['Search ads', 'Display network', 'YouTube ads', 'Shopping campaigns'],
      comingSoon: true
    },
    {
      id: 'tiktok',
      name: 'TikTok Ads',
      icon: <Music className="w-5 h-5" />,
      description: 'Engage younger audiences with video',
      available: false,
      features: ['Video ads', 'Spark ads', 'Brand takeovers', 'Hashtag challenges'],
      comingSoon: true
    }
  ]

  const selectedIndustryData = industries.find(ind => ind.id === selectedIndustry)
  const selectedPackageData = selectedIndustryData?.packages.find(pkg => pkg.id === selectedPackage)

  // Calculate token cost based on campaign parameters
  const tokenCost = selectedPackageData ? calculateTokenCost({
    impressions: Math.floor(budget[0] * 10), // Rough estimate: $1 = 10 impressions
    hasAdvancedTargeting,
    hasPriorityQueue,
    creativeAssets,
    abVariants: 0
  }) : null

  const canAffordCampaign = tokenCost ? canAfford(tokenCost.totalTokens) : false

  const handleLaunchCampaign = async () => {
    // Navigate to payment page with campaign data
    const campaignData = {
      name: campaignName,
      industry: selectedIndustry,
      platform: selectedPlatform,
      package: selectedPackage,
      budget: budget[0],
      startDate,
      endDate,
      objective,
      targetAudience
    }
    
    // Store campaign data for payment page
    localStorage.setItem('pendingCampaign', JSON.stringify(campaignData))
    
    // Navigate to payment page
    onLaunchCampaign?.()
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold text-gray-900">Campaign Builder</h1>
        <p className="text-gray-600">Create your next winning campaign in minutes</p>
      </motion.div>

      {/* Business Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <Building2 className="w-5 h-5" />
              Select Your Business
            </CardTitle>
            <CardDescription className="text-amber-700">
              Choose which business location you want to run ads for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select 
              value={selectedBusiness?.id || ''} 
              onValueChange={(value) => {
                const business = businesses.find(b => b.id === value)
                setSelectedBusiness(business || null)
              }}
            >
              <SelectTrigger className="w-full bg-white border-amber-200">
                <SelectValue placeholder="Select a business..." />
              </SelectTrigger>
              <SelectContent>
                {businesses.map((business) => (
                  <SelectItem key={business.id} value={business.id}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-amber-100 flex items-center justify-center">
                        {business.logo ? (
                          <img src={business.logo} alt={business.name} className="w-full h-full object-cover" />
                        ) : (
                          <Coffee className="w-4 h-4 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{business.name}</div>
                        <div className="text-xs text-gray-500">
                          {business.locations.length} location{business.locations.length !== 1 ? 's' : ''} • 
                          {business.leadsieConnected ? (
                            <span className="text-green-600 ml-1">✓ Connected</span>
                          ) : (
                            <span className="text-red-600 ml-1">⚠ Not Connected</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedBusiness && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-amber-100 flex items-center justify-center">
                    {selectedBusiness.logo ? (
                      <img src={selectedBusiness.logo} alt={selectedBusiness.name} className="w-full h-full object-cover" />
                    ) : (
                      <Coffee className="w-6 h-6 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-800">{selectedBusiness.name}</h3>
                    <p className="text-sm text-amber-600">
                      {selectedBusiness.locations.length} location{selectedBusiness.locations.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {selectedBusiness.leadsieConnected && (
                    <Badge className="bg-green-100 text-green-700 border-green-200 ml-auto">
                      Meta Connected
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-amber-700">Brand Assets</div>
                    <div className="text-amber-600">
                      {selectedBusiness.brandAssets.templates.length} templates, {selectedBusiness.brandAssets.previousCreatives.length} creatives
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-amber-700">Primary Location</div>
                    <div className="text-amber-600">
                      {selectedBusiness.locations[0]?.city}, {selectedBusiness.locations[0]?.state}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-amber-700">Meta Business</div>
                    <div className="text-amber-600">
                      {selectedBusiness.leadsieConnected ? 'Connected via Leadsie' : 'Not Connected'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Step 1: Industry Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              Step 1: Choose Your Industry
            </CardTitle>
            <CardDescription>
              Select your business type to see tailored campaign packages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {industries.map((industry) => (
                <motion.div
                  key={industry.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedIndustry === industry.id
                        ? 'ring-2 ring-indigo-500 bg-indigo-50'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => {
                      setSelectedIndustry(industry.id)
                      setSelectedPlatform('')
                      setSelectedPackage('')
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="flex justify-center mb-2 text-indigo-600">
                        {industry.icon}
                      </div>
                      <h3 className="font-medium text-sm">{industry.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Step 2: Platform Selection */}
      {selectedIndustryData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                Step 2: Choose Your Platform
              </CardTitle>
              <CardDescription>
                Select where you want to run your {selectedIndustryData.name} campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {platforms.map((platform) => (
                  <motion.div
                    key={platform.id}
                    whileHover={{ scale: platform.available ? 1.02 : 1 }}
                    whileTap={{ scale: platform.available ? 0.98 : 1 }}
                  >
                    <Card
                      className={`transition-all relative ${
                        !platform.available
                          ? 'opacity-60 cursor-not-allowed bg-gray-50'
                          : selectedPlatform === platform.id
                          ? 'ring-2 ring-indigo-500 bg-indigo-50 cursor-pointer'
                          : 'hover:shadow-md cursor-pointer'
                      }`}
                      onClick={() => {
                        if (platform.available) {
                          setSelectedPlatform(platform.id)
                          setSelectedPackage('')
                        }
                      }}
                    >
                      {platform.comingSoon && (
                        <Badge className="absolute -top-2 left-4 bg-amber-500">
                          Coming Soon
                        </Badge>
                      )}
                      {platform.id === 'meta' && (
                        <Badge className="absolute -top-2 right-4 bg-emerald-500">
                          Available Now
                        </Badge>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`${platform.available ? 'text-indigo-600' : 'text-gray-400'}`}>
                            {platform.icon}
                          </div>
                          <h3 className={`font-semibold ${!platform.available ? 'text-gray-500' : ''}`}>
                            {platform.name}
                          </h3>
                        </div>
                        <p className={`text-sm mb-3 ${platform.available ? 'text-gray-600' : 'text-gray-400'}`}>
                          {platform.description}
                        </p>
                        <div className="space-y-2">
                          <div className={`text-xs ${platform.available ? 'text-gray-500' : 'text-gray-400'}`}>
                            Features:
                          </div>
                          {platform.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className={`text-xs flex items-center gap-1 ${
                              platform.available ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              <div className={`w-1 h-1 rounded-full ${
                                platform.available ? 'bg-indigo-400' : 'bg-gray-300'
                              }`} />
                              {feature}
                            </div>
                          ))}
                          {platform.features.length > 2 && (
                            <div className={`text-xs ${
                              platform.available ? 'text-indigo-600' : 'text-gray-400'
                            }`}>
                              +{platform.features.length - 2} more features
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Step 3: Package Selection */}
      {selectedIndustryData && selectedPlatform && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-indigo-600" />
                Step 3: Choose Your Campaign Package
              </CardTitle>
              <CardDescription>
                Pre-built packages optimized for {selectedIndustryData.name} businesses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {selectedIndustryData.packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all relative ${
                        selectedPackage === pkg.id
                          ? 'ring-2 ring-indigo-500 bg-indigo-50'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => {
                        setSelectedPackage(pkg.id)
                        setBudget([pkg.recommendedBudget])
                      }}
                    >
                      {pkg.popular && (
                        <Badge className="absolute -top-2 left-4 bg-emerald-500">
                          Most Popular
                        </Badge>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-indigo-600">{pkg.icon}</div>
                          <h3 className="font-semibold">{pkg.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                        <div className="space-y-2 mb-3">
                          <div className="text-xs text-gray-500">Includes:</div>
                          {pkg.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                              <div className="w-1 h-1 bg-indigo-400 rounded-full" />
                              {feature}
                            </div>
                          ))}
                          {pkg.features.length > 2 && (
                            <div className="text-xs text-indigo-600">
                              +{pkg.features.length - 2} more features
                            </div>
                          )}
                        </div>
                        <Separator className="my-3" />
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Recommended Budget:</span>
                          <span className="font-semibold">${pkg.recommendedBudget}/mo</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Est. Reach:</span>
                          <span className="font-semibold text-emerald-600">{pkg.estimatedReach}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Step 4: Campaign Details */}
      {selectedPackageData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Step 4: Campaign Details
              </CardTitle>
              <CardDescription>
                Set your budget, timeline, and campaign specifics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Campaign Name */}
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  placeholder="e.g., Spring Home Repair Campaign"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>

              {/* Budget Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Monthly Budget</Label>
                  <div className="text-2xl font-bold text-indigo-600">
                    ${budget[0].toLocaleString()}
                  </div>
                </div>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  max={2000}
                  min={100}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$100</span>
                  <span>Recommended: ${selectedPackageData.recommendedBudget}</span>
                  <span>$2,000</span>
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Campaign Objective */}
              <div className="space-y-2">
                <Label htmlFor="objective">Primary Objective</Label>
                <Select value={objective} onValueChange={setObjective}>
                  <SelectTrigger>
                    <SelectValue placeholder="What's your main goal?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leads">Generate Leads</SelectItem>
                    <SelectItem value="sales">Drive Sales</SelectItem>
                    <SelectItem value="traffic">Increase Website Traffic</SelectItem>
                    <SelectItem value="awareness">Build Brand Awareness</SelectItem>
                    <SelectItem value="engagement">Boost Engagement</SelectItem>
                    <SelectItem value="app-installs">App Installs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Who are you trying to reach?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local-customers">Local Customers (5-mile radius)</SelectItem>
                    <SelectItem value="existing-customers">Existing Customers</SelectItem>
                    <SelectItem value="lookalike">Similar to Best Customers</SelectItem>
                    <SelectItem value="competitors">Competitor's Customers</SelectItem>
                    <SelectItem value="demographics">Custom Demographics</SelectItem>
                    <SelectItem value="interests">Interest-Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Token Cost Display */}
              {tokenCost && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-blue-800 flex items-center gap-2">
                      <Coins className="w-4 h-4" />
                      Token Cost Breakdown
                    </h4>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-800">
                        {tokenCost.totalTokens.toLocaleString()} tokens
                      </div>
                      <div className="text-xs text-blue-600">
                        ≈ ${tokenCost.estimatedMediaSpend.toFixed(2)} media spend
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {tokenCost.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-blue-700">{item.description}</span>
                        <span className="font-medium">{item.tokens.toLocaleString()} tokens</span>
                      </div>
                    ))}
                  </div>

                  {/* Wallet Balance */}
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Your Token Balance:</span>
                      <span className="font-semibold text-blue-800">
                        {wallet?.totalTokens.toLocaleString() || 0} tokens
                      </span>
                    </div>
                    {!canAffordCampaign && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-700">
                          Insufficient tokens. You need {(tokenCost.totalTokens - (wallet?.totalTokens || 0)).toLocaleString()} more tokens.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Campaign Enhancements */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Campaign Enhancements</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Advanced Targeting</div>
                      <div className="text-sm text-gray-600">Radius, demographics, and behavioral targeting</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">+500 tokens</span>
                      <input
                        type="checkbox"
                        checked={hasAdvancedTargeting}
                        onChange={(e) => setHasAdvancedTargeting(e.target.checked)}
                        className="rounded"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Priority Queue</div>
                      <div className="text-sm text-gray-600">Faster campaign processing and approval</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">+1,000 tokens</span>
                      <input
                        type="checkbox"
                        checked={hasPriorityQueue}
                        onChange={(e) => setHasPriorityQueue(e.target.checked)}
                        className="rounded"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Creative Assets</div>
                      <div className="text-sm text-gray-600">Number of AI-generated creative assets</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {creativeAssets <= 10 ? 'Free' : `+${(creativeAssets - 10) * 500} tokens`}
                      </span>
                      <select
                        value={creativeAssets}
                        onChange={(e) => setCreativeAssets(Number(e.target.value))}
                        className="border rounded px-2 py-1"
                      >
                        {[1, 2, 3, 5, 10, 15, 20].map(num => (
                          <option key={num} value={num}>{num} assets</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Launch Button */}
              <div className="pt-4">
                <Button
                  onClick={handleLaunchCampaign}
                  className={`w-full py-3 text-lg ${
                    canAffordCampaign 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={
                    !campaignName || 
                    !selectedPlatform || 
                    !startDate || 
                    !endDate || 
                    !objective || 
                    !targetAudience ||
                    !canAffordCampaign
                  }
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  {canAffordCampaign ? 'Launch Campaign' : 'Insufficient Tokens'}
                </Button>
                
                {!canAffordCampaign && tokenCost && (
                  <p className="text-center text-sm text-gray-600 mt-2">
                    <Button variant="link" className="p-0 h-auto text-indigo-600">
                      Buy more tokens
                    </Button> or reduce campaign scope
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Campaign Preview */}
      {selectedPackageData && campaignName && selectedPlatform && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-indigo-50 to-emerald-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-800">Campaign Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-indigo-700">Campaign</div>
                  <div>{campaignName}</div>
                  <div className="text-gray-600">{selectedPackageData.name}</div>
                </div>
                <div>
                  <div className="font-semibold text-indigo-700">Platform</div>
                  <div>{platforms.find(p => p.id === selectedPlatform)?.name}</div>
                  <div className="text-gray-600">Meta Ads</div>
                </div>
                <div>
                  <div className="font-semibold text-indigo-700">Budget & Timeline</div>
                  <div>${budget[0].toLocaleString()}/month</div>
                  <div className="text-gray-600">
                    {startDate && endDate && `${startDate} to ${endDate}`}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-indigo-700">Expected Results</div>
                  <div className="text-emerald-600">{selectedPackageData.estimatedReach}</div>
                  <div className="text-gray-600">Est. monthly reach</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}