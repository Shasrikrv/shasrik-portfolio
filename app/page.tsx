"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight, Github, Linkedin, Mail,
  Code2, Brain, Server, Database, ShieldCheck,
  Terminal, Zap, Globe, ChevronRight, Cpu,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: "001",
    title: "AI Shopping Agent",
    link: "https://ai-shopping-agent-iota.vercel.app/login",
    stack: ["Next.js", "TypeScript", "Claude API", "Tailwind", "Vercel"],
    desc: "Multi-agent AI shopping assistant that fetches, filters, ranks, and explains product recommendations from natural-language queries.",
    bullets: ["AI filter, ranking & explanation agents", "Prompt caching and cost optimization", "Password-protected Vercel deployment"],
    power: 92,
  },
  {
    id: "002",
    title: "FoodieHub",
    link: "https://foodiehub-eight-snowy.vercel.app/",
    stack: ["Next.js", "PostgreSQL", "Supabase", "NextAuth", "Claude", "Cloudinary"],
    desc: "Full-stack social food platform with authentication, recipe sharing, media uploads, notifications, chat, and AI recipe suggestions.",
    bullets: ["AI recipe generation from image/text prompts", "JWT, Google OAuth, bcrypt auth", "Cloudinary media + Supabase DB"],
    power: 95,
  },
];

