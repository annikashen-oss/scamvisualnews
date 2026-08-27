// src/pages/ScamVisualNews/index.jsx
import { useState, useEffect } from 'react';
import GateScreen from './components/GateScreen';
import NavbarHeader from './components/NavbarHeader';
import MainTitleBanner from './components/MainTitleBanner';
import DataSection from './components/DataSection';
import Footer from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';
import styles from './styles/scam.module.css';

export default function ScamVisualNews() {
  // 閘門狀態：true 表示 成功解鎖進入專題
  const [entered, setEntered] = useState(false);

  // 使用自訂 Hook 處理滾動動畫（.reveal-item 元素）
  const containerRef = useScrollReveal('.reveal-item');

  // 當頁面進入後，重新觸發 Flourish 圖表渲染（若尚未載入）
  useEffect(() => {
    if (entered) {
      if (window.Flourish) {
        window.Flourish.embed?.();
      }
    }
  }, [entered]);

  return (
    <div className="bg-[#62495F] overflow-x-hidden text-white min-h-screen relative selection:bg-[#FCE788] selection:text-black">
      {/* 閘門遮罩：未進入時顯示，進入後隱藏 */}
      {!entered && <GateScreen onEnter={() => setEntered(true)} />}

      {/* 常駐頁首 Navbar */}
      <NavbarHeader />
      
      {/* 2. 放在內文最上方，當作專題的震撼開場 */}
      <MainTitleBanner />

      {/* 主內容容器：套用滾動動畫的 ref，並加上 pt-20 避免被固定的 Navbar 遮擋 */}
      <main ref={containerRef} className="relative z-30 bg-[#62495F] min-h-screen pt-12 pb-0">
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

      {/* 頁尾 Footer */}
      <Footer />
    </div>
  );
}
