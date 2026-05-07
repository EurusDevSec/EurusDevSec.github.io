# 🔧 Profiles RLS & Trigger Setup

## Problem

When registering, the profile insert fails with RLS error. The `secureRegisterAction` tries to insert into the `profiles` table, but the RLS policy prevents it.

## Solution: Auto-Create Profile via Trigger

Run this SQL in Supabase SQL Editor:

```sql
-- 1. Fix RLS Policy on profiles table (allow users to insert their own profile)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create policy to allow users to read all profiles (for display)
CREATE POLICY "Users can read all profiles" ON profiles FOR SELECT
  USING (true);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 2. Alternative: Use a Trigger to Auto-Create Profiles
-- First, drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, role, created_at)
  VALUES (
    NEW.id,
    'user-' || SUBSTRING(NEW.id::text, 1, 8),
    SPLIT_PART(NEW.email, '@', 1),
    'writer',
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

## Steps to Apply

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the SQL above
3. Run the query
4. Test registration again

## If Using Trigger Instead of RLS

If you use the trigger approach, you can simplify the register action to NOT insert the profile manually.

Update `lib/actions/auth-secure.ts`:

```typescript
// Remove this section if using trigger:
/*
const { error: profileError } = await supabase.from('profiles').insert({
  id: data.user.id,
  username,
  display_name: displayName || username,
  role: 'writer'
})

if (profileError) {
  return { error: 'Lỗi tạo hồ sơ. Vui lòng liên hệ hỗ trợ.' }
}
*/

// Just return success after signup
return {
  success: "Đăng ký thành công! Vui lòng đăng nhập.",
};
```

## Recommended Approach

**Use the trigger** — it's cleaner and handles edge cases better. The trigger will auto-create the profile whenever a new user is created in the auth system.
