-- Idempotent seed: truncate and re-insert
truncate products, categories restart identity cascade;

-- Categories
insert into categories (slug, nombre, orden) values
  ('artistico', 'Artístico', 1),
  ('escolar',   'Escolar',   2),
  ('libreria',  'Librería',  3),
  ('papeleria', 'Papelería', 4);

-- Products (FK resolved by joining on categories.slug)
insert into products (nombre, descripcion, categoria_id, precio, imagen_url, activo, destacado, orden)
select v.nombre, v.descripcion, c.id, v.precio, v.imagen_url, v.activo, v.destacado, v.orden
from (values
  -- Artístico
  ('Marcadores Faber-Castell x12',    'Set de 12 marcadores de doble punta, colores vibrantes permanentes.',            'artistico', 4500::numeric, null::text, true, true,  1),
  ('Lápices de colores x36',          'Caja de 36 lápices de colores profesionales, mina suave y resistente.',          'artistico', 6800,          null,       true, true,  2),
  ('Set de acrílicos 12 colores',     'Pinturas acrílicas de 20ml, colores opacos de alta pigmentación.',               'artistico', 3200,          null,       true, false, 3),
  ('Set de pinceles x6',              'Pinceles de pelo sintético, distintos anchos para acuarela y acrílico.',         'artistico', 2800,          null,       true, false, 4),
  ('Papel ilustración A3 x20h',       'Papel ilustración 180gr, ideal para marcadores y tintas.',                       'artistico', 1900,          null,       true, false, 5),
  ('Rotuladores metalizados x8',      'Marcadores metálicos dorado, plata y colores sobre cualquier superficie.',       'artistico', 3600,          null,       true, false, 6),
  -- Escolar
  ('Cuaderno tapa dura 100h',         'Cuaderno universitario de tapa dura, 100 hojas rayadas, espiral.',               'escolar',   2400,          null,       true, true,  1),
  ('Cartuchera estampada',            'Cartuchera de tela con cierre, diseños variados, tres bolsillos.',               'escolar',   3500,          null,       true, false, 2),
  ('Mochila escolar reforzada',       'Mochila con sistema anti-derrame, compartimiento para notebook y bolsillos laterales.', 'escolar', 18000, null,       true, true,  3),
  ('Compás metálico escolar',         'Compás de metal con extensión para círculos de hasta 30cm.',                     'escolar',   1200,          null,       true, false, 4),
  ('Regla flexible 30cm',             'Regla transparente flexible de 30cm con escala en milímetros.',                  'escolar',    600,          null,       true, false, 5),
  ('Set geométrico 5 piezas',         'Escuadra, transportador, regla, compás y semicírculo en estuche.',               'escolar',   2100,          null,       true, false, 6),
  -- Librería
  ('Agenda Pusheen 2026',             'Agenda semanal licenciada Pusheen, tapa dura, 352 páginas.',                     'libreria',  5200,          null,       true, true,  1),
  ('Agenda Hello Kitty 2026',         'Agenda semanal licenciada Hello Kitty, tapa dura con stickers.',                 'libreria',  5200,          null,       true, true,  2),
  ('Agenda Mickey Mouse 2026',        'Agenda mensual/semanal Disney Mickey, tapa dura rigída.',                        'libreria',  5000,          null,       true, false, 3),
  ('Agenda Minnie Mouse 2026',        'Agenda mensual/semanal Disney Minnie, tapa dura con detalles rojos.',            'libreria',  5000,          null,       true, false, 4),
  ('Agenda KPOP Temática 2026',       'Agenda diseño KPOP con ilustraciones, pegatinas y sobre de regalo.',             'libreria',  5500,          null,       true, true,  5),
  ('Cuaderno Sanrio A5',              'Cuaderno A5 licenciado Sanrio, 80 hojas lisas, tapa blanda.',                    'libreria',  2800,          null,       true, false, 6),
  -- Papelería
  ('Resma A4 75gr 500h',              'Resma de papel A4 de 75gr, blancura superior para impresión láser/inkjet.',      'papeleria', 8500,          null,       true, true,  1),
  ('Tijeras acero inox 21cm',         'Tijeras de acero inoxidable con mango ergonómico, corte preciso.',               'papeleria', 1800,          null,       true, false, 2),
  ('Bisturí profesional c/repuestos', 'Bisturí de mango metálico con 5 hojas de repuesto incluidas.',                   'papeleria',  900,          null,       true, false, 3),
  ('Cinta adhesiva transparente x3',  'Pack de 3 cintas adhesivas transparentes 18mm x 33m.',                           'papeleria', 1200,          null,       true, false, 4),
  ('Corrector líquido de punta',      'Corrector líquido de punta fina, secado rápido, 7ml.',                           'papeleria',  800,          null,       true, false, 5),
  ('Goma de miga blanca',             'Goma de miga para lápiz, no daña el papel, limpieza perfecta.',                  'papeleria',  400,          null,       true, false, 6)
) as v(nombre, descripcion, cat_slug, precio, imagen_url, activo, destacado, orden)
join categories c on c.slug = v.cat_slug;
