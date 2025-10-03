import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    // Verify the secret to prevent unauthorized revalidation
    if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, slug, id } = body;

    switch (type) {
      case 'course':
        // Revalidate specific course
        if (slug) {
          revalidatePath(`/course/${slug}`, 'page');
          revalidatePath(`/course/${slug}/lesson/[lessonSlug]`, 'page');
          revalidateTag(`course-${slug}`);
        }
        // Revalidate courses list
        revalidatePath('/course', 'page');
        revalidateTag('courses');
        break;

      case 'lesson':
        // Revalidate specific lesson
        if (slug) {
          revalidateTag(`lesson-${slug}`);
        }
        if (id) {
          revalidateTag(`lesson-${id}`);
        }
        // Revalidate lessons
        revalidateTag('lessons');
        break;

      case 'all':
        // Revalidate everything
        revalidatePath('/', 'layout');
        revalidateTag('contentful');
        revalidateTag('courses');
        revalidateTag('lessons');
        break;

      default:
        // Default: revalidate all Contentful data
        revalidateTag('contentful');
        revalidateTag('courses');
        revalidateTag('lessons');
    }

    return NextResponse.json({
      revalidated: true,
      type,
      slug,
      id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { 
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint for manual revalidation
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    const tag = searchParams.get('tag');
    const secret = searchParams.get('secret');

    // Verify the secret
    if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        timestamp: new Date().toISOString()
      });
    }

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({
        revalidated: true,
        tag,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      message: 'Please provide either path or tag parameter'
    }, { status: 400 });

  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { 
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}