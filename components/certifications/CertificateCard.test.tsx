import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CertificateCard from './CertificateCard'
import { Certificate } from '@/lib/types'

describe('CertificateCard', () => {
  const mockCertificate: Certificate = {
    id: 'test-cert',
    name: 'Test Certificate',
    issuer: 'Test Issuer',
    issueDate: '2024-01-15',
    imageUrl: '/certificates/test-cert.png',
    credentialId: 'TEST-123',
    verificationUrl: 'https://example.com/verify/TEST-123',
    description: 'Test certificate description',
    skills: ['Skill 1', 'Skill 2', 'Skill 3']
  }

  it('renders certificate name correctly', () => {
    render(<CertificateCard certificate={mockCertificate} />)
    expect(screen.getByText('Test Certificate')).toBeInTheDocument()
  })

  it('renders certificate issuer correctly', () => {
    render(<CertificateCard certificate={mockCertificate} />)
    expect(screen.getByText('Test Issuer')).toBeInTheDocument()
  })

  it('renders credential ID when provided', () => {
    render(<CertificateCard certificate={mockCertificate} />)
    expect(screen.getByText(/ID: TEST-123/)).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<CertificateCard certificate={mockCertificate} />)
    expect(screen.getByText('Test certificate description')).toBeInTheDocument()
  })

  it('renders verification button when URL is provided', () => {
    render(<CertificateCard certificate={mockCertificate} />)
    const verifyButton = screen.getByRole('link', { name: /verify test certificate/i })
    expect(verifyButton).toBeInTheDocument()
    expect(verifyButton).toHaveAttribute('href', 'https://example.com/verify/TEST-123')
    expect(verifyButton).toHaveAttribute('target', '_blank')
    expect(verifyButton).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('does not render verification button when URL is missing', () => {
    const certWithoutUrl = { ...mockCertificate, verificationUrl: undefined }
    render(<CertificateCard certificate={certWithoutUrl} />)
    expect(screen.queryByRole('link', { name: /verify/i })).not.toBeInTheDocument()
  })

  it('renders all skill tags', () => {
    render(<CertificateCard certificate={mockCertificate} />)
    expect(screen.getByText('Skill 1')).toBeInTheDocument()
    expect(screen.getByText('Skill 2')).toBeInTheDocument()
    expect(screen.getByText('Skill 3')).toBeInTheDocument()
  })

  it('does not render skill tags section when skills array is empty', () => {
    const certWithoutSkills = { ...mockCertificate, skills: [] }
    render(<CertificateCard certificate={certWithoutSkills} />)
    expect(screen.queryByText('Skill 1')).not.toBeInTheDocument()
  })

  it('does not render credential ID when not provided', () => {
    const certWithoutCredentialId = { ...mockCertificate, credentialId: undefined }
    render(<CertificateCard certificate={certWithoutCredentialId} />)
    expect(screen.queryByText(/ID:/)).not.toBeInTheDocument()
  })

  it('renders certificate image with correct alt text', () => {
    render(<CertificateCard certificate={mockCertificate} />)
    const image = screen.getByAltText('Test Certificate certificate issued by Test Issuer')
    expect(image).toBeInTheDocument()
  })

  it('has proper ARIA labelledby attribute', () => {
    const { container } = render(<CertificateCard certificate={mockCertificate} />)
    const article = container.querySelector('article')
    expect(article).toHaveAttribute('aria-labelledby', 'cert-test-cert-title')
  })

  it('applies priority loading when priority prop is true', () => {
    render(<CertificateCard certificate={mockCertificate} priority={true} />)
    const image = screen.getByAltText('Test Certificate certificate issued by Test Issuer')
    // Next.js Image component with priority should have loading="eager"
    expect(image).toBeInTheDocument()
  })

  it('applies entrance animation classes', () => {
    const { container } = render(<CertificateCard certificate={mockCertificate} />)
    const article = container.querySelector('article')
    expect(article).toHaveClass('animate-fade-in-up')
  })

  it('applies staggered animation delay based on index', () => {
    const { container } = render(<CertificateCard certificate={mockCertificate} index={2} />)
    const article = container.querySelector('article')
    expect(article).toHaveClass('animate-delay-200')
  })

  it('applies hover transition classes for GPU acceleration', () => {
    const { container } = render(<CertificateCard certificate={mockCertificate} />)
    const article = container.querySelector('article')
    // Check for GPU-accelerated hover classes
    expect(article).toHaveClass('hover:-translate-y-1')
    expect(article).toHaveClass('hover:scale-[1.02]')
  })

  it('applies smooth scale animation to certificate image', () => {
    const { container } = render(<CertificateCard certificate={mockCertificate} />)
    const imageContainer = container.querySelector('img')
    // Check for GPU-accelerated transform classes
    expect(imageContainer?.className).toContain('group-hover:scale-110')
    expect(imageContainer?.className).toContain('will-change-transform')
  })

  it('applies hover effects to skill tags', () => {
    render(<CertificateCard certificate={mockCertificate} />)
    const skillTag = screen.getByText('Skill 1')
    // Check for GPU-accelerated hover classes on skill tags
    expect(skillTag.className).toContain('hover:scale-110')
    expect(skillTag.className).toContain('hover:-translate-y-0.5')
    expect(skillTag.className).toContain('will-change-transform')
  })

  it('applies hover scale effect to verification button', () => {
    render(<CertificateCard certificate={mockCertificate} />)
    const verifyButton = screen.getByRole('link', { name: /verify test certificate/i })
    // Check for GPU-accelerated hover classes
    expect(verifyButton.className).toContain('hover:scale-105')
    expect(verifyButton.className).toContain('will-change-transform')
  })

  it('limits animation delay to maximum of 6 cards', () => {
    const { container } = render(<CertificateCard certificate={mockCertificate} index={10} />)
    const article = container.querySelector('article')
    // Should not have delay class for index > 5
    expect(article?.className).not.toContain('animate-delay-1000')
  })
})
