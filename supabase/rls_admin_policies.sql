-- Migration: RLS restringido a administradores (Fase 3A — seguridad backend)
-- Correr a mano en el SQL Editor de Supabase, después de admins.sql.
-- Idempotente: cada create va precedido de drop policy if exists.

-- ============ products ============
-- "public read active products" (schema.sql) no se toca: ya hace lectura
-- pública solo de activo = true.

drop policy if exists "admin read all products" on public.products;
create policy "admin read all products" on public.products
  for select to authenticated
  using ((select public.is_admin()));

-- Reemplaza "authenticated update products" (dejaba escribir a cualquier
-- usuario logueado, no solo admin).
drop policy if exists "authenticated update products" on public.products;

drop policy if exists "admin insert products" on public.products;
create policy "admin insert products" on public.products
  for insert to authenticated
  with check ((select public.is_admin()));

drop policy if exists "admin update products" on public.products;
create policy "admin update products" on public.products
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- Sin policy de DELETE: los productos no se borran, se archivan
-- (activo = false) vía UPDATE.

-- ============ categories ============
-- Sin cambios: lectura pública ya existe ("public read categories"),
-- no tiene escritura hoy y no se agrega en esta fase.

-- ============ subscribers ============
-- "anon insert subscribers" (subscribers.sql) no se toca.

-- Reemplaza "authenticated read subscribers" (dejaba leer la lista a
-- cualquier usuario logueado, no solo admin).
drop policy if exists "authenticated read subscribers" on public.subscribers;

drop policy if exists "admin read subscribers" on public.subscribers;
create policy "admin read subscribers" on public.subscribers
  for select to authenticated
  using ((select public.is_admin()));

-- ============ storage.objects — bucket "productos" ============
-- La descarga pública funciona porque el bucket es público (no depende de
-- policies acá). El SELECT de abajo es solo para que el panel admin pueda
-- listar los objetos del bucket.

drop policy if exists "admin insert productos bucket" on storage.objects;
create policy "admin insert productos bucket" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'productos' and (select public.is_admin()));

drop policy if exists "admin update productos bucket" on storage.objects;
create policy "admin update productos bucket" on storage.objects
  for update to authenticated
  using (bucket_id = 'productos' and (select public.is_admin()))
  with check (bucket_id = 'productos' and (select public.is_admin()));

drop policy if exists "admin delete productos bucket" on storage.objects;
create policy "admin delete productos bucket" on storage.objects
  for delete to authenticated
  using (bucket_id = 'productos' and (select public.is_admin()));

  drop policy if exists "admin select productos bucket" on storage.objects;
create policy "admin select productos bucket" on storage.objects
  for select to authenticated
  using (bucket_id = 'productos' and (select public.is_admin()));

update storage.buckets
set file_size_limit = 2097152,
    allowed_mime_types = array['image/webp', 'image/jpeg', 'image/png']
where id = 'productos';
