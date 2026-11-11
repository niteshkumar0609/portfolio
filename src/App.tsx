import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, Check, ChevronDown, Code2, Copy, Database, ExternalLink, Github, GraduationCap, Layers3, Linkedin, Mail, Menu, Terminal, Trophy, X } from 'lucide-react'
import { courses, profile, projects, skills } from './data'

const nav = [['About', 'about'], ['Projects', 'projects'], ['Experience', 'experience'], ['Skills', 'skills']] as const

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return <m.div className={className} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.55 }}>{children}</m.div>
}

function Socials({ text = false }: { text?: boolean }) {
  return <div className="socials">
    <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)"><Github size={18} />{text && 'GitHub'}{text && <ArrowUpRight size={14} />}</a>
    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)"><Linkedin size={18} />{text && 'LinkedIn'}{text && <ArrowUpRight size={14} />}</a>
    {!text && <a href={`mailto:${profile.email}`} aria-label="Email Nitesh"><Mail size={18} /></a>}
  </div>
}

function Architecture({ compact = false }: { compact?: boolean }) {
  return <div className={`architecture ${compact ? 'compact' : ''}`} aria-label="Key-value store architecture: Command Parser, Storage Engine, Expiry Manager, and Database">
    <div className="arch-top"><span className="window-dots"><i /><i /><i /></span><span>kv-store / architecture</span><Code2 size={14} /></div>
    <div className="arch-content">
      <div className="code-line"><span>01</span><code><b>SET</b> developer <em>"Nitesh"</em></code><span className="code-ok">OK</span></div>
      <div className="code-line"><span>02</span><code><b>GET</b> developer</code><span className="code-cursor" /></div>
      <div className="arch-flow"><div><Terminal size={17} /><span>Command Parser</span></div><i /><div className="engine"><Database size={20} /><span>Storage Engine</span><small>unordered_map · unordered_set</small></div><div className="arch-branches"><div><Layers3 size={16} /><span>Expiry Manager</span><small>std::chrono</small></div><div><Database size={16} /><span>Database</span><small>File persistence</small></div></div></div>
      <div className="arch-bottom"><span><i /> C++ / STL</span><span>O(1) average operations</span></div>
    </div>
  </div>
}

