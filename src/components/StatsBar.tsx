import { FileEdit, CheckCircle2, Send, Layers } from 'lucide-react'
import type { Post } from '../types/post'
import StatCard from './StatCard'

export default function StatsBar({ posts }: { posts: Post[] }) {
  const stats = [
    { label: 'Total', value: posts.length, icon: Layers, accent: false },
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
      {stats.map((s) => (
        <StatCard key={s.label} {...s} value={String(s.value)} />
      ))}
    </div>
  )
}
