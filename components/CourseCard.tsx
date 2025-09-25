import React from 'react';
import Image from 'next/image';

interface CourseCardProps {
    title: string; // main heading (e.g., The Director)
    image: string; // public path like "/courses/Director.png"
    // Optional slots to match the Figma reference without forcing usage
    label?: string; // e.g., "Chapter 01"
    subtitle?: string; // secondary heading if needed
    pill?: string; // e.g., "11 Video Pembelajaran"
    footer?: string; // e.g., mentor name
}

// Rectangular course card styled after the Figma reference
// - Outer: subtle transparent bg, light border, bright shadow, rounded
// - Underlay: multi-stop gradient overlay at ~95% opacity
// - Left: framed image box with inner rounded image
// - Right: textual content (title, optional label/subtitle/pill/footer)
const CourseCard: React.FC<CourseCardProps> = ({ title, image, label, subtitle, pill, footer }) => {
    const safeSrc = encodeURI(image); // handle spaces in filenames
    return (
        <div
            className="relative rounded-[10px] border border-white/40 overflow-hidden transition-shadow duration-300 hover:shadow-[0_5px_5px_rgba(255,255,255,0.3)]"
        >
            {/* Gradient underlay (approximate the Figma multi-stop gradient) */}
            <div
                className="absolute inset-0 rounded-[10px] opacity-95"
                style={{
                    background:
                        'linear-gradient(0deg, rgba(74,13,57,0.9) 0%, rgba(74,13,57,0.5) 30%, rgba(74,13,57,0.1) 50%, rgba(31,5,40,0.1) 70%, rgba(31,5,40,0.1) 100%)',
                }}
            />

            {/* Content layer */}
            <div className="relative z-10 flex flex-col md:flex-row items-stretch w-full">
                {/* Image frame area (padding ~21px in Figma) */}
                <div className="w-full md:w-5/12 p-4 md:p-[21px]">
                    <div className="relative bg-[#F0F0F0] border border-white/40 rounded-[10px] aspect-video">
                        {/* Inner image with 1px inset and rounded 8px */}
                        <div className="absolute inset-[1px] rounded-[8px] overflow-hidden">
                            <Image
                                src={safeSrc}
                                alt={title}
                                fill
                                sizes="(min-width: 768px) 33vw, 100vw"
                                className="object-cover"
                                priority={false}
                            />
                        </div>
                    </div>
                </div>

                {/* Text content area (padding ~21px right as in Figma) */}
                <div className="flex-1 px-4 pb-6 pt-2 md:p-[21px] md:pl-6 flex items-start">
                    <div className="w-full relative">
                        {label && (
                            <div className="text-white text-[19px] leading-[34px] font-medium mb-2">
                                {label}
                            </div>
                        )}
                        <div className="text-white font-bold mb-3 break-words" style={{ fontSize: '32.8px', lineHeight: '38px' }}>
                            {title}
                        </div>
                        {subtitle && (
                            <div className="text-white text-lg font-medium mb-3">{subtitle}</div>
                        )}
                        {pill && (
                            <div className="inline-flex items-center rounded-[5px] mb-3" style={{ background: 'linear-gradient(0deg, #D44C02 30%, #E67A11 100%)' }}>
                                <span className="px-4 py-2 text-white tracking-[0.015em]" style={{ fontSize: '19.95px', lineHeight: '36px' }}>
                                    {pill}
                                </span>
                            </div>
                        )}
                        {footer && (
                            <div className="text-white text-[19px] leading-[34px] font-normal mt-2">
                                {footer}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;