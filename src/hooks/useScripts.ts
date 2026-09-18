import { useEffect, useState } from 'react'
import type { GeneratedScript, SavedScript } from '../types/script'

const STORAGE_KEY = 'socialflow.scripts'

function loadScripts(): SavedScript[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function useScripts() {
  const [scripts, setScripts] = useState<SavedScript[]>(() => loadScripts())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts))
    } catch {
      // localStorage unavailable, ignore
    }
  }, [scripts])

  function saveScript(topic: string, generated: GeneratedScript) {
    const script: SavedScript = {
      ...generated,
      id: crypto.randomUUID(),
      topic,
      createdAt: new Date().toISOString(),
    }
    setScripts((prev) => [script, ...prev])
    return script
  }

  function deleteScript(id: string) {
    setScripts((prev) => prev.filter((s) => s.id !== id))
  }

  return { scripts, saveScript, deleteScript }
}
