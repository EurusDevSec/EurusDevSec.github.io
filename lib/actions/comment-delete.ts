'use server'

import { deleteCommentAction } from '@/lib/actions/posts'

/**
 * Thin server wrapper so Client Components can submit delete forms
 * without needing 'use server' inline (which is forbidden in client files).
 */
export async function deleteCommentFormAction(formData: FormData): Promise<void> {
  const commentId = formData.get('comment_id') as string
  const postSlug = formData.get('post_slug') as string
  if (!commentId || !postSlug) return
  await deleteCommentAction(commentId, postSlug)
}
