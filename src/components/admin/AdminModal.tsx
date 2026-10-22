import { useEffect } from 'react'
import type { FormEvent, ReactNode } from 'react'

type Props = {
  title: string
  /** Mientras se guarda no se puede cerrar (cortaría una subida a mitad de camino). */
  busy: boolean
  onClose: () => void
  onSubmit: (e: FormEvent) => void
  children: ReactNode
}

export default function AdminModal({ title, busy, onClose, onSubmit, children }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !busy) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [busy, onClose])

  return (
    <div
      data-lenis-prevent
      role="presentation"
      onClick={() => { if (!busy) onClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26,58,80,0.35)',
        display: 'flex',
        overflowY: 'auto',
        zIndex: 100,
        padding: '1rem',
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        noValidate
        style={{
          // margin auto centra sin recortar: si el form es más alto que la pantalla, scrollea.
          margin: 'auto',
          background: '#fff',
          borderRadius: 10,
          padding: '1.25rem',
          width: '100%',
          maxWidth: 440,
          boxShadow: '0 8px 30px rgba(26,58,80,0.25)',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        <h3 style={{ color: '#1a3a50', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.1rem' }}>
          {title}
        </h3>
        {children}
      </form>
    </div>
  )
}
