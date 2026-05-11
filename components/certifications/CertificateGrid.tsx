import { Certificate } from '@/lib/types'
import CertificateCard from './CertificateCard'

interface CertificateGridProps {
  certificates: Certificate[]
}

/**
 * CertificateGrid Component
 * 
 * Responsive grid layout for displaying multiple certificate cards.
 * Adapts to different screen sizes:
 * - Mobile: 1 column
 * - Tablet: 2 columns
 * - Desktop: 3 columns
 * 
 * @param certificates - Array of certificate objects to display
 */
export default function CertificateGrid({ certificates }: CertificateGridProps) {
  // Handle empty state
  if (!certificates || certificates.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-border/60 bg-surface/40 p-12">
        <div className="text-center">
          <svg
            className="mx-auto h-16 w-16 text-text-muted/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-text-primary">
            No certifications available yet
          </h3>
          <p className="mt-2 text-sm text-text-muted">
            Check back later for professional certifications and credentials.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Professional certifications"
    >
      {certificates.map((certificate, index) => (
        <div key={certificate.id} role="listitem">
          <CertificateCard
            certificate={certificate}
            priority={index < 3} // Prioritize loading first 3 certificates
          />
        </div>
      ))}
    </div>
  )
}
