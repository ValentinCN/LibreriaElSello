import type { CSSProperties } from 'react'
import type { ProductoSupabase } from '../../types/producto'
import { CATEGORIA_BY_SLUG, type CategoriaSlug } from '../../constants/categories'

export type ListHandlers = {
  togglingDestacadoId: number | null
  togglingDisponibleId: number | null
  archivingId: number | null
  confirmArchiveId: number | null
  onToggleDestacado: (p: ProductoSupabase) => void
  onToggleDisponible: (p: ProductoSupabase) => void
  onEdit: (p: ProductoSupabase) => void
  onAskArchive: (id: number | null) => void
  onSetActivo: (p: ProductoSupabase, activo: boolean) => void
}

type Props = ListHandlers & { products: ProductoSupabase[] }
type CellProps = { p: ProductoSupabase; compact: boolean; h: ListHandlers }

const TH: CSSProperties = {
  padding: '0.75rem 1rem',
  textAlign: 'left',
  fontWeight: 600,
  letterSpacing: '0.04em',
  fontSize: '0.78rem',
  whiteSpace: 'nowrap',
}

const TD: CSSProperties = { padding: '0.65rem 1rem' }
const DIM: CSSProperties = { opacity: 0.5 }
const OUTLINE: CSSProperties = { background: 'transparent', color: '#2d6490', border: '1.5px solid #2d6490' }
const DANGER_OUTLINE: CSSProperties = { background: 'transparent', color: '#c0392b', border: '1.5px solid #c0392b' }

/** compact = tabla de escritorio; sin compact = tarjetas mobile con toques de 44px. */
function pill(compact: boolean, extra: CSSProperties, busy = false): CSSProperties {
  return {
    minHeight: compact ? 32 : 44,
    borderRadius: compact ? 4 : 8,
    padding: compact ? '0.15rem 0.6rem' : '0.4rem 0.9rem',
    fontFamily: 'var(--font-body)',
    fontSize: compact ? '0.75rem' : '0.875rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap',
    cursor: busy ? 'default' : 'pointer',
    opacity: busy ? 0.6 : 1,
    ...extra,
  }
}

function categoriaTexto(p: ProductoSupabase) {
  return CATEGORIA_BY_SLUG[p.categoria as CategoriaSlug]?.label ?? p.categoria
}

function precioTexto(p: ProductoSupabase) {
  return p.precio != null ? `$${p.precio.toLocaleString('es-AR')}` : 'Consultar'
}

function ArchivedBadge() {
  return (
    <span style={{
      display: 'inline-block',
      marginLeft: '0.5rem',
      background: '#5b6670',
      color: '#fff',
      borderRadius: 4,
      padding: '0.1rem 0.45rem',
      fontSize: '0.7rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      verticalAlign: 'middle',
    }}>
      ARCHIVADO
    </span>
  )
}

function DestacadoButton({ p, compact, h }: CellProps) {
  const busy = h.togglingDestacadoId === p.id
  return (
    <button
      type="button"
      onClick={() => h.onToggleDestacado(p)}
      disabled={busy}
      aria-pressed={p.destacado}
      style={pill(compact, p.destacado
        ? { background: '#8a6b09', color: '#fff', border: '1.5px solid #8a6b09' }
        : { background: 'transparent', color: '#2d6490', border: '1.5px solid #5a8ab0' }, busy)}
    >
      {busy ? '...' : p.destacado ? '★ Destacado' : 'Destacar'}
    </button>
  )
}

function DisponibleButton({ p, compact, h }: CellProps) {
  const busy = h.togglingDisponibleId === p.id
  return (
    <button
      type="button"
      onClick={() => h.onToggleDisponible(p)}
      disabled={busy}
      style={pill(compact, {
        background: p.disponible ? '#237a46' : '#5b6670',
        color: '#fff',
        border: 'none',
      }, busy)}
    >
      {busy ? '...' : p.disponible ? 'Disponible' : 'Agotado'}
    </button>
  )
}

function EditButton({ p, compact, h }: CellProps) {
  return (
    <button type="button" onClick={() => h.onEdit(p)} style={pill(compact, OUTLINE)}>
      Editar
    </button>
  )
}

