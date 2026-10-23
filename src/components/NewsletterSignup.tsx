import { useState, type FormEvent } from 'react'
import { subscribe, type SubscribeResult } from '../services/subscribers'

type UIState = 'idle' | 'loading' | SubscribeResult

export default function NewsletterSignup() {
  const [email, setEmail]     = useState('')
  const [consent, setConsent] = useState(false)
  const [uiState, setUiState] = useState<UIState>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!consent || uiState === 'loading') return
    setUiState('loading')
    const result = await subscribe(email, 'footer')
    setUiState(result)
  }

  const done = uiState === 'ok' || uiState === 'already_subscribed'

  return (
    <div style={{
      padding: '1.5rem clamp(1rem, 4vw, 3rem)',
      borderBottom: '1px solid rgba(255,255,255,0.10)',
    }}>
      {/* Mobile: apilado (máx. 480px). Desde md: texto a la izquierda y
          formulario a la derecha, en la misma grilla que la fila de abajo. */}
      <div className="max-w-[480px] md:flex md:max-w-none md:items-center md:justify-between md:gap-8">
        <div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 0.2rem',
          }}>
            Novedades y promos
          </p>
          <p className="mb-[0.9rem] md:mb-0" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.85)',
          }}>
            Enteráte de descuentos y lanzamientos antes que nadie.
          </p>
        </div>

        <div className="w-full md:max-w-[440px]">
          {done ? (
            <p role="status" aria-live="polite" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.875rem',
              color: '#ffffff',
              margin: 0,
            }}>
              {uiState === 'ok'
                ? '¡Te suscribiste! Pronto recibís novedades de Librería el Sello.'
                : '¡Ya estás en la lista! Gracias por tu interés.'}
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                <label htmlFor="newsletter-email" className="sr-only">Email para novedades y promos</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  autoComplete="email"
                  style={{
                    flex: '1 1 180px',
                    background: '#fff',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: 8,
                    padding: '0.52rem 0.85rem',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.875rem',
                    color: '#1a3a50',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={!consent || uiState === 'loading'}
                  // Mismo par que el CTA final: dorado + texto oscuro (AA). Deshabilitado:
                  // blanco translúcido, para que no se lea como un dorado apagado.
                  className="bg-gold text-text transition-colors enabled:cursor-pointer enabled:hover:bg-bg disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/70 motion-reduce:transition-none"
                  style={{
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.52rem 1.2rem',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {uiState === 'loading' ? 'Enviando...' : 'Suscribirme'}
                </button>
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{ marginTop: '0.15rem', accentColor: 'var(--color-gold)', flexShrink: 0 }}
                />
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.45,
                }}>
                  Acepto recibir novedades y promos de Librería el Sello.
                  Podés darte de baja cuando quieras.
                </span>
              </label>

              {uiState === 'error' && (
                <p role="alert" aria-live="polite" style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.78rem',
                  color: '#ffd7d7',
                  margin: '0.5rem 0 0',
                }}>
                  Algo salió mal. Intentá de nuevo.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
