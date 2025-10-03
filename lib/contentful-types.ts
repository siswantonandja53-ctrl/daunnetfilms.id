// Content type definitions for your Contentful space
// Update these based on your actual Contentful content models

import { ContentfulAsset } from './contentful';

export interface CourseContentFields {
  title: string;
  description: string;
  price: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: ContentfulAsset;
  curriculum: string[];
  instructor: string;
  tags: string[];
  isActive: boolean;
  featured: boolean;
}

export interface BlogPostFields {
  title: string;
  slug: string;
  content: Record<string, unknown>; // Rich text content
  excerpt: string;
  featuredImage: ContentfulAsset;
  author: string;
  publishDate: string;
  tags: string[];
  category: string;
}

export interface TestimonialFields {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: ContentfulAsset;
  featured: boolean;
}

export interface FAQFields {
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface InstructorFields {
  name: string;
  bio: string;
  avatar: ContentfulAsset;
  expertise: string[];
  experience: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

// Content type IDs (update these to match your Contentful setup)
export const CONTENT_TYPES = {
  COURSE: 'course',
  BLOG_POST: 'blogPost', 
  TESTIMONIAL: 'testimonial',
  FAQ: 'faq',
  INSTRUCTOR: 'instructor',
} as const;