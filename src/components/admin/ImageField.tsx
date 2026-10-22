import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Image as ImageIcon } from '@phosphor-icons/react'
import { compressImage, READ_ERROR, type CompressedImage } from '../../services/productImages'
import { formatBytes, labelStyle, secondaryButton } from './shared'

export type ImageSelection =
  | { kind: 'keep' }
  | { kind: 'new'; image: CompressedImage }
  | { kind: 'remove' }

type Props = {
  id: string
  currentUrl: string | null
  value: ImageSelection
  onChange: (value: ImageSelection) => void
  disabled?: boolean
}

export default function ImageField({ id, currentUrl, value, onChange, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [compressing, setCompressing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Las vistas previas se crean y liberan en los handlers (no en un effect que
  // dependa del valor) para que StrictMode no revoque una URL que sigue en uso.
  function replacePreview(blob: Blob | null) {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    objectUrlRef.current = blob ? URL.createObjectURL(blob) : null
    setPreviewUrl(objectUrlRef.current)
  }

  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
  }, [])

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = '' // permite volver a elegir el mismo archivo
    if (!file) return

    setError(null)
    setCompressing(true)
    try {
      const image = await compressImage(file)
      replacePreview(image.blob)
      onChange({ kind: 'new', image })
    } catch (err) {
      setError(err instanceof Error ? err.message : READ_ERROR)
    } finally {
      setCompressing(false)
    }
  }

  function handleRemove() {
    setError(null)
    replacePreview(null)
    onChange(currentUrl ? { kind: 'remove' } : { kind: 'keep' })
  }

  function handleUndoRemove() {
    onChange({ kind: 'keep' })
  }

  const shownUrl = value.kind === 'new' ? previewUrl : value.kind === 'keep' ? currentUrl : null
  const busy = disabled || compressing

  return (
    <div style={{ marginBottom: '1rem' }}>
      <span style={labelStyle} id={`${id}-label`}>Foto</span>

      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 3',
        borderRadius: 8,
        overflow: 'hidden',
        background: '#f3f7fb',
        border: '1.5px dashed #cfe0ee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0.6rem',
      }}>
        {shownUrl ? (
          <img
            src={shownUrl}
            alt="Vista previa de la foto del producto"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ textAlign: 'center', color: '#5a8ab0', fontSize: '0.875rem' }}>
            <ImageIcon size={40} weight="thin" aria-hidden />
            <div>{value.kind === 'remove' ? 'La foto se quita al guardar' : 'Sin foto'}</div>
          </div>
        )}
        {compressing && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#1a3a50', fontSize: '0.9rem', fontWeight: 600,
          }}>
            Comprimiendo foto…
          </div>
        )}
      </div>

      {value.kind === 'new' && (
        <p style={{ margin: '0 0 0.6rem', color: '#1a3a50', fontSize: '0.875rem' }} aria-live="polite">
          Foto nueva: {formatBytes(value.image.blob.size)} ({value.image.ext.toUpperCase()}). Se sube al guardar.
        </p>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-labelledby={`${id}-label`}
        onChange={handleFile}
        disabled={busy}
        hidden
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          style={{ ...secondaryButton, opacity: busy ? 0.6 : 1 }}
        >
          {shownUrl ? 'Cambiar foto' : 'Elegir foto'}
        </button>
        {shownUrl && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={busy}
            style={{ ...secondaryButton, borderColor: '#c0392b', color: '#c0392b', opacity: busy ? 0.6 : 1 }}
          >
            Quitar foto
          </button>
        )}
        {value.kind === 'remove' && (
          <button type="button" onClick={handleUndoRemove} disabled={busy} style={secondaryButton}>
            Deshacer
          </button>
        )}
      </div>

      {error && (
        <p role="alert" style={{ color: '#c0392b', fontSize: '0.875rem', margin: '0.5rem 0 0' }}>
          {error}
        </p>
      )}
    </div>
  )
}
