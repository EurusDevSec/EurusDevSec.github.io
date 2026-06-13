# SQL Setup for Blog Post Likes

Run the following SQL commands in your Supabase SQL Editor to create the `blog_likes` table and configure Row Level Security (RLS) policies to allow public reads and increments.

```sql
-- 1. Create the blog_likes table
CREATE TABLE IF NOT EXISTS public.blog_likes (
    slug TEXT PRIMARY KEY,
    likes_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anyone (even anonymous users) to read likes
CREATE POLICY "Allow public read access to likes"
ON public.blog_likes FOR SELECT
USING (true);

-- 4. Policy: Allow anyone to insert/update likes (to increment like counts)
CREATE POLICY "Allow public write access to likes"
ON public.blog_likes FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public update access to likes"
ON public.blog_likes FOR UPDATE
USING (true)
WITH CHECK (true);

-- 5. Grant database permissions to anon and authenticated roles
GRANT SELECT, INSERT, UPDATE ON TABLE public.blog_likes TO anon, authenticated;
```

### Verification
You can verify the table by inserting a mock record:
```sql
INSERT INTO public.blog_likes (slug, likes_count)
VALUES ('test-post', 5)
ON CONFLICT (slug) DO UPDATE SET likes_count = blog_likes.likes_count + 1;
```
Then select it:
```sql
SELECT * FROM public.blog_likes WHERE slug = 'test-post';
```
