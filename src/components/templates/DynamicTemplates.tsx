import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, Sparkles, Heart, MessageCircle, Share, MoreHorizontal, Bookmark } from 'lucide-react'

interface TemplateData {
  industry: string
  style: string
  image: string | null
  fields: Record<string, string>
}

const industries = {
  'Real Estate': {
    templates: [
      { id: 'viral-listing', name: 'Viral Listing', style: 'Viral Style', icon: '🔥' },
      { id: 'professional-showcase', name: 'Professional Showcase', style: 'Professional Style', icon: '🏢' },
      { id: 'friendly-tour', name: 'Friendly Tour', style: 'Friendly Style', icon: '🏡' }
    ],
    fields: ['price', 'address', 'beds', 'baths', 'sqft', 'agent', 'phone']
  },
  'Restaurant': {
    templates: [
      { id: 'viral-special', name: 'Viral Special', style: 'Viral Style', icon: '✨' },
      { id: 'professional-menu', name: 'Professional Menu', style: 'Professional Style', icon: '📋' },
      { id: 'friendly-welcome', name: 'Friendly Welcome', style: 'Friendly Style', icon: '👋' }
    ],
    fields: ['offer', 'description', 'location', 'phone', 'hours']
  },
  'Auto': {
    templates: [
      { id: 'viral-deal', name: 'Viral Deal', style: 'Viral Style', icon: '🚗' },
      { id: 'professional-showcase', name: 'Professional Showcase', style: 'Professional Style', icon: '🏆' },
      { id: 'friendly-service', name: 'Friendly Service', style: 'Friendly Style', icon: '🔧' }
    ],
    fields: ['vehicle', 'price', 'year', 'mileage', 'dealer', 'phone']
  },
  'Medical': {
    templates: [
      { id: 'viral-transformation', name: 'Viral Transformation', style: 'Viral Style', icon: '✨' },
      { id: 'professional-care', name: 'Professional Care', style: 'Professional Style', icon: '🏥' },
      { id: 'friendly-wellness', name: 'Friendly Wellness', style: 'Friendly Style', icon: '💚' }
    ],
    fields: ['service', 'offer', 'doctor', 'clinic', 'phone']
  }
}

