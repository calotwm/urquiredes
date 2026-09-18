const GRADIENTS = [
  ['#cc007e', '#3b0764'],
  ['#ff4fb8', '#0b0b0f'],
  ['#99005f', '#1e1b4b'],
  ['#cc007e', '#1b1b22'],
  ['#7c1d6f', '#0b0b0f'],
  ['#e0409c', '#2a0a1e'],
]

export function placeholderImage(seed: string) {
  const idx =
    Math.abs(
      Array.from(seed).reduce((acc, c) => acc + c.charCodeAt(0), 0),
    ) % GRADIENTS.length
  const [from, to] = GRADIENTS[idx]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${from}"/>
        <stop offset="100%" stop-color="${to}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#g)"/>
    <circle cx="330" cy="40" r="90" fill="white" opacity="0.05"/>
    <circle cx="40" cy="270" r="120" fill="white" opacity="0.05"/>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
