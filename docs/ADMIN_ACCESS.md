# Admin Access Configuration

## Overview
The admin panel (`/admin`) is protected and only accessible to users with specific email addresses authenticated through Clerk.

## Setup Instructions

### 1. Configure Admin Emails

Edit the `ADMIN_EMAILS` array in `/app/admin/page.tsx`:

```typescript
const ADMIN_EMAILS = [
  'admin@daunnetfilms.id',
  'another-admin@example.com',
  // Add more admin emails here
];
```

### 2. Clerk Authentication Setup

Make sure you have Clerk properly configured in your `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

### 3. How It Works

1. **Not Logged In**: User is redirected to `/sign-in?redirect_url=/admin`
2. **Logged In but Not Admin**: Shows "Access Denied" page with their email
3. **Logged In as Admin**: Full access to admin panel

## Features

### Access Control
- ✅ Email-based authentication
- ✅ Automatic redirect to sign-in page
- ✅ Clear access denied message
- ✅ Shows logged-in user's email

### Admin Panel Features
- 🔄 Cache Revalidation
  - Revalidate all Contentful data
  - Revalidate specific courses
  - Revalidate specific lessons
  
- ⚡ Quick Actions
  - View live courses page
  - Open Contentful CMS
  - Check API status
  
- 🔗 Webhook Configuration
  - Webhook URL display
  - Setup instructions
  
- 📊 Cache Information
  - Cache tags documentation
  - Cache duration settings

## Testing Admin Access

### Test as Admin
1. Sign in with an email listed in `ADMIN_EMAILS`
2. Navigate to `/admin`
3. You should see the full admin panel

### Test as Non-Admin
1. Sign in with an email NOT in `ADMIN_EMAILS`
2. Navigate to `/admin`
3. You should see "Access Denied" page

## Security Best Practices

1. **Keep Email List Updated**: Regularly review and update the `ADMIN_EMAILS` list
2. **Use Environment Variables** (Optional): For better security, you can move the email list to environment variables:

```typescript
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || [];
```

Then in `.env.local`:
```bash
ADMIN_EMAILS=admin@daunnetfilms.id,another-admin@example.com
```

3. **Enable 2FA**: Encourage admins to enable two-factor authentication in Clerk
4. **Monitor Access**: Check Clerk dashboard for sign-in attempts
5. **robots.txt**: Admin page already has `robots: 'noindex, nofollow'` metadata

## Adding New Admins

1. Get the user's email address
2. Add it to the `ADMIN_EMAILS` array
3. Rebuild and deploy the application
4. User can now access `/admin` after signing in

## Removing Admin Access

1. Remove the email from `ADMIN_EMAILS` array
2. Rebuild and deploy
3. User will see "Access Denied" on next visit

## Troubleshooting

### "Access Denied" for Valid Admin
- Verify email is exactly correct in `ADMIN_EMAILS` (case-sensitive)
- Check that Clerk session is active
- Verify email claim is available in Clerk session

### Redirect Loop
- Check Clerk configuration
- Verify environment variables are set
- Check browser console for errors

### Email Not Showing
- Ensure Clerk user profile has email set
- Check Clerk dashboard for user details
- Verify `sessionClaims` includes email

## Related Files

- `/app/admin/page.tsx` - Main admin page with access control
- `/components/RevalidationPanel.tsx` - Cache revalidation UI
- `/app/api/revalidate/route.ts` - Manual revalidation API
- `/app/api/contentful-webhook/route.ts` - Automatic webhook handler
