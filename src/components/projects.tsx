"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { categories, type ProjectCategory } from "@/data/portfolio";
import { filterProjects, type FeaturedProject } from "@/lib/github";
import { ProjectArt } from "@/components/project-art";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function Projects({ projects }: { projects: FeaturedProject[] }) {
  const [filter, setFilter] = useState<ProjectCategory>("All work");
  const visible = filterProjects(projects, filter);

  return (
    <>
      <div className="project-toolbar">
        <div className="project-filters" role="group" aria-label="Filter projects">
          {categories.map((category) => (
            <button key={category} className="project-filter" type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>
          ))}
        </div>
        <span className="project-count" role="status">{visible.length} {visible.length === 1 ? "project" : "projects"}{filter === "All work" ? "" : ` in ${filter}`}</span>
      </div>
      <div className="project-grid">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((project) => (
            <m.article key={project.slug} layout className="project-card" initial={false} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .2 }}>
              <ProjectArt type={project.art} />
              <div className="project-body">
                <div className="project-category">
                  <span>{project.category} / {project.kind}</span>
                  {project.status === "In development" && <span className="in-development">In progress</span>}
                </div>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <div className="tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                <div className="project-footer">
                  <a className="project-source" href={project.repository.html_url} target="_blank" rel="noreferrer" aria-label={`View source for ${project.subtitle} on GitHub (opens in a new tab)`}>
                    <Github size={13} aria-hidden="true" />View source
                  </a>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button type="button" className="text-link" aria-label={`Read the story: ${project.subtitle} case study`}>Read the story <ArrowUpRight aria-hidden="true" /></button>
                    </DialogTrigger>
                    <DialogContent className="case-dialog">
                      <ProjectArt type={project.art} />
                      <div className="case-dialog-copy">
                        <DialogHeader className="text-left">
                          <p className="case-subtitle">{project.subtitle} / {project.status}</p>
                          <DialogTitle>{project.title}</DialogTitle>
                          <DialogDescription className="mt-2 text-xs leading-relaxed">{project.summary}</DialogDescription>
                        </DialogHeader>
                        <div className="tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                        <div className="case-section">                        <h3>The problem</h3><p>{project.problem}</p></div>
                                                <div className="case-section"><h3>How I built it</h3><p>{project.approach}</p></div>
                                                <div className="case-section"><h3>The outcome</h3><p>{project.outcome}</p></div>
                                                <div className="case-boundary"><strong>Scope and limits</strong>{project.boundary}</div>
                        <Button asChild className="min-h-11 gap-3 text-xs">
                          <a href={project.repository.html_url} target="_blank" rel="noreferrer">Explore the source<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </m.article>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
