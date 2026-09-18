import type { GeneratedScript } from '../types/script'

export async function generateScript(topic: string): Promise<GeneratedScript> {
  const res = await fetch('/api/generate-script', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  })

  const data = await res.json().catch(() => null)

  if (!res.ok || !data) {
    throw new Error(data?.error || 'No se pudo generar el guion. Intentá de nuevo.')
  }

  return data as GeneratedScript
}
