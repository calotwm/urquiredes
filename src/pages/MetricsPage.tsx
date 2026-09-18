import { motion } from 'framer-motion'
import { Heart, FileText, Eye, ArrowUpRight, TrendingUp, BarChart3 } from 'lucide-react'
import {
  platformMetrics,
  dailyFollowerHistory,
  platformComparison,
  headlineMetrics,
} from '../data/metrics'
import PlatformIcon from '../components/PlatformIcon'
import HeroStatCard from '../components/HeroStatCard'
import GrowthLineChart from '../components/GrowthLineChart'
import PlatformBarChart from '../components/PlatformBarChart'

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {headlineMetrics.map((metric, i) => (
          <HeroStatCard key={metric.label} metric={metric} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {platformMetrics.map((m, i) => (
          <motion.div
            key={m.platform}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-border bg-surface p-4 sm:p-5"
      >
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp size={15} className="text-brand-light" />
          <div>
            <h2 className="text-sm font-semibold text-text">
              Crecimiento de seguidores
            </h2>
            <p className="text-xs text-text-muted">Últimos 30 días</p>
          </div>
        </div>
        <GrowthLineChart data={dailyFollowerHistory} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-border bg-surface p-4 sm:p-5"
      >
        <div className="mb-3 flex items-center gap-2">
          <BarChart3 size={15} className="text-brand-light" />
          <div>
            <h2 className="text-sm font-semibold text-text">
              Instagram vs. LinkedIn
            </h2>
            <p className="text-xs text-text-muted">Comparación de rendimiento</p>
          </div>
        </div>
        <PlatformBarChart data={platformComparison} />
      </motion.div>
    </div>
  )
}
