import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShoppingBag, List, X, WhatsappLogo } from '@phosphor-icons/react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { useCartStore, selectTotalItems, setCartTrigger } from '../store/cartStore'
import { LogoMark } from './LogoMark'
import MagneticText from './MagneticText'
import { WA_CONSULTA } from '../config'

const PRIMARY = '#2d6490'
const ACCENT  = '#c8960c'
const TEXT    = '#1a3a50'

const NAV_LINKS = [
  { label: 'Inicio',     path: '/' },
  { label: 'Catálogo',   path: '/catalogo' },
  { label: 'Envíos',     path: '/envios' },
  { label: 'Conócenos',  path: '/conocenos' },
]

export default function Navbar() {
  const { pathname }     = useLocation()
  const { setOpen }      = useCartStore()
  const totalItems       = useCartStore(selectTotalItems)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)
  const panelRef          = useRef<HTMLDivElement>(null)
  const toggleRef         = useRef<HTMLButtonElement>(null)
  const navRef             = useRef<HTMLElement>(null)
  const backdropRef        = useRef<HTMLDivElement>(null)
  const reduce             = useReducedMotion()
  const lenis               = useLenis()

  // Close on route change (derived during render, not an effect)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setMobileOpen(false)
  }

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  // Close on outside click/tap
  useEffect(() => {
    if (!mobileOpen) return
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (panelRef.current?.contains(target)) return
      if (toggleRef.current?.contains(target)) return
      setMobileOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [mobileOpen])

  // Lock background scroll while panel is open
  useEffect(() => {
    if (mobileOpen) {
      if (lenis) lenis.stop()
      else document.body.style.overflow = 'hidden'
    } else {
      if (lenis) lenis.start()
      else document.body.style.overflow = ''
    }
    return () => {
      if (lenis) lenis.start()
      else document.body.style.overflow = ''
    }
  }, [mobileOpen, lenis])

  // Mientras el menú mobile está abierto, todo lo que no es de la Navbar
  // (el resto de la página, sea cual sea su estructura) queda inert: Tab no
  // puede escaparse del nav+panel sin necesidad de calcular límites a mano.
  useEffect(() => {
    const navEl = navRef.current
    const parent = navEl?.parentElement
    if (!navEl || !parent) return
    const owned = [navEl, backdropRef.current, panelRef.current].filter(Boolean) as HTMLElement[]
    const others = Array.from(parent.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && !owned.includes(el)
    )
    others.forEach(el => { el.inert = mobileOpen })
    return () => { others.forEach(el => { el.inert = false }) }
  }, [mobileOpen])

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: '58px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.3s ease',
      }}>

        {/* Left: Logo */}
        <Link
          to="/"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.65rem',
            textDecoration: 'none',
          }}
        >
          <LogoMark size={42} />
          <span className="hidden md:inline-block" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '0.01em',
            lineHeight: 1,
            transition: 'color 0.3s',
          }}>
            Librería{' '}
            <span style={{ color: PRIMARY }}>el Sello</span>
          </span>
        </Link>

        {/* Center: Nav links (desktop) */}
        <div className="hidden md:flex" style={{ gap: '0.1rem' }}>
          {NAV_LINKS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.5rem 0.9rem',
                position: 'relative',
                textDecoration: 'none',
              }}
            >
              {({ isActive }) => (
                <>
                  <MagneticText
                    as="span"
                    maxLift={4}
                    radius={55}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.78rem',
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: TEXT,
                    }}
                  >
                    {label}
                  </MagneticText>
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '3px', height: '3px',
                      borderRadius: '50%',
                      background: PRIMARY,
                    }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right: Cart + mobile toggle */}
        <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
          <button
            onClick={e => { setCartTrigger(e.currentTarget); setOpen(true) }}
            title="Ver lista de consulta"
            aria-label={`Abrir lista (${totalItems} producto${totalItems === 1 ? '' : 's'})`}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: TEXT,
              display: 'flex',
              padding: '0.55rem',
              position: 'relative',
            }}
          >
            <ShoppingBag size={28} weight={totalItems > 0 ? 'fill' : 'bold'} color={totalItems > 0 ? ACCENT : TEXT} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: 0, right: 0,
                width: 15, height: 15,
                borderRadius: '50%',
                background: ACCENT,
                color: '#ffffff',
                fontSize: '0.48rem',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>

          <button
            ref={toggleRef}
            className="md:hidden navbar-focus-ring flex items-center justify-center"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: TEXT,
              width: 44, height: 44,
              flexShrink: 0,
            }}
          >
            {mobileOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu backdrop + panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={backdropRef}
            key="mobile-nav-backdrop"
            onClick={() => setMobileOpen(false)}
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18, ease: 'easeOut' }}
            className="md:hidden"
            style={{
              position: 'fixed',
              top: '58px', left: 0, right: 0, bottom: 0,
              zIndex: 98,
              background: 'rgba(26,58,80,0.35)',
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={panelRef}
            id="mobile-nav-panel"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.18, ease: 'easeOut' }}
            className="md:hidden flex flex-col"
            style={{
              position: 'fixed',
              top: '58px', left: 0, right: 0,
              zIndex: 99,
              background: 'var(--nav-bg)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--border)',
              padding: '0.5rem 1rem 1.25rem',
            }}
          >
            {NAV_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                onClick={() => setMobileOpen(false)}
                className="navbar-focus-ring"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 44,
                  padding: '0.6rem 0.5rem',
                  textDecoration: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive ? PRIMARY : TEXT,
                  borderBottom: '1px solid var(--border)',
                })}
              >
                {label}
              </NavLink>
            ))}

            <a
              href={WA_CONSULTA}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-focus-ring"
              style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.55rem',
                minHeight: 44,
                padding: '0.75rem 1rem',
                background: PRIMARY,
                color: '#ffffff',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                borderRadius: '9999px',
              }}
            >
              <WhatsappLogo size={20} weight="fill" color="#25d366" />
              Escribinos por WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
