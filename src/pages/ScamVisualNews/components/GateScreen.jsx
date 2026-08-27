// src/pages/ScamVisualNews/components/GateScreen.jsx
import { useState } from 'react';
import styles from '../styles/scam.module.css';

export default function GateScreen({ onEnter }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // 等待 1.2 秒的閘門開啟動畫播完後，再觸發進入專題
    setTimeout(() => onEnter?.(), 1200);
  };

  return (
    <div className={`${styles.gateScreen} ${isOpen ? styles.gateOpen : ''} flex flex-col items-center justify-center w-full min-h-screen`}>
      
      {/* ==========================================
          上下閘門黑幕 (必須有這兩個 div 才能觸發開門動畫)
          ========================================== */}
      <div className={styles.gateTop}></div>
      <div className={styles.gateBottom}></div>

      {/* ==========================================
          內容區塊 (加入 relative z-50 確保浮在閘門上方)
          ========================================== */}
      <div className="relative z-50 flex flex-col items-center justify-center px-5 w-full">
        
        {/* 1. 故障字型大標題 */}
        <h1 
          className={`${styles.glitchText} text-3xl md:text-5xl font-black text-center mb-6 tracking-widest`}
          data-text="當數位生活成為詐騙破口"
        >
          當數位生活成為詐騙破口
        </h1>

        {/* 2. 閃爍黃燈警告標語 */}
        <div className={`text-[#ffcc00] text-lg md:text-2xl tracking-[4px] mb-12 text-center font-bold ${styles.blinkYellow}`}>
          ⚠️ 警告：偵測到資安高風險環境 ⚠️
        </div>

        {/* 3. 解鎖按鈕 */}
        <button
          onClick={handleOpen}
          className="px-10 py-4 bg-[#ff3366] text-white text-lg font-bold border-none rounded-full cursor-pointer shadow-[0_0_20px_#ff3366] hover:bg-[#ff5588] hover:scale-105 transition-all duration-300"
        >
          點擊解鎖 / 進入專題
        </button>

      </div>
    </div>
  );
}
