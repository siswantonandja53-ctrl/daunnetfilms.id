import InitiatorCard from "@/components/InitiatorCard";
import Anjas from "@/public/anjas.png";
import Ade from "@/public/ade.jpeg";
import Ciwank from "@/public/ciwan.png";
import FadeInUp from "@/components/FadeInUp";
import MembersCardOverlay from "@/components/MembersCardOverlay";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#1F0528] overflow-x-hidden font-sans px-4 ">

      {/* Enhanced Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Background Elements - Positioned relative to section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-[#D44C02]/20 to-[#E67A11]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-[#F57C00]/15 to-[#EE6028]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#D44C02]/5 via-[#E67A11]/5 to-[#F57C00]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-32 pb-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Badge */}
            <FadeInUp delay={0.1}>
              <div className="mb-8 inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#D44C02]/20 via-[#E67A11]/20 to-[#F57C00]/20 border border-[#EE6028]/30 backdrop-blur-sm">
                <span className="text-sm font-semibold text-white/90 mr-2">🎬</span>
                <span className="text-sm font-semibold bg-gradient-to-r from-[#D44C02] to-[#F57C00] bg-clip-text text-transparent">
                  Cinema Education Platform
                </span>
              </div>
            </FadeInUp>

            {/* Enhanced Gradient Heading */}
            <FadeInUp delay={0.2}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-center leading-tight tracking-tight bg-gradient-to-r from-[#D44C02] via-[#E67A11] to-[#F57C00] bg-clip-text text-transparent mb-6">
                <span className="block">DAUNNET</span>
                <span className="block bg-gradient-to-r from-[#F57C00] via-[#E67A11] to-[#D44C02] bg-clip-text text-transparent">
                  CINEMA SCHOOL
                </span>
              </h1>
            </FadeInUp>

            {/* Enhanced Subheading */}
            <FadeInUp delay={0.3}>
              <h2 className="text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-center max-w-5xl leading-snug mb-6">
                <span className="block mb-2">Mulai Perjalananmu Sebagai</span>
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Freelance</span>
                <span className="text-white/90"> dan Bawa Skill-mu ke </span>
                <span className="bg-gradient-to-r from-[#D44C02] to-[#F57C00] bg-clip-text text-transparent">Production House!</span>
              </h2>
            </FadeInUp>

            {/* Enhanced Description */}
            <FadeInUp delay={0.4}>
              <p className="text-white/80 text-lg lg:text-xl font-light text-center max-w-3xl mb-10 leading-relaxed tracking-wide">
                Kami bantu kamu naik level, nggak cuma jago editing, tapi juga paham alur kerja production house. 
                <span className="text-white font-medium"> Biar skill-mu nggak mentok di freelance</span>, 
                tapi siap terjun ke industri bareng tim profesional.
              </p>
            </FadeInUp>

            {/* Enhanced CTA Button */}
            <FadeInUp delay={0.5}>
              <div className="mb-16">
                <a
                  href="#"
                  className="group relative inline-flex items-center justify-center px-12 py-5 rounded-2xl bg-gradient-to-r from-[#D44C02] via-[#E67A11] to-[#F57C00] text-white font-bold text-xl shadow-2xl hover:scale-110 transition-all duration-500 ease-out hover:shadow-[0_0_40px_rgba(245,124,0,0.6)] overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#F57C00] via-[#E67A11] to-[#D44C02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2">🚀</span>
                    Cari Tahu Caranya
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </a>
              </div>
            </FadeInUp>
          </div>
        </div>

          {/* Enhanced Video Section */}
          <FadeInUp className="relative z-10 w-full flex flex-col items-center justify-center gap-8" delay={0.25}>
            <div className="group relative rounded-3xl border-4 border-[#EE6028] shadow-[0_0_40px_rgba(228,96,40,0.4)] bg-black/60 overflow-hidden max-w-6xl w-full hover:shadow-[0_0_60px_rgba(228,96,40,0.6)] transition-all duration-500">
              {/* Video Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D44C02]/10 via-[#E67A11]/10 to-[#F57C00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="aspect-video w-full relative">
                <iframe
                  src="https://www.youtube.com/embed/qFeAvmI4buU"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full rounded-2xl relative z-10"
                ></iframe>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-20 pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Members Card */}
            <FadeInUp className="flex justify-center w-full" delay={0.35}>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <MembersCardOverlay count="3000+" label="Members" />
              </div>
            </FadeInUp>

           
          </FadeInUp>
      </section>

      {/* Scroll Indicator */}
      <FadeInUp delay={0.1}>
        <div className="relative mb-32 mt-32 bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm font-medium mb-2">Scroll untuk lanjut</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </FadeInUp>

      {/* Initiator Section */}
      <section className="relative w-full  flex flex-col items-center py-12">
        <FadeInUp>
          <div className="flex flex-col items-center mb-12">
            <div className="flex flex-row items-center gap-2 mb-2 py-4">
              <span className="text-[39.4px] font-bold bg-gradient-to-t from-[#a9440e] to-[#f2810f] bg-clip-text text-transparent">Initiator</span>
              <span className="text-[39.4px] font-bold text-white">By</span>
            </div>
          </div>
        </FadeInUp>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center">
          <FadeInUp delay={0.1}>
            <InitiatorCard
              name="Anjas Maradita"
              role="Founder DaunNet Media"
              image={Anjas}
              description="Anjas Maradita adalah CEO PekerjaAi, mantan Director, dan Founder DauNet Media & Films. Ia dikenal sebagai kreator digital yang aktif mengeksplorasi dunia teknologi dan AI dalam karya-karyanya."
            />
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <InitiatorCard
              name="Ade Yason"
              role="Produser DaunNet Media"
              image={Ade}
              description="Ade Yason adalah Producer di DaunNet Media & Films dengan pengalaman luas di industri kreatif. Ia pernah menjadi Assistant Director untuk Rewind Indonesia 2020 dan film BUCIN, serta terlibat sebagai producer untuk MV Tiara Andini dan Marion Jola. Ia juga menjadi bagian dari tim produksi dan asstrada dalam DocuSeries Kisah Rasa."
            />
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <InitiatorCard
              name="Ciwank Cyril"
              role="CEO DaunNet Media"
              image={Ciwank}
              description="Ciwank Cyril adalah CEO DaunNet Media & Films, sekaligus Director dan Video Editor berpengalaman. Aktif sebagai digital creator, ia dikenal lewat karya-karya visual yang kuat secara emosional dan storytelling yang khas."
            />
          </FadeInUp>
        </div>
        {/* Quote */}
        <FadeInUp delay={0.4}>
          <div className="max-w-3xl mx-auto mt-8">
            <blockquote className="italic text-white text-2xl md:text-3xl font-medium text-center leading-snug">
              &quot;Nggak harus jago di semua bidang, tapi wajib tahu cara kerjanya, itu kunci naik level ke industri!&quot;
            </blockquote>
          </div>
        </FadeInUp>
      </section>

      {/* Behind The Scene Section */}
      <section className="relative w-full  flex flex-col items-center py-24">
        <FadeInUp>
          <div className="flex flex-row items-center justify-center gap-2 mb-10">
            <span className="text-[39.4px] font-bold bg-gradient-to-b from-[#D44C02] to-[#E67A11] bg-clip-text text-transparent">Behind</span>
            <span className="text-[39.4px] font-bold text-white">The Scene</span>
          </div>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div className="relative w-full max-w-5xl flex justify-center">
            <div className="relative w-full max-w-3xl h-[421px] bg-opacity-10 border-2 border-[#EE6028] rounded-[10px] shadow-[0_5px_15px_rgba(230,122,17,0.8)] flex items-center justify-center overflow-hidden">
            <video 
              src="/gif-home.mp4" 
              autoPlay 
              loop 
              muted 
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover' }}
            >
              Your browser does not support the video tag.
            </video>
            </div>
          </div>
        </FadeInUp>
      </section>

      {/* Kurikulum Section */}
      <section className="relative w-full  flex flex-col items-center py-24">
        <FadeInUp>
          <div className="mb-10">
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="text-[39.4px] font-bold bg-gradient-to-b from-[#D44C02] to-[#E67A11] bg-clip-text text-transparent">Kurikulum</span>
            </div>
            <div className="text-[39.4px] font-bold text-white text-center mt-2">Daunnet Cinema School</div>
          </div>
        </FadeInUp>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {/* Card 1 */}
          <FadeInUp delay={0.1}>
            <div className="relative flex flex-col md:flex-row bg-gradient-to-b from-[#4A0D39E6] to-[#1F0528E6] rounded-[10px] border border-white/40 shadow-lg overflow-hidden">
            <div className="w-full md:w-1/3 h-[200px] md:h-auto bg-gray-200 flex items-center justify-center rounded-l-[10px]">
              {/* Replace with actual image */}
              <span className="text-gray-500">Image</span>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="text-lg font-medium text-white mb-1">Chapter 01</div>
                <div className="text-2xl font-bold text-white mb-2">The Director</div>
                <div className="inline-block px-4 py-1 rounded bg-gradient-to-b from-[#D44C02] to-[#E67A11] text-white text-sm font-semibold mb-2">11 Video Pembelajaran</div>
                <div className="text-white text-base font-light mt-2">Adi Victory</div>
              </div>
            </div>
            </div>
          </FadeInUp>
          {/* Card 2 */}
          <FadeInUp delay={0.2}>
            <div className="relative flex flex-col md:flex-row bg-gradient-to-b from-[#4A0D39E6] to-[#1F0528E6] rounded-[10px] border border-white/40 shadow-lg overflow-hidden">
            <div className="w-full md:w-1/3 h-[200px] md:h-auto bg-gray-200 flex items-center justify-center rounded-l-[10px]">
              {/* Replace with actual image */}
              <span className="text-gray-500">Image</span>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="text-lg font-medium text-white mb-1">Capcut 01</div>
                <div className="text-2xl font-bold text-white mb-2">A-Z Capcut</div>
                <div className="inline-block px-4 py-1 rounded bg-gradient-to-b from-[#D44C02] to-[#E67A11] text-white text-sm font-semibold mb-2">8 Video Pembelajaran</div>
                <div className="text-white text-base font-light mt-2">Mentor Capcut</div>
              </div>
            </div>
            </div>
          </FadeInUp>
        </div>
      </section>
      {/* Value Section */}
      <section className="relative w-full flex flex-col items-center py-24">
        <FadeInUp>
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-4">
              <span className="text-2xl md:text-3xl lg:text-[32px] font-bold text-white text-center">Selain puluhan materi daging, kamu juga dapat semua</span>
              <span className="text-2xl md:text-3xl lg:text-[32px] font-bold bg-gradient-to-b from-[#D44C02] to-[#E67A11] bg-clip-text text-transparent">Value</span>
            </div>
            <div className="text-2xl md:text-3xl lg:text-[32px] font-bold text-white text-center">ini ketika kamu bergabung di program ini...</div>
          </div>
        </FadeInUp>
        
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Value Card 1 */}
          <FadeInUp delay={0.1}>
            <div className="group relative flex flex-col bg-gradient-to-br from-[#FF84004D] via-[#FF840033] to-[#1F052866] rounded-2xl border-2 border-[#FF8400B3] shadow-2xl overflow-hidden p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,132,0,0.3)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF840066] to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D44C02] to-[#E67A11] flex items-center justify-center text-white font-black text-xl">1</div>
                <div className="text-2xl font-bold text-white">Akses Course Selamanya</div>
              </div>
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#D44C02] to-[#E67A11] text-white text-lg font-semibold mb-4 shadow-lg">
                <span className="mr-2">💎</span>
                Value : Rp1.800.000,-/bulan
              </div>
              <div className="text-white text-base font-light leading-relaxed">Gabung di DaunNet Cinema School untuk akses materi selamanya, kapanpun & dimanapun. Belajar tanpa batas waktu dengan update konten terbaru.</div>
            </div>
            </div>
          </FadeInUp>

          {/* Value Card 2 */}
          <FadeInUp delay={0.2}>
            <div className="group relative flex flex-col bg-gradient-to-br from-[#4A0D39E6] via-[#4A0D39CC] to-[#1F0528E6] rounded-2xl border-2 border-[#FF8400B3] shadow-2xl overflow-hidden p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,132,0,0.3)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF840066] to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D44C02] to-[#E67A11] flex items-center justify-center text-white font-black text-xl">2</div>
                <div className="text-2xl font-bold text-white">Update Materi Mendatang</div>
              </div>
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#D44C02] to-[#E67A11] text-white text-lg font-semibold mb-4 shadow-lg">
                <span className="mr-2">🚀</span>
                Value : Rp5.000.000
              </div>
              <div className="text-white text-base font-light leading-relaxed">Seluruh tambahan materi baru bisa diakses tanpa ada tambahan biaya apapun. Tetap update dengan tren industri terkini.</div>
            </div>
            </div>
          </FadeInUp>
        </div>

        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Value Card 3 */}
          <FadeInUp delay={0.1}>
            <div className="group relative flex flex-col bg-gradient-to-br from-[#FF84004D] via-[#FF840033] to-[#1F052866] rounded-2xl border-2 border-[#FF8400B3] shadow-2xl overflow-hidden p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,132,0,0.3)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF840066] to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D44C02] to-[#E67A11] flex items-center justify-center text-white font-black text-xl">3</div>
                <div className="text-2xl font-bold text-white">Komunitas Ekslusif</div>
              </div>
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#D44C02] to-[#E67A11] text-white text-lg font-semibold mb-4 shadow-lg">
                <span className="mr-2">👥</span>
                Value : Rp5.000.000
              </div>
              <div className="text-white text-base font-light leading-relaxed">Berkomunitas dengan teman-teman freelance lainnya. Privilege khusus untuk memahami cara kerja di level industri profesional.</div>
            </div>
            </div>
          </FadeInUp>

          {/* Value Card 4 */}
          <FadeInUp delay={0.2}>
            <div className="group relative flex flex-col bg-gradient-to-br from-[#4A0D39E6] via-[#4A0D39CC] to-[#1F0528E6] rounded-2xl border-2 border-[#FF8400B3] shadow-2xl overflow-hidden p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,132,0,0.3)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF840066] to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D44C02] to-[#E67A11] flex items-center justify-center text-white font-black text-xl">4</div>
                <div className="text-2xl font-bold text-white">Project Breakdown DaunNet</div>
              </div>
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#D44C02] to-[#E67A11] text-white text-lg font-semibold mb-4 shadow-lg">
                <span className="mr-2">📊</span>
                Value : Rp1.200.000
              </div>
              <div className="text-white text-base font-light leading-relaxed">Program bulanan dimana mentor & guest mentor sharing breakdown project iklan yang dikerjakan di DaunNet. Belajar dari kasus nyata industri.</div>
            </div>
            </div>
          </FadeInUp>
        </div>

        {/* Total Value Summary */}
        <FadeInUp delay={0.3}>
          <div className="mt-16 w-full max-w-4xl">
            <div className="bg-gradient-to-r from-[#D44C02] to-[#E67A11] rounded-3xl p-8 text-center shadow-2xl border-4 border-[#FF8400B3]">
              <div className="text-white text-2xl md:text-3xl font-black mb-2">Total Value yang Kamu Dapatkan</div>
              <div className="text-white text-4xl md:text-5xl font-black mb-4">Rp 13.000.000</div>
              <div className="text-white text-lg font-medium opacity-90">Semua benefit ini bisa kamu dapatkan dengan investasi yang jauh lebih terjangkau!</div>
            </div>
          </div>
        </FadeInUp>
      </section>
      {/* Testimonial Section */}
      <section className="relative w-full  flex flex-col items-center py-24">
        <FadeInUp>
          <div className="mb-10">
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="text-[39.4px] font-bold bg-gradient-to-b from-[#D44C02] to-[#E67A11] bg-clip-text text-transparent">Kata Mereka Soal</span>
            </div>
            <div className="text-[39.4px] font-bold text-white text-center mt-2">Daunnet Cinema School</div>
          </div>
        </FadeInUp>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Testimonial Card 1 */}
          <FadeInUp delay={0.1}>
            <div className="relative flex flex-col bg-gradient-to-b from-[#290337] to-[#1F0528] rounded-[10px] border border-white/30 shadow-lg overflow-hidden p-8">
            <div className="text-white text-lg font-bold mb-4">“Daunnet Cinema School mengubah cara pandang saya terhadap film. Pengalaman belajar di sini sangat berharga.”</div>
            <div className="text-[#EE6028] text-base font-semibold">Ahmad Rizky</div>
            <div className="text-white text-sm font-light opacity-80">Sinematografer</div>
            </div>
          </FadeInUp>
          {/* Testimonial Card 2 */}
          <FadeInUp delay={0.2}>
            <div className="relative flex flex-col bg-gradient-to-b from-[#290337] to-[#1F0528] rounded-[10px] border border-white/30 shadow-lg overflow-hidden p-8">
            <div className="text-white text-lg font-bold mb-4">“Fasilitas lengkap dan lingkungan belajar yang inspiratif. Daunnet adalah tempat terbaik untuk berkembang.”</div>
            <div className="text-[#EE6028] text-base font-semibold">Maya Putri</div>
            <div className="text-white text-sm font-light opacity-80">Penulis Skenario</div>
            </div>
          </FadeInUp>
        </div>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {/* Testimonial Card 3 */}
          <FadeInUp delay={0.1}>
            <div className="relative flex flex-col bg-gradient-to-b from-[#290337] to-[#1F0528] rounded-[10px] border border-white/30 shadow-lg overflow-hidden p-8">
            <div className="text-white text-lg font-bold mb-4">“Mentor yang berpengalaman dan kurikulum yang lengkap membuat belajar di Daunnet sangat menyenangkan.”</div>
            <div className="text-[#EE6028] text-base font-semibold">Siti Nurhaliza</div>
            <div className="text-white text-sm font-light opacity-80">Sutradara</div>
            </div>
          </FadeInUp>
          {/* Testimonial Card 4 */}
          <FadeInUp delay={0.2}>
            <div className="relative flex flex-col bg-gradient-to-b from-[#290337] to-[#1F0528] rounded-[10px] border border-white/30 shadow-lg overflow-hidden p-8">
            <div className="text-white text-lg font-bold mb-4">“Saya jadi lebih percaya diri untuk terjun ke industri setelah belajar di Daunnet Cinema School.”</div>
            <div className="text-[#EE6028] text-base font-semibold">Raynaldo Wijaya</div>
            <div className="text-white text-sm font-light opacity-80">Editor</div>
            </div>
          </FadeInUp>
        </div>
      </section>
      {/* Pricing/Packages Section */}
      <section className="relative w-full  flex flex-col items-center py-24 px-2">
        <FadeInUp>
          <div className="mb-10">
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="text-[39.4px] font-bold bg-gradient-to-b from-[#D44C02] to-[#E67A11] bg-clip-text text-transparent">Gabung Sekarang</span>
              <span className="text-[39.4px] font-bold text-white">Belajar Bareng di</span>
            </div>
            <div className="text-[39.4px] font-bold text-white text-center mt-2">Daunnet Cinema School</div>
          </div>
        </FadeInUp>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Package Card 1 */}
          <FadeInUp delay={0.1}>
            <div className="relative flex flex-col bg-gradient-to-b from-[#2D0B00] to-[#1F0528] rounded-2xl border-2 border-[#EE6028] shadow-xl overflow-hidden p-8 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
            <div className="text-2xl font-black text-white mb-2 tracking-wide">A - Z</div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-black text-white">Rp 350.000,-</span>
              <span className="text-base font-light text-white">/ Selamanya</span>
            </div>
            <div className="text-lg font-medium text-white mb-4">Benefits :</div>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center gap-2 text-white"><span className="text-[#EE6028] font-bold">✓</span> benefit 1</li>
              <li className="flex items-center gap-2 text-white"><span className="text-[#EE6028] font-bold">✓</span> benefit 2</li>
            </ul>
            <a href="#" className="inline-block px-6 py-2 rounded-lg bg-gradient-to-b from-[#D44C02] to-[#E67A11] text-white font-semibold text-lg shadow-lg hover:brightness-110 transition">Gabung Sekarang</a>
            </div>
          </FadeInUp>
          {/* Package Card 2 */}
          <FadeInUp delay={0.2}>
            <div className="relative flex flex-col bg-gradient-to-b from-[#2D0B00] to-[#1F0528] rounded-2xl border-4 border-[#EE6028] shadow-2xl overflow-hidden p-8 scale-105 z-10">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-[#EE6028] to-[#D44C02] text-white text-xs font-bold px-4 py-1 rounded-bl-xl rounded-tr-xl shadow-md">Recommended</div>
            <div className="text-2xl font-black text-white mb-2 tracking-wide">ADVANCE</div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-black text-white">Rp 650.000,-</span>
              <span className="text-base font-light text-white">/ Selamanya</span>
            </div>
            <div className="text-lg font-medium text-white mb-4">Benefits :</div>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center gap-2 text-white"><span className="text-[#EE6028] font-bold">✓</span> Benefit 1</li>
              <li className="flex items-center gap-2 text-white"><span className="text-[#EE6028] font-bold">✓</span> Benefit 2</li>
              <li className="flex items-center gap-2 text-white"><span className="text-[#EE6028] font-bold">✓</span> Benefit 3</li>
              <li className="flex items-center gap-2 text-white"><span className="text-[#EE6028] font-bold">✓</span> Benefit 4</li>
              <li className="flex items-center gap-2 text-white"><span className="text-[#EE6028] font-bold">✓</span> Benefit 5</li>
              <li className="flex items-center gap-2 text-white"><span className="text-[#EE6028] font-bold">✓</span> Benefit 6</li>
              <li className="flex items-center gap-2 text-white"><span className="text-[#EE6028] font-bold">✓</span> Benefit 7</li>
              <li className="flex items-center gap-2 text-white"><span className="text-[#EE6028] font-bold">✓</span> Benefit 8</li>
            </ul>
            <a href="#" className="inline-block px-6 py-2 rounded-lg bg-gradient-to-b from-[#D44C02] to-[#E67A11] text-white font-semibold text-lg shadow-lg hover:brightness-110 transition">Gabung Sekarang</a>
            </div>
          </FadeInUp>
          {/* Package Card 3 */}
          <FadeInUp delay={0.3}>
            <div className="relative flex flex-col bg-gradient-to-b from-[#2D0B00] to-[#1F0528] rounded-2xl border-2 border-[#EE6028] shadow-xl overflow-hidden p-8 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
            <div className="text-2xl font-black text-white mb-2 tracking-wide">tes paket</div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-black text-white">Rp 1.000,-</span>
              <span className="text-base font-light text-white">/ Selamanya</span>
            </div>
            <div className="text-lg font-medium text-white mb-4">Benefits :</div>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center gap-2 text-white"><span className="text-[#EE6028] font-bold">✓</span> tes</li>
            </ul>
            <a href="#" className="inline-block px-6 py-2 rounded-lg bg-gradient-to-b from-[#D44C02] to-[#E67A11] text-white font-semibold text-lg shadow-lg hover:brightness-110 transition">Gabung Sekarang</a>
            </div>
          </FadeInUp>
        </div>
      </section>
      
      <FAQ 
        items={[
          {
            question: "Apakah akses materi berlaku selamanya?",
            answer: "Ya, setelah bergabung kamu akan mendapatkan akses materi selamanya tanpa biaya tambahan."
          },
          {
            question: "Apakah ada update materi di masa depan?",
            answer: "Tentu! Semua update materi akan otomatis bisa diakses tanpa biaya tambahan."
          },
          {
            question: "Apakah ada komunitas untuk diskusi?",
            answer: "Ya, kamu akan diundang ke grup komunitas eksklusif untuk diskusi dan networking."
          },
          {
            question: "Bagaimana cara bergabung?",
            answer: "Klik tombol \"Gabung Sekarang\" di atas dan ikuti instruksi pendaftaran."
          }
        ]}
      />

    </main>
  );
}
