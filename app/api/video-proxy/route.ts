import { NextRequest, NextResponse } from 'next/server';
import { validateVideoToken } from '@/lib/videoEncryption';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const lessonId = searchParams.get('lesson');

    if (!token || !lessonId) {
      return NextResponse.json({ error: 'Missing token or lesson ID' }, { status: 400 });
    }

    // Validate the token
    if (!validateVideoToken(token, lessonId)) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Fetch the lesson to get the encrypted video URL
    const lessonResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://daunnetfilms.id'}/api/contentful-lesson?slug=${lessonId}`);
    
    if (!lessonResponse.ok) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const lesson = await lessonResponse.json();
    if (!lesson.success) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }
    
    let actualVideoUrl = lesson.lesson.videoAsset?.url || lesson.lesson.videoUrl;
    
    // Add protocol to Contentful URLs that start with //
    if (actualVideoUrl && actualVideoUrl.startsWith('//')) {
      actualVideoUrl = 'https:' + actualVideoUrl;
    }

    if (!actualVideoUrl) {
      return NextResponse.json({ error: 'No video URL found' }, { status: 404 });
    }

    // For direct video files, proxy the video content
    if (lesson.lesson.videoAsset?.contentType?.startsWith('video/')) {
      try {
        const videoResponse = await fetch(actualVideoUrl);
        
        if (!videoResponse.ok) {
          return NextResponse.json({ error: 'Video not accessible' }, { status: 404 });
        }

        const videoBuffer = await videoResponse.arrayBuffer();
        
        return new NextResponse(videoBuffer, {
          headers: {
            'Content-Type': lesson.lesson.videoAsset.contentType,
            'Content-Length': videoBuffer.byteLength.toString(),
            'Cache-Control': 'private, no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
      } catch (error) {
        console.error('Error proxying video:', error);
        return NextResponse.json({ error: 'Error loading video' }, { status: 500 });
      }
    }

    // For embedded videos, return the URL (these are already protected by the platform)
    return NextResponse.redirect(actualVideoUrl);
    
  } catch (error) {
    console.error('Video proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}