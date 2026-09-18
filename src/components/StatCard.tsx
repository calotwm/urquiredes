import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  accent = false,
}: {
  label: string
  value: string
  icon: LucideIcon
  delta?: number
  accent?: boolean
}) {
  return (
    <div
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
        <Icon size={16} className={accent ? 'text-brand-light' : 'text-text-muted'} />
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="text-2xl font-semibold text-text sm:text-3xl">{value}</p>
        {delta !== undefined && (
          <span
            className={`mb-1 flex items-center gap-0.5 text-xs font-semibold ${
              delta >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {delta >= 0 ? (
              <ArrowUpRight size={13} />
            ) : (
              <ArrowDownRight size={13} />
            )}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
    </div>
  )
}
