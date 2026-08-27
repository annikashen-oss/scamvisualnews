// src/pages/ScamVisualNews/components/GateScreen.jsx
import { useState } from 'react';
import styles from '../styles/scam.module.css';

export default function GateScreen({ onEnter }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => onEnter?.(), 1200);
  };

  return (
    <div className={`${styles.gateScreen} ${isOpen ? styles.open : ''}`}>
      <div className="text-[#ffcc00] text-xl md:text-2xl tracking-[4px] mb-5 text-center px-5">
        當數位生活成為詐騙破口
        ⚠️ 警告：偵測到資安高風險環境 ⚠️
      </div>
      <button
        onClick={handleOpen}
        className="px-8 py-3 bg-[#ff3366] text-white text-lg font-bold border-none cursor-pointer shadow-[0_0_15px_#ff3366] hover:bg-[#ff5588] hover:scale-105 transition"
      >
        點擊解鎖 / 進入專題
      </button>
    </div>
  );
}
