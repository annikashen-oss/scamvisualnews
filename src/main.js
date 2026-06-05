import './style.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. 開場進場動畫 (網頁剛載入時的 Q 彈跳動)
  // ==========================================
  gsap.from(".glitch-text", {
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: "elastic.out(1, 0.4)",
    y: 50,
    delay: 0.2
  });

  gsap.from(".animate-pulse", { 
    opacity: 0, 
    duration: 1, 
    delay: 1.2 
  });


// 🌟 局部修正：完美同步滾輪的開場時間軸
const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#hero-section",
    start: "top top",
    end: "+=1200", // 增長捲動距離，讓同步感更細緻
    scrub: 1,      // 嚴格控制 1:1 的滑鼠滾輪同步率
    pin: true,
  }
});

heroTl
  // 1. 隨著滾輪往下，上下閘門緩緩向中央包夾（此時標題依然在後方清晰可見）
  .to("#gate-top", { y: "0%", duration: 1.5, ease: "none" }, 0)
  .to("#gate-bottom", { y: "0%", duration: 1.5, ease: "none" }, 0)
  
  // 2. 與閘門包夾「同步」：標題開始等比例縮小、變模糊、淡出
  .to(".glitch-text", { scale: 0.8, filter: "blur(12px)", opacity: 0, duration: 1.2, ease: "none" }, 0.2)
  .to("#hero-subtitle", { scale: 0.9, filter: "blur(8px)", opacity: 0, duration: 1.0, ease: "none" }, 0.4)
  .to("#scroll-hint", { opacity: 0, duration: 0.5, ease: "none" }, 0)
  
  // 3. 閘門在 1.5 秒處完全咬合，全黑狀態下切換正文
  .to("#story-section", { opacity: 1, duration: 0.3 }, 1.3)
  
  // 4. 閘門重新拉開，順滑進入下一幕
  .to("#gate-top", { y: "-100%", duration: 1.5, ease: "power2.inOut" }, 1.6)
  .to("#gate-bottom", { y: "100%", duration: 1.2, ease: "power2.inOut" }, 1.6);

  heroTl
    // 【分鏡 A】滑鼠開始捲動，上下閘門從螢幕邊緣往中央包夾（此時標題完整保留在後方）
    .to("#gate-top", { y: "0%", duration: 1.2, ease: "power1.inOut" }, 0)
    .to("#gate-bottom", { y: "0%", duration: 1.2, ease: "power1.inOut" }, 0)
    
    // 【分鏡 B】在閘門幾乎完全咬合的最後一刻（0.8秒處），標題才優雅地模糊淡出
    .to("#hero-section", { scale: 0.8, filter: "blur(10px)", opacity: 0, duration: 0.4 }, 0.8)
    
    // 【分鏡 C】閘門完全合攏，全黑狀態下無縫啟用正文區塊
    .to("#story-section", { opacity: 1, duration: 0.4 }, 1.2)
    
    // 【分鏡 D】黑色閘門再次由中央往上下拉開，流暢露出後方的專題內容
    .to("#gate-top", { y: "-100%", duration: 1.2, ease: "power2.inOut" }, 1.6)
    .to("#gate-bottom", { y: "100%", duration: 1.2, ease: "power2.inOut" }, 1.6);


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
