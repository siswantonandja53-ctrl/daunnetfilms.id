import { NextRequest, NextResponse } from 'next/server';
import { encryptVideoUrl, generateVideoToken } from '@/lib/videoEncryption';

export async function POST(request: NextRequest) {
  try {
    const { action, lessonId } = await request.json();

    if (action === 'encrypt') {
      // Fetch the lesson to get the video URL
      const lessonResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://daunnetfilms.id'}/api/contentful-lesson?slug=${lessonId}`);
      
      if (!lessonResponse.ok) {
        return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
      }

      const lesson = await lessonResponse.json();
      if (!lesson.success) {
        return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
      }
      
      let videoUrl = lesson.lesson.videoAsset?.url || lesson.lesson.videoUrl;
      
      // Add protocol to Contentful URLs that start with //
      if (videoUrl && videoUrl.startsWith('//')) {
        videoUrl = 'https:' + videoUrl;
      }

      if (!videoUrl) {
        return NextResponse.json({ error: 'No video URL found' }, { status: 404 });
      }

      // Encrypt the video URL and generate a token
      const encrypted = encryptVideoUrl(videoUrl);
      const videoToken = generateVideoToken(lessonId);

      return NextResponse.json({
        encryptedUrl: encrypted,
        token: videoToken,
        expiresIn: 2 * 60 * 60 * 1000 // 2 hours
      });
    }

    if (action === 'decrypt') {
      // Generate a new token for this request
      const videoToken = generateVideoToken(lessonId);

      // Return a proxy URL instead of the actual decrypted URL
      const proxyUrl = `/api/video-proxy?token=${encodeURIComponent(videoToken)}&lesson=${encodeURIComponent(lessonId)}`;
      
      return NextResponse.json({
        videoUrl: proxyUrl,
        token: videoToken,
        expiresIn: 2 * 60 * 60 * 1000 // 2 hours
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Video security API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}