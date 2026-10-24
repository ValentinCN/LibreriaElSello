import { useState, useRef, useEffect } from 'react'
import { Plus, Check, BookOpen } from '@phosphor-icons/react'
import type { ElementType } from 'react'
import type { ProductoSupabase } from '../types/producto'
import { useCartStore } from '../store/cartStore'
import { WA_URL } from '../config'
import { CATEGORIA_BY_SLUG, alpha, type CategoriaSlug } from '../constants/categories'

const DEFAULT_META = { color: 'var(--color-primary)', textColor: 'var(--color-text)', icon: BookOpen as ElementType, label: '' }

export default function ProductCard({ producto }: { producto: ProductoSupabase }) {
  const [hover, setHover]   = useState(false)
  const [added, setAdded]   = useState(false)
  // Se guarda la URL que falló (no un boolean): si la foto cambia, se vuelve a intentar sola.
  const [failedImg, setFailedImg] = useState<string | null>(null)
  const { addItem }         = useCartStore()
  const timerRef            = useRef<ReturnType<typeof setTimeout> | null>(null)
  const meta                = CATEGORIA_BY_SLUG[producto.categoria as CategoriaSlug] ?? DEFAULT_META
  const Icon                = meta.icon
  const agotado             = !producto.disponible
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hover ? alpha(meta.color, 33) : 'var(--border)'}`,
        transition: 'all 0.28s ease',
        transform: hover && !agotado ? 'translateY(-4px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: hover
          ? '0 8px 28px rgba(45,100,144,0.15)'
          : '0 2px 12px rgba(45,100,144,0.10)',
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
        background: `linear-gradient(135deg, ${alpha(meta.color, 9)} 0%, ${alpha(meta.color, 20)} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {producto.imagen_url && failedImg !== producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            loading="lazy"
            onError={() => setFailedImg(producto.imagen_url)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
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
            fontFamily: "'DM Sans', sans-serif",
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
            fontFamily: "'DM Sans', sans-serif",
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
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: meta.textColor,
          marginBottom: '0.4rem',
        }}>
          {meta.label || producto.categoria}
        </span>

        <h3 className="line-clamp-2 md:line-clamp-none" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1rem',
          fontWeight: 700,
          color: '#2d6490',
          lineHeight: 1.3,
          marginBottom: '0.5rem',
        }}>
          {producto.nombre}
        </h3>

        <p className="line-clamp-2 md:line-clamp-none" style={{
          fontFamily: "'DM Sans', sans-serif",
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
            fontFamily: "'Playfair Display', serif",
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
              style={{
                background: 'var(--color-primary)',
                border: '1px solid var(--color-primary)',
                color: '#ffffff',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: agotado ? 'not-allowed' : 'pointer',
                transition: 'all 0.22s ease',
                flexShrink: 0,
                opacity: agotado ? 0.5 : 1,
              }}
            >
              {added
                ? <Check size={14} weight="bold" />
                : <Plus size={14} weight="bold" />
              }
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex-1 text-center"
              style={{
                padding: '0.6rem 0.6rem',
                background: hover ? '#25D366' : 'transparent',
                border: `1px solid ${hover ? '#25D366' : 'var(--color-primary)'}`,
                color: hover ? '#1a3a50' : 'var(--color-primary)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
              }}
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
