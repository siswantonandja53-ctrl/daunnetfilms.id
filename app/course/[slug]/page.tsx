import React from "react";
import { Course } from "../page";
import CourseSlugClient from "./CourseSlugClient";

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

// Server-side data fetching for single course
async function fetchCourseBySlug(slug: string) {
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
        generateSlug(course.title) === slug
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

interface CourseSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CourseSlugPage({ params }: CourseSlugPageProps) {
  const { slug } = await params;
  const course = await fetchCourseBySlug(slug);

  return (
    <CourseSlugClient 
      course={course} 
      slug={slug} 
    />
  );
}

// Generate static params for build time
export async function generateStaticParams() {
  try {
    // For static generation, we can use localhost since this runs at build time
    const response = await fetch('http://localhost:3000/api/contentful-courses', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch courses for static generation');
    }
    
    const data = await response.json();
    
    if (data.success && data.courses) {
      return data.courses.map((course: Course) => ({
        slug: generateSlug(course.title),
      }));
    }
  } catch (error) {
    console.error('Error generating static params:', error);
  }
  
  return [];
}