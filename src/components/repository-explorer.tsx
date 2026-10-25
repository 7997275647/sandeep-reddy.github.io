import { ArrowUpRight, ChevronDown, GitBranch } from "lucide-react";
import { caseStudies } from "@/data/portfolio";
import { formatDate, type Repository } from "@/lib/github";

export function RepositoryExplorer({ repositories }: { repositories: Repository[] }) {
  const featured = new Set(caseStudies.map((project) => project.slug));
  const otherWork = repositories
    .filter((repo) => !repo.fork && !featured.has(repo.name) && !["7997275647", "Personal-Portfolio", "Personal_Portfolio", "sandeep-reddy.github.io"].includes(repo.name))
    .sort((a, b) => Date.parse(b.pushed_at ?? "1970-01-01") - Date.parse(a.pushed_at ?? "1970-01-01"));

  return (
    <details className="repository-explorer">
      <summary><span><GitBranch size={15} aria-hidden="true" />More repositories <span className="muted">({otherWork.length})</span></span><ChevronDown size={16} aria-hidden="true" /></summary>
      <p className="repository-intro">Automatically listed from GitHub. These repositories include experiments and learning projects, not just finished applications.</p>
      <div className="repository-grid">
        {otherWork.map((repo) => (
          <a key={repo.name} className="repository-link" href={repo.html_url} target="_blank" rel="noreferrer">
            <span className="repository-name">{repo.name.replace(/[_-]/g, " ")}<ArrowUpRight size={13} aria-hidden="true" /></span>
            {repo.description && <span className="repository-description">{repo.description}</span>}
            <span className="repository-meta">{repo.language ?? "No primary language reported"}{repo.archived ? " / Archived" : ""}{repo.pushed_at ? ` / Updated ${formatDate(repo.pushed_at)}` : ""}</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </details>
  );
}
