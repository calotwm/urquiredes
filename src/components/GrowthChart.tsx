import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { FollowerPoint } from '../types/post'

interface ChartTooltipProps {
  active?: boolean
  label?: string
  payload?: { dataKey: string; value: number; color: string }[]
}

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

export default function GrowthChart({ data }: { data: FollowerPoint[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="igGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={INSTAGRAM} stopOpacity={0.35} />
              <stop offset="100%" stopColor={INSTAGRAM} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="liGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={LINKEDIN} stopOpacity={0.3} />
              <stop offset="100%" stopColor={LINKEDIN} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="#2c2c2a"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fill: '#898781', fontSize: 12 }}
            axisLine={{ stroke: '#383835' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatCompact}
            tick={{ fill: '#898781', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={44}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#383835' }} />
          <Area
            type="monotone"
            dataKey="instagram"
            stroke={INSTAGRAM}
            strokeWidth={2}
            fill="url(#igGradient)"
          />
          <Area
            type="monotone"
            dataKey="linkedin"
            stroke={LINKEDIN}
            strokeWidth={2}
            fill="url(#liGradient)"
          />
        </AreaChart>
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
    </div>
  )
}
