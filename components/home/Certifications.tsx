'use client'

import Image from 'next/image'

const CERTS = [
  {
    id: 'aws-saa',
    name: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    date: '2025',
    image: '/certs/aws-saa.png', // Thay đường dẫn ảnh của bạn ở đây (đặt ảnh vào thư mục public/certs/)
    verifyUrl: 'https://www.credly.com/badges/your-badge-id', // Thay link verify ở đây
    color: 'from-orange-500 to-yellow-500',
  },
  {
    id: 'cka',
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    date: '2025',
    image: '/certs/cka.png', // Thay đường dẫn ảnh của bạn ở đây
    verifyUrl: 'https://www.credly.com/badges/your-badge-id', // Thay link verify ở đây
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'security-plus',
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: '2024',
    image: '/certs/sec-plus.png', // Thay đường dẫn ảnh của bạn ở đây
    verifyUrl: 'https://www.credly.com/badges/your-badge-id', // Thay link verify ở đây
    color: 'from-red-500 to-pink-500',
  }
]

export default function Certifications() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 relative" id="certifications">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="mb-14 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 mb-4 backdrop-blur-sm">
          <svg className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold text-emerald-400 tracking-wide uppercase">Verified Credentials</span>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
          Chứng chỉ & <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Thành tựu</span>
        </h2>
        <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
          Những dấu mốc minh chứng cho năng lực và sự kiên trì trên chặng đường chinh phục DevSecOps và Cloud.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {CERTS.map((cert) => (
          <div
            key={cert.id}
            className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-surface/40 p-2 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_hsl(160_84%_39%/0.3)]"
          >
            {/* Hover Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />
            
            <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem] bg-surface-elevated/50 border border-white/5">
              {/* Fallback image placeholder (shows when real image is not loaded) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted bg-surface-elevated">
                <svg className="h-12 w-12 mb-3 text-emerald-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="text-xs font-mono opacity-60">Thêm ảnh tại: {cert.image}</span>
              </div>
              
              {/* Uncomment this <Image> component when you have added the images to the public/certs folder */}
              {/* 
              <Image 
                src={cert.image} 
                alt={cert.name} 
                fill 
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-110 relative z-10" 
              /> 
              */}
            </div>

            <div className="p-6 relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold leading-snug text-lg text-text-primary group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
                    {cert.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-text-secondary">{cert.issuer}</p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20 shadow-inner">
                  {cert.date}
                </span>
              </div>

              <div className="mt-8">
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-surface-elevated px-4 py-3 text-sm font-semibold text-text-primary transition-all hover:text-white"
                >
                  <div className="absolute inset-0 bg-emerald-500 translate-y-[100%] transition-transform duration-300 group-hover/btn:translate-y-0" />
                  <span className="relative z-10">Verify Certificate</span>
                  <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
