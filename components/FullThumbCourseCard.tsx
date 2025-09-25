import Image from "next/image";
import React from "react";

interface FullThumbCourseCardProps {
  image: string;
  title: string;
}

const FullThumbCourseCard: React.FC<FullThumbCourseCardProps> = ({ image, title }) => {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-white/20 group hover:scale-[1.03] transition-transform duration-300">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover w-full h-full group-hover:brightness-110 transition duration-300"
        sizes="(min-width: 768px) 33vw, 100vw"
        priority={false}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
        <div className="text-white font-bold text-lg drop-shadow-lg truncate">{title}</div>
      </div>
    </div>
  );
};

export default FullThumbCourseCard;