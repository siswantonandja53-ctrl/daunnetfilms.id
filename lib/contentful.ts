import { createClient, EntrySkeletonType } from 'contentful';

// Contentful client configuration
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Types for common Contentful fields
export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface ContentfulEntry<T = Record<string, unknown>> {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
    contentType: {
      sys: {
        id: string;
      };
    };
  };
  fields: T;
}

// Generic function to fetch entries
export async function getEntries<T extends EntrySkeletonType>(contentType: string, limit = 100) {
  try {
    const entries = await client.getEntries<T>({
      content_type: contentType,
      limit,
    });
    return entries.items;
  } catch (error) {
    console.error(`Error fetching ${contentType} entries:`, error);
    return [];
  }
}

// Generic function to fetch a single entry by ID
export async function getEntry<T extends EntrySkeletonType>(entryId: string) {
  try {
    const entry = await client.getEntry<T>(entryId);
    return entry;
  } catch (error) {
    console.error(`Error fetching entry ${entryId}:`, error);
    return null;
  }
}

// Function to get asset URL
export function getAssetUrl(asset: ContentfulAsset): string {
  return `https:${asset.fields.file.url}`;
}

// Function to get optimized image URL
export function getOptimizedImageUrl(
  asset: ContentfulAsset,
  width?: number,
  height?: number,
  quality = 80
): string {
  const baseUrl = getAssetUrl(asset);
  const params = new URLSearchParams();
  
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('fm', 'webp');
  
  return `${baseUrl}?${params.toString()}`;
}

export default client;