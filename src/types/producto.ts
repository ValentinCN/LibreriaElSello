export interface ProductoSupabase {
  id: number
  nombre: string
  descripcion: string | null
  categoria: string
  precio: number | null
  imagen_url: string | null
  activo: boolean
  destacado: boolean
  disponible: boolean
  orden: number
}

export interface CategoriaSupabase {
  id: number
  slug: string
  nombre: string
  orden: number
}
