export type ScriptFormat = 'Reel corto' | 'Video largo' | 'Historia'

export interface GeneratedScript {
  hook: string
  keyPoints: string[]
  cta: string
  duration: string
  format: ScriptFormat
  formatReason: string
  fullScript: string
}

export interface SavedScript extends GeneratedScript {
  id: string
  topic: string
  createdAt: string
}
