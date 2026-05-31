// Client-safe Cloudinary URL helper — no Node.js SDK, works in browser too.
// The cloud name is public (appears in every URL) so it is safe to inline here.

const CLOUD = 'dckyndryf'

/**
 * Returns a Cloudinary URL with automatic format, quality, and an optional
 * max-width cap so browsers never download more pixels than they need.
 */
export function cdnUrl(publicId: string, widthPx?: number): string {
  const transforms = ['f_auto', 'q_auto', ...(widthPx ? [`w_${widthPx},c_limit`] : [])]
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms.join(',')}/${publicId}`
}
