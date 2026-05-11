import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts')
const TARGET_DIR = path.join(__dirname, '..', 'public', 'blog-images')

function copyImages() {
  console.log('🖼️  Syncing blog images to public directory...')

  if (!fs.existsSync(POSTS_DIR)) return
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true })
  }

  const posts = fs.readdirSync(POSTS_DIR, { withFileTypes: true })

  for (const post of posts) {
    if (!post.isDirectory()) continue

    const postPath = path.join(POSTS_DIR, post.name)
    const indexPath = path.join(postPath, 'index.md')

    if (!fs.existsSync(indexPath)) continue

    // Extract slug
    const content = fs.readFileSync(indexPath, 'utf-8')
    const slugMatch = content.match(/^slug:\s*(.+)$/m)
    const normalizeSlug = (value) =>
      value
        .trim()
        .replace(/^['"]|['"]$/g, '')
        .replace(/[\\/]/g, '-')

    const slug = slugMatch ? normalizeSlug(slugMatch[1]) : post.name

    const targetPostDir = path.join(TARGET_DIR, slug)

    // Ensure target dir exists
    if (!fs.existsSync(targetPostDir)) {
      fs.mkdirSync(targetPostDir, { recursive: true })
    }

    // Find and copy images
    const files = fs.readdirSync(postPath)
    for (const file of files) {
      if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
        const sourceFile = path.join(postPath, file)
        const targetFile = path.join(targetPostDir, file)
        
        // Simple check to avoid unnecessary copying if file size is identical
        let shouldCopy = true
        if (fs.existsSync(targetFile)) {
          const sourceStat = fs.statSync(sourceFile)
          const targetStat = fs.statSync(targetFile)
          if (sourceStat.size === targetStat.size) {
            shouldCopy = false
          }
        }

        if (shouldCopy) {
          fs.copyFileSync(sourceFile, targetFile)
          console.log(`   Copied: ${slug}/${file}`)
        }
      }
    }
  }
  console.log('✅ Blog images synced successfully!\n')
}

copyImages()
