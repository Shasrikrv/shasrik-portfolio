"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight, Github, Linkedin, Mail,
  Terminal, ChevronRight, MapPin, Calendar,
  ExternalLink, GraduationCap, User, Target, Lightbulb,
  BookOpen, Send, Code2,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "AI Shopping Agent",
    link: "https://ai-shopping-agent-iota.vercel.app/login",
    github: "https://github.com/Shasrikrv",
    stack: ["Next.js", "TypeScript", "Claude API", "Tailwind", "Vercel"],
    desc: "Multi-agent AI shopping assistant that fetches, filters, ranks, and explains product recommendations from natural-language queries.",
    bullets: [
      "AI filter, ranking & explanation agents",
      "Prompt caching and cost optimization",
      "Password-protected Vercel deployment",
    ],
  },
  {
    title: "FoodieHub",
    link: "https://foodiehub-eight-snowy.vercel.app/",
    github: "https://github.com/Shasrikrv",
    stack: ["Next.js", "PostgreSQL", "Supabase", "NextAuth", "Claude", "Cloudinary"],
    desc: "Full-stack social food platform with authentication, recipe sharing, media uploads, notifications, chat, and AI recipe suggestions.",
    bullets: [
      "AI recipe generation from image/text prompts",
      "JWT, Google OAuth, bcrypt auth",
      "Cloudinary media + Supabase DB",
    ],
  },
];

type Color = "blue" | "violet" | "emerald" | "orange" | "pink";

const skillCategories: { label: string; color: Color; items: string[] }[] = [
  {
    label: "Languages",
    color: "blue",
    items: ["TypeScript", "JavaScript", "Python", "Java", "SQL"],
  },
  {
    label: "Frontend",
    color: "violet",
    items: ["React.js", "Next.js", "Tailwind CSS", "Redux", "HTML5", "CSS3"],
  },
  {
    label: "Backend",
    color: "emerald",
    items: ["Node.js", "Express.js", "Spring Boot", "REST APIs"],
  },
  {
    label: "Database",
    color: "orange",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"],
  },
  {
    label: "AI & Cloud",
    color: "pink",
    items: ["Claude API", "AI Agents", "Prompt Engineering", "Vercel", "Cloudinary", "Git"],
  },
];

