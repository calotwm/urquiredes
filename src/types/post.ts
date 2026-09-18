export type Platform = 'instagram' | 'linkedin'
export type PostStatus = 'draft' | 'ready' | 'published'

export interface Post {
  id: string
  title: string
  image: string
  platform: Platform
  status: PostStatus
  scheduledAt: string
  caption?: string
}
