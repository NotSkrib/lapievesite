import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 7 days on the server. On Render free tier this
    // means images only get re-processed after a deploy, not on every cold start.
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
};

export default withNextIntl(nextConfig);
