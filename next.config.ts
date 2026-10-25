import type { NextConfig } from "next";
import { normalizeBasePath } from "./src/lib/deployment";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
  images: { unoptimized: true },
  poweredByHeader: false,
  devIndicators: false,
  reactStrictMode: true,
};

export default nextConfig;
