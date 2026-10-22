import { useState } from 'react'
import type { FormEvent } from 'react'
import { updateProduct } from '../../services/products'
import type { ProductoSupabase, CategoriaSupabase } from '../../types/producto'

type Props = {
  producto: ProductoSupabase
  categorias: CategoriaSupabase[]
  onSaved: (id: number, cambios: { nombre: string; descripcion: string | null; precio: number; categoria: string }) => void
  onCancel: () => void
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#1a3a50',
  fontSize: '0.8rem',
  fontWeight: 600,
  marginBottom: '0.3rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.55rem 0.7rem',
  border: '1.5px solid #cfe0ee',
  borderRadius: 6,
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '0.9rem',
  color: '#1a3a50',
}

export default function ProductEditForm({ producto, categorias, onSaved, onCancel }: Props) {
  const categoriaActual = categorias.find((c) => c.slug === producto.categoria)

  const [nombre, setNombre] = useState(producto.nombre)
  const [precio, setPrecio] = useState(producto.precio != null ? String(producto.precio) : '')
  const [descripcion, setDescripcion] = useState(producto.descripcion ?? '')
  const [categoriaId, setCategoriaId] = useState<number | ''>(categoriaActual?.id ?? '')
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setValidationError(null)

    const nombreTrim = nombre.trim()
    const precioTrim = precio.trim()
    const precioNum = Number(precioTrim)

    if (!nombreTrim) {
      setValidationError('El nombre no puede estar vacío.')
      return
    }
    if (precioTrim === '' || Number.isNaN(precioNum) || precioNum < 0) {
      setValidationError('El precio debe ser un número válido, mayor o igual a 0.')
      return
    }
    if (categoriaId === '') {
      setValidationError('Elegí una categoría.')
      return
    }

    setStatus('saving')
    const descripcionFinal = descripcion.trim() ? descripcion.trim() : null

    const { error } = await updateProduct(producto.id, {
      nombre: nombreTrim,
      descripcion: descripcionFinal,
      precio: precioNum,
      categoriaId,
    })

    if (error) {
      setSaveError(error.code === 'PGRST116'
        ? 'No tenés permisos para modificar productos.'
        : 'No se pudo guardar el producto. Probá de nuevo.')
      setStatus('error')
      return
    }

    const categoriaSlug = categorias.find((c) => c.id === categoriaId)?.slug ?? producto.categoria
    onSaved(producto.id, { nombre: nombreTrim, descripcion: descripcionFinal, precio: precioNum, categoria: categoriaSlug })
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26,58,80,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '1rem',
      }}
      onClick={onCancel}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 10,
          padding: '1.5rem',
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 8px 30px rgba(26,58,80,0.25)',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        <h3 style={{ color: '#1a3a50', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1.1rem' }}>
          Editar producto
        </h3>

        <div style={{ marginBottom: '0.9rem' }}>
          <label style={labelStyle} htmlFor="edit-nombre">Nombre</label>
          <input
            id="edit-nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={inputStyle}
            disabled={status === 'saving'}
          />
        </div>

        <div style={{ marginBottom: '0.9rem' }}>
          <label style={labelStyle} htmlFor="edit-precio">Precio</label>
          <input
            id="edit-precio"
            type="number"
            step="0.01"
            min="0"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            style={inputStyle}
            disabled={status === 'saving'}
          />
        </div>

        <div style={{ marginBottom: '0.9rem' }}>
          <label style={labelStyle} htmlFor="edit-categoria">Categoría</label>
          <select
            id="edit-categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value ? Number(e.target.value) : '')}
            style={inputStyle}
            disabled={status === 'saving'}
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
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'DM Sans, sans-serif' }}
            disabled={status === 'saving'}
          />
        </div>

        {validationError && (
          <p style={{
            color: '#c0392b',
            background: '#fdf2f2',
            border: '1px solid #f5c6c6',
            borderRadius: 6,
            padding: '0.6rem 0.8rem',
            margin: '0 0 1rem',
            fontSize: '0.82rem',
          }}>
            {validationError}
          </p>
        )}

        {status === 'error' && saveError && (
          <p style={{
            color: '#c0392b',
            background: '#fdf2f2',
            border: '1px solid #f5c6c6',
            borderRadius: 6,
            padding: '0.6rem 0.8rem',
            margin: '0 0 1rem',
            fontSize: '0.82rem',
          }}>
            {saveError}
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={status === 'saving'}
            style={{
              background: 'transparent',
              border: '1.5px solid #5a8ab0',
              borderRadius: 8,
              color: '#5a8ab0',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '0.5rem 1.1rem',
              cursor: status === 'saving' ? 'default' : 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={status === 'saving'}
            style={{
              background: '#2d6490',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '0.5rem 1.1rem',
              cursor: status === 'saving' ? 'default' : 'pointer',
              opacity: status === 'saving' ? 0.7 : 1,
            }}
          >
            {status === 'saving' ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  )
}
