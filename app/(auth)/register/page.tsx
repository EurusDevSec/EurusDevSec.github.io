import type { Metadata } from 'next'
import RegisterForm from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Đăng ký',
  description: 'Tạo tài khoản EurusDevSec để tham gia cộng đồng và viết bài.',
}

export default function RegisterPage() {
  return <RegisterForm />
}
