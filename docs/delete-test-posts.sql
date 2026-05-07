-- ============================================================================
-- DELETE TEST POSTS AND THEIR COMMENTS
-- ============================================================================
-- Xóa các bài post test (slug chứa 'test')

-- Step 1: Xóa comments của các test posts trước (vì foreign key)
DELETE FROM public.comments
WHERE post_id IN (
  SELECT id FROM public.posts 
  WHERE slug LIKE '%test%'
);

-- Step 2: Xóa các test posts
DELETE FROM public.posts
WHERE slug LIKE '%test%';

-- Step 3: Verify
SELECT COUNT(*) as remaining_posts FROM public.posts;
SELECT COUNT(*) as remaining_comments FROM public.comments;
