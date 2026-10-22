-- Pruebas de RLS (Fase 3A). Correr a mano en el SQL Editor, bloque por bloque.
-- Cada bloque va en su propia transacción y termina en rollback: no deja
-- cambios en la base (ni el producto de prueba, ni los updates).
--
-- Antes de correr el bloque 3 (admin), reemplazá REEMPLAZAR_UUID_ADMIN por
-- el uuid real de tu usuario admin. Para conseguirlo:
--   select id, email from auth.users where email = 'tu email';
-- o en Authentication → Users, clickeando tu usuario (copiá el "User UID").

-- ============ 1. anon ============
begin;

  insert into public.products (nombre, activo) values ('TEST_VERIFY_RLS', false);

  set local role anon;

  -- esperado: 0 filas (anon no ve productos archivados, solo activo = true)
  select nombre, activo from public.products where nombre = 'TEST_VERIFY_RLS';

  -- esperado: 0 filas afectadas (RLS bloquea, anon no tiene policy de UPDATE)
  update public.products set destacado = true where nombre = 'TEST_VERIFY_RLS';

  -- esperado: 0 filas (anon no tiene policy de SELECT en subscribers)
  select count(*) from public.subscribers;

rollback;

-- ============ 2. authenticated NO admin ============
begin;

  insert into public.products (nombre, activo) values ('TEST_VERIFY_RLS', false);

  set local role authenticated;
  set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

  -- esperado: 0 filas afectadas (is_admin() = false para este uuid, no está en admins)
  update public.products set destacado = true where nombre = 'TEST_VERIFY_RLS';

  -- esperado: 0 filas (misma razón, no admin)
  select count(*) from public.subscribers;

rollback;

-- ============ 3. admin ============
begin;

  insert into public.products (nombre, activo) values ('TEST_VERIFY_RLS', false);

  set local role authenticated;
  set local request.jwt.claims = '{"sub":"REEMPLAZAR_UUID_ADMIN","role":"authenticated"}';

  -- esperado: visible (admin ve también productos archivados)
  select nombre, activo from public.products where nombre = 'TEST_VERIFY_RLS';

  -- esperado: 1 fila afectada (is_admin() = true)
  update public.products set destacado = true where nombre = 'TEST_VERIFY_RLS';

  -- esperado: no da error de permisos (puede devolver 0 si no hay inscriptos todavía)
  select count(*) from public.subscribers;

rollback;
