import './style.css';

gsap.registerPlugin(ScrollTrigger);

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
// ====== 以下是新增的「段落捲動浮現 (Reveal)」特效 ======

// 抓取網頁中所有帶有 .reveal-item 的元素
const revealElements = gsap.utils.toArray('.reveal-item');

revealElements.forEach((elem) => {
  // 設定元素的初始狀態（往下掉 50px 且完全透明）
  gsap.set(elem, { y: 50, autoAlpha: 0 });

  // 設定當元素滾動到畫面時的動畫（回到原位 且 變為不透明）
  ScrollTrigger.create({
    trigger: elem,
    // 當這個元素的「頂部(top)」到達螢幕高度的「85%」處時，觸發動畫
    // 這能確保讀者往下看的時候，文字剛好在視線下方優雅地浮現出來
    start: "top 85%",
    
    // 動畫進入的設定
    onEnter: () => gsap.to(elem, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,         // 動畫持續 0.8 秒
      ease: "power2.out",    // 滑順的減速效果
      overwrite: "auto"
    }),

    // 【可選設定】如果希望讀者往上滑回去時，文字再次隱藏，可以解除下面這行的註解
    // onLeaveBack: () => gsap.to(elem, { y: 50, autoAlpha: 0, duration: 0.5, overwrite: "auto" })
  });
});
