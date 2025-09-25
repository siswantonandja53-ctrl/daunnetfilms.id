"use client";
import Image from "next/image";
import Link from "next/link";
import AuthButtons from "@/components/AuthButtons";
import Logo from "@/public/logo.png"
import { UserButton } from "./UserButton";
export default function Header() {

  return (
    <header className="w-full sticky top-0 left-0 z-50 backdrop-blur-xl bg-[#1F0528]/20 border-b border-[#EE6028]/20 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4  flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="block">
            <Image src={Logo} alt="Homepage"  className="h-12 w-auto drop-shadow-lg p-2" />
          </Link>
        </div>
        {/* Navigation */}
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/course" rel="noopener noreferrer" className="text-white font-semibold text-base px-3 py-2 rounded-lg hover:bg-[#EE6028]/20 hover:text-[#EE6028] transition-colors">
              <span>Courses</span>
            </Link>
          </li>
          {/* User Dropdown */}
          <li className="relative">
            <UserButton />
          </li>
        </ul>
      </div>
      <style jsx global>{`
        @keyframes animate-fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: animate-fade-in 0.18s ease;
        }
      `}</style>
    </header>
  );
}
