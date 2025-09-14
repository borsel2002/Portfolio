import { getSiteConfig, getFeatureFlags } from '@/lib/edge-config'

export default async function WelcomePage() {
  const siteConfig = await getSiteConfig()
  const featureFlags = await getFeatureFlags()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to Edge Config! 🎉
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Dynamic Configuration
          </h2>
          
          <div className="space-y-4 text-left">
            <div>
              <h3 className="font-medium text-gray-700">Site Config:</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(siteConfig, null, 2)}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Feature Flags:</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(featureFlags, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            How to Use Edge Config
          </h3>
          <ol className="text-left text-blue-800 space-y-2">
            <li>1. Go to your Vercel dashboard</li>
            <li>2. Navigate to your project settings</li>
            <li>3. Go to "Edge Config" tab</li>
            <li>4. Add key-value pairs like:</li>
            <li className="ml-4">• siteConfig: {"{title: 'My Portfolio', analytics: true}"}</li>
            <li className="ml-4">• featureFlags: {"{newFeatures: true, darkMode: false}"}</li>
            <li className="ml-4">• maintenanceMode: false</li>
          </ol>
        </div>

        <div className="mt-8">
          <a 
            href="/" 
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
