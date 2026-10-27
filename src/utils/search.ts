/** Minúsculas y sin tildes: "Épica" → "epica". Se aplica igual a la búsqueda y a los campos. */
export const normalizar = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/** Palabras de la búsqueda ya normalizadas; [] si no hay nada que buscar. */
export const terminosDe = (q: string) => normalizar(q).split(/\s+/).filter(Boolean)

/** Todas las palabras tienen que aparecer (AND), en cualquier orden. */
export const coincide = (textoNormalizado: string, terminos: string[]) =>
  terminos.every(t => textoNormalizado.includes(t))
