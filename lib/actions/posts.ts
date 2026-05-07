'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { slugify, truncate, stripMarkdown } from '@/lib/utils'

// Helper to ensure a profile exists before inserting relational data
async function ensureProfile(supabase: any, user: any) {
  const { data } = await supabase.from('profiles').select('id').eq('id', user.id).single()
  if (!data) {
    const baseName = user.email?.split('@')[0] || 'user'
    await supabase.from('profiles').insert({
      id: user.id,
      username: `${baseName}-${user.id.substring(0, 5)}`,
      display_name: baseName,
      role: 'reader'
    })
  }
}

export type PostState = { error?: string; success?: string } | null
export type CommentState = { error?: string } | null

// ── CREATE POST ────────────────────────────────────────────────────────────
export async function createPostAction(
  _prevState: PostState,
  formData: FormData
): Promise<PostState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Chưa đăng nhập.' }

  const title = (formData.get('title') as string)?.trim()
  const content = (formData.get('content') as string)?.trim()
  const tagsRaw = (formData.get('tags') as string)?.trim()

  if (!title || !content) return { error: 'Tiêu đề và nội dung không được trống.' }
  if (title.length > 200) return { error: 'Tiêu đề quá dài (tối đa 200 ký tự).' }

  const tags = tagsRaw
    ? tagsRaw.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean).slice(0, 10)
    : []

  const slug = `${slugify(title)}-${Date.now().toString(36)}`
  const excerpt = truncate(stripMarkdown(content), 160)

  await ensureProfile(supabase, user)

  const { error } = await supabase.from('posts').insert({
    title, content, slug, excerpt, tags,
    author_id: user.id,
  })

  if (error) return { error: error.message }

  revalidatePath('/community')
  redirect(`/community/${slug}`)
}

// ── DELETE POST ────────────────────────────────────────────────────────────
export async function deletePostAction(postId: string): Promise<void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('posts').delete().eq('id', postId).eq('author_id', user.id)
  revalidatePath('/community')
  redirect('/dashboard/posts')
}

// ── ADD COMMENT ────────────────────────────────────────────────────────────
export async function addCommentAction(
  _prevState: CommentState,
  formData: FormData
): Promise<CommentState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Đăng nhập để bình luận.' }

  const postId = formData.get('post_id') as string
  const postSlug = formData.get('post_slug') as string
  const content = (formData.get('content') as string)?.trim()

  if (!content) return { error: 'Bình luận không được trống.' }
  if (content.length > 1000) return { error: 'Bình luận quá dài (tối đa 1000 ký tự).' }

  await ensureProfile(supabase, user)

  const { error } = await supabase
    .from('comments')
    .insert({ post_id: postId, author_id: user.id, content })

  if (error) return { error: error.message }

  revalidatePath(`/community/${postSlug}`)
  return null
}

// ── DELETE COMMENT ─────────────────────────────────────────────────────────
export async function deleteCommentAction(
  commentId: string,
  postSlug: string
): Promise<void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('comments').delete().eq('id', commentId).eq('author_id', user.id)
  revalidatePath(`/community/${postSlug}`)
  revalidatePath(`/blog/${postSlug}`)
}

// ── ADD BLOG COMMENT (slug-based) ──────────────────────────────────────────
export async function addBlogCommentAction(
  _prevState: CommentState,
  formData: FormData
): Promise<CommentState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Đăng nhập để bình luận.' }

  const blogSlug = formData.get('blog_slug') as string
  const content = (formData.get('content') as string)?.trim()

  if (!content) return { error: 'Bình luận không được trống.' }
  if (content.length > 1000) return { error: 'Bình luận quá dài (tối đa 1000 ký tự).' }

  await ensureProfile(supabase, user)

  // Blog comments use blog_slug column instead of post_id (UUID)
  const { error } = await supabase
    .from('comments')
    .insert({ blog_slug: blogSlug, author_id: user.id, content })

  if (error) return { error: error.message }

  revalidatePath(`/blog/${blogSlug}`)
  return null
}
