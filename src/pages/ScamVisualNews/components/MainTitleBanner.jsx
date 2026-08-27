// src/pages/ScamVisualNews/components/MainTitleBanner.jsx
export default function MainTitleBanner() {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* 帶有斜角度切入與彈跳特效的容器 */}
      <div className="animate-slide-bounce flex flex-col items-center justify-center">
        
        {/* 帶有故障特效的大主標題 */}
        <h1 
          className="glitch-text text-4xl md:text-6xl font-black tracking-widest text-white mb-4"
          data-text="當數位生活成為詐騙破口"
        >
          當數位生活成為詐騙破口
        </h1>

        {/* 黃色微光副標題 */}
        <p className="text-[#FCE788] text-base md:text-xl font-bold tracking-wider drop-shadow-md">
          新法打詐財損下降，年輕受害件數卻上升？
        </p>

      </div>
    </div>
  );
}
