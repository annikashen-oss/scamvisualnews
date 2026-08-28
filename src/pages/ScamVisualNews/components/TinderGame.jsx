// src/pages/ScamVisualNews/components/TinderGame.jsx
import { useState } from 'react';
import { useTinderSwipe } from '../hooks/useTinderSwipe';
import { questions, resultsMap } from '../data/questions';

export default function TinderGame() {
  const [idx, setIdx] = useState(0);
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [firstRiskDim, setFirstRiskDim] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultKey, setResultKey] = useState('perfect');

  const total = questions.length;
  const currentQ = questions[idx] || questions[0];

  const { ref, style, flyOut } = useTinderSwipe({
    threshold: 100,
    onSwipeLeft: () => handleChoice('left'),
    onSwipeRight: () => handleChoice('right'),
  });

  const handleChoice = (direction) => {
    if (direction === 'right') {
      if (!firstRiskDim) {
        setFirstRiskDim(currentQ.dimension);
      }
      setRightCount((c) => c + 1);
    } else {
      setLeftCount((c) => c + 1);
    }

    if (idx + 1 >= total) {
      setShowSummary(true);
      setTimeout(() => {
        setShowSummary(false);
        const key = firstRiskDim || 'perfect';
        setResultKey(key);
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
    setFirstRiskDim(null);
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
            <span>👉 右邊箱子計分：</span>
            <span className="font-extrabold">{rightCount} 張</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex justify-between text-emerald-900">
            <span>👈 左邊箱子計分：</span>
            <span className="font-extrabold">{leftCount} 張</span>
          </div>
        </div>
        <p className="text-xs text-stone-500 mt-6 animate-pulse">正在生成你的個人化受詐風險診斷...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto relative">
      <div className="flex items-center justify-between h-[480px]">
        {/* 左箱 */}
        <div className="w-20 md:w-24 h-64 bg-[#f0eae1] border-2 border-stone-300 rounded-2xl flex flex-col items-center justify-center p-2 text-stone-900">
          <div className="text-xs font-bold text-emerald-800 text-center">左邊的箱子</div>
          <div className="text-lg font-extrabold text-emerald-900 mt-1">{leftCount}</div>
        </div>

        {/* 卡片 */}
        <div className="w-[300px] md:w-[340px] relative flex flex-col items-center h-[460px]">
          <div
            ref={ref}
            style={style}
            className="w-full bg-[#fcfbfa] border border-stone-300 rounded-3xl p-6 shadow-md absolute flex flex-col justify-between h-[420px] text-stone-900 select-none"
          >
            <div>
              <div className="flex justify-end items-center">
                <span className="text-xs text-stone-500 font-medium">
                  第 {idx + 1} / {total} 題
                </span>
              </div>
              <h2 className="text-xl font-bold mt-4 text-stone-900">{currentQ.title}</h2>
              <p className="text-stone-700 text-sm mt-3 leading-relaxed">{currentQ.content}</p>
            </div>
            
            {/* 底部按鈕區塊 */}
            <div className="space-y-2 bg-stone-100 p-3 rounded-2xl border border-stone-200">
              <div className="text-xs text-center text-stone-500 font-semibold mb-1">
                👇 左右滑動卡片或點擊按鈕
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    flyOut('left');
                  }}
                  className="flex-1 py-2.5 px-3 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-bold transition cursor-pointer"
                >
                  👈 我覺得停在這裡
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    flyOut('right');
                  }}
                  className="flex-1 py-2.5 px-3 bg-rose-100 hover:bg-rose-200 border border-rose-300 rounded-xl text-rose-900 text-xs font-bold transition cursor-pointer"
                >
                  👉 我還是要繼續購買
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右箱 */}
        <div className="w-20 md:w-24 h-64 bg-[#f0eae1] border-2 border-stone-300 rounded-2xl flex flex-col items-center justify-center p-2 text-stone-900">
          <div className="text-xs font-bold text-rose-800 text-center">右邊的箱子</div>
          <div className="text-lg font-extrabold text-rose-900 mt-1">{rightCount}</div>
        </div>
      </div>
    </div>
  );
}
