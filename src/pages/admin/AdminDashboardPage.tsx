import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { getProducts, getCategories, toggleDestacado, toggleDisponible, setProductActivo } from '../../services/products'
import { getSubscribersForExport } from '../../services/subscribers'
import type { ProductoSupabase, CategoriaSupabase } from '../../types/producto'
import ProductEditForm, { type CambiosProducto } from '../../components/admin/ProductEditForm'
import ProductCreateForm from '../../components/admin/ProductCreateForm'
import ProductList from '../../components/admin/ProductList'
import { errorBox, primaryButton, secondaryButton, PERMISOS_MSG, esErrorDePermisos } from '../../components/admin/shared'
import { buildCsv, downloadCsv, fechaArchivoAR, formatFechaAR } from '../../utils/csv'

type Filtro = 'activos' | 'archivados' | 'todos'
type Notice = { tone: 'ok' | 'warn' | 'error'; text: string }

const FILTROS: { value: Filtro; label: string }[] = [
  { value: 'activos', label: 'Activos' },
  { value: 'archivados', label: 'Archivados' },
  { value: 'todos', label: 'Todos' },
]

const NOTICE_STYLE: Record<Notice['tone'], React.CSSProperties> = {
  error: errorBox,
  warn: { ...errorBox, color: '#7a5600', background: '#fdf6e3', border: '1px solid #ecd9a0' },
  ok: { ...errorBox, color: '#1d6b3c', background: '#eef8f1', border: '1px solid #bfe3cb' },
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<ProductoSupabase[]>([])
  const [categorias, setCategorias] = useState<CategoriaSupabase[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [notice, setNotice]     = useState<Notice | null>(null)
  const [filtro, setFiltro]     = useState<Filtro>('activos')
  const [togglingId, setTogglingId] = useState<number | null>(null)
  const [togglingDisponibleId, setTogglingDisponibleId] = useState<number | null>(null)
  const [archivingId, setArchivingId] = useState<number | null>(null)
  const [confirmArchiveId, setConfirmArchiveId] = useState<number | null>(null)
  const [editingProduct, setEditingProduct] = useState<ProductoSupabase | null>(null)
  const [creating, setCreating] = useState(false)
  const [exporting, setExporting] = useState(false)

  const { signOut } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    let dead = false
    Promise.all([getProducts({ includeInactive: true }), getCategories()])
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

  const patch = (id: number, cambios: Partial<ProductoSupabase>) =>
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...cambios } : p))

  const errorDeFila = (code: string | undefined, nombre: string): Notice => ({
    tone: 'error',
    text: esErrorDePermisos(code) ? PERMISOS_MSG : `No se pudo actualizar "${nombre}"`,
  })

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  async function handleToggleDestacado(producto: ProductoSupabase) {
    setNotice(null)
    setTogglingId(producto.id)
    const nuevoValor = !producto.destacado
    const { error } = await toggleDestacado(producto.id, nuevoValor)
    if (error) setNotice(errorDeFila(error.code, producto.nombre))
    else patch(producto.id, { destacado: nuevoValor })
    setTogglingId(null)
  }

  async function handleToggleDisponible(producto: ProductoSupabase) {
    setNotice(null)
    setTogglingDisponibleId(producto.id)
    const nuevoValor = !producto.disponible
    const { error } = await toggleDisponible(producto.id, nuevoValor)
    if (error) setNotice(errorDeFila(error.code, producto.nombre))
    else patch(producto.id, { disponible: nuevoValor })
    setTogglingDisponibleId(null)
  }

  // Archivar = activo false. Nunca se borra el producto ni su foto.
  async function handleSetActivo(producto: ProductoSupabase, activo: boolean) {
    setNotice(null)
    setArchivingId(producto.id)
    const { error } = await setProductActivo(producto.id, activo)
    if (error) {
      setNotice(errorDeFila(error.code, producto.nombre))
    } else {
      patch(producto.id, { activo })
      setNotice({ tone: 'ok', text: activo ? `"${producto.nombre}" restaurado.` : `"${producto.nombre}" archivado.` })
    }
    setArchivingId(null)
    setConfirmArchiveId(null)
  }

  function handleSaved(id: number, cambios: CambiosProducto) {
    patch(id, cambios)
    setEditingProduct(null)
  }

  function handleCreated(producto: ProductoSupabase, aviso: string | null) {
    setProducts((prev) => [producto, ...prev])
    setCreating(false)
    if (filtro === 'archivados') setFiltro('activos')
    setNotice(aviso
      ? { tone: 'warn', text: aviso }
      : { tone: 'ok', text: `Producto "${producto.nombre}" creado.` })
  }

  async function handleExport() {
    setNotice(null)
    setExporting(true)
    const { data, error } = await getSubscribersForExport()
    setExporting(false)

    if (error) {
      setNotice({ tone: 'error', text: esErrorDePermisos(error.code)
        ? 'No tenés permisos para ver los suscriptores.'
        : 'No se pudieron exportar los suscriptores. Probá de nuevo.' })
      return
    }
    if (data.length === 0) {
      setNotice({ tone: 'warn', text: 'No hay suscriptores para exportar.' })
      return
    }

    const csv = buildCsv(
      ['Email', 'Fecha de suscripción'],
      data.map((s) => [s.email, formatFechaAR(s.created_at)]),
    )
    downloadCsv(`suscriptores-${fechaArchivoAR()}.csv`, csv)
    setNotice({ tone: 'ok', text: `Se exportaron ${data.length} suscriptor${data.length === 1 ? '' : 'es'}.` })
  }

  const counts = {
    activos: products.filter((p) => p.activo).length,
    archivados: products.filter((p) => !p.activo).length,
    todos: products.length,
  }
  const visibles = products.filter((p) =>
    filtro === 'todos' ? true : filtro === 'activos' ? p.activo : !p.activo)

  return (
    <div style={{ minHeight: '100vh', background: '#f2ecdf', fontFamily: 'DM Sans, sans-serif' }}>
      <header style={{
        background: '#fff',
        borderBottom: '2px solid #c8960c',
        padding: '0.75rem clamp(1rem, 4vw, 2rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'Playfair Display, serif', color: '#1a3a50', fontSize: '1.2rem', fontWeight: 700 }}>
            el Sello
          </span>
          <span style={{ color: '#2d6490', fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Admin
          </span>
        </div>
        <button onClick={handleSignOut} style={{ ...secondaryButton, borderColor: '#2d6490' }}>
          Cerrar sesión
        </button>
      </header>

      <main style={{ padding: '1.5rem clamp(1rem, 4vw, 2rem)', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <button
            type="button"
            onClick={() => { setNotice(null); setCreating(true) }}
            disabled={loading || !!error}
            style={{ ...primaryButton, opacity: loading || error ? 0.6 : 1 }}
          >
            + Nuevo producto
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            style={{ ...secondaryButton, borderColor: '#2d6490', opacity: exporting ? 0.6 : 1 }}
          >
            {exporting ? 'Exportando…' : 'Exportar suscriptores (CSV)'}
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem' }}>
          <h2 style={{ color: '#1a3a50', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Productos{!loading && !error ? ` (${visibles.length})` : ''}
          </h2>
          {!loading && !error && (
            <div role="group" aria-label="Filtrar productos" style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1.5px solid #2d6490' }}>
              {FILTROS.map((f) => {
                const on = filtro === f.value
                return (
                  <button
                    key={f.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => { setFiltro(f.value); setConfirmArchiveId(null) }}
                    style={{
                      minHeight: 44,
                      padding: '0.4rem 0.8rem',
                      border: 'none',
                      background: on ? '#2d6490' : '#fff',
                      color: on ? '#fff' : '#2d6490',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {f.label} ({counts[f.value]})
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {loading && <p style={{ color: '#2d6490' }}>Cargando productos...</p>}

        {error && <p style={{ ...errorBox, margin: 0 }}>{error}</p>}

        {notice && (
          <p role={notice.tone === 'error' ? 'alert' : 'status'} style={NOTICE_STYLE[notice.tone]}>
            {notice.text}
          </p>
        )}

        {!loading && !error && (
          <ProductList
            products={visibles}
            togglingDestacadoId={togglingId}
            togglingDisponibleId={togglingDisponibleId}
            archivingId={archivingId}
            confirmArchiveId={confirmArchiveId}
            onToggleDestacado={handleToggleDestacado}
            onToggleDisponible={handleToggleDisponible}
            onEdit={(p) => { setNotice(null); setEditingProduct(p) }}
            onAskArchive={setConfirmArchiveId}
            onSetActivo={handleSetActivo}
          />
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

      {creating && (
        <ProductCreateForm
          categorias={categorias}
          onCreated={handleCreated}
          onCancel={() => setCreating(false)}
        />
      )}
    </div>
  )
}
