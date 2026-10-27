import type { CSSProperties } from 'react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { waLink } from '../../config'

const texto: CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  color: 'var(--text-muted)',
  marginBottom: '1.25rem',
}

const titulo: CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
  fontWeight: 700,
  color: 'var(--text)',
  marginBottom: '0.75rem',
  overflowWrap: 'anywhere',
}

/** 0 resultados en la categoría activa, pero sí en otras. */
export function OtrasCategorias({ categoria, cantidad, onVerTodas }: {
  categoria: string
  cantidad: number
  onVerTodas: () => void
}) {
  return (
    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
      <p role="status" style={texto}>
        No hay resultados en {categoria}, pero hay {cantidad} en otras categorías.
      </p>
      <button type="button" onClick={onVerTodas} className="btn btn-secondary">
        Ver en todas
      </button>
    </div>
  )
}

/** 0 resultados en todo el catálogo: CTA a WhatsApp con el término. */
export function SinResultados({ termino }: { termino: string }) {
  return (
    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
      <p role="status" style={titulo}>No encontramos «{termino}»</p>
      <p style={texto}>¿No lo encontrás? Puede que lo tengamos en el local.</p>
      <a
        href={waLink(`¡Hola! Estoy buscando: ${termino}. ¿Lo tienen?`)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
        Preguntar por WhatsApp
      </a>
    </div>
  )
}
