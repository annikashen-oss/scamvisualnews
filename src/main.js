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
  // 🎬 全新：電影感開場動畫序列
  // 順序：開門 ➔ 標題淡出 ➔ 影片出現播放 ➔ 影片淡出 ➔ 標題重現 ➔ 關門
  // ==========================================
  const introVideo = document.getElementById("intro-video");

  // 使用 GSAP 時間軸，將這整段綁定在滑鼠滾輪上 (scrub: 1)
  const masterIntroTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#master-intro",
      start: "top top",
      end: "+=5000", // 創造 5000px 的超長虛擬滾動空間，確保每個階段都很從容
      scrub: 1,      
      pin: true,     // 將畫面定住，直到整個開場序列播完才放行
      onUpdate: (self) => {
        // 在滾動進度 30% 到 60% 之間（也就是影片可見時），播放影片
        if (introVideo) {
          if (self.progress > 0.3 && self.progress < 0.6) {
            if (introVideo.paused) introVideo.play().catch(e => console.log("瀏覽器阻擋播放", e));
          } else {
            if (!introVideo.paused) introVideo.pause();
          }
        }
      }
    }
  });

  masterIntroTl
    // 階段 1：拉開閘門，展現專題標題
    .to("#intro-gate-top", { yPercent: -100, duration: 1, ease: "power2.inOut" }, 0)
    .to("#intro-gate-bottom", { yPercent: 100, duration: 1, ease: "power2.inOut" }, 0)
    
    // 階段 2：專題標題隨滾動模糊淡出
    .to("#intro-title", { opacity: 0, filter: "blur(10px)", scale: 0.9, duration: 1, ease: "none" }, 1.5)
    
    // 階段 3：出現彥儒前導影片
    .to("#intro-video-container", { opacity: 1, duration: 1, ease: "none" }, 2.5)
    
    // 階段 4：預留大量的捲動空間，讓讀者有時間觀看播放中的影片
    .to({}, { duration: 2.5 }, 3.5)
    
    // 階段 5：影片隨滾動淡出
    .to("#intro-video-container", { opacity: 0, duration: 1, ease: "none" }, 6.0)
    
    // 階段 6：再次出現清晰的專題標題
    .to("#intro-title", { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1, ease: "none" }, 7.0)
    
    // 階段 7：上下閘門再次關閉，畫面變黑
    .to("#intro-gate-top", { yPercent: 0, duration: 1, ease: "power2.inOut" }, 8.5)
    .to("#intro-gate-bottom", { yPercent: 0, duration: 1, ease: "power2.inOut" }, 8.5)
    
    // 階段 8：提示字淡出，解除鎖定
    .to("#scroll-hint-global", { opacity: 0, duration: 0.5 }, 8.5);
  

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
