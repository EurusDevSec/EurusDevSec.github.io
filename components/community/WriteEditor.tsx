'use client'

import { useState, useRef, useCallback, useTransition } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { createPostAction } from '@/lib/actions/posts'
import { createClient } from '@/lib/supabase/client'

type Tab = 'write' | 'preview'
type PostState = { error?: string; success?: string } | null

const TOOLBAR = [
  { label: 'B', title: 'Bold', before: '**', after: '**', mono: true },
  { label: 'I', title: 'Italic', before: '_', after: '_', mono: true },
  { label: 'H2', title: 'Heading 2', before: '\n## ', after: '', mono: true },
  { label: 'H3', title: 'Heading 3', before: '\n### ', after: '', mono: true },
  { label: '—', title: 'sep', before: '', after: '', mono: false },
  { label: '<>', title: 'Inline code', before: '`', after: '`', mono: true },
  { label: '```', title: 'Code block', before: '\n```\n', after: '\n```\n', mono: true },
  { label: '—', title: 'sep2', before: '', after: '', mono: false },
  { label: '–', title: 'List item', before: '\n- ', after: '', mono: true },
  { label: '"', title: 'Blockquote', before: '\n> ', after: '', mono: true },
  { label: '🔗', title: 'Link', before: '[text](', after: ')', mono: false },
]

export default function WriteEditor() {
  const [state, setState] = useState<PostState>(null)
  const [isPending, startTransition] = useTransition()
  const [tab, setTab] = useState<Tab>('write')
  const [content, setContent] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)


  const insertAtCursor = useCallback((before: string, after: string, replaceSelected = true) => {
    const el = textareaRef.current
    if (!el) return
    const { selectionStart: s, selectionEnd: e, value } = el
    const selected = replaceSelected ? value.slice(s, e) : ''
    const insertion = before + selected + after
    const newValue = value.slice(0, s) + insertion + value.slice(e)
    setContent(newValue)
    setTimeout(() => {
      el.focus()
      const cursor = s + before.length + selected.length
      el.setSelectionRange(cursor, cursor)
    }, 0)
  }, [])

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Chỉ hỗ trợ file ảnh (jpg, png, gif, webp)')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File ảnh tối đa 5MB')
      return
    }

    setUploading(true)
    setUploadError('')

    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const filePath = `community/${fileName}`

    const { error } = await supabase.storage
      .from('post-images')
      .upload(filePath, file, { upsert: false })

    if (error) {
      setUploadError(`Upload thất bại: ${error.message}`)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('post-images').getPublicUrl(filePath)
    const url = data.publicUrl
    insertAtCursor(`\n![image](${url})\n`, '', false)
    setUploading(false)
  }, [insertAtCursor])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageUpload(file)
    e.target.value = ''
  }

  // Handle paste image
  const onPaste = useCallback((e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile()
        if (file) {
          e.preventDefault()
          handleImageUpload(file)
        }
      }
    }
  }, [handleImageUpload])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    // Explicitly set content from React state to guarantee it is never empty
    formData.set('content', content)
    setState(null)
    startTransition(async () => {
      const result = await createPostAction(null, formData)
      if (result) setState(result)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Title */}
      <input
        name="title"
        type="text"
        required
        maxLength={200}
        placeholder="Tiêu đề bài viết..."
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-xl font-bold text-text-primary outline-none placeholder:font-normal placeholder:text-text-muted focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 dark:focus:border-emerald-400/60 dark:focus:ring-emerald-400/20"
      />

      {/* Tags */}
      <input
        name="tags"
        type="text"
        placeholder="Tags (cách nhau bằng dấu phẩy): devops, aws, kubernetes..."
        className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-emerald-500/40 dark:focus:border-emerald-400/40"
      />

      {/* Editor area */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        {/* Tab bar + Toolbar */}
        <div className="flex items-center justify-between border-b border-border bg-surface-elevated px-2 py-1.5">
          {/* Tabs */}
          <div className="flex gap-1">
            {(['write', 'preview'] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                  tab === t
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {t === 'write' ? 'Viết' : 'Preview'}
              </button>
            ))}
          </div>

          {/* Toolbar */}
          {tab === 'write' && (
            <div className="flex items-center gap-0.5 overflow-x-auto">
              {TOOLBAR.map((btn, i) =>
                btn.title.startsWith('sep') ? (
                  <div key={i} className="mx-1 h-4 w-px flex-shrink-0 bg-border" />
                ) : (
                  <button
                    key={i}
                    type="button"
                    title={btn.title}
                    onClick={() => insertAtCursor(btn.before, btn.after)}
                    className={`flex h-7 min-w-[28px] flex-shrink-0 items-center justify-center rounded px-1.5 text-xs text-text-muted transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary ${btn.mono ? 'font-mono' : ''}`}
                  >
                    {btn.label}
                  </button>
                )
              )}

              {/* Image upload button */}
              <div className="mx-1 h-4 w-px flex-shrink-0 bg-border" />
              <button
                type="button"
                title="Chèn ảnh (click hoặc paste)"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex h-7 min-w-[28px] flex-shrink-0 items-center justify-center rounded px-1.5 text-text-muted transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary disabled:opacity-50"
              >
                {uploading ? (
                  <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />
            </div>
          )}
        </div>



        {/* Write pane */}
        {tab === 'write' && (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onPaste={onPaste}
            rows={28}
            placeholder={`Viết nội dung bằng Markdown...\n\n# Heading 1\n## Heading 2\n\n**Bold**, _italic_, \`inline code\`\n\n\`\`\`bash\necho "code block"\n\`\`\`\n\nDán ảnh trực tiếp bằng Ctrl+V hoặc dùng nút ảnh trên toolbar.`}
            className="block w-full resize-y bg-surface px-5 py-4 font-mono text-sm leading-relaxed text-text-primary outline-none placeholder:text-text-muted"
            style={{ minHeight: '520px' }}
          />
        )}

        {/* Preview pane */}
        {tab === 'preview' && (
          <div className="min-h-[520px] bg-surface px-6 py-6">
            {content ? (
              <div className="prose-blog">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm text-text-muted">Chưa có nội dung để preview.</p>
            )}
          </div>
        )}
      </div>

      {/* Upload error */}
      {uploadError && (
        <div className="flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-50 dark:bg-red-500/10 px-4 py-2.5 text-sm text-red-600 dark:text-red-400">
          ⚠ {uploadError}
        </div>
      )}

      {/* Post error */}
      {state?.error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-50 dark:bg-red-500/10 px-4 py-2.5 text-sm text-red-600 dark:text-red-400">
          ⚠ {state.error}
        </div>
      )}

      {/* Bottom bar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-text-muted">
          {content.length} ký tự · Hỗ trợ Markdown & GFM · Paste ảnh bằng Ctrl+V
        </p>
        <button
          type="submit"
          disabled={isPending || !content.trim()}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Đang đăng...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Đăng bài
            </>
          )}
        </button>
      </div>
    </form>
  )
}
