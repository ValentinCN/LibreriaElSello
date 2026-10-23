export const WA_NUMBER   = '541137723335'
export const WA_URL      = `https://wa.me/${WA_NUMBER}`
export const WA_CONSULTA = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola! Quería hacer una consulta')}`

export const DIRECCION        = 'Rivadavia 341, Quilmes Centro'
export const CIUDAD           = 'Buenos Aires, Argentina'
export const HORARIO          = 'Lun–Sáb 9 a 20hs'
export const HORARIO_TEL      = '11 3772-3335'

export const INSTAGRAM_HANDLE = '@libreriaelsello'
export const INSTAGRAM_URL    = 'https://www.instagram.com/libreriaelsello'

export const MAPS_URL   = `https://maps.google.com/?q=${encodeURIComponent('Rivadavia 341, Quilmes Centro, Buenos Aires')}`
export const MAPS_EMBED = 'https://maps.google.com/maps?q=Rivadavia+341,+Quilmes,+Buenos+Aires,+Argentina&output=embed&z=16'

const WA_TEXT_PRODUCTOS = 'Hola! Quería hacer una consulta sobre los productos de Librería el Sello.'
export const WA_PRODUCTOS = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT_PRODUCTOS)}`

// Mismo patrón que CartDrawer/ProductCard: WA_URL + texto precargado.
export const waLink = (texto: string) => `${WA_URL}?text=${encodeURIComponent(texto)}`
export const WA_LISTA_COLEGIO = waLink('Hola! Les quiero mandar la lista del colegio.')

export const ENVIOS_ZONA = 'Quilmes y alrededores'
