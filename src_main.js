import './style.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Chart from 'chart.js/auto'

gsap.registerPlugin(ScrollTrigger)

// ================== 1. 遮罩動態加深（背景已改為漸層，無需切換圖片） ==================
const mask = document.getElementById('global-mask')
// 確保初始為透明
mask.classList.add('bg-black/0')

ScrollTrigger.create({
  trigger: '.step:nth-child(5)',  // 請依實際段落調整
  start: 'top center',
  onEnter: () => mask.classList.replace('bg-black/0', 'bg-black/80'),
  onLeaveBack: () => mask.classList.replace('bg-black/80', 'bg-black/0')
})

// ================== 2. 動態毛玻璃強度（作用於實際卡片） ==================
const fraudCard = document.getElementById('fraud-glass-card')
if (fraudCard) {
  ScrollTrigger.create({
    trigger: '#scene-fraud',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.5,
    onUpdate: (self) => {
      const blurAmount = self.progress * 20  // 0 → 20px
      fraudCard.style.backdropFilter = `blur(${blurAmount}px)`
    }
  })
}

// ================== 3. 對話氣泡滾動推進 ==================
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

// ================== 4. 圖表一：詐騙金額儀表板 ==================
const fraudCanvas = document.getElementById('fraudChart')
if (fraudCanvas) {
  new Chart(fraudCanvas.getContext('2d'), {
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
}

// ================== 5. 圖表四：網路使用習慣 ==================
const internetCanvas = document.getElementById('internetHabitChart')
if (internetCanvas) {
  new Chart(internetCanvas.getContext('2d'), {
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
}

// ================== 6. 圖表六：人格特質雷達圖 ==================
const personalityCanvas = document.getElementById('personalityChart')
if (personalityCanvas) {
  new Chart(personalityCanvas.getContext('2d'), {
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
}

// ================== 7. 圖表八：被騙後習慣改變 ==================
const habitCanvas = document.getElementById('habitChangeChart')
if (habitCanvas) {
  new Chart(habitCanvas.getContext('2d'), {
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
}

// ================== 8. 圖表九：受騙原因（水平長條圖） ==================
const reasonCanvas = document.getElementById('reasonChart')
if (reasonCanvas) {
  new Chart(reasonCanvas.getContext('2d'), {
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
}

// ================== 9. 文字雲（動態生成） ==================
const words = [
  { text: '加強宣導', weight: 20 }, { text: '165查證', weight: 18 },
  { text: '延遲匯款', weight: 15 }, { text: '平台責任', weight: 14 },
  { text: '反詐騙App', weight: 12 }, { text: '教育訓練', weight: 10 },
  { text: '報警', weight: 9 }, { text: '冷靜思考', weight: 8 }
]
const cloudContainer = document.getElementById('wordcloud')
function generateWordCloud() {
  if (!cloudContainer) return
  cloudContainer.innerHTML = ''
  words.forEach(word => {
    const span = document.createElement('span')
    span.innerText = word.text
    span.className = 'inline-block m-2 transition-all duration-500 opacity-0 scale-75'
    span.style.fontSize = `${12 + word.weight / 2}px`
    span.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`
    cloudContainer.appendChild(span)
  })
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

// ================== 10. 時間軸滾動高亮 ==================
gsap.utils.toArray('.timeline-item').forEach((item) => {
  ScrollTrigger.create({
    trigger: item,
    start: 'top 70%',
    onToggle: self => self.isActive && item.classList.add('scale-105', 'transition-transform')
  })
})
