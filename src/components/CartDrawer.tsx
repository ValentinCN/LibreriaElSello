import { useCartStore, selectTotalPrice, buildWhatsAppMessage } from '../store/cartStore'
import { WA_URL } from '../config'

const GOLD = '#e8a020'
const WA   = '#25D366'

export default function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQty, clear } = useCartStore()
  const total = useCartStore(selectTotalPrice)
  const waLink = items.length
    ? `${WA_URL}?text=${encodeURIComponent(buildWhatsAppMessage(items))}`
    : '#'

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
      <aside style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0,
        width: 'min(400px, 95vw)',
        background: 'var(--bg)',
        borderLeft: '1px solid var(--border)',
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.4)',
      }}>
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
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.56rem',
              letterSpacing: '0.3em',
              color: `${GOLD}80`,
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
            }}>
              Mi consulta
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.35rem',
              fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1,
            }}>
              Lista de productos
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              width: 34, height: 34,
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
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: 'var(--text-muted)',
                marginBottom: '0.75rem',
              }}>
                Tu lista está vacía
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
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
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      color: 'var(--text)',
                      lineHeight: 1.3,
                      marginBottom: '0.2rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.nombre}
                    </p>
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '0.85rem',
                      color: GOLD,
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
                    {[
                      { label: '−', action: () => updateQty(item.id, item.cantidad - 1) },
                      { label: `${item.cantidad}`, action: undefined },
                      { label: '+', action: () => updateQty(item.id, item.cantidad + 1) },
                    ].map(({ label, action }) => (
                      <button
                        key={label}
                        onClick={action}
                        style={{
                          background: 'none',
                          border: 'none',
                          width: 28, height: 28,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: action ? '1rem' : '0.78rem',
                          color: action ? 'var(--text-muted)' : 'var(--text)',
                          cursor: action ? 'pointer' : 'default',
                          transition: 'color 0.15s',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: 'none', border: 'none',
                      color: 'var(--text-dim)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      padding: '0.2rem',
                      transition: 'color 0.15s',
                      flexShrink: 0,
                    }}
                    title="Quitar"
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
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>
                Total estimado
              </span>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.4rem',
                fontWeight: 700,
                color: GOLD,
              }}>
                ${total.toLocaleString('es-AR')}
              </span>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '0.85rem',
                background: WA,
                color: '#fff',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Consultar por WhatsApp
            </a>

            <button
              onClick={clear}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.58rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                textAlign: 'center',
                padding: '0.2rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
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
