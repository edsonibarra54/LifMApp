import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    svgr()
  ],
})
