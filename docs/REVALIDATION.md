# 🔄 Content Revalidation System

This system provides automatic and manual cache revalidation for Contentful data in your Next.js application.

## 🏗️ Architecture

### Cache Strategy
- **unstable_cache**: Caches API responses for 1 hour
- **Cache Tags**: Enable targeted revalidation by content type
- **ISR (Incremental Static Regeneration)**: Updates static pages on-demand

### Cache Tags Structure
```
contentful           - All Contentful content
courses              - All course data
lessons              - All lesson data
course-{slug}        - Specific course by slug
lesson-{slug}        - Specific lesson by slug
```

## 🚀 Usage

### Automatic Revalidation (Webhooks)
1. **Configure Contentful Webhook:**
   ```
   URL: https://your-domain.com/api/contentful-webhook
   Triggers: Entry publish, unpublish, delete
   Content types: Course, Lesson
   ```

2. **Webhook automatically revalidates:**
   - Course changes → Revalidates course pages and listings
   - Lesson changes → Revalidates all content (due to cross-references)

### Manual Revalidation (Admin Panel)
1. **Access Admin Panel:**
   ```
   https://your-domain.com/admin
   ```

2. **Available Actions:**
   - **Revalidate Courses**: Updates all course-related data
   - **Revalidate All Content**: Clears entire cache
   - **Revalidate Specific Path**: Updates a specific page

### API Endpoints

#### Manual Revalidation API
```bash
# Revalidate by path
GET /api/revalidate?path=/course&secret=YOUR_SECRET

# Revalidate by tag
GET /api/revalidate?tag=courses&secret=YOUR_SECRET

# Bulk revalidation
POST /api/revalidate?secret=YOUR_SECRET
{
  "type": "course",
  "slug": "cinematography"
}
```

#### Server Actions
```typescript
import { revalidateCourses, revalidateAllContentful } from '@/lib/revalidation';

// Revalidate all courses
await revalidateCourses();

// Revalidate all content
await revalidateAllContentful();

// Revalidate specific course
await revalidateCourse('cinematography');
```

## 🔧 Configuration

### Environment Variables
```bash
# Required for webhook security
CONTENTFUL_REVALIDATE_SECRET=your_secure_random_string

# For client-side admin panel
NEXT_PUBLIC_REVALIDATE_SECRET=your_secure_random_string

# Base URL for webhooks
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### Contentful Setup
1. **Create Webhook in Contentful:**
   - Go to Settings → Webhooks
   - Add webhook with your `/api/contentful-webhook` URL
   - Select "Entry publish", "Entry unpublish", "Entry delete"
   - Filter by Content types: Course, Lesson

2. **Content Model Requirements:**
   - **Course**: Must have `slug` field
   - **Lesson**: Must have `slug` field

## 📊 Monitoring

### Cache Performance
- Check cache headers in browser dev tools
- Monitor API response times
- Use admin panel to test revalidation

### Debugging
```bash
# Check if webhook is working
curl https://your-domain.com/api/contentful-webhook

# Test manual revalidation
curl "https://your-domain.com/api/revalidate?tag=courses&secret=YOUR_SECRET"
```

### Logs
- Webhook events are logged to console
- Revalidation results show in admin panel
- API responses include timestamp and status

## 🛠️ Troubleshooting

### Common Issues

1. **Cache not updating:**
   - Check webhook URL is correct
   - Verify secret environment variable
   - Test manual revalidation in admin panel

2. **Webhook not triggering:**
   - Verify Contentful webhook configuration
   - Check webhook URL is publicly accessible
   - Review Contentful webhook logs

3. **Partial updates:**
   - Some content may need full revalidation
   - Use "Revalidate All Content" for complete refresh

### Performance Tips
- Use specific cache tags when possible
- Avoid frequent full revalidation
- Monitor cache hit rates
- Consider shorter cache durations for frequently updated content

## 📁 File Structure
```
lib/
  revalidation.ts           # Server actions for revalidation
  
app/
  api/
    revalidate/route.ts     # Manual revalidation API
    contentful-webhook/route.ts # Automatic webhook handler
    contentful-courses/route.ts # Cached courses API
    contentful-lesson/route.ts  # Cached lesson API
  admin/
    page.tsx               # Admin panel for manual control
    
components/
  RevalidationPanel.tsx    # Admin UI component
```

## 🔐 Security
- Webhook endpoints are protected by secret verification
- Admin panel should be protected (add auth middleware)
- Environment variables contain sensitive data
- Rate limiting recommended for production

## 🚀 Deployment
1. Set environment variables in production
2. Update webhook URL in Contentful
3. Test webhook delivery
4. Monitor cache performance
5. Set up monitoring/alerting for webhook failures