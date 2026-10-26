import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import {
  WA_URL,
  DIRECCION,
  HORARIO,
  HORARIO_TEL,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
} from '../config'
import NewsletterSignup from './NewsletterSignup'

const ACCENT  = 'var(--color-gold)'

const linkStyle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: '0.72rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.85)',
  textDecoration: 'none',
  transition: 'color 0.2s',
}

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-text)',
      borderTop: `2px solid ${ACCENT}`,
    }}>

      <NewsletterSignup />

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '1.75rem clamp(1rem, 4vw, 2rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
      }}>
        {/* Left: brand + address */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: '1rem',
            fontWeight: 700,
            color: '#ffffff',
          }}>
            Librería <span style={{ color: ACCENT }}>el Sello</span>
          </span>
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.06em',
          }}>
            {DIRECCION} · {HORARIO}
          </span>
        </div>

        {/* Right: social + copyright. Los "·" solo desde md: en mobile la fila
            se corta y quedarían colgando; ahí separa el gap. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            to="/conocenos"
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
          >
            Conócenos
          </Link>
          <span className="hidden md:inline" aria-hidden="true" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>·</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
          >
            {INSTAGRAM_HANDLE}
          </a>
          <span className="hidden md:inline" aria-hidden="true" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>·</span>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
          >
            {HORARIO_TEL}
          </a>
          <span className="hidden md:inline" aria-hidden="true" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>·</span>
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: '0.68rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
          }}>
            © 2026
          </span>
        </div>
      </div>
    </footer>
  )
}
