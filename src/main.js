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
