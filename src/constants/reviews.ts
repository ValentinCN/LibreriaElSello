/* Reseñas reales del perfil de Google del local (GOOGLE_MAPS_URL en config.ts).
   Texto EXACTO, copiado a mano: no editar ni "mejorar". Todas de 5 estrellas.
   No van al JSON-LD: Google no acepta reseñas mostradas por el mismo negocio. */

export interface Review {
  autor: string
  texto: string
  estrellas: number
}

// Puntaje y cantidad del perfil al 22/10/2026. El título muestra "más de 260".
export const GOOGLE_RATING  = 4.7
export const GOOGLE_REVIEWS = 263

export const REVIEWS: Review[] = [
  {
    autor: 'Romina D.',
    texto: 'Excelente atención y asesoramiento. Librería muy bien surtida. Si no lo ves preguntá, porque tienen de todo. Recomiendo 100%.',
    estrellas: 5,
  },
  {
    autor: 'Daiana S.',
    texto: 'Muy recomendable. Fui a comprar acrílicos para hacer manualidades sobre fibrofácil, la vendedora me asesoró muy bien y fue muy simpática. Tiene mucha variedad de productos y marcas a precios razonables.',
    estrellas: 5,
  },
  {
    autor: 'Clara V.',
    texto: 'Excelente atención, desde hace más de 20 años que compro ahí.',
    estrellas: 5,
  },
  {
    autor: 'Julian C.',
    texto: 'Realmente encuentran de todo en esta librería […] tienen útiles únicos para estudiantes, profesores, oficinas, profesionales.',
    estrellas: 5,
  },
]
