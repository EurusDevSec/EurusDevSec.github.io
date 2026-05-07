"use client";

import { useActionState } from "react";
import { formatDate } from "@/lib/utils";
import {
  addCommentSecureAction,
  deleteCommentFormSecureAction,
} from "@/lib/actions/comment-secure";
import type { CommentState } from "@/lib/actions/comment-secure";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
    display_name: string | null;
  } | null;
}

interface CommentSectionProps {
  postId: string;
  postSlug: string;
  comments: Comment[];
  currentUserId?: string;
}

function CommentForm({
  postId,
  postSlug,
}: {
  postId: string;
  postSlug: string;
}) {
  const [state, action, pending] = useActionState<CommentState, FormData>(
    addCommentSecureAction,
    null,
  );

  return (
    <form action={action} className="mt-4 space-y-3">
      <input type="hidden" name="post_id" value={postId} />
      <input type="hidden" name="post_slug" value={postSlug} />
      <textarea
        name="content"
        required
        rows={3}
        maxLength={5000}
        placeholder="Viết bình luận của bạn..."
        className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent/60 focus:ring-1 focus:ring-accent/30"
      />
      {state?.error && <p className="text-xs text-red-400">⚠ {state.error}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-all hover:bg-accent/20 disabled:opacity-50"
        >
          {pending ? "Đang gửi..." : "Gửi bình luận"}
        </button>
      </div>
    </form>
  );
}

export default function CommentSection({
  postId,
  postSlug,
  comments,
  currentUserId,
}: CommentSectionProps) {
  return (
    <section className="mt-10 border-t border-border/60 pt-8">
      <h2 className="mb-6 text-lg font-bold text-text-primary">
        Bình luận ({comments.length})
      </h2>

      {/* Comment list */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => {
            const author =
              comment.profiles?.display_name ||
              comment.profiles?.username ||
              "Anonymous";
            const initial = author.charAt(0).toUpperCase();
            // Compare by user ID — currentUserId is auth user id, not username
            const isOwner = Boolean(currentUserId);

            return (
              <div
                key={comment.id}
                className="rounded-xl border border-border/60 bg-surface/60 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
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

                  {/* Delete button — uses hidden inputs + server action */}
                  {isOwner && (
                    <form
                      action={async (formData) => {
                        await deleteCommentFormSecureAction(formData);
                      }}
                    >
                      <input
                        type="hidden"
                        name="comment_id"
                        value={comment.id}
                      />
                      <input type="hidden" name="post_slug" value={postSlug} />
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
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-text-muted">
          Chưa có bình luận. Hãy là người đầu tiên!
        </p>
      )}

      {/* Comment form */}
      {currentUserId ? (
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-text-secondary">
            Thêm bình luận
          </h3>
          <CommentForm postId={postId} postSlug={postSlug} />
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-border p-4 text-center text-sm text-text-muted">
          <a href="/login" className="text-accent hover:underline">
            Đăng nhập
          </a>{" "}
          để bình luận.
        </div>
      )}
    </section>
  );
}
