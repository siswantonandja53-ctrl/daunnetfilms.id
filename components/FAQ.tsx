"use client"

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export default function FAQ({ 
  title = "FAQ Pertanyaan Umum", 
  subtitle = "Yang Sering Ditanyakan",
  items 
}: FAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="relative w-full flex flex-col items-center py-24">
      {/* Animated Header */}
            {/* Enhanced Animated Header */}
      <div className="mb-20 animate-fade-in">
        <div className="flex flex-col items-center justify-center mb-6">
          {/* Main Title */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-4">
            <span className="text-4xl md:text-5xl lg:text-[48px] font-black bg-gradient-to-r from-[#D44C02] via-[#E67A11] to-[#F57C00] bg-clip-text text-transparent animate-pulse">
              FAQ
            </span>
            <span className="text-4xl md:text-5xl lg:text-[48px] font-black text-white">
              {title.replace('FAQ ', '')}
            </span>
          </div>
          
          {/* Subtitle */}
          <div className="text-2xl md:text-3xl lg:text-[36px] font-bold text-white text-center leading-tight">
            {subtitle}
          </div>
          
          {/* Decorative Line */}
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-[#D44C02] to-[#E67A11] rounded-full animate-pulse"></div>
        </div>
        
        {/* Optional Description */}
        <div className="text-white/80 text-lg font-light text-center mx-auto leading-relaxed">
          Temukan jawaban untuk pertanyaan yang paling sering ditanyakan seputar program kami
        </div>
      </div>
      
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
        {items.map((item, index) => {
          const isOpen = openItems.includes(index);
          
          return (
            <div 
              key={index} 
              className="relative bg-gradient-to-br from-[#4A0D39E6] via-[#4A0D39CC] to-[#1F0528E6] rounded-2xl border-2 border-[#EE6028] shadow-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(238,96,40,0.4)] hover:scale-[1.02] transform transition-all duration-500 ease-out animate-fade-in group"
              style={{ 
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full cursor-pointer px-8 py-6 text-xl font-bold text-white flex items-center justify-between hover:bg-gradient-to-r hover:from-[#EE6028]/10 hover:to-transparent transition-all duration-300 group/summary"
              >
                <span className="flex-1 pr-4 group-hover/summary:text-[#EE6028] transition-colors duration-300 text-left">
                  {item.question}
                </span>
                <div className="relative w-10 h-10 flex items-center justify-center">
                  {/* Plus/Minus Icon Container */}
                  <div className="relative w-6 h-6 flex items-center justify-center transform transition-transform duration-300 group-hover/summary:scale-110">
                    {/* Horizontal line (always visible) */}
                    <div className="absolute w-4 h-0.5 bg-[#EE6028] transition-colors duration-300 group-hover/summary:bg-white"></div>
                    {/* Vertical line (rotates when open) */}
                    <div className={`absolute w-0.5 h-4 bg-[#EE6028] transition-all duration-500 ease-in-out group-hover/summary:bg-white ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}></div>
                  </div>
                  {/* Background circle animation */}
                  <div className="absolute inset-0 rounded-full bg-[#EE6028]/10 scale-0 group-hover/summary:scale-100 transition-all duration-300 ease-out"></div>
                  {/* Ripple effect */}
                  <div className={`absolute inset-0 rounded-full bg-[#EE6028]/20 transition-all duration-500 ease-out ${isOpen ? 'scale-150 opacity-0' : 'scale-0 opacity-100'}`}></div>
                </div>
              </button>
              
              {/* Animated Content */}
              <div className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-6 text-white text-base font-light leading-relaxed border-t border-[#EE6028]/30 bg-gradient-to-r from-[#1F0528]/50 to-transparent">
                  <div className={`pt-4 transform transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
                    {item.answer}
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#EE6028]/20 to-transparent rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}