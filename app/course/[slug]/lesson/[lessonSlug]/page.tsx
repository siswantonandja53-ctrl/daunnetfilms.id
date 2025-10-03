import React from "react";
import { Course } from "../../../page";
import LessonPageClient from "./LessonPageClient";

// Define the Lesson interface for the API response
interface ApiLesson {
  id: string;
  title: string;
  slug: string;
  description?: string;
  videoUrl?: string;
  videoAsset?: {
    url: string;
    title: string;
    description: string;
    contentType: string;
    size?: number;
  };
  content?: unknown;
  order?: number;
  duration?: number;
  isPreview?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Helper function to generate slug from title
export function generateLessonSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

// Fetch lesson from the dedicated lesson API
async function fetchLesson(lessonSlug: string): Promise<ApiLesson | null> {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/contentful-lesson?slug=${lessonSlug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.success ? data.lesson : null;
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return null;
  }
}

// Server-side data fetching for course
async function fetchCourse(courseSlug: string): Promise<Course | null> {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/contentful-courses`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    
    const data = await response.json();
    
    if (data.success) {
      // Find course by slug
      const course = data.courses.find((course: Course) => 
        course.slug === courseSlug || course.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-') === courseSlug
      );
      
      return course || null;
    } else {
      throw new Error(data.message || 'Failed to fetch courses');
    }
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

interface LessonPageProps {
  params: Promise<{
    slug: string;
    lessonSlug: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug: courseSlug, lessonSlug } = await params;
  
  // Fetch lesson and course in parallel
  const [lesson, course] = await Promise.all([
    fetchLesson(lessonSlug),
    fetchCourse(courseSlug)
  ]);
  
  // Find the lesson index in the course for navigation
  let lessonIndex = -1;
  if (course && lesson) {
    lessonIndex = course.lessons.findIndex((courseLesson) => 
      generateLessonSlug(courseLesson.title) === lessonSlug
    );
  }
  
  console.log(lesson, "lesson from API");
  
  return (
    <LessonPageClient 
      course={course}
      lesson={lesson}
      lessonIndex={lessonIndex}
      courseSlug={courseSlug}
      lessonSlug={lessonSlug}
    />
  );
}

// Generate static params for build time
export async function generateStaticParams() {
  try {
    const response = await fetch('http://localhost:3000/api/contentful-courses', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch courses for static generation');
    }
    
    const data = await response.json();
    
    if (data.success && data.courses) {
      const params: Array<{ slug: string; lessonSlug: string }> = [];
      
      data.courses.forEach((course: Course) => {
        const courseSlug = course.slug || course.title.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').trim().replace(/\\s+/g, '-').replace(/-+/g, '-');
        
        course.lessons.forEach((lesson) => {
          params.push({
            slug: courseSlug,
            lessonSlug: generateLessonSlug(lesson.title)
          });
        });
      });
      
      return params;
    }
  } catch (error) {
    console.error('Error generating static params for lessons:', error);
  }
  
  return [];
}
