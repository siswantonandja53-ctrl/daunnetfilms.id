/* eslint-disable @typescript-eslint/no-explicit-any */
// Contentful service functions for specific content types
import { Entry, EntrySkeletonType } from 'contentful';
import client from './contentful';

// Type for Contentful entries
type ContentfulEntry = Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', string>;

// Course services
export async function getAllCourses(): Promise<ContentfulEntry[]> {
  try {
    const response = await client.getEntries({
      content_type: 'course',
      limit: 100
    });
    return response.items as ContentfulEntry[];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export async function getActiveCourses(): Promise<ContentfulEntry[]> {
  try {
    const response = await client.getEntries({
      content_type: 'course',
      'fields.isActive': true,
      limit: 100,
      order: ['-sys.createdAt']
    });
    return response.items as ContentfulEntry[];
  } catch (error) {
    console.error('Error fetching active courses:', error);
    return [];
  }
}

export async function getFeaturedCourses(): Promise<ContentfulEntry[]> {
  const courses = await getAllCourses();
  return courses.filter((course) => {
    const fields = course.fields as any;
    return fields?.featured;
  });
}

export async function getCourseBySlug(slug: string): Promise<ContentfulEntry | null> {
  try {
    const response = await client.getEntries({
      content_type: 'course',
      'fields.slug': slug,
      limit: 1
    });
    return response.items[0] as ContentfulEntry || null;
  } catch (error) {
    console.error(`Error fetching course with slug ${slug}:`, error);
    return null;
  }
}

// Utility function to transform Contentful entry to simplified object
export function transformEntry<T = Record<string, unknown>>(entry: ContentfulEntry) {
  return {
    id: entry.sys.id,
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
    contentType: entry.sys.contentType?.sys?.id || 'unknown',
    ...entry.fields,
  } as T & {
    id: string;
    createdAt: string;
    updatedAt: string;
    contentType: string;
  };
}

// Transform multiple entries
export function transformEntries<T = Record<string, unknown>>(entries: ContentfulEntry[]) {
  return entries.map(entry => transformEntry<T>(entry));
}