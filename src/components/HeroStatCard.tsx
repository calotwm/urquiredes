import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import AnimatedNumber from './AnimatedNumber'
import type { HeadlineMetric } from '../data/metrics'

export default function HeroStatCard({
  metric,
  index,
}: {
  metric: HeadlineMetric
  index: number
}) {
  const isUp = metric.delta >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-border bg-surface p-5"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-metric/10 blur-2xl" />

      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
        {metric.label}
      </p>

      <div className="mt-3 flex items-end justify-between gap-2">
        <p className="text-3xl font-bold tracking-tight text-metric sm:text-4xl">
          <AnimatedNumber
            value={metric.value}
            format={metric.format}
            delay={0.15 + index * 0.08}
          />
          {metric.suffix && (
            <span className="ml-1 text-base font-medium text-text-muted">
              {metric.suffix}
            </span>
          )}
        </p>

        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + index * 0.08, duration: 0.3 }}
          className={`mb-1 flex shrink-0 items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold ${
            isUp
              ? 'bg-emerald-400/10 text-emerald-300'
              : 'bg-red-400/10 text-red-400'
          }`}
        >
          {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {Math.abs(metric.delta)}%
        </motion.span>
      </div>
    </motion.div>
  )
}
