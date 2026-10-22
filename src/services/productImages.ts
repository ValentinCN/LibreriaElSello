import { supabase } from './supabase'

const BUCKET = 'productos'
const MAX_SIDE = 1200
const MAX_BYTES = 2 * 1024 * 1024
const QUALITIES = [0.82, 0.7, 0.6, 0.5, 0.4]
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const TYPE_ERROR = 'Ese archivo no es una foto válida. Usá una imagen JPG, PNG o WebP.'
export const READ_ERROR = 'No se pudo leer la imagen. Probá con una foto JPG o PNG.'

export type CompressedImage = {
  blob: Blob
  ext: 'webp' | 'jpg'
  contentType: 'image/webp' | 'image/jpeg'
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality))
}

export async function compressImage(file: File): Promise<CompressedImage> {
  if (!ALLOWED_TYPES.includes(file.type)) throw new Error(TYPE_ERROR)

  let bitmap: ImageBitmap
  try {
    // from-image respeta el EXIF: las fotos del celular no quedan rotadas.
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    throw new Error(READ_ERROR)
  }

  try {
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
    const width = Math.round(bitmap.width * scale)
    const height = Math.round(bitmap.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error(READ_ERROR)
    ctx.drawImage(bitmap, 0, 0, width, height)

    // Safari/iOS no codifica WebP: devuelve PNG sin avisar. Se detecta por blob.type.
    const probe = await toBlob(canvas, 'image/webp', QUALITIES[0])
    const useWebp = probe?.type === 'image/webp'
    const contentType = useWebp ? 'image/webp' : 'image/jpeg'

    if (!useWebp) {
      // JPEG no tiene alfa: sin fondo blanco, los PNG transparentes salen negros.
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(bitmap, 0, 0, width, height)
    }

    let blob = useWebp ? probe : await toBlob(canvas, contentType, QUALITIES[0])
    for (let i = 1; blob && blob.size > MAX_BYTES && i < QUALITIES.length; i++) {
      blob = await toBlob(canvas, contentType, QUALITIES[i])
    }

    if (!blob || blob.type !== contentType) throw new Error(READ_ERROR)
    if (blob.size > MAX_BYTES) throw new Error('La foto sigue pesando más de 2 MB después de comprimirla. Probá con otra.')

    return { blob, ext: useWebp ? 'webp' : 'jpg', contentType }
  } finally {
    bitmap.close()
  }
}

export async function uploadProductImage(productId: number, image: CompressedImage) {
  // Nombre único por foto: sin upsert y con caché de 1 año sin riesgo de servir una vieja.
  const path = `products/${productId}/${Date.now()}.${image.ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, image.blob, {
    contentType: image.contentType,
    cacheControl: '31536000',
    upsert: false,
  })
  if (error) throw error

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { path, publicUrl: data.publicUrl }
}

export function storageErrorMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : ''
  if (msg === TYPE_ERROR || msg === READ_ERROR) return msg
  if (/row-level security|unauthorized|403/i.test(msg)) return 'No tenés permisos para subir fotos.'
  if (/maximum allowed size|too large|413/i.test(msg)) return 'La foto pesa demasiado (máximo 2 MB).'
  if (/mime/i.test(msg)) return TYPE_ERROR
  return 'No se pudo subir la foto. Revisá la conexión y probá de nuevo.'
}

const PUBLIC_PREFIX =
  `${String(import.meta.env.VITE_SUPABASE_URL).replace(/\/+$/, '')}/storage/v1/object/public/${BUCKET}/`

function pathFromUrlOrPath(value: string): string | null {
  if (value.startsWith('products/')) return value
  if (!value.startsWith(PUBLIC_PREFIX)) return null // URL externa u otro bucket: no es nuestra
  const path = decodeURIComponent(value.slice(PUBLIC_PREFIX.length).split(/[?#]/)[0])
  return path || null
}

/** Nunca tira: un fallo al borrar no debe romper el guardado. Devuelve si se borró. */
export async function deleteProductImage(publicUrlOrPath: string | null): Promise<boolean> {
  if (!publicUrlOrPath) return false
  const path = pathFromUrlOrPath(publicUrlOrPath)
  if (!path) return false

  try {
    const { data, error } = await supabase.storage.from(BUCKET).remove([path])
    // Con RLS bloqueando, remove() no da error: devuelve data vacío.
    if (error || !data || data.length === 0) {
      console.warn('[el-Sello] No se pudo borrar la foto del bucket:', path, error?.message ?? 'sin permisos o inexistente')
      return false
    }
    return true
  } catch (e) {
    console.warn('[el-Sello] No se pudo borrar la foto del bucket:', path, e)
    return false
  }
}
