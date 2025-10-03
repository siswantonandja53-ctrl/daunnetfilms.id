# Contentful Integration

This project uses Contentful as a headless CMS for managing content. The integration includes a client setup, type definitions, and service functions for common operations.

## Setup

1. **Install Dependencies**
   ```bash
   npm install contentful
   ```

2. **Environment Variables**
   Add the following to your `.env.local`:
   ```bash
   CONTENTFUL_SPACE_ID=dvoi3lns71io
   CONTENTFUL_ACCESS_TOKEN=PMHlpVDixr-Fp4GkhDvt7YxPopU45mYTJkRaAv3osnk
   ```

## File Structure

- `lib/contentful.ts` - Main Contentful client and utility functions
- `lib/contentful-types.ts` - TypeScript interfaces for content types
- `lib/contentful-services.ts` - Service functions for specific content operations

## Usage Examples

### Basic Content Fetching

```typescript
import { getAllCourses, getFeaturedCourses } from '@/lib/contentful-services';

// Get all courses
const courses = await getAllCourses();

// Get only featured courses
const featuredCourses = await getFeaturedCourses();
```

### In Next.js Pages/Components

```typescript
// pages/courses.tsx or app/courses/page.tsx
import { getAllCourses, transformEntries } from '@/lib/contentful-services';

export async function getStaticProps() {
  const courses = await getAllCourses();
  const transformedCourses = transformEntries(courses);

  return {
    props: {
      courses: transformedCourses,
    },
    revalidate: 60, // Revalidate every minute
  };
}

// Or in App Router
export default async function CoursesPage() {
  const courses = await getAllCourses();
  const transformedCourses = transformEntries(courses);

  return (
    <div>
      {transformedCourses.map((course) => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p>Price: ${course.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### Working with Images

```typescript
import { getOptimizedImageUrl } from '@/lib/contentful';

// In your component
const imageUrl = getOptimizedImageUrl(course.thumbnail, 800, 600, 90);

<Image 
  src={imageUrl} 
  alt={course.title}
  width={800}
  height={600}
/>
```

## Content Types

The following content types are predefined (update based on your Contentful setup):

- **Course** (`course`) - Educational courses
- **Blog Post** (`blogPost`) - Blog articles
- **Testimonial** (`testimonial`) - Customer testimonials
- **FAQ** (`faq`) - Frequently asked questions
- **Instructor** (`instructor`) - Course instructors

## Available Services

### Courses
- `getAllCourses()` - Get all courses
- `getFeaturedCourses()` - Get featured courses only
- `getCourseBySlug(slug)` - Get course by URL slug

### Blog
- `getAllBlogPosts()` - Get all blog posts
- `getBlogPostBySlug(slug)` - Get post by slug
- `getRecentBlogPosts(limit)` - Get recent posts

### Testimonials
- `getAllTestimonials()` - Get all testimonials
- `getFeaturedTestimonials()` - Get featured testimonials

### FAQs
- `getAllFAQs()` - Get all FAQs
- `getFAQsByCategory(category)` - Get FAQs by category

### Instructors
- `getAllInstructors()` - Get all instructors
- `getInstructorById(id)` - Get instructor by ID

## Best Practices

1. **Caching**: Use Next.js ISR or SWR for caching
2. **Error Handling**: All service functions include try-catch error handling
3. **Type Safety**: Use the provided TypeScript interfaces
4. **Image Optimization**: Use `getOptimizedImageUrl()` for responsive images
5. **Environment Variables**: Never commit access tokens to version control

## Customization

1. Update content type interfaces in `lib/contentful-types.ts`
2. Modify service functions in `lib/contentful-services.ts`
3. Add new content types to the `CONTENT_TYPES` constant
4. Create additional service functions as needed