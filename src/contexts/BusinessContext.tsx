/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, ReactNode } from 'react'
import { Business } from '@/types/business'

interface BusinessContextType {
  selectedBusiness: Business | null
  businesses: Business[]
  setSelectedBusiness: (business: Business | null) => void
}

export const BusinessContext = createContext<BusinessContextType | undefined>(undefined)

// Mock data for demo
const mockBusinesses: Business[] = [
  {
    id: 'brew-masters-001',
    name: 'Brew Masters Coffee Co.',
    type: 'coffee',
    logo: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop&crop=center',
    locations: [
      {
        id: 'loc-001',
        name: 'Downtown Location',
        address: '123 Main Street',
        city: 'Seattle',
        state: 'WA',
        zip: '98101',
        phone: '(206) 555-0123'
      },
      {
        id: 'loc-002',
        name: 'University District',
        address: '456 Campus Way',
        city: 'Seattle',
        state: 'WA',
        zip: '98105',
        phone: '(206) 555-0124'
      }
    ],
    brandAssets: {
      primaryColor: '#8B4513',
      secondaryColor: '#D2691E',
      logo: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop&crop=center',
      fonts: ['Montserrat', 'Open Sans'],
      templates: [
        {
          id: 'template-001',
          name: 'Morning Special Frame',
          type: 'image',
          thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop',
          category: 'promotional'
        },
        {
          id: 'template-002',
          name: 'Seasonal Latte Showcase',
          type: 'image',
          thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
          category: 'seasonal'
        },
        {
          id: 'template-003',
          name: 'Coffee Bean Origin Story',
          type: 'video',
          thumbnail: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=200&fit=crop',
          category: 'product'
        }
      ],
      previousCreatives: [
        {
          id: 'creative-001',
          name: 'Summer Cold Brew Campaign',
          type: 'image',
          thumbnail: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop',
          performance: {
            impressions: 45000,
            clicks: 1200,
            conversions: 89,
            roi: 245
          },
          createdAt: '2024-06-15'
        },
        {
          id: 'creative-002',
          name: 'Back to School Special',
          type: 'image',
          thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
          performance: {
            impressions: 32000,
            clicks: 890,
            conversions: 67,
            roi: 189
          },
          createdAt: '2024-08-20'
        },
        {
          id: 'creative-003',
          name: 'Holiday Blend Video',
          type: 'video',
          thumbnail: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=300&h=200&fit=crop',
          performance: {
            impressions: 67000,
            clicks: 2100,
            conversions: 156,
            roi: 312
          },
          createdAt: '2024-11-01'
        }
      ]
    },
    leadsieConnected: true,
    metaBusinessId: 'meta_business_123456789'
  }
]

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(mockBusinesses[0])
  const [businesses] = useState<Business[]>(mockBusinesses)

  return (
    <BusinessContext.Provider value={{
      selectedBusiness,
      businesses,
      setSelectedBusiness
    }}>
      {children}
    </BusinessContext.Provider>
  )
}