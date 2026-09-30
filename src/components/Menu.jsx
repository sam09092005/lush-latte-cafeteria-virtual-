import { useState } from 'react'
import { MENU, CATS } from '../data'
import Icon from './Icon'
import Img from './Img'
export default function Menu({ onAdd, onCustomize }) {
  const [cat, setCat] = useState('all')
  const items = cat === 'all' ? MENU : MENU.filter(m => m.cat === cat)
  return (
    <section id="menu" className="py-space-3xl bg-surface-container-lowest">
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin-desktop space-y-space-xl">
        <div>
          <h2 className="font-display text-display text-primary">Encuentra tu favorito</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Café de origen boliviano y panadería horneada a diario. Precios en bolivianos (Bs).</p>
        </div>
        <div role="group" aria-label="Filtrar por categoría" className="flex gap-space-xs overflow-x-auto pb-2">
          {CATS.map(([id, t]) => (
            <button key={id} onClick={() => setCat(id)} aria-pressed={cat === id} className={`shrink-0 h-11 px-space-lg rounded-full font-title-sm text-title-sm ${cat === id ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'}`}>{t}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-lg">
          {items.map(it => (
            <article key={it.id} className="rounded-2xl bg-surface p-space-md shadow-sm flex flex-col justify-between">
              <div className="space-y-space-sm">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 left-2.5 px-space-xs py-0.5 rounded-full bg-surface/90 text-primary font-label-sm text-label-sm">{it.tag}</span>
                </div>
                <div className="flex justify-between gap-1">
                  <h3 className="font-headline-sm text-headline-sm text-primary">{it.name}</h3>
                  <span className="font-title-md text-title-md text-primary shrink-0">Bs {it.price}</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{it.desc}</p>
              </div>
              <div className="pt-space-md flex gap-space-xs">
                <button onClick={() => onAdd(it.name, it.price)} className="flex-1 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center justify-center gap-1"><Icon name="add" className="text-[16px]" />Agregar</button>
                <button onClick={() => onCustomize(it.name)} className="h-10 px-space-md rounded-full bg-primary text-on-primary font-label-md text-label-md">Personalizar</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
