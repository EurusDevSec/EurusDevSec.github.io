import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CertificateGrid from "@/components/certifications/CertificateGrid";
import { getCertificates } from "@/lib/certificates";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eurusdev.me";

export const metadata: Metadata = {
  title: "Certifications — EurusDevSec",
  description:
    "Professional certifications in Cloud Computing, DevOps, and Security. AWS, Kubernetes, Terraform, and more.",
  keywords: [
    "certifications",
    "AWS",
    "cloud",
    "DevOps",
    "security",
    "Kubernetes",
  ],
  openGraph: {
    title: "Certifications — EurusDevSec",
    description: "Professional certifications in Cloud, DevOps, and Security",
    type: "website",
    url: "https://eurusdevsec.github.io/certifications",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certifications — EurusDevSec",
    description: "Professional certifications in Cloud, DevOps, and Security",
  },
};

export default function CertificationsPage() {
  const certificates = getCertificates();
  const certificateJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "EurusDevSec Certifications",
    numberOfItems: certificates.length,
    itemListElement: certificates.map((certificate, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "EducationalOccupationalCredential",
        name: certificate.name,
        description: certificate.description,
        credentialCategory: "Certification",
        recognizedBy: {
          "@type": "Organization",
          name: certificate.issuer,
        },
        image: `${siteUrl}${certificate.imageUrl}`,
        url: certificate.verificationUrl || `${siteUrl}/certifications`,
        identifier: certificate.credentialId,
        dateCreated: certificate.issueDate,
      },
    })),
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(certificateJsonLd),
          }}
        />

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 shadow-[0_0_20px_hsl(160_84%_39%/0.08)]">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              {certificates.length} verified credentials
            </span>

            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
                Professional{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                  Certifications
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
                Verified credentials in Cloud, DevOps, Security, and
                Infrastructure. Open each card to see the certificate image,
                issuer, date, and the verification link in a new tab.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-text-muted">
              <span className="rounded-full border border-border/60 bg-surface/60 px-3 py-1.5">
                Newer first
              </span>
              <span className="rounded-full border border-border/60 bg-surface/60 px-3 py-1.5">
                Optimized images
              </span>
              <span className="rounded-full border border-border/60 bg-surface/60 px-3 py-1.5">
                Verification links
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-surface/90 via-surface/70 to-emerald-500/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">
                  Quick view
                </p>
                <p className="mt-2 text-3xl font-bold text-text-primary">
                  {certificates.length}
                </p>
                <p className="text-sm text-text-secondary">
                  certificates in the portfolio
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-surface/80 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
                  Focus
                </p>
                <p className="mt-2 text-lg font-semibold text-text-primary">
                  Cloud · DevOps · Security
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  Every entry includes an image and verification path.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border/60 bg-background/70 p-4">
              <p className="text-sm font-semibold text-text-primary">
                How to verify
              </p>
              <p className="mt-1 text-sm leading-6 text-text-secondary">
                Click the verification button on any certificate card to open
                the official badge/credential page in a new tab.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="certifications-list">
          <h2 id="certifications-list" className="sr-only">
            Certification list
          </h2>
          <CertificateGrid certificates={certificates} />
        </section>
      </main>
      <Footer />
    </>
  );
}
