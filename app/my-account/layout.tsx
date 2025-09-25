// File: /app/admin/page.tsx

import { Metadata } from 'next';
import { SidebarNav } from "./components/sidebar-nav"
// import Layout from '@/components/layout';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonMainContent: React.FC = () => {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
        </div>
    );
};

export const metadata: Metadata = {
    title: "My Account",
    description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
    {
        title: "Profile",
        href: "/my-account",
    },
    // {
    //     title: "Download",
    //     href: "/my-account/download",
    // },
    {
        title: "History",
        href: "/my-account/history",
    },
]

export default async function AdminPage({
    children,
}: {
    children: React.ReactNode
}) {
    // const { userId } = auth(); // Get the current user's ID
    // const ADMIN_USER_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID;

    // Check if the current user is not the admin
    // if (userId !== ADMIN_USER_ID) {
    //     // Redirect to home page or another page if not admin
    //     redirect('/');
    // }

    // Render admin page content for the admin user
    return (
        <div>
            <div className='flex flex-col gap-4 p-10 pb-16 w-full   text-white bg-stone-900'>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 container mx-auto px-4 max-w-screen-xl">
                    <aside className="-mx-6 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <main className='lg:w-4/5 -mx-6 lg:mx-0 '>
                        <Suspense fallback={<SkeletonMainContent />}>
                            {children}
                        </Suspense>
                      
                    </main>
                </div>
            </div>
        </div>
    );
}