# Quick Reference - Adding Certificates

## TL;DR

1. **Optimize image**: 1200x800px, < 300KB, PNG/JPG/WEBP
2. **Name file**: `issuer-cert-name.png` (kebab-case)
3. **Save to**: `public/certificates/`
4. **Update data**: Add entry to `lib/certificates.ts`
5. **Test**: Run `npm run dev` and check `/certifications`

## Image Specs at a Glance

```
Format:       PNG, JPG, or WEBP
Size:         1200x800px (3:2 ratio)
File Size:    < 300KB
Resolution:   96 DPI
Background:   White or transparent
```

## File Naming Examples

```
✅ aws-cloud-practitioner.png
✅ cka-kubernetes.jpg
✅ terraform-associate.webp
✅ comptia-security-plus.png

❌ cert1.png
❌ My Certificate.jpg
❌ certificate_final.png
```

## Code Template

Add to `lib/certificates.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Full Certificate Name',
  issuer: 'Issuing Organization',
  issueDate: '2024-01-15',
  imageUrl: '/certificates/your-file-name.png',
  verificationUrl: 'https://verify.example.com/...',
  description: 'Brief description',
  skills: ['Skill 1', 'Skill 2']
}
```

## Optimization Tools

- **Online**: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
- **CLI**: ImageMagick, pngquant, jpegoptim
- **Node**: sharp

## Common Issues

| Problem | Solution |
|---------|----------|
| Image not showing | Check file path matches `imageUrl` |
| Too large | Compress to < 300KB |
| Blurry | Use higher resolution source |
| Slow loading | Optimize file size |

## Need More Details?

See `README.md` in this directory for comprehensive documentation.
