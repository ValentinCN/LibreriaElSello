import { useEffect, useState, lazy, Suspense, type ComponentType } from 'react'
import { createPortal } from 'react-dom'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import { LazyMotion, domAnimation } from 'motion/react'
import CartDrawer        from './components/CartDrawer'
import Navbar            from './components/Navbar'
import SplashPage        from './pages/SplashPage'
import { useCartStore }  from './store/cartStore'

// La home va en el bundle principal; el resto de las páginas se baja aparte.
// El mismo import() sirve para React.lazy y para la precarga en idle, así se
// reutiliza el chunk. React.lazy igual suspende la primera vez aunque el módulo
// ya esté bajado (el import() nuevo todavía no resolvió) y se veía el fallback:
// si la precarga ya terminó, se renderiza el componente directo. Se elige una
// vez por montaje para que no se remonte si la carga termina después.
function lazyPage(load: () => Promise<{ default: ComponentType }>) {
  let Loaded: ComponentType | null = null
  const track = () => load().then((mod) => { Loaded = mod.default; return mod })
  const Lazy = lazy(track)
  function Page() {
    const [Component] = useState(() => Loaded ?? Lazy)
    return <Component />
  }
  return { Page, preload: track }
}

const Catalog   = lazyPage(() => import('./pages/CatalogPage'))
const Envios    = lazyPage(() => import('./pages/EnviosPage'))
const Conocenos = lazyPage(() => import('./pages/ConocenosPage'))
const CatalogPage   = Catalog.Page
const EnviosPage    = Envios.Page
const ConocenosPage = Conocenos.Page

// Precarga las páginas públicas cuando el navegador queda libre (el admin no),
// más el servicio de productos del catálogo: así Supabase queda bajado antes
// de entrar al Catálogo sin sumarse a la carga inicial de la home.
function preloadPages() {
  const run = () => {
    Catalog.preload(); Envios.preload(); Conocenos.preload()
    import('./services/products')
  }
  if ('requestIdleCallback' in window) {
    const id = requestIdleCallback(run)
    return () => cancelIdleCallback(id)
  }
  const id = setTimeout(run, 2000)
  return () => clearTimeout(id)
}

// El panel se baja recién al entrar a /admin: el visitante no lo descarga.
// La sesión (authStore + Supabase) se inicia ahí adentro, no en App.
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminPage      = lazy(() => import('./pages/admin/AdminPage'))

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
        fontFamily: 'var(--font-body)',
        color: '#5a8ab0',
        fontSize: '0.95rem',
      }}
    >
      Cargando...
    </div>
  )
}

// Mientras baja una página: la misma Navbar y debajo el fondo beige con el alto
// completo (igual que el contenedor de las páginas), para que no salte nada.
function PageFallback() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)' }}>
      <Navbar />
    </div>
  )
}

function App() {
  const cartOpen = useCartStore((s) => s.isOpen)

  useEffect(preloadPages, [])

  return (
    // Motion con las features mínimas (animaciones, hover, inView, exit): no se
    // usan layout ni drag. strict: un <motion.*> suelto tira error, usar <m.*>.
    <LazyMotion features={domAnimation} strict>
      <ReactLenis root>
        {/* Mientras la lista (portal a document.body) está abierta, el resto
            de la app queda inert: foco y clicks no pueden escapar del panel. */}
        <div inert={cartOpen}>
          <BrowserRouter>
            <Routes>
              <Route path="/"          element={<SplashPage />} />
              <Route path="/catalogo"  element={<Suspense fallback={<PageFallback />}><CatalogPage /></Suspense>} />
              <Route path="/envios"    element={<Suspense fallback={<PageFallback />}><EnviosPage /></Suspense>} />
              <Route path="/conocenos" element={<Suspense fallback={<PageFallback />}><ConocenosPage /></Suspense>} />
              <Route path="/admin/login" element={
                <Suspense fallback={<AdminFallback />}><AdminLoginPage /></Suspense>
              } />
              <Route path="/admin" element={
                <Suspense fallback={<AdminFallback />}><AdminPage /></Suspense>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </div>
        {createPortal(<CartDrawer />, document.body)}
      </ReactLenis>
    </LazyMotion>
  )
}

export default App
