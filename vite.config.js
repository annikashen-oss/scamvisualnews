import { defineConfig } from 'vite'

export default defineConfig({
  // 這是 GitHub Pages 部署必備的設定
  // 您的專案名稱是 scamvisualnews，所以這裡必須這樣設定，網頁才不會破圖
  base: '/scamvisualnews/', 
})
