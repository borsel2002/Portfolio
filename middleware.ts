import { NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

export const config = { 
  matcher: [
    '/',
    '/admin',
    '/admin/:path*'
  ] 
}

export async function middleware() {
  try {
    // Get dynamic configuration from Edge Config
    const siteConfig = await get('siteConfig')
    const maintenanceMode = await get('maintenanceMode')
    const featureFlags = await get('featureFlags')
    
    // Check if site is in maintenance mode
    if (maintenanceMode) {
      return NextResponse.json(
        { 
          message: 'Site is under maintenance. Please check back later.',
          maintenance: true 
        },
        { status: 503 }
      )
    }
    
    // Add dynamic headers based on Edge Config
    const response = NextResponse.next()
    
    // Add custom headers for analytics or feature flags
    if (siteConfig?.analytics) {
      response.headers.set('X-Analytics-Enabled', 'true')
    }
    
    if (featureFlags?.newFeatures) {
      response.headers.set('X-New-Features', 'enabled')
    }
    
    return response
  } catch (error) {
    // If Edge Config is not available, continue normally
    console.log('Edge Config not available, continuing with default behavior')
    return NextResponse.next()
  }
}
