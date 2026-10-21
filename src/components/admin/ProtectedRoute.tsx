import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const session = useAuthStore((s) => s.session)
  const loading = useAuthStore((s) => s.loading)

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f2ecdf',
        fontFamily: 'DM Sans, sans-serif',
        color: '#5a8ab0',
        fontSize: '0.95rem',
      }}>
        Cargando...
      </div>
    )
  }

  if (!session) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}
