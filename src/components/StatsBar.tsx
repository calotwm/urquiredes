import { FileEdit, CheckCircle2, Send, Layers } from 'lucide-react'
import type { Post } from '../types/post'

export default function StatsBar({ posts }: { posts: Post[] }) {
  const stats = [
    {
      label: 'Total',
      value: posts.length,
      icon: Layers,
      accent: false,
    },
    {
      label: 'Borradores',
      value: posts.filter((p) => p.status === 'draft').length,
      icon: FileEdit,
      accent: false,
    },
    {
      label: 'Listos',
      value: posts.filter((p) => p.status === 'ready').length,
      icon: CheckCircle2,
      accent: true,
    },
    {
      label: 'Publicados',
      value: posts.filter((p) => p.status === 'published').length,
      icon: Send,
      accent: false,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, accent }) => (
        <div
          key={label}
          className={`rounded-2xl border p-4 transition-colors ${
            accent
              ? 'border-brand/40 bg-gradient-to-br from-brand/15 to-surface'
              : 'border-border bg-surface'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
              {label}
            </span>
            <Icon
              size={16}
              className={accent ? 'text-brand-light' : 'text-text-muted'}
            />
          </div>
          <p className="mt-2 text-2xl font-semibold text-text sm:text-3xl">
            {value}
          </p>
        </div>
      ))}
    </div>
  )
}
