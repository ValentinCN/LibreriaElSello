-- Migration: RLS write policies para products (Fase 2B — toggle destacado)
-- Correr a mano en el SQL Editor de Supabase (igual que subscribers.sql).
-- Solo UPDATE por ahora — INSERT/DELETE quedan para el formulario crear/editar (después).

create policy "authenticated update products" on products
  for update to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
