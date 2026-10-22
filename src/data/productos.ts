import type { Categoria } from '../constants/categories'

export type { Categoria }

export interface Producto {
  id: string
  nombre: string
  categoria: Categoria
  precio: number
  descripcion: string
  imagen: string | null
  destacado?: boolean
}

export const PRODUCTOS: Producto[] = [
  // ── Artístico ──────────────────────────────────────────────────────
  {
    id: 'A1',
    nombre: 'Marcadores Faber-Castell x12',
    categoria: 'Artístico',
    precio: 4500,
    descripcion: 'Set de 12 marcadores de doble punta, colores vibrantes permanentes.',
    imagen: null,
    destacado: true,
  },
  {
    id: 'A2',
    nombre: 'Lápices de colores x36',
    categoria: 'Artístico',
    precio: 6800,
    descripcion: 'Caja de 36 lápices de colores profesionales, mina suave y resistente.',
    imagen: null,
    destacado: true,
  },
  {
    id: 'A3',
    nombre: 'Set de acrílicos 12 colores',
    categoria: 'Artístico',
    precio: 3200,
    descripcion: 'Pinturas acrílicas de 20ml, colores opacos de alta pigmentación.',
    imagen: null,
  },
  {
    id: 'A4',
    nombre: 'Set de pinceles x6',
    categoria: 'Artístico',
    precio: 2800,
    descripcion: 'Pinceles de pelo sintético, distintos anchos para acuarela y acrílico.',
    imagen: null,
  },
  {
    id: 'A5',
    nombre: 'Papel ilustración A3 x20h',
    categoria: 'Artístico',
    precio: 1900,
    descripcion: 'Papel ilustración 180gr, ideal para marcadores y tintas.',
    imagen: null,
  },
  {
    id: 'A6',
    nombre: 'Rotuladores metalizados x8',
    categoria: 'Artístico',
    precio: 3600,
    descripcion: 'Marcadores metálicos dorado, plata y colores sobre cualquier superficie.',
    imagen: null,
  },

  // ── Escolar ────────────────────────────────────────────────────────
  {
    id: 'E1',
    nombre: 'Cuaderno tapa dura 100h',
    categoria: 'Escolar',
    precio: 2400,
    descripcion: 'Cuaderno universitario de tapa dura, 100 hojas rayadas, espiral.',
    imagen: null,
    destacado: true,
  },
  {
    id: 'E2',
    nombre: 'Cartuchera estampada',
    categoria: 'Escolar',
    precio: 3500,
    descripcion: 'Cartuchera de tela con cierre, diseños variados, tres bolsillos.',
    imagen: null,
  },
  {
    id: 'E3',
    nombre: 'Mochila escolar reforzada',
    categoria: 'Escolar',
    precio: 18000,
    descripcion: 'Mochila con sistema anti-derrame, compartimiento para notebook y bolsillos laterales.',
    imagen: null,
    destacado: true,
  },
  {
    id: 'E4',
    nombre: 'Compás metálico escolar',
    categoria: 'Escolar',
    precio: 1200,
    descripcion: 'Compás de metal con extensión para círculos de hasta 30cm.',
    imagen: null,
  },
  {
    id: 'E5',
    nombre: 'Regla flexible 30cm',
    categoria: 'Escolar',
    precio: 600,
    descripcion: 'Regla transparente flexible de 30cm con escala en milímetros.',
    imagen: null,
  },
  {
    id: 'E6',
    nombre: 'Set geométrico 5 piezas',
    categoria: 'Escolar',
    precio: 2100,
    descripcion: 'Escuadra, transportador, regla, compás y semicírculo en estuche.',
    imagen: null,
  },

  // ── Librería ───────────────────────────────────────────────────────
  {
    id: 'L1',
    nombre: 'Agenda Pusheen 2026',
    categoria: 'Librería',
    precio: 5200,
    descripcion: 'Agenda semanal licenciada Pusheen, tapa dura, 352 páginas.',
    imagen: null,
    destacado: true,
  },
  {
    id: 'L2',
    nombre: 'Agenda Hello Kitty 2026',
    categoria: 'Librería',
    precio: 5200,
    descripcion: 'Agenda semanal licenciada Hello Kitty, tapa dura con stickers.',
    imagen: null,
    destacado: true,
  },
  {
    id: 'L3',
    nombre: 'Agenda Mickey Mouse 2026',
    categoria: 'Librería',
    precio: 5000,
    descripcion: 'Agenda mensual/semanal Disney Mickey, tapa dura rigída.',
    imagen: null,
  },
  {
    id: 'L4',
    nombre: 'Agenda Minnie Mouse 2026',
    categoria: 'Librería',
    precio: 5000,
    descripcion: 'Agenda mensual/semanal Disney Minnie, tapa dura con detalles rojos.',
    imagen: null,
  },
  {
    id: 'L5',
    nombre: 'Agenda KPOP Temática 2026',
    categoria: 'Librería',
    precio: 5500,
    descripcion: 'Agenda diseño KPOP con ilustraciones, pegatinas y sobre de regalo.',
    imagen: null,
    destacado: true,
  },
  {
    id: 'L6',
    nombre: 'Cuaderno Sanrio A5',
    categoria: 'Librería',
    precio: 2800,
    descripcion: 'Cuaderno A5 licenciado Sanrio, 80 hojas lisas, tapa blanda.',
    imagen: null,
  },

  // ── Papelería ──────────────────────────────────────────────────────
  {
    id: 'P1',
    nombre: 'Resma A4 75gr 500h',
    categoria: 'Papelería',
    precio: 8500,
    descripcion: 'Resma de papel A4 de 75gr, blancura superior para impresión láser/inkjet.',
    imagen: null,
    destacado: true,
  },
  {
    id: 'P2',
    nombre: 'Tijeras acero inox 21cm',
    categoria: 'Papelería',
    precio: 1800,
    descripcion: 'Tijeras de acero inoxidable con mango ergonómico, corte preciso.',
    imagen: null,
  },
  {
    id: 'P3',
    nombre: 'Bisturí profesional c/repuestos',
    categoria: 'Papelería',
    precio: 900,
    descripcion: 'Bisturí de mango metálico con 5 hojas de repuesto incluidas.',
    imagen: null,
  },
  {
    id: 'P4',
    nombre: 'Cinta adhesiva transparente x3',
    categoria: 'Papelería',
    precio: 1200,
    descripcion: 'Pack de 3 cintas adhesivas transparentes 18mm x 33m.',
    imagen: null,
  },
  {
    id: 'P5',
    nombre: 'Corrector líquido de punta',
    categoria: 'Papelería',
    precio: 800,
    descripcion: 'Corrector líquido de punta fina, secado rápido, 7ml.',
    imagen: null,
  },
  {
    id: 'P6',
    nombre: 'Goma de miga blanca',
    categoria: 'Papelería',
    precio: 400,
    descripcion: 'Goma de miga para lápiz, no daña el papel, limpieza perfecta.',
    imagen: null,
  },
]
