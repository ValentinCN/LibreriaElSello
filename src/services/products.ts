import { supabase } from './supabase'
import type { ProductoSupabase, CategoriaSupabase } from '../types/producto'

type ProductRow = {
  id: number
  nombre: string
  descripcion: string | null
  precio: number | null
  imagen_url: string | null
  activo: boolean
  destacado: boolean | null
  disponible: boolean | null
  orden: number | null
  categories: { slug: string } | null
}

export async function getProducts(opts?: { includeInactive?: boolean }): Promise<ProductoSupabase[]> {
  let query = supabase
    .from('products')
    .select('id, nombre, descripcion, precio, imagen_url, activo, destacado, disponible, orden, categories(slug)')

  if (!opts?.includeInactive) {
    query = query.eq('activo', true)
  }

  const { data, error } = await query
    .order('orden', { ascending: true })
    .order('nombre', { ascending: true })

  if (error) throw error

  return ((data ?? []) as unknown as ProductRow[]).map(row => ({
    id: row.id,
    nombre: row.nombre,
    descripcion: row.descripcion,
    categoria: row.categories?.slug ?? '',
    precio: row.precio,
    imagen_url: row.imagen_url,
    activo: row.activo,
    destacado: row.destacado ?? false,
    disponible: row.disponible ?? true,
    orden: row.orden ?? 0,
  }))
}

export async function getCategories(): Promise<CategoriaSupabase[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug, nombre, orden')
    .order('orden', { ascending: true })
    .order('nombre', { ascending: true })

  if (error) throw error
  return (data ?? []) as CategoriaSupabase[]
}

export async function toggleDestacado(id: number, nuevoValor: boolean) {
  const { data, error } = await supabase
    .from('products')
    .update({ destacado: nuevoValor })
    .eq('id', id)
    .select('id, destacado')
    .single()

  return { data, error }
}

export async function toggleDisponible(id: number, nuevoValor: boolean) {
  const { data, error } = await supabase
    .from('products')
    .update({ disponible: nuevoValor })
    .eq('id', id)
    .select('id, disponible')
    .single()

  return { data, error }
}

export type ProductoEditable = {
  nombre: string
  descripcion: string | null
  precio: number
  categoriaId: number
}

export async function updateProduct(id: number, campos: ProductoEditable) {
  const { data, error } = await supabase
    .from('products')
    .update({
      nombre: campos.nombre,
      descripcion: campos.descripcion,
      precio: campos.precio,
      categoria_id: campos.categoriaId,
    })
    .eq('id', id)
    .select('id')
    .single()

  return { data, error }
}
