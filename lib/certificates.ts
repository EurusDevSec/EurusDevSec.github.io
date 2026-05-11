/**
 * Certificate Data Storage and Utilities
 * 
 * This file contains the certificate data and utility functions for managing
 * and accessing professional certifications displayed on the website.
 * 
 * ## How to Add New Certificates
 * 
 * 1. **Add Certificate Image**:
 *    - Place your certificate image in `/public/certificates/`
 *    - Supported formats: PNG, JPG, WEBP, SVG
 *    - Recommended size: 1200x800px (3:2 aspect ratio)
 *    - Use kebab-case naming: `issuer-cert-name.png`
 *    - Example: `aws-solutions-architect.png`, `cka-kubernetes.jpg`
 * 
 * 2. **Add Certificate Entry**:
 *    - Add a new object to the `CERTIFICATES` array below
 *    - Required fields: id, name, issuer, issueDate, imageUrl
 *    - Optional fields: expiryDate, credentialId, verificationUrl, description, skills
 * 
 * 3. **Field Guidelines**:
 *    - `id`: Unique identifier (kebab-case, e.g., "aws-ccp")
 *    - `name`: Full certificate name (e.g., "AWS Certified Cloud Practitioner")
 *    - `issuer`: Organization that issued the certificate (e.g., "Amazon Web Services")
 *    - `issueDate`: Date in ISO 8601 format "YYYY-MM-DD" (e.g., "2024-01-15")
 *    - `imageUrl`: Path relative to /public (e.g., "/certificates/aws-ccp.png")
 *    - `verificationUrl`: URL to verify the certificate (opens in new tab)
 *    - `credentialId`: Certificate credential/badge ID for manual verification
 *    - `description`: Brief description of what the certificate covers
 *    - `skills`: Array of related technologies/skills (e.g., ["AWS", "Cloud Computing"])
 * 
 * 4. **Example Entry**:
 * ```typescript
 * {
 *   id: 'aws-ccp',
 *   name: 'AWS Certified Cloud Practitioner',
 *   issuer: 'Amazon Web Services',
 *   issueDate: '2024-01-15',
 *   credentialId: 'ABC123XYZ',
 *   verificationUrl: 'https://aws.amazon.com/verification/ABC123XYZ',
 *   imageUrl: '/certificates/aws-ccp.png',
 *   description: 'Foundational AWS cloud knowledge and services',
 *   skills: ['AWS', 'Cloud Computing', 'Cloud Architecture']
 * }
 * ```
 * 
 * @module lib/certificates
 */

import { Certificate } from './types'

/**
 * Array of all professional certificates
 * 
 * Certificates are displayed on the /certifications page sorted by issue date (newest first).
 * Add new certificates to this array following the guidelines above.
 */
export const CERTIFICATES: Certificate[] = [
  {
    id: 'sample-cert-1',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2026-04-04',
    credentialId: '34d18a21-0da0-4d29-8a7b-b96252d5e5d7',
    verificationUrl: 'https://www.credly.com/badges/34d18a21-0da0-4d29-8a7b-b96252d5e5d7',
    imageUrl: '/certificates/aws-cloud-practioner.png',
    description: 'Earners of this certification have a fundamental understanding of IT services and their uses in the AWS Cloud. They demonstrated cloud fluency and foundational AWS knowledge. Badge owners are able to identify essential AWS services necessary to set up AWS-focused projects.',
    skills:  ['AWS', 'Cloud', 'Cloud Computing', 'Cloud Services']
  },
  {
    id: 'sample-cert-2',
    name: 'DevOps Engineering Specialist',
    issuer: 'DevOps Academy',
    issueDate: '2024-01-20',
    credentialId: 'DOA-DES-2024-042',
    verificationUrl: 'https://example.com/verify/DOA-DES-2024-042',
    imageUrl: '/certificates/sample-cert-2.svg',
    description: 'Comprehensive DevOps practices including CI/CD pipelines, infrastructure as code, containerization, and monitoring.',
    skills: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins']
  },
  {
    id: 'sample-cert-3',
    name: 'Cybersecurity Fundamentals',
    issuer: 'Security Institute',
    issueDate: '2023-11-10',
    imageUrl: '/certificates/sample-cert-3.svg',
    description: 'Core cybersecurity principles covering threat detection, vulnerability assessment, and security best practices.',
    skills: ['Security', 'Threat Detection', 'Vulnerability Assessment', 'Network Security']
  }
]

/**
 * Get all certificates sorted by issue date (newest first)
 * 
 * @returns {Certificate[]} Array of certificates sorted by issue date in descending order
 * 
 * @example
 * ```typescript
 * const certificates = getCertificates()
 * // Returns all certificates with newest first
 * ```
 */
export function getCertificates(): Certificate[] {
  return [...CERTIFICATES].sort((a, b) => 
    new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
  )
}

/**
 * Get a specific certificate by its ID
 * 
 * @param {string} id - The unique identifier of the certificate
 * @returns {Certificate | undefined} The certificate object if found, undefined otherwise
 * 
 * @example
 * ```typescript
 * const cert = getCertificateById('aws-ccp')
 * if (cert) {
 *   console.log(cert.name) // "AWS Certified Cloud Practitioner"
 * }
 * ```
 */
export function getCertificateById(id: string): Certificate | undefined {
  return CERTIFICATES.find(cert => cert.id === id)
}
