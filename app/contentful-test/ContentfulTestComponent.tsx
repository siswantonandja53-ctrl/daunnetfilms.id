'use client';

import { useEffect, useState, useCallback } from 'react';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface ConnectionStatus {
  status: 'loading' | 'success' | 'error';
  message: string;
  data?: {
    spaceId: string;
    spaceName: string;
    environment: string;
  };
  error?: string;
}

interface ContentEntry {
  sys: {
    id: string;
    contentType?: {
      sys: {
        id: string;
      };
    };
  };
  fields?: {
    title?: string;
    name?: string;
    [key: string]: unknown;
  };
}

interface ContentData {
  entries: ContentEntry[];
}

export default function ContentfulTestComponent() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    status: 'loading',
    message: 'Testing connection...'
  });

  const [contentData, setContentData] = useState<ContentData | null>(null);

  const testContentfulConnection = useCallback(async () => {
    try {
      setConnectionStatus({
        status: 'loading',
        message: 'Connecting to Contentful...'
      });

      // Test the connection by fetching space info
      const response = await fetch('/api/contentful-test');
      const result = await response.json();

      if (response.ok) {
        setConnectionStatus({
          status: 'success',
          message: 'Successfully connected to Contentful!',
          data: result
        });
        
        // Fetch some content to display
        fetchContentData();
      } else {
        setConnectionStatus({
          status: 'error',
          message: 'Failed to connect to Contentful',
          error: result.error || 'Unknown error'
        });
      }
    } catch (error) {
      setConnectionStatus({
        status: 'error',
        message: 'Connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }, []);

  useEffect(() => {
    testContentfulConnection();
  }, [testContentfulConnection]);

  const fetchContentData = async () => {
    try {
      const response = await fetch('/api/contentful-content');
      if (response.ok) {
        const data = await response.json();
        setContentData(data);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus.status) {
      case 'success':
        return <CheckCircleIcon className="w-8 h-8 text-green-500" />;
      case 'error':
        return <XCircleIcon className="w-8 h-8 text-red-500" />;
      default:
        return <ExclamationTriangleIcon className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus.status) {
      case 'success':
        return 'border-green-500 bg-green-500/10';
      case 'error':
        return 'border-red-500 bg-red-500/10';
      default:
        return 'border-yellow-500 bg-yellow-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Status Card */}
      <div className={`border-2 rounded-lg p-6 ${getStatusColor()}`}>
        <div className="flex items-center gap-4 mb-4">
          {getStatusIcon()}
          <div>
            <h2 className="text-xl font-semibold text-white">
              Connection Status
            </h2>
            <p className="text-gray-300">{connectionStatus.message}</p>
          </div>
        </div>

        {connectionStatus.error && (
          <div className="bg-red-900/50 border border-red-500 rounded p-4 mt-4">
            <p className="text-red-200 font-medium">Error Details:</p>
            <p className="text-red-300 text-sm mt-1">{connectionStatus.error}</p>
          </div>
        )}

        {connectionStatus.data && (
          <div className="bg-gray-900 border border-gray-700 rounded p-4 mt-4">
            <p className="text-green-200 font-medium mb-2">Space Information:</p>
            <div className="text-gray-300 text-sm space-y-1">
              <p><span className="text-gray-400">Space ID:</span> {connectionStatus.data.spaceId}</p>
              <p><span className="text-gray-400">Space Name:</span> {connectionStatus.data.spaceName}</p>
              <p><span className="text-gray-400">Environment:</span> {connectionStatus.data.environment}</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Data Display */}
      {contentData && (
        <div className="border-2 border-[#F57C00] bg-[#F57C00]/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Content from Contentful
          </h2>
          
          <div className="space-y-4">
            {contentData.entries && contentData.entries.length > 0 ? (
              <div>
                <p className="text-[#F57C00] font-medium mb-2">
                  Found {contentData.entries.length} entries:
                </p>
                <div className="grid gap-3">
                  {contentData.entries.slice(0, 5).map((entry: ContentEntry, index: number) => (
                    <div key={index} className="bg-gray-900 border border-gray-700 rounded p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-medium">
                            {entry.fields?.title || entry.fields?.name || 'Untitled'}
                          </p>
                          <p className="text-gray-400 text-sm">
                            Type: {entry.sys?.contentType?.sys?.id || 'Unknown'}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                          {entry.sys?.id?.slice(0, 8)}...
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No content entries found</p>
                <p className="text-gray-500 text-sm mt-1">
                  Create some content in your Contentful space to see it here
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Configuration Info */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Configuration
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Space ID:</span>
            <span className="text-gray-300 font-mono">
              {process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || 'dvoi3lns71io'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Access Token:</span>
            <span className="text-gray-300 font-mono">
              {process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ? 
                `${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN.slice(0, 8)}...` : 
                'PMHlpVDi...'
              }
            </span>
          </div>
        </div>
      </div>

      {/* Retry Button */}
      <div className="text-center">
        <button
          onClick={testContentfulConnection}
          className="bg-[#F57C00] hover:bg-[#EE6028] text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Test Connection Again
        </button>
      </div>
    </div>
  );
}