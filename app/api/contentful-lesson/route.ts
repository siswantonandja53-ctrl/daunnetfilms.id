import { NextResponse } from 'next/server';
import { createClient, Asset } from 'contentful';

// Interface for asset details with media information
interface AssetDetailsWithMedia {
  size?: number;
  image?: {
    width: number;
    height: number;
  };
}

// Interface for lesson entry structure
interface LessonEntry {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title?: string;
    slug?: string;
    videoUrl?: string;
    videoAsset?: Asset;
    content?: unknown; // Rich text field
    order?: number;
    isPreview?: boolean;
    requiresLogin?: boolean;
    externalId?: string;
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lessonSlug = searchParams.get('slug');
    const lessonId = searchParams.get('id');

    console.log('Fetching lesson with slug:', lessonSlug, 'or ID:', lessonId);

    if (!lessonSlug && !lessonId) {
      return NextResponse.json({
        success: false,
        error: 'Lesson slug or ID is required',
        message: 'Please provide either a lesson slug or ID parameter'
      }, { status: 400 });
    }

    // Create Contentful client
    const client = createClient({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_ACCESS_TOKEN,
    });

    let lesson = null;

    if (lessonId) {
      // Fetch by ID
      try {
        const entry = await client.getEntry(lessonId, {
          include: 2 // Include linked assets
        });
        lesson = entry;
      } catch (error) {
        console.error('Error fetching lesson by ID:', error);
      }
    } else if (lessonSlug) {
      // Fetch by slug
      const entries = await client.getEntries({
        content_type: 'lesson',
        'fields.slug': lessonSlug,
        limit: 1,
        include: 2 // Include linked assets
      });

      if (entries.items.length > 0) {
        lesson = entries.items[0];
      }
    }

    if (!lesson) {
      return NextResponse.json({
        success: false,
        error: 'Lesson not found',
        message: 'The requested lesson could not be found'
      }, { status: 404 });
    }

    // Transform lesson to a more usable format
    const transformedLesson = {
      id: lesson.sys.id,
      title: (lesson as LessonEntry).fields.title || 'Untitled Lesson',
      slug: (lesson as LessonEntry).fields.slug || '',
      videoUrl: (lesson as LessonEntry).fields.videoUrl || '',
      videoAsset: (lesson as LessonEntry).fields.videoAsset ? {
        id: (lesson as LessonEntry).fields.videoAsset!.sys.id,
        url: (lesson as LessonEntry).fields.videoAsset!.fields?.file?.url,
        title: (lesson as LessonEntry).fields.videoAsset!.fields?.title,
        contentType: (lesson as LessonEntry).fields.videoAsset!.fields?.file?.contentType,
        size: ((lesson as LessonEntry).fields.videoAsset!.fields?.file?.details as AssetDetailsWithMedia)?.size,
        width: ((lesson as LessonEntry).fields.videoAsset!.fields?.file?.details as AssetDetailsWithMedia)?.image?.width,
        height: ((lesson as LessonEntry).fields.videoAsset!.fields?.file?.details as AssetDetailsWithMedia)?.image?.height,
      } : null,
      content: extractTextFromRichText((lesson as LessonEntry).fields.content) || '',
      order: (lesson as LessonEntry).fields.order || 0,
      isPreview: (lesson as LessonEntry).fields.isPreview || false,
      requiresLogin: (lesson as LessonEntry).fields.requiresLogin || false,
      externalId: (lesson as LessonEntry).fields.externalId || '',
      createdAt: lesson.sys.createdAt,
      updatedAt: lesson.sys.updatedAt,
    };

    console.log('Lesson fetched successfully:', transformedLesson.slug);

    const response = NextResponse.json({
      success: true,
      lesson: transformedLesson,
      message: 'Lesson fetched successfully'
    });

    // Add cache headers
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

    return response;

  } catch (error) {
    console.error('Contentful lesson fetch error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      message: 'Failed to fetch lesson from Contentful'
    }, { status: 500 });
  }
}