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
  likes?: number
  comments?: number
  reach?: number
}

export interface FollowerPoint {
  date: string
  instagram: number
  linkedin: number
}

export interface PlatformMetrics {
  platform: Platform
  followers: number
  followersDelta: number
  engagementRate: number
  postsThisMonth: number
  avgReach: number
}

export interface Idea {
  id: string
  text: string
  platform: Platform | 'general'
  createdAt: string
}
