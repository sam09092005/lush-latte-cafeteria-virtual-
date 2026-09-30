import { useState } from 'react'
import Icon from './Icon'
export default function Img({ src, alt, className = '' }) {
  const [bad, setBad] = useState(false)
  if (bad) return <div role="img" aria-label={alt} className={`flex items-center justify-center bg-[#f0e8dc] text-secondary ${className}`}><Icon name="local_cafe" className="text-[40px]" /></div>
  return <img src={src} alt={alt} className={className} onError={() => setBad(true)} />
}
