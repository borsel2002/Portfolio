import { get } from '@vercel/edge-config'

export interface SiteConfig {
  title?: string
  description?: string
  analytics?: boolean
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

export interface FeatureFlags {
  newFeatures?: boolean
  betaMode?: boolean
  darkMode?: boolean
}

export async function getSiteConfig(): Promise<SiteConfig | null> {
  try {
    return await get('siteConfig')
  } catch (error) {
    console.log('Edge Config not available')
    return null
  }
}

export async function getFeatureFlags(): Promise<FeatureFlags | null> {
  try {
    return await get('featureFlags')
  } catch (error) {
    console.log('Edge Config not available')
    return null
  }
}

export async function getMaintenanceMode(): Promise<boolean> {
  try {
    return await get('maintenanceMode') || false
  } catch (error) {
    return false
  }
}
