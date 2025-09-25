'use client'

import Image from "next/image"

interface VideoPortfolioItemProps {
  videoId: string
}

export default function VideoPortfolioItem({ videoId }: VideoPortfolioItemProps) {
  const handlePlayClick = () => {
    window.open(`https://www.youtube.com/embed/${videoId}`, '_blank')
  }

  return (
    <div className="group relative aspect-video bg-gradient-to-b from-[#290337] to-[#1F0528] rounded-2xl border-2 border-[#EE6028]/50 shadow-xl overflow-hidden hover:scale-105 hover:shadow-[0_0_30px_rgba(238,96,40,0.4)] transition-all duration-300">
      <Image 
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
        alt="Video thumbnail" 
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
      <button 
        className="absolute inset-0 flex items-center justify-center"
        onClick={handlePlayClick}
        aria-label="Play video"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-[#D44C02] to-[#E67A11] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 5v10l8-5-8-5z" />
          </svg>
        </div>
      </button>
    </div>
  )
}