import { z } from "zod";
import { caseStudies, type CaseStudy, type ProjectCategory } from "@/data/portfolio";

export const githubUser = "7997275647";
const githubUrl = z.url().refine((value) => {
  const url = new URL(value);
  return url.protocol === "https:" && url.hostname === "github.com" && !url.username && !url.password;
}, "Expected an HTTPS GitHub URL");

export const repositorySchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
  html_url: githubUrl,
  language: z.string().nullable(),
  stargazers_count: z.number().int().nonnegative(),
  forks_count: z.number().int().nonnegative(),
  fork: z.boolean(),
  archived: z.boolean(),
  pushed_at: z.iso.datetime().nullable(),
  topics: z.array(z.string()).default([]),
});

export const eventSchema = z.object({
  id: z.string(),
  type: z.string(),
  repo: z.object({ name: z.string().regex(/^[\w.-]+\/[\w.-]+$/) }),
  created_at: z.iso.datetime(),
});

export const snapshotSchema = z.object({
  fetchedAt: z.iso.datetime(),
  profile: z.object({
    login: z.literal(githubUser),
    public_repos: z.number().int().nonnegative(),
    followers: z.number().int().nonnegative(),
    created_at: z.iso.datetime(),
  }),
  repositories: z.array(repositorySchema),
  events: z.array(eventSchema),
});

export type Repository = z.infer<typeof repositorySchema>;
export type GitHubEvent = z.infer<typeof eventSchema>;
export type GitHubSnapshot = z.infer<typeof snapshotSchema>;
export type FeaturedProject = CaseStudy & { repository: Repository };

export function getFeaturedProjects(repositories: Repository[]): FeaturedProject[] {
  return caseStudies.map((study) => {
    const repository = repositories.find((repo) => repo.name === study.slug);
    if (!repository) throw new Error(`Featured repository "${study.slug}" is missing. Update the curation or refresh the GitHub snapshot.`);
    return { ...study, repository };
  });
}

export function filterProjects(projects: FeaturedProject[], category: ProjectCategory) {
  return category === "All work" ? projects : projects.filter((project) => project.category === category);
}

export function getRepositoryStats(repositories: Repository[]) {
  const original = repositories.filter((repo) => !repo.fork);
  const languages = new Map<string, number>();
  for (const repo of original) {
    if (repo.language) languages.set(repo.language, (languages.get(repo.language) ?? 0) + 1);
  }
  return {
    original: original.length,
    stars: original.reduce((total, repo) => total + repo.stargazers_count, 0),
    languages: [...languages].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
  };
}

export function getActivityDays(events: GitHubEvent[], fetchedAt: string) {
  const end = new Date(fetchedAt);
  end.setUTCHours(0, 0, 0, 0);
  const dayOfWeek = (end.getUTCDay() + 6) % 7;
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - dayOfWeek - 77);
  const counts = new Map<string, number>();
  for (const event of events) {
    if (Date.parse(event.created_at) > Date.parse(fetchedAt)) continue;
    const date = event.created_at.slice(0, 10);
    counts.set(date, (counts.get(date) ?? 0) + 1);
  }
  return Array.from({ length: 84 }, (_, index) => {
    const day = new Date(start);
    day.setUTCDate(day.getUTCDate() + index);
    const date = day.toISOString().slice(0, 10);
    return { date, count: counts.get(date) ?? 0, future: day > end };
  });
}

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));

export function eventLabel(type: string) {
  const labels: Record<string, string> = {
    PushEvent: "Pushed code",
    CreateEvent: "Created a branch or repository",
    PullRequestEvent: "Pull request activity",
    IssuesEvent: "Issue activity",
    IssueCommentEvent: "Commented on an issue",
    PublicEvent: "Made a repository public",
    ReleaseEvent: "Published a release",
    WatchEvent: "Starred a repository",
    ForkEvent: "Forked a repository",
    DeleteEvent: "Deleted a branch or tag",
  };
  return labels[type] ?? type.replace(/Event$/, "").replace(/([a-z])([A-Z])/g, "$1 $2");
}
