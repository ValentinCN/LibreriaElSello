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
      <div style={{ maxWidth: 480 }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '0.95rem',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 0.2rem',
        }}>
          Novedades y promos
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.78rem',
          color: 'rgba(255,255,255,0.55)',
          margin: '0 0 0.9rem',
        }}>
          Enteráte de descuentos y lanzamientos antes que nadie.
        </p>

        {done ? (
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.875rem',
            color: uiState === 'ok' ? '#c8960c' : 'rgba(255,255,255,0.75)',
            margin: 0,
          }}>
            {uiState === 'ok'
              ? '¡Te suscribiste! Pronto recibís novedades de Librería el Sello.'
              : '¡Ya estás en la lista! Gracias por tu interés.'}
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
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
                style={{
                  background: !consent || uiState === 'loading' ? 'rgba(200,150,12,0.45)' : '#c8960c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.52rem 1.2rem',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: !consent || uiState === 'loading' ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.15s ease',
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
                style={{ marginTop: '0.15rem', accentColor: '#c8960c', flexShrink: 0 }}
              />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.45,
              }}>
                Acepto recibir novedades y promos de Librería el Sello.
                Podés darte de baja cuando quieras.
              </span>
            </label>

            {uiState === 'error' && (
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.78rem',
                color: '#ffaaaa',
                margin: '0.5rem 0 0',
              }}>
                Algo salió mal. Intentá de nuevo.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
