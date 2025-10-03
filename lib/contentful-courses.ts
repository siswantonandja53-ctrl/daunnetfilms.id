// Simple course fetching utility using the direct API approach
export async function fetchCoursesFromContentful() {
  try {
    const response = await fetch('/api/contentful-courses');
    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        courses: data.courses,
        total: data.total
      };
    } else {
      return {
        success: false,
        error: data.message,
        courses: []
      };
    }
  } catch (error) {
    console.error('Failed to fetch courses from Contentful:', error);
    return {
      success: false,
      error: 'Failed to fetch courses',
      courses: []
    };
  }
}

export interface ContentfulCourse {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  duration: string;
  instructor: string;
  category: string;
  tags: string[];
  thumbnail: {
    url: string;
    title: string;
    width: number;
    height: number;
  } | null;
  featured: boolean;
  isActive: boolean;
  curriculum: string[];
  createdAt: string;
  updatedAt: string;
}

// Transform Contentful image URL to include https protocol
export function getContentfulImageUrl(imageUrl: string | null): string {
  if (!imageUrl) return '/courses/default-course.png';
  return imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
}

// Get optimized Contentful image with dimensions
export function getOptimizedContentfulImage(
  imageUrl: string | null,
  width?: number,
  height?: number,
  quality = 80
): string {
  if (!imageUrl) return '/courses/default-course.png';
  
  const baseUrl = getContentfulImageUrl(imageUrl);
  const params = new URLSearchParams();
  
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('fm', 'webp');
  
  return `${baseUrl}?${params.toString()}`;
}