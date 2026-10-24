-- Fase 4C — categorías reales del local, alineadas con Tiendanube.
-- Se reusan las 4 filas existentes (UPDATE de nombre/slug/orden): los
-- products.categoria_id no cambian y no se rompe ninguna FK.
-- Sin DELETE. Sin cambios de RLS (categories solo tiene lectura pública;
-- el SQL Editor corre como postgres y no la necesita para escribir).
--
-- Correr de a un bloque: el SQL Editor solo muestra el resultado de la
-- última consulta.

-- ===== BLOQUE 1: estado actual (solo lectura) =====
select c.id, c.slug, c.nombre, c.orden,
       count(p.id)                              as total,
       count(p.id) filter (where p.activo)      as activos,
       count(p.id) filter (where not p.activo)  as archivados
from categories c
left join products p on p.categoria_id = c.id
group by c.id
order by c.orden, c.id;

-- ===== BLOQUE 2: renombrar las 4 categorías =====
-- Cada UPDATE filtra por id + slug viejo o nuevo: si los ids no coinciden
-- no toca nada (0 filas), y se puede correr dos veces sin efecto.
begin;
update categories set nombre = 'Escolar',               slug = 'escolar',             orden = 1 where id = 2 and slug in ('escolar');
update categories set nombre = 'Artística',             slug = 'artistica',           orden = 2 where id = 1 and slug in ('artistico', 'artistica');
update categories set nombre = 'Oficina y universidad', slug = 'oficina-universidad', orden = 3 where id = 4 and slug in ('papeleria', 'oficina-universidad');
update categories set nombre = 'Técnica',               slug = 'tecnica',             orden = 4 where id = 3 and slug in ('libreria', 'tecnica');
commit;

-- ===== BLOQUE 3: mover las agendas del seed fuera de Técnica =====
-- La fila de Técnica es la ex-Librería: sus 6 productos del seed (agendas y
-- cuaderno Sanrio) pasan a Oficina y universidad. Solo productos del seed
-- (timestamp exacto del INSERT del seed). Sin DELETE.
update products
set categoria_id = (select id from categories where slug = 'oficina-universidad')
where categoria_id = (select id from categories where slug = 'tecnica')
  and created_at = '2026-06-23 22:03:50.379188+00';

-- ===== BLOQUE 4: verificación =====
select c.orden, c.nombre, c.slug,
       count(p.id) filter (where p.activo)      as activos,
       count(p.id) filter (where not p.activo)  as archivados
from categories c
left join products p on p.categoria_id = c.id
group by c.id
order by c.orden;
