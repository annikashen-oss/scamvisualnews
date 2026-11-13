// src/pages/ScamVisualNews/components/TinderGame.jsx
import { useState, useRef } from 'react';
import { useTinderSwipe } from '../hooks/useTinderSwipe';
import { questions, resultsMap } from '../data/questions';

export default function TinderGame() {
  const [idx, setIdx] = useState(0);
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultKey, setResultKey] = useState('perfect');

  // 🎯 使用 useRef 來即時記錄「第一次選右邊」的維度，不受 React 非同步 state 影響
  const firstRiskDimRef = useRef(null);

  const total = questions.length;
  const currentQ = questions[idx] || questions[0];

  const { ref, style, flyOut } = useTinderSwipe({
    threshold: 100,
    onSwipeLeft: () => handleChoice('left'),
    onSwipeRight: () => handleChoice('right'),
  });

  const handleChoice = (direction) => {
    let newRightCount = rightCount;
    let newLeftCount = leftCount;

    if (direction === 'right') {
      newRightCount += 1;
      setRightCount(newRightCount);

      // 如果這是第一次選右邊，立刻用 useRef 鎖定當前題目的 dimension
      if (!firstRiskDimRef.current) {
        firstRiskDimRef.current = currentQ.dimension;
      }
    } else {
      newLeftCount += 1;
      setLeftCount(newLeftCount);
    }

    // 判斷是否為最後一題
    if (idx + 1 >= total) {
      setShowSummary(true);
      setTimeout(() => {
        setShowSummary(false);
        
        // 🎯 完美結算：如果右邊計數大於 0，代表有選過右邊，直接取出我們鎖定的第一筆風險維度；若全程選左邊則為 'perfect'
        const finalKey = newRightCount > 0 ? firstRiskDimRef.current : 'perfect';
        
        setResultKey(finalKey || 'perfect');
        setShowResult(true);
      }, 2200);
    } else {
      setIdx(idx + 1);
    }
  };

  const restart = () => {
    setIdx(0);
    setLeftCount(0);
    setRightCount(0);
    firstRiskDimRef.current = null; // 重置鎖定的維度
    setShowSummary(false);
    setShowResult(false);
    setResultKey('perfect');
  };

  if (showResult) {
    const res = resultsMap[resultKey] || resultsMap.perfect;
    return (
      <div className="w-full max-w-xl mx-auto bg-[#fcfbfa] border border-stone-300 rounded-3xl p-6 shadow-md text-stone-900">
        <div className="text-xs text-stone-500 mb-1 font-semibold">─── 你的受詐風險診斷 ───</div>
        <h2 className="text-xl font-extrabold text-amber-800 mb-4">{res.title}</h2>
        <div className="bg-stone-100 border border-amber-300/60 rounded-2xl p-4 text-sm space-y-3">
          {resultKey !== 'perfect' && (
            <p className="text-rose-700 font-medium">{res.dialogue}</p>
          )}
          <p className="text-stone-700 text-xs leading-relaxed">{res.advice}</p>
        </div>
        <button
          onClick={restart}
          className="w-full mt-6 py-3 bg-amber-800 hover:bg-amber-900 rounded-xl font-bold text-white text-sm transition shadow cursor-pointer"
        >
          🔄 重新挑戰測驗
        </button>
      </div>
    );
  }

  if (showSummary) {
    return (
      <div className="w-full max-w-xl mx-auto bg-[#fcfbfa] border border-stone-300 rounded-3xl p-6 shadow-md text-center animate-bounce-in text-stone-900">
        <div className="text-3xl mb-2">📊</div>
        <h3 className="text-lg font-bold text-amber-900 mb-4">你的防禦決策結算中...</h3>
        <div className="space-y-3 text-sm">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex justify-between text-rose-900">
            <span>👉 右邊箱子 (風險)：</span>
            <span className="font-extrabold">{rightCount} 張</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex justify-between text-emerald-900">
            <span>👈 左邊箱子 (安全)：</span>
            <span className="font-extrabold">{leftCount} 張</span>
          </div>
        </div>
        <p className="text-xs text-stone-500 mt-6 animate-pulse">正在生成你的個人化受詐風險診斷...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto relative px-1 sm:px-2">
      {/* 調整容器高度與間距，適配手機小螢幕 */}
      <div className="flex items-center justify-between gap-1 sm:gap-3 h-[440px] md:h-[480px]">
        
        {/* 左箱：縮小手機上的寬度，防止擠壓 */}
        <div className="w-11 sm:w-16 md:w-24 h-52 md:h-64 bg-[#f0eae1] border-2 border-stone-300 rounded-2xl flex flex-col items-center justify-center p-1 text-stone-900 shrink-0">
          <div className="text-[10px] sm:text-xs font-bold text-emerald-800 text-center leading-tight">左邊的箱子</div>
          <div className="text-sm sm:text-base md:text-lg font-extrabold text-emerald-900 mt-1">{leftCount}</div>
        </div>

        {/* 卡片容器：使用彈性寬度配合手機尺寸 */}
        <div className="flex-1 max-w-[240px] sm:max-w-[300px] md:max-w-[340px] relative flex flex-col items-center h-[420px] md:h-[460px]">
          <div
            ref={ref}
            style={style}
            className="w-full bg-[#fcfbfa] border border-stone-300 rounded-3xl p-3.5 sm:p-5 md:p-6 shadow-md absolute flex flex-col justify-between h-[400px] md:h-[420px] text-stone-900 select-none box-border"
          >
            <div>
              <div className="flex justify-end items-center">
                <span className="text-[11px] sm:text-xs text-stone-500 font-medium">
                  第 {idx + 1} / {total} 題
                </span>
              </div>
              <h2 className="text-sm sm:text-lg md:text-xl font-bold mt-2 text-stone-900 leading-snug">{currentQ.title}</h2>
              <p className="text-stone-700 text-[11px] sm:text-xs md:text-sm mt-2 leading-relaxed">{currentQ.content}</p>
            </div>
            
            {/* 底部按鈕區塊 */}
            <div className="space-y-1.5 bg-stone-100 p-2 sm:p-3 rounded-2xl border border-stone-200">
              <div className="text-[9px] sm:text-[11px] md:text-xs text-center text-stone-500 font-semibold mb-1 whitespace-nowrap">
                👇 左右滑動卡片或點擊按鈕
              </div>
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    flyOut('left');
                  }}
                  className="flex-1 py-1.5 px-1 sm:px-2 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl text-emerald-900 text-[10px] sm:text-xs font-bold transition cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  👈 停在這
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    flyOut('right');
                  }}
                  className="flex-1 py-1.5 px-1 sm:px-2 bg-rose-100 hover:bg-rose-200 border border-rose-300 rounded-xl text-rose-900 text-[10px] sm:text-xs font-bold transition cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  👉 繼續買
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右箱：縮小手機上的寬度，防止擠壓 */}
        <div className="w-11 sm:w-16 md:w-24 h-52 md:h-64 bg-[#f0eae1] border-2 border-stone-300 rounded-2xl flex flex-col items-center justify-center p-1 text-stone-900 shrink-0">
          <div className="text-[10px] sm:text-xs font-bold text-rose-800 text-center leading-tight">右邊的箱子</div>
          <div className="text-sm sm:text-base md:text-lg font-extrabold text-rose-900 mt-1">{rightCount}</div>
        </div>

      </div>
    </div>
  );
}
