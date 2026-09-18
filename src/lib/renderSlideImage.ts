import type { CarouselSlide, CarouselStyle } from '../types/carousel'

const WIDTH = 1080
const HEIGHT = 1350

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const attempt = current ? `${current} ${word}` : word
    if (ctx.measureText(attempt).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = attempt
    }
  }
  if (current) lines.push(current)
  return lines
}

export function renderSlideCanvas(
  slide: CarouselSlide,
  style: CarouselStyle,
  index: number,
  total: number,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const ctx = canvas.getContext('2d')!

  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT)
  gradient.addColorStop(0, style.gradient[0])
  gradient.addColorStop(1, style.gradient[1])
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  const padding = 100
  const maxWidth = WIDTH - padding * 2

  ctx.fillStyle = style.accentColor
  ctx.font = '600 32px system-ui, sans-serif'
  ctx.textBaseline = 'top'
  ctx.fillText(`${index + 1} / ${total}`, padding, 80)

  ctx.fillStyle = style.textColor
  const titleSize = slide.type === 'content' ? 64 : 84
  ctx.font = `700 ${titleSize}px system-ui, sans-serif`
  const titleLines = wrapText(ctx, slide.title, maxWidth)
  let y = HEIGHT / 2 - (titleLines.length * (titleSize + 16)) / 2 - 60
  for (const line of titleLines) {
    ctx.fillText(line, padding, y, maxWidth)
    y += titleSize + 16
  }

  y += 30
  ctx.font = '400 40px system-ui, sans-serif'
  ctx.globalAlpha = 0.9
  const textLines = wrapText(ctx, slide.text, maxWidth)
  for (const line of textLines) {
    ctx.fillText(line, padding, y, maxWidth)
    y += 56
  }
  ctx.globalAlpha = 1

  return canvas
}

export async function downloadSlideImage(
  slide: CarouselSlide,
  style: CarouselStyle,
  index: number,
  total: number,
  filename: string,
) {
  const canvas = renderSlideCanvas(slide, style, index, total)
  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, 'image/png'),
  )
  if (!blob) return
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export async function downloadAllSlides(
  slides: CarouselSlide[],
  style: CarouselStyle,
  topicSlug: string,
) {
  for (let i = 0; i < slides.length; i++) {
    const filename = `carrusel-${topicSlug}-${String(i + 1).padStart(2, '0')}.png`
    await downloadSlideImage(slides[i], style, i, slides.length, filename)
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
}
