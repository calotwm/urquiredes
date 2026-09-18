import type { Platform } from '../types/post'
import { InstagramGlyph, LinkedinGlyph } from './icons'

export default function PlatformIcon({
  platform,
  size = 14,
}: {
  platform: Platform
  size?: number
}) {
  if (platform === 'instagram') {
    return (
      <span className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 p-1 text-white">
        <InstagramGlyph size={size} />
      </span>
    )
  }
  return (
    <span className="inline-flex items-center justify-center rounded-md bg-[#0A66C2] p-1 text-white">
      <LinkedinGlyph size={size} />
    </span>
  )
}
