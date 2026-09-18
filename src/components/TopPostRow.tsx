import { Heart, MessageCircle, Eye } from 'lucide-react'
import type { Post } from '../types/post'
import PlatformIcon from './PlatformIcon'
import { placeholderImage } from '../lib/placeholder'

function formatCompact(n: number) {
  return new Intl.NumberFormat('es-AR', { notation: 'compact' }).format(n)
}

export default function TopPostRow({
  post,
  rank,
}: {
  post: Post
  rank: number
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-xs font-bold text-brand-light">
        {rank}
      </span>
      <img
        src={post.image}
        alt=""
        className="h-12 w-12 shrink-0 rounded-lg object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = placeholderImage(post.id + post.title)
        }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <PlatformIcon platform={post.platform} size={11} />
          <p className="truncate text-sm font-medium text-text">
            {post.title}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 items-center gap-3 text-xs text-text-muted sm:flex">
        <span className="flex items-center gap-1">
          <Heart size={13} /> {formatCompact(post.likes ?? 0)}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle size={13} /> {formatCompact(post.comments ?? 0)}
        </span>
        <span className="flex items-center gap-1">
          <Eye size={13} /> {formatCompact(post.reach ?? 0)}
        </span>
      </div>
    </div>
  )
}
