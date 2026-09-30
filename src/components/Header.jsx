import { useState } from 'react'
import Icon from './Icon'
const LINKS = [['inicio','Inicio'],['menu','Menú'],['ordenar','Ordenar'],['nosotros','Sobre nosotros'],['locaciones','Locaciones'],['contacto','Contacto']]
export default function Header({ count, onCart }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(74,40,29,0.06)]">
      <div className="h-20 max-w-[1240px] mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between gap-space-md">
        <a href="#inicio" className="font-headline-md text-headline-md text-primary">Lush Latte</a>
        <nav aria-label="Principal" className="hidden xl:flex gap-space-lg">
          {LINKS.map(([id, t]) => <a key={id} href={`#${id}`} className="font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors">{t}</a>)}
        </nav>
        <div className="flex items-center gap-space-sm">
          <button onClick={onCart} aria-label={`Ver carrito, ${count} productos`} className="relative w-11 h-11 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center">
            <Icon name="shopping_bag" />
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm flex items-center justify-center">{count}</span>
          </button>
          <a href="#ordenar" className="hidden sm:inline-flex h-11 px-space-lg rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg items-center">Pedir ahora</a>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Abrir menú de navegación" className="xl:hidden w-11 h-11 rounded-full bg-surface-container text-primary flex items-center justify-center">
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Móvil" className="xl:hidden bg-surface px-margin-mobile pb-space-md flex flex-col">
          {LINKS.map(([id, t]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="h-11 flex items-center font-title-sm text-title-sm text-primary">{t}</a>)}
        </nav>
      )}
    </header>
  )
}
