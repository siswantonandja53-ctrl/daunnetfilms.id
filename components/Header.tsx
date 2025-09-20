"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/public/logo.png"
export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 left-0 z-50 backdrop-blur-xl bg-[#1F0528]/20 border-b border-[#EE6028]/20 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4  flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="#" className="block">
            <Image src={Logo} alt="Homepage"  className="h-12 w-auto drop-shadow-lg p-2" />
          </Link>
        </div>
        {/* Navigation */}
        <ul className="flex items-center gap-8">
          <li>
            <Link href="/curriculum.html" rel="noopener noreferrer" className="text-white font-semibold text-base px-3 py-2 rounded-lg hover:bg-[#EE6028]/20 hover:text-[#EE6028] transition-colors">
              <span>Courses</span>
            </Link>
          </li>
          {/* User Dropdown */}
          <li className="relative">
            <button
              className="flex items-center focus:outline-none rounded-full hover:ring-2 hover:ring-[#EE6028]/60 transition"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <Image src="https://placehold.co/32x32?text=U" alt="User" width={32} height={32} className="rounded-full border border-[#EE6028]/40 shadow bg-gray-200" unoptimized />
            </button>
            {/* Dropdown */}
            {dropdownOpen && (
              <ul className="absolute right-0 mt-3 w-44 bg-white/90 backdrop-blur-md rounded-xl shadow-xl py-2 z-50 text-black border border-[#EE6028]/10 animate-fade-in">
                <li>
                  <Link href="#" className="block px-4 py-2 rounded hover:bg-[#EE6028]/10 transition">Profile</Link>
                </li>
                <li>
                  <Link href="#" className="block px-4 py-2 rounded hover:bg-[#EE6028]/10 transition">Settings</Link>
                </li>
                <li>
                  <Link href="/" className="block px-4 py-2 rounded hover:bg-[#EE6028]/10 transition">Log Out</Link>
                </li>
              </ul>
            )}
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
