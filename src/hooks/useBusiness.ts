import { useContext } from 'react'
import { BusinessContext } from '@/contexts/BusinessContext'

export function useBusiness() {
  const context = useContext(BusinessContext)
  if (context === undefined) {
    throw new Error('useBusiness must be used within a BusinessProvider')
  }
  return context
}