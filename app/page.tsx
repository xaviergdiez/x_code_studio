'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { Code, Zap, CheckCircle, Menu, X, ArrowRight, ExternalLink, RefreshCw, LayoutTemplate, Globe, Linkedin, Cpu, GraduationCap, Figma, ChevronRight, Activity } from 'lucide-react';

// GSAP Imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Formspree
import { useForm } from '@formspree/react';

// Try to import SplitText (bonus plugin)
let SplitText: unknown = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const splitTextModule = require('gsap/SplitText') as { SplitText: unknown };
  SplitText = splitTextModule.SplitText;
} catch {
  // SplitText not available, will use fallback
} 

/**
 * x-code.studio - Technical Director as a Service
 * Brand Aesthetic: CLI/Terminal, Monospaced, Dark Mode
 * Colors: Charcoal (#121212), Neon Green (#00FF41), Electric Blue (#007ACC)
 */

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const appRef = useRef(null);
  const [state, handleSubmit] = useForm("xdkqvorr");

  // ---------------------------------------------------------------------------
  // GSAP ANIMATION ENGINE
  // ---------------------------------------------------------------------------
  useLayoutEffect(() => {
    // Register Plugins - ScrollTrigger always, SplitText if available
    gsap.registerPlugin(ScrollTrigger);
    if (SplitText) {
      gsap.registerPlugin(SplitText);
    }

    const ctx = gsap.context(() => {
      
      // 1. HERO ANIMATION
      const tl = gsap.timeline();
      
      if (SplitText) {
        // Use SplitText if available for character-by-character animation
        try {
          const heroSplit = new (SplitText as unknown as new (selector: string, options: Record<string, unknown>) => unknown)(".hero-text-anim", { type: "chars" });
          tl.from((heroSplit as unknown as { chars: Element[] }).chars, {
            duration: 0.05,
            opacity: 0,
            display: 'none',
            stagger: 0.04,
            ease: "none",
          });
        } catch {
          // Fallback if SplitText fails
          tl.from(".hero-text-anim", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out"
          });
        }
      } else {
        // Fallback animation if SplitText not available
        tl.from(".hero-text-anim", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out"
        });
      }
      
      tl.from(".nav-anim", {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.5")
      .from(".hero-sub-anim", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.2");

      // 2. SCROLL TRIGGER: SECTION HEADERS
      gsap.utils.toArray('.section-reveal').forEach((elem: unknown) => {
        const element = elem as Element;
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });

      // 3. SCROLL TRIGGER: CASE STUDIES - Individual triggers for each card
      gsap.utils.toArray('.case-study-card').forEach((card: unknown, index: number) => {
        const element = card as Element;
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.2)"
        });
      });

    }, appRef);

    return () => ctx.revert();
  }, []);

  // ---------------------------------------------------------------------------
  // NAVIGATION LOGIC
  // ---------------------------------------------------------------------------
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset for fixed header
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div ref={appRef} className="min-h-screen bg-[#121212] text-[#E0E0E0] font-mono selection:bg-[#00FF41] selection:text-[#121212] overflow-x-hidden">

      {/* ---------------------------------------------------------------------------
          NAVIGATION BAR
         --------------------------------------------------------------------------- */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#121212]/95 border-b border-[#333] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group nav-anim"
              onClick={() => scrollToSection('home')}
            >
              <span className="text-[#00FF41] font-bold text-xl">{'>'}</span>
              <span className="text-white font-bold text-xl tracking-tight group-hover:text-[#00FF41] transition-colors">
                x-code.studio
              </span>
              <span className="animate-pulse text-[#00FF41] text-xl">_</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['services', 'methodology', 'work', 'audit', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="nav-anim text-sm text-gray-400 hover:text-[#00FF41] transition-colors duration-200 px-3 py-2 rounded-md font-medium uppercase tracking-wider"
                  >
                    /{item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden nav-anim">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-400 hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1E1E1E] border-b border-[#333]">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['services', 'methodology', 'work', 'audit', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-300 hover:text-[#00FF41] block px-3 py-2 rounded-md text-base font-medium w-full text-left uppercase"
                >
                  ./{item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ---------------------------------------------------------------------------
          MAIN CONTENT
         --------------------------------------------------------------------------- */}
      <main className="pt-16">
        
        {/* --- HERO SECTION --- */}
        <section id="home" className="min-h-screen flex items-center justify-center relative border-b border-[#333]">
          <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
            <div className="space-y-6">
              <div className="nav-anim inline-block px-3 py-1 border border-[#00FF41] text-[#00FF41] text-xs uppercase tracking-widest mb-4">
                Creative Technologist | Product Designer | Educator
              </div>
              <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-tight hero-text-anim">
                <div className="block">CREATIVE TECHNOLOGIST</div>
                <div className="block text-[#00FF41]">& DESIGN SYSTEMS ARCHITECT</div>
              </h1>
              <div className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed hero-sub-anim">
                <span className="text-[#00FF41]">{'>'}</span> Bridging High-Fidelity Design (Figma) and High-Performance Code (GSAP).
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-8 hero-sub-anim">
                <Link href="/#methodology" className="px-8 py-3 font-bold text-[#121212] bg-[#00FF41] hover:bg-[#00CC33] transition-all text-center">
                  VIEW_ACCESS_PLANS
                </Link>
                <button onClick={() => scrollToSection('contact')} className="px-8 py-3 font-bold text-white border border-[#333] hover:border-white transition-all bg-[#1E1E1E]">
                  CONTACT
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- HUMAN BIO (Hard Truth Update - Outcomes, not Capabilities) --- */}
        <section id="profile" className="py-20 border-b border-[#333] bg-[#1a1a1a]">
          <div className="max-w-5xl mx-auto px-4 section-reveal">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3">
                 <div className="text-[#007ACC] font-bold mb-2 text-sm tracking-widest">WHO_AM_I --human_mode</div>
                 <h2 className="text-3xl font-bold text-white">I SPEAK PIXEL<br/>AND I SPEAK LOGIC.</h2>
              </div>
              <div className="w-full md:w-2/3 text-gray-400 leading-relaxed space-y-4">
                <p>
                  I am a <span className="text-white">Designer</span> who learned to code to protect the integrity of my designs.
                </p>
                <p>
                  I don&apos;t just hand off code; I build the internal tools (plugins, automations) that save agencies <span className="text-[#00FF41]">€50k/year in manual labor</span>. My mission is to automate the boring stuff so your creative team can actually create.
                </p>
                <p>
                  As a <span className="text-white">Teacher at NEOLAND</span>, I train designers to think in systems. I bridge the gap between the <span className="text-white">Creative Director&apos;s vision</span> and the <span className="text-white">Ad Server&apos;s logic</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- UX AUDIT LOG --- */}
        <section className="py-24 border-b border-[#333]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 section-reveal">
              <h2 className="text-3xl font-bold mb-4"><span className="text-[#00FF41]">{'>'}</span> UX_AUDIT.log</h2>
              <p className="text-gray-400 max-w-2xl">Design decisions that ship with purpose, not accident.</p>
            </div>

            <div className="space-y-8">
              
              {/* Audit 1: Mobile Touch Targets */}
              <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded section-reveal">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-red-400 font-bold text-lg mb-2">PROBLEM</div>
                    <div className="text-gray-300 text-sm space-y-2">
                      <div><span className="text-red-400">▸</span> Static design mockups</div>
                      <div><span className="text-red-400">▸</span> Touch targets 32px below WCAG AA</div>
                      <div><span className="text-red-400">▸</span> No responsive touch feedback</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-bold text-lg mb-2">ANALYSIS</div>
                    <div className="text-gray-300 text-sm space-y-2">
                      <div><span className="text-yellow-400">▸</span> 48×48px minimum for mobile</div>
                      <div><span className="text-yellow-400">▸</span> Spacing logic in Figma Variables</div>
                      <div><span className="text-yellow-400">▸</span> CSS Grid for perfect alignment</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[#00FF41] font-bold text-lg mb-2">SOLUTION</div>
                    <div className="text-gray-300 text-sm space-y-2">
                      <div><span className="text-[#00FF41]">▸</span> Applied Design Tokens system</div>
                      <div><span className="text-[#00FF41]">▸</span> 100% WCAG AA compliance</div>
                      <div><span className="text-[#00FF41]">▸</span> Device-agnostic responsive layout</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit 2: Design System Consistency */}
              <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded section-reveal">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-red-400 font-bold text-lg mb-2">PROBLEM</div>
                    <div className="text-gray-300 text-sm space-y-2">
                      <div><span className="text-red-400">▸</span> Colors inconsistent across states</div>
                      <div><span className="text-red-400">▸</span> No component library documentation</div>
                      <div><span className="text-red-400">▸</span> Figma to React mismatch</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-bold text-lg mb-2">ANALYSIS</div>
                    <div className="text-gray-300 text-sm space-y-2">
                      <div><span className="text-yellow-400">▸</span> Built Figma Variables for all tokens</div>
                      <div><span className="text-yellow-400">▸</span> Exported to Tailwind config</div>
                      <div><span className="text-yellow-400">▸</span> Atomic design principles</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[#00FF41] font-bold text-lg mb-2">SOLUTION</div>
                    <div className="text-gray-300 text-sm space-y-2">
                      <div><span className="text-[#00FF41]">▸</span> Single source of truth established</div>
                      <div><span className="text-[#00FF41]">▸</span> Bi-directional sync (Figma ↔ Code)</div>
                      <div><span className="text-[#00FF41]">▸</span> 40% faster component creation</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit 3: Animation Performance */}
              <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded section-reveal">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-red-400 font-bold text-lg mb-2">PROBLEM</div>
                    <div className="text-gray-300 text-sm space-y-2">
                      <div><span className="text-red-400">▸</span> CSS animations cause jank</div>
                      <div><span className="text-red-400">▸</span> 45fps instead of 60fps</div>
                      <div><span className="text-red-400">▸</span> Scrollytelling feels sluggish</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-bold text-lg mb-2">ANALYSIS</div>
                    <div className="text-gray-300 text-sm space-y-2">
                      <div><span className="text-yellow-400">▸</span> Switched to GSAP + GPU acceleration</div>
                      <div><span className="text-yellow-400">▸</span> ScrollTrigger for scroll sync</div>
                      <div><span className="text-yellow-400">▸</span> Will-change and transform optimization</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[#00FF41] font-bold text-lg mb-2">SOLUTION</div>
                    <div className="text-gray-300 text-sm space-y-2">
                      <div><span className="text-[#00FF41]">▸</span> Consistent 60fps performance</div>
                      <div><span className="text-[#00FF41]">▸</span> Core Web Vitals passed</div>
                      <div><span className="text-[#00FF41]">▸</span> Micro-interactions feel native</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* --- EFFICIENCY ESTIMATOR MODULE --- */}
            <EfficiencyEstimator />

          </div>
        </section>

        {/* --- USER REVIEWS / SOCIAL PROOF --- */}
        <section id="social_proof" className="py-20 border-b border-[#333] bg-[#121212]">
          <div className="max-w-7xl mx-auto px-4">
             <div className="mb-12 section-reveal">
                <h2 className="text-2xl font-bold mb-4"><span className="text-[#00FF41]">{'>'}</span> PEER_VALIDATION --linkedin_verified</h2>
             </div>
             
             <div className="grid md:grid-cols-2 gap-6">
                
                {/* Kristina Brown */}
                <div className="section-reveal border border-[#333] bg-[#1a1a1a] p-6 font-mono text-sm relative group hover:border-[#00FF41] transition-colors">
                   <div className="absolute top-4 right-4 text-[#007ACC]"><Linkedin size={16} fill="#007ACC" /></div>
                   <p className="text-gray-300 mb-6 leading-relaxed italic pr-8">
                      &quot;As a cornerstone of our development team... he was instrumental in creating high-quality HTML ads for key LCS and GCS clients (Google). He built new workflows that improved the team{"'"} efficiency... and directly contributed to exceeding client ROI expectations.&quot;
                   </p>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center text-[#00FF41] font-bold border border-[#333]">KB</div>
                      <div>
                         <div className="text-white font-bold">Kristina Brown</div>
                         <div className="text-gray-500 text-xs">Senior Program Manager @ Monks</div>
                      </div>
                   </div>
                </div>

                {/* Tim Wolters */}
                <div className="section-reveal border border-[#333] bg-[#1a1a1a] p-6 font-mono text-sm relative group hover:border-[#00FF41] transition-colors">
                   <div className="absolute top-4 right-4 text-[#007ACC]"><Linkedin size={16} fill="#007ACC" /></div>
                   <p className="text-gray-300 mb-6 leading-relaxed italic pr-8">
                      &quot;From building automated pipelines and writing smart scripts... Xavier always finds a way to add value. On a large client project his framework allowed us to render assets at massive scale in a fraction of the time, saving the team countless hours.&quot;
                   </p>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center text-[#00FF41] font-bold border border-[#333]">TW</div>
                      <div>
                         <div className="text-white font-bold">Tim Wolters</div>
                         <div className="text-gray-500 text-xs">Design Lead @ Monks</div>
                      </div>
                   </div>
                </div>

                {/* Pablo Carreira */}
                <div className="section-reveal border border-[#333] bg-[#1a1a1a] p-6 font-mono text-sm relative group hover:border-[#00FF41] transition-colors">
                   <div className="absolute top-4 right-4 text-[#007ACC]"><Linkedin size={16} fill="#007ACC" /></div>
                   <p className="text-gray-300 mb-6 leading-relaxed italic pr-8">
                      &quot;He masterfully organizes and delivers on large-scale projects, ensuring they are built to scale. Beyond excellent technical skills in areas like web animation, Xavi is a natural leader who genuinely supports the development of his colleagues.&quot;
                   </p>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center text-[#00FF41] font-bold border border-[#333]">PC</div>
                      <div>
                         <div className="text-white font-bold">Pablo Carreira</div>
                         <div className="text-gray-500 text-xs">Lead Display Developer</div>
                      </div>
                   </div>
                </div>

                {/* Jordan Maders */}
                <div className="section-reveal border border-[#333] bg-[#1a1a1a] p-6 font-mono text-sm relative group hover:border-[#00FF41] transition-colors">
                   <div className="absolute top-4 right-4 text-[#007ACC]"><Linkedin size={16} fill="#007ACC" /></div>
                   <p className="text-gray-300 mb-6 leading-relaxed italic pr-8">
                      &quot;Highly focused professional who seamlessly bridges business objectives with client needs... ensuring that expectations are met with precision. His leadership consistently sets the standard.&quot;
                   </p>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center text-[#00FF41] font-bold border border-[#333]">JM</div>
                      <div>
                         <div className="text-white font-bold">Jordan Maders</div>
                         <div className="text-gray-500 text-xs">Director / Post Production</div>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section id="services" className="py-24 border-b border-[#333]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 section-reveal">
              <h2 className="text-3xl font-bold mb-4"><span className="text-[#00FF41]">{'>'}</span> SYSTEM_CAPABILITIES</h2>
              <p className="text-gray-400 max-w-2xl">Bridging the Design-Dev gap.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               
               {/* 1. VISUAL ENGINEERING (Renamed from MOTION_UI) */}
               <CapabilityCard 
                  icon={<Zap className="text-[#00FF41]" />}
                  title="VISUAL_ENG.exe"
                  skills={["GSAP", "WebGL", "Scrollytelling", "Micro-interactions", "Performance"]}
                  desc="Standard designers use video; I use code. Leveraging GSAP/WebGL to create physics-based, interaction-driven experiences that load instantly."
               />

               {/* 2. DESIGN SYSTEMS (Architect) */}
               <CapabilityCard 
                  icon={<Figma className="text-[#00FF41]" />}
                  title="DESIGN_SYS.config"
                  skills={["Design Tokens", "Figma Variables", "Component Libraries", "Scalability"]}
                  desc="Bridging Figma and React. I build Living Style Guides and Token Systems that ensure the design intent survives the development process. From atomic components to dark-mode architecture."
               />

               {/* 3. AD TECH */}
               <CapabilityCard 
                  icon={<Globe className="text-[#00FF41]" />}
                  title="AD_TECH.sys"
                  skills={["Display & Video 360", "DCO Architecture", "Dynamic Remarketing", "Campaign Manager 360"]}
                  desc="Building scalable, data-driven ad architectures that serve personalized content globally."
               />

               {/* 4. WORKFLOW OPS (Renamed - Sell Outcomes) */}
               <CapabilityCard 
                  icon={<Cpu className="text-[#00FF41]" />}
                  title="WORKFLOW_OPS.bat"
                  skills={["Python Scripting", "Asset Generation Pipelines", "Custom Figma Plugins", "Workflow Automation"]}
                  desc="The 20-Hour Week Saver. I build custom scripts and plugins that automate your grunt work so your team can focus on what matters."
               />

               {/* 5. MENTORSHIP */}
               <CapabilityCard 
                  icon={<GraduationCap className="text-[#00FF41]" />}
                  title="MENTORSHIP.edu"
                  skills={["Product Design Teacher @ NEOLAND", "Dev-Design Bridge", "Team Training", "Workshops"]}
                  desc="Your designers and devs speak different languages. I teach them a common one. Upskilling teams on both sides."
               />

               {/* 6. WEB ENGINEERING */}
               <CapabilityCard 
                  icon={<Code className="text-[#00FF41]" />}
                  title="WEB_ENGINEERING.lib"
                  skills={["Next.js / React", "TypeScript", "Performance Tuning", "PWA Development"]}
                  desc="Modern frontend development focused on Core Web Vitals and component scalability."
               />

            </div>
          </div>
        </section>
        {/* --- EXECUTION PROTOCOL & OFFERINGS --- */}
        <section id="methodology" className="py-24 border-b border-[#333] bg-[#1E1E1E]">
          <div className="max-w-7xl mx-auto px-4">
             {/* EXECUTION PROTOCOL */}
             <div className="mb-24">
                <div className="mb-16 section-reveal text-center">
                   <h2 className="text-3xl font-bold mb-4"><span className="text-[#00FF41]">{'>'}</span> EXECUTION_PROTOCOL</h2>
                   <p className="text-gray-400">How we collaborate. Async. Efficient. Transparent.</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                   <ProtocolStep 
                     num="01" 
                     title="Ingest & Queue" 
                     icon={<LayoutTemplate className="w-5 h-5 text-[#00FF41]" />}
                     desc="Submit requests via your private Trello/Linear board. Queue up DCO scripts, banner sets, or React components. Unlimited backlog."
                   />
                   <ProtocolStep 
                     num="02" 
                     title="Sprint & Execute" 
                     icon={<RefreshCw className="w-5 h-5 text-[#00FF41]" />}
                     desc="I execute tasks linearly. 15+ years of experience means faster turnaround on complex architectures. Daily commits and async updates."
                   />
                   <ProtocolStep 
                     num="03" 
                     title="Deploy & Optimize" 
                     icon={<CheckCircle className="w-5 h-5 text-[#00FF41]" />}
                     desc="Previews delivered via Vercel or Ad Verification links. We iterate until the creative meets your strict brand standards."
                   />
                </div>
             </div>

             {/* OFFERINGS */}
             <OfferingsSection />
          </div>
        </section>

        {/* --- CASE STUDIES --- */}
        <section id="work" className="py-24 border-b border-[#333]">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-reveal text-3xl font-bold mb-12 flex items-center">
              <span className="text-[#00FF41] mr-4">{'>'}</span> 
              CASE_STUDIES_LOG
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* BMW / MINI */}
              <CaseStudyCard
                client="BMW / MINI"
                project="Global Asset Scale"
                stats={['75% reduction in production time', '40+ markets served', '500+ variants per campaign']}
                tech={['Adobe', 'Figma API', 'Automation', 'React']}
                description="Streamlining global creative production. Developed a scalable asset management system enabling rapid localization across 40+ markets."
                slug="bmw-mini"
              />

              {/* GTECH */}
              <CaseStudyCard
                client="GTECH"
                project="Data-to-Creative Pipeline"
                stats={['300% ad relevance increase', '45% CTR improvement', 'Real-time optimization']}
                tech={['Machine Learning', 'Google Ads API', 'Node.js', 'Analytics']}
                description="AI-powered pipeline analyzing user signals to generate optimized ad variants for Search, Display, and YouTube in real-time."
                slug="gtech"
              />

              {/* FBTO */}
              <CaseStudyCard
                client="FBTO"
                project="Rich Media Experience"
                stats={['250% engagement increase', '85% conversion bump', 'Award-winning creative']}
                tech={['HTML5 Canvas', 'GSAP Animation', 'SVG', 'Interactive']}
                description="Interactive rich media campaigns explaining complex insurance products through animated storytelling and calculators."
                slug="fbto"
              />

              {/* HUAWEI */}
              <CaseStudyCard
                client="HUAWEI"
                project="Color Takes Over"
                stats={['400% product interaction', '95% completion rate', 'Cross-platform consistency']}
                tech={['3D CSS Transforms', 'WebGL', 'Color Theory', 'Mobile Opt']}
                description="Immersive color-interactive experience allowing users to explore device variants with 3D-like rotations and dynamic backgrounds."
                slug="huawei"
              />
            </div>
           </div>
        </section>

        {/* --- AUDIT FORM --- */}
       <section id="audit" className="py-24 bg-[#1E1E1E]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#121212] border border-[#333] rounded-lg shadow-2xl p-8 md:p-12 font-mono">
              
              {state.succeeded ? (
                  <div className="text-center py-12 border border-[#00FF41]/30 bg-[#00FF41]/5 rounded">
                    <CheckCircle className="w-16 h-16 text-[#00FF41] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">TRANSMISSION_RECEIVED</h3>
                    <p className="text-gray-400">I will analyze your request and respond shortly.</p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="mt-6 text-sm text-[#00FF41] hover:underline"
                    >
                      [ New_Transmission ]
                    </button>
                  </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-8 section-reveal">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                      <span className="text-[#00FF41] animate-pulse mr-2">█</span>
                      INITIATE_CONTACT
                    </h3>
                    <p className="text-gray-400">Select your mission profile to route your request.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-[#007ACC] mb-2" htmlFor="name">{'>'} user_id:</label>
                      <input 
                        id="name" 
                        type="text" 
                        name="name" 
                        required 
                        className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors placeholder-gray-700" 
                        placeholder="Name / Agency" 
                      />
                    </div>

                    <div className="group">
                      <label className="block text-[#007ACC] mb-2" htmlFor="email">{'>'} target_email:</label>
                      <input 
                        id="email" 
                        type="email" 
                        name="email" 
                        required 
                        className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors placeholder-gray-700" 
                        placeholder="your@email.com" 
                      />
                    </div>
                  </div>

                  {/* MISSION SELECTOR (Funnel Segmentation) */}
                  <div className="group">
                     <label className="block text-[#007ACC] mb-2" htmlFor="mission">{'>'} select_mission_profile:</label>
                     <div className="relative">
                        <select 
                          id="mission" 
                          name="mission" 
                          className="w-full bg-[#1a1a1a] border border-[#333] text-white p-3 appearance-none focus:border-[#00FF41] outline-none transition-colors"
                          required
                        >
                           <option value="">-- Select Protocol --</option>
                           <option value="audit">Pipeline Audit (€995) - Tripwire</option>
                           <option value="rescue">System Rescue (€2,950) - Fix Design/Dev</option>
                           <option value="retainer">Fractional Architect (€3.5k) - Retainer</option>
                           <option value="education">Bridge Workshop (€1,500) - Team Training</option>
                        </select>
                        <div className="absolute right-3 top-3 pointer-events-none text-gray-500">
                           <ChevronRight className="rotate-90 w-4 h-4" />
                        </div>
                     </div>
                  </div>

                  <div className="group">
                    <label className="block text-[#007ACC] mb-2" htmlFor="message">{'>'} message_payload:</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={3} 
                      className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none resize-none transition-colors placeholder-gray-700" 
                      placeholder="Context: We are launching a global DCO campaign in 2 weeks..." 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={state.submitting} 
                    className="w-full md:w-auto bg-[#00FF41] text-[#121212] font-bold px-8 py-4 hover:bg-[#00CC33] transition-colors flex items-center justify-center uppercase tracking-wider disabled:opacity-50"
                  >
                    {state.submitting ? 'TRANSMITTING...' : '[ TRANSMIT_REQUEST ]'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* --- CONTACT / FOOTER --- */}
        <footer id="contact" className="bg-[#121212] border-t border-[#333] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
               <div>
                  <h4 className="text-2xl font-bold text-white mb-6">Connect_</h4>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Ready to optimize your pipeline? Whether it{"'"} high-performance motion or structural consultancy, I am ready to integrate.
                  </p>
                  <a href="mailto:hello@x-code.studio" className="text-[#00FF41] hover:underline text-lg">
                    hello@x-code.studio
                  </a>
               </div>
               <div className="md:text-right">
                  <h4 className="text-2xl font-bold text-white mb-6">Directory_</h4>
                  <div className="flex flex-col md:items-end space-y-4">
                    <a href="https://linkedin.com/in/xavier-garcia-diez" className="text-gray-400 hover:text-white flex items-center">
                      LinkedIn <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                    <a href="https://github.com/xaviergdiez" className="text-gray-400 hover:text-white flex items-center">
                      GitHub <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                    <a href="https://www.neoland.online//master-product-design" className="text-gray-400 hover:text-white flex items-center">
                      NEOLAND Master Course <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
               </div>
            </div>
            
            <div className="pt-8 border-t border-[#333] flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm font-mono">
              <div className="mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} x-code.studio <span className="mx-2">|</span> Amsterdam, NL
              </div>
              <div className="flex space-x-6">
                 <a href="#" className="hover:text-[#00FF41]">./privacy</a>
                 <a href="#" className="hover:text-[#00FF41]">./terms</a>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

function ProtocolStep({ num, title, desc, icon }: { num: string; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="section-reveal p-6 border border-[#333] bg-[#1a1a1a] hover:border-[#00FF41] transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[#007ACC] font-bold text-lg">{num}</span>
        <div className="text-gray-400 group-hover:text-[#00FF41]">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function OfferingsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const offerings = [
    {
      id: 'audit',
      title: 'WORKFLOW AUDIT',
      subtitle: '€995 one-time',
      desc: 'The Tripwire. Identify the bottlenecks costing you money.',
      features: ['Codebase Review (Git)', 'DCO Feed Stress Test', 'Performance Profiling', 'Strategy PDF Report'],
      cta: 'BOOK_AUDIT →',
      onClick: () => window.location.href = '/offerings/audit',
      highlight: false
    },
    {
      id: 'system-reboot',
      title: 'SYSTEM REBOOT',
      subtitle: '€2,950 package',
      desc: 'The "Figma Rescue" Package.',
      features: ['Design System Audit & Refactor', 'Figma Variables & Tokens Setup', 'Ready-to-Dev Handover Guide', 'Ad Template Standardization', '1-Week Sprint Delivery'],
      cta: 'RESCUE_SYSTEM →',
      onClick: () => window.location.href = '/offerings/design-system',
      highlight: true
    },
    {
      id: 'director',
      title: 'FRACTIONAL ARCHITECT',
      subtitle: '€3,500 /month',
      desc: 'Ongoing Leadership & Architecture.',
      features: ['Unlimited Request Queue', 'Async Trello/Linear Workflow', 'Direct Slack Access', 'Pause/Cancel Anytime', 'Full Stack & Ad Tech Access'],
      cta: 'SUBSCRIBE →',
      onClick: () => window.location.href = '/offerings/director',
      highlight: false
    },
    {
      id: 'workshop',
      title: 'BRIDGE WORKSHOP',
      subtitle: '€1,500 half-day',
      desc: 'Design for Devs / Dev for Designers.',
      features: ['Team Training Session', 'Dev-Design Communication', 'Figma for Developers', 'Code for Designers', 'NEOLAND Certified'],
      cta: 'BOOK_SESSION →',
      onClick: () => { document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' }); },
      highlight: false
    }
  ];

  return (
    <div className="border-t border-[#333] pt-24">
      <div className="mb-16 text-center section-reveal">
        <h2 className="text-3xl font-bold mb-4"><span className="text-[#00FF41]">{'>'}</span> COMMERCIAL_PACKAGES</h2>
        <p className="text-gray-400">Fixed outcomes. No hourly surprises.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
        {offerings.map((offering) => {
          const isHovered = hoveredCard === offering.id;
          const shouldShowGreen = hoveredCard === null ? offering.highlight : isHovered;

          return (
            <OfferingCard
              key={offering.id}
              title={offering.title}
              subtitle={offering.subtitle}
              desc={offering.desc}
              features={offering.features}
              cta={offering.cta}
              highlight={offering.highlight}
              showGreen={shouldShowGreen}
              onMouseEnter={() => setHoveredCard(offering.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={offering.onClick}
            />
          );
        })}
      </div>
    </div>
  );
}

function OfferingCard({ title, subtitle, desc, features, cta, highlight, showGreen, onMouseEnter, onMouseLeave, onClick }: { title: string; subtitle: string; desc: string; features: string[]; cta: string; highlight?: boolean; showGreen: boolean; onMouseEnter: () => void; onMouseLeave: () => void; onClick: () => void }) {
  return (
    <div 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`section-reveal relative p-8 border ${showGreen ? 'border-[#00FF41] bg-[#1a1a1a]' : 'border-[#333] bg-[#121212]'} flex flex-col h-full transition-colors duration-300`}>
      {highlight && <div className="absolute top-0 right-0 bg-[#00FF41] text-[#121212] text-xs font-bold px-2 py-1">RECOMMENDED</div>}
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <div className="text-sm text-gray-500 font-mono mb-4">{subtitle}</div>
      <p className="text-gray-400 text-sm mb-6 border-b border-[#333] pb-6">{desc}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((f: string, i: number) => (
           <li key={i} className="flex items-start text-sm text-gray-300">
             <CheckCircle className="w-4 h-4 text-[#007ACC] mr-2 mt-0.5 shrink-0" />
             {f}
           </li>
        ))}
      </ul>
      <button onClick={onClick} className={`w-full py-3 font-bold uppercase tracking-wider border text-sm transition-colors duration-300 ${showGreen ? 'bg-[#00FF41] text-[#121212] border-[#00FF41] hover:bg-[#00CC33]' : 'border-[#333] text-white hover:bg-[#333]'}`}>
        {cta}
      </button>
    </div>
  );
}

function CaseStudyCard({ client, project, stats, tech, description, slug }: { client: string; project: string; stats: string[]; tech: string[]; description: string; slug: string }) {
  return (
    <div className="case-study-card bg-[#121212] border border-[#333] hover:border-[#007ACC] transition-all duration-500 rounded group overflow-hidden">
      <div className="p-6 border-b border-[#333] bg-[#1E1E1E]/50 flex justify-between items-center">
         <div>
            <div className="text-[#007ACC] text-xs font-bold uppercase tracking-widest mb-1">Client</div>
            <div className="text-xl font-bold text-white">{client}</div>
         </div>
         <div className="text-right">
             <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Project</div>
             <div className="text-gray-300">{project}</div>
         </div>
      </div>

      <div className="p-8">
        <p className="text-gray-400 mb-8 leading-relaxed">
          {description}
        </p>

        <div className="space-y-4 mb-8">
           {stats.map((stat: string, i: number) => (
             <div key={i} className="flex items-start">
               <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
               <span className="text-gray-300 text-sm">{stat}</span>
             </div>
           ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tech.map((t: string, i: number) => (
            <span key={i} className="text-xs font-mono bg-[#333] text-gray-300 px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>

      <Link href={`/cases/${slug}`} className="block px-6 py-4 bg-[#1E1E1E]/30 border-t border-[#333] flex justify-between items-center group-hover:bg-[#007ACC]/10 transition-colors cursor-pointer">
        <span className="text-sm font-bold text-gray-400 group-hover:text-[#007ACC] transition-colors">READ_CASE_LOG</span>
        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#007ACC] transition-colors group-hover:translate-x-1 duration-300" />
      </Link>
    </div>
  );
}

function CapabilityCard({ title, desc, skills, icon }: { title: string; desc: string; skills: string[]; icon: React.ReactNode }) {
  return (
    <div className="section-reveal p-6 border border-[#333] bg-[#1a1a1a] hover:border-[#00FF41] transition-colors group h-full flex flex-col">
       <div className="mb-4">{icon}</div>
       <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
       <p className="text-gray-400 text-sm mb-4 leading-relaxed">{desc}</p>
       <div className="mt-auto flex flex-wrap gap-2">
         {skills.map((s, i) => (
           <span key={i} className="text-xs border border-[#333] text-gray-300 px-2 py-1 bg-[#121212]">{s}</span>
         ))}
       </div>
    </div>
  )
}

function EfficiencyEstimator() {
  const [banners, setBanners] = useState(50);
  const [timePerBanner, setTimePerBanner] = useState(2); // hours
  const [hourlyRate, setHourlyRate] = useState(85); // euros

  // Logic: Automated pipeline takes ~6 mins (0.1 hours) per asset
  const manualCost = banners * timePerBanner * hourlyRate;
  const automatedTime = banners * 0.1;
  const automatedCost = automatedTime * hourlyRate;
  const savings = manualCost - automatedCost;

  const scrollToContact = () => {
    const element = document.getElementById('audit');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-16 bg-[#1E1E1E] border border-[#333] p-8 rounded section-reveal">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side: Explainer */}
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-[#007ACC] font-mono text-xs mb-3">
              <Activity size={12} />
              <span>EFFICIENCY_ESTIMATOR</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Are you burning budget on manual versioning?</h3>
            <div className="h-px w-16 bg-gradient-to-r from-[#00FF41] to-transparent mb-6" />
          </div>
          <p className="text-gray-400 mb-6 leading-relaxed font-mono text-sm">
            Agencies bleed profit in the &quot;Versioning Phase.&quot; Use this calculator to see how much manual HTML/Design production is costing you per campaign vs. an Automated Pipeline.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="p-1 bg-red-400/10 text-red-400 rounded mt-0.5">
                <Activity size={12} />
              </div>
              <span className="text-gray-300 text-sm font-mono">Designers copy-pasting text into 50 Figma frames.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-1 bg-red-400/10 text-red-400 rounded mt-0.5">
                <Activity size={12} />
              </div>
              <span className="text-gray-300 text-sm font-mono">Developers manually tweaking CSS for every language.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-1 bg-red-400/10 text-red-400 rounded mt-0.5">
                <Activity size={12} />
              </div>
              <span className="text-gray-300 text-sm font-mono">QA team checking every banner size manually.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-1 bg-red-400/10 text-red-400 rounded mt-0.5">
                <Activity size={12} />
              </div>
              <span className="text-gray-300 text-sm font-mono">Project managers tracking versions in spreadsheets.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-1 bg-red-400/10 text-red-400 rounded mt-0.5">
                <Activity size={12} />
              </div>
              <span className="text-gray-300 text-sm font-mono">Back-and-forth revisions eating days of billable hours.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-1 bg-red-400/10 text-red-400 rounded mt-0.5">
                <Activity size={12} />
              </div>
              <span className="text-gray-300 text-sm font-mono">Exporting assets one-by-one from design tools.</span>
            </li>
          </ul>
        </div>

        {/* Right Side: The Calculator */}
        <div className="bg-[#121212] border border-[#333] p-6 rounded relative">
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#00FF41]/20 text-[#00FF41] font-mono text-xs border-b border-l border-[#00FF41]/30">
            INTERACTIVE
          </div>

          <div className="space-y-6 mt-4">
            {/* Input: Campaign Volume */}
            <div>
              <label className="block text-xs font-mono text-gray-500 mb-3 uppercase tracking-wider">Campaign Volume (Assets)</label>
              <input
                type="range" min="10" max="500" value={banners}
                onChange={(e) => setBanners(Number(e.target.value))}
                className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#00FF41]"
              />
              <div className="text-right text-white font-mono text-lg mt-2">{banners} <span className="text-gray-500 text-sm">assets</span></div>
            </div>

            {/* Input: Manual Time */}
            <div>
              <label className="block text-xs font-mono text-gray-500 mb-3 uppercase tracking-wider">Manual Time Per Asset (Hours)</label>
              <input
                type="range" min="0.5" max="5" step="0.5" value={timePerBanner}
                onChange={(e) => setTimePerBanner(Number(e.target.value))}
                className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#00FF41]"
              />
              <div className="text-right text-white font-mono text-lg mt-2">{timePerBanner} <span className="text-gray-500 text-sm">hrs</span></div>
            </div>

            {/* Input: Hourly Rate */}
            <div>
              <label className="block text-xs font-mono text-gray-500 mb-3 uppercase tracking-wider">Hourly Rate (€)</label>
              <input
                type="range" min="40" max="200" step="5" value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#00FF41]"
              />
              <div className="text-right text-white font-mono text-lg mt-2">€{hourlyRate}<span className="text-gray-500 text-sm">/hr</span></div>
            </div>

            {/* Results Display */}
            <div className="pt-6 border-t border-[#333]">
              <div className="mb-2">
                <div className="text-gray-500 font-mono text-xs uppercase tracking-wider mb-2">Potential Savings:</div>
                <div className="text-5xl font-bold text-[#00FF41]">€{savings.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div className="text-xs text-gray-500 mt-2 font-mono uppercase tracking-wider">Per Campaign</div>
              </div>

              {/* CTA Button */}
              <button
                onClick={scrollToContact}
                className="w-full mt-6 bg-[#00FF41] text-[#121212] font-bold px-6 py-3 hover:bg-[#00CC33] transition-all uppercase tracking-wider text-sm font-mono flex items-center justify-center gap-2"
              >
                CLAIM_SAVINGS <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}