import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CommunityPostCard from '@/components/community/CommunityPostCard'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Community',
  description: 'Cộng đồng EurusDevSec — nơi chia sẻ kiến thức DevSecOps, Cloud và cuộc sống.',
}

export const revalidate = 60 // ISR every 60s

export default async function CommunityPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select(`
      id, title, slug, excerpt, tags, created_at,
      profiles ( username, display_name )
    `)
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(20)

  const postList = posts ?? []

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-text-primary">
              Community
            </h1>
            <p className="mt-2 text-text-secondary">
              {postList.length} bài viết từ cộng đồng
            </p>
          </div>
          <Link
            href="/community/write"
            className="btn-primary"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Viết bài
          </Link>
        </div>

        {/* Posts grid */}
        {postList.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {postList.map((post) => (
              <CommunityPostCard key={post.id} post={post as any} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-surface/40 py-24 text-center">
            <div className="mb-4 text-5xl">✍️</div>
            <h2 className="text-xl font-bold text-text-primary">Chưa có bài viết nào</h2>
            <p className="mt-2 text-text-secondary">
              Hãy là người đầu tiên chia sẻ!
            </p>
            <Link href="/community/write" className="btn-primary mt-6">
              Viết bài đầu tiên
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
