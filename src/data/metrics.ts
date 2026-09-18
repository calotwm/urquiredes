import type { FollowerPoint, PlatformMetrics } from '../types/post'

export const followerHistory: FollowerPoint[] = [
  { date: '2026-08-19', instagram: 18200, linkedin: 9400 },
  { date: '2026-08-26', instagram: 18650, linkedin: 9580 },
  { date: '2026-09-02', instagram: 19100, linkedin: 9820 },
  { date: '2026-09-09', instagram: 19480, linkedin: 10050 },
  { date: '2026-09-16', instagram: 20120, linkedin: 10380 },
  { date: '2026-09-18', instagram: 20340, linkedin: 10490 },
]

export const platformMetrics: PlatformMetrics[] = [
  {
    platform: 'instagram',
    followers: 20340,
    followersDelta: 5.8,
    engagementRate: 6.4,
    postsThisMonth: 14,
    avgReach: 24800,
  },
  {
    platform: 'linkedin',
    followers: 10490,
    followersDelta: 4.1,
    engagementRate: 3.9,
    postsThisMonth: 9,
    avgReach: 9700,
  },
]
