'use client';

import { useState } from 'react';

export default function RevalidationPanel() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleRevalidate = async (type: 'courses' | 'all' | 'path', value?: string) => {
    setLoading(true);
    setResult(null);

    try {
      let response;
      
      if (type === 'path' && value) {
        // Revalidate specific path
        response = await fetch(`/api/revalidate?path=${encodeURIComponent(value)}&secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`);
      } else {
        // Use server action for other types
        const { revalidateCourses, revalidateAllContentful } = await import('@/lib/revalidation');
        
        if (type === 'courses') {
          response = await revalidateCourses();
        } else {
          response = await revalidateAllContentful();
        }
        
        setResult(response);
        return;
      }

      if (response) {
        const data = await response.json();
        setResult({
          success: response.ok,
          message: data.message || (response.ok ? 'Revalidated successfully' : 'Revalidation failed')
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🔄 Content Revalidation Panel</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleRevalidate('courses')}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? '⏳ Processing...' : '📚 Revalidate Courses'}
          </button>
          
          <button
            onClick={() => handleRevalidate('all')}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? '⏳ Processing...' : '🌐 Revalidate All Content'}
          </button>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">🎯 Revalidate Specific Path</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="/course/cinematography"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  handleRevalidate('path', e.currentTarget.value);
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                if (input.value) {
                  handleRevalidate('path', input.value);
                }
              }}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? '⏳' : '🚀 Revalidate'}
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className={`mt-6 p-4 rounded-lg ${
          result.success 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {result.success ? '✅' : '❌'}
            </span>
            <span className="font-medium">
              {result.success ? 'Success!' : 'Error!'}
            </span>
          </div>
          <p className="mt-1 text-sm">{result.message}</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">📖 Usage Instructions</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Revalidate Courses:</strong> Updates all course data and listings</li>
          <li>• <strong>Revalidate All Content:</strong> Clears entire cache and updates all Contentful data</li>
          <li>• <strong>Specific Path:</strong> Revalidates only a specific page (e.g., /course/cinematography)</li>
          <li>• <strong>Automatic:</strong> Content auto-updates via Contentful webhooks when published</li>
        </ul>
      </div>
    </div>
  );
}