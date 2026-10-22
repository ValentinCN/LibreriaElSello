import { useState } from 'react'
import type { FormEvent } from 'react'
import { updateProduct } from '../../services/products'
import { uploadProductImage, deleteProductImage, storageErrorMessage } from '../../services/productImages'
import type { ProductoSupabase, CategoriaSupabase } from '../../types/producto'
import AdminModal from './AdminModal'
import ImageField, { type ImageSelection } from './ImageField'
import {
  labelStyle, inputStyle, primaryButton, secondaryButton, errorBox,
  PERMISOS_MSG, esErrorDePermisos, parsePrecio,
} from './shared'

export type CambiosProducto = {
  nombre: string
  descripcion: string | null
  precio: number
  categoria: string
  imagen_url: string | null
}

type Props = {
  producto: ProductoSupabase
  categorias: CategoriaSupabase[]
  onSaved: (id: number, cambios: CambiosProducto) => void
  onCancel: () => void
}

export default function ProductEditForm({ producto, categorias, onSaved, onCancel }: Props) {
  const categoriaActual = categorias.find((c) => c.slug === producto.categoria)

  const [nombre, setNombre] = useState(producto.nombre)
  const [precio, setPrecio] = useState(producto.precio != null ? String(producto.precio).replace('.', ',') : '')
  const [descripcion, setDescripcion] = useState(producto.descripcion ?? '')
  const [categoriaId, setCategoriaId] = useState<number | ''>(categoriaActual?.id ?? '')
  const [imagen, setImagen] = useState<ImageSelection>({ kind: 'keep' })
  const [step, setStep] = useState<'idle' | 'uploading' | 'saving'>('idle')
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
      setValidationError('El nombre no puede estar vacío.')
      return
    }
    if (Number.isNaN(precioNum) || precioNum < 0) {
      setValidationError('El precio debe ser un número válido, mayor o igual a 0.')
      return
    }
    if (categoriaId === '') {
      setValidationError('Elegí una categoría.')
      return
    }

    // 1) Subir la foto nueva (si hay).
    let uploaded: { path: string; publicUrl: string } | null = null
    if (imagen.kind === 'new') {
      setStep('uploading')
      try {
        uploaded = await uploadProductImage(producto.id, imagen.image)
      } catch (err) {
        setSaveError(storageErrorMessage(err))
        setStep('idle')
        return
      }
    }

    // 2) Un solo update con todos los campos, foto incluida.
    setStep('saving')
    const descripcionFinal = descripcion.trim() ? descripcion.trim() : null
    const imagenUrl =
      uploaded ? uploaded.publicUrl
      : imagen.kind === 'remove' ? null
      : undefined

    const { error } = await updateProduct(producto.id, {
      nombre: nombreTrim,
      descripcion: descripcionFinal,
      precio: precioNum,
      categoriaId,
      imagenUrl,
    })

    if (error) {
      // El producto sigue apuntando a la foto vieja: la recién subida quedaría huérfana.
      if (uploaded) void deleteProductImage(uploaded.path)
      setSaveError(esErrorDePermisos(error.code) ? PERMISOS_MSG : 'No se pudo guardar el producto. Probá de nuevo.')
      setStep('idle')
      return
    }

    // 3) Recién con el update confirmado se borra la foto anterior.
    if (imagen.kind !== 'keep' && producto.imagen_url) void deleteProductImage(producto.imagen_url)

    const categoriaSlug = categorias.find((c) => c.id === categoriaId)?.slug ?? producto.categoria
    onSaved(producto.id, {
      nombre: nombreTrim,
      descripcion: descripcionFinal,
      precio: precioNum,
      categoria: categoriaSlug,
      imagen_url: imagenUrl === undefined ? producto.imagen_url : imagenUrl,
    })
  }

  return (
    <AdminModal title="Editar producto" busy={busy} onClose={onCancel} onSubmit={handleSubmit}>
      <ImageField
        id="edit-foto"
        currentUrl={producto.imagen_url}
        value={imagen}
        onChange={setImagen}
        disabled={busy}
      />

      <div style={{ marginBottom: '0.9rem' }}>
        <label style={labelStyle} htmlFor="edit-nombre">Nombre</label>
        <input
          id="edit-nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={inputStyle}
          disabled={busy}
        />
      </div>

      <div style={{ marginBottom: '0.9rem' }}>
        <label style={labelStyle} htmlFor="edit-precio">Precio</label>
        <input
          id="edit-precio"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          style={inputStyle}
          disabled={busy}
        />
      </div>

      <div style={{ marginBottom: '0.9rem' }}>
        <label style={labelStyle} htmlFor="edit-categoria">Categoría</label>
        <select
          id="edit-categoria"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value ? Number(e.target.value) : '')}
          style={inputStyle}
          disabled={busy}
        >
          <option value="">Elegí una categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1.1rem' }}>
        <label style={labelStyle} htmlFor="edit-descripcion">Descripción</label>
        <textarea
          id="edit-descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
          disabled={busy}
        />
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
          {step === 'uploading' ? 'Subiendo foto…' : step === 'saving' ? 'Guardando…' : 'Guardar cambios'}
        </button>
      </div>
    </AdminModal>
  )
}
