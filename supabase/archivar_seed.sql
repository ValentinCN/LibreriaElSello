-- Fase 4C — archivar los 24 productos del seed (activo = false).
-- Correr DESPUÉS de cargar los productos reales desde el admin.
--
-- Criterio: created_at exacto del seed. Los 24 se insertaron en un solo
-- INSERT y now() devuelve el timestamp de la transacción, así que todos
-- comparten el mismo valor hasta el microsegundo. Cualquier producto creado
-- desde el admin tiene otro created_at y queda afuera. id <= 24 es una
-- segunda traba por si acaso.
--
-- Sin DELETE: archivar se revierte con activo = true.
-- Correr de a un bloque.

-- ===== BLOQUE 1: revisar qué se va a archivar =====
select id, nombre, created_at, activo
from products
where created_at = '2026-06-23 22:03:50.379188+00' and id <= 24
order by id;

-- ===== BLOQUE 2: archivar =====
update products set activo = false
where created_at = '2026-06-23 22:03:50.379188+00' and id <= 24
  and activo = true;

-- ===== BLOQUE 3: verificación =====
select c.orden, c.nombre,
       count(p.id) filter (where p.activo)      as activos,
       count(p.id) filter (where not p.activo)  as archivados
from categories c
left join products p on p.categoria_id = c.id
group by c.id
order by c.orden;
