import './style.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Chart from 'chart.js/auto'

gsap.registerPlugin(ScrollTrigger)

// ================== 1. 背景與遮罩動態切換 ==================
const bgImage = document.getElementById('bg-image')
const mask = document.getElementById('global-mask')
// 動態毛玻璃強度：隨著 section 被滾動時，模糊值從 0px 增加到 20px
const glassLayer = document.getElementById('glass-layer');
if (glassLayer) {
  ScrollTrigger.create({
    trigger: '#scene-fraud',
    start: 'top bottom',    // 當 section 頂部剛進入視窗底部時開始
    end: 'bottom top',      // 當 section 底部離開視窗頂部時結束
    scrub: 1.5,             // 平滑跟隨滾動，數值越大越延遲
    onUpdate: (self) => {
      // progress 範圍 0 → 1，對應模糊 0px → 20px
      const blurAmount = self.progress * 20;
      glassLayer.style.backdropFilter = `blur(${blurAmount}px)`;
    }
  });
}

// 定義每個章節對應的背景圖（請將圖片放入 /public/images/）
const bgScenes = [
  { trigger: '.step:nth-child(1)', image: '/images/hero.webp' },
  { trigger: '.step:nth-child(2)', image: '/images/chart1-bg.webp' },
  { trigger: '.step:nth-child(4)', image: '/images/internet-bg.webp' },
  { trigger: '.step:nth-child(7)', image: '/images/personality-bg.webp' },
  { trigger: '.step:nth-child(10)', image: '/images/solution-bg.webp' },
]

bgScenes.forEach(scene => {
  ScrollTrigger.create({
    trigger: scene.trigger,
    start: 'top center',
    onEnter: () => { bgImage.src = scene.image },
    onEnterBack: () => { bgImage.src = scene.image }
  })
})

// 遮罩加深（當進入特定沉重段落）
ScrollTrigger.create({
  trigger: '.step:nth-child(5)',
  start: 'top center',
  onEnter: () => mask.classList.add('bg-black/80'),
  onLeaveBack: () => mask.classList.remove('bg-black/80')
})

// ================== 2. 對話氣泡滾動推進 ==================
const bubbles = document.querySelectorAll('.dialogue-bubble')
bubbles.forEach(bubble => {
  gsap.fromTo(bubble,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: bubble.closest('.step'),
        start: 'top 80%',
        end: 'top 30%',
        scrub: 0.8
      }
    }
  )
})

// ================== 3. 圖表一：詐騙金額儀表板（長條圖） ==================
const ctx1 = document.getElementById('fraudChart').getContext('2d')
new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: ['114/1-114/5', '115/1-115/5'],
    datasets: [{
      label: '累計詐騙金額（億元）',
      data: [78.3, 102.6],
      backgroundColor: ['#ef4444', '#b91c1c'],
      borderRadius: 8
    }]
  },
  options: { responsive: true, plugins: { legend: { labels: { color: 'white' } } } }
})

// ================== 4. 圖表四：網路使用習慣（JASP 風格） ==================
const ctx4 = document.getElementById('internetHabitChart').getContext('2d')
new Chart(ctx4, {
  type: 'bar',
  data: {
    labels: ['每日時數', '社群使用', '網購頻率', '線上影音', '遊戲', '金融行為', '總分(滿分35)'],
    datasets: [{
      label: '平均分數 / 時數',
      data: [6.2, 4.8, 3.9, 5.1, 3.2, 2.4, 24.6],
      backgroundColor: '#3b82f6'
    }]
  },
  options: { responsive: true, scales: { y: { max: 35, grid: { color: '#ccc' } } } }
})

// ================== 5. 圖表六：人格特質雷達圖 ==================
const ctx6 = document.getElementById('personalityChart').getContext('2d')
new Chart(ctx6, {
  type: 'radar',
  data: {
    labels: ['高度信任', '過度自信', '執迷不悟', '僥倖心態', '孤獨疏離', '缺乏風險辨識'],
    datasets: [{
      label: '平均得分 (滿分30)',
      data: [22, 19, 14, 20, 17, 23],
      backgroundColor: 'rgba(239,68,68,0.3)',
      borderColor: '#ef4444',
      pointBackgroundColor: 'white'
    }]
  },
  options: { responsive: true, scales: { r: { max: 30, ticks: { color: 'white' } } } }
})

// ================== 6. 圖表八：被騙後習慣改變（長條圖） ==================
const ctx8 = document.getElementById('habitChangeChart').getContext('2d')
new Chart(ctx8, {
  type: 'bar',
  data: {
    labels: ['繼續從事類似活動', '減少或停止'],
    datasets: [{
      data: [65, 35],
      backgroundColor: ['#f97316', '#64748b']
    }]
  },
  options: { responsive: true, plugins: { legend: { display: false } } }
})

// ================== 7. 圖表九：受騙原因（水平長條圖） ==================
const ctx9 = document.getElementById('reasonChart').getContext('2d')
new Chart(ctx9, {
  type: 'bar',
  data: {
    labels: ['貪小便宜', '資訊不足', '情感影響', '過度自信', '社交壓力'],
    datasets: [{
      label: '勾選比例 (%)',
      data: [68, 52, 47, 39, 28],
      backgroundColor: '#a855f7'
    }]
  },
  options: { indexAxis: 'y', responsive: true }
})

// ================== 8. 圖表十：文字雲（動態生成） ==================
const words = [
  { text: '加強宣導', weight: 20 }, { text: '165查證', weight: 18 },
  { text: '延遲匯款', weight: 15 }, { text: '平台責任', weight: 14 },
  { text: '反詐騙App', weight: 12 }, { text: '教育訓練', weight: 10 },
  { text: '報警', weight: 9 }, { text: '冷靜思考', weight: 8 }
]
const cloudContainer = document.getElementById('wordcloud')
function generateWordCloud() {
  cloudContainer.innerHTML = ''
  words.forEach(word => {
    const span = document.createElement('span')
    span.innerText = word.text
    span.className = 'inline-block m-2 transition-all duration-500 opacity-0 scale-75'
    span.style.fontSize = `${12 + word.weight / 2}px`
    span.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`
    cloudContainer.appendChild(span)
  })
  // 滾動觸發動畫
  ScrollTrigger.create({
    trigger: '#wordcloud',
    start: 'top 80%',
    onEnter: () => {
      document.querySelectorAll('#wordcloud span').forEach(span => {
        span.classList.remove('opacity-0', 'scale-75')
        span.classList.add('opacity-100', 'scale-100')
      })
    },
    once: true
  })
}
generateWordCloud()

// ================== 9. 時間軸滾動高亮（可選） ==================
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
  ScrollTrigger.create({
    trigger: item,
    start: 'top 70%',
    onToggle: self => self.isActive && item.classList.add('scale-105', 'transition-transform')
  })
})
