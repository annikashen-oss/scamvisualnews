// src/pages/ScamVisualNews/components/HeroSection.jsx
import { useRef } from 'react';
import styles from '../styles/scam.module.css';

export default function HeroSection() {
  const titleRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    if (titleRef.current) {
      titleRef.current.style.transform = `translate(${x * 0.03}px, ${y * 0.03}px) rotateX(${-y * 0.05}deg) rotateY(${x * 0.05}deg)`;
    }
  };

  const handleMouseLeave = () => {
    if (titleRef.current) {
      titleRef.current.style.transform = 'translate(0px, 0px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <header
      className="h-screen flex flex-col justify-center items-center text-center px-5 relative bg-[radial-gradient(circle_at_center,#1f2833_0%,#0b0c10_70%)]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <h1
        ref={titleRef}
        className={`${styles.glitchTitle} text-white`}
      >
        當數位生活成為詐騙破口
      </h1>
      <p className="text-[#ffcc00] text-xl md:text-2xl mt-5 font-bold tracking-[2px]">
       新法打詐財損下降，年輕受害件數卻上升？
      </p>
    </header>
  );
}
