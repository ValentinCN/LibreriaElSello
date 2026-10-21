import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import { ThemeProvider } from './contexts/ThemeContext'
import CartDrawer        from './components/CartDrawer'
import CursorTrail       from './components/CursorTrail'
import ProtectedRoute    from './components/admin/ProtectedRoute'
import SplashPage        from './pages/SplashPage'
import CatalogPage       from './pages/CatalogPage'
import EnviosPage        from './pages/EnviosPage'
import ConocenosPage     from './pages/ConocenosPage'
import AdminLoginPage    from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import { useAuthStore }  from './store/authStore'

function App() {
  const initAuth = useAuthStore((s) => s.initAuth)

  useEffect(() => {
    return initAuth()
  }, [initAuth])

  return (
    <ThemeProvider>
      <ReactLenis root>
        <CursorTrail />
        {createPortal(<CartDrawer />, document.body)}
        <BrowserRouter>
          <Routes>
            <Route path="/"          element={<SplashPage />} />
            <Route path="/catalogo"  element={<CatalogPage />} />
            <Route path="/envios"    element={<EnviosPage />} />
            <Route path="/conocenos" element={<ConocenosPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={
              <ProtectedRoute><AdminDashboardPage /></ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ReactLenis>
    </ThemeProvider>
  )
}

export default App
