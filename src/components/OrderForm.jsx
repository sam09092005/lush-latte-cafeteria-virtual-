import { MENU, SIZES, MILKS, ADDONS, BAKERY, TIMES, BRANCHES, PAYS, calcTotal } from '../data'
import Icon from './Icon'
const drinks = MENU.filter(m => m.cat !== 'bakery')
const inp = 'w-full h-11 px-space-sm rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary'
function Pills({ label, options, value, onChange, cols = 'grid-cols-2' }) {
  return (
    <div role="group" aria-label={label} className={`grid ${cols} gap-space-xs`}>
      {options.map(o => (
        <button key={o.v} type="button" aria-pressed={value === o.v} onClick={() => onChange(o.v)} className={`min-h-11 px-2 py-1 rounded-xl font-label-md text-label-md flex flex-col items-center justify-center ${value === o.v ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'}`}>
          <span>{o.label}</span>{o.sub && <span className="text-[10px] opacity-80">{o.sub}</span>}
        </button>
      ))}
    </div>
  )
}
const Card = ({ n, title, children }) => (
  <div className="p-space-lg rounded-2xl bg-surface shadow-sm space-y-space-md">
    <h3 className="pb-space-sm border-b border-surface-container font-headline-sm text-headline-sm text-primary">{n}. {title}</h3>
    {children}
  </div>
)
const L = ({ id, children }) => <label htmlFor={id} className="block font-title-sm text-title-sm text-primary mb-1">{children}</label>

