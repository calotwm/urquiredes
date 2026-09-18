import { Menu, Search, Plus, Bell } from 'lucide-react'

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-bg/85 px-4 py-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-text-muted hover:bg-white/5 hover:text-text lg:hidden"
        aria-label="Abrir menú"
      >
        <Menu size={20} />
      </button>

      <div>
        <h1 className="text-lg font-semibold text-text sm:text-xl">
          Panel de contenido
        </h1>
        <p className="hidden text-xs text-text-muted sm:block">
          Gestioná todas tus publicaciones en un solo lugar
        </p>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Buscar publicaciones..."
            className="w-56 rounded-xl border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <button
          type="button"
          aria-label="Notificaciones"
          className="relative rounded-xl border border-border bg-surface p-2.5 text-text-muted hover:border-brand/40 hover:text-text"
        >
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand" />
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl bg-brand px-3 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(204,0,126,0.35)] transition-colors hover:bg-brand-light sm:px-4"
        >
          <Plus size={17} />
          <span className="hidden sm:inline">Nueva publicación</span>
        </button>
      </div>
    </header>
  )
}
