import './style.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ✅ 修正：確保 DOM 載入完畢才執行，避免抓不到元件
document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 0. 前導影片自動播放與結束提示邏輯
  // ==========================================
  const introVideo = document.getElementById("intro-video");
  const videoScrollHint = document.getElementById("video-scroll-hint");

  if (introVideo) {
    // 1. 強制確保自動播放 (防範部分瀏覽器阻攔)
    introVideo.play().catch(err => console.log("影片自動播放受瀏覽器限制:", err));

    // 2. 監聽影片「播放結束 (ended)」事件
    introVideo.addEventListener('ended', () => {
      if (videoScrollHint) {
        // 影片一結束，立刻使用 GSAP 讓提示文字優雅淡入
        gsap.to(videoScrollHint, { 
          opacity: 1, 
          y: -10, // 微微往上浮現增加動感
          duration: 1.5, 
          ease: "power2.out" 
        });
      }
    });
  }


  // ==========================================
  // 1. 開場大標題動畫 (✅ 修正：改為捲動到畫面時才觸發)
  // ==========================================
  ScrollTrigger.create({
    trigger: "#hero-section",
    start: "top 75%", // 當標題區塊進入螢幕 75% 時，才觸發跳躍特效
    onEnter: () => {
      // 標題 Q 彈跳出
      gsap.fromTo(".glitch-text", 
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "elastic.out(1, 0.4)" }
      );
      // 讓副標題與指示箭頭依序淡入
      gsap.fromTo("#hero-subtitle", { opacity: 0 }, { opacity: 0.9, duration: 1, delay: 0.8 });
      gsap.fromTo("#scroll-hint", { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.2 });
    },
    once: true // 確保只跳動一次，不會因為上下滾動重複觸發
  });


// ==========================================
  // 2. 滾動轉場時間軸：先閃爍留存 ➔ 後包夾吸入
  // ==========================================
  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-section",
      start: "top top",
      end: "+=1200", 
      scrub: 1,      
      pin: true,     
    }
  });

  heroTl
    .to("#gate-top", { y: "-15%", duration: 0.6, ease: "none" }, 0)
    .to("#gate-bottom", { y: "15%", duration: 0.6, ease: "none" }, 0)
    .to("#gate-top", { y: "0%", duration: 0.6, ease: "power1.in" }, 0.6)
    .to("#gate-bottom", { y: "0%", duration: 0.6, ease: "power1.in" }, 0.6)
    
    // 🌟 關鍵修正：將原本的 .to 改為 .fromTo，強制鎖定起點狀態，防止跟進場動畫打架
    .fromTo(".glitch-text", 
      { scale: 1, filter: "blur(0px)", opacity: 1 }, 
      { scale: 0.7, filter: "blur(15px)", opacity: 0, duration: 0.5, ease: "none" }, 0.6)
      
    .fromTo("#hero-subtitle", 
      { scale: 1, filter: "blur(0px)", opacity: 0.9 }, 
      { scale: 0.8, filter: "blur(10px)", opacity: 0, duration: 0.5, ease: "none" }, 0.7)
      
    .fromTo("#scroll-hint", 
      { opacity: 1 }, 
      { opacity: 0, duration: 0.3, ease: "none" }, 0.6)
      
    .to("#story-section", { opacity: 1, duration: 0.3 }, 1.2)
    .to("#gate-top", { y: "-100%", duration: 1.0, ease: "power2.inOut" }, 1.5)
    .to("#gate-bottom", { y: "100%", duration: 1.0, ease: "power2.inOut" }, 1.5);
  

  // ==========================================
  // 3. 故事主線：角色走路與背景白天變黑夜
  // ==========================================
  gsap.to("#boy-character", {
    x: window.innerWidth - 100,
    scrollTrigger: {
      trigger: "#story-section",
      start: "top top",
      end: "bottom bottom",
      scrub: 2
    }
  });

  gsap.to("body", {
    backgroundColor: "#2e1065", 
    scrollTrigger: {
      trigger: "#story-section",
      start: "top top",
      end: "bottom bottom",
      scrub: 2
    }
  });


  // ==========================================
  // 4. 27 張人格卡片點擊翻轉功能
  // ==========================================
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });


  // ==========================================
  // 5. 首尾呼應：結尾動畫 (Outro)
  // ==========================================
  const outroTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#outro-section",
      start: "top top",
      end: "+=2000",
      scrub: 1,
      pin: true,
    }
  });

  outroTl.to("#outro-gate-top", { y: "0%", duration: 1, ease: "power2.inOut" }, 0)
         .to("#outro-gate-bottom", { y: "0%", duration: 1, ease: "power2.inOut" }, 0)
         .to("#outro-text-container", { opacity: 1, duration: 0.5 }, 1)
         .to("#outro-text-container .glitch-text", { scale: 1, duration: 1.5, ease: "elastic.out(1, 0.4)" }, 1)
         .to("#outro-text-container", { opacity: 0, duration: 0.8 }, 3)
         .to("#outro-light-bg", { opacity: 1, duration: 1 }, 3)
         .to("#outro-gate-top", { y: "-100%", duration: 1, ease: "power2.inOut" }, 4)
         .to("#outro-gate-bottom", { y: "100%", duration: 1, ease: "power2.inOut" }, 4);


  // ==========================================
  // 6. 全局文字、圖表交錯捲動浮現 (Reveal 補償防呆)
  // ==========================================
  gsap.utils.toArray('.reveal-item').forEach((item) => {
    gsap.set(item, { y: 40, autoAlpha: 0 }); 
    ScrollTrigger.create({
      trigger: item,
      start: "top 85%",
      onEnter: () => gsap.to(item, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" })
    });
  });

});
