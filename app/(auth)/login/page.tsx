import type { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập vào EurusDevSec để tham gia cộng đồng.',
}

export default function LoginPage() {
  return <LoginForm />
}
