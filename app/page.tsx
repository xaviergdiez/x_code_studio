'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { Terminal, Code, Cpu, Zap, ChevronRight, CheckCircle, Menu, X, ArrowRight, ExternalLink } from 'lucide-react';

// GSAP Imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

      // 3. SCROLL TRIGGER: TERMINAL WINDOWS (Split Screen)
      // Left Slide In
      gsap.from(".terminal-left", {
        scrollTrigger: {
          trigger: "#methodology",
          start: "top 70%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Right Slide In
      gsap.from(".terminal-right", {
        scrollTrigger: {
          trigger: "#methodology",
          start: "top 70%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

      // 4. SCROLL TRIGGER: CASE STUDIES - Individual triggers for each card
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
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden border-b border-[#333]">
          {/* Background Grid Effect */}
          <div className="absolute inset-0 z-0 opacity-10" 
               style={{ 
                 backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
               }}>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="space-y-6">
              <div className="nav-anim inline-block px-3 py-1 border border-[#00FF41] text-[#00FF41] text-xs uppercase tracking-widest mb-4">
                System Status: Online
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-tight overflow-hidden">
                <span className="hero-text-anim block">BRIDGING THE</span>
                <span className="block">
                    <span className="text-[#007ACC] hero-text-anim">DESIGN</span>-
                    <span className="text-[#00FF41] hero-text-anim">DEV</span> 
                    <span className="hero-text-anim"> GAP</span>
                </span>
              </h1>
              
              <div className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed hero-sub-anim">
                <span className="text-[#00FF41]">{'>'}</span> Technical Director as a Service.<br/>
                Optimization, Automation, and High-Performance Code for Elite Agencies & Clients.
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-8 hero-sub-anim">
                <button 
                  onClick={() => scrollToSection('audit')}
                  className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-[#121212] bg-[#00FF41] hover:bg-[#00CC33] transition-all"
                >
                  <Terminal className="w-5 h-5 mr-2" />
                  ./RUN_AUDIT
                </button>
                
                <button 
                  onClick={() => scrollToSection('work')}
                  className="group inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white border border-[#333] hover:border-white transition-all bg-[#1E1E1E]"
                >
                  <Code className="w-5 h-5 mr-2" />
                  ./VIEW_WORK
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section id="services" className="py-24 border-b border-[#333]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-reveal text-3xl font-bold mb-12 flex items-center">
              <span className="text-[#00FF41] mr-4">{'>'}</span> 
              AVAILABLE_MODULES
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <ServiceCard 
                id="01" 
                title="PRODUCTION.exe" 
                icon={<Zap className="w-6 h-6 text-[#00FF41]" />}
                desc="High-end execution. GSAP motion graphics, Dynamic Content Optimization (DCO), and complex frontend architecture. We build what your internal team can't."
              />
              <ServiceCard 
                id="02" 
                title="CONSULTANCY.sys" 
                icon={<Terminal className="w-6 h-6 text-[#007ACC]" />}
                desc="Workflow Audits. From broken pipelines to profitable systems. We identify the 'Designer-Developer' friction points and script the solution."
              />
              <ServiceCard 
                id="03" 
                title="EDUCATION.lib" 
                icon={<Code className="w-6 h-6 text-yellow-500" />}
                desc="Upskilling internal teams. Based on the Master Course curriculum at NEOLAND. Elevate your juniors to architects."
              />
              <ServiceCard 
                id="04" 
                title="R&D_LABS.bat" 
                icon={<Cpu className="w-6 h-6 text-purple-500" />}
                desc="Proprietary micro-SaaS tools for agency automation. Beta access available for retainer clients."
              />
            </div>
          </div>
        </section>

        {/* --- METHODOLOGY / PROBLEM SOLUTION --- */}
        <section id="methodology" className="py-24 bg-[#121212] border-b border-[#333] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-stretch">
              
              {/* Left Pane: The Problem */}
              <div className="terminal-left bg-[#1E1E1E] rounded border border-[#333] p-6 relative group hover:border-red-500/50 transition-colors">
                <div className="absolute top-0 left-0 w-full h-8 bg-[#252526] border-b border-[#333] flex items-center px-4 space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-xs text-gray-500">error.log</span>
                </div>
                <div className="mt-8 font-mono text-sm space-y-4">
                  <div className="text-red-400">
                    <span className="opacity-50">01</span> [ERROR] Handover_Failed: Design assets do not match implementation.
                  </div>
                  <div className="text-red-400">
                    <span className="opacity-50">02</span> [WARN]  Performance_Critical: Animation frame rate &lt; 30fps.
                  </div>
                  <div className="text-red-400">
                    <span className="opacity-50">03</span> [FATAL] Productivity_Loss: <span className="font-bold underline">98 minutes wasted</span> per dev/week.
                  </div>
                  <div className="h-px bg-red-900/30 my-4"></div>
                  <p className="text-gray-400 italic">
                    Traditional agencies lack technical architecture. Dev shops lack creative nuance. The chasm is costing you money.
                  </p>
                </div>
              </div>

              {/* Right Pane: The Solution */}
              <div className="terminal-right bg-[#1E1E1E] rounded border border-[#333] p-6 relative group hover:border-[#00FF41]/50 transition-colors">
                 <div className="absolute top-0 left-0 w-full h-8 bg-[#252526] border-b border-[#333] flex items-center px-4 space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                  <span className="ml-4 text-xs text-gray-500">success.ts</span>
                </div>
                <div className="mt-8 font-mono text-sm space-y-4">
                  <div className="text-[#00FF41]">
                    <span className="opacity-50 text-gray-600">01</span> import &#123; HybridExpertise &#125; from &apos;x-code&apos;;
                  </div>
                  <div className="text-[#00FF41]">
                    <span className="opacity-50 text-gray-600">02</span> 
                  </div>
                  <div className="text-gray-300">
                    <span className="opacity-50 text-gray-600">03</span> const result = await Workflow.optimize(&#123;
                  </div>
                  <div className="text-gray-300 pl-4">
                     gsap: true,<br/>
                     automation: &quot;DCO&quot;,<br/>
                     overhead: 0
                  </div>
                  <div className="text-gray-300">
                    <span className="opacity-50 text-gray-600">07</span> &#125;);
                  </div>
                  <div className="text-[#00FF41]">
                    <span className="opacity-50 text-gray-600">08</span> {/* Output: Immediate pipeline velocity increase. */}
                  </div>
                   <div className="h-px bg-green-900/30 my-4"></div>
                   <div className="flex items-center text-[#00FF41]">
                     <CheckCircle className="w-4 h-4 mr-2" />
                     <span>System Optimized</span>
                   </div>
                </div>
              </div>

            </div>
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
              <div className="mb-8 section-reveal">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                  <span className="text-[#00FF41] animate-pulse mr-2">█</span>
                  SCHEDULE_CONSULTATION
                </h3>
                <p className="text-gray-400">
                  Let&apos;s discuss your workflow challenges.<br/>
                  Fill in the details below to get started.
                </p>
              </div>

              <form className="space-y-6 text-sm md:text-base">
                <div className="group">
                  <label className="block text-[#007ACC] mb-2">{'>'} set_user_identity:</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors placeholder-gray-700"
                    placeholder="John Doe" 
                  />
                </div>

                <div className="group">
                  <label className="block text-[#007ACC] mb-2">{'>'} set_target_contact:</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors placeholder-gray-700"
                    placeholder="john@agency.com" 
                  />
                </div>

                <div className="group">
                  <label className="block text-[#007ACC] mb-2">{'>'} input_stack_trace (Describe the problem):</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors resize-none placeholder-gray-700"
                    placeholder="e.g. Handover friction, GSAP performance issues, Creative automation needs..." 
                  />
                </div>

                <div className="pt-6">
                  <button type="button" className="w-full md:w-auto bg-[#00FF41] text-[#121212] font-bold px-8 py-4 hover:bg-[#00CC33] transition-colors flex items-center justify-center uppercase tracking-wider">
                    [ Send Inquiry ] <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </form>
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
                    Ready to optimize your pipeline? Whether it&apos;s high-performance motion or structural consultancy, I am ready to integrate.
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
                    <a href="#" className="text-gray-400 hover:text-white flex items-center">
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

function ServiceCard({ id, title, icon, desc }: { id: string; title: string; icon: React.ReactNode; desc: string }) {
  return (
    <div className="section-reveal bg-[#1E1E1E] border border-[#333] p-8 rounded hover:border-[#00FF41] transition-all duration-300 group cursor-default h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 bg-[#121212] rounded border border-[#333] group-hover:border-[#00FF41] transition-colors">
          {icon}
        </div>
        <span className="text-4xl font-bold text-[#333] group-hover:text-[#00FF41]/20 transition-colors">
          {id}
        </span>
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00FF41] transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed flex-grow">
        {desc}
      </p>
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