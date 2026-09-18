import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { FollowerPoint } from '../types/post'

const INSTAGRAM = '#e0409c'
const LINKEDIN = '#3987e5'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
  })
}

function formatCompact(n: number) {
  return new Intl.NumberFormat('es-AR', { notation: 'compact' }).format(n)
}

interface ChartTooltipProps {
  active?: boolean
  label?: string
  payload?: { dataKey: string; value: number; color: string }[]
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length || !label) return null
  return (
    <div className="rounded-xl border border-border bg-surface-2 px-3 py-2.5 shadow-xl">
      <p className="mb-1.5 text-xs font-medium text-text-muted">
        {formatDate(label)}
      </p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-xs">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-text-muted">
            {entry.dataKey === 'instagram' ? 'Instagram' : 'LinkedIn'}
          </span>
          <span className="ml-auto font-semibold text-text">
            {formatCompact(entry.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function GrowthLineChart({ data }: { data: FollowerPoint[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="h-80 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid stroke="#2c2c2a" strokeDasharray="0" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fill: '#898781', fontSize: 11 }}
            axisLine={{ stroke: '#383835' }}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tickFormatter={formatCompact}
            tick={{ fill: '#898781', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={44}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#383835' }} />
          <Line
            type="monotone"
            dataKey="instagram"
            stroke={INSTAGRAM}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: '#1a1a19' }}
            animationDuration={1400}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="linkedin"
            stroke={LINKEDIN}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: '#1a1a19' }}
            animationDuration={1400}
            animationEasing="ease-out"
          />
        </LineChart>
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
