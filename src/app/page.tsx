import Image from "next/image";
import { ArrowDown, ArrowDownRight, ArrowUp, ArrowUpRight, AudioLines, CheckCheck, Cpu, GraduationCap, MapPin, MoveUpRight, Timer, Workflow } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { CircuitBoard } from "@/components/circuit-board";
import { SignalPanel } from "@/components/signal-panel";
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
          <div className="container-shell">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="hero-eyebrow"><span className="status-dot" aria-hidden="true" />EMBEDDED SOFTWARE ENGINEER / GERMANY</p>
                <h1 id="hero-title">Software that<br />moves the<br /><span className="serif">real world.</span></h1>
                <p className="hero-description">I&apos;m <strong>Sandeep</strong>. I turn complex hardware challenges into dependable software. From real-time firmware to the signals that drive it.</p>
                <div className="hero-actions">
                  <Button asChild><a href="#projects">Explore my work<ArrowDownRight size={16} aria-hidden="true" /></a></Button>
                  <a className="text-link" href="#contact">Let&apos;s connect<ArrowUpRight aria-hidden="true" /></a>
                </div>
                <div className="hero-signature">
                  <Image src={assetPath("portrait.webp")} alt="Sandeep Reddy Modugu" width={38} height={38} style={{ width: 38, height: 38 }} priority />
                  <div><strong>Sandeep Reddy Modugu</strong><span><MapPin size={10} aria-hidden="true" />Augsburg, Germany · M.Sc. Embedded Systems</span></div>
                </div>
              </div>
              <div className="hero-visual">
                <div className="visual-topline" aria-hidden="true"><span>FIG. 01 / WHERE CODE MEETS HARDWARE</span><span className="visual-cross">+</span></div>
                <CircuitBoard />
                <span className="chip-caption">HARDWARE-MINDED. SOFTWARE-DRIVEN.</span>
              </div>
            </div>
            <div className="hero-bottom">
              <a href="#about">A LITTLE FURTHER DOWN<ArrowDown size={11} aria-hidden="true" /></a>
              <span>PRECISION AT EVERY LAYER.</span>
              <div className="bottom-specialties"><span>C / C++</span><span>REAL-TIME SYSTEMS</span><span>DSP</span></div>
            </div>
          </div>
        </section>

        <div className="company-strip" aria-label="Professional experience at these companies">
          <div className="container-shell company-inner">
            <p className="company-intro">Engineering experience.<br />Real-world environments.</p>
            <div className="company-wordmark hilti"><strong>HILTI</strong><small>CLIENT & THESIS</small></div>
            <div className="company-wordmark"><strong>Honeywell</strong><small>INTERNSHIP</small></div>
            <div className="company-wordmark seleon"><strong>seleon</strong><small>WORKING STUDENT</small></div>
            <div className="company-wordmark weber"><strong>Weber</strong><small>SOFTWARE ENGINEERING</small></div>
          </div>
        </div>

        <section id="about" className="section" aria-labelledby="about-title">
          <div className="container-shell about-grid">
            <div className="about-copy">
              <p className="section-label"><span>01 /</span> THE ENGINEER BEHIND THE CODE</p>
              <h2 id="about-title" className="section-heading">Close to the hardware.<br /><span className="serif">Closer to the details.</span></h2>
              <p>I like the point where software becomes something physical. A motor starts smoothly. A sensor makes sense of its surroundings. A device keeps responding when the connection gets difficult.</p>
              <p>That curiosity took me from electrical engineering in India to an <strong>M.Sc. in Embedded Systems in Germany</strong>, and into firmware, motor control and hardware-in-the-loop verification.</p>
              <p>Today, I&apos;m an <strong>Embedded Software Consultant at Technology & Strategy, working with Hilti</strong>. I modernize motor-control firmware and integrate safety checks, with the same principle in mind: understand the system, then make it better.</p>
              <div className="about-footnote"><span><Cpu size={13} aria-hidden="true" />HARDWARE-NEAR THINKING</span><span><CheckCheck size={13} aria-hidden="true" />MEASURED, NOT ASSUMED</span></div>
            </div>
            <SignalPanel />
          </div>
        </section>

        <section id="achievements" className="impact-section" aria-labelledby="impact-title">
          <div className="container-shell">
            <h2 id="impact-title" className="sr-only">Selected engineering achievements</h2>
            <div className="impact-grid">
              <article className="impact-card">
                <div className="impact-top"><strong className="impact-value">2×</strong><AudioLines aria-hidden="true" /></div>
                <h3>Faster signal filtering</h3>
                <p>Optimized motor-control filtering with ARM Cortex-M4 CMSIS-DSP SIMD intrinsics.</p>
                <p className="impact-source">HILTI / MASTER&apos;S THESIS</p>
              </article>
              <article className="impact-card">
                <div className="impact-top"><strong className="impact-value">80<span className="text-3xl">%</span></strong><MoveUpRight aria-hidden="true" /></div>
                <h3>Fewer MISRA C violations</h3>
                <p>Strengthened firmware quality through focused static-analysis improvements with Axivion.</p>
                <p className="impact-source">HILTI / EMBEDDED SOFTWARE INTERNSHIP</p>
              </article>
              <article className="impact-card">
                <div className="impact-top"><strong className="impact-value">30<span className="text-3xl">%</span></strong><Timer aria-hidden="true" /></div>
                <h3>Shorter build times</h3>
                <p>Migrated Jenkins builds to GitLab CI/CD, making the development feedback loop faster.</p>
                <p className="impact-source">HILTI / EMBEDDED SOFTWARE INTERNSHIP</p>
              </article>
            </div>
          </div>
        </section>

        <section id="experience" className="section experience-section" aria-labelledby="experience-title">
          <div className="container-shell">
            <div className="section-header">
              <div><p className="section-label"><span>02 /</span> THE JOURNEY SO FAR</p><h2 id="experience-title" className="section-heading">Built on <span className="serif">real experience.</span></h2></div>
              <p className="section-description">From connected devices to motor-control systems. Each role, a deeper understanding of the whole.</p>
            </div>
            <Experience />
          </div>
        </section>

        <section id="projects" className="section projects-section" aria-labelledby="projects-title">
          <div className="container-shell">
            <div className="section-header">
              <div><p className="section-label"><span>03 /</span> SELECTED WORK</p><h2 id="projects-title" className="section-heading">Curiosity, <span className="serif">put to work.</span></h2></div>
              <a className="text-link" href={`${person.github}?tab=repositories`} target="_blank" rel="noreferrer">All repositories<ArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
            <Projects projects={projects} />
            <RepositoryExplorer repositories={snapshot.repositories} />
          </div>
        </section>

        <section id="skills" className="section skills-section" aria-labelledby="skills-title">
          <div className="container-shell">
            <div className="section-header">
              <div><p className="section-label"><span>04 /</span> THE ENGINEERING TOOLKIT</p><h2 id="skills-title" className="section-heading">Depth where <span className="serif">it matters.</span></h2></div>
              <p className="section-description">Not a wall of logos. A connected set of skills, grounded in where I&apos;ve actually used them.</p>
            </div>
            <Skills />
            <div className="education-header"><GraduationCap size={16} aria-hidden="true" /><h3>STRONG FOUNDATIONS. ALWAYS LEARNING.</h3></div>
            <div className="education-grid">
              <article className="education-item"><GraduationCap aria-hidden="true" /><div><h3>M.Sc. Embedded Systems</h3><p>Technical University of Chemnitz, Germany</p><p className="education-detail">OCT 2021 - APR 2026 / FINAL GRADE 2.1 (GOOD)</p></div></article>
              <article className="education-item"><GraduationCap aria-hidden="true" /><div><h3>B.Tech. Electrical & Electronics Engineering</h3><p>JB Institute of Engineering and Technology, India</p><p className="education-detail">JUN 2015 - MAR 2019</p></div></article>
            </div>
            <div className="language-note"><span>ENGLISH / C1 · PROFESSIONAL PROFICIENCY</span><span>GERMAN / A2 · WORKING TOWARD B1</span></div>
          </div>
        </section>

        <section id="github" className="section" aria-labelledby="github-title">
          <div className="container-shell">
            <div className="section-header">
              <div><p className="section-label"><span>05 /</span> BUILDING IN THE OPEN</p><h2 id="github-title" className="section-heading">Beyond the <span className="serif">day job.</span></h2></div>
              <p className="section-description">Experiments, tools and things I&apos;m figuring out. The work continues on GitHub.</p>
            </div>
            <GitHubActivity snapshot={snapshot} />
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="container-shell contact-grid">
            <div>
              <p className="section-label"><span>06 /</span> LET&apos;S MAKE SOMETHING MATTER</p>
              <h2 id="contact-title">Great systems start<br />with a <span className="serif">conversation.</span></h2>
              <p>Have an embedded challenge, a role, or a useful idea in mind? I&apos;d be glad to hear from you.</p>
            </div>
            <ContactLinks />
          </div>
        </section>
      </main>
      <footer>
        <div className="container-shell footer-inner">
          <span>© {new Date(snapshot.fetchedAt).getUTCFullYear()} SANDEEP REDDY MODUGU</span>
          <span className="footer-note"><Workflow size={11} aria-hidden="true" />ENGINEERED WITH INTENTION. BUILT WITH CURIOSITY.</span>
          <a href="#top">BACK TO TOP<ArrowUp aria-hidden="true" /></a>
        </div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </div>
  );
}
