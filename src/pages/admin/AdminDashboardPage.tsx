import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { getProducts, getCategories, toggleDestacado, toggleDisponible } from '../../services/products'
import type { ProductoSupabase, CategoriaSupabase } from '../../types/producto'
import ProductEditForm from '../../components/admin/ProductEditForm'

const TH: React.CSSProperties = {
  padding: '0.75rem 1rem',
  textAlign: 'left',
  fontWeight: 600,
  letterSpacing: '0.04em',
  fontSize: '0.78rem',
  whiteSpace: 'nowrap',
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<ProductoSupabase[]>([])
  const [categorias, setCategorias] = useState<CategoriaSupabase[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<number | null>(null)
  const [togglingDisponibleId, setTogglingDisponibleId] = useState<number | null>(null)
  const [toggleError, setToggleError] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<ProductoSupabase | null>(null)

  const { signOut } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    let dead = false
    Promise.all([getProducts(), getCategories()])
      .then(([productsData, categoriasData]) => {
        if (!dead) {
          setProducts(productsData)
          setCategorias(categoriasData)
        }
      })
      .catch((err: unknown) => { if (!dead) setError(err instanceof Error ? err.message : 'Error al cargar') })
      .finally(() => { if (!dead) setLoading(false) })
    return () => { dead = true }
  }, [])

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  async function handleToggleDestacado(producto: ProductoSupabase) {
    setToggleError(null)
    setTogglingId(producto.id)
    const nuevoValor = !producto.destacado
    const { error } = await toggleDestacado(producto.id, nuevoValor)
    if (error) {
      setToggleError(`No se pudo actualizar "${producto.nombre}"`)
    } else {
      setProducts((prev) => prev.map((p) => p.id === producto.id ? { ...p, destacado: nuevoValor } : p))
    }
    setTogglingId(null)
  }

  async function handleToggleDisponible(producto: ProductoSupabase) {
    setToggleError(null)
    setTogglingDisponibleId(producto.id)
    const nuevoValor = !producto.disponible
    const { error } = await toggleDisponible(producto.id, nuevoValor)
    if (error) {
      setToggleError(`No se pudo actualizar "${producto.nombre}"`)
    } else {
      setProducts((prev) => prev.map((p) => p.id === producto.id ? { ...p, disponible: nuevoValor } : p))
    }
    setTogglingDisponibleId(null)
  }

  function handleSaved(id: number, cambios: { nombre: string; descripcion: string | null; precio: number; categoria: string }) {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...cambios } : p))
    setEditingProduct(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f2ecdf', fontFamily: 'DM Sans, sans-serif' }}>
      <header style={{
        background: '#fff',
        borderBottom: '2px solid #c8960c',
        padding: '0.9rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'Playfair Display, serif', color: '#1a3a50', fontSize: '1.2rem', fontWeight: 700 }}>
            el Sello
          </span>
          <span style={{ color: '#5a8ab0', fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Admin
          </span>
        </div>
        <button
          onClick={handleSignOut}
          style={{
            background: 'transparent',
            border: '1.5px solid #2d6490',
            borderRadius: 8,
            color: '#2d6490',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.82rem',
            fontWeight: 600,
            padding: '0.4rem 1rem',
            cursor: 'pointer',
          }}
        >
          Cerrar sesión
        </button>
      </header>

      <main style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ color: '#1a3a50', fontSize: '1rem', fontWeight: 600, margin: '0 0 1.25rem' }}>
          Productos{!loading && !error ? ` (${products.length})` : ''}
        </h2>

        {loading && (
          <p style={{ color: '#5a8ab0' }}>Cargando productos...</p>
        )}

        {error && (
          <p style={{
            color: '#c0392b',
            background: '#fdf2f2',
            border: '1px solid #f5c6c6',
            borderRadius: 6,
            padding: '0.75rem 1rem',
            margin: 0,
          }}>
            {error}
          </p>
        )}

        {toggleError && (
          <p style={{
            color: '#c0392b',
            background: '#fdf2f2',
            border: '1px solid #f5c6c6',
            borderRadius: 6,
            padding: '0.65rem 1rem',
            margin: '0 0 1rem',
            fontSize: '0.85rem',
          }}>
            {toggleError}
          </p>
        )}

        {!loading && !error && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: '#fff',
              borderRadius: 10,
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(45,100,144,0.08)',
              fontSize: '0.875rem',
            }}>
              <thead>
                <tr style={{ background: '#2d6490', color: '#fff' }}>
                  <th style={TH}>Nombre</th>
                  <th style={TH}>Categoría</th>
                  <th style={TH}>Precio</th>
                  <th style={TH}>Destacado</th>
                  <th style={TH}>Disponible</th>
                  <th style={TH}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr
                    key={p.id}
                    style={{
                      borderTop: '1px solid #e8f0f8',
                      background: i % 2 === 0 ? '#fff' : '#f9fbfd',
                    }}
                  >
                    <td style={{ padding: '0.65rem 1rem', color: '#1a3a50', fontWeight: 500 }}>
                      {p.nombre}
                    </td>
                    <td style={{ padding: '0.65rem 1rem', color: '#5a8ab0', textTransform: 'capitalize' }}>
                      {p.categoria}
                    </td>
                    <td style={{ padding: '0.65rem 1rem', color: '#1a3a50' }}>
                      {p.precio != null
                        ? `$${p.precio.toLocaleString('es-AR')}`
                        : <span style={{ color: '#5a8ab0', fontStyle: 'italic' }}>Consultar</span>
                      }
                    </td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <button
                        onClick={() => handleToggleDestacado(p)}
                        disabled={togglingId === p.id}
                        style={{
                          background: p.destacado ? '#c8960c' : 'transparent',
                          color: p.destacado ? '#fff' : '#5a8ab0',
                          border: p.destacado ? 'none' : '1.5px solid #5a8ab0',
                          borderRadius: 4,
                          padding: '0.15rem 0.5rem',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          cursor: togglingId === p.id ? 'default' : 'pointer',
                          opacity: togglingId === p.id ? 0.6 : 1,
                        }}
                      >
                        {togglingId === p.id ? '...' : p.destacado ? '★ Destacado' : 'Destacar'}
                      </button>
                    </td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <button
                        onClick={() => handleToggleDisponible(p)}
                        disabled={togglingDisponibleId === p.id}
                        style={{
                          background: p.disponible ? '#2f9e5b' : '#8a97a3',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 4,
                          padding: '0.15rem 0.5rem',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          cursor: togglingDisponibleId === p.id ? 'default' : 'pointer',
                          opacity: togglingDisponibleId === p.id ? 0.6 : 1,
                        }}
                      >
                        {togglingDisponibleId === p.id ? '...' : p.disponible ? 'Disponible' : 'Agotado'}
                      </button>
                    </td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <button
                        onClick={() => setEditingProduct(p)}
                        style={{
                          background: 'transparent',
                          color: '#2d6490',
                          border: '1.5px solid #2d6490',
                          borderRadius: 4,
                          padding: '0.15rem 0.5rem',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          cursor: 'pointer',
                        }}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {editingProduct && (
        <ProductEditForm
          producto={editingProduct}
          categorias={categorias}
          onSaved={handleSaved}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  )
}
