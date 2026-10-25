export function normalizeBasePath(value = ""): string {
  const path = value.trim().replace(/\/+$/, "");
  if (!path || path === "/") return "";
  if (!/^\/[a-zA-Z0-9/_-]+$/.test(path) || path.includes("//")) {
    throw new Error("NEXT_PUBLIC_BASE_PATH must be an absolute URL path, such as /Personal-Portfolio.");
  }
  return path;
}

export function siteOrigin(value = "https://7997275647.github.io"): string {
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol) || url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without a path, credentials, query or fragment.");
  }
  return url.origin;
}

export const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
export const siteUrl = `${siteOrigin(process.env.NEXT_PUBLIC_SITE_URL)}${basePath}`;
export const assetPath = (path: string) => `${basePath}/${path.replace(/^\/+/, "")}`;
