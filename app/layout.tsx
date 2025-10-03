
import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Daunnet Films - Professional Film Production & Course Platform",
    template: "%s | Daunnet Films"
  },
  description: "Daunnet Films offers professional film production services and comprehensive filmmaking courses. Learn cinematography, editing, and production from industry experts.",
  keywords: [
    "film production",
    "cinematography courses",
    "filmmaking education",
    "video production",
    "cinema training",
    "daunnet films",
    "professional filming",
    "film school",
    "online courses"
  ],
  authors: [{ name: "Daunnet Films" }],
  creator: "Daunnet Films",
  publisher: "Daunnet Films",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://daunnetfilms.id'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    title: 'Daunnet Films - Professional Film Production & Courses',
    description: 'Professional film production services and comprehensive filmmaking courses. Learn from industry experts.',
    siteName: 'Daunnet Films',
    images: [
      {
        url: '/daunnet-logo.png',
        width: 1200,
        height: 630,
        alt: 'Daunnet Films Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daunnet Films - Professional Film Production & Courses',
    description: 'Professional film production services and comprehensive filmmaking courses.',
    images: ['/daunnet-logo.png'],
    creator: '@daunnetfilms',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/daunnet-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/daunnet-logo.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/daunnet-logo.png', sizes: '180x180' },
      { url: '/daunnet-logo.png', sizes: '152x152' },
      { url: '/daunnet-logo.png', sizes: '144x144' },
      { url: '/daunnet-logo.png', sizes: '120x120' },
      { url: '/daunnet-logo.png', sizes: '114x114' },
      { url: '/daunnet-logo.png', sizes: '76x76' },
      { url: '/daunnet-logo.png', sizes: '72x72' },
      { url: '/daunnet-logo.png', sizes: '60x60' },
      { url: '/daunnet-logo.png', sizes: '57x57' }
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/daunnet-logo.png',
      },
      {
        rel: 'mask-icon',
        url: '/daunnet-logo.png',
        color: '#EECC27'
      }
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="id">
        <head>
          <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://daunnetfilms.id'} />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          <meta name="theme-color" content="#EECC27" />
          <meta name="msapplication-TileColor" content="#1F0528" />
          <meta name="msapplication-TileImage" content="/daunnet-logo.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Daunnet Films" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* Favicon with cache busting */}
          <link rel="icon" type="image/x-icon" href={`/favicon.ico?v=${Date.now()}`} />
          <link rel="icon" type="image/png" sizes="32x32" href="/daunnet-logo.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/daunnet-logo.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/daunnet-logo.png" />
          <link rel="mask-icon" href="/daunnet-logo.png" color="#EECC27" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased bg-[#1F0528]`}
        >
          <StructuredData
            type="Organization"
            data={{
              name: "Daunnet Films",
              url: process.env.NEXT_PUBLIC_BASE_URL || 'https://daunnetfilms.id',
              logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://daunnetfilms.id'}/daunnet-logo.png`,
              description: "Professional film production services and comprehensive filmmaking courses",
              sameAs: [
                "https://www.instagram.com/daunnetfilms",
                "https://www.youtube.com/@daunnetfilms",
                "https://www.tiktok.com/@daunnetfilms"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+62-xxx-xxxx-xxxx",
                contactType: "customer service",
                availableLanguage: ["Indonesian", "English"]
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "ID",
                addressLocality: "Indonesia"
              }
            }}
          />
          <StructuredData
            type="WebSite"
            data={{
              name: "Daunnet Films",
              url: process.env.NEXT_PUBLIC_BASE_URL || 'https://daunnetfilms.id',
              potentialAction: {
                "@type": "SearchAction",
                target: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://daunnetfilms.id'}/course?search={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            }}
          />
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
