export const CATS = [['all','Todos'],['clasicos','Cafés clásicos'],['especiales','Cafés especiales'],['frios','Fríos y Frappés'],['matchas','Matchas'],['bakery','Desayunos y repostería']]
const m = (id,name,cat,price,tag,desc) => ({ id,name,cat,price,tag,desc,image:`/images/${id}.jpg` })
export const MENU = [
  m('flat-white','Flat White','especiales',22,'Recomendado','Espresso doble con leche sedosa y fina capa de microespuma.'),
  m('iced-matcha','Iced Strawberry Matcha','matchas',32,'Temporada','Matcha ceremonial, base artesanal de fresas cochabambinas y leche de avena.'),
  m('espresso','Espresso Clásico','clasicos',10,'Origen Caranavi','Extracción pura de 30 ml con crema densa y notas a cacao amargo.'),
  m('cappuccino','Cappuccino Clásico','clasicos',18,'Clásico','Equilibrio entre espresso intenso, leche vaporizada y espuma aterciopelada.'),
  m('lush-signature','Lush Latte Signature','especiales',32,'Autor','Café de autor con cacao criollo, miel pura de monte y canela en rama.'),
  m('cinnamon-latte','Cinnamon Latte','especiales',28,'Especial','Espresso con infusión natural de canela y leche entera o vegetal.'),
  m('cold-brew','Cold Brew Reserva','frios',25,'Macerado 18 h','Maceración en frío, cuerpo sedoso, baja acidez y dulzor pronunciado.'),
  m('frappe-caramelo','Frappé de Caramelo Salado','frios',35,'Dulce y frío','Café batido con caramelo salado de la casa, leche cremosa y chantilly.'),
  m('matcha-latte','Matcha Latte Ceremonial','matchas',28,'100% orgánico','Té verde ceremonial batido con chasen y leche vaporizada.'),
  m('croissant','Croissant de Mantequilla','bakery',15,'Horneado hoy','Hojaldre de mantequilla, crujiente por fuera y aireado por dentro.'),
  m('cookie-artesanal','Cookie de Chocolate 70%','bakery',10,'Choco chunk','Galleta húmeda con chocolate boliviano al 70% y flor de sal.'),
  m('tostada-palta','Tostada de Palta y Huevo','bakery',28,'Brunch','Pan de masa madre con palta, huevo poché y semillas.'),
]
export const HERO_IDS = ['flat-white','espresso','cinnamon-latte','lush-signature','matcha-latte','frappe-caramelo']
export const SIZES = [{label:'Pequeño',sub:'8 oz',cost:0},{label:'Medio',sub:'+Bs 4',cost:4},{label:'Grande',sub:'+Bs 7',cost:7}]
export const MILKS = [{label:'Entera',cost:0},{label:'Deslactosada',cost:0},{label:'Avena +Bs 4',name:'Avena',cost:4},{label:'Almendra +Bs 4',name:'Almendra',cost:4}]
export const ADDONS = [{name:'Shot adicional de espresso',cost:5},{name:'Jarabe de vainilla',cost:4},{name:'Caramelo salado',cost:4},{name:'Crema batida',cost:5}]
export const BAKERY = [{name:'Sin acompañamiento',cost:0},{name:'Croissant de mantequilla',cost:15},{name:'Cookie de chocolate 70%',cost:10},{name:'Tostada de palta y huevo',cost:28}]
export const TIMES = ['En 10 minutos','En 20 minutos','08:30','08:45','09:00','09:30','10:00','16:30']
export const PAYS = [{v:'QR',label:'Pago QR',icon:'qr_code_scanner'},{v:'Tarjeta',label:'Tarjeta',icon:'credit_card'},{v:'Transferencia',label:'Transferencia',icon:'account_balance'}]
export const BRANCHES = [
  {id:'Cala Cala',addr:'Av. América Este #845 esq. Pando',eta:'~8 min',h:['Lun a Sáb: 07:00 - 20:30','Domingos: 08:00 - 18:00']},
  {id:'El Prado',addr:'Av. Ballivián #620 (Paseo del Prado)',eta:'~10 min',h:['Lun a Sáb: 07:30 - 21:00','Domingos: 08:30 - 19:00']},
  {id:'Tupuraya',addr:'Calle Potosí #1420 casi Circunvalación',eta:'~6 min',h:['Lun a Vie: 07:00 - 19:30','Sábados: 08:00 - 17:00']},
]
export const INITIAL_ORDER = {product:'Flat White',size:0,temp:'Caliente',qty:1,milk:0,bakery:0,addons:[],branch:'Cala Cala',time:TIMES[0],pay:'QR',name:'',phone:''}
export function calcTotal(o){
  const base = MENU.find(x=>x.name===o.product)?.price ?? 0
  const extras = o.addons.reduce((s,n)=>s+ADDONS.find(a=>a.name===n).cost,0)
  return (base + SIZES[o.size].cost + MILKS[o.milk].cost + extras) * o.qty + BAKERY[o.bakery].cost
}
