import { Instagram, Youtube } from 'react-bootstrap-icons';
import Logo from "@/public/logo.png";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-[#1F0528] to-black pt-16 pb-8 px-4 flex flex-col items-center border-t border-[#EE6028]/30">
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-2">
            {/* Logo */}
            <div className="w-32 h-auto">
              <Image src={Logo} alt="Daunnet Cinema School Logo" className="w-full h-full object-cover" quality={100} />
            </div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          <a href="#" className="text-white text-base font-medium hover:text-[#EE6028] transition-colors">Home</a>
          <a href="#" className="text-white text-base font-medium hover:text-[#EE6028] transition-colors">Kurikulum</a>
          <a href="#" className="text-white text-base font-medium hover:text-[#EE6028] transition-colors">Value</a>
          <a href="#" className="text-white text-base font-medium hover:text-[#EE6028] transition-colors">Testimoni</a>
          <a href="#" className="text-white text-base font-medium hover:text-[#EE6028] transition-colors">Harga</a>
          <a href="#" className="text-white text-base font-medium hover:text-[#EE6028] transition-colors">FAQ</a>
        </nav>
      </div>
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#EE6028]/20 pt-6">
        <div className="text-white text-xs opacity-60">&copy; {new Date().getFullYear()} Daunnet Cinema School. All rights reserved.</div>
        <div className="flex gap-4">
          {/* Socials - replace # with actual links */}
          <a href="#" className="text-[#EE6028] hover:text-white transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-[#EE6028] hover:text-white transition-colors" aria-label="YouTube">
            <Youtube size={20} />
          </a>
        
        </div>
      </div>
    </footer>
  );
}