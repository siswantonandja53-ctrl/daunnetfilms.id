"use client";

import React from "react";
import Link from "next/link";
import { Course } from "../page";

// Helper function to generate lesson slug
function generateLessonSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

interface CourseSlugClientProps {
  course: Course | null;
  slug: string;
}

export default function CourseSlugClient({ course }: CourseSlugClientProps) {
  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Course Not Found</h1>
        <p className="text-white/70 mb-8">The course you&apos;re looking for doesn&apos;t exist.</p>
        <Link 
          href="/course" 
          className="bg-gradient-to-r from-[#EECC27] to-[#FF8400] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  // Sort lessons by order from Contentful
  const sortedLessons = course.lessons.sort((a, b) => a.order - b.order);
console.log(course, "course")
  return (
    <>
      {/* Hero Background Section */}
      <div className="relative">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 h-full bg-gradient-to-r from-gray-800 to-gray-900"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(41,14,40,0)] via-[rgba(41,14,40,0.83)] to-[#290E28]" style={{background: "linear-gradient(4.37deg, rgba(41, 14, 40, 0) -18.51%, rgba(41, 14, 40, 0.828928) 43.63%, #290E28 88.25%)"}}></div>
        </div>

        {/* Breadcrumb */}
        <div className="relative z-10 pt-12 px-4 max-w-screen-xl mx-auto">
          <nav className="flex items-center gap-2 mt-4 bg-black/20 backdrop-blur-sm rounded-lg px-6 py-4 w-fit">
            <Link href="/course" className="text-white text-base hover:text-[#EECC27] transition-colors">Course</Link>
            <span className="text-white text-base">&gt;</span>
            <span className="text-white text-base">{course.title}</span>
          </nav>
        </div>

        {/* Course Header */}
        <section className="relative z-10 text-center px-4 py-16 max-w-screen-xl mx-auto">
          <p className="text-white text-[25px] font-normal mb-2">
            {course.categories.length > 0 ? course.categories[0].name : 'Kurikulum #1'}
          </p>
          <h1 className="text-white text-[35px] font-bold leading-[43px] mb-6">{course.title}</h1>
          
          {/* Course Info */}
          <div className="flex justify-center items-center gap-6 mb-6 text-white/80">
            {course.lessons.length > 0 && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                </svg>
                {course.lessons.length} lessons
              </span>
            )}
            {course.mentors.length > 0 && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
                {course.mentors[0].name}
              </span>
            )}
          </div>
          
          <div className="max-w-[802px] mx-auto">
            <p className="text-white text-base leading-[25px] text-center">
              {typeof course.description === 'string' && course.description.trim() !== ''
                ? course.description 
                : course.shortTagline || "Description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              }
            </p>
          </div>
        </section>
      </div>

      {/* Course Content Section */}
      <section className="relative z-10  max-w-screen-xl mx-auto px-4 pb-32 mt-16">
        <h2 className="text-white text-[25px] font-normal mb-8">Kursus</h2>
        
        {/* Video List */}
        <div className="space-y-4">
          {sortedLessons.length > 0 ? (
            sortedLessons.map((lesson: Course['lessons'][0], index: number) => (
              <Link 
                key={lesson.id} 
                href={`/course/${course.slug || course.title.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').trim().replace(/\\s+/g, '-').replace(/-+/g, '-')}/lesson/${lesson.slug || generateLessonSlug(lesson.title)}`}
                className="block"
              >
                <div className="bg-[#200629] rounded-[10px] p-[5px] flex items-center hover:bg-[#2a0a33] transition-colors">
                  {/* Video Thumbnail */}
                  <div className="flex-shrink-0 p-[10px]">
                    <div 
                      className="w-[190px] h-[110px] bg-gray-700 bg-cover bg-center rounded-[5px] flex items-center justify-center"
                    >
                      <span className="text-white text-sm">Lesson {index + 1}</span>
                    </div>
                  </div>
                  
                  {/* Video Content */}
                  <div className="flex-1 px-6 py-4">
                    <h3 className="text-white text-base font-medium mb-1">{lesson.title}</h3>
                    {lesson.duration && (
                      <p className="text-white/70 text-sm mb-2">{lesson.duration}</p>
                    )}
                    <p className="text-white text-sm font-light leading-[17px]">
                      {lesson.description || "No description available"}
                    </p>
                  </div>
                  
                  {/* Start Button */}
                  <div className="flex-shrink-0 pr-6">
                    <div className="bg-gradient-to-b from-[#EECC27] to-[#FF8400] text-white px-6 py-2 rounded-[10px] text-base font-normal hover:opacity-90 transition-opacity">
                      Mulai
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-white/70 text-lg">No lessons available for this course yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}