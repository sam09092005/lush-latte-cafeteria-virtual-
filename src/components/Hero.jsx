import { useState } from 'react'
import { MENU, HERO_IDS } from '../data'
import Icon from './Icon'
import Img from './Img'
const drinks = HERO_IDS.map(id => MENU.find(m => m.id === id))
export default function Hero({ onOrder }) {
  const [i, setI] = useState(0)
  const d = drinks[i]
  const go = n => setI((n + drinks.length) % drinks.length)
  const nav = 'absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/85 text-primary shadow-md flex items-center justify-center'
  return (
    <section id="inicio" className="py-space-xl lg:py-space-3xl">
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin-desktop grid lg:grid-cols-12 gap-space-xl items-center">
        <div className="lg:col-span-6 space-y-space-lg">
          <p className="inline-flex px-space-md py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">Cochabamba · Café de origen y desayunos artesanales</p>
          <h1 className="font-display text-display text-primary">Tu Lush Latte favorito, listo al pasar</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">Ordena desde casa, personaliza tu bebida y recógela en barra exclusiva, sin esperas.</p>
          <div className="flex flex-wrap gap-space-md">
            <a href="#ordenar" className="h-12 px-space-xl rounded-full bg-primary text-on-primary font-label-lg text-label-lg flex items-center">Pide tu café express</a>
            <a href="#menu" className="h-12 px-space-xl rounded-full bg-surface-container text-primary hover:bg-surface-container-high font-label-lg text-label-lg flex items-center">Ver menú artesanal</a>
          </div>
        </div>
        <div className="lg:col-span-6 rounded-3xl bg-surface-container p-space-md lg:p-space-lg shadow-xl">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Img src={d.image} alt={d.name} className="w-full h-full object-cover" />
            <span className="absolute top-4 right-4 px-space-md py-1.5 rounded-full bg-surface/90 font-headline-sm text-headline-sm text-primary">Bs {d.price}</span>
            <button onClick={() => go(i - 1)} aria-label="Bebida anterior" className={`${nav} left-3`}><Icon name="chevron_left" /></button>
            <button onClick={() => go(i + 1)} aria-label="Bebida siguiente" className={`${nav} right-3`}><Icon name="chevron_right" /></button>
          </div>
          <div className="pt-space-md space-y-space-xs" aria-live="polite">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-headline-md text-headline-md text-primary">{d.name}</h2>
              <span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">{d.tag}</span>
            </div>
            <p className="text-on-surface-variant line-clamp-2">{d.desc}</p>
            <div className="pt-space-xs flex items-center justify-between">
              <div className="flex gap-1.5">{drinks.map((x, n) => <button key={x.id} onClick={() => go(n)} aria-label={`Ver ${x.name}`} aria-current={n === i} className={`w-3 h-3 rounded-full ${n === i ? 'bg-primary' : 'bg-surface-container-highest'}`} />)}</div>
              <button onClick={() => onOrder(d.name)} className="h-10 px-space-md rounded-full bg-primary text-on-primary font-label-md text-label-md">Pedir este</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
