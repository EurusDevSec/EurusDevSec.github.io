'use client'

import { useActionState, useState, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { createPostAction } from '@/lib/actions/posts'

type Tab = 'write' | 'preview'

const TOOLBAR = [
  { label: 'B', title: 'Bold', before: '**', after: '**' },
  { label: 'I', title: 'Italic', before: '_', after: '_' },
  { label: '<>', title: 'Inline code', before: '`', after: '`' },
  { label: '```', title: 'Code block', before: '```\n', after: '\n```' },
  { label: '##', title: 'Heading', before: '## ', after: '' },
  { label: '—', title: 'Separator', before: '', after: '' },
  { label: '- ', title: 'List', before: '- ', after: '' },
  { label: '> ', title: 'Blockquote', before: '> ', after: '' },
  { label: '🔗', title: 'Link', before: '[text](', after: ')' },
]

export default function WriteEditor() {
  const [state, action, pending] = useActionState(createPostAction, null)
  const [tab, setTab] = useState<Tab>('write')
  const [content, setContent] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertMarkdown = useCallback((before: string, after: string) => {
    const el = textareaRef.current
    if (!el) return
    const { selectionStart: s, selectionEnd: e, value } = el
    const selected = value.slice(s, e)
    const newValue = value.slice(0, s) + before + selected + after + value.slice(e)
    setContent(newValue)
    setTimeout(() => {
      el.focus()
      el.setSelectionRange(s + before.length, e + before.length)
    }, 0)
  }, [])

  return (
    <form action={action} className="space-y-5">
      {/* Title */}
      <div>
        <input
          name="title"
          type="text"
          required
          maxLength={200}
          placeholder="Tiêu đề bài viết..."
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-xl font-bold text-text-primary outline-none placeholder:font-normal placeholder:text-text-muted focus:border-accent/60 focus:ring-1 focus:ring-accent/30"
        />
      </div>

      {/* Tags */}
      <div>
        <input
          name="tags"
          type="text"
          placeholder="Tags (cách nhau bằng dấu phẩy): devops, aws, kubernetes..."
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent/60 focus:ring-1 focus:ring-accent/30"
        />
      </div>

      {/* Editor */}
      <div className="overflow-hidden rounded-xl border border-border">
        {/* Tabs + toolbar */}
        <div className="flex items-center justify-between border-b border-border bg-surface-elevated px-2 py-1.5">
          <div className="flex gap-1">
            {(['write', 'preview'] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-md px-3 py-1 text-sm font-medium capitalize transition-colors ${
                  tab === t
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {t === 'write' ? 'Viết' : 'Preview'}
              </button>
            ))}
          </div>

          {tab === 'write' && (
            <div className="flex items-center gap-0.5">
              {TOOLBAR.map((btn) =>
                btn.label === '—' ? (
                  <div key="sep" className="mx-1 h-4 w-px bg-border" />
                ) : (
                  <button
                    key={btn.label}
                    type="button"
                    title={btn.title}
                    onClick={() => insertMarkdown(btn.before, btn.after)}
                    className="flex h-7 min-w-[28px] items-center justify-center rounded px-1.5 font-mono text-xs text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
                  >
                    {btn.label}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Write pane */}
        {tab === 'write' && (
          <textarea
            ref={textareaRef}
            name="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            placeholder="Viết nội dung bằng Markdown...&#10;&#10;# Heading&#10;&#10;**Bold**, _italic_, `code`&#10;&#10;```js&#10;console.log('hello')&#10;```"
            className="w-full resize-y bg-surface px-4 py-4 font-mono text-sm text-text-primary outline-none placeholder:text-text-muted"
          />
        )}

        {/* Preview pane */}
        {tab === 'preview' && (
          <div className="min-h-96 bg-surface px-6 py-5">
            {content ? (
              <div className="prose-blog">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm text-text-muted">Chưa có nội dung để preview.</p>
            )}
          </div>
        )}
      </div>

      {/* Error */}
      {state?.error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          ⚠ {state.error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-text-muted">
          {content.length} ký tự · Hỗ trợ Markdown & GFM
        </p>
        <button
          type="submit"
          disabled={pending || !content}
          className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-all hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Đang đăng...
            </>
          ) : (
            '🚀 Đăng bài'
          )}
        </button>
      </div>
    </form>
  )
}
