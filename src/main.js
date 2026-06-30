import './style.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 0. 確保 DOM 完全載入後再執行
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

// ==========================================
// 🎬 開場自動進場 + 滾動轉場序列
// ==========================================
const introVideo = document.getElementById("intro-video");

// 1. 網頁剛載入時：「自動播放」開門與標題彈出
gsap.set(".glitch-text", { scale: 0.8, opacity: 0 }); 
gsap.set("#intro-title p", { opacity: 0, y: 20 });   
gsap.set("#scroll-hint-global", { opacity: 0 });     

const initTl = gsap.timeline();
initTl.to("#intro-gate-top", { yPercent: -100, duration: 1.2, ease: "power3.inOut" }, 0.2)
      .to("#intro-gate-bottom", { yPercent: 100, duration: 1.2, ease: "power3.inOut" }, 0.2)
      .to(".glitch-text", { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.4)" }, 1.0)
      .to("#intro-title p", { opacity: 1, y: 0, duration: 1 }, 1.5)
      .to("#scroll-hint-global", { opacity: 1, duration: 1 }, 2.0);

// 2. 滑鼠滾動時：控制後續的轉場
const masterIntroTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#master-intro",
    start: "top top",
    end: "+=4000",
    scrub: 1,
    pin: true,
    onUpdate: (self) => {
      if (introVideo) {
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
  .to("#intro-title", { opacity: 0, filter: "blur(10px)", scale: 0.9, duration: 1, ease: "none" }, 0)
  .to("#intro-video-container", { opacity: 1, duration: 1, ease: "none" }, 1)
  .to({}, { duration: 2 }, 2)
  .to("#intro-video-container", { opacity: 0, duration: 1, ease: "none" }, 4)
  .to("#intro-title", { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1, ease: "none" }, 5)
  .to("#intro-gate-top", { yPercent: 0, duration: 1, ease: "power2.inOut" }, 6)
  .to("#intro-gate-bottom", { yPercent: 0, duration: 1, ease: "power2.inOut" }, 6)
  .to("#scroll-hint-global", { opacity: 0, duration: 0.5 }, 6);

// ==========================================
// 3. 故事主線：角色走路（如果元素存在）
// ==========================================
const boyCharacter = document.getElementById("boy-character");
if (boyCharacter) {
  gsap.to(boyCharacter, {
    x: window.innerWidth - 100,
    scrollTrigger: {
      trigger: "#story-section",
      start: "top top",
      end: "bottom bottom",
      scrub: 2
    }
  });
}

// ==========================================
// 4. 背景顏色漸變（如果 story-section 存在）
// ==========================================
const storySection = document.getElementById("story-section");
if (storySection) {
  gsap.to("body", {
    backgroundColor: "#2e1065", 
    scrollTrigger: {
      trigger: storySection,
      start: "top top",
      end: "bottom bottom",
      scrub: 2
    }
  });
}

// ==========================================
// ★ 互動小遊戲：Tinder Swipe 搶票大作戰
// ==========================================
const gameSection = document.getElementById('game-section');
const cardContainer = document.getElementById('card-container');
const resultScreen = document.getElementById('result-screen');
const restartBtn = document.getElementById('restart-btn');

// ⚠️ 只有當所有遊戲元素都存在時才執行
if (gameSection && cardContainer && resultScreen && restartBtn) {
  console.log('✅ 遊戲區塊已找到，初始化中...');

  // 遊戲題庫與結果資料
  const swipeQuestions = [
    {
      trait: "overconfident",
      category: "【過度自信】",
      text: "對方頭像空白、帳號剛創立。但你憑直覺認為「這就是我苦等已久的機會，我判斷人很準」，決定立刻私訊交易？",
      hintLeft: "👈 覺得是假帳號",
      hintRight: "👉 相信直覺私訊"
    },
    {
      trait: "trusting",
      category: "【易信任他人】",
      text: "對方傳了「身分證」與「識別證」，保證：「我是內部員工，騙你我就沒工作啦！」你會因此放下戒心嗎？",
      hintLeft: "👈 可能是盜圖的",
      hintRight: "👉 相信他是真人"
    },
    {
      trait: "poorDefense",
      category: "【缺乏防識能力】",
      text: "賣家表示：「為了避免被查黃牛，請你去超商買『Apple Store 點數卡』給我當作票款。」你會出門買點數嗎？",
      hintLeft: "👈 買點數就是詐騙",
      hintRight: "👉 買點數拿到票就好"
    },
    {
      trait: "isolated",
      category: "【社交疏離】",
      text: "賣家催促：「只給你 5 分鐘。」你怕被朋友唸，決定不跟任何人討論，自己默默處理掉？",
      hintLeft: "👈 截圖問朋友意見",
      hintRight: "👉 自己決定就好"
    },
    {
      trait: "fluke",
      category: "【僥倖心態】",
      text: "超商機台寫著「買點數換門票是詐騙」。但你心想：「新聞報的受害者太笨，我運氣沒那麼差。」你會繼續操作嗎？",
      hintLeft: "👈 寧可沒票也不賭",
      hintRight: "👉 詐騙哪那麼容易遇到"
    },
    {
      trait: "stubborn",
      category: "【執迷不悟】",
      text: "改用網銀轉帳時，APP 跳出「警示帳戶」警告。但你滿腦子只剩下偶像，覺得是系統誤判，堅持轉帳？",
      hintLeft: "👈 立刻終止交易",
      hintRight: "👉 不管了票比較重要"
    }
  ];

  const resultData = {
    overconfident: { 
      title: "😎 聰明反被聰明誤的自信肥羊", 
      warning: "過度自信會讓你忽略微小的危險訊號！現代詐騙會客製化腳本，越是覺得自己不可能被騙的人，越容易掉入陷阱。" 
    },
    trusting: { 
      title: "🥺 輕易掏心的濫好人肥羊", 
      warning: "「這是我身分證你可以查」。小心！這些證件 99% 都是盜用的。過度信任對方主動提供的單方面證據，最容易落入陷阱。" 
    },
    poorDefense: { 
      title: "🚪 門戶大開的無防備肥羊", 
      warning: "當對方要求你繞過正常交易規則（如買遊戲點數、空著匯款備註），防備心一定要拉到最高！" 
    },
    isolated: { 
      title: "🐺 孤軍奮戰的獨行俠肥羊", 
      warning: "詐騙集團最愛你不跟外界討論！當局者迷，買票前多問問身邊朋友的意見，就能打破封閉的資訊環境。" 
    },
    fluke: { 
      title: "🎲 鐵齒賭一把的僥倖肥羊", 
      warning: "「我運氣沒那麼差」。千萬別無視官方的防詐跑馬燈！詐騙集團就是利用你這種「不會發生在我身上」的僥倖心態得逞。" 
    },
    stubborn: { 
      title: "🗿 堅持己見的鐵頭功肥羊", 
      warning: "當系統或朋友發出警告時，請務必停下腳步！詐騙集團常利用粉絲迫切想看演唱會的心理，讓你產生執念而忽視所有危險訊號。" 
    },
    safe: { 
      title: "🛡️ 完美防禦的防詐大師！", 
      warning: "太棒了！你在每個環節都守住了防線。請繼續保持這種敏銳的警覺心，並將防詐觀念分享給身邊的朋友！" 
    }
  };

  let userFails = [];

  function initCards() {
    // 清空容器
    cardContainer.innerHTML = '';
    userFails = [];
    
    // 隱藏結果畫面
    resultScreen.classList.add('hidden');
    resultScreen.classList.remove('flex', 'opacity-100', 'scale-100');
    
    // 複製題庫並反轉順序（讓第一張卡片在最上面）
    const reversedQuestions = [...swipeQuestions].reverse();
    reversedQuestions.forEach((q, index) => {
      const card = document.createElement('div');
      card.className = `absolute w-full h-full bg-[#FCFAF2] rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between p-6 text-center cursor-grab tinder-card border border-gray-200`;
      
      // 用 GSAP 設定位置和縮放
      gsap.set(card, { 
        zIndex: reversedQuestions.length - index,
        y: index * 4, 
        scale: 1 - (index * 0.02)
      });

      card.innerHTML = `
        <div class="w-full text-left mb-2 text-sm font-bold text-[#83637D]">${q.category}</div>
        <p class="text-lg font-bold text-gray-800 leading-relaxed flex-grow flex items-center">${q.text}</p>
        <div class="flex justify-between w-full text-xs font-bold text-gray-500 mt-4 border-t border-gray-200 pt-4">
          <span class="text-green-600">${q.hintLeft}</span>
          <span class="text-red-500">${q.hintRight}</span>
        </div>
      `;
      
      makeDraggable(card, reversedQuestions[index].trait);
      cardContainer.appendChild(card);
    });
    
    console.log(`✅ 已生成 ${reversedQuestions.length} 張卡片`);
  }

  function makeDraggable(element, trait) {
    let startX = 0, currentX = 0, isDragging = false;

    const dragStart = (e) => {
      isDragging = true;
      startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      element.style.transition = 'none';
      element.classList.replace('cursor-grab', 'cursor-grabbing');
    };

    const dragMove = (e) => {
      if (!isDragging) return;
      const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      currentX = x - startX;
      const rotate = currentX * 0.05;
      
      let bgOpacity = Math.min(Math.abs(currentX) / 200, 0.2);
      let bgColor = currentX > 0 ? `rgba(239, 68, 68, ${bgOpacity})` : `rgba(34, 197, 94, ${bgOpacity})`;
      
      element.style.transform = `translateX(${currentX}px) rotate(${rotate}deg)`;
      element.style.backgroundColor = bgColor;
    };

    const dragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      element.classList.replace('cursor-grabbing', 'cursor-grab');

      if (currentX > 80) {
        // 向右滑 → 受騙
        userFails.push(trait);
        flyOut(element, 1);
      } else if (currentX < -80) {
        // 向左滑 → 安全
        flyOut(element, -1);
      } else {
        // 彈回原位
        gsap.to(element, { x: 0, rotation: 0, backgroundColor: "#FCFAF2", duration: 0.4, ease: "back.out(1.5)" });
      }
      currentX = 0;
    };

    // 綁定事件
    element.addEventListener('mousedown', dragStart);
    window.addEventListener('mousemove', dragMove);
    window.addEventListener('mouseup', dragEnd);
    
    element.addEventListener('touchstart', dragStart, { passive: true });
    window.addEventListener('touchmove', dragMove, { passive: true });
    window.addEventListener('touchend', dragEnd);
  }

  function flyOut(element, direction) {
    gsap.to(element, {
      x: direction * window.innerWidth,
      rotation: direction * 30,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        element.remove();
        checkGameOver();
      }
    });
  }

  function checkGameOver() {
    if (cardContainer.children.length === 0) {
      let finalResultKey = "safe";
      
      if (userFails.length > 0) {
        finalResultKey = userFails[0];
      }

      const resultTitle = document.getElementById('result-title');
      const resultWarning = document.getElementById('result-warning');
      if (resultTitle && resultWarning) {
        resultTitle.innerText = resultData[finalResultKey].title;
        resultWarning.innerText = resultData[finalResultKey].warning;
      }
      
      // 顯示結果
      resultScreen.classList.remove('hidden');
      resultScreen.classList.add('flex');
      gsap.to(resultScreen, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" });
    }
  }

  // 重新開始按鈕
  restartBtn.addEventListener('click', () => {
    gsap.to(resultScreen, { 
      opacity: 0, scale: 0.9, duration: 0.3, 
      onComplete: () => initCards() 
    });
  });

  // 啟動遊戲
  initCards();
} else {
  console.warn('⚠️ 遊戲區塊元素不完整，跳過遊戲初始化');
  console.log('缺少的元素:', {
    gameSection: !!gameSection,
    cardContainer: !!cardContainer,
    resultScreen: !!resultScreen,
    restartBtn: !!restartBtn
  });
}

// ==========================================
// 5. 首尾呼應：結尾動畫 (Outro)
// ==========================================
const outroSection = document.getElementById("outro-section");
if (outroSection) {
  const outroTl = gsap.timeline({
    scrollTrigger: {
      trigger: outroSection,
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
}

// ==========================================
// 6. 全局文字、圖表交錯捲動浮現 (Reveal)
// ==========================================
const revealItems = gsap.utils.toArray('.reveal-item');
if (revealItems.length > 0) {
  gsap.set(revealItems, { y: 40, autoAlpha: 0 }); 
  revealItems.forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 85%",
      onEnter: () => gsap.to(item, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" })
    });
  });
}

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

if (phoneDevice && numberDisplay) {
  console.log('✅ 手機撥號器已初始化');
  
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
    if (displayPlaceholder) {
      if (currentInput.length > 0) {
        displayPlaceholder.classList.add('hidden');
      } else {
        displayPlaceholder.classList.remove('hidden');
      }
    }

    if (statusMsg) {
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
  }

  function resetInput() {
    currentInput = '';
    hasFailed = false;
    updateDisplay();
    if (topHint) {
      topHint.textContent = '你能找出正確的「反詐騙專線」並成功撥打嗎？';
      topHint.className = 'text-sm text-white/70 mt-2 transition-all duration-300';
    }
  }

  function handleKeyPress(value) {
    const nextIndex = currentInput.length;
    const expectedChar = targetSequence[nextIndex];

    if (value === expectedChar) {
      triggerVibration(50, false);
      currentInput += value;
      updateDisplay();

      if (currentInput === targetSequence) {
        if (statusMsg) {
          statusMsg.textContent = '✅ 成功撥打 165 反詐專線！';
          statusMsg.className = 'text-xs text-emerald-400 mt-4 h-5 font-bold animate-pulse';
        }
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 150]);

        setTimeout(() => {
          resetInput();
          if (statusMsg) {
            statusMsg.textContent = '🎉 你已學會撥打 165，保護自己與身邊的人！';
            statusMsg.className = 'text-xs text-emerald-300 mt-4 h-5 font-bold';
          }
        }, 2000);
      }
    } else {
      hasFailed = true;
      currentInput = '';
      triggerVibration(100, true);
      updateDisplay();
      if (topHint) {
        topHint.textContent = '❌ 正確的防詐專線為 165！';
        topHint.className = 'text-sm text-red-400 font-bold mt-2 transition-all duration-300';
      }
      if (statusMsg) {
        statusMsg.textContent = '提示：請依序撥打 1 ➔ 6 ➔ 5';
        statusMsg.className = 'text-xs text-red-400 mt-4 h-5 font-bold';
      }
    }
  }

  keyButtons.forEach(button => {
    button.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      handleKeyPress(button.getAttribute('data-value'));
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetInput();
    });
  }
}

// ==========================================
// 7. 控制台訊息
// ==========================================
console.log('✅ 所有腳本已成功載入！');

}); // 結束 DOMContentLoaded
