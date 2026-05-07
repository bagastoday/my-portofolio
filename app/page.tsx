'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Database,
  Github,
  Globe,
  Instagram,
  LayoutDashboard,
  Linkedin,
  Mail,
  Sparkles,
} from 'lucide-react'

/* ---------- Reusable bits ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease:'easeOut' },
  }),
}

function SectionHeading({
  eyebrow,
  title,
  accent = 'from-purple-400 to-cyan-400',
  align = 'center',
}: {
  eyebrow: string
  title: React.ReactNode
  accent?: string
  align?: 'center' | 'left'
}) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`inline-block text-xs font-medium uppercase tracking-[0.3em] bg-gradient-to-r ${accent} bg-clip-text text-transparent mb-5`}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold tracking-tight"
      >
        {title}
      </motion.h2>
    </div>
  )
}

function GlowCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`group relative rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent transition duration-500 hover:from-purple-400/40 hover:via-pink-400/20 hover:to-cyan-400/30 ${className}`}
    >
      <div className="relative h-full w-full rounded-3xl bg-zinc-950/70 backdrop-blur-xl overflow-hidden">
        {/* shimmer */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute -inset-px bg-[radial-gradient(400px_circle_at_var(--x,50%)_var(--y,50%),rgba(168,85,247,0.15),transparent_40%)]" />
        </div>
        {children}
      </div>
    </div>
  )
}

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

/* ---------- Page ---------- */

