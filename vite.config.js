import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 如果部署到 GitHub Pages，請將 base 改為你的 repo 名稱
// 例如：base: '/resignation-stamp-card/'
export default defineConfig({
  plugins: [react()],
  base: '/byebyecard/',
})
