import Image from "next/image";
import { ArrowUp, ArrowUpRight, GraduationCap } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { RepositoryExplorer } from "@/components/repository-explorer";
import { Skills } from "@/components/skills";
import { GitHubActivity } from "@/components/github-activity";
import { ContactLinks } from "@/components/contact";
import { Button } from "@/components/ui/button";
import { person } from "@/data/portfolio";
import githubData from "@/data/github.json";
import { getFeaturedProjects, snapshotSchema } from "@/lib/github";
import { assetPath, siteUrl } from "@/lib/deployment";

const snapshot = snapshotSchema.parse(githubData);
const projects = getFeaturedProjects(snapshot.repositories);
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  url: `${siteUrl}/`,
  image: `${siteUrl}/portrait.webp`,
  jobTitle: person.role,
  description: person.description,
  email: `mailto:${person.email}`,
  sameAs: [person.github, person.linkedin],
  address: { "@type": "PostalAddress", addressLocality: "Augsburg", addressCountry: "DE" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Chemnitz University of Technology" },
    { "@type": "CollegeOrUniversity", name: "JB Institute of Engineering and Technology" },
  ],
  knowsAbout: ["Embedded C", "STM32", "FreeRTOS", "Motor control", "CMSIS-DSP", "Hardware-in-the-Loop", "MISRA C"],
};

export default function Home() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="container-shell hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title">Hi, I&apos;m Sandeep.</h1>
              <p className="hero-lead">I&apos;m an embedded software engineer in Augsburg, Germany. I write C for STM32 and ARM Cortex-M microcontrollers, mostly for motor control, real-time firmware and the test setups that check them.</p>
              <p className="hero-description">I&apos;m currently an embedded software consultant with Hilti, through Technology &amp; Strategy. Before that I finished an M.Sc. in Embedded Systems in Chemnitz, with internships at Honeywell Elster and work at seleon.</p>
              <div className="hero-actions">
                <Button asChild><a href="#projects">See my projects</a></Button>
                <a className="text-link" href="#contact">Get in touch<ArrowUpRight aria-hidden="true" /></a>
              </div>
            </div>
            <div className="hero-photo">
              <Image src={assetPath("portrait.webp")} alt="Sandeep Reddy Modugu" width={480} height={480} priority />
            </div>
          </div>
        </section>

        <section id="about" className="section" aria-labelledby="about-title">
          <div className="container-shell about-grid">
            <div className="about-copy">
              <h2 id="about-title" className="section-heading">About me</h2>
              <p>I like the point where software meets hardware. A motor starts smoothly, a sensor reading makes sense, a device keeps working when the connection is bad. That&apos;s the part of the job I enjoy most.</p>
              <p>I got into it through electrical engineering in India, then went to Germany for an M.Sc. in Embedded Systems. Since then I&apos;ve worked on firmware, motor control and hardware-in-the-loop testing.</p>
              <p>During my master&apos;s thesis at Hilti, I got motor-control filtering running about twice as fast, measured on real hardware. During my internship there, I cut MISRA C static-analysis violations by 80% and shortened build times by 30% after moving the pipelines to GitLab CI/CD.</p>
              <p>I also keep learning through side projects: a Qt sensor dashboard, a secure bootloader for STM32 and a C++ design patterns project. For each one I try to be clear about what it does and where its limits are.</p>
            </div>
          </div>
        </section>

        <section id="experience" className="section experience-section" aria-labelledby="experience-title">
          <div className="container-shell">
            <div className="section-header">
              <h2 id="experience-title" className="section-heading">Experience</h2>
              <p className="section-description">Where I&apos;ve worked, most recent first.</p>
            </div>
            <Experience />
          </div>
        </section>

        <section id="projects" className="section projects-section" aria-labelledby="projects-title">
          <div className="container-shell">
            <div className="section-header">
              <h2 id="projects-title" className="section-heading">Projects</h2>
              <a className="text-link" href={`${person.github}?tab=repositories`} target="_blank" rel="noreferrer">All repositories<ArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
            <Projects projects={projects} />
            <RepositoryExplorer repositories={snapshot.repositories} />
          </div>
        </section>

        <section id="skills" className="section skills-section" aria-labelledby="skills-title">
          <div className="container-shell">
            <div className="section-header">
              <h2 id="skills-title" className="section-heading">Skills</h2>
              <p className="section-description">Grouped by what I&apos;ve used them for, with the places I&apos;ve used them.</p>
            </div>
            <Skills />
            <h3 className="education-title">Education</h3>
            <div className="education-grid">
              <article className="education-item"><GraduationCap aria-hidden="true" /><div><h4>M.Sc. Embedded Systems</h4><p>Technical University of Chemnitz, Germany</p><p className="education-detail">Oct 2021 – Apr 2026 · Final grade 2.1 (Good)</p></div></article>
              <article className="education-item"><GraduationCap aria-hidden="true" /><div><h4>B.Tech. Electrical &amp; Electronics Engineering</h4><p>JB Institute of Engineering and Technology, India</p><p className="education-detail">Jun 2015 – Mar 2019</p></div></article>
            </div>
            <p className="language-note">Languages: English (C1), German (A2, working toward B1).</p>
          </div>
        </section>

        <section id="github" className="section" aria-labelledby="github-title">
          <div className="container-shell">
            <div className="section-header">
              <h2 id="github-title" className="section-heading">GitHub</h2>
              <p className="section-description">Experiments, tools and things I&apos;m still figuring out. The code is all public.</p>
            </div>
            <GitHubActivity snapshot={snapshot} />
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="container-shell contact-grid">
            <div>
              <h2 id="contact-title">Get in touch</h2>
              <p>Have an embedded problem, an open role or an idea you want to talk through? Email is the quickest way to reach me.</p>
            </div>
            <ContactLinks />
          </div>
        </section>
      </main>
      <footer>
        <div className="container-shell footer-inner">
          <span>© {new Date(snapshot.fetchedAt).getUTCFullYear()} Sandeep Reddy Modugu</span>
          <a href="#top">Back to top<ArrowUp aria-hidden="true" /></a>
        </div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </div>
  );
}
