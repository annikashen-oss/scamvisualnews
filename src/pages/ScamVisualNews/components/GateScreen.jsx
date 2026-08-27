// src/pages/ScamVisualNews/components/GateScreen.jsx
import { useState, useEffect } from 'react';

export default function GateScreen({ onEnter }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return; // 防止重複觸發
    setIsOpen(true);
    setTimeout(() => onEnter?.(), 1200); // 配合 CSS 的 1.2 秒轉場動畫
  };

  // 🖱️ 監聽滑鼠滾動與手機滑動事件
  useEffect(() => {
    let touchStartY = 0;

    // 1. 電腦滑鼠滾動事件
    const handleWheel = (e) => {
      // 只要使用者往下滾動 (deltaY > 0)，就觸發開門
      if (e.deltaY > 20) {
        handleOpen();
      }
    };

    // 2. 手機觸控開始
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    // 3. 手機觸控結束 (判斷往下滑動)
    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      // 如果手指往下滑動超過 50px，就觸發開門
      if (touchStartY - touchEndY > 50) {
        handleOpen();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#62495F] overflow-hidden flex flex-col items-center justify-center w-full min-h-screen`}>
      
      {/* ==========================================
          上下閘門黑幕 (透過 isOpen 切換 translateY 展開)
          ========================================== */}
      <div 
        id="intro-gate-top" 
        className={`absolute top-0 left-0 w-full h-[50vh] bg-[#0a0a0a] z-40 transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
          isOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      ></div>
      
      <div 
        id="intro-gate-bottom" 
        className={`absolute bottom-0 left-0 w-full h-[50vh] bg-[#0a0a0a] z-40 transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
          isOpen ? 'translate-y-full' : 'translate-y-0'
        }`}
      ></div>

      {/* ==========================================
          內容區塊 (加入 relative z-50 確保浮在閘門上方)
          ========================================== */}
      <div className={`relative z-50 flex flex-col items-center justify-center px-5 w-full transition-opacity duration-500 ${isOpen ? 'opacity-0 scale-95' : 'opacity-100'}`}>
        
        {/* 1. 故障字型大標題（已改為極粗體 font-black） */}
        <h1 
          className={`glitch-text text-3xl md:text-5xl font-black text-center mb-6 tracking-widest`}
          data-text="當數位生活成為詐騙破口"
        >
          當數位生活成為詐騙破口
        </h1>

        {/* 2. 閃爍黃燈警告標語 */}
        <div className={`text-[#ffcc00] text-lg md:text-2xl tracking-[4px] mb-12 text-center font-bold blink-yellow`}>
          ⚠️ 警告：偵測到資安高風險環境 ⚠️
        </div>

        {/* 3. 解鎖按鈕（也可點擊，或直接滾動） */}
        <button
          onClick={handleOpen}
          className="px-10 py-4 bg-[#ff3366] text-white text-lg font-bold border-none rounded-full cursor-pointer shadow-[0_0_20px_#ff3366] hover:bg-[#ff5588] hover:scale-105 transition-all duration-300"
        >
          👇 往下滾動或點擊解鎖
        </button>

      </div>
    </div>
  );
}
