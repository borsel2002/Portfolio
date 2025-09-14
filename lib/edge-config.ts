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
    const config = await get('siteConfig')
    return config || null
  } catch (error) {
    console.log('Edge Config not available')
    return null
  }
}

export async function getFeatureFlags(): Promise<FeatureFlags | null> {
  try {
    const flags = await get('featureFlags')
    return flags || null
  } catch (error) {
    console.log('Edge Config not available')
    return null
  }
}

export async function getMaintenanceMode(): Promise<boolean> {
  try {
    const mode = await get('maintenanceMode')
    return mode || false
  } catch (error) {
    return false
  }
}
