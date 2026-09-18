import { useEffect, useState } from 'react'
import { animate } from 'framer-motion'

function formatValue(value: number, format: 'compact' | 'percent' | 'plain') {
  if (format === 'percent') return `${value.toFixed(1)}%`
  if (format === 'plain') return new Intl.NumberFormat('es-AR').format(Math.round(value))
  return new Intl.NumberFormat('es-AR', { notation: 'compact' }).format(Math.round(value))
}

export default function AnimatedNumber({
  value,
  format = 'compact',
  duration = 1.2,
  delay = 0,
}: {
  value: number
  format?: 'compact' | 'percent' | 'plain'
  duration?: number
  delay?: number
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [value, duration, delay])

  return <>{formatValue(display, format)}</>
}