export default function Home() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 })

  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const skills = [
    {
      icon: <Code2 size={26} />,
      title: 'Frontend Development',
      desc: 'Building fast, responsive, and elegant interfaces using modern technologies.',
      accent: 'from-purple-400 to-pink-400',
    },
    {
      icon: <Database size={26} />,
      title: 'Backend & Database',
      desc: 'Creating scalable backend systems with Supabase and PostgreSQL.',
      accent: 'from-cyan-400 to-blue-400',
    },
    {
      icon: <LayoutDashboard size={26} />,
      title: 'Modern UI/UX',
      desc: 'Designing premium user experiences with clean and modern aesthetics.',
      accent: 'from-pink-400 to-purple-400',
    },
  ]

  const projects = [
    {
      title: 'Finance Dashboard',
      category: 'Web App',
      desc: 'Modern dashboard with analytics and financial management.',
      gradient: 'from-purple-500/40 via-fuchsia-500/20 to-cyan-500/30',
    },
    {
      title: 'Company Profile',
      category: 'Landing Page',
      desc: 'Elegant company website with premium business branding.',
      gradient: 'from-cyan-500/40 via-blue-500/20 to-purple-500/30',
    },
    {
      title: 'Portfolio Website',
      category: 'Personal Branding',
      desc: 'Creative personal portfolio with modern animations.',
      gradient: 'from-pink-500/40 via-purple-500/20 to-cyan-500/30',
    },
  ]

  return (
    <main className="relative bg-[#070709] text-white overflow-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
      />

      {/* ===== Layered background ===== */}
      <div className="fixed inset-0 -z-10">
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 75%)',
          }}
        />
        {/* floating orbs */}
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[15%] w-[520px] h-[520px] rounded-full bg-purple-600/25 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[40%] right-[10%] w-[480px] h-[480px] rounded-full bg-cyan-500/20 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-10%] left-[35%] w-[600px] h-[600px] rounded-full bg-pink-500/15 blur-[160px]"
        />
        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent,#070709_70%)]" />
      </div>

      {/* ===== NAVBAR ===== */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96%,1100px)]">
        <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.35)]">
          <div className="px-5 py-3 flex items-center justify-between gap-4">
            <a href="#" className="flex items-center gap-2 group">
              <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/30">
                <Sparkles size={14} className="text-white" />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Bagas<span className="text-purple-400">.</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-1 text-sm">
              {navLinks.map((l) => {
                const isActive = active === l.href.slice(1)
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className={`relative px-4 py-2 rounded-full transition ${
                      isActive
                        ? 'text-white'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                )
              })}
            </nav>

            <a
              href="#contact"
              className="group relative inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition"
            >
              Hire Me
              <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32">
        <div className="text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <Globe size={14} className="text-zinc-400" />
            <span className="text-xs md:text-sm text-zinc-300">
              Available for freelance work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8"
          >
            Creative
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text [background-size:200%_auto] animate-[shimmer_6s_linear_infinite]">
              Fullstack Developer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="text-zinc-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
          >
            I create modern, elegant, and high-performance digital experiences
            with Next.js, Tailwind CSS, and Supabase.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 font-semibold text-white overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 blur-xl opacity-40 group-hover:opacity-70 transition" />
              <span className="relative">Explore Portfolio</span>
              <ArrowRight size={18} className="relative transition group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-3.5 font-medium hover:bg-white/10 hover:border-white/20 transition"
            >
              Contact Me
            </a>
          </motion.div>

          {/* hero stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {[
              { k: '50+', v: 'Projects' },
              { k: '4+', v: 'Years' },
              { k: '∞', v: 'Coffee' },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur px-4 py-5"
              >
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  {s.k}
                </p>
                <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">
                  {s.v}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-5">
              About Me
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-8">
              Building modern websites with{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                premium user experience.
              </span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-8">
              Passionate developer focused on creating beautiful, scalable, and
              modern web applications that combine clean design with powerful
              functionality.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <GlowCard>
              <div className="p-10 space-y-8">
                {[
                  { label: 'Experience', value: 'Fullstack Development' },
                  { label: 'Tech Stack', value: 'Next.js • Tailwind • Supabase' },
                  { label: 'Focus', value: 'Elegant Modern Interfaces' },
                ].map((row) => (
                  <div key={row.label} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
                      {row.label}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                      {row.value}
                    </h3>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section id="skills" className="max-w-7xl mx-auto px-6 py-32">
        <SectionHeading
          eyebrow="Skills"
          title="What I Can Build"
          accent="from-cyan-400 to-blue-400"
        />

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <GlowCard className="h-full">
                <div className="p-8 md:p-10 h-full">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${skill.accent} text-white shadow-lg mb-6`}
                  >
                    {skill.icon}
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-3">
                    {skill.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">{skill.desc}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-5">
              Portfolio
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Featured Projects
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm hover:bg-white/10 hover:border-white/20 transition"
          >
            View All <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <GlowCard>
                <div className="relative h-56 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                  />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center rounded-full border border-white/15 bg-black/30 backdrop-blur px-3 py-1 text-xs text-white/80">
                    {project.category}
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-semibold tracking-tight mb-3">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {project.desc}
                  </p>
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-300 hover:text-white transition">
                    View Project
                    <ArrowUpRight
                      size={16}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative rounded-[36px] p-[1px] bg-gradient-to-br from-purple-500/60 via-pink-500/30 to-cyan-500/60"
        >
          <div className="absolute -inset-10 bg-gradient-to-r from-purple-500/20 via-pink-500/10 to-cyan-500/20 blur-3xl -z-10" />
          <div className="rounded-[35px] bg-zinc-950/80 backdrop-blur-2xl px-8 md:px-16 py-20 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-5">
              Contact
            </p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[1] mb-8">
              Let’s Create
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
                Something Amazing
              </span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-8 max-w-2xl mx-auto mb-10">
              Open for freelance projects, collaborations, startup partnerships,
              and modern digital product development.
            </p>
            <a
              href="mailto:hello@bagas.dev"
              className="group relative inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-semibold text-white overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500" />
              <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 blur-xl opacity-50 group-hover:opacity-80 transition" />
              <span className="relative">Start a Project</span>
              <ArrowRight size={18} className="relative transition group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative border-t border-white/5 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
              <Sparkles size={14} className="text-white" />
            </span>
            <h3 className="text-lg font-semibold tracking-tight">
              Bagas<span className="text-purple-400">.</span>
            </h3>
          </div>

          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Bagas. Crafted with care.
          </p>

          <div className="flex items-center gap-2">
            {[Github, Instagram, Linkedin, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
