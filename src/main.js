import './style.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. 開場進場動畫 (網頁剛載入時的 Q 彈跳動)
  // ==========================================
  gsap.fromTo(".glitch-text", 
    { scale: 0.8, opacity: 0, y: 50 },
    { 
      scale: 1, 
      opacity: 1, 
      y: 0, 
      duration: 1.5, 
      ease: "elastic.out(1, 0.4)",
      delay: 0.2
    }
  );
  
  // 讓副標題與指示箭頭依序淡入
  gsap.fromTo("#hero-subtitle", { opacity: 0 }, { opacity: 0.9, duration: 1, delay: 1.0 });
  gsap.fromTo("#scroll-hint", { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.4 });


  // ==========================================
  // 2. 滾動轉場時間軸：先閃爍留存 ➔ 後包夾吸入（已移除衝突代碼）
  // ==========================================
  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-section",
      start: "top top",
      end: "+=1200", // 拉長滾動距離，給予標題足夠的留存時間
      scrub: 1,      // 1:1 嚴格綁定滑鼠滾輪
      pin: true,     // 鎖定畫面
    }
  });

  heroTl
    // 【階段一：滾動初期（進度 0.0 ~ 0.6）】
    // 讀者剛開始捲動時，主標題與副標題穩穩停留在螢幕中央發揮閃爍特效，
    // 此時上下閘門「不提前咬死」，而是從螢幕最外緣緩緩、微幅地往內包夾，不遮擋文字。
    .to("#gate-top", { y: "-15%", duration: 0.6, ease: "none" }, 0)
    .to("#gate-bottom", { y: "15%", duration: 0.6, ease: "none" }, 0)
    
    // 【階段二：連鎖吸入（進度 0.6 ~ 1.2）】
    // 隨著滾輪繼續往深處捲動，兩側閘門加速向中央合攏。
    // 這時標題與滾輪產生「連鎖物理反應」—— 閘門越逼近，文字同步變得越模糊、大幅縮小並淡出（吸入感）。
    .to("#gate-top", { y: "0%", duration: 0.6, ease: "power1.in" }, 0.6)
    .to("#gate-bottom", { y: "0%", duration: 0.6, ease: "power1.in" }, 0.6)
    .to(".glitch-text", { scale: 0.7, filter: "blur(15px)", opacity: 0, duration: 0.5, ease: "none" }, 0.6)
    .to("#hero-subtitle", { scale: 0.8, filter: "blur(10px)", opacity: 0, duration: 0.5, ease: "none" }, 0.7)
    .to("#scroll-hint", { opacity: 0, duration: 0.3, ease: "none" }, 0.6)
    
    // 【階段三：黑暗咬合（進度 1.2 ~ 1.5）】
    // 閘門在 1.2 處完全咬合，全黑狀態下流暢切換並就位正文底色。
    .to("#story-section", { opacity: 1, duration: 0.3 }, 1.2)
    
    // 【階段四：重見光明（進度 1.5 ~ 2.5）】
    // 黑色閘門重新往上下拉開，絲滑露出全滿 #62495F 背景的正文世界
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
    backgroundColor: "#2e1065", // 隨著故事推進漸變成夜晚的深紫藍
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
    gsap.set(item, { y: 40, autoAlpha: 0 }); // 先行隱藏預設位置
    ScrollTrigger.create({
      trigger: item,
      start: "top 85%",
      onEnter: () => gsap.to(item, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" })
    });
  });


  // ==========================================
  // 7. 融媒體影片自動播放控制
  // ==========================================
  const introVideo = document.getElementById("intro-video");
  const outroVideo = document.getElementById("outro-video");

  if (introVideo) {
    ScrollTrigger.create({
      trigger: "#hero-section",
      onEnter: () => introVideo.play().catch(err => console.log("影片自動播放受瀏覽器限制:", err)),
    });
  }

  if (outroVideo) {
    ScrollTrigger.create({
      trigger: "#outro-section",
      onEnter: () => outroVideo.play().catch(err => console.log("影片自動播放受瀏覽器限制:", err)),
    });
  }

});
