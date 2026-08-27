// src/pages/ScamVisualNews/hooks/useScrollReveal.js
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * 自訂 Hook：處理滾動觸發的 reveal 動畫
 * @param {string} selector - 要監聽的CSS選擇器（預設 '.reveal-item'）
 * @returns {React.RefObject} containerRef - 綁定到父容器上，用於清理動畫
 */
export const useScrollReveal = (selector = '.reveal-item') => {
  const containerRef = useRef(null);

  useEffect(() => {
    // 註冊 ScrollTrigger 插件（若尚未註冊）
    gsap.registerPlugin(ScrollTrigger);

    // 使用 gsap.context 建立隔離環境，便於清理
    const ctx = gsap.context(() => {
      // 選取所有符合 selector 的元素
      const elements = gsap.utils.toArray(selector);
      
      elements.forEach((el) => {
        // 從初始狀態（透明、下移）到最終狀態（可見、原位）
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%', // 當元素頂部到達視窗 85% 位置時觸發
              toggleClass: 'visible', // 自動添加 .visible 類別
              // 如果只想觸發一次，可加上 once: true
              // once: true,
            },
          }
        );
      });
    }, containerRef);

    // 清理函數：移除所有 ScrollTrigger 實例與動畫
    return () => {
      ctx.revert();
      // 若需要完全清除 ScrollTrigger，可加上：
      // ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [selector]);

  return containerRef;
};
