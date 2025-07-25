import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Upload, 
  Palette, 
  Type, 
  Image as ImageIcon,
  Download,
  Eye,
  Wand2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

interface BrandGuideline {
  id: string
  type: 'logo' | 'color' | 'font' | 'imagery'
  name: string
  value: string
  status: 'approved' | 'pending' | 'rejected'
  preview?: string
}

interface ComplianceCheck {
  id: string
  element: string
  status: 'pass' | 'warning' | 'fail'
  message: string
  suggestion?: string
}

export function BrandCompliance() {
  const [brandGuidelines] = useState<BrandGuideline[]>([
    {
      id: 'logo-primary',
      type: 'logo',
      name: 'Primary Logo',
      value: 'logo-primary.svg',
      status: 'approved',
      preview: '/api/placeholder/120/60'
    },
    {
      id: 'logo-white',
      type: 'logo',
      name: 'White Logo',
      value: 'logo-white.svg',
      status: 'approved',
      preview: '/api/placeholder/120/60'
    },
    {
      id: 'color-primary',
      type: 'color',
      name: 'Primary Blue',
      value: '#1E40AF',
      status: 'approved'
    },
    {
      id: 'color-secondary',
      type: 'color',
      name: 'Secondary Orange',
      value: '#F59E0B',
      status: 'approved'
    },
    {
      id: 'font-heading',
      type: 'font',
      name: 'Heading Font',
      value: 'Inter Bold',
      status: 'approved'
    },
    {
      id: 'font-body',
      type: 'font',
      name: 'Body Font',
      value: 'Inter Regular',
      status: 'approved'
    }
  ])

  const [uploadedDesign, setUploadedDesign] = useState<File | null>(null)
  const [complianceResults, setComplianceResults] = useState<ComplianceCheck[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeCompliance = async (file: File) => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: ComplianceCheck[] = [
        {
          id: 'logo-check',
          element: 'Brand Logo',
          status: 'pass',
          message: 'Approved logo detected and properly positioned'
        },
        {
          id: 'color-check',
          element: 'Color Palette',
          status: 'warning',
          message: 'Using off-brand color #FF6B6B',
          suggestion: 'Replace with approved Secondary Orange #F59E0B'
        },
        {
          id: 'font-check',
          element: 'Typography',
          status: 'fail',
          message: 'Using unauthorized font "Comic Sans"',
          suggestion: 'Replace with approved Inter Bold for headings'
        },
        {
          id: 'spacing-check',
          element: 'Logo Spacing',
          status: 'pass',
          message: 'Proper clear space maintained around logo'
        },
        {
          id: 'resolution-check',
          element: 'Image Quality',
          status: 'pass',
          message: 'High resolution image suitable for all platforms'
        }
      ]
      
      setComplianceResults(mockResults)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedDesign(file)
      analyzeCompliance(file)
    }
  }

  const applyBrandCompliance = () => {
    // Simulate auto-fixing brand compliance issues
    const updatedResults = complianceResults.map(result => ({
      ...result,
      status: 'pass' as const,
      message: result.status !== 'pass' ? 'Auto-corrected to meet brand guidelines' : result.message
    }))
    setComplianceResults(updatedResults)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-50 border-green-200'
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'fail': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      case 'fail': return <AlertTriangle className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  const complianceScore = complianceResults.length > 0 
    ? Math.round((complianceResults.filter(r => r.status === 'pass').length / complianceResults.length) * 100)
    : 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Brand Compliance Center</h2>
          <p className="text-muted-foreground">
            Ensure all creative assets meet brand guidelines
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Shield className="h-4 w-4 mr-2" />
          {complianceScore}% Compliant
        </Badge>
      </div>

      <Tabs defaultValue="guidelines" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guidelines">Brand Guidelines</TabsTrigger>
          <TabsTrigger value="upload">Upload & Review</TabsTrigger>
          <TabsTrigger value="templates">Approved Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="guidelines" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['logo', 'color', 'font', 'imagery'].map((type) => (
              <Card key={type}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm capitalize flex items-center gap-2">
                    {type === 'logo' && <ImageIcon className="h-4 w-4" />}
                    {type === 'color' && <Palette className="h-4 w-4" />}
                    {type === 'font' && <Type className="h-4 w-4" />}
                    {type === 'imagery' && <ImageIcon className="h-4 w-4" />}
                    {type} Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {brandGuidelines
                    .filter(guideline => guideline.type === type)
                    .map((guideline) => (
                      <div key={guideline.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{guideline.name}</span>
                          <Badge 
                            variant={guideline.status === 'approved' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {guideline.status}
                          </Badge>
                        </div>
                        
                        {guideline.type === 'color' && (
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-6 h-6 rounded border"
                              style={{ backgroundColor: guideline.value }}
                            />
                            <span className="text-xs font-mono">{guideline.value}</span>
                          </div>
                        )}
                        
                        {guideline.type === 'logo' && guideline.preview && (
                          <div className="border rounded p-2 bg-gray-50">
                            <img 
                              src={guideline.preview} 
                              alt={guideline.name}
                              className="w-full h-8 object-contain"
                            />
                          </div>
                        )}
                        
                        {guideline.type === 'font' && (
                          <div className="text-sm" style={{ fontFamily: guideline.value.split(' ')[0] }}>
                            {guideline.value}
                          </div>
                        )}
                      </div>
                    ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Design for Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Upload Your Design</h3>
                  <p className="text-muted-foreground">
                    Upload images, videos, or design files for brand compliance review
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*,video/*,.pdf,.ai,.psd"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button className="mt-4" asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
              </div>

              {uploadedDesign && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Compliance Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isAnalyzing ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          <span>Analyzing brand compliance...</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Compliance Score: {complianceScore}%</h4>
                          <Button onClick={applyBrandCompliance} className="gap-2">
                            <Wand2 className="h-4 w-4" />
                            Auto-Fix Issues
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          {complianceResults.map((result) => (
                            <motion.div
                              key={result.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`p-3 rounded-lg border ${getStatusColor(result.status)}`}
                            >
                              <div className="flex items-start gap-3">
                                {getStatusIcon(result.status)}
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">{result.element}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {result.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm mt-1">{result.message}</p>
                                  {result.suggestion && (
                                    <p className="text-xs mt-2 font-medium">
                                      💡 {result.suggestion}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="flex gap-3">
                          <Button className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Download Corrected Version
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Create Campaign
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Social Media Post', category: 'Social', preview: '/api/placeholder/300/300' },
              { name: 'Story Template', category: 'Social', preview: '/api/placeholder/300/400' },
              { name: 'Banner Ad', category: 'Display', preview: '/api/placeholder/400/200' },
              { name: 'Video Thumbnail', category: 'Video', preview: '/api/placeholder/400/225' },
              { name: 'Email Header', category: 'Email', preview: '/api/placeholder/400/150' },
              { name: 'Print Flyer', category: 'Print', preview: '/api/placeholder/300/400' }
            ].map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted">
                    <img 
                      src={template.preview} 
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{template.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">Use Template</Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}