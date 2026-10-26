import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, ensureAuth } from '../../store/authStore'
import PageMeta from '../../components/PageMeta'

// Supabase Auth devuelve los errores en inglés: se traducen por `code`
// (AuthError) y cualquier otro cae en el mensaje genérico, nunca el original.
const LOGIN_ERRORS: Record<string, string> = {
  invalid_credentials:        'Email o contraseña incorrectos.',
  email_not_confirmed:        'Tenés que confirmar el email antes de entrar.',
  user_banned:                'Esta cuenta está bloqueada.',
  over_request_rate_limit:    'Demasiados intentos. Esperá unos minutos y probá de nuevo.',
  over_email_send_rate_limit: 'Demasiados intentos. Esperá unos minutos y probá de nuevo.',
}
const LOGIN_ERROR_GENERIC = 'No se pudo iniciar sesión. Probá de nuevo.'

function loginErrorMessage(err: unknown): string {
  const code = typeof err === 'object' && err !== null && 'code' in err ? String(err.code) : ''
  if (LOGIN_ERRORS[code]) return LOGIN_ERRORS[code]
  // Por si la versión del cliente no trae `code`.
  if (err instanceof Error && /invalid login credentials/i.test(err.message)) return LOGIN_ERRORS.invalid_credentials
  return LOGIN_ERROR_GENERIC
}

export default function AdminLoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const { signIn, session } = useAuthStore()
  const navigate = useNavigate()

  useEffect(ensureAuth, [])

  useEffect(() => {
    if (session) navigate('/admin', { replace: true })
  }, [session, navigate])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate('/admin', { replace: true })
    } catch (err: unknown) {
      setError(loginErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  const input: React.CSSProperties = {
    border: '1.5px solid #c8d8e8',
    borderRadius: 8,
    padding: '0.6rem 0.8rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: '#1a3a50',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    background: '#fff',
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f2ecdf',
      padding: '1rem',
      fontFamily: 'var(--font-body)',
    }}>
      <PageMeta title="Panel · Librería el Sello" />
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '2.5rem 2rem',
        width: '100%',
        maxWidth: 380,
        boxShadow: '0 4px 24px rgba(45,100,144,0.10)',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          color: '#1a3a50',
          fontSize: '1.75rem',
          margin: '0 0 0.25rem',
          textAlign: 'center',
        }}>
          el Sello
        </h1>
        <p style={{
          color: '#5a8ab0',
          fontSize: '0.78rem',
          textAlign: 'center',
          margin: '0 0 2rem',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
        }}>
          Panel de administración
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.82rem', color: '#1a3a50', fontWeight: 600 }}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={input}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.82rem', color: '#1a3a50', fontWeight: 600 }}>Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={input}
            />
          </label>

          {error && (
            <p style={{
              fontSize: '0.85rem',
              color: '#c0392b',
              background: '#fdf2f2',
              border: '1px solid #f5c6c6',
              borderRadius: 6,
              padding: '0.5rem 0.75rem',
              margin: 0,
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              background: submitting ? '#5a8ab0' : '#2d6490',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.7rem 1rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: submitting ? 'not-allowed' : 'pointer',
              marginTop: '0.5rem',
              transition: 'background 0.15s ease',
            }}
          >
            {submitting ? 'Entrando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
