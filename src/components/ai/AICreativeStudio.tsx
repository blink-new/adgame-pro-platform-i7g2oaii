import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Copy, 
  RefreshCw, 
  Download, 
  Target, 
  Wand2,
  Image as ImageIcon,
  Video,
  FileText,
  Zap,
  TrendingUp,
  CheckCircle,
  Upload,
  X,
  Shield,
  AlertTriangle,
  Eye,
  Coffee,
  Building2
} from 'lucide-react'
import { useBusiness } from '@/hooks/useBusiness'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import blink from '@/blink/client'

interface GeneratedContent {
  headlines: string[]
  descriptions: string[]
  ctas: string[]
  images?: string[]
}

interface CreativeBrief {
  businessName: string
  businessType: string
  targetAudience: string
  adFormat: string
  brandTone: string
  specificGoals: string
  location: string
}

interface UploadedAsset {
  id: string
  file: File
  url: string
  name: string
  type: 'image' | 'video'
  isCompliant?: boolean
  complianceNotes?: string
}

export default function AICreativeStudio() {
  const { toast } = useToast()
  const { selectedBusiness } = useBusiness()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [creativeBrief, setCreativeBrief] = useState<CreativeBrief>({
    businessName: '',
    businessType: '',
    targetAudience: '',
    adFormat: 'single-image',
    brandTone: 'professional',
    specificGoals: '',
    location: ''
  })
  
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [isCheckingCompliance, setIsCheckingCompliance] = useState(false)
  
  // New state for uploaded assets
  const [uploadedAssets, setUploadedAssets] = useState<UploadedAsset[]>([])
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [customPrompt, setCustomPrompt] = useState('')
  
  // Auto-populate from selected business
  useEffect(() => {
    if (selectedBusiness) {
      setCreativeBrief(prev => ({
        ...prev,
        businessName: selectedBusiness.name,
        businessType: selectedBusiness.type === 'coffee' ? 'coffee-shop' : selectedBusiness.type,
        location: selectedBusiness.locations[0] ? `${selectedBusiness.locations[0].city}, ${selectedBusiness.locations[0].state}` : ''
      }))
      
      // Pre-populate with business assets
      const businessAssets: UploadedAsset[] = selectedBusiness.brandAssets.templates.map(template => ({
        id: template.id,
        file: new File([], template.name),
        url: template.thumbnail,
        name: template.name,
        type: template.type,
        isCompliant: true,
        complianceNotes: 'Pre-approved brand asset'
      }))
      
      setUploadedAssets(businessAssets)
    }
  }, [selectedBusiness])

  const handleInputChange = (field: keyof CreativeBrief, value: string) => {
    setCreativeBrief(prev => ({ ...prev, [field]: value }))
  }

  const checkBrandCompliance = async (asset: UploadedAsset) => {
    setIsCheckingCompliance(true)
    
    try {
      const { text } = await blink.ai.generateText({
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this ${asset.type} for brand compliance. Check for:
                
                1. Professional quality and composition
                2. Appropriate content for business advertising
                3. No copyrighted material or logos from other brands
                4. Suitable for ${creativeBrief.businessType || 'general business'} industry
                5. Family-friendly and appropriate for all audiences
                6. Good lighting, resolution, and visual quality
                
                Respond with:
                - COMPLIANT or NON_COMPLIANT
                - Brief explanation of any issues or approval notes
                
                Business context: ${creativeBrief.businessName || 'Business'} - ${creativeBrief.businessType || 'General business'}`
              },
              {
                type: "image",
                image: asset.url
              }
            ]
          }
        ]
      })

      const isCompliant = text.toUpperCase().includes('COMPLIANT') && !text.toUpperCase().includes('NON_COMPLIANT')
      const complianceNotes = text.replace(/^(COMPLIANT|NON_COMPLIANT)\s*-?\s*/i, '').trim()

      setUploadedAssets(prev => 
        prev.map(a => 
          a.id === asset.id 
            ? { ...a, isCompliant, complianceNotes }
            : a
        )
      )

      toast({
        title: isCompliant ? "✅ Brand Compliant" : "⚠️ Compliance Issues",
        description: isCompliant 
          ? "Asset approved for use in campaigns" 
          : "Please review compliance notes",
        variant: isCompliant ? "default" : "destructive"
      })
    } catch (error) {
      console.error('Compliance check error:', error)
      toast({
        title: "Compliance Check Failed",
        description: "Unable to verify brand compliance. Please review manually.",
        variant: "destructive"
      })
    } finally {
      setIsCheckingCompliance(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload only image or video files.",
          variant: "destructive"
        })
        continue
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File Too Large",
          description: "Please upload files smaller than 10MB.",
          variant: "destructive"
        })
        continue
      }

      try {
        // Upload to storage
        const { publicUrl } = await blink.storage.upload(
          file,
          `assets/${Date.now()}-${file.name}`,
          { upsert: true }
        )

        const newAsset: UploadedAsset = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          file,
          url: publicUrl,
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'video'
        }

        setUploadedAssets(prev => [...prev, newAsset])
        
        // Auto-check brand compliance
        checkBrandCompliance(newAsset)

        toast({
          title: "Asset Uploaded",
          description: `${file.name} uploaded successfully. Checking brand compliance...`,
        })
      } catch (error) {
        console.error('Upload error:', error)
        toast({
          title: "Upload Failed",
          description: `Failed to upload ${file.name}. Please try again.`,
          variant: "destructive"
        })
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeAsset = (assetId: string) => {
    setUploadedAssets(prev => prev.filter(a => a.id !== assetId))
    setSelectedAssets(prev => prev.filter(id => id !== assetId))
  }

  const toggleAssetSelection = (assetId: string) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    )
  }

  const generateContent = async () => {
    if (!creativeBrief.businessName || !creativeBrief.businessType || !creativeBrief.targetAudience) {
      toast({
        title: "Missing Information",
        description: "Please fill in business name, type, and target audience.",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    
    try {
      const prompt = `Create high-converting ad copy for a ${creativeBrief.businessType} business called "${creativeBrief.businessName}" targeting ${creativeBrief.targetAudience}. 
      
      Business details:
      - Location: ${creativeBrief.location || 'Local area'}
      - Ad format: ${creativeBrief.adFormat}
      - Brand tone: ${creativeBrief.brandTone}
      - Specific goals: ${creativeBrief.specificGoals || 'Drive more customers'}
      
      Generate:
      1. 5 compelling headlines (max 40 characters each)
      2. 5 engaging descriptions (max 125 characters each)
      3. 5 strong call-to-action phrases (max 20 characters each)
      
      Make them specific to the business type and location. Focus on benefits and urgency.`

      const { object } = await blink.ai.generateObject({
        prompt,
        schema: {
          type: 'object',
          properties: {
            headlines: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of 5 compelling headlines'
            },
            descriptions: {
              type: 'array', 
              items: { type: 'string' },
              description: 'Array of 5 engaging descriptions'
            },
            ctas: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of 5 call-to-action phrases'
            }
          },
          required: ['headlines', 'descriptions', 'ctas']
        }
      })

      setGeneratedContent(object as GeneratedContent)
      
      toast({
        title: "Content Generated!",
        description: "AI has created your ad copy. Review and customize as needed.",
      })
    } catch (error) {
      console.error('Error generating content:', error)
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateImagesWithReference = async () => {
    if (!creativeBrief.businessName || !creativeBrief.businessType) {
      toast({
        title: "Missing Information",
        description: "Please fill in business details first.",
        variant: "destructive"
      })
      return
    }

    if (selectedAssets.length === 0 && !customPrompt.trim()) {
      toast({
        title: "Missing Input",
        description: "Please select reference images or enter a custom prompt.",
        variant: "destructive"
      })
      return
    }

    setIsGeneratingImages(true)
    
    try {
      const selectedAssetUrls = uploadedAssets
        .filter(asset => selectedAssets.includes(asset.id) && asset.isCompliant)
        .map(asset => asset.url)

      let finalPrompt = customPrompt.trim()
      
      if (!finalPrompt) {
        finalPrompt = `Professional marketing image for ${creativeBrief.businessName}, a ${creativeBrief.businessType} business. 
        Style: ${creativeBrief.brandTone}, high-quality, suitable for ${creativeBrief.adFormat} ads. 
        Show: ${creativeBrief.businessType} service/product in action, appealing to ${creativeBrief.targetAudience}.
        No text overlays, clean composition, brand-appropriate colors.`
      }

      // Add brand compliance instructions
      finalPrompt += ` 

      BRAND COMPLIANCE REQUIREMENTS:
      - Professional quality only
      - Family-friendly content
      - No copyrighted material
      - Appropriate for ${creativeBrief.businessType} industry
      - Clean, high-resolution composition
      - Brand-appropriate colors and styling`

      let generatedImages: string[]

      if (selectedAssetUrls.length > 0) {
        // Use reference images with modifyImage
        const { data } = await blink.ai.modifyImage({
          images: selectedAssetUrls,
          prompt: finalPrompt,
          quality: 'high',
          n: 4
        })
        generatedImages = data.map(img => img.url)
      } else {
        // Generate from scratch
        const { data } = await blink.ai.generateImage({
          prompt: finalPrompt,
          size: '1024x1024',
          quality: 'high',
          n: 4
        })
        generatedImages = data.map(img => img.url)
      }

      setGeneratedContent(prev => prev ? { ...prev, images: generatedImages } : null)
      
      toast({
        title: "Images Generated!",
        description: selectedAssetUrls.length > 0 
          ? "AI has created new images based on your reference assets."
          : "AI has created visual assets for your campaign.",
      })
    } catch (error) {
      console.error('Error generating images:', error)
      toast({
        title: "Image Generation Failed",
        description: "Failed to generate images. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGeneratingImages(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    })
  }

  const regenerateSection = async (section: 'headlines' | 'descriptions' | 'ctas') => {
    if (!generatedContent) return
    
    setIsGenerating(true)
    
    try {
      const sectionPrompts = {
        headlines: `Generate 5 new compelling headlines for ${creativeBrief.businessName} (${creativeBrief.businessType}). Max 40 characters each. Tone: ${creativeBrief.brandTone}`,
        descriptions: `Generate 5 new engaging descriptions for ${creativeBrief.businessName} (${creativeBrief.businessType}). Max 125 characters each. Tone: ${creativeBrief.brandTone}`,
        ctas: `Generate 5 new call-to-action phrases for ${creativeBrief.businessName} (${creativeBrief.businessType}). Max 20 characters each. Tone: ${creativeBrief.brandTone}`
      }

      const { object } = await blink.ai.generateObject({
        prompt: sectionPrompts[section],
        schema: {
          type: 'object',
          properties: {
            [section]: {
              type: 'array',
              items: { type: 'string' },
              description: `Array of 5 new ${section}`
            }
          },
          required: [section]
        }
      })

      setGeneratedContent(prev => prev ? { ...prev, ...object } : null)
      
      toast({
        title: "Regenerated!",
        description: `New ${section} have been generated.`,
      })
    } catch (error) {
      console.error('Error regenerating:', error)
      toast({
        title: "Regeneration Failed",
        description: "Failed to regenerate content. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const getPerformanceBadge = (index: number) => {
    const performance = ['High', 'High', 'Medium', 'Medium', 'Low'][index] || 'Medium'
    const colors = {
      High: 'bg-green-100 text-green-700',
      Medium: 'bg-yellow-100 text-yellow-700', 
      Low: 'bg-red-100 text-red-700'
    }
    return (
      <Badge className={`text-xs ${colors[performance as keyof typeof colors]}`}>
        {performance} Performance
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Creative Studio
          </h2>
          <p className="text-muted-foreground">
            Upload your assets and generate brand-compliant ad copy and visuals with AI
          </p>
          {selectedBusiness && (
            <div className="flex items-center gap-2 mt-2 p-2 bg-amber-50 rounded-lg border border-amber-200">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-amber-100 flex items-center justify-center">
                {selectedBusiness.logo ? (
                  <img src={selectedBusiness.logo} alt={selectedBusiness.name} className="w-full h-full object-cover" />
                ) : (
                  <Coffee className="w-3 h-3 text-amber-600" />
                )}
              </div>
              <span className="text-sm font-medium text-amber-800">
                Creating for {selectedBusiness.name}
              </span>
              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                {selectedBusiness.brandAssets.templates.length} Brand Assets Loaded
              </Badge>
            </div>
          )}
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Zap className="h-4 w-4 mr-2" />
          Real AI Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Creative Brief Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Creative Brief
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={creativeBrief.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="e.g., Joe's Coffee Shop"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type *</Label>
              <Select value={creativeBrief.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant/QSR</SelectItem>
                  <SelectItem value="coffee-shop">Coffee Shop</SelectItem>
                  <SelectItem value="auto-repair">Auto Repair</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="home-services">Home Services</SelectItem>
                  <SelectItem value="med-spa">Med Spa</SelectItem>
                  <SelectItem value="dental">Dental Practice</SelectItem>
                  <SelectItem value="chiropractic">Chiropractic</SelectItem>
                  <SelectItem value="fitness">Fitness/Gym</SelectItem>
                  <SelectItem value="retail">Retail Store</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={creativeBrief.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Downtown Seattle"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience *</Label>
              <Textarea
                id="targetAudience"
                value={creativeBrief.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                placeholder="e.g., Busy professionals aged 25-45 who value quality coffee"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adFormat">Ad Format</Label>
              <Select value={creativeBrief.adFormat} onValueChange={(value) => handleInputChange('adFormat', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single-image">Single Image</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="collection">Collection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandTone">Brand Tone</Label>
              <Select value={creativeBrief.brandTone} onValueChange={(value) => handleInputChange('brandTone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="trustworthy">Trustworthy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specificGoals">Specific Goals</Label>
              <Textarea
                id="specificGoals"
                value={creativeBrief.specificGoals}
                onChange={(e) => handleInputChange('specificGoals', e.target.value)}
                placeholder="e.g., Increase foot traffic, promote new menu items"
                rows={2}
              />
            </div>

            <Button 
              onClick={generateContent} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Content */}
        <div className="lg:col-span-2">
          {generatedContent ? (
            <Tabs defaultValue="copy" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="copy">Ad Copy</TabsTrigger>
                <TabsTrigger value="assets">Your Assets</TabsTrigger>
                <TabsTrigger value="visuals">AI Visuals</TabsTrigger>
              </TabsList>

              <TabsContent value="copy" className="space-y-6">
                {/* Headlines */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Headlines
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => regenerateSection('headlines')}
                      disabled={isGenerating}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {generatedContent.headlines.map((headline, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{headline}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {getPerformanceBadge(index)}
                            <span className="text-xs text-muted-foreground">
                              {headline.length}/40 chars
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(headline)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Descriptions */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Descriptions
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => regenerateSection('descriptions')}
                      disabled={isGenerating}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {generatedContent.descriptions.map((description, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <p>{description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {getPerformanceBadge(index)}
                            <span className="text-xs text-muted-foreground">
                              {description.length}/125 chars
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(description)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* CTAs */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Call-to-Actions
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => regenerateSection('ctas')}
                      disabled={isGenerating}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {generatedContent.ctas.map((cta, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{cta}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {getPerformanceBadge(index)}
                            <span className="text-xs text-muted-foreground">
                              {cta.length}/20 chars
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(cta)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Export All Content
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Target className="h-4 w-4 mr-2" />
                        Create Campaign
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assets" className="space-y-6">
                {/* Asset Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Upload Your Assets
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Upload images or videos to use as reference for AI generation. All assets are automatically checked for brand compliance.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div 
                        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm font-medium mb-2">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">
                          Images and videos up to 10MB • JPG, PNG, GIF, MP4, MOV
                        </p>
                      </div>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Uploaded Assets */}
                {uploadedAssets.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5" />
                        Your Assets ({uploadedAssets.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {uploadedAssets.map((asset) => (
                          <motion.div
                            key={asset.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                          >
                            <div 
                              className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                                selectedAssets.includes(asset.id) 
                                  ? 'border-primary ring-2 ring-primary/20' 
                                  : 'border-muted hover:border-primary/50'
                              }`}
                              onClick={() => toggleAssetSelection(asset.id)}
                            >
                              {asset.type === 'image' ? (
                                <img 
                                  src={asset.url} 
                                  alt={asset.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                  <Video className="h-8 w-8 text-muted-foreground" />
                                </div>
                              )}
                              
                              {/* Selection indicator */}
                              {selectedAssets.includes(asset.id) && (
                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                  <CheckCircle className="h-8 w-8 text-primary" />
                                </div>
                              )}
                              
                              {/* Compliance status */}
                              <div className="absolute top-2 left-2">
                                {asset.isCompliant === undefined ? (
                                  <Badge variant="secondary" className="text-xs">
                                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                    Checking
                                  </Badge>
                                ) : asset.isCompliant ? (
                                  <Badge className="text-xs bg-green-100 text-green-700">
                                    <Shield className="h-3 w-3 mr-1" />
                                    Approved
                                  </Badge>
                                ) : (
                                  <Badge variant="destructive" className="text-xs">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Issues
                                  </Badge>
                                )}
                              </div>
                              
                              {/* Remove button */}
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeAsset(asset.id)
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="mt-2">
                              <p className="text-xs font-medium truncate">{asset.name}</p>
                              {asset.complianceNotes && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {asset.complianceNotes}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Custom Prompt */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="h-5 w-5" />
                      Custom AI Prompt
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Describe exactly what you want to see in your generated images
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="e.g., Show a happy family enjoying coffee in a cozy cafe setting with warm lighting and modern decor. Include our signature blue mugs and wooden tables."
                      rows={4}
                    />
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>All generated content will be automatically checked for brand compliance</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="visuals" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      AI Generated Images
                    </CardTitle>
                    <Button 
                      onClick={generateImagesWithReference}
                      disabled={isGeneratingImages}
                      variant="outline"
                    >
                      {isGeneratingImages ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          Generate Images
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {selectedAssets.length > 0 && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">
                          Using {selectedAssets.length} reference asset(s) for generation
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          AI will create new images inspired by your selected assets while maintaining brand compliance
                        </p>
                      </div>
                    )}
                    
                    {generatedContent.images ? (
                      <div className="grid grid-cols-2 gap-4">
                        {generatedContent.images.map((imageUrl, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                          >
                            <img 
                              src={imageUrl} 
                              alt={`Generated image ${index + 1}`}
                              className="w-full aspect-square object-cover rounded-lg border"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                              <Button size="sm" variant="secondary">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="secondary">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="secondary">
                                Use Image
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <ImageIcon className="h-12 w-12 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Ready to Generate Images</h3>
                        <p className="mb-4">Upload reference assets or enter a custom prompt, then click "Generate Images"</p>
                        <div className="text-sm space-y-1">
                          <p>• Use your uploaded assets as reference</p>
                          <p>• Add custom prompts for specific requirements</p>
                          <p>• All images are brand compliance checked</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="h-full">
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center text-muted-foreground">
                  <Sparkles className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ready to Create Amazing Content</h3>
                  <p>Fill out the creative brief and click "Generate Content" to get started</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}