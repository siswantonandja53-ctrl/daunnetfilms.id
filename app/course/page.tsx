import React from "react";
import CoursePageClient from "./CoursePageClient";

// Course interface for Contentful data
export interface Course {
  id: string;
  title: string;
  slug: string;
  shortTagline: string;
  description: string;
  coverImage: {
    url: string;
    title: string;
    width: number;
    height: number;
  } | null;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  mentors: Array<{
    id: string;
    name: string;
    bio: string;
    avatar: {
      url: string;
      title: string;
    } | null;
  }>;
  lessons: Array<{
    id: string;
    title: string;
    slug: string;
    description: string;
    videoUrl: string;
    duration: string;
    order: number;
    isPreview: boolean;
    requiresLogin: boolean;
    externalId: string;
  }>;
  // Legacy fields for backward compatibility
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

// Figma-inspired categories (will be dynamically populated from Contentful data)
const defaultCategories = [
  "All",
  "Adobe After Effect",
  "Adobe Premier",
  "Basic Knowledge",
  "Business Videography",
  "Davinci Resolve",
  "Lighting",
  "Story Telling",
  "VFX",
  "Videography",
  "A-Z Capcut",
  "The Director",
  "After Effect Next Level",
  "The Producer",
  "Public Speaking",
  "Cinematography",
  "Freelance Video Editor",
  "Cara Menentukan Harga Freelance Video Editor",
  "Behind The Production",
  "Call Sheet"
];

// Server-side data fetching
async function fetchCourseData() {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/contentful-courses`, {
      cache: 'no-store' // Always fetch fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    
    const data = await response.json();
    
    if (data.success) {
      // Extract unique categories from courses
      const courseCategories = data.courses
        .map((course: Course) => course.category)
        .filter((category: string) => category && category.trim() !== '')
        .filter((category: string, index: number, arr: string[]) => arr.indexOf(category) === index);
      
      return {
        courses: data.courses,
        categories: ['All', ...courseCategories]
      };
    } else {
      throw new Error(data.message || 'Failed to fetch courses');
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    return {
      courses: [],
      categories: defaultCategories,
      error: error instanceof Error ? error.message : 'Failed to fetch courses'
    };
  }
}

export default async function CoursePage() {
  const { courses, categories, error } = await fetchCourseData();

  return (
    <CoursePageClient 
      initialCourses={courses}
      initialCategories={categories}
      initialError={error}
    />
  );
}

