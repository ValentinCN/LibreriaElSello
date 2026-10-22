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

const PRIMARY = '#2d6490'
const ACCENT  = '#c8960c'

const linkStyle: CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.72rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.7)',
  textDecoration: 'none',
  transition: 'color 0.2s',
}

export default function Footer() {
  return (
    <footer style={{
      background: PRIMARY,
      borderTop: `2px solid ${ACCENT}`,
    }}>

      <NewsletterSignup />

      <div style={{
        padding: '1.75rem clamp(1rem, 4vw, 3rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
      }}>
        {/* Left: brand + address */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1rem',
            fontWeight: 700,
            color: '#ffffff',
          }}>
            Librería <span style={{ color: ACCENT }}>el Sello</span>
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.06em',
          }}>
            {DIRECCION} · {HORARIO}
          </span>
        </div>

        {/* Right: social + copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            to="/conocenos"
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          >
            Conócenos
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>·</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          >
            {INSTAGRAM_HANDLE}
          </a>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>·</span>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          >
            {HORARIO_TEL}
          </a>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>·</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.68rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}>
            © 2026
          </span>
        </div>
      </div>
    </footer>
  )
}
