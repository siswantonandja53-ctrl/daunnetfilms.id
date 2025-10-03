import { Metadata } from 'next';
import RevalidationPanel from '@/components/RevalidationPanel';

export const metadata: Metadata = {
  title: 'Admin - Daunnet Films',
  description: 'Administration panel for content management',
  robots: 'noindex, nofollow', // Prevent search engines from indexing admin pages
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F0528] to-[#2E0B25] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎬 Daunnet Films Admin
          </h1>
          <p className="text-white/70">
            Content management and cache revalidation
          </p>
        </div>

        <div className="grid gap-8">
          {/* Revalidation Panel */}
          <section>
            <RevalidationPanel />
          </section>

          {/* Quick Actions */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">⚡ Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/course"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-center transition-colors"
              >
                <div className="text-2xl mb-2">📚</div>
                <div className="font-medium text-blue-700">View Courses</div>
                <div className="text-sm text-blue-600">Check live course page</div>
              </a>

              <a
                href="https://app.contentful.com/spaces/dvoi3lns71io"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-center transition-colors"
              >
                <div className="text-2xl mb-2">✏️</div>
                <div className="font-medium text-green-700">Edit Content</div>
                <div className="text-sm text-green-600">Open Contentful CMS</div>
              </a>

              <a
                href="/api/contentful-courses"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 text-center transition-colors"
              >
                <div className="text-2xl mb-2">🔌</div>
                <div className="font-medium text-purple-700">API Status</div>
                <div className="text-sm text-purple-600">Check API response</div>
              </a>
            </div>
          </section>

          {/* Webhook Information */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🔗 Webhook Configuration</h2>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Contentful Webhook URL:</h3>
              <code className="text-sm bg-gray-200 px-2 py-1 rounded">
                {process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'}/api/contentful-webhook
              </code>
              
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Trigger on:</strong> Entry publish, unpublish, delete</p>
                <p><strong>Content types:</strong> Course, Lesson</p>
                <p><strong>Headers:</strong> Content-Type: application/json</p>
              </div>
            </div>
          </section>

          {/* Cache Information */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Cache Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-700 mb-2">🏷️ Cache Tags</h3>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• <code>contentful</code> - All Contentful data</li>
                  <li>• <code>courses</code> - All courses</li>
                  <li>• <code>lessons</code> - All lessons</li>
                  <li>• <code>course-{`{slug}`}</code> - Specific course</li>
                  <li>• <code>lesson-{`{slug}`}</code> - Specific lesson</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-700 mb-2">⏰ Cache Duration</h3>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• <strong>API Routes:</strong> 1 hour</li>
                  <li>• <strong>Static Pages:</strong> On-demand</li>
                  <li>• <strong>ISR:</strong> 24 hours</li>
                  <li>• <strong>Browser Cache:</strong> 1 hour</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}