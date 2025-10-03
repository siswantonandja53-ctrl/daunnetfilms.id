import { NextResponse } from 'next/server';

interface Course {
  id: string;
  title: string;
  slug?: string;
  updatedAt: string;
  lessons?: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  updatedAt?: string;
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://daunnetfilms.id';
  
  // Static pages
  const staticPages = [
    '',
    '/course',
    '/about',
    '/contact',
  ];

  // Get current date in ISO format
  const currentDate = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  staticPages.forEach((page) => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  try {
    // Fetch dynamic course pages
    const coursesResponse = await fetch(`${baseUrl}/api/contentful-courses`);
    if (coursesResponse.ok) {
      const coursesData = await coursesResponse.json();
      if (coursesData.success && coursesData.courses) {
        coursesData.courses.forEach((course: Course) => {
          const courseSlug = course.slug || course.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
          
          // Add course page
          sitemap += `
  <url>
    <loc>${baseUrl}/course/${courseSlug}</loc>
    <lastmod>${course.updatedAt ? course.updatedAt.split('T')[0] : currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

          // Add lesson pages
          if (course.lessons) {
            course.lessons.forEach((lesson: Lesson) => {
              const lessonSlug = lesson.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
              sitemap += `
  <url>
    <loc>${baseUrl}/course/${courseSlug}/lesson/${lessonSlug}</loc>
    <lastmod>${lesson.updatedAt ? lesson.updatedAt.split('T')[0] : currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
            });
          }
        });
      }
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  sitemap += `
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}