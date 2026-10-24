import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import MagneticText from '../components/MagneticText'
import { getProducts, getCategories } from '../services/products'
import type { ProductoSupabase, CategoriaSupabase } from '../types/producto'
import { CATEGORIA_BY_SLUG, alpha, type CategoriaSlug } from '../constants/categories'
import { WA_URL } from '../config'

const PRIMARY = 'var(--color-primary)'

type SortKey = 'titulo' | 'precio-asc' | 'precio-desc'

export default function CatalogPage() {
  const [params, setParams]           = useSearchParams()
  const [sort, setSort]               = useState<SortKey>('titulo')
  const [allProducts, setAllProducts] = useState<ProductoSupabase[]>([])
  const [categorias, setCategorias]   = useState<CategoriaSupabase[]>([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState<string | null>(null)
  const [tick, setTick]               = useState(0)

  const slugParam = params.get('cat') ?? ''

  const activeCat = useMemo(() => {
    if (!slugParam) return 'todo'
    return categorias.some(c => c.slug === slugParam.toLowerCase())
      ? slugParam.toLowerCase()
      : 'todo'
  }, [slugParam, categorias])

  const activeCatMeta  = activeCat !== 'todo' ? CATEGORIA_BY_SLUG[activeCat as CategoriaSlug] : undefined
  const accentColor    = activeCatMeta?.color ?? PRIMARY
  const accentText      = activeCatMeta?.textColor ?? PRIMARY
  const activeCatLabel = activeCat === 'todo'
    ? 'Catálogo'
    : (categorias.find(c => c.slug === activeCat)?.nombre ?? activeCat)

  useEffect(() => {
    let dead = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const [prods, cats] = await Promise.all([getProducts(), getCategories()])
        if (!dead) { setAllProducts(prods); setCategorias(cats) }
      } catch {
        if (!dead) setError('No pudimos cargar los productos, probá de nuevo.')
      } finally {
        if (!dead) setLoading(false)
      }
    })()
    return () => { dead = true }
  }, [tick])

  const filtered = useMemo(() => {
    let list = activeCat === 'todo' ? allProducts : allProducts.filter(p => p.categoria === activeCat)
    if (sort === 'titulo')        list = [...list].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    else if (sort === 'precio-asc')  list = [...list].sort((a, b) => (a.precio ?? 0) - (b.precio ?? 0))
    else if (sort === 'precio-desc') list = [...list].sort((a, b) => (b.precio ?? 0) - (a.precio ?? 0))
    return list
  }, [activeCat, sort, allProducts])

  const setFilter = (slug: string) => {
    if (slug === 'todo') setParams({})
    else setParams({ cat: slug })
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', transition: 'background 0.3s ease' }}>
      <Navbar />

      {/* Atmospheric top accent */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '35vh',
        background: `radial-gradient(ellipse 50% 50% at 50% -5%, ${alpha(accentColor, 8)} 0%, transparent 100%)`,
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'background 0.5s ease',
      }} />

      <div style={{ position: 'relative', zIndex: 1, paddingTop: '58px' }}>

        {/* ── Header ───────────────────────────────────────────── */}
        <header style={{
          padding: '3.5rem clamp(1rem, 4vw, 3rem) 0',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}>
              · Librería El Sello · Quilmes Centro ·
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingBottom: '2rem',
            }}>
              <MagneticText
                as="h1"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                  fontWeight: 700,
                  color: activeCat !== 'todo' ? accentText : 'var(--text)',
                  letterSpacing: '0.01em',
                  lineHeight: 0.95,
                  transition: 'color 0.4s ease',
                }}
              >
                {activeCatLabel}
              </MagneticText>

              {/* Sort + count */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '0.4rem' }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.82rem',
                  letterSpacing: '0.16em',
                  color: '#1a3a50',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}>
                  {loading
                    ? '…'
                    : `${filtered.length} ${filtered.length === 1 ? 'producto' : 'productos'}`}
                </span>
                <div style={{ position: 'relative' }}>
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value as SortKey)}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: '#1a3a50',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      padding: '0.45rem 2rem 0.45rem 0.85rem',
                      cursor: 'pointer',
                      outline: 'none',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      transition: 'background 0.3s, color 0.3s',
                    }}
                  >
                    <option value="titulo">Título A–Z</option>
                    <option value="precio-asc">Precio ↑</option>
                    <option value="precio-desc">Precio ↓</option>
                  </select>
                  <span style={{
                    position: 'absolute',
                    right: '0.6rem', top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#1a3a50',
                    fontSize: '0.75rem',
                    pointerEvents: 'none',
                  }}>▾</span>
                </div>
              </div>
            </div>

            {/* Category tabs */}
            <div style={{ position: 'relative' }}>
              <div
                className="no-scrollbar flex flex-nowrap overflow-x-auto snap-x snap-mandatory md:flex-wrap md:overflow-visible"
                style={{ gap: 0, marginBottom: '-1px' }}
              >
                {(['todo', ...categorias.map(c => c.slug)]).map(slug => {
                  const cat    = categorias.find(c => c.slug === slug)
                  const active = slug === activeCat
                  const meta   = slug !== 'todo' ? CATEGORIA_BY_SLUG[slug as CategoriaSlug] : undefined
                  const color     = meta?.color ?? PRIMARY
                  const textColor = meta?.textColor ?? PRIMARY
                  const label  = slug === 'todo' ? 'Todo' : (cat?.nombre ?? slug)
                  return (
                    <button
                      key={slug}
                      onClick={() => setFilter(slug)}
                      className="snap-start"
                      style={{
                        background: 'none',
                        border: 'none',
                        borderBottom: active ? `2px solid ${color}` : '2px solid transparent',
                        cursor: 'pointer',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.8rem',
                        fontWeight: active ? 600 : 400,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: active ? textColor : 'var(--text-muted)',
                        padding: '1rem 1rem',
                        transition: 'all 0.2s',
                        marginBottom: '-2px',
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
              <div
                className="md:hidden"
                style={{
                  position: 'absolute',
                  top: 0, right: 0, bottom: '2px',
                  width: '2rem',
                  background: 'linear-gradient(to right, transparent, var(--bg))',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </header>

        {/* ── Product grid ─────────────────────────────────────── */}
        <main
          className="grid grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] md:gap-6"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '2.75rem clamp(1rem, 4vw, 3rem) 6rem',
          }}
        >
          {loading ? (
            Array.from({ length: 8 }).map((_e, i) => (
              <div key={i} style={{
                aspectRatio: '3 / 4',
                background: 'var(--border)',
                opacity: 0.45,
              }} />
            ))
          ) : error ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0' }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem',
              }}>
                {error}
              </p>
              <button
                onClick={() => setTick(t => t + 1)}
                className="btn btn-secondary"
              >
                Reintentar
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0' }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
              }}>
                {activeCat === 'todo' ? 'Pronto cargamos más productos.' : (
                  <>
                    Todavía no cargamos productos en esta categoría.{' '}
                    <a
                      href={WA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'underline' }}
                    >
                      Consultanos por WhatsApp.
                    </a>
                  </>
                )}
              </p>
            </div>
          ) : (
            filtered.map(p => <ProductCard key={p.id} producto={p} />)
          )}
        </main>

        <Footer />
      </div>
    </div>
  )
}
