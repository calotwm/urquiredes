import { Users, Heart, FileText, Eye, ArrowUpRight } from 'lucide-react'
import { platformMetrics, followerHistory } from '../data/metrics'
import PlatformIcon from '../components/PlatformIcon'
import GrowthChart from '../components/GrowthChart'

function formatCompact(n: number) {
  return new Intl.NumberFormat('es-AR', { notation: 'compact' }).format(n)
}

const LABELS: Record<string, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
}

export default function MetricsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {platformMetrics.map((m) => (
          <div
            key={m.platform}
            className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-5 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PlatformIcon platform={m.platform} size={18} />
                <h2 className="text-base font-semibold text-text">
                  {LABELS[m.platform]}
                </h2>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                <ArrowUpRight size={13} />
                {m.followersDelta}%
              </span>
            </div>

            <div>
              <p className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                {formatCompact(m.followers)}
              </p>
              <p className="mt-1 text-sm text-text-muted">seguidores</p>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
              <div>
                <div className="mb-1 flex items-center gap-1.5 text-text-muted">
                  <Heart size={13} />
                  <span className="text-[11px] uppercase tracking-wide">
                    Engagement
                  </span>
                </div>
                <p className="text-lg font-semibold text-text">
                  {m.engagementRate}%
                </p>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-1.5 text-text-muted">
                  <FileText size={13} />
                  <span className="text-[11px] uppercase tracking-wide">
                    Posts / mes
                  </span>
                </div>
                <p className="text-lg font-semibold text-text">
                  {m.postsThisMonth}
                </p>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-1.5 text-text-muted">
                  <Eye size={13} />
                  <span className="text-[11px] uppercase tracking-wide">
                    Alcance prom.
                  </span>
                </div>
                <p className="text-lg font-semibold text-text">
                  {formatCompact(m.avgReach)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <Users size={15} className="text-brand-light" />
          <h2 className="text-sm font-semibold text-text">
            Crecimiento comparado
          </h2>
        </div>
        <GrowthChart data={followerHistory} />
      </div>
    </div>
  )
}
