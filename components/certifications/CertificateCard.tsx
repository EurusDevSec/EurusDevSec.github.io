'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Certificate } from '@/lib/types'
import { formatDate, cn } from '@/lib/utils'

interface CertificateCardProps {
  certificate: Certificate
  priority?: boolean
  index?: number // For staggered entrance animation
}

/**
 * CertificateCard Component
 * 
 * Displays an individual certificate with image, metadata, verification link, and skill tags.
 * Features hover effects, image optimization, entrance animations, and full accessibility support.
 * 
 * @param certificate - Certificate data object
 * @param priority - Whether to prioritize image loading (for above-fold certificates)
 * @param index - Card index for staggered entrance animation (0-5)
 */
export default function CertificateCard({ certificate, priority = false, index = 0 }: CertificateCardProps) {
  const [imageError, setImageError] = useState(false)

  // Calculate staggered animation delay (max 6 cards, 100ms intervals)
  const animationDelay = index < 6 ? `animate-delay-${Math.min(index, 6) * 100}` : ''

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-surface/60',
        // Entrance animation with staggered delay
        'animate-fade-in-up',
        animationDelay,
        // Hover effects - GPU accelerated with transform and opacity
        'transition-all duration-300 ease-out',
        'hover:border-emerald-500/30 hover:shadow-[0_0_30px_hsl(160_84%_39%/0.06)] hover:-translate-y-1 hover:scale-[1.02]',
        // Smooth shadow transition
        'shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(13,162,113,0.12)]'
      )}
      aria-labelledby={`cert-${certificate.id}-title`}
    >
      {/* Gradient glow on hover */}
      <div className="absolute inset-0 bg-card-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Certificate Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-elevated">
        {!imageError ? (
          <Image
            src={certificate.imageUrl}
            alt={`${certificate.name} certificate issued by ${certificate.issuer}`}
            fill
            className={cn(
              'object-cover',
              // GPU-accelerated transform for smooth scaling
              'transition-transform duration-500 ease-out will-change-transform',
              'group-hover:scale-110'
            )}
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-surface-elevated">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-text-muted/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-text-muted">Image unavailable</p>
            </div>
          </div>
        )}
      </div>

      {/* Certificate Content */}
      <div className="relative flex flex-col gap-3 p-6">
        {/* Certificate Name */}
        <h3
          id={`cert-${certificate.id}-title`}
          className={cn(
            'text-lg font-bold leading-snug text-text-primary',
            // Smooth color transition on hover - GPU accelerated
            'transition-colors duration-300 ease-out',
            'group-hover:text-accent'
          )}
        >
          {certificate.name}
        </h3>

        {/* Issuer */}
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <svg
            className="h-4 w-4 text-accent/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span>{certificate.issuer}</span>
        </div>

        {/* Issue Date */}
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <svg
            className="h-4 w-4 text-accent/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <time dateTime={certificate.issueDate}>
            Issued: {formatDate(certificate.issueDate)}
          </time>
        </div>

        {/* Credential ID */}
        {certificate.credentialId && (
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <svg
              className="h-4 w-4 text-accent/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
            <span className="font-mono">ID: {certificate.credentialId}</span>
          </div>
        )}

        {/* Description */}
        {certificate.description && (
          <p className="text-sm leading-relaxed text-text-secondary">
            {certificate.description}
          </p>
        )}

        {/* Verification Button */}
        {certificate.verificationUrl && (
          <a
            href={certificate.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm font-medium text-accent',
              // GPU-accelerated transitions with transform and opacity
              'transition-all duration-200 ease-out will-change-transform',
              'hover:border-accent/50 hover:bg-accent/20 hover:shadow-[0_0_20px_hsl(160_84%_39%/0.15)] hover:scale-105',
              'active:scale-95',
              'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background'
            )}
            aria-label={`Verify ${certificate.name} certificate (opens in new tab)`}
          >
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Verify Certificate</span>
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}

        {/* Skill Tags */}
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5 border-t border-border/40 pt-4">
            {certificate.skills.map((skill) => (
              <span
                key={skill}
                className={cn(
                  'rounded-md border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent/90',
                  // GPU-accelerated hover effects with transform and opacity
                  'transition-all duration-200 ease-out will-change-transform',
                  'hover:border-accent/40 hover:bg-accent/20 hover:scale-110 hover:-translate-y-0.5',
                  'hover:shadow-[0_4px_12px_hsl(160_84%_39%/0.15)]'
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom accent line on hover */}
      <div className="h-px w-0 bg-gradient-to-r from-accent to-secondary transition-all duration-500 group-hover:w-full" />
    </article>
  )
}
