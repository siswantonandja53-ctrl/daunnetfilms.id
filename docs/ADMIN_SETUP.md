# Admin Access Setup Guide

## Quick Setup

### 1. Add Admin Emails to Environment Variable

Edit your `.env` or `.env.local` file and add admin email addresses:

```bash
# Admin Access Control (comma-separated email addresses)
ADMIN_EMAILS=admin@daunnetfilms.id,another-admin@example.com,third-admin@example.com
```

**Important Notes:**
- Use commas to separate multiple emails
- No spaces around commas (they will be automatically trimmed)
- Use the exact email addresses that users sign in with via Clerk

### 2. Restart Development Server

After updating the `.env` file:

```bash
# Stop the current server (Ctrl+C)
# Then restart
yarn dev
```

For production:
```bash
yarn build
yarn start
```

### 3. Test Access

1. **Test as Admin:**
   - Sign in with an email listed in `ADMIN_EMAILS`
   - Navigate to `/admin`
   - You should see the admin panel with a green badge

2. **Test as Non-Admin:**
   - Sign in with an email NOT in `ADMIN_EMAILS`
   - Navigate to `/admin`
   - You should see "Access Denied" page

## Environment Variables

### Development (.env.local)
```bash
ADMIN_EMAILS=your-email@example.com,admin@daunnetfilms.id
```

### Production (Vercel)
Add to your Vercel environment variables:
```
Variable Name: ADMIN_EMAILS
Value: admin@daunnetfilms.id,another-admin@example.com
```

## Adding/Removing Admins

### Add New Admin
1. Add their email to `ADMIN_EMAILS` in `.env`
2. Rebuild/restart the application
3. User can now access `/admin` after signing in

### Remove Admin
1. Remove their email from `ADMIN_EMAILS` in `.env`
2. Rebuild/restart the application
3. User will see "Access Denied" on next visit

## Fallback Configuration

If `ADMIN_EMAILS` environment variable is not set, the system falls back to:
```typescript
['your-admin-email@example.com']
```

**Warning:** Make sure to set the environment variable in production to avoid using the fallback!

## Admin Panel Features

Once authenticated, admins can access:

### 🔄 Cache Revalidation
- Revalidate all Contentful data
- Revalidate specific courses by slug
- Revalidate specific lessons by slug

### ⚡ Quick Actions
- **View Courses**: Opens `/course` page
- **Edit Content**: Opens Contentful CMS
- **API Status**: Opens `/api/contentful-courses` endpoint

### 🔗 Webhook Configuration
- Display webhook URL for Contentful
- Setup instructions
- Trigger configuration

### 📊 Cache Information
- Cache tags documentation
- Cache duration settings
- ISR configuration details

## Security Features

✅ **Clerk Authentication Required**
- Must be signed in via Clerk to access

✅ **Email Whitelist**
- Only emails in `ADMIN_EMAILS` can access

✅ **Access Denied Page**
- Non-admins see clear denial message
- Shows which email they're logged in with

✅ **Search Engine Protection**
- `robots: 'noindex, nofollow'` metadata
- Prevents admin page from being indexed

✅ **Visual Confirmation**
- Green badge shows admin email when authenticated

## Troubleshooting

### "Access Denied" for Valid Admin

**Check Email Match:**
```bash
# In .env file
ADMIN_EMAILS=admin@daunnetfilms.id

# Must match exactly what Clerk shows
# Check case sensitivity!
```

**Verify Environment Variable:**
```bash
# Check if env var is loaded
console.log(process.env.ADMIN_EMAILS)
```

**Clear and Rebuild:**
```bash
rm -rf .next
yarn build
yarn start
```

### Email Not Showing in Clerk

1. Go to Clerk Dashboard
2. Check user profile
3. Ensure email is verified
4. Check session claims include email

### Redirect Loop

1. Verify Clerk is properly configured
2. Check environment variables are set:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   ```
3. Clear browser cache and cookies
4. Try incognito mode

### Changes Not Taking Effect

1. Restart development server
2. Clear `.next` folder: `rm -rf .next`
3. Rebuild: `yarn build`
4. For Vercel: Redeploy after changing env vars

## Best Practices

### 1. Use Environment Variables
✅ **DO:** Store admin emails in environment variables
❌ **DON'T:** Hardcode emails in the source code

### 2. Keep List Updated
- Review admin list quarterly
- Remove ex-employees immediately
- Use company email addresses

### 3. Enable 2FA
- Require all admins to enable two-factor authentication in Clerk
- Configure in Clerk Dashboard → User & Authentication → Multi-factor

### 4. Monitor Access
- Check Clerk Dashboard regularly
- Review sign-in attempts
- Set up alerts for suspicious activity

### 5. Separate Environments
```bash
# Development
ADMIN_EMAILS=dev@example.com,test@example.com

# Production
ADMIN_EMAILS=admin@daunnetfilms.id,manager@daunnetfilms.id
```

## Examples

### Single Admin
```bash
ADMIN_EMAILS=admin@daunnetfilms.id
```

### Multiple Admins
```bash
ADMIN_EMAILS=admin@daunnetfilms.id,manager@daunnetfilms.id,editor@daunnetfilms.id
```

### With Spaces (Auto-trimmed)
```bash
ADMIN_EMAILS=admin@daunnetfilms.id, manager@daunnetfilms.id, editor@daunnetfilms.id
```

## Related Documentation

- [ADMIN_ACCESS.md](./ADMIN_ACCESS.md) - Detailed access control documentation
- [REVALIDATION.md](./REVALIDATION.md) - Cache revalidation guide
- [Clerk Documentation](https://clerk.com/docs) - Authentication setup

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Clerk dashboard for authentication issues
3. Check server logs for errors
4. Verify environment variables are set correctly
