import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  nombre: string
  precio: number
  cantidad: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (id: string, nombre: string, precio: number) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  setOpen: (v: boolean) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (id, nombre, precio) =>
        set((s) => {
          const found = s.items.find((i) => i.id === id)
          if (found) return { items: s.items.map((i) => i.id === id ? { ...i, cantidad: i.cantidad + 1 } : i) }
          return { items: [...s.items, { id, nombre, precio, cantidad: 1 }] }
        }),

      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      updateQty: (id, qty) =>
        set((s) => ({
          items: qty <= 0
            ? s.items.filter((i) => i.id !== id)
            : s.items.map((i) => i.id === id ? { ...i, cantidad: qty } : i),
        })),

      clear: () => set({ items: [] }),
      setOpen: (v) => set({ isOpen: v }),
    }),
    { name: 'cart-el-sello', partialize: (s) => ({ items: s.items }) }
  )
)

// Fuera del estado reactivo: capturado de forma síncrona en el onClick del
// botón que abre la lista, ANTES de que React vuelva a renderizar y marque
// `inert` al resto de la app (eso le quita el foco al botón). Si se capturara
// en un useEffect de CartDrawer, ya sería tarde: inert ya habría corrido.
let cartTrigger: HTMLElement | null = null
export const setCartTrigger = (el: HTMLElement | null) => { cartTrigger = el }
export const getCartTrigger = () => cartTrigger

export const selectTotalItems = (s: CartState) =>
  s.items.reduce((n, i) => n + i.cantidad, 0)

export const selectTotalPrice = (s: CartState) =>
  s.items.reduce((n, i) => n + i.precio * i.cantidad, 0)

export const buildWhatsAppMessage = (items: CartItem[]): string => {
  if (!items.length) return ''
  const lines = items.map(
    (i) => `• ${i.nombre} x${i.cantidad} — $${(i.precio * i.cantidad).toLocaleString('es-AR')}`
  )
  const total = items.reduce((n, i) => n + i.precio * i.cantidad, 0)
  return (
    `Hola! Quería consultar por los siguientes productos:\n\n` +
    `${lines.join('\n')}\n\n` +
    `Total estimado: $${total.toLocaleString('es-AR')}`
  )
}
