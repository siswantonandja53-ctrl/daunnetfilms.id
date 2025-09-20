import Image, { StaticImageData } from "next/image";

interface InitiatorCardProps {
  name: string;
  role: string;
  image: StaticImageData;
  description?: string;
}

export default function InitiatorCard({ name, role, image, description }: InitiatorCardProps) {
  return (
    <div className="flex flex-col items-center group">
      <div className="size-[20rem] rounded-2xl border-4 border-[#EE6028] overflow-hidden mb-4 relative transition-shadow duration-500 group-hover:shadow-[0_0_32px_8px_rgba(245,124,0,0.4)]">
        <Image src={image} alt={name} fill style={{ objectFit: 'cover' }} className="object-top" />
        {/* Glass overlay and description only shown on hover */}
        <div className="absolute left-0 bottom-0 w-full h-full flex flex-col justify-end pointer-events-none">
          <div className="relative w-full h-full">
            {/* Glass overlay */}
            <div className="absolute left-0 bottom-0 w-full h-0 group-hover:h-full transition-all duration-500 ease-in-out bg-gradient-to-t from-stone-700/0 via-stone-700/40 to-transparent backdrop-blur-md rounded-2xl z-10" />
            {/* Description only on hover */}
            {description && (
              <div className="absolute left-0 bottom-0 w-full flex items-end justify-center h-0 group-hover:h-full transition-all duration-500 ease-in-out z-20">
                <div className="w-full px-4 pb-6 text-start text-white leading-4 drop-shadow-lg pointer-events-auto flex items-center text-xs justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-lg font-black bg-gradient-to-r from-[#D44C02] to-[#E67A11] bg-clip-text text-transparent mb-1">{name}</div>
      <div className="text-white text-base font-light">{role}</div>
    </div>
  );
}
