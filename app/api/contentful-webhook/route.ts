import { NextRequest, NextResponse } from 'next/server';
import { revalidateAllContentful, revalidateCourse } from '@/lib/revalidation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Contentful webhook payload structure
    const { sys } = body;
    
    if (!sys) {
      return NextResponse.json(
        { message: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    const contentType = sys.contentType?.sys?.id;
    const entryId = sys.id;
    
    console.log(`📥 Contentful webhook received: ${contentType} (${entryId})`);

    switch (contentType) {
      case 'course':
        // Get course slug from fields
        const courseSlug = body.fields?.slug?.[process.env.CONTENTFUL_LOCALE || 'en-US'] || 
                          body.fields?.title?.[process.env.CONTENTFUL_LOCALE || 'en-US']?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
        
        if (courseSlug) {
          await revalidateCourse(courseSlug);
          console.log(`✅ Course revalidated: ${courseSlug}`);
        }
        break;

      case 'lesson':
        // Get lesson slug from fields
        const lessonSlug = body.fields?.slug?.[process.env.CONTENTFUL_LOCALE || 'en-US'] || 
                          body.fields?.title?.[process.env.CONTENTFUL_LOCALE || 'en-US']?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
        
        if (lessonSlug) {
          // We need the course slug for lesson revalidation - for now revalidate all
          await revalidateAllContentful();
          console.log(`✅ Lesson revalidated: ${lessonSlug}`);
        }
        break;

      default:
        // For other content types or unknown, revalidate all
        await revalidateAllContentful();
        console.log(`✅ All content revalidated for type: ${contentType}`);
    }

    return NextResponse.json({
      received: true,
      contentType,
      entryId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Contentful webhook error:', error);
    
    return NextResponse.json(
      { 
        message: 'Webhook processing failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle webhook verification (if Contentful sends verification requests)
export async function GET() {
  return NextResponse.json({
    message: 'Contentful webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}