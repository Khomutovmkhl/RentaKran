import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    // 👇 Ключевая настройка для GitHub Pages:
    base: process.env.NODE_ENV === 'production' ? '/RentaKran/' : '/',
})
