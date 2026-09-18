import { useEffect, useState } from 'react'
import { Lightbulb, Plus, Trash2 } from 'lucide-react'
import type { Idea, Platform } from '../types/post'
import PlatformIcon from '../components/PlatformIcon'

const STORAGE_KEY = 'socialflow.ideas'

const SEED_IDEAS: Idea[] = [
  {
    id: 'seed-1',
    text: 'Serie de 3 posts explicando el proceso de producción de principio a fin',
    platform: 'instagram',
    createdAt: '2026-09-10T09:00:00',
  },
  {
    id: 'seed-2',
    text: 'Artículo largo sobre las lecciones aprendidas este año',
    platform: 'linkedin',
    createdAt: '2026-09-12T11:30:00',
  },
  {
    id: 'seed-3',
    text: 'Colaborar con un micro-influencer del rubro para un unboxing',
    platform: 'general',
    createdAt: '2026-09-14T16:00:00',
  },
]

const PLATFORM_OPTIONS: { value: Idea['platform']; label: string }[] = [
  { value: 'general', label: 'General' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
]

function loadIdeas(): Idea[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SEED_IDEAS
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_IDEAS
  } catch {
    return SEED_IDEAS
  }
}

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>(() => loadIdeas())
  const [text, setText] = useState('')
  const [platform, setPlatform] = useState<Idea['platform']>('general')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas))
    } catch {
      // localStorage unavailable, ignore
    }
  }, [ideas])

  function addIdea(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    const idea: Idea = {
      id: crypto.randomUUID(),
      text: trimmed,
      platform,
      createdAt: new Date().toISOString(),
    }
    setIdeas((prev) => [idea, ...prev])
    setText('')
  }

  function removeIdea(id: string) {
    setIdeas((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={addIdea}
        className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:p-5"
      >
        <div className="flex items-center gap-2">
          <Lightbulb size={16} className="text-brand-light" />
          <h2 className="text-sm font-semibold text-text">Nueva idea</h2>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribí tu idea de contenido..."
          rows={2}
          className="w-full resize-none rounded-xl border border-border bg-surface-2 p-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1.5">
            {PLATFORM_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPlatform(opt.value)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  platform === opt.value
                    ? 'border-brand/50 bg-brand/15 text-brand-light'
                    : 'border-border text-text-muted hover:border-white/20 hover:text-text'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={16} />
            Guardar idea
          </button>
        </div>
      </form>

      {ideas.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
          <Lightbulb size={32} className="text-text-muted" />
          <p className="text-sm text-text-muted">
            Todavía no guardaste ninguna idea.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-brand/40"
            >
              <div className="flex items-center justify-between">
                {idea.platform === 'general' ? (
                  <span className="rounded-md bg-white/8 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-text-muted">
                    General
                  </span>
                ) : (
                  <PlatformIcon platform={idea.platform as Platform} />
                )}
                <button
                  type="button"
                  onClick={() => removeIdea(idea.id)}
                  aria-label="Eliminar idea"
                  className="rounded-lg p-1.5 text-text-muted opacity-0 transition-opacity hover:bg-white/5 hover:text-red-400 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <p className="text-sm leading-relaxed text-text">{idea.text}</p>
              <p className="mt-auto text-xs text-text-muted">
                {new Date(idea.createdAt).toLocaleDateString('es-AR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
