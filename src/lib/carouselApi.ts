import type { GeneratedCarousel } from '../types/carousel'

export async function generateCarousel(topic: string): Promise<GeneratedCarousel> {
  const res = await fetch('/api/generate-carousel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  })

  const data = await res.json().catch(() => null)

  if (!res.ok || !data) {
    throw new Error(data?.error || 'No se pudo generar el carrusel. Intentá de nuevo.')
  }

  return data as GeneratedCarousel
}