const skillGroups = [
  {
    category: "LANGUAGES",
    colorText: "text-cyan-400",
    colorBar: "from-cyan-500 to-cyan-300",
    colorGlow: "rgba(34,211,238,0.55)",
    skills: [
      { name: "TypeScript / JavaScript", level: 92 },
      { name: "Python", level: 85 },
      { name: "Java", level: 80 },
      { name: "SQL", level: 88 },
    ],
  },
  {
    category: "FRONTEND",
    colorText: "text-violet-400",
    colorBar: "from-violet-500 to-violet-300",
    colorGlow: "rgba(167,139,250,0.55)",
    skills: [
      { name: "React.js / Next.js", level: 94 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Redux", level: 82 },
      { name: "HTML5 / CSS3", level: 95 },
    ],
  },
  {
    category: "BACKEND",
    colorText: "text-emerald-400",
    colorBar: "from-emerald-500 to-emerald-300",
    colorGlow: "rgba(52,211,153,0.55)",
    skills: [
      { name: "Node.js / Express.js", level: 88 },
      { name: "REST APIs", level: 92 },
      { name: "Spring Boot", level: 75 },
    ],
  },
  {
    category: "AI & CLOUD",
    colorText: "text-orange-400",
    colorBar: "from-orange-500 to-orange-300",
    colorGlow: "rgba(251,146,60,0.55)",
    skills: [
      { name: "Anthropic Claude API", level: 90 },
      { name: "AI Agents & Prompt Eng.", level: 87 },
      { name: "Vercel / Cloudinary", level: 85 },
      { name: "PostgreSQL / MongoDB", level: 86 },
    ],
  },
];

const experience = [
  {
    idx: "03",
    role: "Full Stack Developer",
    company: "Zentrix IT Solutions",
    location: "Charlotte, NC · Remote",
    date: "May 2026 – Present",
    active: true,
    points: [
      "Develop scalable full-stack applications using React, Node.js, Java, Python, MySQL, and MongoDB.",
      "Design RESTful APIs, responsive interfaces, and optimized database architectures for secure, maintainable products.",
      "Build AI-powered applications independently using Anthropic Claude, LLM integrations, and intelligent agent workflows.",
    ],
  },
  {
    idx: "02",
    role: "UI/UX Engineer",
    company: "Invent Artificial LLC",
    location: "Irving, TX · Remote",
    date: "Mar 2024 – May 2026",
    active: false,
    points: [
      "Developed responsive interfaces using React.js, JavaScript, HTML5, CSS3, Redux, and Tailwind CSS.",
      "Integrated REST APIs with MySQL-backed applications and improved usability through iterative design.",
      "Collaborated with Agile teams to deliver user-centric solutions with reusable, maintainable UI components.",
    ],
  },
  {
    idx: "01",
    role: "Software Engineer",
    company: "Varma Soft Solutions",
    location: "Hyderabad, India",
    date: "Nov 2021 – Apr 2023",
    active: false,
    points: [
      "Designed healthcare management interfaces using React, Redux, JavaScript, HTML5, CSS3, and Tailwind CSS.",
      "Built reusable components with CRUD workflows, REST API integration, and client-side validation.",
      "Implemented scalable component-based architecture for reliable and maintainable applications.",
    ],
  },
];

const heroStats = [
  { label: "YRS EXP",      value: 4,   suffix: "+" },
  { label: "PROJECTS",     value: 12,  suffix: "+" },
  { label: "TECHNOLOGIES", value: 20,  suffix: "+" },
  { label: "COMMITS",      value: 500, suffix: "+" },
];

const heroSkills = [
  [Brain,       "AI Agents"],
  [Code2,       "React/Next"],
  [Server,      "Node.js"],
  [Database,    "SQL/NoSQL"],
  [ShieldCheck, "Auth"],
  [Globe,       "Cloud Deploy"],
] as const;

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useTyping(texts: string[], speed = 75) {
  const [display, setDisplay]     = useState("");
  const [tIdx, setTIdx]           = useState(0);
  const [cIdx, setCIdx]           = useState(0);
  const [deleting, setDeleting]   = useState(false);
  const [paused, setPaused]       = useState(false);

  useEffect(() => {
    if (paused) return;
    const cur = texts[tIdx];
    const delay = deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (!deleting) {
        if (cIdx < cur.length) {
          setDisplay(cur.slice(0, cIdx + 1));
          setCIdx(n => n + 1);
        } else {
          setPaused(true);
          setTimeout(() => { setPaused(false); setDeleting(true); }, 2000);
        }
      } else {
        if (cIdx > 0) {
          setDisplay(cur.slice(0, cIdx - 1));
          setCIdx(n => n - 1);
        } else {
          setDeleting(false);
          setTIdx(n => (n + 1) % texts.length);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [cIdx, deleting, tIdx, texts, speed, paused]);

  return display;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function HUDCorners() {
  return (
    <>
      <span className="hud-corner tl" />
      <span className="hud-corner tr" />
      <span className="hud-corner bl" />
      <span className="hud-corner br" />
    </>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const steps = 50;
    const inc = value / steps;
    let cur = 0;
    const id = setInterval(() => {
      cur += inc;
      if (cur >= value) { setCount(value); clearInterval(id); }
      else setCount(Math.floor(cur));
    }, 1400 / steps);
    return () => clearInterval(id);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function SkillBar({
  name, level, colorBar, colorGlow,
}: { name: string; level: number; colorBar: string; colorGlow: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-mono text-gray-500 tracking-wider">{name}</span>
        <span className="text-xs font-mono text-cyan-400/80">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorBar}`}
          style={{ boxShadow: `0 0 8px ${colorGlow}` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="flex items-center gap-4 mb-10"
    >
      <span className="text-xs font-mono text-white/10 select-none">{index}</span>
      <span className="h-px flex-1 bg-white/[0.06]" />
      <h2 className="font-display text-2xl md:text-3xl font-black tracking-widest gradient-text">{title}</h2>
      <span className="h-px flex-1 bg-white/[0.06]" />
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const typed = useTyping([
    "AI Software Engineer",
    "Full Stack Developer",
    "LLM Integration Specialist",
    "React & Next.js Expert",
  ]);

  return (
    <main className="min-h-screen bg-game-bg text-white overflow-x-hidden font-sans">
      {/* Backgrounds */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      <div className="scanlines fixed inset-0 pointer-events-none z-10" />
      <div className="fixed -left-64 top-10 w-[700px] h-[700px] rounded-full bg-cyan-500/[0.04] blur-[160px] pointer-events-none z-0" />
      <div className="fixed -right-64 top-[500px] w-[600px] h-[600px] rounded-full bg-violet-600/[0.06] blur-[160px] pointer-events-none z-0" />

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-game-bg/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-display font-bold text-sm tracking-[0.18em] text-white select-none">
            <span className="neon-cyan">&lt;</span>
            {" "}SHASRIK REDDY VEERLAPALLY{" "}
            <span className="neon-cyan">/&gt;</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {["ABOUT", "EXPERIENCE", "PROJECTS", "SKILLS", "CONTACT"].map(s => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className="px-3 py-1.5 text-[11px] font-mono text-gray-500 hover:text-cyan-400 tracking-widest rounded hover:bg-cyan-500/[0.06] transition-all duration-200"
              >
                [{s}]
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest">ONLINE</span>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-24 min-h-screen flex items-center">
        <div className="w-full grid md:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-cyan-400/60" />
              <span className="text-[10px] font-mono text-cyan-400/80 tracking-[0.35em] uppercase">
                Player Profile
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-[4.5rem] font-black leading-[1.07] tracking-tight mb-5"
            >
              Building
              <br />
              <span className="neon-cyan">AI&#8209;Powered</span>
              <br />
              Web Apps.
            </motion.h1>

            <motion.div variants={fadeUp} className="h-9 flex items-center gap-2 mb-6">
              <Terminal size={14} className="text-cyan-500/50 flex-shrink-0" />
              <span className="font-mono text-gray-300 text-sm">{typed}</span>
              <span className="w-[2px] h-5 bg-cyan-400 cursor-blink" />
            </motion.div>

            <motion.p variants={fadeUp} className="text-gray-400 leading-7 text-[0.95rem] mb-8 max-w-md">
              I build production-ready apps, AI agents, LLM integrations, scalable APIs, and modern UX using React, Next.js, Node.js, Python, and Anthropic Claude.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-7">
              <a href="#projects" className="game-btn-primary">
                VIEW PROJECTS <ArrowUpRight size={13} />
              </a>
              <a href="mailto:shasrikveerlaplly21@gmail.com" className="game-btn-secondary">
                CONTACT ME
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-3">
              <a href="https://www.linkedin.com/in/shasrik-reddy-veerlapally-a71349360/" target="_blank" className="icon-btn"><Linkedin size={17} /></a>
              <a href="mailto:shasrikveerlaplly21@gmail.com" className="icon-btn"><Mail size={17} /></a>
              <a href="https://github.com/Shasrikrv" target="_blank" className="icon-btn"><Github size={17} /></a>
            </motion.div>
          </motion.div>

          {/* Right — stats card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="animate-float"
          >
            <div className="game-card p-8">
              <HUDCorners />

              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono text-cyan-400/70 tracking-[0.3em]">SYSTEM STATUS</span>
                <span className="text-[10px] font-mono text-emerald-400">◉ READY</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-7">
                {heroStats.map(s => (
                  <div key={s.label} className="stat-tile">
                    <div className="font-display text-3xl font-black neon-cyan leading-none">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-[9px] font-mono text-gray-600 tracking-widest mt-2">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.05] pt-6">
                <p className="text-[9px] font-mono text-gray-600 tracking-widest mb-3">EQUIPPED SKILLS</p>
                <div className="grid grid-cols-3 gap-2">
                  {heroSkills.map(([Icon, label]) => (
                    <motion.div
                      key={label}
                      whileHover={{ scale: 1.06, borderColor: "rgba(34,211,238,0.35)" }}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] cursor-default"
                    >
                      <Icon size={15} className="text-cyan-400/70" />
                      <span className="text-[9px] font-mono text-gray-500 text-center leading-tight">{label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <SectionHeader index="01" title="ABOUT" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="game-card p-8"
        >
          <HUDCorners />
          <div className="space-y-5 text-gray-400 leading-7 text-[0.95rem]">
            <p className="flex gap-3">
              <ChevronRight size={15} className="text-cyan-500/40 mt-0.5 flex-shrink-0" />
              I am an AI Software Engineer and Full Stack Developer focused on building scalable, user-focused applications with modern web technologies and intelligent AI workflows. My experience spans frontend engineering, backend API development, database design, authentication, cloud deployment, and LLM-powered product development.
            </p>
            <p className="flex gap-3">
              <ChevronRight size={15} className="text-cyan-500/40 mt-0.5 flex-shrink-0" />
              I enjoy turning ideas into production-ready software by combining strong engineering fundamentals with practical AI integration using Anthropic Claude, agentic workflows, prompt engineering, and structured AI outputs.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <SectionHeader index="02" title="EXPERIENCE" />
        <div className="space-y-4">
          {experience.map((e, i) => (
            <motion.div
              key={e.company}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { duration: 0.55, delay: i * 0.08 } } }}
            >
              <div className="game-card p-7">
                <HUDCorners />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div className="flex items-start gap-4">
                    <span className="font-display text-xl font-black text-white/[0.08] leading-none mt-0.5 select-none">
                      {e.idx}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold tracking-wide text-white">{e.role}</h3>
                      <p className="text-cyan-400/80 text-xs font-mono mt-1">{e.company} · {e.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 pl-10 sm:pl-0">
                    <span className={e.active ? "badge-active" : "badge-done"}>
                      {e.active ? "◉ ACTIVE" : "◎ COMPLETED"}
                    </span>
                    <span className="text-[11px] font-mono text-gray-600">{e.date}</span>
                  </div>
                </div>
                <ul className="space-y-2 pl-10">
                  {e.points.map(p => (
                    <li key={p} className="flex items-start gap-2 text-gray-500 text-sm leading-6">
                      <ChevronRight size={13} className="text-cyan-500/30 mt-0.5 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <SectionHeader index="03" title="FEATURED PROJECTS" />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { duration: 0.55, delay: i * 0.1 } } }}
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
                className="game-card p-7 flex flex-col h-full"
              >
                <HUDCorners />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-white/10 select-none">PROJECT_{p.id}</span>
                  <span className="text-[10px] font-mono text-emerald-400 border border-emerald-400/20 px-2 py-0.5 rounded bg-emerald-400/[0.06]">
                    ◉ DEPLOYED
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold tracking-wide mb-3 text-white">{p.title}</h3>

                {/* Power bar */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[9px] font-mono text-gray-600 tracking-widest">PWR</span>
                  <div className="flex-1 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300"
                      style={{ boxShadow: "0 0 8px rgba(34,211,238,0.5)" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.power}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400">{p.power}</span>
                </div>

                <p className="text-gray-500 text-sm leading-6 mb-5">{p.desc}</p>

                <ul className="space-y-1.5 mb-6 flex-1">
                  {p.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2 text-xs text-gray-600">
                      <ChevronRight size={11} className="text-cyan-500/30 mt-0.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.stack.map(t => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-cyan-400/60 border border-cyan-500/[0.15] px-2 py-0.5 rounded bg-cyan-500/[0.05]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a href={p.link} target="_blank" className="game-btn-primary w-full justify-center">
                  LAUNCH <ArrowUpRight size={13} />
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <SectionHeader index="04" title="TECHNICAL SKILLS" />
        <div className="grid md:grid-cols-2 gap-5">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.category}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { duration: 0.55, delay: i * 0.08 } } }}
              className="game-card p-7"
            >
              <HUDCorners />
              <div className="flex items-center gap-2 mb-5">
                <Cpu size={13} className={g.colorText} />
                <span className={`text-[10px] font-mono tracking-[0.25em] ${g.colorText}`}>{g.category}</span>
              </div>
              {g.skills.map(s => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  colorBar={g.colorBar}
                  colorGlow={g.colorGlow}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ────────────────────────────────────────────────────── */}
      <section id="education" className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <SectionHeader index="05" title="EDUCATION" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="game-card p-8"
        >
          <HUDCorners />
          <div className="flex items-start gap-4">
            <Zap size={16} className="text-cyan-400/60 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-display text-base font-bold tracking-wide text-white">
                Master of Science in Computer Science
              </h3>
              <p className="text-cyan-400/70 font-mono text-xs mt-2">New York Institute of Technology</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <SectionHeader index="06" title="CONTACT" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="game-card p-8"
        >
          <HUDCorners />
          <p className="text-[11px] font-mono text-gray-600 mb-6 tracking-wider">
            &gt; Open to AI Software Engineer, Full Stack Developer, and Software Engineer roles.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:shasrikveerlaplly21@gmail.com" className="game-btn-primary">
              <Mail size={13} /> EMAIL ME
            </a>
            <a href="https://www.linkedin.com/in/shasrik-reddy-veerlapally-a71349360/" target="_blank" className="game-btn-secondary">
              <Linkedin size={13} /> LINKEDIN
            </a>
            <a href="https://ai-shopping-agent-iota.vercel.app/login" target="_blank" className="game-btn-secondary">
              <Zap size={13} /> AI SHOPPING AGENT
            </a>
            <a href="https://foodiehub-eight-snowy.vercel.app/" target="_blank" className="game-btn-secondary">
              <Globe size={13} /> FOODIEHUB
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="relative z-20 py-8 text-center border-t border-white/[0.05]">
        <span className="text-[10px] font-mono text-white/[0.12] tracking-[0.25em]">
          &lt; DESIGNED &amp; DEVELOPED BY SHASRIK REDDY VEERLAPALLY /&gt;
        </span>
      </footer>
    </main>
  );
}