export default function OrderForm({ order, setOrder, onConfirm, error }) {
  const set = patch => setOrder(o => ({ ...o, ...patch }))
  const toggleAddon = n => set({ addons: order.addons.includes(n) ? order.addons.filter(a => a !== n) : [...order.addons, n] })
  const total = calcTotal(order)
  return (
    <section id="ordenar" className="py-space-3xl bg-surface-container">
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-2xl mb-space-2xl">
          <h2 className="font-display text-display text-primary">Pide ahora y recógelo sin fila</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Configura tu pedido, elige la hora de retiro y pasa directo a la barra de tu sede.</p>
        </div>
        <div className="grid lg:grid-cols-12 gap-space-xl items-start">
          <div className="lg:col-span-7 space-y-space-xl">
            <Card n="1" title="Elige tu bebida y tamaño">
              <div><L id="product">Bebida principal</L>
                <select id="product" className={inp} value={order.product} onChange={e => set({ product: e.target.value })}>
                  {drinks.map(d => <option key={d.id} value={d.name}>{d.name} — Bs {d.price}</option>)}
                </select></div>
              <div className="grid sm:grid-cols-2 gap-space-md">
                <div><span className="block font-title-sm text-title-sm text-primary mb-1">Tamaño</span>
                  <Pills label="Tamaño" cols="grid-cols-3" value={order.size} onChange={v => set({ size: v })} options={SIZES.map((s, v) => ({ v, label: s.label, sub: s.sub }))} /></div>
                <div><span className="block font-title-sm text-title-sm text-primary mb-1">Temperatura</span>
                  <Pills label="Temperatura" value={order.temp} onChange={v => set({ temp: v })} options={[{ v: 'Caliente', label: 'Caliente' }, { v: 'Frío', label: 'Frío / Hielo' }]} /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-space-md">
                <div><L id="bakery">Acompañamiento</L>
                  <select id="bakery" className={inp} value={order.bakery} onChange={e => set({ bakery: +e.target.value })}>
                    {BAKERY.map((b, i) => <option key={b.name} value={i}>{b.name}{b.cost ? ` (+Bs ${b.cost})` : ''}</option>)}
                  </select></div>
                <div><span className="block font-title-sm text-title-sm text-primary mb-1">Cantidad de bebidas</span>
                  <div className="flex items-center h-11 rounded-xl bg-surface-container-low px-space-sm justify-between">
                    <button type="button" aria-label="Quitar una bebida" onClick={() => set({ qty: Math.max(1, order.qty - 1) })} className="w-8 h-8 rounded-lg bg-surface text-primary font-bold">-</button>
                    <span aria-live="polite" className="font-title-sm text-title-sm text-primary">{order.qty}</span>
                    <button type="button" aria-label="Agregar una bebida" onClick={() => set({ qty: order.qty + 1 })} className="w-8 h-8 rounded-lg bg-surface text-primary font-bold">+</button>
                  </div></div>
              </div>
            </Card>
            <Card n="2" title="Personaliza tus ingredientes">
              <div><span className="block font-title-sm text-title-sm text-primary mb-1">Tipo de leche</span>
                <Pills label="Tipo de leche" cols="grid-cols-2 sm:grid-cols-4" value={order.milk} onChange={v => set({ milk: v })} options={MILKS.map((m, v) => ({ v, label: m.label }))} /></div>
              <fieldset><legend className="font-title-sm text-title-sm text-primary mb-1">Complementos extra</legend>
                <div className="grid sm:grid-cols-2 gap-space-xs">
                  {ADDONS.map(a => (
                    <label key={a.name} className="flex items-center justify-between gap-2 p-space-sm rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container">
                      <span className="flex items-center gap-space-xs font-body-sm text-body-sm"><input type="checkbox" checked={order.addons.includes(a.name)} onChange={() => toggleAddon(a.name)} className="rounded text-primary" />{a.name}</span>
                      <span className="font-title-sm text-title-sm text-primary">+Bs {a.cost}</span>
                    </label>
                  ))}
                </div></fieldset>
            </Card>
            <Card n="3" title="Sede de retiro y pago">
              <div><span className="block font-title-sm text-title-sm text-primary mb-1">Sucursal en Cochabamba</span>
                <Pills label="Sucursal" cols="grid-cols-1 sm:grid-cols-3" value={order.branch} onChange={v => set({ branch: v })} options={BRANCHES.map(b => ({ v: b.id, label: b.id, sub: b.addr }))} /></div>
              <div className="grid sm:grid-cols-2 gap-space-md">
                <div><L id="time">Hora de recojo</L>
                  <select id="time" className={inp} value={order.time} onChange={e => set({ time: e.target.value })}>{TIMES.map(t => <option key={t}>{t}</option>)}</select></div>
                <div><L id="cname">Nombre para el vaso</L>
                  <input id="cname" className={inp} placeholder="Tu nombre" autoComplete="name" value={order.name} onChange={e => set({ name: e.target.value })} /></div>
              </div>
              <div><L id="phone">Celular (WhatsApp, aviso de orden lista)</L>
                <div className="flex"><span className="inline-flex items-center px-space-md rounded-l-xl bg-surface-container font-label-md text-label-md text-primary">+591</span>
                  <input id="phone" type="tel" inputMode="numeric" autoComplete="tel-national" className={`${inp} rounded-l-none`} placeholder="Número de celular" value={order.phone} onChange={e => set({ phone: e.target.value })} /></div></div>
              <div><span className="block font-title-sm text-title-sm text-primary mb-1">Método de pago</span>
                <div role="group" aria-label="Método de pago" className="grid sm:grid-cols-3 gap-space-xs">
                  {PAYS.map(p => (
                    <button key={p.v} type="button" aria-pressed={order.pay === p.v} onClick={() => set({ pay: p.v })} className={`min-h-11 p-space-sm rounded-xl flex items-center gap-space-xs font-title-sm text-title-sm ${order.pay === p.v ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'}`}><Icon name={p.icon} className="text-[20px]" />{p.label}</button>
                  ))}
                </div></div>
            </Card>
          </div>
          <aside className="lg:col-span-5 lg:sticky lg:top-28 p-space-lg rounded-3xl bg-surface shadow-xl space-y-space-md" aria-label="Resumen del pedido">
            <h3 className="pb-space-sm border-b border-surface-container font-headline-sm text-headline-sm text-primary">Resumen del pedido</h3>
            <div className="flex justify-between gap-2">
              <div><p className="font-title-sm text-title-sm text-primary">{order.product} ({SIZES[order.size].label})</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{order.temp} · Leche {MILKS[order.milk].name || MILKS[order.milk].label} · {order.qty} unidad(es)</p></div>
            </div>
            <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-1">
              {order.bakery > 0 && <li className="flex justify-between"><span>+ {BAKERY[order.bakery].name}</span><span>Bs {BAKERY[order.bakery].cost}</span></li>}
              {order.addons.map(n => <li key={n} className="flex justify-between"><span>+ {n}</span><span>Bs {ADDONS.find(a => a.name === n).cost * order.qty}</span></li>)}
            </ul>
            <p className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant"><Icon name="location_on" className="text-[16px] text-secondary" />{order.branch} · {order.time}</p>
            <div className="pt-space-sm border-t border-surface-container flex items-baseline justify-between">
              <span className="font-title-md text-title-md">Total a pagar</span>
              <span className="font-display text-display text-primary leading-none">Bs {total}</span>
            </div>
            {error && <p role="alert" className="p-space-sm rounded-xl bg-primary-fixed text-on-primary-fixed font-title-sm text-title-sm">{error}</p>}
            <button onClick={onConfirm} className="w-full h-14 rounded-full bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-xs"><Icon name="check" className="text-[20px]" />Confirmar y pagar</button>
          </aside>
        </div>
      </div>
    </section>
  )
}
