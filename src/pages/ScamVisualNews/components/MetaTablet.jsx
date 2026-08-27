// src/pages/ScamVisualNews/components/MetaTablet.jsx
import { useState, useEffect } from 'react';
import styles from '../styles/scam.module.css';

export default function MetaTablet() {
  const [played, setPlayed] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const [showLeftCard, setShowLeftCard] = useState(false);
  const [showRightCard, setShowRightCard] = useState(false);
  const [showConclusion, setShowConclusion] = useState(false);
  const [flipLeft, setFlipLeft] = useState(false);
  const [flipRight, setFlipRight] = useState(false);

  const handlePlay = () => {
    setPlayed(true);
    setTimeout(() => setShowLine(true), 400);
    setTimeout(() => setShowQuestion(true), 1200);
    setTimeout(() => setShowBranches(true), 2000);
    setTimeout(() => setShowLeftCard(true), 2700);
    setTimeout(() => setShowRightCard(true), 2700);
    setTimeout(() => setShowConclusion(true), 3800);
  };

  return (
    <div className="w-full max-w-[1050px] mx-auto">
      <div className="bg-[#111] p-4 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(255,255,255,0.1)] border-4 border-[#333]">
        <div className="bg-gradient-to-br from-[#f0f4ff] to-[#e2e8f0] rounded-[28px] p-6 md:p-10 min-h-[750px] max-h-[88vh] overflow-y-auto relative flex flex-col items-center text-[#1e293b]">
          {/* 播放平板 */}
          {!played && (
            <div className="absolute inset-0 bg-[rgba(15,23,42,0.85)] backdrop-blur-md flex flex-col justify-center items-center z-50 rounded-[28px]">
              <button
                onClick={handlePlay}
                className="bg-[#1976ff] text-white w-[90px] h-[90px] rounded-full text-3xl flex justify-center items-center shadow-[0_10px_25px_rgba(25,118,255,0.6)] hover:scale-110 transition"
              >
                <i className="fa-solid fa-play ml-1"></i>
              </button>
              <p className="mt-5 font-bold text-[#f8fafc] text-lg tracking-[1px]">點擊播放 Meta 防詐騙互動動畫</p>
            </div>
          )}

          <div className="w-full max-w-[1000px] flex flex-col items-center">
            <h1 className="text-xl md:text-2xl font-extrabold text-center">
              Meta防治詐騙：<span className="text-[#1976ff]">上有政策</span>，<span className="text-[#d62828]">下有對策</span>
            </h1>
            <p className="text-sm text-[#64748b] text-center mb-6 font-semibold">詐騙訊息逃出被識破的傳遞路徑</p>

            {/* 中心节点 */}
            <div className="bg-white p-4 rounded-2xl w-[280px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-center border border-[rgba(25,118,255,0.15)]">
              <div className="text-3xl mb-1">🕵️</div>
              <h2 className="text-base font-bold">詐騙訊息發出</h2>
              <p className="text-xs text-[#64748b]">(廣告、貼文、訊息等)</p>
            </div>

            {/* 连线 */}
            <div className={`${styles.line} ${showLine ? styles.lineShow : ''}`}></div>

            {/* 问题节点 */}
            <div className={`bg-white p-4 rounded-2xl w-[280px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-center border border-[rgba(25,118,255,0.15)] ${styles.question} ${showQuestion ? styles.questionShow : ''}`}>
              <div className="text-3xl mb-1">🔍</div>
              <h2 className="text-base font-bold">是否被識破？</h2>
              <div className="flex justify-center gap-3 mt-3">
                <span className="px-4 py-1.5 bg-[#1976ff] text-white text-sm font-bold rounded-lg shadow">是</span>
                <span className="px-4 py-1.5 bg-[#d62828] text-white text-sm font-bold rounded-lg shadow">否</span>
              </div>
            </div>

            {/* 分支 */}
            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-10 mt-8 w-full relative">
              {/* 左分支 - 上有政策 */}
              <div className="w-full md:w-[450px] flex flex-col items-center">
                <svg className={`${styles.branchConnector} ${showBranches ? styles.branchConnectorShow : ''} w-full h-[35px]`} viewBox="0 0 450 35" preserveAspectRatio="none">
                  <line x1="300" y1="2" x2="65" y2="2" stroke="#1976ff" strokeWidth="4" strokeLinecap="round" />
                  <line x1="65" y1="2" x2="65" y2="35" stroke="#1976ff" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <div className={`${styles.unifiedCard} ${showLeftCard ? styles.unifiedCardShow : ''} w-full`}>
                  <div
                    className={`bg-white rounded-2xl p-5 shadow-[0_12px_35px_rgba(0,0,0,0.08)] border-t-4 border-[#1976ff] cursor-pointer transition-transform duration-700 ${flipLeft ? 'rotate-y-180' : ''}`}
                    style={{ transformStyle: 'preserve-3d' }}
                    onClick={() => setFlipLeft(!flipLeft)}
                  >
                    {!flipLeft ? (
                      // 正面
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-[#1976ff] font-bold flex items-center gap-2">
                            <i className="fa-solid fa-shield-halved"></i> 上有政策 (平台防堵機制)
                          </h3>
                          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-500">點擊翻面</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-left">
                          <div className="font-bold text-sm text-slate-700 mb-1">♾️ Meta 合作範圍 (有限) — 只能下架詐騙廣告</div>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <span className="bg-white border border-slate-200 px-2.5 py-0.5 rounded text-xs text-slate-600"><i className="fa-solid fa-check text-emerald-600"></i> 違規廣告審查</span>
                            <span className="bg-white border border-slate-200 px-2.5 py-0.5 rounded text-xs text-slate-600"><i className="fa-solid fa-check text-emerald-600"></i> 使用者檢舉</span>
                            <span className="bg-white border border-slate-200 px-2.5 py-0.5 rounded text-xs text-slate-600"><i className="fa-solid fa-check text-emerald-600"></i> AI偵測模型</span>
                          </div>
                        </div>
                        <div className="mt-3 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                          <h4 className="text-emerald-700 font-bold text-sm"><i className="fa-solid fa-circle-check"></i> 阻斷成功</h4>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <span className="bg-white border border-emerald-200 px-2.5 py-0.5 rounded text-xs text-emerald-700">詐騙被下架</span>
                            <span className="bg-white border border-emerald-200 px-2.5 py-0.5 rounded text-xs text-emerald-700">減少擴散</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // 背面
                      <div className="py-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-[#1976ff] font-bold">💡 政策能做的 (上有政策)</h3>
                          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-500">點擊翻回</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-blue-200 text-[#1e40af] text-sm leading-relaxed">
                          <p className="mb-2"><strong>✔️ 下架詐騙廣告與違規內容</strong></p>
                          <p className="mb-2"><strong>✔️ 限制觸及與帳號權限</strong></p>
                          <p><strong>✔️ 提供檢舉管道與安全提醒</strong></p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 右分支 - 下有对策 */}
              <div className="w-full md:w-[450px] flex flex-col items-center">
                <svg className={`${styles.branchConnector} ${showBranches ? styles.branchConnectorShow : ''} w-full h-[35px]`} viewBox="0 0 450 35" preserveAspectRatio="none">
                  <line x1="150" y1="2" x2="385" y2="2" stroke="#d62828" strokeWidth="4" strokeLinecap="round" />
                  <line x1="385" y1="2" x2="385" y2="35" stroke="#d62828" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <div className={`${styles.unifiedCard} ${showRightCard ? styles.unifiedCardShow : ''} w-full`}>
                  <div
                    className={`bg-white rounded-2xl p-5 shadow-[0_12px_35px_rgba(0,0,0,0.08)] border-t-4 border-[#d62828] cursor-pointer transition-transform duration-700 ${flipRight ? 'rotate-y-180' : ''}`}
                    style={{ transformStyle: 'preserve-3d' }}
                    onClick={() => setFlipRight(!flipRight)}
                  >
                    {!flipRight ? (
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-[#d62828] font-bold flex items-center gap-2">
                            <i className="fa-solid fa-triangle-exclamation"></i> 下有對策 (詐騙規避與轉移)
                          </h3>
                          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-500">點擊翻面</span>
                        </div>
                        <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-left">
                          <div className="font-bold text-sm text-rose-800 mb-1">詐騙訊息轉移至私人空間</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="bg-white border border-rose-200 px-2.5 py-0.5 rounded text-xs text-rose-700"><i className="fa-solid fa-users"></i> 私人群組</span>
                            <span className="bg-white border border-rose-200 px-2.5 py-0.5 rounded text-xs text-rose-700"><i className="fa-brands fa-facebook-messenger"></i> Messenger</span>
                            <span className="bg-white border border-rose-200 px-2.5 py-0.5 rounded text-xs text-rose-700"><i className="fa-brands fa-whatsapp"></i> WhatsApp</span>
                          </div>
                        </div>
                        <div className="mt-3 bg-amber-50 p-3 rounded-xl border border-amber-200">
                          <h4 className="text-amber-700 font-bold text-sm"><i className="fa-solid fa-lock"></i> 無法介入：個人資料保護</h4>
                          <ul className="text-xs text-amber-800 list-disc list-inside mt-1">
                            <li>加密通訊，Meta 無法讀取內容</li>
                            <li>私人對話與群組受隱私保護</li>
                          </ul>
                        </div>
                        <div className="mt-3 bg-rose-50 p-3 rounded-xl border-2 border-rose-300">
                          <h4 className="text-rose-700 font-bold text-sm"><i className="fa-solid fa-user-secret"></i> 詐騙持續擴散</h4>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <span className="bg-white border border-rose-200 px-2.5 py-0.5 rounded text-xs text-rose-700">成員轉傳</span>
                            <span className="bg-white border border-rose-200 px-2.5 py-0.5 rounded text-xs text-rose-700">建立信任</span>
                            <span className="bg-white border border-rose-200 px-2.5 py-0.5 rounded text-xs text-rose-700">難以檢舉</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-[#d62828] font-bold">🛡️ 對策能做的 (自保防範)</h3>
                          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-500">點擊翻回</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-rose-200 text-[#991b1b] text-sm leading-relaxed">
                          <p className="mb-2"><strong>✔️ 提高個資保護意識</strong></p>
                          <p className="mb-2"><strong>✔️ 不隨意加入不明群組與連結</strong></p>
                          <p><strong>✔️ 善用檢舉與封鎖功能</strong></p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 結論 */}
            <div className={`${styles.conclusion} ${showConclusion ? styles.conclusionShow : ''} w-full max-w-[950px] mt-10 bg-[rgba(15,23,42,0.85)] backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.35)] text-white text-left`}>
              <h2 className="text-xl md:text-2xl font-bold text-[#38bdf8] text-center mb-3">🤝 結論：上有政策，下有對策</h2>
              <p className="text-sm text-[#cbd5e1] text-center">
                Meta 與政府合作，能在<strong>「公開平台」</strong>內有效打擊詐騙（上有政策）；但一旦詐騙轉移到<strong>「私人空間」</strong>，受個資保護限制，平台難以介入（下有對策）。
              </p>
              <div className="mt-4 p-3 bg-white/5 rounded-lg border-l-4 border-[#38bdf8]">
                <p className="text-[#38bdf8] font-bold text-sm text-center">
                  <i className="fa-solid fa-circle-exclamation"></i> 防治詐騙需要：<strong>平台、政府、用戶三方合作</strong>，才能真正降低風險！
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
