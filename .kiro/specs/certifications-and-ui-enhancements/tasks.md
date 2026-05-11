# Implementation Plan: Certifications và UI Enhancements

## Overview

This implementation plan breaks down the feature into actionable coding tasks following the 8-phase approach from the design document. The implementation will add a new Certifications page, enhance the homepage and About page UI, and maintain consistency with the existing Next.js 15 + TypeScript + Tailwind CSS architecture.

## Tasks

- [x] 1. Set up certificate infrastructure and data models
  - [x] 1.1 Create certificate TypeScript types and interfaces
    - Add `Certificate` interface to `lib/types.ts` with all required fields (id, name, issuer, issueDate, imageUrl, etc.)
    - Include optional fields (expiryDate, credentialId, verificationUrl, description, skills)
    - _Requirements: 3.2, 2.1, 2.2, 2.3, 2.4_
  - [x] 1.2 Create certificate data storage and utility functions
    - Create `lib/certificates.ts` with `CERTIFICATES` array containing sample certificate data
    - Implement `getCertificates()` function to return sorted certificates (newest first)
    - Implement `getCertificateById(id: string)` utility function
    - Add JSDoc comments explaining how to add new certificates
    - _Requirements: 3.2, 3.3_
  - [x] 1.3 Set up certificate image storage structure
    - Create `public/certificates/` directory
    - Add `public/certificates/README.md` with instructions for adding new certificates
    - Document image requirements (formats, sizes, naming conventions)
    - Add 2-3 sample certificate images for testing
    - _Requirements: 3.1, 3.4_

- [x] 2. Build certificate display components
  - [x] 2.1 Implement CertificateCard component
    - Create `components/certifications/CertificateCard.tsx` with TypeScript props interface
    - Display certificate image using Next.js Image component with optimization
    - Show certificate metadata (name, issuer, date, credential ID)
    - Implement verification button/link (conditional rendering based on verificationUrl)
    - Add skill tags display at bottom of card
    - Implement card layout with border, shadow, and hover effects (lift + enhanced shadow)
    - Handle image loading errors with fallback UI
    - Ensure accessibility (semantic HTML, alt text, ARIA labels)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 3.5, 10.2, 10.3_
  - [x] 2.2 Implement CertificateGrid component
    - Create `components/certifications/CertificateGrid.tsx` with TypeScript props interface
    - Implement responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
    - Use consistent gap spacing (gap-6)
    - Handle empty state when no certificates available
    - Map through certificates and render CertificateCard components
    - _Requirements: 2.1, 2.2_
  - [x] 2.3 Add CSS animations and effects for certificates
    - Add hover transition effects to CertificateCard (transform, shadow)
    - Implement smooth scale animation on hover
    - Add entrance animations for cards (fade-in, slide-up)
    - Ensure animations use GPU-accelerated properties (transform, opacity)
    - Test animation performance on mobile devices
    - _Requirements: 2.8, 9.3, 9.4_

- [x] 3. Create Certifications page
  - [x] 3.1 Implement certifications page route and layout
    - Create `app/certifications/page.tsx` with Next.js App Router conventions
    - Import and use Navbar and Footer components
    - Implement hero section with page title, subtitle, and certificate count badge
    - Integrate CertificateGrid component with certificate data
    - Ensure responsive layout on all device sizes
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  - [x] 3.2 Add SEO metadata and structured data
    - Add page metadata (title, description, keywords) using Next.js metadata API
    - Implement OpenGraph and Twitter card metadata
    - Add JSON-LD structured data for certificates (EducationalOccupationalCredential schema)
    - Ensure proper semantic HTML structure (main, section, article tags)
    - _Requirements: 10.1, 10.3, 10.6_
  - [x] 3.3 Update sitemap to include certifications route
    - Modify `app/sitemap.ts` to include `/certifications` route
    - Set appropriate priority (0.8) and changeFrequency (monthly)
    - Verify sitemap generates correctly in build
    - _Requirements: 10.7_

- [x] 4. Update navigation with Certifications link
  - [x] 4.1 Add Certifications link to Navbar component
    - Update `components/layout/Navbar.tsx` to include Certifications link
    - Add link to NAV_LINKS array with correct href and label
    - Implement active state highlighting for /certifications route
    - Ensure responsive behavior in mobile hamburger menu
    - Verify logical navigation order (Home, About, Blog, Certifications, Community)
    - Test keyboard navigation and focus states
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 10.5_

- [~] 5. Checkpoint - Verify certifications feature
  - Ensure all tests pass, ask the user if questions arise.
  - Manually test certifications page on multiple devices
  - Verify certificate images load correctly with optimization
  - Test verification links open in new tab
  - Check responsive layout and animations

- [x] 6. Enhance homepage UI
  - [x] 6.1 Improve hero section with enhanced gradients and animations
    - Update `app/page.tsx` hero section with enhanced gradient text effects
    - Add animated badge with pulse effect
    - Implement improved background grid with radial gradient mask
    - Enhance spacing and typography hierarchy
    - Add smooth scroll behavior
    - Ensure color contrast meets WCAG AA standards (4.5:1)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_
  - [x] 6.2 Add custom CSS utilities for effects
    - Update `app/globals.css` with new utility classes
    - Add `.hero-glow` class with radial gradient effect
    - Add `.card-glow` class for interactive card effects
    - Implement `@keyframes float` animation
    - Add `.animate-float` utility class
    - Ensure CSS is optimized and tree-shaken in production
    - _Requirements: 4.4, 9.3, 9.4_
  - [x] 6.3 Enhance blog posts grid layout and cards
    - Update blog post card component with enhanced shadow and border effects
    - Implement smooth hover transitions (scale, shadow, lift)
    - Add thumbnail image handling with Next.js Image optimization
    - Ensure consistent card heights using flexbox
    - Implement responsive grid (1 column mobile, 2 tablet, 3 desktop)
    - Display metadata (date, reading time, category) with clear typography
    - Add hover effects for interactive elements
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 4.8_

