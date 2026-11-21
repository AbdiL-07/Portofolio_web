import { useState } from 'react';
import { Check, Copy, Globe, Mail, MapPin, Phone, Users } from 'lucide-react';
import { CollaborationModal } from './components/CollaborationModal';
import { ProjectModal } from './components/ProjectModal';
import {
  PORTRAIT_IMAGE_URL,
  PROJECTS,
  SKILLS,
  WORK_PROCESS,
  type ProjectItem,
  type SkillItem,
} from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);
  const [activeStep, setActiveStep] = useState<string>('01');
  const [isCollabOpen, setIsCollabOpen] = useState(false);
  const [collabSubject, setCollabSubject] = useState('');
  const [portraitFailed, setPortraitFailed] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const openCollab = (subject = '') => {
    setCollabSubject(subject);
    setIsCollabOpen(true);
  };

  const handleCopy = async (e: React.MouseEvent, value: string, field: 'email' | 'phone') => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Ignore clipboard failures
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0A0A0A] text-zinc-100 antialiased min-h-screen selection:bg-[#D91E2A] selection:text-white">
      {/* Top Utility Bar */}
      <header className="w-full border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Stacked Role Indicator */}
          <a href="#top" className="flex flex-col tracking-wider shrink-0">
            <span className="text-[11px] font-bold text-[#D91E2A] uppercase tracking-widest leading-tight whitespace-nowrap">
              Informatics Student
            </span>
            <span className="text-[12px] font-semibold text-neutral-200 tracking-wider uppercase leading-tight whitespace-nowrap">
              Programmer &amp; Creator
            </span>
          </a>

          {/* Navigation & Status Action */}
          <nav aria-label="Primary navigation" className="flex items-center gap-6 text-xs uppercase tracking-widest font-medium">
            <div className="hidden md:flex items-center gap-6 text-neutral-400">
              <a className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0" href="#projects">
                Projects
              </a>
              <a className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0" href="#skills">
                Skills
              </a>
              <a className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0" href="#process">
                Process
              </a>
              <a className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0" href="#contact">
                Contact
              </a>
            </div>
            <button
              type="button"
              onClick={() => openCollab('')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#D91E2A]/45 bg-[#D91E2A]/10 hover:bg-[#D91E2A]/25 text-neutral-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="text-[#D91E2A] text-xs" aria-hidden="true">
                ✦
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase">Open For Collaboration</span>
            </button>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="relative pt-6 pb-20 overflow-hidden border-b border-white/10">
          {/* Monumental Red "PORTFOLIO" Background Typography */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none text-center z-0">
            <h1 className="font-condensed font-bold uppercase text-[20vw] sm:text-[19vw] lg:text-[18vw] leading-none tracking-tighter crimson-text-gradient opacity-90 scale-y-105">
              PORTFOLIO
            </h1>
          </div>

          {/* Ambient Glow Behind Subject */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#D91E2A]/20 blur-[130px] pointer-events-none -z-10" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile Centered Portrait Visual */}
            <div className="block lg:hidden relative mx-auto w-72 h-80 mb-6 rounded-2xl overflow-hidden bg-[#121212] border border-white/10">
              {!portraitFailed ? (
                <img
                  alt="Bagus Fitra Abdillah - Informatics Student & Digital Creator"
                  referrerPolicy="no-referrer"
                  onError={() => setPortraitFailed(true)}
                  className="w-full h-full object-cover object-top brightness-95 contrast-105"
                  src={PORTRAIT_IMAGE_URL}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] via-[#121212] to-[#4A080C]/40 flex flex-col items-center justify-center p-6 text-center">
                  <span className="font-condensed text-5xl font-bold text-[#D91E2A]">BFA</span>
                  <span className="text-xs uppercase tracking-widest text-neutral-400 mt-2">
                    Bagus Fitra Abdillah
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none" />
            </div>

            {/* 3-Column Editorial Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[640px]">
              {/* Column 1: Identity & Bio */}
              <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4 lg:pt-0">
                <p className="font-script text-3xl sm:text-4xl text-neutral-200 mb-0 -rotate-2 transform">
                  Hello, I&apos;m
                </p>

                <h2 className="font-condensed text-5xl sm:text-7xl font-bold uppercase tracking-tight text-white leading-[0.92] mt-1 mb-4">
                  BAGUS FITRA
                  <br />
                  <span className="text-white">ABDILLAH</span>
                </h2>

                <p className="text-xs sm:text-sm font-bold tracking-widest text-[#D91E2A] uppercase mb-4">
                  Informatics Engineering &amp; Digital Creator
                </p>

                <p className="text-[#9A9A9A] text-sm sm:text-base leading-relaxed max-w-md font-normal mb-6">
                  Informatics student at Institut Teknologi PLN and Al-Muhsin Islamic Boarding School alumnus.
                  Passionate about building structured logic, clean programming, and impactful visual communication.
                </p>

                <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium tracking-wide">
                  <Globe className="w-4 h-4 text-[#D91E2A] shrink-0" />
                  <span className="uppercase tracking-widest text-[11px] text-neutral-300">
                    Bandar Lampung &amp; Jakarta, Indonesia
                  </span>
                </div>
              </div>

              {/* Column 2: Center Subject Portrait (Desktop) */}
              <div className="hidden lg:flex lg:col-span-4 relative justify-center items-end h-[620px] order-1 lg:order-2">
                <div className="relative w-full h-full max-w-[380px] flex items-end justify-center">
                  {!portraitFailed ? (
                    <img
                      alt="Bagus Fitra Abdillah Portrait"
                      referrerPolicy="no-referrer"
                      onError={() => setPortraitFailed(true)}
                      className="w-full h-auto max-h-[580px] object-cover object-top rounded-b-none brightness-95 contrast-105"
                      src={PORTRAIT_IMAGE_URL}
                    />
                  ) : (
                    <div className="w-full h-[500px] rounded-t-2xl bg-gradient-to-b from-[#1A1A1A] via-[#121212] to-[#0A0A0A] border border-white/10 flex flex-col items-center justify-center p-8 text-center">
                      <span className="font-condensed text-7xl font-bold text-[#D91E2A]">BFA</span>
                      <span className="text-xs uppercase tracking-widest text-neutral-400 mt-3">
                        Informatics &amp; Creative Direction
                      </span>
                    </div>
                  )}

                  {/* Floor fade gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent pointer-events-none" />

                  {/* Floating Glass Callout Badge */}
                  <div className="absolute bottom-28 -right-6 bg-[#121212]/90 backdrop-blur-md border border-white/10 p-3.5 rounded-lg max-w-[215px] shadow-2xl text-left">
                    <div className="flex items-start gap-2">
                      <span className="text-[#D91E2A] text-sm font-bold leading-none mt-0.5" aria-hidden="true">
                        ✦
                      </span>
                      <p className="text-[11px] text-neutral-200 leading-tight font-medium">
                        Turning logic &amp; ideas into structured digital solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: Metrics & Accomplishments */}
              <div className="lg:col-span-3 flex flex-col justify-center space-y-6 order-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
                <div className="flex items-baseline justify-between lg:justify-start lg:gap-4 border-b border-white/10 pb-4">
                  <span className="font-condensed text-5xl lg:text-6xl font-bold text-[#D91E2A] leading-none tabular-nums">
                    2026
                  </span>
                  <div className="text-right lg:text-left">
                    <span className="block text-xs font-bold uppercase tracking-wider text-white">ITPLN</span>
                    <span className="block text-[11px] tracking-wider text-[#9A9A9A] uppercase">Informatics</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between lg:justify-start lg:gap-4 border-b border-white/10 pb-4">
                  <span className="font-condensed text-5xl lg:text-6xl font-bold text-[#D91E2A] leading-none tabular-nums">
                    3+
                  </span>
                  <div className="text-right lg:text-left">
                    <span className="block text-xs font-bold uppercase tracking-wider text-white">Leadership</span>
                    <span className="block text-[11px] tracking-wider text-[#9A9A9A] uppercase">Active Roles</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between lg:justify-start lg:gap-4">
                  <span className="font-condensed text-5xl lg:text-6xl font-bold text-[#D91E2A] leading-none tabular-nums">
                    7+
                  </span>
                  <div className="text-right lg:text-left">
                    <span className="block text-xs font-bold uppercase tracking-wider text-white">
                      Tech &amp; Design
                    </span>
                    <span className="block text-[11px] tracking-wider text-[#9A9A9A] uppercase">Core Tools</span>
                  </div>
                </div>

                {/* Micro Callout for mobile */}
                <div className="lg:hidden p-3 rounded bg-[#121212] border border-white/10 text-xs text-neutral-300">
                  <span className="text-[#D91E2A] font-bold">✦</span> Turning logic &amp; ideas into structured digital
                  solutions.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Projects Section */}
        <section className="py-20 border-b border-white/10 bg-[#0A0A0A]" id="projects">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 pb-4 border-b border-white/10 gap-4">
              <div>
                <h3 className="text-xs uppercase font-bold text-[#D91E2A] tracking-widest mb-1">
                  Portfolio Highlights
                </h3>
                <h2 className="font-condensed text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
                  SELECTED PROJECTS &amp; ROLES
                </h2>
              </div>
              <a
                className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9A9A9A] hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0"
                href="https://github.com/AbdiL"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>View GitHub Repositories</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">⟶</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROJECTS.map((project) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Inspect ${project.title} details`}
                  className="group bg-[#121212] rounded-xl overflow-hidden border border-white/10 hover:border-[#D91E2A]/60 focus-visible:outline-none focus-visible:border-[#D91E2A] transition-all duration-200 flex flex-col justify-between cursor-pointer text-left"
                >
                  <div className="p-6">
                    {/* Visual Mock Header */}
                    {project.type === 'event' && (
                      <div className="w-full h-48 rounded-lg bg-gradient-to-br from-neutral-900 via-neutral-950 to-[#4A080C]/40 border border-white/5 relative overflow-hidden flex items-center justify-center mb-6">
                        <div className="text-center p-4">
                          <span className="text-[10px] tracking-widest text-[#D91E2A] uppercase font-bold block mb-1">
                            HIMALA ITPLN
                          </span>
                          <p className="font-condensed text-2xl uppercase font-bold tracking-tight text-white">
                            HIMALA CUP 2026
                          </p>
                          <span className="inline-block mt-2 px-2.5 py-0.5 text-[9px] font-bold uppercase bg-white/10 text-neutral-300 rounded">
                            Creative Direction
                          </span>
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#D91E2A]/30 rounded-full blur-xl pointer-events-none" />
                      </div>
                    )}

                    {project.type === 'code' && (
                      <div className="w-full h-48 rounded-lg bg-[#0d1117] border border-white/10 p-3.5 relative overflow-hidden font-mono text-[11px] leading-relaxed mb-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-3 opacity-60">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            <span className="text-[9px] text-neutral-400 font-sans ml-2">algorithm_solver.py</span>
                          </div>
                          <p className="text-purple-400">
                            <span className="text-[#D91E2A]">def</span>{' '}
                            <span className="text-blue-400">solve_logic</span>(matrix):
                          </p>
                          <p className="text-neutral-400 pl-3"># Structured optimization</p>
                          <p className="text-neutral-300 pl-3">nodes = [x for x in matrix if x.valid]</p>
                          <p className="text-emerald-400 pl-3">
                            <span className="text-[#D91E2A]">return</span> sorted(nodes, key=metric)
                          </p>
                        </div>
                        <div className="text-[10px] text-neutral-500 text-right">UTF-8 • Python 3.12</div>
                      </div>
                    )}

                    {project.type === 'leadership' && (
                      <div className="w-full h-48 rounded-lg bg-gradient-to-br from-neutral-900 to-black border border-white/5 relative overflow-hidden flex flex-col items-center justify-center p-4 mb-6">
                        <div className="w-12 h-12 rounded-full border border-[#D91E2A]/40 bg-[#D91E2A]/10 flex items-center justify-center mb-3 text-[#D91E2A]">
                          <Users className="w-6 h-6" />
                        </div>
                        <p className="font-condensed text-xl uppercase font-bold text-white tracking-wide text-center">
                          ORGANIZATIONAL DISCIPLINE
                        </p>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">
                          Al-Muhsin Metro Leadership
                        </span>
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-condensed text-3xl font-bold text-[#D91E2A] tabular-nums">
                        {project.number}
                      </span>
                      <span className="text-[10px] tracking-widest uppercase font-semibold text-neutral-400">
                        {project.organization}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-[#D91E2A] transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs text-[#9A9A9A] mt-1 leading-relaxed">{project.summary}</p>
                  </div>

                  {/* Footer Action Row */}
                  <div className="px-6 py-4 bg-[#1A1A1A]/40 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-400">
                      {project.footerTag}
                    </span>
                    <span className="text-[#9A9A9A] group-hover:text-white group-hover:translate-x-1.5 transition-all duration-200">
                      ⟶
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Details Grid */}
        <section className="py-20 border-b border-white/10 bg-[#0A0A0A]" id="skills">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Column 1: Education & Skills */}
              <div className="lg:col-span-4 bg-[#121212] rounded-2xl p-6 sm:p-8 border border-white/10">
                <h3 className="font-condensed text-2xl uppercase font-bold tracking-tight text-white mb-6">
                  Education &amp; Skills
                </h3>

                <div className="mb-8">
                  <h4 className="text-[11px] uppercase font-bold tracking-widest text-[#D91E2A] mb-4">Education</h4>

                  <div className="border-b border-white/10 pb-4 mb-4">
                    <div className="flex justify-between items-baseline gap-2">
                      <h5 className="text-sm font-bold text-white">Institut Teknologi PLN</h5>
                      <span className="text-[11px] font-bold text-[#D91E2A] whitespace-nowrap">2026 - Present</span>
                    </div>
                    <p className="text-xs text-[#9A9A9A] mt-0.5">
                      S1 Teknik Informatika (Informatics Engineering)
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-1">Jakarta Barat, DKI Jakarta</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline gap-2">
                      <h5 className="text-sm font-bold text-white">Ponpes Islam Al-Muhsin Metro</h5>
                      <span className="text-[11px] font-semibold text-neutral-400 whitespace-nowrap">Graduated</span>
                    </div>
                    <p className="text-xs text-[#9A9A9A] mt-0.5">
                      Islamic Boarding School &amp; Leadership Councils
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-1">Metro, Lampung</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase font-bold tracking-widest text-[#D91E2A] mb-3">
                    Core Skills &amp; Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.map((skill) => {
                      const isSelected = activeSkill?.name === skill.name;
                      return (
                        <button
                          key={skill.name}
                          type="button"
                          onClick={() => setActiveSkill(isSelected ? null : skill)}
                          className={`px-2.5 py-1 text-xs rounded border font-medium transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#D91E2A]/20 border-[#D91E2A] text-white'
                              : 'bg-[#1A1A1A] border-white/10 text-neutral-200 hover:border-[#D91E2A]/50'
                          }`}
                        >
                          {skill.name}
                        </button>
                      );
                    })}
                  </div>
                  {activeSkill && (
                    <div className="mt-3 p-3 rounded-lg bg-[#1A1A1A] border border-[#D91E2A]/35 text-xs">
                      <span className="font-bold text-[#D91E2A] uppercase tracking-wider text-[10px]">
                        {activeSkill.category} · {activeSkill.name}
                      </span>
                      <p className="text-neutral-300 mt-1 leading-relaxed">{activeSkill.note}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Column 2: Work Process */}
              <div className="lg:col-span-4 bg-[#121212] rounded-2xl p-6 sm:p-8 border border-white/10" id="process">
                <h3 className="font-condensed text-2xl uppercase font-bold tracking-tight text-white mb-6">
                  My Work Process
                </h3>

                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
                  {WORK_PROCESS.map((step) => {
                    const isFocused = activeStep === step.number;
                    return (
                      <div
                        key={step.number}
                        onClick={() => setActiveStep(step.number)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveStep(step.number);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        className="relative cursor-pointer group focus-visible:outline-none"
                      >
                        <div
                          className={`absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full timeline-dot transition-transform duration-200 ${
                            isFocused ? 'bg-[#FF3342] scale-110' : 'bg-[#D91E2A]'
                          }`}
                        />
                        <div className="flex items-baseline gap-2">
                          <span className="font-condensed text-sm font-bold text-[#D91E2A] tabular-nums">
                            {step.number}
                          </span>
                          <h4
                            className={`text-xs uppercase font-bold tracking-wider transition-colors ${
                              isFocused ? 'text-white' : 'text-neutral-200 group-hover:text-white'
                            }`}
                          >
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-xs text-[#9A9A9A] mt-1 leading-relaxed">{step.description}</p>
                        {isFocused && (
                          <p className="text-[11px] text-[#D91E2A] font-semibold mt-1.5 tracking-wide">
                            Output: {step.artifact}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Column 3: Crimson Testimonial Card */}
              <div className="lg:col-span-4 bg-gradient-to-br from-[#5A0A10] via-[#4A080C] to-[#1A0305] rounded-2xl p-6 sm:p-8 border border-[#D91E2A]/40 text-white flex flex-col justify-between crimson-glow-soft min-h-[460px]">
                <div>
                  <div className="text-6xl font-serif text-[#D91E2A] leading-none select-none opacity-80">“</div>

                  <blockquote className="text-base sm:text-lg font-medium leading-relaxed mt-2 text-zinc-100">
                    Collaborating with Abdillah at ITPLN always brings clarity and structure. He balances logical
                    problem-solving with calm, dependable teamwork.
                  </blockquote>

                  <div className="mt-6">
                    <p className="font-script text-4xl text-white transform -rotate-3 select-none">Abdillah</p>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-300">
                      — Hafidz Bustomi
                    </div>
                    <div className="text-[11px] text-neutral-400">Informatics Peer at ITPLN</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/20 mt-6">
                  <button
                    type="button"
                    onClick={() => openCollab('Project Collaboration Inquiry')}
                    className="w-full text-left text-[11px] uppercase tracking-widest font-bold text-neutral-200 hover:text-white flex items-center justify-between gap-2 transition-colors cursor-pointer"
                  >
                    <span>Let&apos;s Create Something Impactful Together</span>
                    <span className="text-[#D91E2A]">✦</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA & Contact */}
        <section className="py-20 bg-[#0A0A0A] relative overflow-hidden" id="contact">
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D91E2A]/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Big Statement & Button */}
              <div className="lg:col-span-5">
                <h2 className="font-condensed text-5xl sm:text-6xl font-bold uppercase tracking-tight text-white leading-none">
                  LET&apos;S WORK
                  <br />
                  <span className="text-[#D91E2A]">TOGETHER</span> <span className="text-[#D91E2A]">✦</span>
                </h2>
                <p className="text-[#9A9A9A] text-sm sm:text-base leading-relaxed mt-4 mb-8 max-w-sm">
                  I&apos;m currently open for student initiatives, tech collaborations, creative design roles, and
                  developer partnerships. Let&apos;s create something reliable and impactful.
                </p>

                <button
                  type="button"
                  onClick={() => openCollab('')}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#121212] border border-[#D91E2A] hover:bg-[#D91E2A] hover:text-white transition-all duration-300 group shadow-lg cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-[#D91E2A] group-hover:bg-white text-white group-hover:text-[#D91E2A] flex items-center justify-center text-xs transition-colors">
                    ⟶
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest">Available For Collaboration</span>
                </button>
              </div>

              {/* Middle Column: Contact Info Cards */}
              <div className="lg:col-span-4 space-y-4">
                {/* Email */}
                <a
                  className="flex items-center justify-between gap-3 p-4 rounded-xl bg-[#121212] border border-white/10 hover:border-[#D91E2A]/60 transition-all group"
                  href="mailto:bagusabdillah107@gmail.com"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-[#D91E2A] group-hover:bg-[#D91E2A] group-hover:text-white transition-colors shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                        Email Inquiry
                      </span>
                      <span className="block text-sm font-semibold text-white truncate">
                        bagusabdillah107@gmail.com
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleCopy(e, 'bagusabdillah107@gmail.com', 'email')}
                    aria-label="Copy email address"
                    className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-4 h-4 text-[#D91E2A]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </a>

                {/* WhatsApp */}
                <a
                  className="flex items-center justify-between gap-3 p-4 rounded-xl bg-[#121212] border border-white/10 hover:border-[#D91E2A]/60 transition-all group"
                  href="https://wa.me/6285267761853"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-[#D91E2A] group-hover:bg-[#D91E2A] group-hover:text-white transition-colors shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                        WhatsApp &amp; Phone
                      </span>
                      <span className="block text-sm font-semibold text-white tabular-nums">+62 852-6776-1853</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleCopy(e, '+6285267761853', 'phone')}
                    aria-label="Copy phone number"
                    className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-4 h-4 text-[#D91E2A]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </a>

                {/* LinkedIn */}
                <a
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#121212] border border-white/10 hover:border-[#D91E2A]/60 transition-all group"
                  href="https://linkedin.com/in/bagusfitraabdillah"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-[#D91E2A] group-hover:bg-[#D91E2A] group-hover:text-white transition-colors shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.738-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                      Professional Profile
                    </span>
                    <span className="block text-sm font-semibold text-white truncate">
                      linkedin.com/in/bagusfitraabdillah
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#121212]/50 border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-[#D91E2A] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                      Base Locations
                    </span>
                    <span className="text-sm font-semibold text-neutral-200">Jakarta &amp; Bandar Lampung, ID</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Laptop Workspace Mockup */}
              <div className="lg:col-span-3 flex justify-center">
                <a
                  href="https://github.com/AbdiL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[280px] bg-gradient-to-b from-[#181818] to-[#0E0E0E] p-3 rounded-2xl border border-white/10 hover:border-[#D91E2A]/50 transition-colors shadow-2xl relative block group"
                >
                  <div className="w-full aspect-[4/3] bg-black rounded-lg border border-white/10 overflow-hidden relative p-3 flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D91E2A]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                      </div>
                      <span className="text-[8px] tracking-widest text-neutral-400 font-mono">VS CODE / ITPLN</span>
                    </div>
                    <div className="py-2">
                      <p className="text-[10px] font-condensed tracking-wider uppercase text-[#D91E2A] font-bold">
                        PORTFOLIO DEPLOYED
                      </p>
                      <p className="text-[9px] text-neutral-300 font-mono mt-1">status: 200 OK</p>
                      <p className="text-[9px] text-[#9A9A9A] font-mono">user: @AbdiL</p>
                    </div>
                    <div className="text-[8px] text-neutral-500 group-hover:text-neutral-300 transition-colors font-mono border-t border-white/5 pt-1">
                      github.com/AbdiL ↗
                    </div>
                  </div>
                  <div className="w-full h-3 bg-neutral-800 rounded-b-lg mt-1 border-t border-white/10 flex justify-center items-center">
                    <div className="w-10 h-0.5 bg-neutral-600 rounded-full" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#D91E2A]/20 rounded-full blur-xl pointer-events-none" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Copyright Bar */}
      <footer className="w-full py-8 border-t border-white/10 bg-[#0A0A0A] text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="uppercase tracking-wider text-[11px]">
            © 2026 BAGUS FITRA ABDILLAH. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 uppercase tracking-widest text-[11px] font-semibold">
            <a
              className="hover:text-[#D91E2A] transition-colors"
              href="https://github.com/AbdiL"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <a
              className="hover:text-[#D91E2A] transition-colors"
              href="https://instagram.com/abdfitraa_"
              rel="noopener noreferrer"
              target="_blank"
            >
              Instagram
            </a>
            <a
              className="hover:text-[#D91E2A] transition-colors"
              href="https://linkedin.com/in/bagusfitraabdillah"
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="text-[#D91E2A] hover:underline uppercase tracking-widest text-[11px] font-semibold cursor-pointer"
            >
              Back To Top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onCollaborate={(subject) => openCollab(subject)}
      />
      <CollaborationModal
        isOpen={isCollabOpen}
        initialSubject={collabSubject}
        onClose={() => setIsCollabOpen(false)}
      />
    </div>
  );
}
