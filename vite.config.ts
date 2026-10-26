import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {
  SITE_URL, HORARIO_TEL, DIRECCION_CALLE, LOCALIDAD, PROVINCIA,
  HORARIO_ABRE, HORARIO_CIERRA, INSTAGRAM_URL,
} from './src/config.ts'

// Páginas públicas del sitemap (sin /admin).
const PUBLIC_PATHS = ['/', '/catalogo', '/envios', '/conocenos']

// Datos del local para Google. Sin AggregateRating ni Review: Google no
// acepta reseñas mostradas por el mismo negocio. Sin geo ni priceRange
// (no confirmados).
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Librería el Sello',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-image.png`,
  telephone: `+54 ${HORARIO_TEL}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: DIRECCION_CALLE,
    addressLocality: LOCALIDAD,
    addressRegion: PROVINCIA,
    addressCountry: 'AR',
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: HORARIO_ABRE,
    closes: HORARIO_CIERRA,
  }],
  sameAs: [INSTAGRAM_URL],
}

// El rastreo NO se bloquea a propósito (salvo /admin): si Google no puede
// entrar, no ve el noindex. La web no se indexa por el <meta name="robots"> de
// index.html y el header X-Robots-Tag de vercel.json. Para indexar: sacar
// ambos y dar de alta el sitemap en Google Search Console.
const ROBOTS = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml
`

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PUBLIC_PATHS.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n')}
</urlset>
`

// index.html queda estático (WhatsApp no ejecuta JS): las URLs absolutas y el
// JSON-LD se escriben en el build a partir de config.ts.
function seo(): Plugin {
  return {
    name: 'el-sello-seo',
    // 'pre': antes del reemplazo %VITE_*% de Vite, que avisaría por %SITE_URL%.
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html
        .replaceAll('%SITE_URL%', SITE_URL)
        .replace('<!--jsonld-->',
          `<script type="application/ld+json">${JSON.stringify(JSON_LD)}</script>`),
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: ROBOTS })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: SITEMAP })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    seo(),
  ],
})
