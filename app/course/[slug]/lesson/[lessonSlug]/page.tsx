import React from "react";
import { Course } from "../../../page";
import LessonPageClient from "./LessonPageClient";
import { getAllCourses } from "@/lib/contentful-services";
import client from "@/lib/contentful";

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
  content?: string;
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

// Fetch lesson from Contentful directly
async function fetchLesson(lessonSlug: string): Promise<ApiLesson | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'lesson',
      'fields.slug': lessonSlug,
      limit: 1,
      include: 2
    });
    
    if (entries.items.length === 0) {
      return null;
    }
    
    const entry = entries.items[0];
    const fields = entry.fields as any;
    
    return {
      id: entry.sys.id,
      title: fields.title || '',
      slug: fields.slug || '',
      description: extractTextFromRichText(fields.content) || '',
      videoUrl: fields.videoUrl || '',
      videoAsset: fields.videoAsset ? {
        url: fields.videoAsset.fields?.file?.url || '',
        title: fields.videoAsset.fields?.title || '',
        description: fields.videoAsset.fields?.description || '',
        contentType: fields.videoAsset.fields?.file?.contentType || '',
        size: fields.videoAsset.fields?.file?.details?.size
      } : undefined,
      content: extractTextFromRichText(fields.content),
      order: fields.order || 0,
      duration: fields.duration,
      isPreview: fields.isPreview || false,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt
    };
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return null;
  }
}

// Server-side data fetching for course
async function fetchCourse(courseSlug: string): Promise<Course | null> {
  try {
    const entries = await getAllCourses();
    const courses = entries.map(entry => {
      const fields = entry.fields as any;
      return {
        id: entry.sys.id,
        title: fields.title || '',
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
    
    const course = courses.find((course: Course) => 
      course.slug === courseSlug || course.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-') === courseSlug
    );
    
    return course || null;
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
    const entries = await getAllCourses();
    const params: Array<{ slug: string; lessonSlug: string }> = [];
    
    entries.forEach((entry) => {
      const fields = entry.fields as any;
      const courseSlug = fields.slug || fields.title.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').trim().replace(/\\s+/g, '-').replace(/-+/g, '-');
      
      fields.lessons?.forEach((lesson: any) => {
        params.push({
          slug: courseSlug,
          lessonSlug: generateLessonSlug(lesson.fields?.title || '')
        });
      });
    });
    
    return params;
  } catch (error) {
    console.error('Error generating static params for lessons:', error);
    return [];
  }
}
