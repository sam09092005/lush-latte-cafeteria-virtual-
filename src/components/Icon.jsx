// translate="no" evita que el traductor del navegador convierta el nombre del ícono en texto visible
export default function Icon({ name, className = '' }) {
  return <span translate="no" aria-hidden="true" className={`material-symbols-outlined notranslate ${className}`}>{name}</span>
}
