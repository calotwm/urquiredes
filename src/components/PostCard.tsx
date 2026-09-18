import { Calendar, MoreHorizontal } from 'lucide-react'
import type { Post } from '../types/post'
import StatusBadge from './StatusBadge'
import PlatformIcon from './PlatformIcon'
import { placeholderImage } from '../lib/placeholder'

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }) +
    ' · ' +
    d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_0_0_1px_rgba(204,0,126,0.3),0_20px_40px_-15px_rgba(204,0,126,0.35)]">
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = placeholderImage(post.id + post.title)
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
        <div className="absolute left-3 top-3">
          <PlatformIcon platform={post.platform} />
        </div>
        <button
          type="button"
          aria-label="Más opciones"
          className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-brand"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-text">
          {post.title}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Calendar size={13} />
            <span>{formatDate(post.scheduledAt)}</span>
          </div>
          <StatusBadge status={post.status} />
        </div>
      </div>
    </article>
  )
}
