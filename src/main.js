import './style.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
