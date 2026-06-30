import './style.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
  // 🎬 全新：開場自動進場 + 滾動轉場序列
  // ==========================================
  const introVideo = document.getElementById("intro-video");

  // 1. 網頁剛載入時：「自動播放」開門與標題彈出 (不依賴滾動)
  // 先將標題與提示文字隱藏
  gsap.set(".glitch-text", { scale: 0.8, opacity: 0 }); 
  gsap.set("#intro-title p", { opacity: 0, y: 20 });   
  gsap.set("#scroll-hint-global", { opacity: 0 });     

  const initTl = gsap.timeline();
  initTl.to("#intro-gate-top", { yPercent: -100, duration: 1.2, ease: "power3.inOut" }, 0.2)
        .to("#intro-gate-bottom", { yPercent: 100, duration: 1.2, ease: "power3.inOut" }, 0.2)
        // 標題自動 Q 彈出現
        .to(".glitch-text", { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.4)" }, 1.0)
        .to("#intro-title p", { opacity: 1, y: 0, duration: 1 }, 1.5)
        .to("#scroll-hint-global", { opacity: 1, duration: 1 }, 2.0);


  // 2. 滑鼠滾動時：控制後續的轉場 (標題淡出 ➔ 影片 ➔ 標題重現 ➔ 關門)
  const masterIntroTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#master-intro",
      start: "top top",
      end: "+=4000",
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        if (introVideo) {
          // 在進度 20% ~ 60% 的區間，自動控制影片的播放與暫停
          if (self.progress > 0.2 && self.progress < 0.6) {
            if (introVideo.paused) introVideo.play().catch(e => console.log(e));
          } else {
            if (!introVideo.paused) introVideo.pause();
          }
        }
      }
    }
  });

  masterIntroTl
    // 階段 1：往下滾動時，自動出現的標題開始模糊淡出
    .to("#intro-title", { opacity: 0, filter: "blur(10px)", scale: 0.9, duration: 1, ease: "none" }, 0)
    
    // 階段 2：彥儒影片浮現
    .to("#intro-video-container", { opacity: 1, duration: 1, ease: "none" }, 1)
    
    // 階段 3：給予捲動空間看影片
    .to({}, { duration: 2 }, 2)
    
    // 階段 4：影片淡出
    .to("#intro-video-container", { opacity: 0, duration: 1, ease: "none" }, 4)
    
    // 階段 5：標題再次重現
    .to("#intro-title", { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1, ease: "none" }, 5)
    
    // 階段 6：上下閘門關閉，準備進入正文
    .to("#intro-gate-top", { yPercent: 0, duration: 1, ease: "power2.inOut" }, 6)
    .to("#intro-gate-bottom", { yPercent: 0, duration: 1, ease: "power2.inOut" }, 6)
    .to("#scroll-hint-global", { opacity: 0, duration: 0.5 }, 6);
  

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
// ==========================================
  // ★ 165 手機撥號模擬器邏輯
  // ==========================================
  const phoneDevice = document.getElementById('phoneDevice');
  const numberDisplay = document.getElementById('numberDisplay');
  const displayPlaceholder = document.getElementById('displayPlaceholder');
  const statusMsg = document.getElementById('statusMsg');
  const topHint = document.getElementById('topHint');
  const clearBtn = document.getElementById('clearBtn');
  const keyButtons = document.querySelectorAll('.key-btn');

  if(phoneDevice) {
    let currentInput = '';
    let hasFailed = false;
    const targetSequence = '165';

    function triggerVibration(duration = 50, isError = false) {
      if (navigator.vibrate) navigator.vibrate(duration);
      const shakeTime = isError ? 300 : 150;
      phoneDevice.classList.add('shake-active');
      setTimeout(() => phoneDevice.classList.remove('shake-active'), shakeTime);
    }

    function updateDisplay() {
      numberDisplay.textContent = currentInput;
      if (currentInput.length > 0) displayPlaceholder.classList.add('hidden');
      else displayPlaceholder.classList.remove('hidden');

      if (currentInput === '') {
        if (hasFailed) {
          statusMsg.textContent = '提示：請輸入 1 ➔ 6 ➔ 5';
          statusMsg.className = 'text-xs text-red-400 mt-4 h-5 font-bold';
        } else {
          statusMsg.textContent = '請輸入正確的三碼防詐專線';
          statusMsg.className = 'text-xs text-slate-400 mt-4 h-5 font-medium';
        }
      } else if (currentInput === '1') {
        statusMsg.textContent = '輸入正確，請繼續輸入...';
        statusMsg.className = 'text-xs text-amber-400 mt-4 h-5 font-medium';
      } else if (currentInput === '16') {
        statusMsg.textContent = '最後一步，請輸入最後一個數字';
        statusMsg.className = 'text-xs text-amber-300 mt-4 h-5 font-medium';
      }
    }

    function resetInput() {
      currentInput = '';
      updateDisplay();
    }

    function handleKeyPress(value) {
      const nextIndex = currentInput.length;
      const expectedChar = targetSequence[nextIndex];

      if (value === expectedChar) {
        triggerVibration(50, false);
        currentInput += value;
        updateDisplay();

        if (currentInput === targetSequence) {
          statusMsg.textContent = '成功撥打 165 反詐專線...';
          statusMsg.className = 'text-xs text-emerald-400 mt-4 h-5 font-bold animate-pulse';
          if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 150]);

          setTimeout(() => {
            phoneDevice.classList.remove('shake-active', 'slide-in-entry');
            phoneDevice.classList.add('slide-up-exit');

            setTimeout(() => {
              currentInput = '';
              hasFailed = false;
              topHint.textContent = '你能找出正確的「反詐騙專線」並成功撥打嗎？';
              topHint.className = 'text-sm text-white/70 mt-2 transition-all duration-300';
              updateDisplay();
              phoneDevice.classList.remove('slide-up-exit');
              phoneDevice.classList.add('slide-in-entry');
              setTimeout(() => phoneDevice.classList.remove('slide-in-entry'), 700);
            }, 3000);
          }, 500);
        }
      } else {
        hasFailed = true;
        currentInput = '';
        triggerVibration(100, true);
        updateDisplay();
        topHint.textContent = '正確的防詐專線為 165！';
        topHint.className = 'text-sm text-red-400 font-bold mt-2 transition-all duration-300';
        statusMsg.textContent = '提示：請依序撥打 1 ➔ 6 ➔ 5';
        statusMsg.className = 'text-xs text-red-400 mt-4 h-5 font-bold';
      }
    }

    keyButtons.forEach(button => {
      button.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        handleKeyPress(button.getAttribute('data-value'));
      });
    });

    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerVibration(50, false);
      resetInput();
    });
  }
