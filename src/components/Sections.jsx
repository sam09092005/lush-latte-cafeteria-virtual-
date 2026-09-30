import { useState } from 'react'
import { BRANCHES } from '../data'
import Icon from './Icon'
const PILLARS = [['workspace_premium','Calidad de origen','Granos sobre los 1.600 msnm con tueste medio que resalta el dulzor natural.'],['speed','Rapidez sin espera','Tu pedido sale empaquetado y a temperatura exacta cuando llegas.'],['handshake','Cercanía cochabambina','Espacios pensados para tu jornada o tus pausas de la mañana.']]
export function About() {
  return (
    <section id="nosotros" className="py-space-3xl">
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin-desktop space-y-space-2xl">
        <div className="max-w-2xl space-y-space-md">
          <h2 className="font-display text-display text-primary">Café hecho con calma para mañanas con prisa</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Seleccionamos cosechas de altura de los Yungas y Caranavi, tostadas cada semana en Cochabamba para resaltar notas florales y una acidez balanceada.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-space-lg">
          {PILLARS.map(([ic, t, d]) => (
            <div key={t} className="p-space-lg rounded-2xl bg-surface-container space-y-space-xs">
              <Icon name={ic} className="text-[28px] text-secondary" />
              <h3 className="font-headline-sm text-headline-sm text-primary">{t}</h3>
              <p className="text-on-surface-variant">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export function Locations({ onPick }) {
  return (
    <section id="locaciones" className="py-space-3xl bg-surface-container-low">
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin-desktop space-y-space-xl">
        <h2 className="font-display text-display text-primary max-w-2xl">Encuentra tu Lush Latte más cercano</h2>
        <div className="grid md:grid-cols-3 gap-space-lg">
          {BRANCHES.map(b => (
            <article key={b.id} className="p-space-lg rounded-3xl bg-surface shadow-md flex flex-col justify-between gap-space-md">
              <div className="space-y-space-xs">
                <p className="flex justify-between font-label-sm text-label-sm"><span className="px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed">Abierto ahora</span><span className="text-secondary">Listo en {b.eta}</span></p>
                <h3 className="font-headline-sm text-headline-sm text-primary">Lush Latte · {b.id}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{b.addr}, Cochabamba</p>
                {b.h.map(h => <p key={h} className="font-body-sm text-body-sm text-on-surface-variant">{h}</p>)}
              </div>
              <div className="space-y-space-xs">
                <button onClick={() => onPick(b.id)} className="w-full h-11 rounded-full bg-primary text-on-primary font-label-md text-label-md">Ordenar en esta sede</button>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.addr}, Cochabamba`)}`} target="_blank" rel="noopener noreferrer" className="w-full h-11 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center justify-center gap-1"><Icon name="directions" className="text-[16px]" />Cómo llegar</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
export function Contact() {
  const [sent, setSent] = useState(false)
  const f = 'w-full h-12 px-space-md rounded-xl bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary'
  const L = ({ id, children }) => <label htmlFor={id} className="block font-title-sm text-title-sm text-primary mb-1">{children}</label>
  return (
    <section id="contacto" className="py-space-3xl">
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin-desktop grid lg:grid-cols-12 gap-space-xl">
        <div className="lg:col-span-5 space-y-space-md">
          <h2 className="font-display text-display text-primary">Estamos para ayudarte</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Consultas sobre pedidos especiales, eventos o catering corporativo.</p>
          {[['chat','WhatsApp','+591 77489201','https://wa.me/59177489201'],['photo_camera','Instagram','@lushlatte.bo','https://instagram.com/lushlatte.bo'],['mail','Correo','hola@lushlatte.bo','mailto:hola@lushlatte.bo']].map(([ic, t, v, h]) => (
            <a key={t} href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-center gap-space-md p-space-md rounded-2xl bg-surface-container hover:bg-surface-container-high">
              <span className="w-12 h-12 rounded-full bg-secondary-fixed text-primary flex items-center justify-center"><Icon name={ic} /></span>
              <span><span className="block font-title-sm text-title-sm text-primary">{t}</span><span className="font-body-sm text-body-sm text-on-surface-variant">{v}</span></span>
            </a>
          ))}
        </div>
        <form className="lg:col-span-7 p-space-xl rounded-3xl bg-surface-container-low space-y-space-md" onSubmit={e => { e.preventDefault(); setSent(true); e.target.reset() }}>
          <h3 className="font-headline-sm text-headline-sm text-primary">Escríbenos un mensaje</h3>
          <div className="grid sm:grid-cols-2 gap-space-md">
            <div><L id="c-name">Tu nombre</L><input id="c-name" required autoComplete="name" className={f} /></div>
            <div><L id="c-mail">Correo de contacto</L><input id="c-mail" type="email" required autoComplete="email" className={f} /></div>
          </div>
          <div><L id="c-reason">Motivo</L>
            <select id="c-reason" className={f}><option>Pedido corporativo matutino</option><option>Eventos y catering de café</option><option>Consulta general o sugerencia</option></select></div>
          <div><L id="c-msg">Tu mensaje</L><textarea id="c-msg" required rows="4" className="w-full p-space-md rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none" /></div>
          {sent && <p role="status" className="p-space-sm rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-title-sm text-title-sm text-center">¡Gracias! Recibimos tu mensaje y te responderemos pronto.</p>}
          <button type="submit" className="h-12 px-space-xl rounded-full bg-primary text-on-primary font-label-lg text-label-lg">Enviar mensaje</button>
        </form>
      </div>
    </section>
  )
}
export function Footer() {
  return (
    <footer className="bg-surface-container-low pt-space-2xl pb-space-2xl mt-space-xl text-on-surface-variant">
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col sm:flex-row justify-between gap-space-md">
        <p className="font-headline-md text-headline-md text-primary">Lush Latte</p>
        <p className="font-body-sm text-body-sm">© 2026 Lush Latte Bolivia · Cochabamba, Bolivia</p>
      </div>
    </footer>
  )
}