const experience = [
  {
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

const aboutCards: { icon: React.ElementType; title: string; color: Color; items: string[] }[] = [
  {
    icon: User,
    title: "Who I Am",
    color: "blue",
    items: ["AI Software Engineer", "Full Stack Developer", "Problem Solver & Innovator"],
  },
  {
    icon: Code2,
    title: "What I Do",
    color: "violet",
    items: ["Build production-ready web apps", "Integrate AI & LLM workflows", "Design scalable APIs & systems"],
  },
  {
    icon: Target,
    title: "My Goals",
    color: "emerald",
    items: ["Build impactful AI products", "Solve real-world problems", "Continuously learn & grow"],
  },
  {
    icon: Lightbulb,
    title: "My Philosophy",
    color: "orange",
    items: ["Clean, maintainable code", "User-first design thinking", "Ship fast, iterate often"],
  },
];

const heroStats = [
  { label: "Years Exp",    value: 4,   suffix: "+" },
  { label: "Projects",     value: 12,  suffix: "+" },
  { label: "Technologies", value: 20,  suffix: "+" },
  { label: "Commits",      value: 500, suffix: "+" },
];

// ─── Color map ───────────────────────────────────────────────────────────────

const colorMap: Record<Color, { badge: string; dot: string; card: string; icon: string }> = {
  blue: {
    badge: "bg-blue-500/[0.1] text-blue-400 border-blue-500/20",
    dot:   "bg-blue-500",
    card:  "border-blue-500/25 bg-blue-500/[0.04]",
    icon:  "text-blue-400 bg-blue-500/[0.1]",
  },
  violet: {
    badge: "bg-violet-500/[0.1] text-violet-400 border-violet-500/20",
    dot:   "bg-violet-500",
    card:  "border-violet-500/25 bg-violet-500/[0.04]",
    icon:  "text-violet-400 bg-violet-500/[0.1]",
  },
  emerald: {
    badge: "bg-emerald-500/[0.1] text-emerald-400 border-emerald-500/20",
    dot:   "bg-emerald-500",
    card:  "border-emerald-500/25 bg-emerald-500/[0.04]",
    icon:  "text-emerald-400 bg-emerald-500/[0.1]",
  },
  orange: {
    badge: "bg-orange-500/[0.1] text-orange-400 border-orange-500/20",
    dot:   "bg-orange-500",
    card:  "border-orange-500/25 bg-orange-500/[0.04]",
    icon:  "text-orange-400 bg-orange-500/[0.1]",
  },
  pink: {
    badge: "bg-pink-500/[0.1] text-pink-400 border-pink-500/20",
    dot:   "bg-pink-500",
    card:  "border-pink-500/25 bg-pink-500/[0.04]",
    icon:  "text-pink-400 bg-pink-500/[0.1]",
  },
};

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useTyping(texts: string[], speed = 75) {
  const [display, setDisplay]   = useState("");
  const [tIdx, setTIdx]         = useState(0);
  const [cIdx, setCIdx]         = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused]     = useState(false);

  useEffect(() => {
    if (paused) return;
    const cur = texts[tIdx];
    const delay = deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (!deleting) {
        if (cIdx < cur.length) {
          setDisplay(cur.slice(0, cIdx + 1));
          setCIdx((n) => n + 1);
        } else {
          setPaused(true);
          setTimeout(() => { setPaused(false); setDeleting(true); }, 2000);
        }
      } else {
        if (cIdx > 0) {
          setDisplay(cur.slice(0, cIdx - 1));
          setCIdx((n) => n - 1);
        } else {
          setDeleting(false);
          setTIdx((n) => (n + 1) % texts.length);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [cIdx, deleting, tIdx, texts, speed, paused]);

  return display;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const steps = 50;
    const inc   = value / steps;
    let cur     = 0;
    const id    = setInterval(() => {
      cur += inc;
      if (cur >= value) { setCount(value); clearInterval(id); }
      else setCount(Math.floor(cur));
    }, 1400 / steps);
    return () => clearInterval(id);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="text-center mb-14"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
      <p className="text-slate-400 text-sm max-w-md mx-auto">{subtitle}</p>
      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-blue-500/40" />
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="h-px w-12 bg-blue-500/40" />
      </div>
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
    <main className="min-h-screen bg-[#070d1e] text-white overflow-x-hidden">

      {/* Ambient background orbs */}
      <div className="fixed -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/[0.08] blur-[130px] pointer-events-none z-0" />
      <div className="fixed top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-violet-600/[0.07] blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-1/3 w-[350px] h-[350px] rounded-full bg-cyan-500/[0.05] blur-[100px] pointer-events-none z-0" />

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#070d1e]/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-bold text-white text-sm tracking-wide">
            &lt;<span className="text-blue-400">Shasrik</span> /&gt;
          </a>

          <div className="hidden md:flex items-center gap-7">
            {["About", "Experience", "Projects", "Skills", "Contact"].map((s) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
              >
                {s}
              </a>
            ))}
          </div>

          <a
            href="mailto:shasrikveerlaplly21@gmail.com"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors duration-200"
          >
            <Mail size={14} /> Email Me
          </a>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 min-h-screen flex items-center">
        <div className="w-full grid md:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-blue-400 text-sm font-medium mb-3 tracking-wide">
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl font-bold leading-tight mb-4 font-display"
            >
              Shasrik Reddy
              <br />
              <span className="text-blue-400">Veerlapally</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6 h-8">
              <Terminal size={14} className="text-slate-500 flex-shrink-0" />
              <span className="text-slate-300 text-sm font-mono">{typed}</span>
              <span className="w-0.5 h-5 bg-blue-400 cursor-blink flex-shrink-0" />
            </motion.div>

            <motion.p variants={fadeUp} className="text-slate-400 leading-7 mb-8 max-w-md text-sm">
              I build production-ready apps, AI agents, LLM integrations, scalable APIs, and modern UX
              using React, Next.js, Node.js, Python, and Anthropic Claude.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all duration-200"
              >
                View Projects <ArrowUpRight size={14} />
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 rounded-lg border border-white/[0.15] hover:border-white/30 text-slate-300 hover:text-white text-sm font-medium transition-all duration-200"
              >
                Contact Me
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-3">
              <a
                href="https://github.com/Shasrikrv"
                target="_blank"
                className="p-2.5 rounded-lg border border-white/[0.1] text-slate-400 hover:text-white hover:border-white/25 transition-all duration-200"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/shasrik-reddy-veerlapally-a71349360/"
                target="_blank"
                className="p-2.5 rounded-lg border border-white/[0.1] text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:shasrikveerlaplly21@gmail.com"
                className="p-2.5 rounded-lg border border-white/[0.1] text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200"
              >
                <Mail size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right — avatar + decorative circles + stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Avatar with floating decorative orbs */}
            <div className="relative flex items-center justify-center w-64 h-64">
              {/* Decorative circles */}
              <div className="absolute top-0 right-4 w-16 h-16 rounded-full bg-cyan-400/[0.18] blur-md animate-float" style={{ animationDelay: "0s" }} />
              <div className="absolute bottom-2 left-2 w-14 h-14 rounded-full bg-purple-500/[0.18] blur-md animate-float" style={{ animationDelay: "1.2s" }} />
              <div className="absolute top-1/2 right-0 w-9 h-9 rounded-full bg-emerald-400/[0.22] blur-sm animate-float" style={{ animationDelay: "2s" }} />
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-orange-400/[0.18] blur-sm animate-float" style={{ animationDelay: "1.5s" }} />
              <div className="absolute bottom-6 right-8 w-10 h-10 rounded-full bg-pink-400/[0.18] blur-sm animate-float" style={{ animationDelay: "0.6s" }} />
              <div className="absolute -bottom-2 right-2 w-7 h-7 rounded-full bg-yellow-400/[0.2] blur-sm animate-float" style={{ animationDelay: "2.5s" }} />

              {/* Avatar circle */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-violet-600 flex items-center justify-center relative z-10 shadow-[0_0_60px_rgba(59,130,246,0.35)]">
                <span className="text-4xl font-bold text-white tracking-wider font-display">SRV</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-3 w-full">
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 text-center hover:border-blue-500/20 transition-colors duration-200"
                >
                  <div className="text-2xl font-bold text-blue-400 leading-none mb-1">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <SectionHeader
          title="About Me"
          subtitle="A passionate developer focused on building impactful products with modern technologies and AI."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="portfolio-card p-8 mb-8"
        >
          <div className="space-y-4 text-slate-400 leading-7 text-sm">
            <p>
              I am an AI Software Engineer and Full Stack Developer focused on building scalable, user-focused
              applications with modern web technologies and intelligent AI workflows. My experience spans frontend
              engineering, backend API development, database design, authentication, cloud deployment, and
              LLM-powered product development.
            </p>
            <p>
              I enjoy turning ideas into production-ready software by combining strong engineering fundamentals
              with practical AI integration using Anthropic Claude, agentic workflows, prompt engineering, and
              structured AI outputs.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-5"
        >
          {aboutCards.map((card) => {
            const { icon: Icon, title, color, items } = card;
            const c = colorMap[color];
            return (
              <motion.div
                key={title}
                variants={fadeUp}
                className={`portfolio-card p-6 border ${c.card}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${c.icon}`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold text-white mb-3">{title}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-400 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <SectionHeader
          title="Technical Skills"
          subtitle="A modern tech stack for modern challenges — built to scale efficiently."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="space-y-4"
        >
          {skillCategories.map((cat) => {
            const c = colorMap[cat.color];
            return (
              <motion.div key={cat.label} variants={fadeUp} className="portfolio-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                  <span className="text-sm font-medium text-white">{cat.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.15 }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-default ${c.badge}`}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <SectionHeader
          title="Experience"
          subtitle="My professional journey building products across different companies and roles."
        />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-white/[0.07]" />

          <div className="space-y-6 pl-14">
            {experience.map((e, i) => (
              <motion.div
                key={e.company}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } },
                }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[2.35rem] top-6 w-3 h-3 rounded-full border-2 ${
                    e.active
                      ? "bg-blue-500 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                      : "bg-slate-700 border-slate-600"
                  }`}
                />

                <div className="portfolio-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-white text-base">{e.role}</h3>
                      <p className="text-blue-400 text-sm mt-0.5">{e.company}</p>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <span className="flex items-center gap-1 text-slate-500 text-xs">
                          <MapPin size={11} /> {e.location}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500 text-xs">
                          <Calendar size={11} /> {e.date}
                        </span>
                      </div>
                    </div>
                    {e.active && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/[0.1] text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {e.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-slate-400 text-sm leading-6">
                        <ChevronRight size={12} className="text-blue-500/40 mt-1 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <SectionHeader
          title="Featured Projects"
          subtitle="A selection of my most impactful work — built with modern technologies and AI integrations."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } },
              }}
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="portfolio-card p-7 flex flex-col h-full"
              >
                {/* Window chrome */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400/60" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <span className="w-3 h-3 rounded-full bg-green-400/60" />
                  </div>
                  <span className="text-xs font-medium bg-emerald-500/[0.1] text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                  </span>
                </div>

                <h3 className="font-bold text-white text-xl mb-3">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-6 mb-4">{p.desc}</p>

                <ul className="space-y-1.5 mb-5 flex-1">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-slate-500 text-xs leading-5">
                      <ChevronRight size={11} className="text-blue-500/40 mt-0.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-md bg-blue-500/[0.08] text-blue-400 border border-blue-500/[0.15]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={p.link}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors duration-200"
                  >
                    <ExternalLink size={13} /> Live Demo
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    className="px-4 flex items-center justify-center rounded-lg border border-white/[0.1] text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ────────────────────────────────────────────────────── */}
      <section id="education" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <SectionHeader
          title="Education"
          subtitle="Academic foundations that underpin my technical expertise."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="portfolio-card p-7"
        >
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/[0.1] text-blue-400 flex items-center justify-center flex-shrink-0">
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">
                Master of Science in Computer Science
              </h3>
              <p className="text-blue-400 text-sm mt-1.5">New York Institute of Technology</p>
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-2">
                <BookOpen size={11} /> Graduate Program
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <SectionHeader
          title="Let's Collaborate"
          subtitle="Open to AI Software Engineer, Full Stack Developer, and Software Engineer roles."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left — contact info */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="portfolio-card p-8 flex flex-col gap-6"
          >
            <div>
              <h3 className="font-semibold text-white text-lg mb-2">Let&apos;s Connect</h3>
              <p className="text-slate-400 text-sm leading-6">
                I&apos;m currently open to new opportunities and would love to hear about your project or role.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:shasrikveerlaplly21@gmail.com"
                className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.07] hover:border-blue-500/30 hover:bg-blue-500/[0.04] transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/[0.1] text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/[0.15]">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-white text-sm">shasrikveerlaplly21@gmail.com</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/shasrik-reddy-veerlapally-a71349360/"
                target="_blank"
                className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.07] hover:border-blue-500/30 hover:bg-blue-500/[0.04] transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/[0.1] text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/[0.15]">
                  <Linkedin size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">LinkedIn</p>
                  <p className="text-white text-sm">Shasrik Reddy Veerlapally</p>
                </div>
              </a>

              <a
                href="https://github.com/Shasrikrv"
                target="_blank"
                className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.03] transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.05] text-slate-400 flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.08]">
                  <Github size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">GitHub</p>
                  <p className="text-white text-sm">github.com/Shasrikrv</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
            }}
            className="portfolio-card p-8"
          >
            <h3 className="font-semibold text-white text-lg mb-6">Send a Message</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "mailto:shasrikveerlaplly21@gmail.com";
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.04] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.04] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.04] transition-all duration-200 resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors duration-200"
              >
                <Send size={14} /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 py-8 text-center border-t border-white/[0.05]">
        <p className="text-slate-600 text-xs">
          Designed &amp; Developed by{" "}
          <span className="text-slate-400">Shasrik Reddy Veerlapally</span>
        </p>
      </footer>
    </main>
  );
}
