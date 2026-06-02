'use server'

import { createClient } from '@/lib/supabase/server'

/**
 * Get likes count for a specific blog post.
 * If the table doesn't exist or query fails, it returns 0.
 */
export async function getLikesAction(slug: string): Promise<number> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('blog_likes')
      .select('likes_count')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Row not found, which is fine, means 0 likes
        return 0
      }
      console.warn(`Supabase blog_likes query warning for slug ${slug}:`, error.message)
      return 0
    }

    return data?.likes_count || 0
  } catch (err) {
    console.warn(`Fallback: Failed to fetch likes for slug ${slug} from DB. Using local fallback.`, err)
    return 0
  }
}

/**
 * Increment or decrement likes count for a specific blog post.
 * amount can be 1 (like) or -1 (unlike).
 */
export async function incrementLikeAction(slug: string, amount: number): Promise<number> {
  try {
    const supabase = await createClient()
    
    // Fetch current likes
    const { data } = await supabase
      .from('blog_likes')
      .select('likes_count')
      .eq('slug', slug)
      .single()

    const currentCount = data?.likes_count || 0
    const nextCount = Math.max(0, currentCount + amount)

    const { error } = await supabase
      .from('blog_likes')
      .upsert({
        slug,
        likes_count: nextCount
      })

    if (error) {
      console.error(`Failed to upsert likes for slug ${slug}:`, error.message)
      throw error
    }

    return nextCount
  } catch (err) {
    console.warn(`Fallback: Failed to update likes for slug ${slug} in DB. Using local fallback.`, err)
    // Return a dummy value, client will handle local count updates
    return -1
  }
}
