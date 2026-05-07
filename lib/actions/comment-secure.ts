// lib/actions/comment-secure.ts
// Secured comment actions with sanitization and rate limiting

'use server'

import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/ratelimit/limiter'
import { sanitizeComment, validateComment } from '@/lib/security/sanitize'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export type CommentState = { error?: string; success?: string } | null

/**
 * Get client IP from headers
 */
async function getClientIP(): Promise<string> {
  const headersList = await headers()
  return (
    headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
    headersList.get('x-real-ip') ||
    headersList.get('cf-connecting-ip') ||
    'unknown'
  )
}

/**
 * Add comment with sanitization and rate limiting
 */
export async function addCommentSecureAction(
  _prevState: CommentState,
  formData: FormData
): Promise<CommentState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Đăng nhập để bình luận.' }
  }
  
  const postId = formData.get('post_id') as string
  const postSlug = formData.get('post_slug') as string
  const content = (formData.get('content') as string)?.trim()
  
  // Rate limit by user ID
  const rateLimitKey = `comment:${user.id}`
  const rateLimit = await checkRateLimit(rateLimitKey, 'comment')
  
  if (!rateLimit.success) {
    return { error: rateLimit.message }
  }
  
  // Validate comment
  const validation = validateComment(content)
  if (!validation.valid) {
    return { error: validation.error }
  }
  
  // Sanitize content
  const sanitized = sanitizeComment(content)
  
  // Ensure user has profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()
  
  if (!profile) {
    // Auto-create profile if missing
    await supabase.from('profiles').insert({
      id: user.id,
      username: `user-${user.id.substring(0, 8)}`,
      display_name: user.email?.split('@')[0] || 'User',
      role: 'reader'
    })
  }
  
  // Insert comment
  const { error } = await supabase
    .from('comments')
    .insert({
      post_id: postId,
      author_id: user.id,
      content: sanitized
    })
  
  if (error) {
    console.error('Comment insert error:', error)
    return { error: error.message || 'Lỗi khi gửi bình luận.' }
  }
  
  // Revalidate
  revalidatePath(`/community/${postSlug}`)
  
  return { success: 'Bình luận đã được gửi!' }
}

/**
 * Delete comment (with ownership check) — FormData wrapper
 */
export async function deleteCommentFormSecureAction(
  formData: FormData
): Promise<void> {
  const commentId = formData.get('comment_id') as string
  const postSlug = formData.get('post_slug') as string
  
  if (!commentId || !postSlug) {
    return
  }
  
  await deleteCommentSecureInternal(commentId, postSlug)
}

/**
 * Delete comment (with ownership check) — called from form action
 */
async function deleteCommentSecureInternal(
  commentId: string,
  postSlug: string
): Promise<void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  if (!user) {
    return
  }
  
  // Get comment first (to verify ownership)
  const { data: comment } = await supabase
    .from('comments')
    .select('id, author_id')
    .eq('id', commentId)
    .single()
  
  if (!comment || comment.author_id !== user.id) {
    return
  }
  
  // Delete
  await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
  
  revalidatePath(`/community/${postSlug}`)
}
