"use client";

import { experience } from "@/data/portfolio";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Experience() {
  return (
    <Accordion type="single" collapsible defaultValue="consultant" className="timeline">
      {experience.map((item) => (
        <AccordionItem key={item.id} value={item.id} className="timeline-item border-0">
          <div className="timeline-date">{item.period}{item.current && <span className="current">CURRENT ROLE</span>}</div>
          <span className="timeline-node" aria-hidden="true" />
          <div className="timeline-body">
            <AccordionTrigger className="timeline-trigger hover:no-underline">
              <span>
                <span className="timeline-company">{item.company}<span className="timeline-context">{item.context}</span></span>
                <span className="timeline-role">{item.role} <span className="muted">/ {item.location}</span></span>
                <span className="timeline-summary">{item.summary}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="timeline-details p-0">
              <div className="timeline-details-inner">
                <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                <div className="tags">{item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
