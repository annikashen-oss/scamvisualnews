// src/pages/ScamVisualNews/components/NavbarHeader.jsx
export default function NavbarHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#62495F]/95 backdrop-blur-md border-b border-white/10 px-6 py-2.5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-2">
      
      {/* 標題與標籤 */}
      <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold bg-[#FCE788] text-black px-2 py-0.5 rounded-md">
            NEWSLAB
          </span>
          <h1 className="text-white text-sm md:text-base font-extrabold tracking-wide">
            當數位生活成為詐騙破口
          </h1>
        </div>
        <div className="hidden lg:block text-xs text-[#FCE788]/90 font-medium border-l border-white/20 pl-3">
          新法打詐財損下降，年輕受害件數卻上升？
        </div>
      </div>

    </header>
  );
}
