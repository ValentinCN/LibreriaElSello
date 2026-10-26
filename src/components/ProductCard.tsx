import { useState, useRef, useEffect } from 'react'
import { Plus, Check, BookOpen } from '@phosphor-icons/react'
import type { ElementType } from 'react'
import type { ProductoSupabase } from '../types/producto'
import { useCartStore } from '../store/cartStore'
import { WA_URL } from '../config'
import { CATEGORIA_BY_SLUG, alpha, type CategoriaSlug } from '../constants/categories'

const DEFAULT_META = { color: 'var(--color-primary)', textColor: 'var(--color-text)', icon: BookOpen as ElementType, label: '' }

export default function ProductCard({ producto }: { producto: ProductoSupabase }) {
  const [added, setAdded]   = useState(false)
  // Se guarda la URL que falló (no un boolean): si la foto cambia, se vuelve a intentar sola.
  const [failedImg, setFailedImg] = useState<string | null>(null)
  const { addItem }         = useCartStore()
  const timerRef            = useRef<ReturnType<typeof setTimeout> | null>(null)
  const meta                = CATEGORIA_BY_SLUG[producto.categoria as CategoriaSlug] ?? DEFAULT_META
  const Icon                = meta.icon
  const agotado             = !producto.disponible
  const hasImg              = !!producto.imagen_url && failedImg !== producto.imagen_url
  // Agotados: mensaje neutro, sin prometer aviso de reposición (no confirmado).
  const waText              = encodeURIComponent(agotado
    ? `Hola! Quería consultar por ${producto.nombre}, que figura sin stock.`
    : `Hola! Me interesa: ${producto.nombre}`)
  const waLink              = `${WA_URL}?text=${waText}`

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const handleAdd = () => {
    addItem(String(producto.id), producto.nombre, producto.precio ?? 0)
    setAdded(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article
      className={`card card-hover${agotado ? ' card-static' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        filter: agotado ? 'grayscale(0.85)' : 'none',
        opacity: agotado ? 0.72 : 1,
      }}
    >
      {/* Photo or icon fallback */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 3',
        flexShrink: 0,
        overflow: 'hidden',
        background: hasImg
          ? '#ffffff'
          : `linear-gradient(135deg, ${alpha(meta.color, 9)} 0%, ${alpha(meta.color, 20)} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {hasImg ? (
          <img
            src={producto.imagen_url ?? undefined}
            alt={producto.nombre}
            loading="lazy"
            onError={() => setFailedImg(producto.imagen_url)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              // contain: la foto entera, sin recortar logos ni títulos del packaging.
              objectFit: 'contain',
              padding: '16px',
            }}
          />
        ) : (
          <Icon size={54} weight="thin" style={{ color: meta.color, opacity: 0.65 }} />
        )}
        {producto.destacado && !agotado && (
          <span style={{
            position: 'absolute',
            top: '0.6rem',
            right: '0.6rem',
            background: '#8a6b09',
            color: '#ffffff',
            fontFamily: "var(--font-body)",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            padding: '0.2rem 0.5rem',
          }}>
            Destacado
          </span>
        )}
        {agotado && (
          <span style={{
            position: 'absolute',
            top: '0.6rem',
            left: '0.6rem',
            background: '#1a3a50',
            color: '#ffffff',
            fontFamily: "var(--font-body)",
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            padding: '0.25rem 0.6rem',
          }}>
            Agotado
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 md:p-5" style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
        <span style={{
          fontFamily: "var(--font-body)",
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: meta.textColor,
          marginBottom: '0.4rem',
        }}>
          {meta.label || producto.categoria}
        </span>

        <h3 className="line-clamp-2 md:line-clamp-none" style={{
          fontFamily: "var(--font-display)",
          fontSize: '1rem',
          fontWeight: 700,
          color: '#2d6490',
          lineHeight: 1.3,
          marginBottom: '0.5rem',
        }}>
          {producto.nombre}
        </h3>

        <p className="line-clamp-2 md:line-clamp-none" style={{
          fontFamily: "var(--font-body)",
          fontSize: '0.78rem',
          fontWeight: 300,
          color: 'var(--text-muted)',
          lineHeight: 1.55,
          marginBottom: '1rem',
          flex: 1,
        }}>
          {producto.descripcion}
        </p>

        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-2">
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#2d6490',
          }}>
            {producto.precio !== null
              ? `$${producto.precio.toLocaleString('es-AR')}`
              : 'Consultar'}
          </span>

          <div className="flex w-full md:w-auto" style={{ gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={handleAdd}
              title={agotado ? 'Sin stock' : 'Agregar a mi lista'}
              aria-label={agotado ? `${producto.nombre}: sin stock` : `Agregar ${producto.nombre} a mi lista`}
              disabled={agotado}
              className="btn btn-primary btn-icon"
            >
              {added
                ? <Check size={18} weight="bold" />
                : <Plus size={18} weight="bold" />
              }
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="btn btn-secondary btn-sm flex-1"
            >
              <span className="md:hidden">Consultar</span>
              <span className="hidden md:inline">{agotado ? 'Consultar disponibilidad' : 'Consultar'}</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
