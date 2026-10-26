import { useEffect } from 'react'
import ProtectedRoute from '../../components/admin/ProtectedRoute'
import { ensureAuth } from '../../store/authStore'
import AdminDashboardPage from './AdminDashboardPage'

// Entrada de /admin (lazy desde App): inicia la sesión y protege el panel.
// Junta en un chunk aparte todo lo que necesita Supabase del lado admin.
export default function AdminPage() {
  useEffect(ensureAuth, [])

  return (
    <ProtectedRoute>
      <AdminDashboardPage />
    </ProtectedRoute>
  )
}
