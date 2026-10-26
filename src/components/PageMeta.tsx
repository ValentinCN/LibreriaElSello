import { useEffect } from 'react'

// Título con <title> de React 19 (se inserta antes del de index.html y gana).
// La descripción NO va con <meta> de React 19: no reemplaza la de index.html,
// agrega una segunda y Google toma la primera. Acá se pisa el content de la
// que ya existe y se restaura al salir de la página.
export default function PageMeta({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    if (!description) return
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) return
    const previous = meta.content
    meta.content = description
    return () => { meta.content = previous }
  }, [description])

  return <title>{title}</title>
}
