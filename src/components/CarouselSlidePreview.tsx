import { Pencil, Check } from 'lucide-react'
import { useState } from 'react'
import type { CarouselSlide, CarouselStyle } from '../types/carousel'

const TYPE_LABEL: Record<CarouselSlide['type'], string> = {
  hook: 'Gancho',
  content: 'Desarrollo',
  cta: 'Cierre / CTA',
}

export default function CarouselSlidePreview({
  slide,
  style,
  index,
  total,
  onChange,
}: {
  slide: CarouselSlide
  style: CarouselStyle
  index: number
  total: number
  onChange: (slide: CarouselSlide) => void
}) {
  const [editing, setEditing] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`relative flex aspect-[4/5] flex-col justify-center overflow-hidden rounded-2xl border border-border p-6 ${style.previewClass}`}
      >
        <span
          className="absolute left-4 top-4 text-[11px] font-semibold"
          style={{ color: style.accentColor }}
        >
          {index + 1} / {total}
        </span>

        {editing ? (
          <div className="flex flex-col gap-2">
            <input
              value={slide.title}
              onChange={(e) => onChange({ ...slide, title: e.target.value })}
              className="rounded-lg border border-black/10 bg-white/90 p-2 text-sm font-bold text-black outline-none"
              placeholder="Título"
            />
            <textarea
              value={slide.text}
              onChange={(e) => onChange({ ...slide, text: e.target.value })}
              rows={4}
              className="rounded-lg border border-black/10 bg-white/90 p-2 text-xs text-black outline-none"
              placeholder="Texto"
            />
          </div>
        ) : (
          <div>
            <p
              className="text-lg font-bold leading-snug"
              style={{ color: style.textColor }}
            >
              {slide.title}
            </p>
            <p
              className="mt-2 text-xs leading-relaxed opacity-90"
              style={{ color: style.textColor }}
            >
              {slide.text}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="absolute right-3 top-3 flex items-center justify-center rounded-full bg-black/30 p-1.5 text-white backdrop-blur hover:bg-black/50"
          aria-label={editing ? 'Guardar edición' : 'Editar filmina'}
        >
          {editing ? <Check size={13} /> : <Pencil size={13} />}
        </button>
      </div>
      <span className="text-center text-[11px] font-medium text-text-muted">
        {TYPE_LABEL[slide.type]}
      </span>
    </div>
  )
}
