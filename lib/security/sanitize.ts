// lib/security/sanitize.ts
// Input sanitization for user content

/**
 * Sanitize comment content - remove potentially dangerous HTML/scripts
 * This is a basic implementation. For production, use dompurify.
 */
export function sanitizeComment(text: string): string {
  return (
    text
      // Remove script tags and content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Remove event handlers
      .replace(/\bon\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/\bon\w+\s*=\s*[^\s>]*/gi, '')
      // Remove iframe tags
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      // Remove style tags and dangerous CSS
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      // Remove HTML comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Basic HTML encode dangerous characters (but keep markdown)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Restore allowed tags for markdown rendering
      .replace(/&lt;(\/?(strong|em|a|code|pre|ul|ol|li|br|hr).*?)&gt;/gi, '<$1>')
  )
}

/**
 * Validate comment length and content
 */
export function validateComment(content: string): { valid: boolean; error?: string } {
  if (!content || typeof content !== 'string') {
    return { valid: false, error: 'Nội dung không hợp lệ' }
  }
  
  const trimmed = content.trim()
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Bình luận không được trống' }
  }
  
  if (trimmed.length > 5000) {
    return { valid: false, error: 'Bình luận quá dài (tối đa 5000 ký tự)' }
  }
  
  // Check for spam patterns
  if (hasSpamPatterns(trimmed)) {
    return { valid: false, error: 'Nội dung có vẻ như spam' }
  }
  
  return { valid: true }
}

/**
 * Detect common spam patterns
 */
function hasSpamPatterns(text: string): boolean {
  // Too many URLs
  const urlCount = (text.match(/https?:\/\//gi) || []).length
  if (urlCount > 3) return true
  
  // Repeated characters (e.g., "aaaaa")
  if (/(.)\1{9,}/gi.test(text)) return true
  
  // All caps (potential spam)
  if (text.length > 50 && text === text.toUpperCase()) return true
  
  // Chinese/Korean bot spam keywords (optional)
  const spamKeywords = ['电话', '微信', '카지노', '바카라']
  if (spamKeywords.some(k => text.includes(k))) return true
  
  return false
}

/**
 * Sanitize post title
 */
export function sanitizeTitle(title: string): string {
  return (
    title
      .replace(/[<>]/g, '')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .trim()
      .slice(0, 200)
  )
}

/**
 * Validate post tags
 */
export function validateTags(tags: string[]): { valid: boolean; error?: string; tags?: string[] } {
  if (!Array.isArray(tags)) {
    return { valid: false, error: 'Tags phải là mảng' }
  }
  
  const sanitized = tags
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag.length > 0 && tag.length <= 50)
    .slice(0, 10)
  
  if (sanitized.length === 0) {
    return { valid: false, error: 'Phải có ít nhất 1 tag' }
  }
  
  return { valid: true, tags: sanitized }
}
