import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { posts } from '../data/posts'
import PlatformIcon from '../components/PlatformIcon'
import StatusBadge from '../components/StatusBadge'
import {
  buildMonthGrid,
  isSameDay,
  isSameMonth,
  MONTH_NAMES,
  WEEKDAY_NAMES,
  TODAY,
} from '../lib/date'

export default function CalendarPage() {
  const [cursor, setCursor] = useState(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1))
  const [selected, setSelected] = useState(TODAY)

  const days = useMemo(
    () => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()),
    [cursor],
  )

  const postsByDay = useMemo(() => {
    const map = new Map<string, typeof posts>()
    for (const post of posts) {
      const key = new Date(post.scheduledAt).toDateString()
      map.set(key, [...(map.get(key) ?? []), post])
    }
    return map
  }, [])

  const selectedPosts = postsByDay.get(selected.toDateString()) ?? []

  function goToMonth(delta: number) {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1))
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-text sm:text-lg">
            {MONTH_NAMES[cursor.getMonth()]} {cursor.getFullYear()}
          </h2>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => goToMonth(-1)}
              aria-label="Mes anterior"
              className="rounded-lg border border-border p-1.5 text-text-muted hover:border-brand/40 hover:text-text"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => {
                setCursor(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1))
                setSelected(TODAY)
              }}
              className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-text-muted hover:border-brand/40 hover:text-text"
            >
              Hoy
            </button>
            <button
              type="button"
              onClick={() => goToMonth(1)}
              aria-label="Mes siguiente"
              className="rounded-lg border border-border p-1.5 text-text-muted hover:border-brand/40 hover:text-text"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl bg-border text-center text-xs font-medium text-text-muted">
          {WEEKDAY_NAMES.map((d) => (
            <div key={d} className="bg-surface-2 py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl bg-border">
          {days.map((day) => {
            const dayPosts = postsByDay.get(day.toDateString()) ?? []
            const inMonth = isSameMonth(day, cursor)
            const isToday = isSameDay(day, TODAY)
            const isSelected = isSameDay(day, selected)

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => setSelected(day)}
                className={`flex min-h-20 flex-col items-start gap-1 bg-surface p-1.5 text-left transition-colors sm:min-h-24 sm:p-2 ${
                  inMonth ? '' : 'opacity-35'
                } ${isSelected ? 'ring-2 ring-inset ring-brand' : 'hover:bg-surface-2'}`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                    isToday
                      ? 'bg-brand font-semibold text-white'
                      : 'text-text-muted'
                  }`}
                >
                  {day.getDate()}
                </span>
                <div className="flex w-full flex-1 flex-col gap-1 overflow-hidden">
                  {dayPosts.slice(0, 2).map((p) => (
                    <span
                      key={p.id}
                      className={`flex items-center gap-1 truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                        p.platform === 'instagram'
                          ? 'bg-brand/15 text-brand-light'
                          : 'bg-[#0A66C2]/15 text-[#5b9bd9]'
                      }`}
                    >
                      <span className="truncate">{p.title}</span>
                    </span>
                  ))}
                  {dayPosts.length > 2 && (
                    <span className="text-[10px] text-text-muted">
                      +{dayPosts.length - 2} más
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <CalendarIcon size={15} className="text-brand-light" />
          <h3 className="text-sm font-semibold text-text">
            {selected.toLocaleDateString('es-AR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </h3>
        </div>

        {selectedPosts.length === 0 ? (
          <p className="py-6 text-center text-sm text-text-muted">
            No hay publicaciones programadas este día.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {selectedPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-xl border border-border bg-surface-2 p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <PlatformIcon platform={post.platform} />
                  <StatusBadge status={post.status} />
                </div>
                <p className="text-sm font-medium text-text">{post.title}</p>
                <p className="mt-1 text-xs text-text-muted">
                  {new Date(post.scheduledAt).toLocaleTimeString('es-AR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
