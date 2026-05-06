import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WriteEditor from '@/components/community/WriteEditor'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Viết bài mới',
}

export default async function WritePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?redirect=/community/write')

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">
            Viết bài mới
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Hỗ trợ Markdown & GFM · Chèn ảnh bằng nút 🖼 trên toolbar hoặc paste thẳng (Ctrl+V)
          </p>
        </div>

        <WriteEditor />
      </main>
      <Footer />
    </>
  )
}
