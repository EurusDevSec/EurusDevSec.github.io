# Certifications Components

This directory contains React components for displaying professional certifications on the portfolio website.

## Components

### CertificateGrid

A responsive grid layout component for displaying multiple certificate cards.

**Features:**
- Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
- Consistent gap spacing (gap-6)
- Empty state handling with informative message
- Automatic priority loading for first 3 certificates
- Accessibility support with ARIA roles

**Props:**
```typescript
interface CertificateGridProps {
  certificates: Certificate[]  // Array of certificate objects to display
}
```

**Usage:**
```tsx
import { CertificateGrid } from '@/components/certifications'
import { getCertificates } from '@/lib/certificates'

export default function CertificationsPage() {
  const certificates = getCertificates()
  
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Certifications</h1>
      <CertificateGrid certificates={certificates} />
    </main>
  )
}
```

**Empty State:**
When no certificates are provided, the component displays a friendly empty state message with an icon.

**Accessibility:**
- Uses `role="list"` and `role="listitem"` for semantic structure
- Descriptive `aria-label` for the grid
- Keyboard accessible

### CertificateCard

A card component that displays an individual certificate with all its metadata, verification link, and skill tags.

**Features:**
- Responsive image display with Next.js Image optimization
- Hover effects with lift animation and enhanced shadow
- Conditional verification button (only shown when URL is available)
- Skill tags display with hover effects
- Image loading error handling with fallback UI
- Full accessibility support (semantic HTML, ARIA labels, keyboard navigation)
- Optimized for performance (lazy loading, priority loading option)

**Props:**
```typescript
interface CertificateCardProps {
  certificate: Certificate  // Certificate data object
  priority?: boolean        // Whether to prioritize image loading (default: false)
}
```

**Usage:**
```tsx
import { CertificateCard } from '@/components/certifications'
import { getCertificates } from '@/lib/certificates'

// Using CertificateCard directly
export default function SingleCertPage() {
  const cert = getCertificates()[0]
  
  return (
    <div className="max-w-md mx-auto">
      <CertificateCard certificate={cert} priority={true} />
    </div>
  )
}

// Or use CertificateGrid for multiple certificates (recommended)
import { CertificateGrid } from '@/components/certifications'

export default function CertificationsPage() {
  const certificates = getCertificates()
  
  return (
    <main className="container mx-auto px-4 py-12">
      <CertificateGrid certificates={certificates} />
    </main>
  )
}
```

**Accessibility:**
- Uses semantic HTML (`<article>`, `<time>`)
- Descriptive alt text for images
- ARIA labels for interactive elements
- Keyboard accessible with visible focus indicators
- Proper heading hierarchy

**Performance:**
- Next.js Image component for automatic optimization
- Lazy loading for below-fold images
- Priority loading option for above-fold images
- GPU-accelerated animations (transform, opacity)
- Responsive image sizes

## Testing

Unit tests are available in `CertificateCard.test.tsx` covering:
- Rendering of all certificate metadata
- Conditional rendering of verification button
- Skill tags display
- Image error handling
- Accessibility attributes

Run tests with:
```bash
npm test
```

## Styling

The component uses Tailwind CSS and follows the project's design system:
- Emerald/teal accent color theme
- Consistent spacing and typography
- Dark mode support
- Hover effects with smooth transitions

## Related Files

- `lib/types.ts` - Certificate interface definition
- `lib/certificates.ts` - Certificate data and utility functions
- `public/certificates/` - Certificate image storage
