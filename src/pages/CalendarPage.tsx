import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePosts } from '../hooks/usePosts'
import PlatformIcon from '../components/PlatformIcon'
import PostDrawer from '../components/PostDrawer'
import { placeholderImage } from '../lib/placeholder'
import {
  buildMonthGrid,
  isSameDay,
  isSameMonth,
  MONTH_NAMES,
  WEEKDAY_NAMES,
  TODAY,
} from '../lib/date'
import type { Post } from '../types/post'

export default function CalendarPage() {
  const { posts, addPost, updatePost, deletePost } = usePosts()
  const [cursor, setCursor] = useState(
    new Date(TODAY.getFullYear(), TODAY.getMonth(), 1),
  )
  const [selected, setSelected] = useState<Date | null>(null)

  const days = useMemo(
    () => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()),
    [cursor],
  )

  const postsByDay = useMemo(() => {
    const map = new Map<string, Post[]>()
    for (const post of posts) {
      const key = new Date(post.scheduledAt).toDateString()
      map.set(key, [...(map.get(key) ?? []), post])
    }
    return map
  }, [posts])

  const selectedPosts = selected
    ? (postsByDay.get(selected.toDateString()) ?? [])
    : []

  function goToMonth(delta: number) {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1))
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text sm:text-2xl">
          {MONTH_NAMES[cursor.getMonth()]} {cursor.getFullYear()}
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => goToMonth(-1)}
            aria-label="Mes anterior"
            className="rounded-lg border border-border p-2 text-text-muted hover:border-brand/40 hover:text-text"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            type="button"
            onClick={() => setCursor(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1))}
            className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-text-muted hover:border-brand/40 hover:text-text"
          >
            Hoy
          </button>
          <button
            type="button"
            onClick={() => goToMonth(1)}
            aria-label="Mes siguiente"
            className="rounded-lg border border-border p-2 text-text-muted hover:border-brand/40 hover:text-text"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border">
        <div className="grid grid-cols-7 border-b border-border bg-surface-2 text-center text-xs font-medium text-text-muted">
          {WEEKDAY_NAMES.map((d) => (
            <div key={d} className="py-2.5">
              {d}
            </div>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-6">
          {days.map((day) => {
            const dayPosts = postsByDay.get(day.toDateString()) ?? []
            const inMonth = isSameMonth(day, cursor)
            const isToday = isSameDay(day, TODAY)
            const hasPosts = dayPosts.length > 0
            const isComplete =
              hasPosts && dayPosts.every((p) => p.status !== 'draft')

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => setSelected(day)}
                className={`flex min-h-0 flex-col items-stretch gap-1 border-b border-r border-border p-1.5 text-left transition-colors last:border-r-0 sm:p-2 ${
                  hasPosts ? 'bg-surface hover:bg-surface-2' : 'bg-bg/60 hover:bg-surface/70'
                } ${!inMonth ? 'opacity-35' : ''} ${
                  isComplete ? 'ring-1 ring-inset ring-metric/70' : ''
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                    isToday
                      ? 'bg-brand text-white shadow-[0_0_12px_rgba(204,0,126,0.6)]'
                      : 'text-text-muted'
                  }`}
                >
                  {day.getDate()}
                </span>

                <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-hidden">
                  {dayPosts.slice(0, 3).map((post) => (
                    <span
                      key={post.id}
                      className="flex items-center gap-1.5 truncate rounded-md bg-white/5 px-1 py-1 text-[10px] font-medium text-text sm:px-1.5"
                    >
                      <img
                        src={post.image}
                        alt=""
                        className="h-4 w-4 shrink-0 rounded object-cover sm:h-5 sm:w-5"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = placeholderImage(post.id + post.title)
                        }}
                      />
                      <PlatformIcon platform={post.platform} size={9} />
                      <span className="truncate">{post.title}</span>
                    </span>
                  ))}
                  {dayPosts.length > 3 && (
                    <span className="px-1 text-[10px] text-text-muted">
                      +{dayPosts.length - 3} más
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <PostDrawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        date={selected}
        dayPosts={selectedPosts}
        onCreate={addPost}
        onUpdate={updatePost}
        onDelete={deletePost}
      />
    </div>
  )
}