function ProjectArt({ kind }: { kind: string }) {
  if (kind === 'store') return <Architecture compact />
  if (kind === 'ticket') return <div className="project-art ticket-art" aria-hidden="true"><div className="ticket"><div className="ticket-heading"><span>ENTRY / ADMIN</span><Check size={17} /></div><div className="qr">{Array.from({ length: 49 }, (_, i) => <i key={i} className={(i * 7 + Math.floor(i / 7) * 3) % 5 < 3 ? 'filled' : ''} />)}</div><span className="ticket-label">QR-based verification</span><div className="ticket-perf" /><span className="ticket-status"><i /> Ticket management</span></div><span className="art-caption">FLUTTER + FIREBASE</span></div>
  if (kind === 'sentiment') return <div className="project-art sentiment-art" aria-hidden="true"><span className="art-caption">REVIEW → TOKENIZE → CLASSIFY</span><div className="token-row"><span>Customer</span><span>review</span><span>text</span></div><div className="bert-node">BERT<small>fine-tuned classifier</small></div><div className="sentiment-result"><span>Positive</span><span>Negative</span></div></div>
  return <div className={`project-art chart-art ${kind}`} aria-hidden="true"><span className="art-caption">{kind === 'attrition' ? 'FEATURES → MODELS → EVALUATION' : 'FEATURE ENGINEERING / TIME SERIES'}</span><svg viewBox="0 0 400 150" fill="none"><path className="chart-grid" d="M0 25H400M0 65H400M0 105H400M50 0V150M130 0V150M210 0V150M290 0V150M370 0V150" /><path className="chart-shadow" d="M0 132L30 114L60 122L90 88L120 100L150 62L180 78L210 42L240 58L270 32L300 50L330 18L360 30L400 8V150H0Z" /><path className="chart-line" d="M0 132L30 114L60 122L90 88L120 100L150 62L180 78L210 42L240 58L270 32L300 50L330 18L360 30L400 8" /></svg><span className="chart-label">{kind === 'attrition' ? 'Logistic Regression / Random Forest' : 'Random Forest / LSTM'}<small>Conceptual illustration · not measured results</small></span></div>
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  return <Reveal className={`project-card ${index === 0 ? 'featured-card' : ''}`}>
    <ProjectArt kind={project.visual} />
    <div className="project-body"><div className="eyebrow"><span>{project.category}</span><span>0{index + 1}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <button className="details-button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls={`project-${index}`}>Engineering details<ChevronDown size={15} className={expanded ? 'rotate' : ''} /></button>
      <div id={`project-${index}`} hidden={!expanded} className="project-details"><p className="project-context">{project.context} · {project.date}</p><ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul></div>
      {project.url && <a className="project-source" href={project.url} target="_blank" rel="noopener noreferrer"><Github size={15} /> View source<ArrowUpRight size={15} /></a>}
    </div>
  </Reveal>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(copyTimer.current), [])
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true); setCopyError(false)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(false), 2500)
    } catch { setCopyError(true) }
  }
  return <LazyMotion features={domAnimation}><a href="#main" className="skip-link">Skip to content</a>
    <header className="header"><div className="container nav-inner"><a href="#" className="brand" aria-label="Nitesh Kumar home">n<span>k</span><i>.</i></a><nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><a className="nav-contact" href="#contact">Let’s talk<ArrowUpRight size={15} /></a><button ref={menuButton} className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button></div>
      <AnimatePresence>{menuOpen && <m.nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{[...nav, ['Contact', 'contact']].map(([label, id]) => <a key={id} onClick={() => setMenuOpen(false)} href={`#${id}`}>{label}<ArrowUpRight size={16} /></a>)}</m.nav>}</AnimatePresence>
    </header>
    <main id="main">
      <section className="hero container" aria-labelledby="hero-title"><div className="hero-glow" /><Reveal className="hero-copy"><div className="hero-kicker"><span /> SOFTWARE DEVELOPER · IIT KANPUR</div><h1 id="hero-title">Turning logic into<br /><span>working systems.</span></h1><p className="hero-intro">Hi, I’m <strong>Nitesh Kumar.</strong> I build backend APIs, explore systems in C++, and bring ideas to life with code.</p><p className="hero-sub">Electrical Engineering undergraduate at IIT Kanpur.<br />Focused on backend engineering, systems, and applied ML.</p><div className="hero-actions"><a className="button primary" href="#projects">Explore my work<ArrowUpRight size={17} /></a><a className="button secondary" href="/resume.pdf" download="Nitesh-Kumar-Resume.pdf"><ArrowDownToLine size={16} /> Download resume</a></div><Socials text /></Reveal><Reveal className="hero-visual"><div className="visual-label"><span>UNDER THE HOOD</span><span>01 / SYSTEMS</span></div><Architecture /><div className="visual-note"><span className="little-line" /> Small components. Thoughtful architecture.</div></Reveal><div className="hero-bottom"><span>BACKEND <i /> SYSTEMS <i /> MACHINE LEARNING</span><a href="#about">A little more about me<ArrowDown size={14} /></a></div></section>

      <section id="about" className="section container"><Reveal className="about-grid"><div><div className="section-label">01 / ABOUT</div><h2>An engineering mindset.<br /><span>A builder’s curiosity.</span></h2></div><div className="about-copy"><p>I’m a fourth-year Electrical Engineering undergraduate at the Indian Institute of Technology Kanpur, with hands-on experience building backend services at EleWin.</p><p>My work spans authenticated recruiter APIs, a modular C++ storage engine, Flutter ticketing workflows, and machine learning models. Across these projects, I’ve worked with data structures, application architecture, and model evaluation.</p><a className="text-link" href="#experience">See where I’ve contributed<ArrowRight size={16} /></a></div></Reveal><Reveal className="focus-strip"><div><Code2 /><span>Backend development<small>APIs, authentication & data workflows</small></span></div><div><Database /><span>Systems thinking<small>Data structures, modularity & persistence</small></span></div><div><Layers3 /><span>Applied machine learning<small>Text, tabular data & time series</small></span></div></Reveal></section>

      <section id="projects" className="section projects-section"><div className="container"><Reveal className="section-heading"><div><div className="section-label">02 / SELECTED WORK</div><h2>Built to learn.<br /><span>Engineered to work.</span></h2></div><p>From storage internals to real-world workflows.<br />A closer look at my engineering projects.</p></Reveal><div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div><a href={profile.github} className="github-banner" target="_blank" rel="noopener noreferrer"><div><Github size={21} /><span>More code. More context.<small>Explore my GitHub profile.</small></span></div><ArrowUpRight size={22} /></a></div></section>

      <section id="experience" className="section container"><Reveal className="section-heading"><div><div className="section-label">03 / EXPERIENCE</div><h2>Building for<br /><span>real workflows.</span></h2></div><span className="section-side-note">BACKEND ENGINEERING</span></Reveal><Reveal className="experience"><div className="experience-meta"><span className="experience-mark">E<span>↗</span></span><h3>EleWin</h3><p>Apr 2026 – Jul 2026</p><a href="https://app.elewin.in" className="text-link" target="_blank" rel="noopener noreferrer">Company platform<ExternalLink size={13} /></a></div><div className="experience-body"><div className="role-label">WORK EXPERIENCE</div><h3>Backend Developer</h3><p>Developed the API layer behind recruiter workflows, from job management to candidate review and shortlisting.</p><ul><li>Built REST APIs with Node.js, Express.js, and MongoDB for job roles, candidate search, filtering, and profiles.</li><li>Implemented reusable JWT authentication, validation, and role-based access control middleware for protected recruiter APIs.</li><li>Designed job and candidate status APIs to support reviews, shortlisting, and updates.</li><li>Developed recruiter dashboard APIs with MongoDB queries and error handling to retrieve candidate and job data.</li></ul><div className="tags">{['Node.js', 'Express.js', 'MongoDB', 'JWT', 'RBAC'].map(tag => <span key={tag}>{tag}</span>)}</div></div></Reveal></section>

      <section id="skills" className="section skills-section"><div className="container"><Reveal className="section-heading"><div><div className="section-label">04 / TECHNICAL TOOLKIT</div><h2>The tools behind<br /><span>the work.</span></h2></div><p>Languages, frameworks, and tools<br />from my technical experience and projects.</p></Reveal><div className="skills-grid">{skills.map((group, index) => <Reveal className="skill-group" key={group.title}><span className="skill-number">0{index + 1}</span><h3>{group.title}</h3><div className="skill-items">{group.items.map(skill => <span key={skill}>{skill}</span>)}</div></Reveal>)}</div></div></section>

      <section id="education" className="section container"><Reveal className="section-heading"><div><div className="section-label">05 / EDUCATION</div><h2>A foundation<br /><span>in engineering.</span></h2></div><GraduationCap className="section-icon" size={36} /></Reveal><Reveal className="education-main"><div className="education-year">2023 — PRESENT<span>BACHELOR’S DEGREE</span></div><div><h3>Indian Institute of Technology Kanpur</h3><p>B.Tech · Electrical Engineering</p></div><div className="grade">7.0<span>CPI / 10</span></div></Reveal><div className="school-grid"><Reveal className="school"><span>2022 · CLASS XII / RBSE</span><h3>M.D. Sr. Sec. School, Chirawa</h3><p>93.20%</p></Reveal><Reveal className="school"><span>2020 · CLASS X / RBSE</span><h3>M.D. Sr. Sec. School, Chirawa</h3><p>90.17%</p></Reveal></div><Reveal className="coursework"><h3>Relevant coursework</h3><div className="tags">{courses.map(course => <span key={course}>{course}</span>)}</div></Reveal></section>

      <section id="achievements" className="section achievements-section"><div className="container"><Reveal className="section-heading"><div><div className="section-label">06 / BEYOND THE CODE</div><h2>Team spirit.<br /><span>On and off the field.</span></h2></div><p>Achievements and campus involvement<br />at IIT Kanpur.</p></Reveal><div className="achievements-grid"><Reveal className="achievement"><Trophy /><span>INFERNO ’24 · HOCKEY</span><h3>Second place.<br />Shared effort.</h3><p>Secured 2nd prize in Hockey at IIT Kanpur’s annual inter-pool sports championship.</p></Reveal><Reveal className="achievement"><span className="activity-symbol">↗</span><span>INFERNO ’24 · CRICKET</span><h3>Part of the game.</h3><p>Participated in Cricket at IIT Kanpur’s annual inter-pool sports championship.</p></Reveal><Reveal className="achievement"><span className="activity-symbol">✳</span><span>GALAXY ’24 · CULTURAL</span><h3>Representing the hall.</h3><p>Contributed to Galaxy ’24 events and represented the hall in the Galaxy Parade.</p></Reveal></div></div></section>

      <section id="contact" className="section container contact-section"><Reveal><div className="section-label">07 / LET’S CONNECT</div><h2>Have something<br /><span>worth building?</span></h2><p>For software engineering opportunities, project conversations,<br className="desktop-break" /> or a simple hello — get in touch.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight /></a><div className="contact-actions"><a className="button primary" href={`mailto:${profile.email}`}><Mail size={16} />Say hello<ArrowUpRight size={16} /></a><button className="button secondary" onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Email copied' : 'Copy email'}</button></div><div className="copy-feedback" role="status">{copied ? 'Email address copied to clipboard.' : copyError ? `Please copy the email address above: ${profile.email}` : ''}</div><Socials text /></Reveal><Reveal className="resume-panel"><div className="resume-icon"><ArrowDownToLine size={27} /></div><div className="section-label">THE COMPLETE PICTURE</div><h3>My experience.<br />In one document.</h3><p>Projects, technical skills, education,<br />and experience from my resume.</p><a href="/resume.pdf" download="Nitesh-Kumar-Resume.pdf" className="text-link">Download resume <ArrowDownToLine size={17} /></a><span className="pdf-label">PDF DOCUMENT</span></Reveal></section>
    </main>
    <footer className="container footer"><a className="brand" href="#" aria-label="Back to top">n<span>k</span><i>.</i></a><span>© {new Date().getFullYear()} Nitesh Kumar</span><span className="footer-note">Built with intention. Always learning.</span><a href="#main" className="back-top">Back to top<ArrowUpRight size={14} /></a></footer>
  </LazyMotion>
}

export default App
