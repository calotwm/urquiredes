export function InstagramGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  )
}

export function LinkedinGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="7.2" cy="8" r="1.4" />
      <rect x="6.1" y="10.5" width="2.2" height="7.2" />
      <path d="M11.5 10.5h2.1v1.05c.5-.75 1.35-1.25 2.4-1.25 1.9 0 3.15 1.25 3.15 3.6v3.8h-2.2v-3.4c0-1.05-.4-1.75-1.35-1.75-.75 0-1.2.5-1.4 1-.07.18-.1.42-.1.68v3.47h-2.2c.03-.6.09-2.5.09-4.6 0-1.2-.05-1.8-.09-2.4z" />
    </svg>
  )
}