- [x] 7. Enhance About page UI
  - [x] 7.1 Redesign profile header section
    - Update `app/about/page.tsx` profile header with larger avatar
    - Add animated border gradient effect to avatar
    - Implement entrance animation for profile section
    - Improve spacing and visual hierarchy
    - Ensure responsive layout on mobile devices
    - _Requirements: 6.4, 6.1_
  - [x] 7.2 Improve bio and typography
    - Enhance bio section with larger font sizes and better line height
    - Add gradient effects or background patterns for visual interest
    - Highlight keywords with accent color (emerald/teal theme)
    - Implement clear font weight hierarchy (headings vs body text)
    - Add visual separators between sections
    - _Requirements: 6.2, 6.3, 6.6, 6.7_
  - [x] 7.3 Enhance stats section with visual indicators
    - Redesign stats section with icons or visual indicators
    - Improve color contrast and spacing
    - Add subtle animations or transitions
    - Ensure stats are readable and prominent
    - _Requirements: 6.5_
  - [x] 7.4 Upgrade skills section with categories and animations
    - Group skills by category with visual separators
    - Implement enhanced hover effects (scale, color change)
    - Use consistent grid layout with proper sizing
    - Add smooth transitions for interactive states
    - Ensure accessibility for keyboard navigation
    - _Requirements: 6.8, 10.5_
  - [x] 7.5 Enhance contact section prominence
    - Add distinctive background color or gradient border to contact section
    - Display social links with clear, larger icons
    - Implement hover effects for contact buttons
    - Use larger font size for email and social links
    - Ensure email link opens email client with pre-filled address
    - Improve spacing and visual hierarchy
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [~] 8. Checkpoint - Verify UI enhancements
  - Ensure all tests pass, ask the user if questions arise.
  - Test homepage enhancements on multiple devices
  - Verify About page improvements display correctly
  - Check all animations are smooth and performant
  - Test dark mode compatibility

- [ ] 9. Performance optimization and image handling
  - [x] 9.1 Optimize certificate images with Next.js Image component
    - Ensure all certificate images use Next.js Image component
    - Configure proper width, height, and quality settings
    - Implement lazy loading for below-fold images
    - Add priority loading for first 2-3 certificates
    - Generate blur placeholders for smooth loading
    - Test image loading on 3G connection (target: <2 seconds)
    - _Requirements: 9.1, 9.2, 9.5, 3.5_
  - [~] 9.2 Run Lighthouse performance audit
    - Run Lighthouse audit on all modified pages
    - Ensure Performance score ≥ 90
    - Ensure Accessibility score ≥ 95
    - Ensure Best Practices score ≥ 95
    - Ensure SEO score ≥ 95
    - Fix any issues identified by audit
    - _Requirements: 9.6_

- [ ] 10. Accessibility and final polish
  - [~] 10.1 Verify accessibility compliance
    - Test keyboard navigation on all pages (Tab, Enter, Escape)
    - Verify focus indicators are visible and clear
    - Test with screen reader (NVDA or JAWS)
    - Ensure all images have descriptive alt text
    - Verify semantic HTML structure (header, main, section, article)
    - Check color contrast ratios meet WCAG AA (4.5:1 for text)
    - Ensure touch targets are ≥ 44x44px on mobile
    - _Requirements: 10.2, 10.3, 10.4, 10.5_
  - [~] 10.2 Final cross-browser and device testing
    - Test on Chrome, Firefox, Safari, Edge
    - Test on iOS Safari and Android Chrome
    - Verify responsive design on mobile (375px), tablet (768px), desktop (1440px)
    - Test dark mode on all pages
    - Verify all links work correctly
    - Check that verification links open in new tab with proper rel attributes
    - _Requirements: 1.5, 2.6_

- [~] 11. Final checkpoint - Production readiness
  - Ensure all tests pass, ask the user if questions arise.
  - Verify build completes without errors
  - Check bundle size hasn't increased significantly
  - Confirm all requirements are met
  - Review code for any TODO comments or debugging code

## Notes

- All tasks involve writing, modifying, or testing code components
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation and user feedback
- Implementation uses TypeScript, React 19, Next.js 15, and Tailwind CSS
- Focus on maintaining consistency with existing design system (emerald/teal theme)
- Prioritize accessibility and performance throughout implementation
- Certificate management is file-based (no backend system required)
- All images should be optimized before adding to repository

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.3"] },
    { "id": 1, "tasks": ["1.2", "6.2"] },
    { "id": 2, "tasks": ["2.1", "6.1"] },
    { "id": 3, "tasks": ["2.2", "2.3", "6.3"] },
    { "id": 4, "tasks": ["3.1", "7.1", "7.2"] },
    { "id": 5, "tasks": ["3.2", "3.3", "4.1", "7.3", "7.4", "7.5"] },
    { "id": 6, "tasks": ["9.1"] },
    { "id": 7, "tasks": ["9.2", "10.1", "10.2"] }
  ]
}
```
