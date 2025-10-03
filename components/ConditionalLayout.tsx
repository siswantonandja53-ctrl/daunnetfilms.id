"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // // Check if we're on a course slug page or lesson page
  // const isCourseSlugPage = pathname?.startsWith('/course/') && pathname !== '/course';
  // const isLessonPage = pathname?.includes('/lesson/');
  
  // if (isCourseSlugPage || isLessonPage) {
  //   return (
  //     <main className="relative min-h-screen bg-[#2E0B25] font-montserrat">
  //       {children}
  //     </main>
  //   );
  // }

  return (
    <>
      <Header />
      <main className="bg-[#1F0528] bg-gradient-to-br from-[#1F0528] via-[#2D0B00] to-[#D44C02] min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}