import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Wand2,
  Loader2,
  Zap,
  ListChecks,
  Megaphone,
  Clock,
  Clapperboard,
  BookMarked,
  Trash2,
  ChevronDown,
  Save,
} from 'lucide-react'
import type { GeneratedScript, ScriptFormat } from '../types/script'
import { generateScript } from '../lib/scriptApi'
import { useScripts } from '../hooks/useScripts'

const FORMAT_STYLES: Record<ScriptFormat, string> = {
  'Reel corto': 'bg-brand/15 text-brand-light border-brand/40',
  'Video largo': 'bg-[#0A66C2]/15 text-[#5b9bd9] border-[#0A66C2]/40',
  Historia: 'bg-metric/15 text-metric-light border-metric/40',
}

function ScriptResult({ generated }: { generated: GeneratedScript }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${FORMAT_STYLES[generated.format]}`}
        >
          <Clapperboard size={13} />
          {generated.format}
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-text-muted">
          <Clock size={13} />
          {generated.duration}
        </span>
      </div>
      <p className="text-xs italic text-text-muted">{generated.formatReason}</p>

      <div className="rounded-xl border border-border bg-surface-2 p-4">
        <div className="mb-1.5 flex items-center gap-1.5 text-brand-light">
          <Zap size={14} />
          <h4 className="text-xs font-semibold uppercase tracking-wide">
            Gancho inicial
          </h4>
        </div>
        <p className="text-sm leading-relaxed text-text">{generated.hook}</p>
      </div>

      <div className="rounded-xl border border-border bg-surface-2 p-4">
        <div className="mb-2 flex items-center gap-1.5 text-brand-light">
          <ListChecks size={14} />
          <h4 className="text-xs font-semibold uppercase tracking-wide">
            Puntos clave
          </h4>
        </div>
        <ul className="flex flex-col gap-2">
          {generated.keyPoints.map((point, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-text">
              <span className="mt-0.5 shrink-0 text-xs font-semibold text-text-muted">
                {i + 1}.
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-surface-2 p-4">
        <div className="mb-1.5 flex items-center gap-1.5 text-brand-light">
          <Megaphone size={14} />
          <h4 className="text-xs font-semibold uppercase tracking-wide">
            Cierre y llamada a la acción
          </h4>
        </div>
        <p className="text-sm leading-relaxed text-text">{generated.cta}</p>
      </div>

      <details className="rounded-xl border border-border bg-surface-2 p-4 text-sm text-text">
        <summary className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wide text-text-muted">
          Ver guion completo para leer en cámara
        </summary>
        <p className="mt-3 whitespace-pre-line leading-relaxed">
          {generated.fullScript}
        </p>
      </details>
    </div>
  )
}

export default function ScriptsPage() {
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<GeneratedScript | null>(null)
  const [saved, setSaved] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { scripts, saveScript, deleteScript } = useScripts()

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!topic.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)
    setSaved(false)
    try {
      const generated = await generateScript(topic.trim())
      setResult(generated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo salió mal.')
    } finally {
      setLoading(false)
    }
  }

  function handleSave() {
    if (!result) return
    saveScript(topic.trim(), result)
    setSaved(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleGenerate}
        className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:p-5"
      >
        <div className="flex items-center gap-2">
          <Wand2 size={16} className="text-brand-light" />
          <h2 className="text-sm font-semibold text-text">
            Creador de guiones con IA
          </h2>
        </div>
        <p className="text-xs text-text-muted">
          Contame el tema del video y te genero el gancho inicial, los puntos
          clave, el cierre con llamada a la acción, la duración sugerida y el
          formato que más conviene.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ej: cómo elegir el nicho para mi negocio"
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
            {loading ? 'Generando...' : 'Generar guion'}
          </button>
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-border bg-surface p-4 sm:p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text">
                Guion generado: <span className="text-text-muted">{topic}</span>
              </h3>
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
            <ScriptResult generated={result} />
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <BookMarked size={15} className="text-brand-light" />
          <h2 className="text-sm font-semibold text-text">
            Biblioteca de guiones
          </h2>
          <span className="text-xs text-text-muted">({scripts.length})</span>
        </div>

        {scripts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
            <BookMarked size={30} className="text-text-muted" />
            <p className="text-sm text-text-muted">
              Todavía no guardaste ningún guion.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scripts.map((script) => {
              const isOpen = expandedId === script.id
              return (
                <div
                  key={script.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-brand/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug text-text">
                      {script.topic}
                    </p>
                    <button
                      type="button"
                      onClick={() => deleteScript(script.id)}
                      aria-label="Eliminar guion"
                      className="shrink-0 rounded-lg p-1.5 text-text-muted hover:bg-white/5 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${FORMAT_STYLES[script.format]}`}
                    >
                      <Clapperboard size={11} />
                      {script.format}
                    </span>
                    <span className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] text-text-muted">
                      <Clock size={11} />
                      {script.duration}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isOpen ? null : script.id)}
                    className="flex items-center justify-center gap-1 rounded-lg border border-border py-1.5 text-xs font-medium text-text-muted hover:border-white/20 hover:text-text"
                  >
                    {isOpen ? 'Ocultar guion' : 'Ver guion completo'}
                    <ChevronDown
                      size={13}
                      className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <ScriptResult generated={script} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="mt-auto text-[11px] text-text-muted">
                    {new Date(script.createdAt).toLocaleDateString('es-AR', {
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
