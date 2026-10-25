import { mkdir, rename, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { eventSchema, getFeaturedProjects, githubUser, repositorySchema, snapshotSchema } from "../src/lib/github";

const api = `https://api.github.com/users/${githubUser}`;
const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "Sandeep-Engineering-Portfolio",
};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function getJson(url: string): Promise<unknown> {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(20_000) });
  if (!response.ok) {
    throw new Error(`GitHub request failed (${response.status}) at ${url}. Check API availability and GITHUB_TOKEN rate limits. No snapshot was replaced.`);
  }
  return response.json();
}

async function getRepositories() {
  const all = [];
  for (let page = 1; ; page++) {
    const batch = z.array(repositorySchema).parse(await getJson(`${api}/repos?per_page=100&type=owner&sort=updated&page=${page}`));
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

async function getEvents() {
  const all = [];
  for (let page = 1; page <= 3; page++) {
    const batch = z.array(eventSchema).parse(await getJson(`${api}/events/public?per_page=100&page=${page}`));
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return [...new Map(all.map((event) => [event.id, event])).values()]
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
}

const [profile, repositories, events] = await Promise.all([
  getJson(api),
  getRepositories(),
  getEvents(),
]);
const snapshot = snapshotSchema.parse({ fetchedAt: new Date().toISOString(), profile, repositories, events });
getFeaturedProjects(snapshot.repositories);
const directory = new URL("../src/data/", import.meta.url);
await mkdir(directory, { recursive: true });
const destination = new URL("github.json", directory);
const temporary = new URL("github.json.tmp", directory);
await writeFile(temporary, `${JSON.stringify(snapshot, null, 2)}\n`);
await rename(temporary, destination);
console.log(`GitHub snapshot saved: ${snapshot.repositories.length} repositories, ${snapshot.events.length} public events.`);
console.log(fileURLToPath(destination));
