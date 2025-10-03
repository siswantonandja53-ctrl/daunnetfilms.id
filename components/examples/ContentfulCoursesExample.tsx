// Example component showing Contentful integration
import { getAllCourses, transformEntries } from '@/lib/contentful-services';
import { getOptimizedImageUrl, ContentfulAsset } from '@/lib/contentful';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  thumbnail: ContentfulAsset;
  featured: boolean;
}

export default async function ContentfulCoursesExample() {
  // Fetch courses from Contentful
  const courses = await getAllCourses();
  const transformedCourses = transformEntries(courses) as Course[];

  return (
    <div className="bg-black min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Courses from Contentful
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transformedCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-gray-900 border border-white/20 rounded-lg overflow-hidden hover:border-[#F57C00] transition-colors"
            >
              {/* Course thumbnail */}
              {course.thumbnail && (
                <div className="relative h-48 w-full">
                  <Image
                    src={getOptimizedImageUrl(course.thumbnail, 400, 200)}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  {course.featured && (
                    <div className="absolute top-2 right-2 bg-[#F57C00] text-white px-2 py-1 rounded text-sm font-semibold">
                      Featured
                    </div>
                  )}
                </div>
              )}
              
              {/* Course content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {course.title}
                </h3>
                
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {course.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#F57C00] font-bold text-lg">
                    ${course.price}
                  </span>
                  <span className="text-gray-500 text-sm bg-gray-800 px-2 py-1 rounded">
                    {course.level}
                  </span>
                </div>
                
                <button className="w-full mt-4 bg-[#F57C00] hover:bg-[#EE6028] text-white py-2 px-4 rounded transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {transformedCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No courses found in Contentful. Please check your space configuration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// You can use this component in your pages like:
// import ContentfulCoursesExample from '@/components/ContentfulCoursesExample';
// 
// export default function CoursesPage() {
//   return <ContentfulCoursesExample />;
// }