'use client'

import { useActionState } from 'react'
import { formatDate } from '@/lib/utils'
import { addBlogCommentAction } from '@/lib/actions/posts'
import { deleteCommentFormAction } from '@/lib/actions/comment-delete'
import type { CommentState } from '@/lib/actions/posts'

interface Comment {
  id: string
  content: string
  created_at: string
  profiles: {
    username: string
    display_name: string | null
  } | null
}

interface BlogCommentSectionProps {
  blogSlug: string
  comments: Comment[]
  currentUserId?: string
}

function BlogCommentForm({ blogSlug }: { blogSlug: string }) {
  const [state, action, pending] = useActionState<CommentState, FormData>(
    addBlogCommentAction,
    null
  )

  return (
    <form action={action} className="mt-4 space-y-3">
      <input type="hidden" name="blog_slug" value={blogSlug} />
      <textarea
        name="content"
        required
        rows={3}
        maxLength={1000}
        placeholder="Viết bình luận của bạn..."
        className="w-full resize-none rounded-lg border border-white/[0.06] bg-surface px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20"
      />
      {state?.error && (
        <p className="text-xs text-red-400">⚠ {state.error}</p>
      )}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="btn-primary text-sm"
        >
          {pending ? 'Đang gửi...' : 'Gửi bình luận'}
        </button>
      </div>
    </form>
  )
}

export default function BlogCommentSection({
  blogSlug,
  comments,
  currentUserId,
}: BlogCommentSectionProps) {
  return (
    <section className="mt-12 border-t border-white/[0.06] pt-8">
      <h2 className="mb-6 text-lg font-bold text-text-primary">
        Bình luận ({comments.length})
      </h2>

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => {
            const author =
              comment.profiles?.display_name ||
              comment.profiles?.username ||
              'Anonymous'
            const initial = author.charAt(0).toUpperCase()

            return (
              <div
                key={comment.id}
                className="rounded-xl border border-white/[0.06] bg-surface/60 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-400">
                      {initial}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-text-primary">
                        {author}
                      </span>
                      <span className="ml-2 text-xs text-text-muted">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                  </div>

                  {currentUserId && (
                    <form action={deleteCommentFormAction}>
                      <input type="hidden" name="comment_id" value={comment.id} />
                      <input type="hidden" name="post_slug" value={blogSlug} />
                      <button
                        type="submit"
                        className="text-xs text-text-muted transition-colors hover:text-red-400"
                        title="Xóa bình luận"
                      >
                        ✕
                      </button>
                    </form>
                  )}
                </div>
                <p className="whitespace-pre-wrap text-sm text-text-secondary">
                  {comment.content}
                </p>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-sm text-text-muted">
          Chưa có bình luận. Hãy là người đầu tiên!
        </p>
      )}

      {currentUserId ? (
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-text-secondary">
            Thêm bình luận
          </h3>
          <BlogCommentForm blogSlug={blogSlug} />
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-white/[0.06] p-4 text-center text-sm text-text-muted">
          <a href="/login" className="text-emerald-400 hover:underline">
            Đăng nhập
          </a>{' '}
          để bình luận.
        </div>
      )}
    </section>
  )
}
