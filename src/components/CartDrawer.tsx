import { useEffect, useRef } from 'react'
import { useCartStore, selectTotalPrice, buildWhatsAppMessage, getCartTrigger } from '../store/cartStore'
import { WA_URL } from '../config'

const TITLE_ID = 'cart-drawer-title'

export default function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQty, clear } = useCartStore()
  const total = useCartStore(selectTotalPrice)
  const waLink = items.length
    ? `${WA_URL}?text=${encodeURIComponent(buildWhatsAppMessage(items))}`
    : '#'

  const panelRef    = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Foco al botón cerrar al abrir; vuelve al disparador (capturado en el
  // onClick de la Navbar, antes de que inert le quitara el foco) al cerrar.
  useEffect(() => {
    if (isOpen) {
      closeBtnRef.current?.focus()
    } else {
      getCartTrigger()?.focus()
    }
  }, [isOpen])

  // Escape cierra. El resto de la app queda `inert` (ver App.tsx) mientras
  // isOpen=true, así que Tab/Shift+Tab ya no tienen a dónde escaparse —
  // el orden nativo del navegador queda confinado al panel sin cálculos manuales.
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, setOpen])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(14,11,26,0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 200,
            animation: 'fadeIn 0.2s ease',
          }}
        />
      )}

      {/* Drawer panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        inert={!isOpen}
        className="cart-drawer-panel"
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          background: 'var(--bg)',
          borderLeft: '1px solid var(--border)',
          zIndex: 201,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          visibility: isOpen ? 'visible' : 'hidden',
          transition: isOpen
            ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 0s'
            : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 0.3s',
          boxShadow: isOpen ? '-8px 0 40px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.4rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}>
          <div>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              color: 'var(--color-gold-text)',
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
            }}>
              Mi consulta
            </p>
            <h2 id={TITLE_ID} style={{
              fontFamily: "var(--font-display)",
              fontSize: '1.35rem',
              fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1,
            }}>
              Lista de productos
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            onClick={() => setOpen(false)}
            aria-label="Cerrar lista de productos"
            style={{
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </header>

        {/* Items list */}
        <div data-lenis-prevent style={{
          flex: 1,
          overflowY: 'auto',
          padding: items.length ? '1rem 1.5rem' : '3rem 1.5rem',
        }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: 'var(--text-muted)',
                marginBottom: '0.75rem',
              }}>
                Tu lista está vacía
              </p>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: '0.78rem',
                color: 'var(--text-dim)',
                lineHeight: 1.6,
              }}>
                Agregá productos desde el catálogo<br />y consultá todo de una vez por WhatsApp.
              </p>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
              {items.map((item) => (
                <li key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  padding: '0.85rem 0',
                  borderBottom: '1px solid var(--border)',
                }}>
                  {/* Name + price */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="line-clamp-2" style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      color: 'var(--text)',
                      lineHeight: 1.3,
                      marginBottom: '0.2rem',
                    }}>
                      {item.nombre}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-display)",
                      fontSize: '0.85rem',
                      color: 'var(--color-text)',
                      fontWeight: 700,
                    }}>
                      ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                    </p>
                  </div>

                  {/* Qty controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.1rem',
                    border: '1px solid var(--border)',
                    flexShrink: 0,
                  }}>
                    <button
                      onClick={() => updateQty(item.id, item.cantidad - 1)}
                      aria-label={`Restar una unidad de ${item.nombre}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        width: 40, height: 40,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "var(--font-body)",
                        fontSize: '1rem',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        transition: 'color 0.15s',
                      }}
                    >
                      −
                    </button>
                    <span
                      aria-hidden="true"
                      style={{
                        width: 28, height: 28,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "var(--font-body)",
                        fontSize: '0.78rem',
                        color: 'var(--text)',
                      }}
                    >
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.cantidad + 1)}
                      aria-label={`Sumar una unidad de ${item.nombre}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        width: 40, height: 40,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "var(--font-body)",
                        fontSize: '1rem',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        transition: 'color 0.15s',
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Quitar ${item.nombre}`}
                    style={{
                      background: 'none', border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      width: 40, height: 40,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'color 0.15s',
                      flexShrink: 0,
                    }}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <footer style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--border)',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>
                Total estimado
              </span>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--color-text)',
              }}>
                ${total.toLocaleString('es-AR')}
              </span>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              Consultar por WhatsApp
            </a>

            <button
              onClick={clear}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "var(--font-body)",
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                textAlign: 'center',
                padding: '0.2rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Limpiar lista
            </button>
          </footer>
        )}
      </aside>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </>
  )
}
