import { useEffect, useState } from 'react'
import type { CarouselSlide, CarouselStyleId, SavedCarousel } from '../types/carousel'

const STORAGE_KEY = 'socialflow.carousels'

function loadCarousels(): SavedCarousel[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function useCarousels() {
  const [carousels, setCarousels] = useState<SavedCarousel[]>(() => loadCarousels())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(carousels))
    } catch {
      // localStorage unavailable, ignore
    }
  }, [carousels])

  function saveCarousel(topic: string, styleId: CarouselStyleId, slides: CarouselSlide[]) {
    const carousel: SavedCarousel = {
      id: crypto.randomUUID(),
      topic,
      styleId,
      slides,
      createdAt: new Date().toISOString(),
    }
    setCarousels((prev) => [carousel, ...prev])
    return carousel
  }

  function deleteCarousel(id: string) {
    setCarousels((prev) => prev.filter((c) => c.id !== id))
  }

  return { carousels, saveCarousel, deleteCarousel }
}
