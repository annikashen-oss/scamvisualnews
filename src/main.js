import './style.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


document.addEventListener("DOMContentLoaded", () => {

  // 1. 開場動畫 (大標題彈跳)// 在 main.js 中
gsap.from(".glitch-text", {
  scale: 0.8,
  opacity: 0,
  duration: 1.5,
  ease: "elastic.out(1, 0.4)",
  y: 50,
  delay: 0.2
});
  gsap.from(".animate-pulse", { opacity: 0, duration: 1, delay: 1.2 });

  // 2. 開場閘門轉場 (綁定 hero-section)
  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-section",
      start: "top top",
      end: "+=800",
      scrub: 1,
      pin: true,
    }
  });

  heroTl.to("#gate-top", { y: "0%", duration: 1, ease: "power2.inOut" }, 0)
        .to("#gate-bottom", { y: "0%", duration: 1, ease: "power2.inOut" }, 0)
        .to("#hero-section", { scale: 0.8, filter: "blur(10px)", opacity: 0, duration: 0.5 }, 0.5)
        .to("#story-section", { opacity: 1, duration: 0.5 }, 0.8);

  // 3. 故事區段：角色走路、轉場與 Zoom in
  // 注意：這裡改用 ScrollTrigger 監聽 story-section，不使用 pin 以避免卡住捲動
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

  // 4. 結尾動畫 (Outro)
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

  // 5. Reveal 動畫 (文字浮現)
  gsap.utils.toArray('.reveal-item').forEach((item) => {
    gsap.set(item, { y: 40, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: item,
      start: "top 85%",
      onEnter: () => gsap.to(item, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" })
    });
  });
});
gsap.registerPlugin(ScrollTrigger);

// 🌟 新增：一進網頁的大標題「放大縮小跳躍」進場特效
gsap.from(".glitch-text", {
  scale: 0,                  // 從大小為 0 開始
  opacity: 0,                // 一開始是透明的
  duration: 1.5,             // 動畫執行 1.5 秒
  ease: "elastic.out(1, 0.4)", // 這會產生「放大超過原本尺寸，再縮回中央」的 Q 彈跳躍感
  y: 50,                     // 從畫面下方 50px 的地方彈上來
  delay: 0.2                 // 網頁載入後稍微等 0.2 秒再跳出來，體驗更順暢
});

// 🌟 新增：讓下方的「向下捲動進入專題」文字跟著標題後面淡入出現
gsap.from(".animate-pulse", {
  opacity: 0,
  duration: 1,
  delay: 1.2
});

// ====== 以下是原本的「捲動轉場」與「交錯浮現」特效，維持不變 ======

// 建立一個綁定滾動的動畫時間軸 (控制開場與閘門)
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#hero-section",
    start: "top top",
    end: "+=800",
    scrub: 1,
    pin: true,
  }
});

// 閘門關閉
tl.to("#gate-top", { y: "0%", duration: 1, ease: "power2.inOut" }, 0)
  .to("#gate-bottom", { y: "0%", duration: 1, ease: "power2.inOut" }, 0)
// 標題模糊吸入
  .to("#hero-section", { scale: 0.8, filter: "blur(10px)", opacity: 0, duration: 0.5 }, 0.5)
// 帶有 #62495F 底色的正文區塊浮現
  .to("#story-section", { opacity: 1, duration: 0.5 }, 0.8);
// ====== 以下是新增的「首尾呼應」結尾動畫 ======

// 建立結尾區塊的時間軸
const outroTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#outro-section",
    start: "top top",
    end: "+=2000", // 動畫佔據 2000px 的捲動距離
    scrub: 1,      // 跟隨滑鼠捲動
    pin: true,     // 將結尾畫面釘住在螢幕上
  }
});

// 🎬 分鏡 1：黑色閘門關閉 (再次陷入黑暗，與開場呼應)
outroTl.to("#outro-gate-top", { y: "0%", duration: 1, ease: "power2.inOut" }, 0)
       .to("#outro-gate-bottom", { y: "0%", duration: 1, ease: "power2.inOut" }, 0);

// 🎬 分鏡 2：結尾文字浮現，且標題 Q 彈跳出 (與開場動畫的 elastic.out 呼應)
outroTl.to("#outro-text-container", { opacity: 1, duration: 0.5 }, 1)
       .to("#outro-text-container .glitch-text", { 
          scale: 1, 
          duration: 1.5, 
          ease: "elastic.out(1, 0.4)" 
       }, 1);

// 🎬 分鏡 3：讀者繼續往下滾，文字淡出，背景亮起光明色 (#FCFAF2)
outroTl.to("#outro-text-container", { opacity: 0, duration: 0.8 }, 3)
       .to("#outro-light-bg", { opacity: 1, duration: 1 }, 3);

// 🎬 分鏡 4：黑色閘門重新打開！露出光明底色，準備順滑銜接 Footer
outroTl.to("#outro-gate-top", { y: "-100%", duration: 1, ease: "power2.inOut" }, 4)
       .to("#outro-gate-bottom", { y: "100%", duration: 1, ease: "power2.inOut" }, 4);


// 影片播放控制：開頭與結尾
const introVideo = document.getElementById("intro-video");
const outroVideo = document.getElementById("outro-video");

ScrollTrigger.create({
  trigger: "#hero-section",
  onEnter: () => introVideo.play(),
});

ScrollTrigger.create({
  trigger: "#outro-section",
  onEnter: () => outroVideo.play(),
});

initInteraction();
