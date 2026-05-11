# Certificate Images Directory

This directory contains certificate images displayed on the `/certifications` page.

## Image Requirements

### Supported Formats
- **PNG** (Recommended for certificates with transparency)
- **JPG/JPEG** (Good for photographs and scanned certificates)
- **WEBP** (Best compression, modern browsers)

### Image Specifications

| Property | Requirement | Recommendation |
|----------|-------------|----------------|
| **Aspect Ratio** | 3:2 or 4:3 | 3:2 (1200x800px) |
| **Minimum Size** | 800x600px | 1200x800px |
| **Maximum Size** | 2400x1600px | 1200x800px |
| **File Size** | < 500KB | < 300KB |
| **Resolution** | 72-150 DPI | 96 DPI |
| **Background** | Any | White or transparent |

### Optimization Tips

1. **Compress images** before adding them to reduce file size
   - Use tools like [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/), or ImageOptim
   - Target: 200-300KB per image

2. **Use appropriate format**:
   - PNG: For certificates with text and transparency
   - JPG: For scanned certificates or photos
   - WEBP: For best compression (Next.js will auto-convert)

3. **Crop properly**: Remove unnecessary borders and whitespace

4. **Ensure readability**: Certificate text should be clearly readable when displayed

## Naming Convention

Use **kebab-case** with descriptive names that include:
- Issuer abbreviation (optional)
- Certificate name
- Avoid special characters and spaces

### Examples

✅ **Good Names**:
- `aws-cloud-practitioner.png`
- `terraform-associate.jpg`
- `cka-kubernetes-administrator.png`
- `comptia-security-plus.webp`
- `google-cloud-associate.png`

❌ **Bad Names**:
- `cert1.png` (not descriptive)
- `AWS Certificate.jpg` (contains space)
- `my_certificate_2024.png` (uses underscore, not specific)
- `certificate-image-final-v2.png` (too generic)

## Adding a New Certificate

### Step 1: Prepare the Image

1. Obtain the certificate image (screenshot, download, or scan)
2. Crop to remove unnecessary borders
3. Resize to recommended dimensions (1200x800px)
4. Optimize/compress the image
5. Save with a descriptive kebab-case name

### Step 2: Add Image to Directory

Place the optimized image file in this directory:
```
public/certificates/your-certificate-name.png
```

### Step 3: Update Certificate Data

Add a new entry to the `CERTIFICATES` array in `lib/certificates.ts`:

```typescript
{
  id: 'unique-cert-id',
  name: 'Certificate Full Name',
  issuer: 'Issuing Organization',
  issueDate: '2024-01-15', // ISO 8601 format: YYYY-MM-DD
  expiryDate: '2027-01-15', // Optional
  credentialId: 'ABC123XYZ', // Optional
  verificationUrl: 'https://verify.example.com/ABC123XYZ', // Optional
  imageUrl: '/certificates/your-certificate-name.png',
  description: 'Brief description of the certification', // Optional
  skills: ['Skill 1', 'Skill 2', 'Skill 3'] // Optional
}
```

### Step 4: Verify Display

1. Run the development server: `npm run dev`
2. Navigate to `http://localhost:3000/certifications`
3. Verify the certificate displays correctly
4. Check responsive behavior on different screen sizes
5. Test the verification link (if provided)

## Sample Certificates

This directory includes sample certificate images for testing:

- `sample-cert-1.png` - AWS Cloud Practitioner (sample)
- `sample-cert-2.png` - Kubernetes Administrator (sample)
- `sample-cert-3.png` - Terraform Associate (sample)

**Note**: These are placeholder images for development and testing. Replace them with actual certificate images before deployment.

## Image Optimization Tools

### Online Tools
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [Squoosh](https://squoosh.app/) - Advanced image optimization
- [Compressor.io](https://compressor.io/) - Online image compressor

### Command Line Tools
- **ImageMagick**: Resize and convert images
  ```bash
  magick convert input.png -resize 1200x800 -quality 85 output.png
  ```
- **pngquant**: PNG compression
  ```bash
  pngquant --quality=65-80 input.png --output output.png
  ```
- **jpegoptim**: JPG optimization
  ```bash
  jpegoptim --size=300k input.jpg
  ```

### Node.js Tools
- **sharp**: Image processing library
  ```javascript
  const sharp = require('sharp');
  sharp('input.png')
    .resize(1200, 800)
    .png({ quality: 85 })
    .toFile('output.png');
  ```

## Next.js Image Optimization

The website uses Next.js `<Image>` component which automatically:
- Optimizes images on-demand
- Serves images in modern formats (WebP, AVIF)
- Lazy loads images below the fold
- Generates responsive image sizes
- Provides blur placeholders

You don't need to create multiple sizes manually - Next.js handles this automatically!

## Troubleshooting

### Image Not Displaying

1. **Check file path**: Ensure `imageUrl` in `certificates.ts` matches the actual file name
2. **Verify file location**: Image must be in `public/certificates/` directory
3. **Check file extension**: Ensure the extension matches (`.png` vs `.jpg`)
4. **Clear cache**: Restart dev server or clear browser cache
5. **Check console**: Look for 404 errors in browser developer console

### Image Quality Issues

1. **Too blurry**: Use higher resolution source image
2. **File too large**: Compress image more aggressively
3. **Colors look off**: Check color profile (use sRGB)
4. **Text unreadable**: Increase image resolution or crop tighter

### Performance Issues

1. **Slow loading**: Reduce file size (target < 300KB)
2. **Layout shift**: Specify width/height in Image component
3. **Too many images**: Consider pagination or lazy loading

## Best Practices

1. ✅ **Always optimize images** before adding them
2. ✅ **Use descriptive file names** for easy identification
3. ✅ **Keep file sizes small** (< 300KB) for fast loading
4. ✅ **Maintain consistent aspect ratio** (3:2 recommended)
5. ✅ **Test on multiple devices** to ensure readability
6. ✅ **Include verification URLs** when available
7. ✅ **Update certificates regularly** as you earn new ones
8. ✅ **Remove expired certificates** or mark them as expired

## Security Considerations

- **Don't include sensitive information** in certificate images (SSN, private addresses, etc.)
- **Verify URLs are legitimate** before adding verification links
- **Use HTTPS URLs** for all verification links
- **Consider privacy**: Some certificates may include personal information

## Questions?

If you encounter issues or have questions about adding certificates, refer to:
- Next.js Image documentation: https://nextjs.org/docs/app/api-reference/components/image
- Project documentation in `.kiro/specs/certifications-and-ui-enhancements/`
- Design document: `design.md`
- Requirements document: `requirements.md`

---

**Last Updated**: 2024
**Maintained By**: EurusDevSec
