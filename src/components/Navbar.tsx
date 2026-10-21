import { useNavigate, useLocation } from 'react-router-dom'
import { ShoppingBag } from '@phosphor-icons/react'
import { useCartStore, selectTotalItems } from '../store/cartStore'
import { LogoMark } from './LogoMark'
import MagneticText from './MagneticText'

const PRIMARY = '#2d6490'
const ACCENT  = '#c8960c'

const NAV_LINKS = [
  { label: 'Inicio',     path: '/' },
  { label: 'Categorías', path: '/catalogo' },
  { label: 'Envíos',     path: '/envios' },
  { label: 'Conócenos',  path: '/conocenos' },
]

export default function Navbar() {
  const navigate     = useNavigate()
  const { pathname } = useLocation()
  const { setOpen }  = useCartStore()
  const totalItems   = useCartStore(selectTotalItems)

  return (
    <>
      <nav style={{
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
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.65rem',
            padding: 0,
          }}
        >
          <LogoMark size={42} />
          <span style={{
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
        </button>

        {/* Center: Nav links */}
        <div style={{ display: 'flex', gap: '0.1rem' }}>
          {NAV_LINKS.map(({ label, path }) => {
            const active = pathname === path
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.5rem 0.9rem',
                  position: 'relative',
                }}
              >
                <MagneticText
                  as="span"
                  maxLift={4}
                  radius={55}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.78rem',
                    fontWeight: active ? 600 : 400,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#1a3a50',
                  }}
                >
                  {label}
                </MagneticText>
                {active && (
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
              </button>
            )
          })}
        </div>

        {/* Right: Cart */}
        <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
          <button
            onClick={() => setOpen(true)}
            title="Ver lista de consulta"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#1a3a50',
              display: 'flex',
              padding: '0.55rem',
              position: 'relative',
            }}
          >
            <ShoppingBag size={28} weight={totalItems > 0 ? 'fill' : 'bold'} color={totalItems > 0 ? ACCENT : '#1a3a50'} />
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
        </div>
      </nav>
    </>
  )
}
