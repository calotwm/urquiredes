import type { FollowerPoint, PlatformMetrics } from '../types/post'
import { TODAY } from '../lib/date'

export const followerHistory: FollowerPoint[] = [
  { date: '2026-08-19', instagram: 18200, linkedin: 9400 },
  { date: '2026-08-26', instagram: 18650, linkedin: 9580 },
  { date: '2026-09-02', instagram: 19100, linkedin: 9820 },
  { date: '2026-09-09', instagram: 19480, linkedin: 10050 },
  { date: '2026-09-16', instagram: 20120, linkedin: 10380 },
  { date: '2026-09-18', instagram: 20340, linkedin: 10490 },
]

export const platformMetrics: PlatformMetrics[] = [
  {
    platform: 'instagram',
    followers: 20340,
    followersDelta: 5.8,
    engagementRate: 6.4,
    postsThisMonth: 14,
    avgReach: 24800,
  },
  {
    platform: 'linkedin',
    followers: 10490,
    followersDelta: 4.1,
    engagementRate: 3.9,
    postsThisMonth: 9,
    avgReach: 9700,
  },
]

// 30-day daily follower history, ending on TODAY, built from a smooth
// randomized-but-deterministic curve so the line chart has real daily texture.
function seededNoise(seed: number) {
  const x = Math.sin(seed * 999.7) * 10000
  return x - Math.floor(x)
}

function buildDailyHistory(): FollowerPoint[] {
  const days = 30
  const igStart = 18900
  const igEnd = 20340
  const liStart = 9750
  const liEnd = 10490

  const points: FollowerPoint[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(TODAY)
    d.setDate(d.getDate() - (days - 1 - i))
    const t = i / (days - 1)
    const igBase = igStart + (igEnd - igStart) * t
    const liBase = liStart + (liEnd - liStart) * t
    const igWobble = (seededNoise(i) - 0.5) * 90
    const liWobble = (seededNoise(i + 50) - 0.5) * 50
    points.push({
      date: d.toISOString().slice(0, 10),
      instagram: Math.round(igBase + igWobble),
      linkedin: Math.round(liBase + liWobble),
    })
  }
  // keep the real endpoints exact
  points[points.length - 1] = {
    date: points[points.length - 1].date,
    instagram: igEnd,
    linkedin: liEnd,
  }
  return points
}

export const dailyFollowerHistory: FollowerPoint[] = buildDailyHistory()

export interface PlatformComparisonRow {
  metric: string
  instagram: number
  linkedin: number
}

export const platformComparison: PlatformComparisonRow[] = [
  { metric: 'Interacción', instagram: 6.4, linkedin: 3.9 },
  { metric: 'Posts', instagram: 14, linkedin: 9 },
  { metric: 'Alcance (K)', instagram: 24.8, linkedin: 9.7 },
  { metric: 'Guardados (K)', instagram: 3.1, linkedin: 0.8 },
]

export interface HeadlineMetric {
  label: string
  value: number
  format: 'compact' | 'percent' | 'plain'
  delta: number
  suffix?: string
}

export const headlineMetrics: HeadlineMetric[] = [
  {
    label: 'Seguidores totales',
    value: 30830,
    format: 'compact',
    delta: 5.1,
  },
  {
    label: 'Interacción promedio',
    value: 5.2,
    format: 'percent',
    delta: 0.8,
  },
  {
    label: 'Visualizaciones del mes',
    value: 486000,
    format: 'compact',
    delta: 12.4,
  },
  {
    label: 'Mejor post de la semana',
    value: 2840,
    format: 'compact',
    delta: -3.2,
    suffix: 'likes',
  },
]
