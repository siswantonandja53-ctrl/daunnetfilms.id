"use client"

import React, { useState } from "react";
import FullThumbCourseCard from "@/components/FullThumbCourseCard";

// Figma-inspired categories (should match course data)
const categories = [
  "All",
  "Adobe After Effect",
  "Adobe Premier",
  "Basic Knowledge",
  "Business Videography",
  "Davinci Resolve",
  "Lighting",
  "Story Telling",
  "VFX",
  "Videography",
  "A-Z Capcut",
  "The Director",
  "After Effect Next Level",
  "The Producer",
  "Public Speaking",
  "Cinematography",
  "Freelance Video Editor",
  "Cara Menentukan Harga Freelance Video Editor",
  "Behind The Production",
  "Call Sheet"
];

// Dummy course data for filtering demo
const dummyCourses = [
  {
    title: "A-Z Capcut",
    image: "/courses/Capcut A-Z.png",
    label: "Adi Victory",
    pill: "8 Video Pembelajaran",
    category: "A-Z Capcut"
  },
  {
    title: "The Director",
    image: "/courses/Director.png",
    label: "Adi Victory",
    pill: "11 Video Pembelajaran",
    category: "The Director"
  },
  {
    title: "After Effect Next Level",
    image: "/courses/After Effect Next Level.png",
    label: "Adi Victory",
    pill: "15 Video Pembelajaran",
    category: "After Effect Next Level"
  },
  {
    title: "Cinematography",
    image: "/courses/Cinematography.png",
    label: "Ciwank Cyril",
    pill: "16 Video Pembelajaran",
    category: "Cinematography"
  },
  {
    title: "Public Speaking",
    image: "/courses/Public Speaking.png",
    label: "Guest Mentor",
    pill: "11 Video Pembelajaran",
    category: "Public Speaking"
  },
];

export default function CoursePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter logic: by category and search
  const filteredCourses = dummyCourses.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="relative min-h-screen bg-[#1F0528] px-4 py-12 font-sans">
      {/* Hero Heading */}
      <section className="w-full flex flex-col items-center mb-10">
        <h1
          className="text-center font-black my-20 text-3xl md:text-5xl lg:text-6xl tracking-tight bg-gradient-to-r from-[#D44C02] via-[#E67A11] to-[#F57C00] bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(228,96,40,0.25)]"
        >
          Temukan <span className="inline-block bg-gradient-to-r from-[#F57C00] via-[#E67A11] to-[#D44C02] bg-clip-text text-transparent">Pembelajaran Favoritmu!</span>
        </h1>
        <div className="w-full max-w-xl flex items-center relative mb-6">
          <input
            type="text"
            className="w-full h-12 md:h-[50px] rounded-full border-2 border-[#EE6028] bg-white text-[#7E7F7E] px-6 pr-16 text-lg focus:outline-none focus:ring-2 focus:ring-[#EE6028] placeholder-[#7E7F7E]"
            placeholder="Search for curriculum...."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[#EE6028] hover:bg-[#D44C02] transition">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        {/* Filter Chips */}
        <div className="w-full max-w-4xl flex flex-wrap gap-3 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full border-2 font-medium text-sm md:text-base transition-all duration-200 ${selectedCategory === cat ? "bg-[#EE6028] text-white border-[#EE6028] shadow-lg" : "bg-white text-[#EE6028] border-[#EE6028] hover:bg-[#EE6028]/10"}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
      {/* Course Cards Grid (full thumbnail style) */}
      <section className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center text-white/70 py-16 text-xl">Tidak ada course ditemukan.</div>
        ) : (
          filteredCourses.map((course, idx) => (
            <FullThumbCourseCard key={course.title + idx} image={course.image} title={course.title} />
          ))
        )}
      </section>
    </main>
  );
}

