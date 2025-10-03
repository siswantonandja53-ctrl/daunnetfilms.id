import { NextResponse } from 'next/server';
import { createClient, Asset } from 'contentful';
import { unstable_cache } from 'next/cache';

// Simple interface for contentful entry structure
interface ContentfulEntry {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title?: string;
    slug?: string;
    shortTagline?: string;
    description?: unknown; // Rich text field
    coverImage?: Asset;
    categories?: Array<{
      sys: { id: string };
      fields: { name: string; slug: string };
    }>;
    mentors?: Array<{
      sys: { id: string };
      fields: { name: string; bio?: string; avatar?: Asset };
    }>;
    lessons?: Array<{
      sys: { id: string };
      fields: {
        title: string;
        slug?: string;
        videoUrl?: string;
        content?: unknown; // Rich text field
        order?: number;
        isPreview?: boolean;
        requiresLogin?: boolean;
        externalId?: string;
      };
    }>;
  };
}

// Interface for asset details with image information
interface AssetDetailsWithImage {
  image?: {
    width: number;
    height: number;
  };
}

// Helper function to extract text from Contentful rich text
function extractTextFromRichText(richText: unknown): string {
  if (typeof richText === 'string') {
    return richText;
  }
  
  if (richText && typeof richText === 'object' && richText !== null && 'content' in richText) {
    const content = (richText as { content: unknown[] }).content;
    if (Array.isArray(content)) {
      return content
        .map((node: unknown) => {
          if (node && typeof node === 'object' && node !== null && 'content' in node) {
            const nodeContent = (node as { content: unknown[] }).content;
            if (Array.isArray(nodeContent)) {
              return nodeContent
                .map((textNode: unknown) => {
                  if (textNode && typeof textNode === 'object' && textNode !== null && 'value' in textNode) {
                    return String((textNode as { value: unknown }).value || '');
                  }
                  return '';
                })
                .join('');
            }
          }
          return '';
        })
        .join(' ');
    }
  }
  
  return '';
}

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID || 'dvoi3lns71io';
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || 'PMHlpVDixr-Fp4GkhDvt7YxPopU45mYTJkRaAv3osnk';

export async function GET() {
  return unstable_cache(
    async () => {
      try {
        // Create Contentful client
        const client = createClient({
          space: CONTENTFUL_SPACE_ID,
          accessToken: CONTENTFUL_ACCESS_TOKEN,
        });

        // Fetch course entries with linked content
        const entries = await client.getEntries({
          content_type: 'course',
          limit: 50,
          order: ['-sys.createdAt'], // Latest first
          include: 2 // Include linked entries (lessons, categories, mentors)
        });

        // Transform entries to a more usable format
        const courses = entries.items.map((entry: ContentfulEntry) => ({
          id: entry.sys.id,
          title: entry.fields.title || 'Untitled Course',
          slug: entry.fields.slug || '',
          shortTagline: entry.fields.shortTagline || '',
          description: extractTextFromRichText(entry.fields.description) || '',
          coverImage: entry.fields.coverImage ? {
            url: entry.fields.coverImage.fields?.file?.url,
            title: entry.fields.coverImage.fields?.title,
            width: (entry.fields.coverImage.fields?.file?.details as AssetDetailsWithImage)?.image?.width,
            height: (entry.fields.coverImage.fields?.file?.details as AssetDetailsWithImage)?.image?.height,
          } : null,
          categories: entry.fields.categories?.map(cat => ({
            id: cat.sys.id,
            name: cat.fields.name,
            slug: cat.fields.slug
          })) || [],
          mentors: entry.fields.mentors?.map(mentor => ({
            id: mentor.sys.id,
            name: mentor.fields.name,
            bio: extractTextFromRichText(mentor.fields.bio) || '',
            avatar: mentor.fields.avatar ? {
              url: mentor.fields.avatar.fields?.file?.url,
              title: mentor.fields.avatar.fields?.title
            } : null
          })) || [],
          lessons: entry.fields.lessons?.map(lesson => ({
            id: lesson.sys.id,
            title: lesson.fields.title,
            slug: lesson.fields.slug || '',
            description: extractTextFromRichText(lesson.fields.content) || '',
            videoUrl: lesson.fields.videoUrl || '',
            duration: '', // Duration not in content model
            order: lesson.fields.order || 0,
            isPreview: lesson.fields.isPreview || false,
            requiresLogin: lesson.fields.requiresLogin || false,
            externalId: lesson.fields.externalId || ''
          })) || [],
          // Legacy fields for backward compatibility
          price: 0,
          level: 'Beginner',
          duration: entry.fields.lessons?.length ? `${entry.fields.lessons.length} lessons` : '',
          instructor: entry.fields.mentors?.[0]?.fields.name || '',
          category: entry.fields.categories?.[0]?.fields.name || 'General',
          tags: entry.fields.categories?.map(cat => cat.fields.name) || [],
          thumbnail: entry.fields.coverImage ? {
            url: entry.fields.coverImage.fields?.file?.url,
            title: entry.fields.coverImage.fields?.title,
            width: (entry.fields.coverImage.fields?.file?.details as AssetDetailsWithImage)?.image?.width,
            height: (entry.fields.coverImage.fields?.file?.details as AssetDetailsWithImage)?.image?.height,
          } : null,
          featured: false,
          isActive: true,
          curriculum: entry.fields.lessons?.map(lesson => lesson.fields.title) || [],
          createdAt: entry.sys.createdAt,
          updatedAt: entry.sys.updatedAt,
        }));

        const response = NextResponse.json({
          success: true,
          courses,
          total: entries.total,
          message: `Successfully fetched ${courses.length} courses`
        });

        // Set cache headers
        response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
        
        return response;

      } catch (error) {
        console.error('Contentful courses fetch error:', error);
        
        return NextResponse.json({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
          message: 'Failed to fetch courses from Contentful',
          courses: []
        }, { status: 500 });
      }
    },
    ['contentful-courses'],
    {
      tags: ['contentful', 'courses'],
      revalidate: 3600 // 1 hour
    }
  )();
}