import './style.css';

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


// 抓取網頁中所有的群組容器 (控制正文依序浮現)
const revealGroups = gsap.utils.toArray('.reveal-group');

revealGroups.forEach((group) => {
  const items = group.querySelectorAll('.reveal-item');
  if (items.length === 0) return;

  gsap.set(items, { y: 40, autoAlpha: 0 });

  ScrollTrigger.create({
    trigger: group,
    start: "top 82%", 
    onEnter: () => {
      gsap.to(items, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.25, 
        overwrite: "auto"
      });
    }
  });
});

// 防呆機制：處理沒有被群組包住的單一物件
gsap.utils.toArray('.reveal-item').forEach((item) => {
  if (!item.closest('.reveal-group')) {
    gsap.set(item, { y: 40, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: item,
      start: "top 85%",
      onEnter: () => gsap.to(item, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" })
    });
  }
});
