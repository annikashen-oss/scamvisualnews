// src/pages/ScamVisualNews/index.jsx
import { useState, useEffect } from 'react';
import GateScreen from './components/GateScreen';
import DataSection from './components/DataSection';
import { useScrollReveal } from './hooks/useScrollReveal';
import styles from './styles/scam.module.css';

export default function ScamVisualNews() {
  // 閘門狀態：true 表示已解鎖進入專題
  const [entered, setEntered] = useState(false);

  // 使用自訂 Hook 處理滾動動畫（.reveal-item 元素）
  const containerRef = useScrollReveal('.reveal-item');

  // 當頁面進入後，重新觸發 Flourish 圖表渲染（若尚未載入）
  useEffect(() => {
    if (entered) {
      // 如果 Flourish 有全域方法，呼叫它重新掃描頁面中的圖表元素
      if (window.Flourish) {
        window.Flourish.embed?.();
      }
      // 若使用 Intersection Observer 或其他初始化邏輯，可放在此
    }
  }, [entered]);

  return (
    <div className="bg-[#62495F] overflow-x-hidden text-white">
      {/* 閘門遮罩：未進入時顯示，進入後隱藏 */}
      {!entered && <GateScreen onEnter={() => setEntered(true)} />}

      {/* 主內容容器：套用滾動動畫的 ref */}
      <main ref={containerRef} className="relative z-30 bg-[#62495F] min-h-screen pt-24 pb-0">

        {/* 瀏覽提示（黃燈閃爍） */}
        <div className="reveal-item w-full bg-black/40 backdrop-blur-md border-y border-[#FCE788]/20 py-4 my-12 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="max-w-4xl mx-auto px-6 flex items-center justify-center space-x-3 text-center">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FCE788] opacity-75"></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 bg-[#FCE788] ${styles.blinkYellow}`}></span>
            </span>
            <p className="text-[#FCE788] font-sans text-sm md:text-base font-bold tracking-widest uppercase">
              💡 瀏覽提示：本區域所有圖表皆可以「點擊右下角翻面」或「懸停讀百科」來探索數據和意義
            </p>
          </div>
        </div>

        {/* 資料主體（三個面向 + 遊戲 + 模擬器 + 結論） */}
        <DataSection />

      </main>
    </div>
  );
}
