import React from "react";
import CoursePageClient from "./CoursePageClient";
import { getAllCourses } from "@/lib/contentful-services";

/* eslint-disable @typescript-eslint/no-explicit-any */

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
    // Use Contentful services directly instead of HTTP fetch
    const entries = await getAllCourses();
    const courses = entries.map(entry => {
      const fields = entry.fields as any;
      return {
        id: entry.sys.id,
        title: fields.title || 'Untitled Course',
        slug: fields.slug || '',
        shortTagline: fields.shortTagline || '',
        description: extractTextFromRichText(fields.description) || '',
        coverImage: fields.coverImage ? {
          url: fields.coverImage.fields?.file?.url || '',
          title: fields.coverImage.fields?.title || '',
          width: fields.coverImage.fields?.file?.details?.image?.width || 0,
          height: fields.coverImage.fields?.file?.details?.image?.height || 0,
        } : null,
        categories: fields.categories?.map((cat: any) => ({
          id: cat.sys?.id || '',
          name: cat.fields?.name || '',
          slug: cat.fields?.slug || ''
        })) || [],
        mentors: fields.mentors?.map((mentor: any) => ({
          id: mentor.sys?.id || '',
          name: mentor.fields?.name || '',
          bio: extractTextFromRichText(mentor.fields?.bio) || '',
          avatar: mentor.fields?.avatar ? {
            url: mentor.fields.avatar.fields?.file?.url || '',
            title: mentor.fields.avatar.fields?.title || ''
          } : null
        })) || [],
        lessons: fields.lessons?.map((lesson: any) => ({
          id: lesson.sys?.id || '',
          title: lesson.fields?.title || '',
          slug: lesson.fields?.slug || '',
          description: extractTextFromRichText(lesson.fields?.content) || '',
          videoUrl: lesson.fields?.videoUrl || '',
          duration: '',
          order: lesson.fields?.order || 0,
          isPreview: lesson.fields?.isPreview || false,
          requiresLogin: lesson.fields?.requiresLogin || false,
          externalId: lesson.fields?.externalId || ''
        })) || [],
        price: 0,
        level: 'Beginner',
        duration: fields.lessons?.length ? `${fields.lessons.length} lessons` : '',
        instructor: fields.mentors?.[0]?.fields?.name || '',
        category: fields.categories?.[0]?.fields?.name || 'General',
        tags: fields.categories?.map((cat: any) => cat.fields?.name || '') || [],
        thumbnail: fields.coverImage ? {
          url: fields.coverImage.fields?.file?.url || '',
          title: fields.coverImage.fields?.title || '',
          width: fields.coverImage.fields?.file?.details?.image?.width || 0,
          height: fields.coverImage.fields?.file?.details?.image?.height || 0,
        } : null,
        featured: false,
        isActive: true,
        curriculum: fields.lessons?.map((lesson: any) => lesson.fields?.title || '') || [],
        createdAt: entry.sys.createdAt,
        updatedAt: entry.sys.updatedAt,
      };
    });
    
    // Extract unique categories from courses
    const courseCategories = courses
      .map((course: Course) => course.category)
      .filter((category: string) => category && category.trim() !== '')
      .filter((category: string, index: number, arr: string[]) => arr.indexOf(category) === index);
    
    return {
      courses,
      categories: ['All', ...courseCategories]
    };
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

