import { useState, useRef, useEffect } from 'react'
import { Plus, Check, Palette, Backpack, BookOpen, Scissors } from '@phosphor-icons/react'
import type { ElementType } from 'react'
import type { ProductoSupabase } from '../types/producto'
import { useCartStore } from '../store/cartStore'
import { WA_URL } from '../config'

const CARD_META: Record<string, { color: string; icon: ElementType; nombre: string }> = {
  artistico: { color: '#FF6B35', icon: Palette,   nombre: 'Artístico' },
  escolar:   { color: '#3B82F6', icon: Backpack,  nombre: 'Escolar'   },
  libreria:  { color: '#22C55E', icon: BookOpen,  nombre: 'Librería'  },
  papeleria: { color: '#A855F7', icon: Scissors,  nombre: 'Papelería' },
}

const DEFAULT_META = { color: '#2d6490', icon: BookOpen as ElementType, nombre: '' }

export default function ProductCard({ producto }: { producto: ProductoSupabase }) {
  const [hover, setHover]   = useState(false)
  const [added, setAdded]   = useState(false)
  const { addItem }         = useCartStore()
  const timerRef            = useRef<ReturnType<typeof setTimeout> | null>(null)
  const meta                = CARD_META[producto.categoria] ?? DEFAULT_META
  const Icon                = meta.icon
  const waText              = encodeURIComponent(`Hola! Me interesa: ${producto.nombre}`)
  const waLink              = `${WA_URL}?text=${waText}`
  const agotado             = !producto.disponible

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
        border: `1px solid ${hover ? meta.color + '55' : 'var(--border)'}`,
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
        background: `linear-gradient(135deg, ${meta.color}18 0%, ${meta.color}32 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            loading="lazy"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Icon size={54} weight="thin" color={meta.color} style={{ opacity: 0.65 }} />
        )}
        {producto.destacado && (
          <span style={{
            position: 'absolute',
            top: '0.6rem',
            right: '0.6rem',
            background: '#c8960c',
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
      <div style={{
        padding: '1.1rem 1.25rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: meta.color,
          marginBottom: '0.4rem',
          opacity: 0.8,
        }}>
          {meta.nombre || producto.categoria}
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

          <div className="flex flex-wrap" style={{ gap: '0.4rem', alignItems: 'center' }}>
            <button
              onClick={handleAdd}
              title={agotado ? 'Sin stock' : 'Agregar a mi lista'}
              disabled={agotado}
              style={{
                background: added ? meta.color : 'transparent',
                border: `1px solid ${added ? meta.color : 'var(--border)'}`,
                color: added ? '#ffffff' : 'var(--text-dim)',
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
                ? <Check size={13} weight="bold" />
                : <Plus size={13} weight="regular" />
              }
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                padding: '0.45rem 0.9rem',
                background: hover ? '#25D366' : 'rgba(45,100,144,0.06)',
                border: `1px solid ${hover ? '#25D366' : '#2d6490'}`,
                color: hover ? '#fff' : '#2d6490',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {agotado ? 'Consultar disponibilidad' : 'Consultar'}
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
