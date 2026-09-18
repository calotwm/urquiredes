import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Wand2,
  Loader2,
  Save,
  Download,
  Trash2,
  ChevronDown,
  GalleryHorizontal,
  Palette,
} from 'lucide-react'
import type { CarouselSlide, CarouselStyleId } from '../types/carousel'
import { generateCarousel } from '../lib/carouselApi'
import { CAROUSEL_STYLES, getCarouselStyle } from '../lib/carouselStyles'
import { downloadAllSlides } from '../lib/renderSlideImage'
import { useCarousels } from '../hooks/useCarousels'
import CarouselSlidePreview from '../components/CarouselSlidePreview'

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40) || 'carrusel'
}

export default function CarouselsPage() {
  const [topic, setTopic] = useState('')
  const [styleId, setStyleId] = useState<CarouselStyleId>('midnight')
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [slides, setSlides] = useState<CarouselSlide[] | null>(null)
  const [saved, setSaved] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { carousels, saveCarousel, deleteCarousel } = useCarousels()

  const style = getCarouselStyle(styleId)

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!topic.trim() || loading) return
    setLoading(true)
    setError(null)
    setSlides(null)
    setSaved(false)
    try {
      const generated = await generateCarousel(topic.trim())
      setSlides(generated.slides)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo salió mal.')
    } finally {
      setLoading(false)
    }
  }

  function updateSlide(index: number, next: CarouselSlide) {
    setSlides((prev) => {
      if (!prev) return prev
      const copy = [...prev]
      copy[index] = next
      return copy
    })
  }

  function handleSave() {
    if (!slides) return
    saveCarousel(topic.trim(), styleId, slides)
    setSaved(true)
  }

  async function handleDownload(slidesToDownload: CarouselSlide[], topicText: string) {
    setDownloading(true)
    try {
      await downloadAllSlides(slidesToDownload, style, slugify(topicText))
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleGenerate}
        className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 sm:p-5"
      >
        <div className="flex items-center gap-2">
          <GalleryHorizontal size={16} className="text-brand-light" />
          <h2 className="text-sm font-semibold text-text">
            Creador de carruseles con IA
          </h2>
        </div>
        <p className="text-xs text-text-muted">
          Escribí el tema y te genero todas las filminas: gancho al inicio,
          desarrollo en el medio y cierre con llamada a la acción al final.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ej: 5 errores al empezar a emprender"
            className="flex-1 rounded-xl border border-border bg-surface-2 p-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="submit"
            disabled={!topic.trim() || loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Wand2 size={16} />
            )}
            {loading ? 'Generando...' : 'Generar carrusel'}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
            <Palette size={13} />
            Estilo visual
          </div>
          <div className="flex flex-wrap gap-2">
            {CAROUSEL_STYLES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStyleId(s.id)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
                  styleId === s.id
                    ? 'border-brand/60 bg-brand/10 text-brand-light'
                    : 'border-border text-text-muted hover:border-white/20 hover:text-text'
                }`}
              >
                <span
                  className={`h-4 w-4 rounded-full ${s.previewClass}`}
                />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}
      </form>

      <AnimatePresence>
        {slides && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-border bg-surface p-4 sm:p-5"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-text">
                Carrusel generado: <span className="text-text-muted">{topic}</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownload(slides, topic)}
                  disabled={downloading}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text-muted transition-colors hover:border-white/20 hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {downloading ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Download size={13} />
                  )}
                  {downloading ? 'Descargando...' : 'Descargar todo'}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saved}
                  className="flex items-center gap-1.5 rounded-lg border border-brand/40 bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand-light transition-colors hover:bg-brand/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={13} />
                  {saved ? 'Guardado' : 'Guardar en biblioteca'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {slides.map((slide, i) => (
                <CarouselSlidePreview
                  key={i}
                  slide={slide}
                  style={style}
                  index={i}
                  total={slides.length}
                  onChange={(next) => updateSlide(i, next)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <GalleryHorizontal size={15} className="text-brand-light" />
          <h2 className="text-sm font-semibold text-text">
            Biblioteca de carruseles
          </h2>
          <span className="text-xs text-text-muted">({carousels.length})</span>
        </div>

        {carousels.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
            <GalleryHorizontal size={30} className="text-text-muted" />
            <p className="text-sm text-text-muted">
              Todavía no guardaste ningún carrusel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {carousels.map((carousel) => {
              const isOpen = expandedId === carousel.id
              const savedStyle = getCarouselStyle(carousel.styleId)
              return (
                <div
                  key={carousel.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-brand/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug text-text">
                      {carousel.topic}
                    </p>
                    <button
                      type="button"
                      onClick={() => deleteCarousel(carousel.id)}
                      aria-label="Eliminar carrusel"
                      className="shrink-0 rounded-lg p-1.5 text-text-muted hover:bg-white/5 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <span className="flex items-center gap-1.5 self-start rounded-full border border-border px-2 py-0.5 text-[10px] text-text-muted">
                    <span className={`h-3 w-3 rounded-full ${savedStyle.previewClass}`} />
                    {savedStyle.label} · {carousel.slides.length} filminas
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isOpen ? null : carousel.id)}
                      className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border py-1.5 text-xs font-medium text-text-muted hover:border-white/20 hover:text-text"
                    >
                      {isOpen ? 'Ocultar' : 'Ver filminas'}
                      <ChevronDown
                        size={13}
                        className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(carousel.slides, carousel.topic)}
                      disabled={downloading}
                      className="flex items-center justify-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-text-muted hover:border-white/20 hover:text-text disabled:opacity-50"
                      aria-label="Descargar filminas"
                    >
                      <Download size={13} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-3 gap-2 pt-2">
                          {carousel.slides.map((slide, i) => (
                            <CarouselSlidePreview
                              key={i}
                              slide={slide}
                              style={savedStyle}
                              index={i}
                              total={carousel.slides.length}
                              onChange={() => {}}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="mt-auto text-[11px] text-text-muted">
                    {new Date(carousel.createdAt).toLocaleDateString('es-AR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
