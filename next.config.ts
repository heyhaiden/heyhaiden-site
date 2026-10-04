import type { NextConfig } from "next";

// Loudness Check pages are a separate Vercel project built from heyhaiden/chatgpt-apps (site/),
// so their copy stays in one place. Proxied here so they live under heyhaiden.com.
const LOUDNESS_CHECK_SITE = "https://loudness-check-site.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/loudness-check", destination: `${LOUDNESS_CHECK_SITE}/loudness-check` },
      { source: "/loudness-check/:path*", destination: `${LOUDNESS_CHECK_SITE}/loudness-check/:path*` },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/heyhaiden/**",
      },
    ],
  },
};

export default nextConfig;
