// src/pages/ScamVisualNews/components/PhoneSimulator.jsx
import { useState, useRef } from 'react';
import styles from '../styles/scam.module.css';

export default function PhoneSimulator() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('請輸入正確的防詐專線');
  const [statusClass, setStatusClass] = useState('text-xs text-slate-400 mt-4 h-5 font-medium');
  const [shake, setShake] = useState(false);
  const [exitAnim, setExitAnim] = useState(false);
  const phoneRef = useRef(null);
  const target = '165';

  const triggerVibration = (duration = 50, error = false) => {
    if (navigator.vibrate) navigator.vibrate(duration);
    setShake(true);
    setTimeout(() => setShake(false), error ? 300 : 150);
  };

  const handleKey = (val) => {
    if (exitAnim) return;
    const nextIdx = input.length;
    const expected = target[nextIdx];

    if (val === expected) {
      triggerVibration(50, false);
      const newInput = input + val;
      setInput(newInput);
      if (newInput === target) {
        setStatus('成功撥打 165 反詐專線...');
        setStatusClass('text-xs text-emerald-400 mt-4 h-5 font-bold animate-pulse');
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 150]);
        setExitAnim(true);
        setTimeout(() => {
          setInput('');
          setStatus('請輸入正確的三碼防詐專線');
          setStatusClass('text-xs text-slate-400 mt-4 h-5 font-medium');
          setExitAnim(false);
        }, 3000);
      } else {
        setStatus(newInput === '1' ? '輸入正確，請繼續輸入...' : '最後一步，請輸入最後一個數字');
        setStatusClass(newInput === '1' ? 'text-xs text-amber-400 mt-4 h-5 font-medium' : 'text-xs text-amber-300 mt-4 h-5 font-medium');
      }
    } else {
      triggerVibration(100, true);
      setInput('');
      setStatus('提示：請依序撥打 1 ➔ 6 ➔ 5');
      setStatusClass('text-xs text-red-400 mt-4 h-5 font-bold');
    }
  };

  const clearInput = () => {
    if (exitAnim) return;
    triggerVibration(50, false);
    setInput('');
    setStatus('請輸入正確的防詐專線');
    setStatusClass('text-xs text-slate-400 mt-4 h-5 font-medium');
  };

  const keys = [
    { label: '1', sub: 'o_o' },
    { label: '2', sub: 'ABC' },
    { label: '3', sub: 'DEF' },
    { label: '4', sub: 'GHI' },
    { label: '5', sub: 'JKL' },
    { label: '6', sub: 'MNO' },
    { label: '7', sub: 'PQRS' },
    { label: '8', sub: 'TUV' },
    { label: '9', sub: 'WXYZ' },
    { label: '*', sub: '' },
    { label: '0', sub: '+' },
    { label: '#', sub: '' },
  ];

  return (
    <div className="flex flex-col items-center">
      <div
        ref={phoneRef}
        className={`w-[320px] h-[640px] bg-black rounded-[50px] p-3 shadow-[0_0_50px_rgba(255,255,255,0.05),inset_0_0_15px_rgba(255,255,255,0.2)] border-4 border-slate-700 relative flex flex-col transition-all duration-300 mx-auto text-left ${
          shake ? styles.shakeActive : ''
        } ${exitAnim ? styles.slideUpExit : ''}`}
      >
        <div className="w-full h-full bg-slate-900 rounded-[38px] overflow-hidden relative flex flex-col border border-slate-800">
          {/* 动态岛 */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3.5">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-800"></div>
            <div className="w-1.5 h-1.5 bg-blue-900/50 rounded-full"></div>
          </div>

          {/* 状态栏 */}
          <div className="h-10 px-6 pt-3.5 flex justify-between items-center text-[11px] font-medium text-slate-400 z-40">
            <div>16:50</div>
            <div className="flex items-center space-x-1.5">
              <i className="fa-solid fa-signal"></i>
              <span>5G</span>
              <i className="fa-solid fa-battery-three-quarters text-sm"></i>
            </div>
          </div>

          {/* 显示区 */}
          <div className="flex-1 flex flex-col justify-center items-center px-6 text-center pt-2">
            <div className="mb-4 bg-red-950/40 border border-red-500/20 px-4 py-2 rounded-2xl">
              <p className="text-red-400 text-xs font-bold tracking-widest uppercase">SECURITY</p>
              <h3 className="text-white text-lg font-extrabold mt-0.5">請撥打反詐騙專線</h3>
            </div>
            <div className="w-full h-16 flex items-center justify-center rounded-2xl bg-black/40 border border-slate-800/80 px-4 relative overflow-hidden">
              <div className={`text-3xl font-bold tracking-[0.5em] pl-[0.5em] ${input ? 'text-amber-400' : 'text-transparent'}`}>
                {input || ' '}
              </div>
              {!input && (
                <div className="absolute text-xs text-slate-500 tracking-wider">請在下方點擊按鈕撥號</div>
              )}
            </div>
            <p className={statusClass}>{status}</p>
          </div>

          {/* 键盘 */}
          <div className="p-5 pb-6 bg-slate-950/80 border-t border-slate-900 rounded-t-[32px]">
            <div className="grid grid-cols-3 gap-y-3 gap-x-4 justify-items-center">
              {keys.map((k) => (
                <button
                  key={k.label}
                  onClick={() => handleKey(k.label)}
                  className="w-[50px] h-[50px] rounded-full bg-slate-800/70 border border-slate-700/50 flex flex-col items-center justify-center transition-all active:scale-90"
                >
                  <span className="text-lg font-bold text-white">{k.label}</span>
                  {k.sub && <span className="text-[8px] text-slate-400 font-semibold -mt-0.5">{k.sub}</span>}
                </button>
              ))}
              <div className="col-span-3 flex justify-center w-full mt-1">
                <button
                  onClick={clearInput}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full text-xs font-semibold border border-slate-800 transition active:scale-95 flex items-center space-x-1.5"
                >
                  <i className="fa-solid fa-delete-left"></i>
                  <span>重新輸入</span>
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-700 rounded-full z-40"></div>
        </div>
      </div>
    </div>
  );
}
