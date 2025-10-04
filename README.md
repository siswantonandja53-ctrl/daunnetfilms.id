This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Install Dependencies

```bash
yarn install
```

### 2. Environment Setup

Copy the example environment file and update with your credentials:

```bash
cp .env.local.example .env.local
```

Required environment variables:
- **Clerk Authentication**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- **Contentful CMS**: `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`
- **Admin Access**: `ADMIN_EMAILS` (comma-separated email addresses)
- **Revalidation**: `CONTENTFUL_REVALIDATE_SECRET`

See [`.env.local.example`](./.env.local.example) for full list.

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features

### 🎓 Course Management
- Dynamic course pages powered by Contentful CMS
- Video lessons with secure streaming
- Progress tracking and enrollment

### 🔐 Authentication & Authorization
- User authentication via Clerk
- Email-based admin access control
- Protected lesson content

### 🎬 Video Security
- Encrypted video URLs
- Token-based authentication
- Download protection
- Proxy streaming for Contentful videos

### ⚡ Performance
- Next.js 15 with Turbopack
- ISR (Incremental Static Regeneration)
- On-demand cache revalidation
- Optimized images and fonts

### 🛠️ Admin Panel
- Content cache revalidation
- Webhook integration with Contentful
- Quick access to CMS and API status

## Documentation

- 📖 [Admin Setup Guide](./docs/ADMIN_SETUP.md) - Configure admin access
- 🔄 [Cache Revalidation](./docs/REVALIDATION.md) - Manage content updates
- 🔐 [Admin Access Control](./docs/ADMIN_ACCESS.md) - Security & permissions

## Project Structure

```
├── app/
│   ├── (routes)/          # Application routes
│   ├── api/               # API endpoints
│   ├── admin/             # Admin panel (protected)
│   └── course/            # Course pages
├── components/            # React components
├── lib/                   # Utility functions
│   ├── contentful.ts      # Contentful client
│   ├── contentful-services.ts
│   └── videoEncryption.ts # Video security
├── docs/                  # Documentation
└── public/               # Static assets
```

## Admin Panel Access

To access the admin panel at `/admin`:

1. Set `ADMIN_EMAILS` in your `.env.local`:
   ```bash
   ADMIN_EMAILS=admin@daunnetfilms.id,another-admin@example.com
   ```

2. Sign in with one of the authorized emails
3. Navigate to `/admin`

See [Admin Setup Guide](./docs/ADMIN_SETUP.md) for detailed instructions.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set these in Vercel:
- All Clerk keys
- Contentful credentials
- `ADMIN_EMAILS` for admin access
- `CONTENTFUL_REVALIDATE_SECRET` for webhooks
- `NEXT_PUBLIC_BASE_URL` for webhooks

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
