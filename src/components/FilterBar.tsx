import { LayoutGrid } from 'lucide-react'
import type { Platform, PostStatus } from '../types/post'
import { InstagramGlyph, LinkedinGlyph } from './icons'

export type PlatformFilter = 'all' | Platform
export type StatusFilter = 'all' | PostStatus

const PLATFORM_TABS: { value: PlatformFilter; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'Todas', icon: LayoutGrid },
  { value: 'instagram', label: 'Instagram', icon: InstagramGlyph },
  { value: 'linkedin', label: 'LinkedIn', icon: LinkedinGlyph },
]

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'draft', label: 'Borrador' },
  { value: 'ready', label: 'Listo' },
  { value: 'published', label: 'Publicado' },
]

export default function FilterBar({
  platform,
  onPlatformChange,
  status,
  onStatusChange,
}: {
  platform: PlatformFilter
  onPlatformChange: (p: PlatformFilter) => void
  status: StatusFilter
  onStatusChange: (s: StatusFilter) => void
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-1.5 overflow-x-auto rounded-xl border border-border bg-surface p-1.5">
        {PLATFORM_TABS.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => onPlatformChange(value)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              platform === value
                ? 'bg-brand text-white shadow-[0_0_15px_rgba(204,0,126,0.4)]'
                : 'text-text-muted hover:bg-white/5 hover:text-text'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-1.5 overflow-x-auto">
        {STATUS_TABS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => onStatusChange(value)}
            className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              status === value
                ? 'border-brand/50 bg-brand/15 text-brand-light'
                : 'border-border text-text-muted hover:border-white/20 hover:text-text'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
