import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import PageBackground from '../components/PageBackground'
import MagneticText from '../components/MagneticText'
import { getProducts, getCategories } from '../services/products'
import type { ProductoSupabase, CategoriaSupabase } from '../types/producto'

const PRIMARY = '#2d6490'

const SLUG_COLOR: Record<string, string> = {
  artistico: '#FF6B35',
  escolar:   '#3B82F6',
  libreria:  '#22C55E',
  papeleria: '#A855F7',
}

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

  const accentColor    = activeCat !== 'todo' ? (SLUG_COLOR[activeCat] ?? PRIMARY) : PRIMARY
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
      <PageBackground />
      <Navbar />

      {/* Atmospheric top accent */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '35vh',
        background: `radial-gradient(ellipse 50% 50% at 50% -5%, ${accentColor}14 0%, transparent 100%)`,
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'background 0.5s ease',
      }} />

      <div style={{ position: 'relative', zIndex: 1, paddingTop: '58px' }}>

        {/* ── Header ───────────────────────────────────────────── */}
        <header style={{
          padding: '3.5rem 3rem 0',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              color: '#1a3a50',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              opacity: 0.7,
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
                  color: activeCat !== 'todo' ? accentColor : 'var(--text)',
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
                    fontSize: '0.6rem',
                    pointerEvents: 'none',
                  }}>▾</span>
                </div>
              </div>
            </div>

            {/* Category tabs */}
            <div style={{ display: 'flex', gap: 0, marginBottom: '-1px', flexWrap: 'wrap' }}>
              {(['todo', ...categorias.map(c => c.slug)]).map(slug => {
                const cat    = categorias.find(c => c.slug === slug)
                const active = slug === activeCat
                const color  = SLUG_COLOR[slug] ?? PRIMARY
                const label  = slug === 'todo' ? 'Todo' : (cat?.nombre ?? slug)
                return (
                  <button
                    key={slug}
                    onClick={() => setFilter(slug)}
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
                      color: active ? color : 'rgba(26,58,80,0.55)',
                      padding: '1rem 1.25rem',
                      transition: 'all 0.2s',
                      marginBottom: '-2px',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </header>

        {/* ── Product grid ─────────────────────────────────────── */}
        <main style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '2.75rem 3rem 6rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}>
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
                color: 'rgba(26,58,80,0.6)',
                marginBottom: '1.25rem',
              }}>
                {error}
              </p>
              <button
                onClick={() => setTick(t => t + 1)}
                style={{
                  padding: '0.55rem 1.5rem',
                  background: 'transparent',
                  border: '1px solid #2d6490',
                  color: '#2d6490',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Reintentar
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0' }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.9rem',
                color: 'rgba(26,58,80,0.6)',
              }}>
                Pronto cargamos más productos.
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
