-- ============================================================================
-- RESET RLS POLICIES FOR COMMENTS TABLE (HARD RESET)
-- ============================================================================
-- Nếu gặp lỗi permission denied, chạy script này

-- Step 1: DISABLE RLS tạm thời (cho phép edit)
ALTER TABLE public.comments DISABLE ROW LEVEL SECURITY;

-- Step 2: DROP ALL existing policies
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN
        SELECT policyname
        FROM pg_policies
        WHERE tablename = 'comments' AND schemaname = 'public'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON public.comments';
    END LOOP;
END $$;

-- Step 3: RE-ENABLE RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Step 4: CREATE FRESH POLICIES

-- Allow ANYONE to READ comments (public)
CREATE POLICY "Read comments"
  ON public.comments
  FOR SELECT
  USING (true);

-- Allow AUTHENTICATED users to CREATE comments
CREATE POLICY "Create comments"
  ON public.comments
  FOR INSERT
  WITH CHECK (auth.uid() = author_id AND auth.role() = 'authenticated');

-- Allow authors to UPDATE their own comments
CREATE POLICY "Update own comments"
  ON public.comments
  FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Allow authors to DELETE their own comments
CREATE POLICY "Delete own comments"
  ON public.comments
  FOR DELETE
  USING (auth.uid() = author_id);

-- Step 5: VERIFY
SELECT tablename, rowsecurity FROM pg_tables 
WHERE tablename = 'comments' AND schemaname = 'public';

-- Step 6: LIST all policies
SELECT policyname, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'comments' AND schemaname = 'public';
