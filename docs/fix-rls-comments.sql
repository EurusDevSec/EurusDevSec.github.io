-- ============================================================================
-- FIX RLS POLICIES FOR COMMENTS TABLE
-- ============================================================================
-- Chạy script này trong Supabase SQL Editor để fix lỗi "permission denied"

-- 1. Enable RLS if not already enabled
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies (to avoid conflicts)
DROP POLICY IF EXISTS "Comments are readable by anyone" ON public.comments;
DROP POLICY IF EXISTS "Authenticated users can create comments" ON public.comments;
DROP POLICY IF EXISTS "Authors can delete own comments" ON public.comments;

-- 3. CREATE NEW POLICIES

-- Policy 1: Anyone (authenticated or not) can READ comments
CREATE POLICY "Allow anyone to read comments"
  ON public.comments FOR SELECT
  USING (true);

-- Policy 2: Authenticated users CAN INSERT comments
CREATE POLICY "Allow authenticated users to create comments"
  ON public.comments FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND auth.uid() = author_id
  );

-- Policy 3: Authors can UPDATE their own comments (if needed later)
CREATE POLICY "Allow authors to update own comments"
  ON public.comments FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Policy 4: Authors can DELETE their own comments
CREATE POLICY "Allow authors to delete own comments"
  ON public.comments FOR DELETE
  USING (auth.uid() = author_id);

-- ============================================================================
-- VERIFY RLS IS ENABLED
-- ============================================================================
-- Run this query to check RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'comments' AND schemaname = 'public';

-- Should output: comments | true
