/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lovely-flamingo-139.convex.cloud'
      },
      {
        protocol: 'https',
        hostname: 'wary-gopher-177.convex.cloud'
      },
      {
        protocol: 'https',
        hostname: 'sleek-capybara-771.convex.cloud'
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      },
      {
        protocol:'https',
        hostname: 'cautious-sparrow-147.convex.cloud'
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com'
      }
    ]
  }
};

export default nextConfig;