export default function DynamicTemplates() {
  const [templateData, setTemplateData] = useState<TemplateData>({
    industry: '',
    style: '',
    image: null,
    fields: {}
  })
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [previewMode, setPreviewMode] = useState<'facebook' | 'instagram'>('facebook')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setTemplateData(prev => ({ ...prev, image: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    setTemplateData(prev => ({
      ...prev,
      fields: { ...prev.fields, [field]: value }
    }))
  }

  const getFieldLabel = (field: string) => {
    const labels: Record<string, string> = {
      price: 'Price',
      address: 'Address',
      beds: 'Bedrooms',
      baths: 'Bathrooms',
      sqft: 'Square Feet',
      agent: 'Agent Name',
      phone: 'Phone Number',
      offer: 'Special Offer',
      description: 'Description',
      location: 'Location',
      hours: 'Hours',
      vehicle: 'Vehicle',
      year: 'Year',
      mileage: 'Mileage',
      dealer: 'Dealer Name',
      service: 'Service',
      doctor: 'Doctor Name',
      clinic: 'Clinic Name'
    }
    return labels[field] || field
  }

  const renderFacebookPreview = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto font-meta">
      {/* Facebook Header */}
      <div className="flex items-center p-3 border-b border-gray-100">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          B
        </div>
        <div className="ml-3 flex-1">
          <div className="font-semibold text-gray-900 text-sm">
            {templateData.fields.agent || templateData.fields.dealer || templateData.fields.clinic || 'Business Name'}
          </div>
          <div className="text-xs text-gray-500 flex items-center">
            Sponsored · <span className="ml-1">🌍</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-400">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="p-3">
        <p className="text-gray-900 text-sm mb-3 font-medium">
          {templateData.fields.offer || templateData.fields.description || 'Check out this amazing opportunity!'}
        </p>
      </div>

      {/* Image */}
      <div className="relative bg-gray-100 aspect-square">
        {templateData.image ? (
          <img 
            src={templateData.image} 
            alt="Ad content" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Upload className="w-12 h-12" />
          </div>
        )}
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
          {templateData.industry === 'Real Estate' && (
            <>
              <div className="text-2xl font-bold mb-1">
                ${templateData.fields.price || '599,000'}
              </div>
              <div className="text-sm opacity-90 mb-2">
                {templateData.fields.beds || '3'} bed • {templateData.fields.baths || '2'} bath • {templateData.fields.sqft || '1,850'} sqft
              </div>
              <div className="text-sm opacity-90">
                {templateData.fields.address || '123 Main Street, City, State'}
              </div>
            </>
          )}
          
          {templateData.industry === 'Restaurant' && (
            <>
              <div className="text-2xl font-bold mb-1">
                {templateData.fields.offer || 'BOGO!'}
              </div>
              <div className="text-sm opacity-90 mb-2">
                {templateData.fields.description || 'Every Tuesday This Summer'}
              </div>
              <div className="text-sm opacity-90">
                {templateData.fields.location || 'Restaurant Name'} • {templateData.fields.phone || '555-555-5555'}
              </div>
            </>
          )}
          
          {templateData.industry === 'Auto' && (
            <>
              <div className="text-2xl font-bold mb-1">
                {templateData.fields.vehicle || '2023 Honda Civic'}
              </div>
              <div className="text-sm opacity-90 mb-2">
                ${templateData.fields.price || '24,999'} • {templateData.fields.mileage || '15,000'} miles
              </div>
              <div className="text-sm opacity-90">
                {templateData.fields.dealer || 'Auto Dealer'} • {templateData.fields.phone || '555-555-5555'}
              </div>
            </>
          )}
          
          {templateData.industry === 'Medical' && (
            <>
              <div className="text-2xl font-bold mb-1">
                {templateData.fields.service || 'Transform Your Smile'}
              </div>
              <div className="text-sm opacity-90 mb-2">
                {templateData.fields.offer || 'Free Consultation This Month'}
              </div>
              <div className="text-sm opacity-90">
                {templateData.fields.clinic || 'Medical Center'} • {templateData.fields.phone || '555-555-5555'}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Engagement */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-gray-600 text-sm">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <Heart className="w-5 h-5" />
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <MessageCircle className="w-5 h-5" />
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <Share className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderInstagramPreview = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-sm mx-auto font-meta">
      {/* Instagram Header */}
      <div className="flex items-center p-3 border-b border-gray-100">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
          B
        </div>
        <div className="ml-3 flex-1">
          <div className="font-semibold text-gray-900 text-sm">
            {templateData.fields.agent || templateData.fields.dealer || templateData.fields.clinic || 'business_name'}
          </div>
          <div className="text-xs text-gray-500">Sponsored</div>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-400">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Image */}
      <div className="relative bg-gray-100 aspect-square">
        {templateData.image ? (
          <img 
            src={templateData.image} 
            alt="Ad content" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Upload className="w-12 h-12" />
          </div>
        )}
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
          {templateData.industry === 'Real Estate' && (
            <>
              <div className="text-xl font-bold mb-1">
                ${templateData.fields.price || '599,000'}
              </div>
              <div className="text-xs opacity-90 mb-1">
                {templateData.fields.beds || '3'} bed • {templateData.fields.baths || '2'} bath
              </div>
              <div className="text-xs opacity-90">
                {templateData.fields.address || '123 Main Street'}
              </div>
            </>
          )}
          
          {templateData.industry === 'Restaurant' && (
            <>
              <div className="text-xl font-bold mb-1">
                {templateData.fields.offer || 'BOGO!'}
              </div>
              <div className="text-xs opacity-90">
                {templateData.fields.location || 'Restaurant Name'}
              </div>
            </>
          )}
          
          {templateData.industry === 'Auto' && (
            <>
              <div className="text-xl font-bold mb-1">
                {templateData.fields.vehicle || '2023 Honda Civic'}
              </div>
              <div className="text-xs opacity-90">
                ${templateData.fields.price || '24,999'}
              </div>
            </>
          )}
          
          {templateData.industry === 'Medical' && (
            <>
              <div className="text-xl font-bold mb-1">
                {templateData.fields.service || 'Transform Your Smile'}
              </div>
              <div className="text-xs opacity-90">
                {templateData.fields.clinic || 'Medical Center'}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Engagement */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <Heart className="w-6 h-6 text-gray-700" />
            <MessageCircle className="w-6 h-6 text-gray-700" />
            <Share className="w-6 h-6 text-gray-700" />
          </div>
          <Bookmark className="w-6 h-6 text-gray-700" />
        </div>
        <div className="text-sm font-semibold text-gray-900 mb-1">
          247 likes
        </div>
        <div className="text-sm text-gray-900">
          <span className="font-semibold">
            {templateData.fields.agent || templateData.fields.dealer || templateData.fields.clinic || 'business_name'}
          </span>{' '}
          {templateData.fields.offer || templateData.fields.description || 'Check out this amazing opportunity!'}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dynamic Templates</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Create professional ads with industry-specific templates. Upload your images and customize the content.
          </p>
          
          {/* Meta Growth Machine Education */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 rounded-full p-3 mr-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Why Meta Ads Are Your Growth Machine</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="font-semibold text-blue-600 mb-2">🎯 Precise Targeting</div>
                <p>Reach exactly who you want - by location, age, interests, and behaviors. No wasted ad spend.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="font-semibold text-blue-600 mb-2">📈 Measurable Results</div>
                <p>Track every click, call, and conversion. See exactly how much revenue each dollar generates.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="font-semibold text-blue-600 mb-2">🚀 Scale What Works</div>
                <p>Start small, find what converts, then scale up. Meta's AI optimizes for your best customers.</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-4 py-2">
                This isn't about boosting posts - it's about strategic growth advertising
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Template Selection */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Choose Template
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select 
                  value={templateData.industry} 
                  onValueChange={(value) => {
                    setTemplateData(prev => ({ ...prev, industry: value, style: '', fields: {} }))
                    setSelectedTemplate('')
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(industries).map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {templateData.industry && (
                <div className="space-y-3">
                  {industries[templateData.industry as keyof typeof industries].templates.map(template => (
                    <div
                      key={template.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      onClick={() => {
                        setSelectedTemplate(template.id)
                        setTemplateData(prev => ({ ...prev, style: template.style }))
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{template.icon}</span>
                        <div>
                          <div className="font-semibold text-gray-900">{template.name}</div>
                          <div className="text-sm text-gray-500">{template.style}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customization */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Customize Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Upload */}
              <div>
                <Label htmlFor="image">Upload Image *</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="image" className="cursor-pointer">
                    {templateData.image ? (
                      <img src={templateData.image} alt="Uploaded" className="w-full h-32 object-cover rounded-lg mb-2" />
                    ) : (
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    )}
                    <p className="text-sm text-gray-600">
                      {templateData.image ? 'Click to change image' : 'Upload your image'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Dynamic Fields */}
              {templateData.industry && (
                <div className="space-y-3">
                  {industries[templateData.industry as keyof typeof industries].fields.map(field => (
                    <div key={field}>
                      <Label htmlFor={field}>{getFieldLabel(field)}</Label>
                      {field === 'description' ? (
                        <Textarea
                          id={field}
                          value={templateData.fields[field] || ''}
                          onChange={(e) => handleFieldChange(field, e.target.value)}
                          placeholder={`Enter ${getFieldLabel(field).toLowerCase()}`}
                          className="mt-1"
                        />
                      ) : (
                        <Input
                          id={field}
                          value={templateData.fields[field] || ''}
                          onChange={(e) => handleFieldChange(field, e.target.value)}
                          placeholder={`Enter ${getFieldLabel(field).toLowerCase()}`}
                          className="mt-1"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Meta Ad Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={previewMode} onValueChange={(value) => setPreviewMode(value as 'facebook' | 'instagram')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="facebook">Facebook Feed</TabsTrigger>
                  <TabsTrigger value="instagram">Instagram</TabsTrigger>
                </TabsList>
                <TabsContent value="facebook" className="mt-4">
                  {renderFacebookPreview()}
                </TabsContent>
                <TabsContent value="instagram" className="mt-4">
                  {renderInstagramPreview()}
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 space-y-3">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Create Campaign with This Ad
                </Button>
                <Button variant="outline" className="w-full">
                  Save Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}