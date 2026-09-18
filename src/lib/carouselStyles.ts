import type { CarouselStyle } from '../types/carousel'

export const CAROUSEL_STYLES: CarouselStyle[] = [
  {
    id: 'midnight',
    label: 'Midnight',
    gradient: ['#1a0b2e', '#3d1155'],
    textColor: '#ffffff',
    accentColor: '#cc007e',
    previewClass: 'bg-gradient-to-br from-[#1a0b2e] to-[#3d1155]',
  },
  {
    id: 'sunset',
    label: 'Sunset',
    gradient: ['#ff5f6d', '#ffc371'],
    textColor: '#1a0b2e',
    accentColor: '#ffffff',
    previewClass: 'bg-gradient-to-br from-[#ff5f6d] to-[#ffc371]',
  },
  {
    id: 'mint',
    label: 'Mint',
    gradient: ['#0f766e', '#34d399'],
    textColor: '#ffffff',
    accentColor: '#052e2b',
    previewClass: 'bg-gradient-to-br from-[#0f766e] to-[#34d399]',
  },
  {
    id: 'paper',
    label: 'Paper',
    gradient: ['#f5f1e8', '#e8e0cc'],
    textColor: '#1f1a12',
    accentColor: '#cc007e',
    previewClass: 'bg-gradient-to-br from-[#f5f1e8] to-[#e8e0cc]',
  },
]

export function getCarouselStyle(id: string): CarouselStyle {
  return CAROUSEL_STYLES.find((s) => s.id === id) ?? CAROUSEL_STYLES[0]
}
