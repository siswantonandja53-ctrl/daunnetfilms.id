import React from "react";
import { Course } from "../page";
import CourseSlugClient from "./CourseSlugClient";
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

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

// Helper function to transform Contentful entry to Course
function transformCourseEntry(entry: any): Course {
  const fields = entry.fields;
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
}

// Server-side data fetching for single course
async function fetchCourseBySlug(slug: string) {
  try {
    const entries = await getAllCourses();
    const course = entries
      .map(transformCourseEntry)
      .find((course: Course) => generateSlug(course.title) === slug);
    
    return course || null;
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
    const entries = await getAllCourses();
    const courses = entries.map(transformCourseEntry);
    
    return courses.map((course: Course) => ({
      slug: generateSlug(course.title),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}