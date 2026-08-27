// src/pages/ScamVisualNews/components/NavbarHeader.jsx
export default function NavbarHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#62495F]/90 backdrop-blur-md border-b border-white/10 px-6 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-3">
        <span className="text-xs md:text-sm font-bold bg-[#FCE788] text-black px-2.5 py-1 rounded-md">
          NEWSLAB 視覺化專題
        </span>
        <h1 className="text-white text-sm md:text-base font-extrabold tracking-wide truncate">
          當數位生活成為詐騙破口
        </h1>
      </div>
      <div className="hidden md:block text-xs text-[#FCE788]/90 font-medium">
        新法打詐財損下降，年輕受害件數卻上升？
      </div>
    </header>
  );
}
