import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    // Указываем базовый путь для GitHub Pages
    base: '/', // Это создаст относительные пути в сборке
})