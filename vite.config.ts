import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    // Указываем базовый путь для GitHub Pages
    base: '/', // Это создаст относительные пути в сборке
    build: {
        cssCodeSplit: false, // собирать всё в один файл
        assetsInlineLimit: 10000, // встраивать файлы меньше 10кб прямо в код
    },
})