export interface User {
  id: string
  email: string
  displayName?: string
  avatar?: string
  provider?: 'email' | 'google' | 'facebook'
  leadsieConnected?: boolean
  facebookAdAccounts?: Array<{
    id: string
    name: string
    accountId: string
  }>
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithFacebook: () => Promise<void>
  logout: () => Promise<void>
  connectLeadsie: () => Promise<void>
  updateUser: (updates: Partial<User>) => void
}