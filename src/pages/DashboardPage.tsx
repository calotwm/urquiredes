import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck2, Users, TrendingUp, Trophy, ArrowRight } from 'lucide-react'
import StatCard from '../components/StatCard'
import GrowthChart from '../components/GrowthChart'
import TopPostRow from '../components/TopPostRow'
import PostCard from '../components/PostCard'
import { usePosts } from '../hooks/usePosts'
import { followerHistory, platformMetrics } from '../data/metrics'
import { TODAY, startOfWeek, endOfWeek } from '../lib/date'

export default function DashboardPage() {
  const { posts } = usePosts()

  const weekPosts = useMemo(() => {
    const start = startOfWeek(TODAY)
    const end = endOfWeek(TODAY)
    return posts.filter((p) => {
      const d = new Date(p.scheduledAt)
      return d >= start && d <= end
    })
  }, [posts])

  const topPosts = useMemo(
    () =>
      [...posts]
        .filter((p) => p.status === 'published')
        .sort(
          (a, b) =>
            (b.likes ?? 0) + (b.comments ?? 0) - ((a.likes ?? 0) + (a.comments ?? 0)),
        )
        .slice(0, 3),
    [posts],
  )

  const upcoming = useMemo(
    () =>
      [...posts]
        .filter((p) => new Date(p.scheduledAt) >= TODAY)
        .sort(
          (a, b) =>
            new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
        )
        .slice(0, 4),
    [posts],
  )

  const totalFollowers = platformMetrics.reduce((sum, m) => sum + m.followers, 0)
  const avgEngagement =
    platformMetrics.reduce((sum, m) => sum + m.engagementRate, 0) /
    platformMetrics.length

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          label="Posts esta semana"
          value={String(weekPosts.length)}
          icon={CalendarCheck2}
          accent
        />
        <StatCard
          label="Seguidores totales"
          value={new Intl.NumberFormat('es-AR', { notation: 'compact' }).format(
            totalFollowers,
          )}
          icon={Users}
          delta={5.1}
        />
        <StatCard
          label="Engagement promedio"
          value={`${avgEngagement.toFixed(1)}%`}
          icon={TrendingUp}
          delta={0.8}
        />
        <StatCard
          label="Mejor post (likes)"
          value={new Intl.NumberFormat('es-AR', { notation: 'compact' }).format(
            topPosts[0]?.likes ?? 0,
          )}
          icon={Trophy}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5 xl:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-text">
                Crecimiento de seguidores
              </h2>
              <p className="text-xs text-text-muted">Últimas 5 semanas</p>
            </div>
            <Link
              to="/metricas"
              className="flex items-center gap-1 text-xs font-medium text-brand-light hover:underline"
            >
              Ver métricas <ArrowRight size={13} />
            </Link>
          </div>
          <GrowthChart data={followerHistory} />
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5 xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text">
              Mejores publicaciones
            </h2>
            <Trophy size={15} className="text-brand-light" />
          </div>
          <div className="flex flex-col gap-2.5">
            {topPosts.map((post, i) => (
              <TopPostRow key={post.id} post={post} rank={i + 1} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text">
            Próximas publicaciones
          </h2>
          <Link
            to="/calendario"
            className="flex items-center gap-1 text-xs font-medium text-brand-light hover:underline"
          >
            Ver calendario <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {upcoming.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
