// scripts/generate-sitemap.js
import { writeFileSync } from 'fs';
import { format } from 'date-fns';

// Получаем дату в формате ГГГГ-ММ-ДД
const currentDate = format(new Date(), 'yyyy-MM-dd');

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://rentakran76.ru/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>`;

writeFileSync('./public/sitemap.xml', sitemapContent);
console.log('✅ Sitemap обновлён с датой:', currentDate);