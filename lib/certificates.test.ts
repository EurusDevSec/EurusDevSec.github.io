/**
 * Unit tests for certificate data storage and utility functions
 * 
 * Run with: npx tsx lib/certificates.test.ts
 */

import { getCertificates, getCertificateById, CERTIFICATES } from './certificates'

// Simple test runner
function test(description: string, fn: () => void) {
  try {
    fn()
    console.log(`✓ ${description}`)
  } catch (error) {
    console.error(`✗ ${description}`)
    console.error(`  ${error}`)
    process.exit(1)
  }
}

function assertEquals<T>(actual: T, expected: T, message?: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      message || `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`
    )
  }
}

function assertTrue(condition: boolean, message?: string) {
  if (!condition) {
    throw new Error(message || 'Expected condition to be true')
  }
}

function assertFalse(condition: boolean, message?: string) {
  if (condition) {
    throw new Error(message || 'Expected condition to be false')
  }
}

// Test Suite
console.log('\n🧪 Running certificate utility tests...\n')

// Test 1: CERTIFICATES array exists and has data
test('CERTIFICATES array should contain sample certificate data', () => {
  assertTrue(Array.isArray(CERTIFICATES), 'CERTIFICATES should be an array')
  assertTrue(CERTIFICATES.length > 0, 'CERTIFICATES should not be empty')
  assertTrue(CERTIFICATES.length === 3, 'CERTIFICATES should have 3 sample certificates')
})

// Test 2: Certificate objects have required fields
test('Certificate objects should have all required fields', () => {
  CERTIFICATES.forEach((cert, index) => {
    assertTrue(!!cert.id, `Certificate ${index} should have an id`)
    assertTrue(!!cert.name, `Certificate ${index} should have a name`)
    assertTrue(!!cert.issuer, `Certificate ${index} should have an issuer`)
    assertTrue(!!cert.issueDate, `Certificate ${index} should have an issueDate`)
    assertTrue(!!cert.imageUrl, `Certificate ${index} should have an imageUrl`)
  })
})

// Test 3: getCertificates returns all certificates
test('getCertificates() should return all certificates', () => {
  const certificates = getCertificates()
  assertEquals(certificates.length, CERTIFICATES.length, 'Should return all certificates')
})

// Test 4: getCertificates sorts by date (newest first)
test('getCertificates() should sort certificates by issue date (newest first)', () => {
  const certificates = getCertificates()
  
  // Verify sorting order
  for (let i = 0; i < certificates.length - 1; i++) {
    const currentDate = new Date(certificates[i].issueDate).getTime()
    const nextDate = new Date(certificates[i + 1].issueDate).getTime()
    assertTrue(
      currentDate >= nextDate,
      `Certificate at index ${i} (${certificates[i].issueDate}) should be newer than or equal to certificate at index ${i + 1} (${certificates[i + 1].issueDate})`
    )
  }
  
  // Verify the expected order for our sample data
  assertEquals(certificates[0].id, 'sample-cert-1', 'First certificate should be sample-cert-1 (2024-03-15)')
  assertEquals(certificates[1].id, 'sample-cert-2', 'Second certificate should be sample-cert-2 (2024-01-20)')
  assertEquals(certificates[2].id, 'sample-cert-3', 'Third certificate should be sample-cert-3 (2023-11-10)')
})

// Test 5: getCertificates doesn't mutate original array
test('getCertificates() should not mutate the original CERTIFICATES array', () => {
  const originalOrder = [...CERTIFICATES]
  getCertificates()
  assertEquals(
    CERTIFICATES.map(c => c.id),
    originalOrder.map(c => c.id),
    'Original array should remain unchanged'
  )
})

// Test 6: getCertificateById finds existing certificate
test('getCertificateById() should find certificate by id', () => {
  const cert = getCertificateById('sample-cert-1')
  assertTrue(cert !== undefined, 'Should find certificate with id "sample-cert-1"')
  assertEquals(cert?.id, 'sample-cert-1', 'Should return correct certificate')
  assertEquals(cert?.name, 'Cloud Architecture Professional', 'Should have correct name')
  assertEquals(cert?.issuer, 'Cloud Certification Institute', 'Should have correct issuer')
})

// Test 7: getCertificateById returns undefined for non-existent id
test('getCertificateById() should return undefined for non-existent id', () => {
  const cert = getCertificateById('non-existent-id')
  assertEquals(cert, undefined, 'Should return undefined for non-existent id')
})

// Test 8: Certificate with verification URL
test('Certificate should have optional verificationUrl field', () => {
  const cert = getCertificateById('sample-cert-1')
  assertTrue(cert !== undefined, 'Certificate should exist')
  assertTrue(!!cert?.verificationUrl, 'sample-cert-1 should have verificationUrl')
  assertTrue(
    cert?.verificationUrl?.startsWith('https://'),
    'verificationUrl should be a valid URL'
  )
})

// Test 9: Certificate without verification URL
test('Certificate can exist without verificationUrl', () => {
  const cert = getCertificateById('sample-cert-3')
  assertTrue(cert !== undefined, 'Certificate should exist')
  assertEquals(cert?.verificationUrl, undefined, 'sample-cert-3 should not have verificationUrl')
})

// Test 10: Certificate with skills array
test('Certificate should have optional skills array', () => {
  const cert = getCertificateById('sample-cert-2')
  assertTrue(cert !== undefined, 'Certificate should exist')
  assertTrue(Array.isArray(cert?.skills), 'skills should be an array')
  assertTrue(cert!.skills!.length > 0, 'skills array should not be empty')
  assertTrue(
    cert!.skills!.includes('DevOps'),
    'sample-cert-2 should include "DevOps" in skills'
  )
})

// Test 11: Date format validation
test('Certificate issueDate should be in ISO 8601 format (YYYY-MM-DD)', () => {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/
  CERTIFICATES.forEach((cert) => {
    assertTrue(
      isoDateRegex.test(cert.issueDate),
      `Certificate ${cert.id} issueDate should match ISO 8601 format (YYYY-MM-DD)`
    )
  })
})

// Test 12: Image URL format validation
test('Certificate imageUrl should start with /certificates/', () => {
  CERTIFICATES.forEach((cert) => {
    assertTrue(
      cert.imageUrl.startsWith('/certificates/'),
      `Certificate ${cert.id} imageUrl should start with /certificates/`
    )
  })
})

console.log('\n✅ All tests passed!\n')
