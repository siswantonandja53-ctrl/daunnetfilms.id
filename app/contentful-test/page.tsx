import { Suspense } from 'react';
import ContentfulTestComponent from './ContentfulTestComponent';

export default function ContentfulTestPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Contentful Connection Test
          </h1>
          
          <Suspense fallback={
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F57C00] mx-auto mb-4"></div>
              <p className="text-white">Testing Contentful connection...</p>
            </div>
          }>
            <ContentfulTestComponent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}