/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "backend.daylightng.com",
      },
      {
        protocol: "https",
        hostname: "daylightng.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "backend.globalexcellenceonline.com",
      },
      {
        protocol: "https",
        hostname: "globalexcellenceonline.com",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    return [
      // 1. Legacy WordPress Date-Based Permalinks
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:slug",
        destination: "/:slug",
        permanent: true,
      },
      // 2. AMP fallback
      {
        source: "/amp/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.youtube.com *.facebook.net *.google-analytics.com *.googletagmanager.com; style-src 'self' 'unsafe-inline' *.googleapis.com; img-src 'self' data: *; font-src 'self' *.gstatic.com data:; connect-src 'self' *.globalexcellenceonline.com *.google-analytics.com; frame-src 'self' *.youtube.com *.facebook.com player.vimeo.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
