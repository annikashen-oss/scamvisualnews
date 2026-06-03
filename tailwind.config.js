/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // 覆蓋預設的 sans（無襯線）
        sans: ['"Noto Sans TC"', 'system-ui', '-apple-system', 'sans-serif'],
        // 襯線體
        serif: ['"Noto Serif TC"', 'Georgia', 'serif'],
        // 等寬體
        mono: ['"Fira Code"', 'monospace'],
        // 手寫體（Cursive）
        cursive: ['Gaegu', 'cursive'],
        // 裝飾體（Fantasy）
        fantasy: ['"Rubik Glitch"', 'fantasy'],
      },
    },
  },
  plugins: [],
}
