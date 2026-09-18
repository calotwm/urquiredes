import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

const PORT = process.env.PORT || 8787
const OPENCODE_API_KEY = process.env.OPENCODE_API_KEY
const OPENCODE_BASE_URL = process.env.OPENCODE_BASE_URL || 'https://opencode.ai/zen/v1'
const OPENCODE_MODEL = process.env.OPENCODE_MODEL || 'big-pickle'

const app = express()
app.use(express.json())

const SYSTEM_PROMPT = `Sos un guionista experto en contenido para redes sociales (Instagram y LinkedIn). Escribís en español rioplatense, con un tono profesional pero cercano, como si le hablaras a un amigo con quien tenés confianza: directo, cálido, sin tecnicismos innecesarios, sin sonar corporativo ni robótico.

Dado un tema, generás un guion completo de video con esta estructura:
1. "hook": una frase de apertura fuerte (1-2 oraciones) que capture la atención en los primeros 3 segundos.
2. "keyPoints": un array de 3 a 5 puntos clave a desarrollar en el cuerpo del video, cada uno como una frase o mini-párrafo hablado (no un título seco, sino algo que se pueda decir en cámara).
3. "cta": el cierre con llamada a la acción (1-2 oraciones), que invite a comentar, seguir, guardar o compartir.
4. "duration": la duración recomendada del video como texto corto (ej. "30-45 segundos", "6-8 minutos").
5. "format": exactamente uno de estos tres valores: "Reel corto", "Video largo" o "Historia".
6. "formatReason": una oración breve explicando por qué ese formato conviene más para este tema.
7. "fullScript": el guion completo ensamblado en un solo texto fluido, listo para leer en cámara, uniendo el hook, los puntos clave y el cierre de forma natural (con saltos de línea entre secciones).

Reglas para elegir el formato:
- "Reel corto" (20-60 segundos): temas de tips rápidos, datos curiosos, anuncios, detrás de cámaras, contenido que engancha rápido.
- "Video largo" (5-15 minutos): tutoriales, explicaciones a fondo, casos de estudio, contenido educativo denso.
- "Historia" (15-30 segundos): contenido efímero, del día a día, encuestas, preguntas a la audiencia, anuncios informales.

Respondé ÚNICAMENTE con un objeto JSON válido (sin markdown, sin backticks, sin texto antes o después) con exactamente las claves: hook, keyPoints, cta, duration, format, formatReason, fullScript.`

function extractJson(text) {
  const trimmed = text.trim()
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/)
  const candidate = fenced ? fenced[1] : trimmed
  const start = candidate.indexOf('{')
  const end = candidate.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('No se encontró JSON en la respuesta')
  return JSON.parse(candidate.slice(start, end + 1))
}

app.post('/api/generate-script', async (req, res) => {
  const topic = typeof req.body?.topic === 'string' ? req.body.topic.trim() : ''

  if (!topic) {
    return res.status(400).json({ error: 'Falta el tema del video.' })
  }
  if (!OPENCODE_API_KEY) {
    return res.status(500).json({
      error: 'El servidor no tiene configurada OPENCODE_API_KEY.',
    })
  }

  try {
    const response = await fetch(`${OPENCODE_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENCODE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENCODE_MODEL,
        temperature: 0.85,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Tema del video: ${topic}` },
        ],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('OpenCode API error:', response.status, errText)
      return res.status(502).json({ error: 'Error al generar el guion con la IA.' })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content ?? ''
    const script = extractJson(content)

    return res.json(script)
  } catch (err) {
    console.error('generate-script failed:', err)
    return res.status(500).json({ error: 'No se pudo generar el guion. Intentá de nuevo.' })
  }
})

const CAROUSEL_SYSTEM_PROMPT = `Sos un experto en contenido para carruseles de Instagram y LinkedIn. Escribís en español rioplatense, tono profesional pero cercano, directo, sin tecnicismos innecesarios.

Dado un tema, generás el contenido completo de un carrusel de entre 6 y 9 filminas, con esta estructura:
1. La primera filmina es el "hook": una frase de apertura fuerte que capture la atención y dé ganas de deslizar.
2. Las filminas del medio son "content": desarrollan el tema, una idea clara por filmina, con un título corto y un texto breve de apoyo (2-3 oraciones como máximo, porque tiene que entrar en una imagen).
3. La última filmina es el "cta": cierre con llamada a la acción (invitar a comentar, guardar, seguir o compartir).

Cada filmina tiene:
- "type": exactamente uno de "hook", "content" o "cta".
- "title": título corto de la filmina (máximo 8 palabras). En "hook" y "cta" puede repetir o resumir el texto principal.
- "text": el texto de apoyo de la filmina (máximo 240 caracteres), listo para mostrar en la imagen.

Respondé ÚNICAMENTE con un objeto JSON válido (sin markdown, sin backticks, sin texto antes o después) con exactamente la clave "slides", un array de 6 a 9 objetos con las claves type, title, text.`

app.post('/api/generate-carousel', async (req, res) => {
  const topic = typeof req.body?.topic === 'string' ? req.body.topic.trim() : ''

  if (!topic) {
    return res.status(400).json({ error: 'Falta el tema del carrusel.' })
  }
  if (!OPENCODE_API_KEY) {
    return res.status(500).json({
      error: 'El servidor no tiene configurada OPENCODE_API_KEY.',
    })
  }

  try {
    const response = await fetch(`${OPENCODE_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENCODE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENCODE_MODEL,
        temperature: 0.85,
        messages: [
          { role: 'system', content: CAROUSEL_SYSTEM_PROMPT },
          { role: 'user', content: `Tema del carrusel: ${topic}` },
        ],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('OpenCode API error:', response.status, errText)
      return res.status(502).json({ error: 'Error al generar el carrusel con la IA.' })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content ?? ''
    const carousel = extractJson(content)

    if (!Array.isArray(carousel.slides) || carousel.slides.length === 0) {
      throw new Error('Respuesta de IA sin filminas')
    }

    return res.json(carousel)
  } catch (err) {
    console.error('generate-carousel failed:', err)
    return res.status(500).json({ error: 'No se pudo generar el carrusel. Intentá de nuevo.' })
  }
})

app.use(express.static(distDir))

app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) return next()
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
