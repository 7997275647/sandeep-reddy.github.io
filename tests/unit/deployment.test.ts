import { describe, expect, it } from "vitest";
import { normalizeBasePath, siteOrigin } from "../../src/lib/deployment";

describe("static deployment paths", () => {
  it("supports a root deployment", () => {
    expect(normalizeBasePath()).toBe("");
    expect(normalizeBasePath("/")).toBe("");
  });

  it("normalizes GitHub Pages repository paths", () => {
    expect(normalizeBasePath("/sandeep-reddy.github.io/")).toBe("/sandeep-reddy.github.io");
  });

  it.each(["https://example.com", "portfolio", "/../outside", "/path?query", "/a//b"])("rejects invalid base paths: %s", (value) => {
    expect(() => normalizeBasePath(value)).toThrow();
  });

  it("accepts HTTPS origins and local development origins", () => {
    expect(siteOrigin("https://sandeep.example")).toBe("https://sandeep.example");
    expect(siteOrigin("http://localhost:3000")).toBe("http://localhost:3000");
  });

  it.each(["https://example.com/portfolio", "javascript:alert(1)", "https://user:pass@example.com", "https://example.com?q=1"])("rejects invalid origins: %s", (value) => {
    expect(() => siteOrigin(value)).toThrow();
  });
});
