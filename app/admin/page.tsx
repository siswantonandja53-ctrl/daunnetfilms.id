import { Metadata } from 'next';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import RevalidationPanel from '@/components/RevalidationPanel';

export const metadata: Metadata = {
  title: 'Admin - Daunnet Films',
  description: 'Administration panel for content management',
  robots: 'noindex, nofollow', // Prevent search engines from indexing admin pages
};

// List of authorized admin emails
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || [
  'zulzdn@gmail.com', // Fallback if env variable not set
];

export default async function AdminPage() {
  // Get the current user from Clerk
  const user = await currentUser();
  
  // Check if user is logged in
  if (!user) {
    redirect('/sign-in?redirect_url=/admin');
  }

  // Get user's email from Clerk
  const userEmail = user.emailAddresses[0]?.emailAddress;

  // Check if user's email is in the admin list
  if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1F0528] to-[#2E0B25] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don&apos;t have permission to access this page.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Logged in as: <strong>{userEmail}</strong>
          </p>
          <Link
            href="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F0528] to-[#2E0B25] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Admin Badge */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-6 text-center">
          <p className="text-green-400 text-sm">
            ✓ Logged in as admin: <strong>{userEmail}</strong>
          </p>
        </div>

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
                {process.env.NEXT_PUBLIC_BASE_URL || 'https://daunnetfilms.id'}/api/contentful-webhook
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