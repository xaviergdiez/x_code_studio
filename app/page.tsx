'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { Terminal, Code, Zap, CheckCircle, Menu, X, ArrowRight, ExternalLink, RefreshCw, LayoutTemplate, Globe, Layers, Database, MessageSquare } from 'lucide-react';

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
              SYSTEM_STACK
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard 
                id="01" 
                title="Ad Tech & Programmatic" 
                icon={<Globe className="w-6 h-6 text-[#00FF41]" />}
                desc="Building scalable, data-driven ad architectures that serve personalized content globally. Display & Video 360, Campaign Manager 360, DCO Architecture."
              />
              <ServiceCard 
                id="02" 
                title="Interactive Animation" 
                icon={<Zap className="w-6 h-6 text-[#00FF41]" />}
                desc="High-fidelity motion for web and display. Performance-optimized for all viewports. GSAP, WebGL, HTML5 Rich Media, Interaction Design."
              />
              <ServiceCard 
                id="03" 
                title="Web Engineering" 
                icon={<Code className="w-6 h-6 text-[#00FF41]" />}
                desc="Modern frontend development focused on Core Web Vitals and component scalability. Next.js, React, TypeScript, Node.js Automation, PWA."
              />
              <ServiceCard 
                id="04" 
                title="Creative Production" 
                icon={<Layers className="w-6 h-6 text-[#00FF41]" />}
                desc="From Adobe Creative Suite to code. Bridging the gap between static design and dynamic output. Video Editing, Ad Design, Social Assets."
              />
              <ServiceCard 
                id="05" 
                title="Data & Localization" 
                icon={<Database className="w-6 h-6 text-[#00FF41]" />}
                desc="Managing complex data feeds to power localized campaigns across multiple regions. Feed Management, Geo-Targeting, CRM Integration, EMEA/APAC/AMER."
              />
              <ServiceCard 
                id="06" 
                title="Technical Direction" 
                icon={<MessageSquare className="w-6 h-6 text-[#00FF41]" />}
                desc="End-to-end technical direction. I speak the language of developers and CMOs. HTML5 Email, Consultation, Audits, Vendor Management."
              />
            </div>
          </div>
        </section>
``
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
             <div className="border-t border-[#333] pt-24">
                <div className="mb-16 text-center section-reveal">
                   <h2 className="text-3xl font-bold mb-4"><span className="text-[#00FF41]">{'>'}</span> OFFERINGS</h2>
                   <p className="text-gray-400">Choose your engagement model.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                   <OfferingCard 
                     title="THE AUDIT"
                     subtitle="one-time"
                     desc="Diagnostics for your pipeline."
                     features={[
                       "Ad Tech Stack Review",
                       "Performance Profiling",
                       "Workflow Optimization Report",
                       "1-Hour Strategy Call"
                     ]}
                     cta="BOOK_AUDIT"
                     onClick={() => scrollToSection('audit')}
                   />
                   
                   <OfferingCard 
                     title="FRACTIONAL TD"
                     subtitle="/month"
                     highlight={true}
                     desc="Your dedicated technologist."
                     features={[
                       "Unlimited Request Queue",
                       "One active task at a time",
                       "Full Stack & Ad Tech Access",
                       "Direct Slack Access",
                       "Pause/Cancel Anytime"
                     ]}
                     cta="SUBSCRIBE"
                     onClick={() => window.open('mailto:hello@x-code.studio?subject=Subscription Inquiry')}
                   />

                   <OfferingCard 
                     title="DEV SPRINT"
                     subtitle="/week"
                     desc="For critical deadlines."
                     features={[
                       "Dedicated 5-Day Sprint",
                       "Single Feature Focus",
                       "Rush Delivery Protocol",
                       "Daily Async Standups"
                     ]}
                     cta="BOOK_SPRINT"
                     onClick={() => scrollToSection('audit')}
                   />
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
              
              {state.succeeded ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-[#00FF41] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">REQUEST_RECEIVED</h3>
                    <p className="text-gray-400">Thank you! We&apos;ll be in touch shortly.</p>
                  </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-8 section-reveal">
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      <span className="text-[#00FF41] animate-pulse">█</span>
                      <span>INITIATE_CONTACT</span>
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base">
                      Describe your technical needs. Brief or detailed—we adapt.
                    </p>
                  </div>

                  <div className="group">
                    <label className="block text-[#007ACC] mb-2" htmlFor="name">{'>'}  Your Name:</label>
                    <input 
                      id="name" 
                      type="text" 
                      name="name" 
                      required 
                      className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors placeholder-gray-700" 
                      placeholder="John Doe" 
                    />
                  </div>

                  <div className="group">
                    <label className="block text-[#007ACC] mb-2" htmlFor="email">{'>'}  Email Address:</label>
                    <input 
                      id="email" 
                      type="email" 
                      name="email" 
                      required 
                      className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors placeholder-gray-700" 
                      placeholder="john@agency.com" 
                    />
                  </div>

                  <div className="group">
                    <label className="block text-[#007ACC] mb-2" htmlFor="message">{'>'}  What challenge are we solving?</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={3} 
                      className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors resize-none placeholder-gray-700" 
                      placeholder="e.g. Handover friction, GSAP performance issues, Creative automation needs..." 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={state.submitting}
                    className="w-full md:w-auto bg-[#00FF41] text-[#121212] font-bold px-8 py-4 hover:bg-[#00CC33] transition-colors flex items-center justify-center uppercase tracking-wider disabled:opacity-50"
                  >
                    {state.submitting ? 'SENDING...' : '[ Send Inquiry ]'}
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

function OfferingCard({ title, subtitle, desc, features, cta, highlight, onClick }: { title: string; subtitle: string; desc: string; features: string[]; cta: string; highlight?: boolean; onClick: () => void }) {
  return (
    <div className={`section-reveal relative p-8 border ${highlight ? 'border-[#00FF41] bg-[#1a1a1a]' : 'border-[#333] bg-[#121212]'} flex flex-col h-full`}>
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
      <button onClick={onClick} className={`w-full py-3 font-bold uppercase tracking-wider border text-sm ${highlight ? 'bg-[#00FF41] text-[#121212] border-[#00FF41] hover:bg-[#00CC33]' : 'border-[#333] text-white hover:bg-[#333]'} transition-colors`}>
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