import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-3xl font-bold text-accent">
            E
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary">
            EurusDevSec
          </h1>
          <p className="mt-2 text-text-secondary">
            IT Student → DevSecOps Engineer (in progress 🚀)
          </p>
        </div>

        <div className="prose-blog">
          <h2>Mình là ai?</h2>
          <p>
            Mình là sinh viên IT năm cuối, đang theo đuổi lộ trình{' '}
            <strong>DevSecOps</strong>. Blog này là nơi mình ghi lại hành trình
            học tập, từ những project DevOps, chứng chỉ Cloud, cho đến những
            suy nghĩ về văn học và cuộc sống.
          </p>

          <h2>Định hướng</h2>
          <ul>
            <li>🛡️ DevSecOps & Security Engineering</li>
            <li>☁️ Cloud Architecture (AWS, GCP)</li>
            <li>🔧 Infrastructure as Code, CI/CD</li>
            <li>🐳 Container & Kubernetes</li>
          </ul>

          <h2>Liên hệ</h2>
          <ul>
            <li>
              <a href="https://github.com/eurusdevsec" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/eurusdevsec" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
