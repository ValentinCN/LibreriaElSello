import { useRef } from 'react'
import { MagnifyingGlass, X } from '@phosphor-icons/react'

type Props = {
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function CatalogSearch({ value, onChange, className = '' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const limpiar = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div role="search" className={`catalog-search ${className}`}>
      <MagnifyingGlass size={18} aria-hidden="true" className="catalog-search-icon" />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => { if (e.key === 'Escape' && value) { e.preventDefault(); onChange('') } }}
        placeholder="Buscar productos…"
        aria-label="Buscar productos"
        enterKeyHint="search"
        autoComplete="off"
        spellCheck={false}
      />
      {value && (
        <button type="button" onClick={limpiar} aria-label="Borrar búsqueda" className="catalog-search-clear">
          <X size={16} weight="bold" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
