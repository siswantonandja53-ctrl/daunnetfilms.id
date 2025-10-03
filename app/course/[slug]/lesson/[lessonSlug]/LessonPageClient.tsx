"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Course } from "../../../page";
import { generateLessonSlug } from "./page";

// Define the API lesson interface
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

interface LessonPageClientProps {
  course: Course | null;
  lesson: ApiLesson | null;
  lessonIndex: number;
  courseSlug: string;
  lessonSlug: string;
}

export default function LessonPageClient({ 
  course, 
  lesson, 
  lessonIndex, 
  courseSlug 
}: LessonPageClientProps) {
  const [secureVideoUrl, setSecureVideoUrl] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Fetch secure video URL on component mount
  useEffect(() => {
    if (!lesson) {
      setVideoLoading(false);
      return;
    }

    const fetchSecureVideoUrl = async () => {
      try {
        setVideoLoading(true);
        setVideoError(null);

        // For embedded videos (YouTube, Vimeo, etc.), use direct URL
        if (lesson.videoUrl && !lesson.videoAsset?.contentType?.startsWith('video/')) {
          setSecureVideoUrl(lesson.videoUrl);
          setVideoLoading(false);
          return;
        }

        // For direct video files, get encrypted URL
        if (lesson.videoAsset?.url || lesson.videoUrl) {
          const response = await fetch('/api/video-security', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'decrypt',
              lessonId: lesson.slug,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setSecureVideoUrl(data.videoUrl);
          } else {
            const errorData = await response.json().catch(() => ({}));
            setVideoError(errorData.error || 'Failed to load secure video');
          }
        } else {
          setVideoError('No video available for this lesson');
        }
      } catch (error) {
        console.error('Error fetching secure video URL:', error);
        setVideoError('Error loading video');
      } finally {
        setVideoLoading(false);
      }
    };

    fetchSecureVideoUrl();
  }, [lesson]);
  if (!course || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Lesson Not Found</h1>
        <p className="text-white/70 mb-8">The lesson you&apos;re looking for doesn&apos;t exist.</p>
        <Link 
          href={`/course/${courseSlug}`}
          className="bg-gradient-to-r from-[#EECC27] to-[#FF8400] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Back to Course
        </Link>
      </div>
    );
  }



  return (
    <div className="relative min-h-screen bg-[#2E0B25] font-montserrat ">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{backgroundImage: "url('/courses/lesson-bg.jpg')"}}
      />
      
      {/* Breadcrumb */}
          <div className="relative z-10 pt-6  max-w-screen-xl mx-auto px-4">
        <nav className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg px-6 py-4 w-fit">
          <Link href="/course" className="text-white text-base hover:text-[#EECC27] transition-colors">Kurikulum</Link>
          <span className="text-white text-base">&gt;</span>
          <Link href={`/course/${courseSlug}`} className="text-white text-base hover:text-[#EECC27] transition-colors">{course.title}</Link>
          <span className="text-white text-base">&gt;</span>
          <span className="text-white text-base">Kursus</span>
          <span className="text-white text-base">&gt;</span>
          <span className="text-white text-base">#{lessonIndex + 1}</span>
        </nav>
      </div>

      {/* Progress Bar */}
          <div className="relative z-10  mt-8 max-w-screen-xl mx-auto px-4">
        <div className="w-full h-[50px] bg-white rounded-full flex items-center px-8 relative">
          <span className="text-[#FF8400] text-[25px] font-medium">0%</span>
          <span className="absolute right-8 text-[#FF8400] text-[19px] font-medium">Selesai</span>
        </div>
      </div>

      {/* Main Content */}
          <div className="relative z-10  mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto px-4">
        {/* Left Content - Video and Description */}
        <div className="lg:col-span-2">
          {/* Course Info */}
          <div className="mb-6">
            <p className="text-white/70 text-base mb-2">Kursus</p>
            <p className="text-white/70 text-base mb-4">{new Date().toLocaleDateString('id-ID')}</p>
            <h1 className="text-white text-[25px] font-semibold mb-4">{lesson.title}</h1>
            <h2 className="text-white text-[25px] font-medium">{course.title}</h2>
          </div>

          {/* Video Player */}
          <div className="w-full h-[400px] bg-black rounded-[10px] mb-6 relative overflow-hidden">
            {videoLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white text-lg">Loading secure video...</p>
                </div>
              </div>
            ) : videoError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-red-400 text-lg">{videoError}</p>
                </div>
              </div>
            ) : secureVideoUrl ? (
              <div className="w-full h-full">
                {lesson.videoAsset?.contentType?.startsWith('video/') ? (
                  // Direct video file with secure URL
                  <video
                    src={secureVideoUrl}
                    controls
                    controlsList="nodownload noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback
                    onContextMenu={(e) => e.preventDefault()}
                    onLoad={(e) => {
                      // Additional security: disable right-click on video element
                      const video = e.target as HTMLVideoElement;
                      video.addEventListener('contextmenu', (e) => e.preventDefault());
                    }}
                    className="w-full h-full object-cover"
                    poster={lesson.videoAsset?.description || undefined}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  // Embedded video (YouTube, Vimeo, etc.)
                  <iframe
                    src={secureVideoUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white text-lg">Video will be available soon</p>
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          {lesson.videoAsset && (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 mb-6">
              <h4 className="text-white text-sm font-medium mb-2">Video Information</h4>
              <div className="text-white/70 text-xs space-y-1">
                {lesson.videoAsset.title && (
                  <p><span className="font-medium">Title:</span> {lesson.videoAsset.title}</p>
                )}
                {lesson.videoAsset.contentType && (
                  <p><span className="font-medium">Type:</span> {lesson.videoAsset.contentType}</p>
                )}
                {lesson.videoAsset.size && (
                  <p><span className="font-medium">Size:</span> {(lesson.videoAsset.size / 1024 / 1024).toFixed(2)} MB</p>
                )}
              </div>
            </div>
          )}

          {/* Lesson Description */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-white text-xl font-medium mb-4">Tentang Pelajaran Ini</h3>
            <p className="text-white/80 leading-relaxed">
              {typeof lesson.content === "string" ? lesson.content : ""}
            </p>
          </div>
        </div>

        {/* Right Sidebar - Lesson List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg overflow-hidden h-[550px] relative">
            {/* Scrollable Lesson List */}
            <div className="h-full overflow-y-auto">
              {course.lessons.map((courseLesson: Course['lessons'][0], index: number) => {
                const isCurrentLesson = index === lessonIndex;
                return (
                  <div 
                    key={courseLesson.id}
                    className={`p-4 border-b border-gray-200 transition-colors ${
                      isCurrentLesson 
                        ? 'bg-[#2E0B25] text-white' 
                        : 'bg-white text-[#200629] hover:bg-gray-50'
                    }`}
                  >
                    <Link 
                      href={`/course/${courseSlug}/lesson/${generateLessonSlug(courseLesson.title)}`}
                      className="block"
                    >
                      <div className="flex items-start gap-4">
                        {/* Thumbnail */}
                        <div className="flex-shrink-0">
                          <div className="w-[130px] h-[80px] bg-gray-300 rounded overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                              <span className="text-white text-xs">Lesson {index + 1}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium text-sm mb-2 line-clamp-2 ${
                            isCurrentLesson ? 'text-white' : 'text-[#200629]'
                          }`}>
                            {courseLesson.title}
                          </h4>
                          <p className={`text-xs leading-relaxed line-clamp-3 ${
                            isCurrentLesson ? 'text-white/80' : 'text-[#200629]/70'
                          }`}>
                            {courseLesson.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do..."}
                          </p>
                          {courseLesson.duration && (
                            <span className={`inline-block mt-2 text-xs ${
                              isCurrentLesson ? 'text-white/70' : 'text-[#200629]/60'
                            }`}>
                              {courseLesson.duration}
                            </span>
                          )}
                        </div>

                        {/* Play Icon for Current Lesson */}
                        {isCurrentLesson && (
                          <div className="flex-shrink-0 ml-2">
                            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-[#2E0B25] transform rotate-45 origin-center"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Spacer */}
      <div className="h-20"></div>
    </div>
  );
}