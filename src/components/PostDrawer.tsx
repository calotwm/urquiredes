import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import type { Platform, Post, PostStatus } from '../types/post';
import PlatformIcon from './PlatformIcon';
import StatusBadge from './StatusBadge';
import { placeholderImage } from '../lib/placeholder';

const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
];

const STATUS_OPTIONS: { value: PostStatus; label: string }[] = [
  { value: 'draft', label: 'Borrador' },
  { value: 'ready', label: 'Listo' },
  { value: 'published', label: 'Publicado' },
];

interface FormState {
  title: string;
  platform: Platform;
  status: PostStatus;
  time: string;
  image: string;
}

const EMPTY_FORM: FormState = {
  title: '',
  platform: 'instagram',
  status: 'draft',
  time: '10:00',
  image: '',
};

function toTimeInput(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function PostDrawer({
  open,
  onClose,
  date,
  dayPosts,
  onCreate,
  onUpdate,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  date: Date | null;
  dayPosts: Post[];
  onCreate: (post: Omit<Post, 'id'>) => void;
  onUpdate: (id: string, patch: Partial<Post>) => void;
  onDelete: (id: string) => void;
}) {
  if (!date) return null;

  return (
    <AnimatePresence>
      {open && (
        <PostDrawerPanel
          key={date.toDateString()}
          date={date}
          dayPosts={dayPosts}
          onClose={onClose}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
    </AnimatePresence>
  );
}

function PostDrawerPanel({
  date,
  dayPosts,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}: {
  date: Date;
  dayPosts: Post[];
  onClose: () => void;
  onCreate: (post: Omit<Post, 'id'>) => void;
  onUpdate: (id: string, patch: Partial<Post>) => void;
  onDelete: (id: string) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  function startCreate() {
    setForm(EMPTY_FORM);
    setEditingId('new');
  }

  function startEdit(post: Post) {
    setForm({
      title: post.title,
      platform: post.platform,
      status: post.status,
      time: toTimeInput(post.scheduledAt),
      image: post.image,
    });
    setEditingId(post.id);
  }

  function cancelForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !form.title.trim()) return;
    const [hours, minutes] = form.time.split(':').map(Number);
    const scheduled = new Date(date);
    scheduled.setHours(hours || 0, minutes || 0, 0, 0);

    const payload = {
      title: form.title.trim(),
      platform: form.platform,
      status: form.status,
      scheduledAt: scheduled.toISOString(),
      image: form.image.trim() || placeholderImage(form.title + form.platform),
    };

    if (editingId && editingId !== 'new') {
      onUpdate(editingId, payload);
    } else {
      onCreate(payload);
    }
    cancelForm();
  }

  const isFormOpen = editingId !== null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 320 }}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-surface"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
              {date.toLocaleDateString('es-AR', { weekday: 'long' })}
            </p>
            <h3 className="text-base font-semibold text-text">
              {date.toLocaleDateString('es-AR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel"
            className="rounded-lg p-2 text-text-muted hover:bg-white/5 hover:text-text"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!isFormOpen && (
            <>
              <button
                type="button"
                onClick={startCreate}
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
              >
                <Plus size={16} />
                Nuevo post para este día
              </button>

              {dayPosts.length === 0 ? (
                <p className="py-8 text-center text-sm text-text-muted">
                  No hay publicaciones programadas este día.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {dayPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-start gap-3 rounded-xl border border-border bg-surface-2 p-3"
                    >
                      <img
                        src={post.image}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = placeholderImage(
                            post.id + post.title,
                          );
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-1.5">
                          <PlatformIcon platform={post.platform} size={11} />
                          <span className="text-xs text-text-muted">
                            {toTimeInput(post.scheduledAt)}
                          </span>
                        </div>
                        <p className="truncate text-sm font-medium text-text">
                          {post.title}
                        </p>
                        <div className="mt-1.5">
                          <StatusBadge status={post.status} />
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => startEdit(post)}
                          aria-label="Editar"
                          className="rounded-lg p-1.5 text-text-muted hover:bg-white/5 hover:text-text"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(post.id)}
                          aria-label="Eliminar"
                          className="rounded-lg p-1.5 text-text-muted hover:bg-white/5 hover:text-red-400"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {isFormOpen && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-text">
                {editingId === 'new' ? 'Nuevo post' : 'Editar post'}
              </h4>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-muted">
                  Título
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="Título de la publicación"
                  className="w-full rounded-xl border border-border bg-surface-2 p-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-muted">
                  Imagen (URL opcional)
                </label>
                <div className="relative">
                  <ImageIcon
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, image: e.target.value }))
                    }
                    placeholder="https://..."
                    className="w-full rounded-xl border border-border bg-surface-2 p-3 pl-9 text-sm text-text placeholder:text-text-muted outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-text-muted">
                    Red social
                  </label>
                  <div className="flex gap-1.5">
                    {PLATFORM_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({ ...f, platform: opt.value }))
                        }
                        className={`flex-1 rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                          form.platform === opt.value
                            ? 'border-brand/50 bg-brand/15 text-brand-light'
                            : 'border-border text-text-muted hover:border-white/20 hover:text-text'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-text-muted">
                    Hora
                  </label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, time: e.target.value }))
                    }
                    className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-muted">
                  Estado
                </label>
                <div className="flex gap-1.5">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setForm((f) => ({ ...f, status: opt.value }))
                      }
                      className={`flex-1 rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                        form.status === opt.value
                          ? 'border-metric/50 bg-metric/15 text-metric-light'
                          : 'border-border text-text-muted hover:border-white/20 hover:text-text'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium text-text-muted hover:border-white/20 hover:text-text"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!form.title.trim()}
                  className="flex-1 rounded-xl bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Guardar
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.aside>
    </>
  );
}
