// Reusable Members Card Overlay component
export default function MembersCardOverlay({ count, label }: { count: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center w-64 h-24 z-20 rounded-[10px] shadow-lg"
      style={{
        background:
          'linear-gradient(270deg, rgba(255,132,0,0.3) 0%, rgba(74,13,57,0.3) 100%)',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
      }}
    >
      <div
        className="flex flex-col items-center justify-center w-28 h-10 text-3xl font-bold leading-9 bg-gradient-to-r from-[#F57C00] to-[#EE6028] bg-clip-text text-transparent mt-1"
        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {count}
      </div>
      <div className="w-28 h-1 bg-gradient-to-r from-[#F57C00] to-[#EE6028] rounded mt-1 mb-1" />
      <div
        className="flex items-center justify-center w-20 h-9 text-base font-thin leading-9 text-white"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </div>
    </div>
  );
}
