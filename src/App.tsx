import { useEffect, lazy, Suspense } from 'react'
import { createPortal } from 'react-dom'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import CartDrawer        from './components/CartDrawer'
import CursorTrail       from './components/CursorTrail'
import ProtectedRoute    from './components/admin/ProtectedRoute'
import SplashPage        from './pages/SplashPage'
import CatalogPage       from './pages/CatalogPage'
import EnviosPage        from './pages/EnviosPage'
import ConocenosPage     from './pages/ConocenosPage'
import { useAuthStore }  from './store/authStore'
import { useCartStore }  from './store/cartStore'

// El panel se baja recién al entrar a /admin: el visitante no lo descarga.
const AdminLoginPage     = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'))

// Igual al "Cargando..." de ProtectedRoute, para que no se note el cambio.
function AdminFallback() {
  return (
    <div
      role="status"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f2ecdf',
        fontFamily: 'DM Sans, sans-serif',
        color: '#5a8ab0',
        fontSize: '0.95rem',
      }}
    >
      Cargando...
    </div>
  )
}

function App() {
  const initAuth = useAuthStore((s) => s.initAuth)
  const cartOpen = useCartStore((s) => s.isOpen)

  useEffect(() => {
    return initAuth()
  }, [initAuth])

  return (
    <ReactLenis root>
      {/* Mientras la lista (portal a document.body) está abierta, el resto
          de la app queda inert: foco y clicks no pueden escapar del panel. */}
      <div inert={cartOpen}>
        <CursorTrail />
        <BrowserRouter>
          <Routes>
            <Route path="/"          element={<SplashPage />} />
            <Route path="/catalogo"  element={<CatalogPage />} />
            <Route path="/envios"    element={<EnviosPage />} />
            <Route path="/conocenos" element={<ConocenosPage />} />
            <Route path="/admin/login" element={
              <Suspense fallback={<AdminFallback />}><AdminLoginPage /></Suspense>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Suspense fallback={<AdminFallback />}><AdminDashboardPage /></Suspense>
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
      {createPortal(<CartDrawer />, document.body)}
    </ReactLenis>
  )
}

export default App
