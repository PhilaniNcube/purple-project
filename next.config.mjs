import { withPayload } from '@payloadcms/next/withPayload'

/**
 * Remote image hosts allowed through next/image.
 *
 * Once media is stored in Cloudflare R2, Payload returns absolute URLs on the
 * bucket's public host, so next/image needs to trust that host. The patterns
 * are derived from R2_PUBLIC_URL at config load; the r2.dev entry is a
 * fallback for buckets served from their public development subdomain.
 */
const remotePatterns = [
  // Cloudflare R2 public development domains, e.g. https://pub-abc123.r2.dev
  // or https://my-bucket.<accountId>.r2.dev. Remove if you only serve media
  // from a custom domain.
  { protocol: 'https', hostname: '**.r2.dev' },
]

if (process.env.R2_PUBLIC_URL) {
  try {
    const { hostname, pathname, port, protocol } = new URL(process.env.R2_PUBLIC_URL)
    remotePatterns.push({
      protocol: protocol.replace(':', ''),
      hostname,
      port: port || '',
      pathname: pathname === '/' ? '/**' : `${pathname.replace(/\/$/, '')}/**`,
    })
  } catch {
    console.warn(
      `[next.config] R2_PUBLIC_URL is not a valid URL and was ignored: ${process.env.R2_PUBLIC_URL}`,
    )
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns,
  },
}

export default withPayload(nextConfig)
