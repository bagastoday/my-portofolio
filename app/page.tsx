'use client'

import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Zap, Code2, Database, Monitor, ArrowRight } from 'lucide-react'

/* ---------- ANIMATION VARIANTS ---------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
}

/* ---------- MAGNETIC BUTTON COMPONENT ---------- */
function MagneticButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x * 0.4);
    mouseY.set(y * 0.4);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Parallax effect for Background Text
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -500]);

  return (
    <main className="relative bg-[#FBFBFD] text-[#1D1D1F] overflow-x-hidden font-sans antialiased">
      {/* 1. PROGRESS BAR */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-indigo-600 z-[100] origin-left" />

      {/* 2. HEADER */}
      <header className="fixed top-0 w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-black/[0.03]">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-black tracking-tighter cursor-pointer"
        >
          BAGAS<span className="text-indigo-600">.</span>
        </motion.div>
        
        <nav className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          {['About', 'Projects', 'Contact'].map((item) => (
            <motion.a 
              whileHover={{ y: -2, color: '#000' }}
              key={item} href={`#${item.toLowerCase()}`} 
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <MagneticButton className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-lg">
          <Zap size={16} fill="currentColor" />
        </MagneticButton>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Parallax Background Text */}
        <motion.div 
          style={{ y: bgTextY }}
          className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
        >
          <h1 className="text-[35vw] font-black leading-none opacity-[0.03] text-black italic">
            BAGAS
          </h1>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between"
        >
          <div className="md:w-3/5">
            <motion.div variants={itemVariants} className="mb-8">
              <span className="px-5 py-2 rounded-full border border-indigo-100 text-[10px] font-black uppercase tracking-[0.3em] bg-indigo-50/50 text-indigo-600 inline-flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                Now Open for Commissions
              </span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-6xl md:text-[120px] font-black leading-[0.85] tracking-[ -0.05em] mb-12">
              BUILDING <br /> 
              <span className="bg-gradient-to-r from-indigo-600 via-rose-500 to-indigo-600 bg-clip-text text-transparent animate-shimmer">
                MODERN
              </span> <br />
              EXPERIENCE.
            </motion.h2>
          </div>

          <div className="md:w-1/4 mt-12 md:mt-0 flex flex-col items-start md:items-end">
            <motion.p variants={itemVariants} className="text-2xl font-bold leading-tight mb-10 text-gray-800 md:text-right">
              Bridging the gap <br /> between Design <br /> & Engineering.
            </motion.p>
            <motion.div variants={itemVariants}>
              <MagneticButton className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-widest bg-black text-white px-10 py-6 rounded-full hover:bg-indigo-600 transition-all shadow-2xl">
                Get In Touch <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 4. SKILLS SECTION */}
      <section id="about" className="py-40 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-20"
          >
            {[
              { icon: <Monitor />, title: 'Frontend Architecture', desc: 'React, Next.js, and high-end animations using Framer Motion.' },
              { icon: <Database />, title: 'Fullstack Systems', desc: 'Secure APIs, scalable databases, and serverless cloud solutions.' },
              { icon: <Code2 />, title: 'Code Performance', desc: 'Optimizing for speed, SEO, and flawless user experiences.' },
            ].map((skill, i) => (
              <motion.div key={i} variants={itemVariants} className="group space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  {skill.icon}
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest">{skill.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{skill.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. PROJECTS GALLERY */}
      <section id="projects" className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-32">
            <motion.p 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-6"
            >
              Case Studies
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter"
            >
              Selected digital works.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-40">
            {[
              { title: 'Nexus Finance', cat: 'Dashboard / 2024', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
              { title: 'Luxe Archive', cat: 'E-Commerce / 2024', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop' },
              { title: 'Cognitive AI', cat: 'SaaS / 2023', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop' },
              { title: 'Studio Mono', cat: 'Architecture / 2023', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop' },
            ].map((proj, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden mb-10 shadow-2xl">
                  <motion.img 
                    whileHover={{ scale: 1.1, rotate: -1 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    src={proj.img} 
                    alt={proj.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-3">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-600">{proj.cat}</p>
                    <h3 className="text-3xl font-bold tracking-tighter group-hover:translate-x-2 transition-transform duration-500">{proj.title}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer id="contact" className="py-48 px-6 bg-white border-t border-black/[0.02]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <h2 className="text-7xl md:text-[12vw] font-black tracking-[ -0.05em] leading-none uppercase">
              LET'S <span className="text-indigo-600 italic">TALK.</span>
            </h2>
            <div className="flex justify-center">
              <MagneticButton className="text-2xl md:text-5xl font-bold border-b-4 border-indigo-600 pb-4 hover:text-indigo-600 transition-colors">
                hello@bagas.dev
              </MagneticButton>
            </div>
          </motion.div>

          <div className="mt-60 flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-gray-100">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">
              © 2026 BAGAS — BUILT WITH NEXT.JS
            </div>
            <div className="flex gap-10">
              {[Github, Instagram, Linkedin].map((Icon, i) => (
                <motion.a 
                  key={i} href="#" 
                  whileHover={{ y: -5, color: '#4F46E5' }}
                  className="text-gray-400 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}