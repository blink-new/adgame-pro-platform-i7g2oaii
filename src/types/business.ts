export interface Business {
  id: string
  name: string
  type: 'coffee' | 'restaurant' | 'retail' | 'services'
  logo?: string
  locations: BusinessLocation[]
  brandAssets: BrandAssets
  leadsieConnected: boolean
  metaBusinessId?: string
}

export interface BusinessLocation {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
}

export interface BrandAssets {
  primaryColor: string
  secondaryColor: string
  logo: string
  fonts: string[]
  templates: CreativeTemplate[]
  previousCreatives: PreviousCreative[]
}

export interface CreativeTemplate {
  id: string
  name: string
  type: 'image' | 'video'
  thumbnail: string
  category: 'promotional' | 'seasonal' | 'product'
}

export interface PreviousCreative {
  id: string
  name: string
  type: 'image' | 'video'
  thumbnail: string
  performance: {
    impressions: number
    clicks: number
    conversions: number
    roi: number
  }
  createdAt: string
}