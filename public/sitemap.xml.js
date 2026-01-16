// public/sitemap.xml.js
const currentDate = new Date().toISOString().split('T')[0] // Получаем ГГГГ-ММ-ДД

export const render = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://rentakran76.ru/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>`

// Указываем MIME-тип для корректного ответа сервера
export const headers = {
    'Content-Type': 'application/xml'
}