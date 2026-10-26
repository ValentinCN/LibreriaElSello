import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const session = useAuthStore((s) => s.session)
  const loading = useAuthStore((s) => s.loading)
  const isAdmin = useAuthStore((s) => s.isAdmin)
  const signOut = useAuthStore((s) => s.signOut)

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f2ecdf',
        fontFamily: 'var(--font-body)',
        color: '#5a8ab0',
        fontSize: '0.95rem',
      }}>
        Cargando...
      </div>
    )
  }

  if (!session) return <Navigate to="/admin/login" replace />

  if (!isAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        background: '#f2ecdf',
        fontFamily: 'var(--font-body)',
        padding: '1rem',
        textAlign: 'center',
      }}>
        <p style={{ color: '#1a3a50', fontSize: '0.95rem', maxWidth: 360, margin: 0 }}>
          Esta cuenta no tiene permisos de administrador.
        </p>
        <button
          onClick={signOut}
          style={{
            background: '#2d6490',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.6rem 1.4rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Cerrar sesión
        </button>
      </div>
    )
  }

  return <>{children}</>
}
