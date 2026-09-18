import { useEffect, useState } from 'react'
import type { Post } from '../types/post'
import { posts as seedPosts } from '../data/posts'

const STORAGE_KEY = 'socialflow.posts'

function loadPosts(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedPosts
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedPosts
  } catch {
    return seedPosts
  }
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>(() => loadPosts())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    } catch {
      // localStorage unavailable, ignore
    }
  }, [posts])

  function addPost(post: Omit<Post, 'id'>) {
    const newPost: Post = { ...post, id: crypto.randomUUID() }
    setPosts((prev) => [...prev, newPost])
    return newPost
  }

  function updatePost(id: string, patch: Partial<Post>) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  function deletePost(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  return { posts, addPost, updatePost, deletePost }
}
