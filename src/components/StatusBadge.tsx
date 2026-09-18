import type { PostStatus } from '../types/post'

const CONFIG: Record<PostStatus, { label: string; className: string }> = {
  draft: {
    label: 'Borrador',
    className: 'bg-white/8 text-text-muted border-white/15',
  },
  ready: {
    label: 'Listo',
    className: 'bg-brand/15 text-brand-light border-brand/40',
  },
  published: {
    label: 'Publicado',
    className: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
  },
}

export default function StatusBadge({ status }: { status: PostStatus }) {
  const { label, className } = CONFIG[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === 'published'
            ? 'bg-emerald-400'
            : status === 'ready'
              ? 'bg-brand-light'
              : 'bg-text-muted'
        }`}
      />
      {label}
    </span>
  )
}
