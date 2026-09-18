import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { PlatformComparisonRow } from '../data/metrics'

const INSTAGRAM = '#e0409c'
const LINKEDIN = '#3987e5'

interface BarTooltipProps {
  active?: boolean
  label?: string
  payload?: { dataKey: string; value: number; color: string }[]
}

function BarTooltip({ active, payload, label }: BarTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-surface-2 px-3 py-2.5 shadow-xl">
      <p className="mb-1.5 text-xs font-medium text-text-muted">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-xs">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-text-muted">
            {entry.dataKey === 'instagram' ? 'Instagram' : 'LinkedIn'}
          </span>
          <span className="ml-auto font-semibold text-text">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function PlatformBarChart({
  data,
}: {
  data: PlatformComparisonRow[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="h-80 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
          barGap={2}
          barCategoryGap="28%"
        >
          <CartesianGrid stroke="#2c2c2a" vertical={false} />
          <XAxis
            dataKey="metric"
            tick={{ fill: '#898781', fontSize: 10 }}
            axisLine={{ stroke: '#383835' }}
            tickLine={false}
            interval={0}
          />
          <YAxis
            tick={{ fill: '#898781', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip
            content={<BarTooltip />}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          <Bar
            dataKey="instagram"
            fill={INSTAGRAM}
            radius={[4, 4, 0, 0]}
            maxBarSize={24}
            animationDuration={900}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="linkedin"
            fill={LINKEDIN}
            radius={[4, 4, 0, 0]}
            maxBarSize={24}
            animationDuration={900}
            animationEasing="ease-out"
            animationBegin={150}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 flex items-center justify-center gap-5 text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: INSTAGRAM }}
          />
          Instagram
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: LINKEDIN }}
          />
          LinkedIn
        </span>
      </div>
    </motion.div>
  )
}
