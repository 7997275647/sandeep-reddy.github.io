"use client";

import { useState } from "react";
import { ArrowUpRight, AudioLines, CircleCheck, Cpu, ShieldCheck, Terminal } from "lucide-react";
import { skillGroups } from "@/data/portfolio";

const icons = [Cpu, AudioLines, ShieldCheck, Terminal];

export function Skills() {
  const [selected, setSelected] = useState(0);
  const group = skillGroups[selected];

  return (
    <div className="skills-layout">
      <div className="skills-choices" role="group" aria-label="Explore skill areas">
        {skillGroups.map((item, index) => {
          const Icon = icons[index];
          return (
            <button key={item.id} type="button" className="skill-choice" aria-pressed={selected === index} aria-controls="skill-detail" onClick={() => setSelected(index)}>
              <Icon aria-hidden="true" />
              <span><strong>{item.title}</strong><span>{item.context}</span></span>
              <ArrowUpRight aria-hidden="true" />
            </button>
          );
        })}
      </div>
      <div id="skill-detail" className="skill-panel" role="region" aria-label="Selected expertise" aria-live="polite" aria-atomic="true">
        <p className="skill-panel-label">{group.label}</p>
        <h3>{group.title}</h3>
        <p>{group.description}</p>
        <div className="skill-cloud">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        <div className="skill-evidence"><CircleCheck aria-hidden="true" /><span>{group.evidence}</span></div>
      </div>
    </div>
  );
}