function ArchiveControl({ p, compact, h }: CellProps) {
  const busy = h.archivingId === p.id

  if (!p.activo) {
    return (
      <button type="button" onClick={() => h.onSetActivo(p, true)} disabled={busy} style={pill(compact, OUTLINE, busy)}>
        {busy ? '...' : 'Restaurar'}
      </button>
    )
  }

  if (h.confirmArchiveId !== p.id) {
    return (
      <button type="button" onClick={() => h.onAskArchive(p.id)} style={pill(compact, DANGER_OUTLINE)}>
        Archivar
      </button>
    )
  }

  return (
    <span role="group" aria-label={`Confirmar archivar ${p.nombre}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
      <span style={{ fontSize: compact ? '0.8rem' : '0.9rem', color: '#1a3a50', fontWeight: 600 }}>¿Archivar?</span>
      <button
        type="button"
        onClick={() => h.onSetActivo(p, false)}
        disabled={busy}
        style={pill(compact, { background: '#c0392b', color: '#fff', border: '1.5px solid #c0392b' }, busy)}
      >
        {busy ? '...' : 'Sí, archivar'}
      </button>
      <button type="button" onClick={() => h.onAskArchive(null)} disabled={busy} style={pill(compact, OUTLINE)}>
        No
      </button>
    </span>
  )
}

export default function ProductList({ products, ...h }: Props) {
  if (products.length === 0) {
    return <p style={{ color: '#2d6490', margin: 0 }}>No hay productos en esta vista.</p>
  }

  return (
    <>
      {/* Escritorio: tabla */}
      <div className="hidden md:block" style={{ overflowX: 'auto' }}>
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
            {products.map((p, i) => {
              const dim = p.activo ? undefined : DIM
              return (
                <tr key={p.id} style={{ borderTop: '1px solid #e8f0f8', background: i % 2 === 0 ? '#fff' : '#f9fbfd' }}>
                  <td style={{ ...TD, color: '#1a3a50', fontWeight: 500 }}>
                    <span style={dim}>{p.nombre}</span>
                    {!p.activo && <ArchivedBadge />}
                  </td>
                  <td style={{ ...TD, ...dim, color: '#2d6490' }}>{categoriaTexto(p)}</td>
                  <td style={{ ...TD, ...dim, color: '#1a3a50', whiteSpace: 'nowrap' }}>{precioTexto(p)}</td>
                  <td style={TD}><DestacadoButton p={p} compact h={h} /></td>
                  <td style={TD}><DisponibleButton p={p} compact h={h} /></td>
                  <td style={TD}>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <EditButton p={p} compact h={h} />
                      <ArchiveControl p={p} compact h={h} />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: tarjetas apiladas */}
      {/* display solo por clase: un display inline le gana a md:hidden y se veían tabla y tarjetas a la vez */}
      <ul className="grid md:hidden" style={{ listStyle: 'none', margin: 0, padding: 0, gap: '0.75rem' }}>
        {products.map((p) => (
          <li key={p.id} style={{
            background: '#fff',
            borderRadius: 10,
            padding: '0.9rem',
            boxShadow: '0 2px 12px rgba(45,100,144,0.08)',
          }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              {p.imagen_url && (
                <img src={p.imagen_url} alt="" loading="lazy" width={56} height={42}
                  style={{ width: 56, height: 42, objectFit: 'contain', background: '#fff', padding: 2, borderRadius: 4, flexShrink: 0, ...(p.activo ? null : DIM) }} />
              )}
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ color: '#1a3a50', fontWeight: 600, fontSize: '1rem', lineHeight: 1.3 }}>
                  <span style={p.activo ? undefined : DIM}>{p.nombre}</span>
                  {!p.activo && <ArchivedBadge />}
                </div>
                <div style={{ color: '#2d6490', fontSize: '0.875rem', marginTop: '0.2rem', ...(p.activo ? null : DIM) }}>
                  {categoriaTexto(p)} · {precioTexto(p)}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              <DestacadoButton p={p} compact={false} h={h} />
              <DisponibleButton p={p} compact={false} h={h} />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <EditButton p={p} compact={false} h={h} />
              <ArchiveControl p={p} compact={false} h={h} />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
