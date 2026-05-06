'use server'

import { deletePostAction } from '@/lib/actions/posts'

export async function deletePostFormAction(formData: FormData): Promise<void> {
  const postId = formData.get('post_id') as string
  if (!postId) return
  await deletePostAction(postId)
}
