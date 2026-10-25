import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("./");
});

test("renders verified sections, metadata and loaded assets without page errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await expect(page).toHaveTitle(/Sandeep Reddy Modugu.*Embedded Software Engineer/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hi, I'm Sandeep.");
  for (const id of ["about", "experience", "projects", "skills", "github", "contact"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  const portrait = page.getByAltText("Sandeep Reddy Modugu", { exact: true });
  await expect(portrait).toBeVisible();
  expect(await portrait.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og-image\.png$/);
  const data = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(data.name).toBe("Sandeep Reddy Modugu");
  expect(errors).toEqual([]);
});

test("filters repositories and opens an accessible, truthful case study", async ({ page }) => {
  await page.getByRole("button", { name: "Firmware", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.getByRole("status").filter({ hasText: "1 project in Firmware" })).toBeVisible();
  const trigger = page.getByRole("button", { name: "Read the story: STM32 Bootloader case study" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("It does not authenticate firmware");
  await expect(dialog.getByRole("link", { name: /Explore the source/ })).toHaveAttribute("href", "https://github.com/7997275647/SecureBoot-STM32");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(4);
});

test("expands career details and switches evidence-backed skill areas", async ({ page }) => {
  const thesis = page.getByRole("button", { name: /Hilti.*Master's thesis/ });
  await thesis.click();
  await expect(thesis).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("Built a reproducible Hardware-in-the-Loop framework", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: /Verification & reliability/ }).click();
  await expect(page.locator("#skill-detail")).toContainText("IEC 60730 Annex H");
  await expect(page.locator("#skill-detail")).toContainText("80% fewer MISRA C violations");
});

test("supports email copy success and explicit failure feedback", async ({ page }) => {
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (text: string) => { sessionStorage.setItem("copied-email", text); } } });
  });
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Email copied" })).toBeVisible();
  expect(await page.evaluate(() => sessionStorage.getItem("copied-email"))).toBe("modugusandeepreddy2@gmail.com");
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new Error("Permission denied"); } } });
  });
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Copy unavailable" })).toBeVisible();
});

test("has no horizontal overflow at mobile, tablet and desktop widths", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `overflow at ${width}px`).toBe(true);
  }
});

test("lists additional repositories directly from the GitHub snapshot", async ({ page }) => {
  await page.locator(".repository-explorer summary").click();
  await expect(page.locator(".repository-grid")).toBeVisible();
  await expect(page.locator(".repository-link").first()).toHaveAttribute("href", /^https:\/\/github.com\/7997275647\//);
  expect(await page.locator(".repository-link").count()).toBeGreaterThan(4);
});

test("preserves the core story and repository links without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".project-card")).toHaveCount(4);
  await expect(page.getByText("M.Sc. Embedded Systems", { exact: true })).toBeVisible();
  await page.locator(".repository-explorer summary").click();
  await expect(page.locator(".repository-grid")).toBeVisible();
  await expect(page.locator('a[href="mailto:modugusandeepreddy2@gmail.com"]')).toBeVisible();
  await context.close();
});

test("switches to a dark theme that persists across reloads and stays accessible", async ({ page }) => {
  const html = page.locator("html");
  await expect(html).toHaveClass(/\blight\b/);
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(html).toHaveClass(/\bdark\b/);
  await expect(html).not.toHaveClass(/\blight\b/);
  await page.reload();
  await expect(html).toHaveClass(/\bdark\b/);
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(html).toHaveClass(/\blight\b/);
});

test("honors reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe("auto");
});

test("supports keyboard navigation and mobile menu focus management", async ({ page }, testInfo) => {
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  if (testInfo.project.name === "mobile") {
    const trigger = page.getByRole("button", { name: "Open navigation menu" });
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const menuAccessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(menuAccessibility.violations).toEqual([]);
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Experience" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page).toHaveURL(/#experience$/);
  }
});

test("has no automatic WCAG A/AA accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole("button", { name: "Read the story: STM32 Bootloader case study" }).click();
  const dialogResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(dialogResults.violations).toEqual([]);
});
