import { describe, expect, it } from "vitest";
import { categories, caseStudies, experience } from "../../src/data/portfolio";
import snapshotData from "../../src/data/github.json";
import { filterProjects, getActivityDays, getFeaturedProjects, getRepositoryStats, snapshotSchema } from "../../src/lib/github";

const snapshot = snapshotSchema.parse(snapshotData);

describe("GitHub data and project curation", () => {
  it("validates the committed snapshot and user", () => {
    expect(snapshot.profile.login).toBe("7997275647");
    expect(snapshot.repositories.length).toBeGreaterThan(0);
    expect(Number.isNaN(Date.parse(snapshot.fetchedAt))).toBe(false);
  });

  it("resolves every case study to a real repository", () => {
    const projects = getFeaturedProjects(snapshot.repositories);
    expect(projects).toHaveLength(caseStudies.length);
    for (const project of projects) {
      expect(project.repository.html_url).toBe(`https://github.com/7997275647/${project.slug}`);
      expect(project.problem.length).toBeGreaterThan(30);
      expect(project.outcome.length).toBeGreaterThan(30);
      expect(project.boundary).toBeTruthy();
    }
  });

  it("fails explicitly rather than fabricating a missing repository", () => {
    expect(() => getFeaturedProjects([])).toThrow("Featured repository");
  });

  it("filters each category and restores all projects", () => {
    const projects = getFeaturedProjects(snapshot.repositories);
    expect(filterProjects(projects, "All work")).toHaveLength(4);
    for (const category of categories.slice(1)) {
      const results = filterProjects(projects, category);
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((project) => project.category === category)).toBe(true);
    }
    expect(filterProjects(projects, "Firmware")[0].slug).toBe("SecureBoot-STM32");
  });

  it("excludes forks and null languages from language statistics", () => {
    const repo = snapshot.repositories[0];
    const stats = getRepositoryStats([
      { ...repo, name: "a", language: "C", fork: false, stargazers_count: 2 },
      { ...repo, name: "b", language: "Python", fork: true, stargazers_count: 30 },
      { ...repo, name: "c", language: null, fork: false, stargazers_count: 1 },
    ]);
    expect(stats).toEqual({ original: 2, stars: 3, languages: [{ name: "C", count: 1 }] });
  });

  it("rejects non-GitHub executable project links", () => {
    const badSnapshot = { ...snapshot, repositories: [{ ...snapshot.repositories[0], html_url: "javascript:alert(1)" }] };
    expect(() => snapshotSchema.parse(badSnapshot)).toThrow();
  });
});

describe("honest activity visualization", () => {
  it("creates exactly twelve Monday-first weeks with real event counts", () => {
    const days = getActivityDays([
      { id: "one", type: "PushEvent", repo: { name: "user/repo" }, created_at: "2026-10-25T01:00:00Z" },
      { id: "two", type: "PushEvent", repo: { name: "user/repo" }, created_at: "2026-10-25T02:00:00Z" },
    ], "2026-10-25T12:00:00Z");
    expect(days).toHaveLength(84);
    expect(new Date(days[0].date).getUTCDay()).toBe(1);
    expect(days.at(-1)).toEqual({ date: "2026-10-25", count: 2, future: false });
    expect(days.reduce((sum, day) => sum + day.count, 0)).toBe(2);
  });

  it("never fabricates activity when the feed is empty", () => {
    expect(getActivityDays([], snapshot.fetchedAt).every((day) => day.count === 0)).toBe(true);
  });

  it("marks future cells and ignores future and out-of-window events", () => {
    const days = getActivityDays([
      { id: "future", type: "PushEvent", repo: { name: "user/repo" }, created_at: "2026-10-29T01:00:00Z" },
      { id: "old", type: "PushEvent", repo: { name: "user/repo" }, created_at: "2020-01-01T00:00:00Z" },
    ], "2026-10-26T12:00:00Z");
    expect(days.filter((day) => day.future)).toHaveLength(6);
    expect(days.reduce((sum, day) => sum + day.count, 0)).toBe(0);
  });
});

describe("source-grounded career content", () => {
  it("preserves CV dates and marks only the consulting role current", () => {
    expect(experience.filter((item) => item.current)).toHaveLength(1);
    expect(experience.find((item) => item.id === "seleon")?.period).toBe("May 2024 - Nov 2024");
    expect(experience[0].context).toBe("Client: Hilti");
  });

  it("retains critical project scope qualifications", () => {
    expect(caseStudies.find((project) => project.art === "bootloader")?.boundary).toContain("does not authenticate");
    expect(caseStudies.find((project) => project.art === "gateway")?.status).toBe("In development");
    expect(caseStudies.find((project) => project.art === "gateway")?.boundary).toContain("not yet implemented");
  });
});
