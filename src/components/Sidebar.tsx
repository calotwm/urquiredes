import {
  LayoutGrid,
  CalendarDays,
  Image as ImageIcon,
  BarChart3,
  Settings,
  Sparkles,
  X,
} from 'lucide-react'

const NAV = [
  { label: 'Panel', icon: LayoutGrid, active: true },
  { label: 'Calendario', icon: CalendarDays, active: false },
  { label: 'Biblioteca', icon: ImageIcon, active: false },
  { label: 'Estadísticas', icon: BarChart3, active: false },
  { label: 'Configuración', icon: Settings, active: false },
]

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface px-4 py-6 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark shadow-[0_0_20px_rgba(204,0,126,0.5)]">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-[17px] font-semibold tracking-tight text-text">
              SocialFlow
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-muted hover:bg-white/5 hover:text-text lg:hidden"
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map(({ label, icon: Icon, active }) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-brand/15 text-brand-light shadow-[inset_0_0_0_1px_rgba(204,0,126,0.35)]'
                  : 'text-text-muted hover:bg-white/5 hover:text-text'
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </a>
          ))}
        </nav>

        <div className="rounded-2xl border border-border bg-surface-2 p-4">
          <p className="text-sm font-semibold text-text">Pasate a Pro</p>
          <p className="mt-1 text-xs leading-relaxed text-text-muted">
            Programación ilimitada y estadísticas avanzadas.
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-lg bg-brand py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-light"
          >
            Mejorar plan
          </button>
        </div>
      </aside>
    </>
  )
}
