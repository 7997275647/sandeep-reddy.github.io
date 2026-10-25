import { ArrowUpRight, GitCommitHorizontal, Github, RefreshCw } from "lucide-react";
import { person } from "@/data/portfolio";
import { eventLabel, formatDate, getActivityDays, getRepositoryStats, type GitHubSnapshot } from "@/lib/github";

const colors = ["#c3f58a", "#98c7ce", "#b1adcf", "#d8bd85", "#7c9e5b", "#d4a59b"];

export function GitHubActivity({ snapshot }: { snapshot: GitHubSnapshot }) {
  const stats = getRepositoryStats(snapshot.repositories);
  const days = getActivityDays(snapshot.events, snapshot.fetchedAt);
  const eventCount = days.reduce((sum, day) => sum + day.count, 0);
  const topLanguages = stats.languages.slice(0, 5);
  const otherLanguages = stats.languages.slice(5).reduce((sum, language) => sum + language.count, 0);
  const languages = otherLanguages ? [...topLanguages, { name: "Other", count: otherLanguages }] : topLanguages;
  const languageTotal = languages.reduce((sum, language) => sum + language.count, 0);
  const events = snapshot.events.filter((event) => Date.parse(event.created_at) <= Date.parse(snapshot.fetchedAt)).slice(0, 3);

  return (
    <>
      <div className="github-panel">
        <div className="github-main">
          <div className="github-user">
            <Github aria-hidden="true" />
            <div><strong>Sandeep Reddy Modugu</strong><span>@{snapshot.profile.login}</span></div>
            <a href={person.github} target="_blank" rel="noreferrer" aria-label="View GitHub profile (opens in a new tab)"><ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="github-stats">
            <div><strong>{snapshot.repositories.length}</strong><span>Public repositories</span></div>
            <div><strong>{stats.original}</strong><span>Non-fork repositories</span></div>
            <div><strong>{stats.languages.length}</strong><span>Primary languages</span></div>
          </div>
          <div className="github-activity-label"><span>Public activity</span><span>Last 12 weeks</span></div>
          <div className="activity-grid" role="img" aria-label={`${eventCount} public events from GitHub's available feed in the displayed 12-week window. This is not a total contribution count.`}>
            {days.map((day) => (
              <span key={day.date} className="activity-day" data-future={day.future} data-level={Math.min(day.count, 4)} title={`${day.date}: ${day.future ? "future date" : `${day.count} public events in the available feed`}`} />
            ))}
          </div>
          <div className="activity-footer">
            <span>{eventCount} events in available feed</span>
            <span className="activity-legend">Less{[0, 1, 2, 3, 4].map((level) => <i key={level} className="activity-day" data-level={level} aria-hidden="true" />)}More</span>
          </div>
          <p className="activity-disclaimer">Real public activity, not a simulated streak. GitHub&apos;s event feed is limited; empty cells do not mean no contributions.</p>
        </div>
        <div className="github-side">
          <p className="github-side-label">Recent activity</p>
          <ul className="recent-events">
            {events.map((event) => (
              <li key={event.id} className="recent-event">
                <GitCommitHorizontal aria-hidden="true" />
                <div>
                  <a href={`https://github.com/${event.repo.name}`} target="_blank" rel="noreferrer">{event.repo.name.split("/")[1]}<span className="sr-only"> (opens in a new tab)</span></a>
                  <span>{eventLabel(event.type)} / {formatDate(event.created_at)}</span>
                </div>
              </li>
            ))}
          </ul>
          {events.length === 0 && <p className="activity-disclaimer">No public events returned in this snapshot. Explore the repositories directly on GitHub.</p>}
          <div className="github-languages">
            <p className="github-side-label">Repositories by primary language</p>
            <div className="language-bar" aria-hidden="true">
              {languages.map((language, index) => <span key={language.name} style={{ width: `${language.count / languageTotal * 100}%`, background: colors[index] }} />)}
            </div>
            <div className="language-legend">
              {languages.map((language, index) => <span key={language.name}><i style={{ background: colors[index] }} aria-hidden="true" />{language.name} ({language.count})</span>)}
            </div>
            <p className="activity-disclaimer">Non-fork repositories only. Language counts are not proficiency scores or percentages of code.</p>
          </div>
        </div>
      </div>
      <p className="github-snapshot"><RefreshCw aria-hidden="true" />GitHub data as of {formatDate(snapshot.fetchedAt)}, refreshed at build time</p>
    </>
  );
}
