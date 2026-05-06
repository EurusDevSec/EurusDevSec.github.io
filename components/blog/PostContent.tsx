import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code'

const prettyCodeOptions: PrettyCodeOptions = {
  theme: 'one-dark-pro',
  keepBackground: false,
  defaultLang: 'plaintext',
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
      [rehypePrettyCode, prettyCodeOptions],
    ],
  },
}

interface PostContentProps {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <article className="prose-blog">
      <MDXRemote source={content} options={mdxOptions as any} />
    </article>
  )
}
