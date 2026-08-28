// src/pages/ScamVisualNews/components/FlourishEmbed.jsx
import { useEffect } from 'react';

export default function FlourishEmbed({ src, type = 'chart' }) {
  useEffect(() => {
    // 確保官方腳本存在
    let script = document.querySelector('script[src="https://public.flourish.studio/resources/embed.js"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://public.flourish.studio/resources/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // 當組件掛載後，強制讓 Flourish 重新渲染該圖表
    const timer = setTimeout(() => {
      if (window.Flourish && typeof window.Flourish.embed === 'function') {
        window.Flourish.embed();
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [src]);

  return (
    <div className={`flourish-embed flourish-${type}`} data-src={src}></div>
  );
}
