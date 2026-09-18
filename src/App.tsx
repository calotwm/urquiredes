import { useMemo, useState } from 'react'
import { CalendarX2 } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import StatsBar from './components/StatsBar'
import FilterBar, {
  type PlatformFilter,
  type StatusFilter,
} from './components/FilterBar'
import PostCard from './components/PostCard'
import { posts } from './data/posts'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [platform, setPlatform] = useState<PlatformFilter>('all')
  const [status, setStatus] = useState<StatusFilter>('all')

  const filtered = useMemo(() => {
    return posts
      .filter((p) => platform === 'all' || p.platform === platform)
      .filter((p) => status === 'all' || p.status === status)
      .sort(
        (a, b) =>
          new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
      )
  }, [platform, status])

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
          <StatsBar posts={posts} />

          <FilterBar
            platform={platform}
            onPlatformChange={setPlatform}
            status={status}
            onStatusChange={setStatus}
          />

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
              <CalendarX2 size={32} className="text-text-muted" />
              <p className="text-sm text-text-muted">
                No hay publicaciones con estos filtros.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
