import { useState } from 'react'
import type { FormEvent } from 'react'
import { createProduct, setProductImage } from '../../services/products'
import { uploadProductImage, deleteProductImage } from '../../services/productImages'
import type { ProductoSupabase, CategoriaSupabase } from '../../types/producto'
import AdminModal from './AdminModal'
import ImageField, { type ImageSelection } from './ImageField'
import {
  labelStyle, inputStyle, primaryButton, secondaryButton, errorBox,
  PERMISOS_MSG, esErrorDePermisos, parsePrecio,
} from './shared'

const DESC_MAX = 200
const FOTO_FALLIDA_MSG = 'Producto creado, pero la foto no se pudo subir. Podés agregarla editándolo.'

type Props = {
  categorias: CategoriaSupabase[]
  /** aviso != null cuando el producto se creó pero la foto falló. */
  onCreated: (producto: ProductoSupabase, aviso: string | null) => void
  onCancel: () => void
}

const checkRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  minHeight: 44,
  color: '#1a3a50',
  fontSize: '1rem',
  cursor: 'pointer',
}

export default function ProductCreateForm({ categorias, onCreated, onCancel }: Props) {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [categoriaId, setCategoriaId] = useState<number | ''>('')
  const [destacado, setDestacado] = useState(false)
  const [disponible, setDisponible] = useState(true)
  const [imagen, setImagen] = useState<ImageSelection>({ kind: 'keep' })
  const [step, setStep] = useState<'idle' | 'saving' | 'uploading'>('idle')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  const busy = step !== 'idle'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setValidationError(null)
    setSaveError(null)

    const nombreTrim = nombre.trim()
    const precioNum = parsePrecio(precio)

    if (!nombreTrim) {
      setValidationError('El nombre es obligatorio.')
      return
    }
    if (categoriaId === '') {
      setValidationError('Elegí una categoría.')
      return
    }
    if (Number.isNaN(precioNum) || precioNum <= 0) {
      setValidationError('El precio debe ser un número mayor a 0.')
      return
    }

    // 1) Insert para obtener el id (la ruta de la foto lo necesita).
    setStep('saving')
    const descripcionFinal = descripcion.trim() ? descripcion.trim() : null
    const { data, error } = await createProduct({
      nombre: nombreTrim,
      descripcion: descripcionFinal,
      precio: precioNum,
      categoriaId,
      destacado,
      disponible,
    })

    if (error || !data) {
      setSaveError(esErrorDePermisos(error?.code) ? PERMISOS_MSG : 'No se pudo crear el producto. Probá de nuevo.')
      setStep('idle')
      return
    }

    const nuevo: ProductoSupabase = {
      id: data.id,
      nombre: nombreTrim,
      descripcion: descripcionFinal,
      categoria: categorias.find((c) => c.id === categoriaId)?.slug ?? '',
      precio: precioNum,
      imagen_url: null,
      activo: true,
      destacado,
      disponible,
      orden: data.orden ?? 0,
    }

    if (imagen.kind !== 'new') {
      onCreated(nuevo, null)
      return
    }

    // 2) Foto: si falla, el producto ya existe y queda sin foto.
    setStep('uploading')
    let uploaded: { path: string; publicUrl: string }
    try {
      uploaded = await uploadProductImage(data.id, imagen.image)
    } catch {
      onCreated(nuevo, FOTO_FALLIDA_MSG)
      return
    }

    const { error: imgError } = await setProductImage(data.id, uploaded.publicUrl)
    if (imgError) {
      void deleteProductImage(uploaded.path)
      onCreated(nuevo, FOTO_FALLIDA_MSG)
      return
    }

    onCreated({ ...nuevo, imagen_url: uploaded.publicUrl }, null)
  }

  return (
    <AdminModal title="Nuevo producto" busy={busy} onClose={onCancel} onSubmit={handleSubmit}>
      <div style={{ marginBottom: '0.9rem' }}>
        <label style={labelStyle} htmlFor="new-nombre">Nombre *</label>
        <input
          id="new-nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={inputStyle}
          disabled={busy}
          required
        />
      </div>

      <div style={{ marginBottom: '0.9rem' }}>
        <label style={labelStyle} htmlFor="new-categoria">Categoría *</label>
        <select
          id="new-categoria"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value ? Number(e.target.value) : '')}
          style={inputStyle}
          disabled={busy}
          required
        >
          <option value="">Elegí una categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '0.9rem' }}>
        <label style={labelStyle} htmlFor="new-precio">Precio *</label>
        <input
          id="new-precio"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="Ej: 1500 o 1500,50"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          style={inputStyle}
          disabled={busy}
          required
        />
      </div>

      <div style={{ marginBottom: '0.9rem' }}>
        <label style={labelStyle} htmlFor="new-descripcion">Descripción (opcional)</label>
        <textarea
          id="new-descripcion"
          value={descripcion}
          maxLength={DESC_MAX}
          onChange={(e) => setDescripcion(e.target.value)}
          rows={3}
          aria-describedby="new-descripcion-count"
          style={{ ...inputStyle, resize: 'vertical' }}
          disabled={busy}
        />
        <div id="new-descripcion-count" style={{ textAlign: 'right', fontSize: '0.8rem', color: '#5a8ab0' }}>
          {descripcion.length}/{DESC_MAX}
        </div>
      </div>

      <ImageField id="new-foto" currentUrl={null} value={imagen} onChange={setImagen} disabled={busy} />

      <div style={{ marginBottom: '1.1rem' }}>
        <label style={checkRow}>
          <input
            type="checkbox"
            checked={destacado}
            onChange={(e) => setDestacado(e.target.checked)}
            disabled={busy}
            style={{ width: 20, height: 20 }}
          />
          Destacado
        </label>
        <label style={checkRow}>
          <input
            type="checkbox"
            checked={disponible}
            onChange={(e) => setDisponible(e.target.checked)}
            disabled={busy}
            style={{ width: 20, height: 20 }}
          />
          Disponible (con stock)
        </label>
      </div>

      {validationError && <p role="alert" style={errorBox}>{validationError}</p>}
      {saveError && <p role="alert" style={errorBox}>{saveError}</p>}

      <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          style={{ ...secondaryButton, cursor: busy ? 'default' : 'pointer' }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={busy}
          style={{ ...primaryButton, cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.7 : 1 }}
        >
          {step === 'saving' ? 'Creando…' : step === 'uploading' ? 'Subiendo foto…' : 'Crear producto'}
        </button>
      </div>
    </AdminModal>
  )
}
