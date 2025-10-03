'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

// Revalidate all course-related data
export async function revalidateCourses() {
  try {
    // Revalidate course listing page
    revalidatePath('/course', 'page')
    
    // Revalidate course API routes
    revalidateTag('courses')
    revalidateTag('lessons')
    
    // Revalidate home page if it shows courses
    revalidatePath('/', 'page')
    
    console.log('✅ Courses data revalidated successfully')
    return { success: true, message: 'Courses revalidated' }
  } catch (error) {
    console.error('❌ Error revalidating courses:', error)
    return { success: false, message: 'Failed to revalidate courses' }
  }
}

// Revalidate specific course data
export async function revalidateCourse(courseSlug: string) {
  try {
    // Revalidate specific course page
    revalidatePath(`/course/${courseSlug}`, 'page')
    
    // Revalidate all lessons for this course
    revalidatePath(`/course/${courseSlug}/lesson/[lessonSlug]`, 'page')
    
    // Revalidate course API data
    revalidateTag(`course-${courseSlug}`)
    
    console.log(`✅ Course "${courseSlug}" revalidated successfully`)
    return { success: true, message: `Course ${courseSlug} revalidated` }
  } catch (error) {
    console.error(`❌ Error revalidating course ${courseSlug}:`, error)
    return { success: false, message: `Failed to revalidate course ${courseSlug}` }
  }
}

// Revalidate specific lesson data
export async function revalidateLesson(courseSlug: string, lessonSlug: string) {
  try {
    // Revalidate specific lesson page
    revalidatePath(`/course/${courseSlug}/lesson/${lessonSlug}`, 'page')
    
    // Revalidate lesson API data
    revalidateTag(`lesson-${lessonSlug}`)
    
    console.log(`✅ Lesson "${lessonSlug}" revalidated successfully`)
    return { success: true, message: `Lesson ${lessonSlug} revalidated` }
  } catch (error) {
    console.error(`❌ Error revalidating lesson ${lessonSlug}:`, error)
    return { success: false, message: `Failed to revalidate lesson ${lessonSlug}` }
  }
}

// Revalidate all Contentful data
export async function revalidateAllContentful() {
  try {
    // Revalidate all pages
    revalidatePath('/', 'layout')
    
    // Revalidate all Contentful tags
    revalidateTag('contentful')
    revalidateTag('courses')
    revalidateTag('lessons')
    
    console.log('✅ All Contentful data revalidated successfully')
    return { success: true, message: 'All Contentful data revalidated' }
  } catch (error) {
    console.error('❌ Error revalidating all Contentful data:', error)
    return { success: false, message: 'Failed to revalidate all Contentful data' }
  }
}