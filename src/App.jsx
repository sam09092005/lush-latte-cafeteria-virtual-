import { useState, useRef } from 'react'
import { INITIAL_ORDER, MENU, calcTotal, SIZES, BRANCHES } from './data'
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'
import OrderForm from './components/OrderForm'
import { About, Locations, Contact, Footer } from './components/Sections'
import Icon from './components/Icon'

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [order, setOrder] = useState(INITIAL_ORDER)
  const [toast, setToast] = useState('')
  const [error, setError] = useState('')
  const [ticket, setTicket] = useState(null)
  const timer = useRef()

  const notify = msg => { setToast(msg); clearTimeout(timer.current); timer.current = setTimeout(() => setToast(''), 2800) }
  const goOrder = () => document.getElementById('ordenar').scrollIntoView({ behavior: 'smooth' })
  const add = (name, price) => {
    setCart(c => c.find(i => i.name === name) ? c.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i) : [...c, { name, price, qty: 1 }])
    notify(`${name} agregado a tu pedido`)
  }
  const changeQty = (name, d) => setCart(c => c.map(i => i.name === name ? { ...i, qty: i.qty + d } : i).filter(i => i.qty > 0))
  const customize = name => { if (MENU.find(m => m.name === name && m.cat !== 'bakery')) setOrder(o => ({ ...o, product: name })); goOrder(); notify(`Configura tu ${name}`) }
  const pickBranch = id => { setOrder(o => ({ ...o, branch: id })); goOrder() }
  const confirm = () => {
    if (!order.name.trim()) return setError('Escribe el nombre para el vaso.')
    if (!/^[67]\d{7}$/.test(order.phone.trim())) return setError('Ingresa un celular boliviano de 8 dígitos (empieza con 6 o 7).')
    setError('')
    setTicket({ id: `#LL-${Math.floor(1000 + Math.random() * 9000)}`, total: calcTotal(order), time: order.time, branch: order.branch })
  }
  const count = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0)

  return (
    <>
      <Header count={count} onCart={() => setCartOpen(true)} />
      <main className="pt-20">
        <Hero onOrder={customize} />
        <Menu onAdd={add} onCustomize={customize} />
        <OrderForm order={order} setOrder={setOrder} onConfirm={confirm} error={error} />
        <About />
        <Locations onPick={pickBranch} />
        <Contact />
      </main>
      <Footer />

      <div role="status" className={`fixed top-24 right-4 z-50 flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-primary text-on-primary shadow-xl transition-all duration-300 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
        <Icon name="check_circle" className="text-[20px] text-tertiary-fixed" />{toast}
      </div>

      {cartOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Tu pedido">
          <div className="absolute inset-0 bg-primary/40" onClick={() => setCartOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-surface shadow-2xl flex flex-col">
            <div className="p-space-lg flex justify-between items-center bg-surface-container">
              <h3 className="font-headline-sm text-headline-sm text-primary">Tu pedido</h3>
              <button onClick={() => setCartOpen(false)} aria-label="Cerrar pedido" className="w-10 h-10 rounded-full hover:bg-surface flex items-center justify-center"><Icon name="close" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-space-lg space-y-space-md">
              {cart.length === 0 && <p className="text-center text-on-surface-variant pt-space-2xl">Tu bolsa está vacía. Agrega una bebida desde el menú.</p>}
              {cart.map(i => (
                <div key={i.name} className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between gap-space-sm">
                  <div><p className="font-title-sm text-title-sm text-primary">{i.name}</p><p className="font-body-sm text-body-sm text-on-surface-variant">Bs {i.price} c/u</p></div>
                  <div className="flex items-center gap-space-xs">
                    <button onClick={() => changeQty(i.name, -1)} aria-label={`Quitar ${i.name}`} className="w-8 h-8 rounded-full bg-surface text-primary font-bold">-</button>
                    <span className="w-5 text-center font-title-sm text-title-sm">{i.qty}</span>
                    <button onClick={() => changeQty(i.name, 1)} aria-label={`Agregar ${i.name}`} className="w-8 h-8 rounded-full bg-surface text-primary font-bold">+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-space-lg bg-surface-container-low space-y-space-md">
              <p className="flex justify-between font-title-md text-title-md"><span>Subtotal</span><span className="text-primary">Bs {cartTotal}</span></p>
              <a href="#ordenar" onClick={() => setCartOpen(false)} className="w-full h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-lg text-label-lg">Ir a pagar y programar</a>
            </div>
          </aside>
        </div>
      )}

      {ticket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/50" role="dialog" aria-modal="true" aria-label="Pedido confirmado">
          <div className="w-full max-w-md bg-surface rounded-3xl p-space-xl shadow-2xl space-y-space-md text-center">
            <Icon name="check_circle" className="text-[48px] text-secondary" />
            <h3 className="font-headline-lg text-headline-lg text-primary">¡Pedido confirmado!</h3>
            <p className="text-on-surface-variant">Estará listo: <strong className="text-primary">{ticket.time}</strong> en <strong className="text-primary">{ticket.branch}</strong>.</p>
            <p className="p-space-md rounded-2xl bg-surface-container text-left font-body-sm text-body-sm">Ticket <strong className="text-primary">{ticket.id}</strong> · Total <strong className="text-primary">Bs {ticket.total}</strong></p>
            <button onClick={() => setTicket(null)} className="w-full h-12 rounded-full bg-primary text-on-primary font-label-lg text-label-lg">Cerrar</button>
          </div>
        </div>
      )}
    </>
  )
}
