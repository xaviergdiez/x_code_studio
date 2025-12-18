import React, { useState, useRef, useLayoutEffect } from 'react';
import { Terminal, Code, Cpu, Zap, ChevronRight, CheckCircle, Menu, X, ArrowRight, ExternalLink, RefreshCw, LayoutTemplate, MessageSquare, Globe, Layers, Database, Video, Mail, Star, ShieldAlert, BookOpen, Linkedin, PenTool, Figma, GraduationCap } from 'lucide-react';

// GSAP Imports
// Note: In a real environment, ensure gsap is installed: npm install gsap @gsap/react @formspree/react
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText'; 
import { useForm, ValidationError } from '@formspree/react';

/**
 * x-code.studio - Creative Technologist & One-Person Agency
 * Version: 5.1 (Design System Offering Update)
 * - Pricing: Swapped 'Dev Sprint' for 'Design System' package
 */

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const appRef = useRef(null);
  
  // ---------------------------------------------------------------------------
  // FORMSPREE CONFIGURATION
  // ---------------------------------------------------------------------------
  const [formState, handleFormSubmit] = useForm("xdkqvorr");

  // ---------------------------------------------------------------------------
  // NEWSLETTER STATE
  // ---------------------------------------------------------------------------
  const [emailInput, setEmailInput] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle"); 

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterStatus("sending");
    setTimeout(() => {
      setNewsletterStatus("success");
      setEmailInput("");
    }, 1500);
  };

  // ---------------------------------------------------------------------------
  // GSAP ANIMATION ENGINE
  // ---------------------------------------------------------------------------
  useLayoutEffect(() => {
    const plugins = [ScrollTrigger];
    if (typeof SplitText !== 'undefined') plugins.push(SplitText);
    gsap.registerPlugin(...plugins);

    const ctx = gsap.context(() => {
      
      // 1. HERO ANIMATION
      if (typeof SplitText !== 'undefined') {
        const heroSplit = new SplitText(".hero-text-anim", { type: "chars" });
        gsap.timeline()
          .from(heroSplit.chars, {
            duration: 0.05,
            opacity: 0,
            display: 'none',
            stagger: 0.04,
            ease: "none",
          })
          .from(".nav-anim", { y: -20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.5")
          .from(".hero-sub-anim", { y: 20, opacity: 0, duration: 0.8 }, "-=0.2");
      } else {
        gsap.from(".hero-text-anim", { opacity: 0, duration: 1, y: 20, stagger: 0.2 });
        gsap.from(".nav-anim", { y: -20, opacity: 0, stagger: 0.1, duration: 0.5, delay: 0.2 });
        gsap.from(".hero-sub-anim", { y: 20, opacity: 0, duration: 0.8, delay: 0.4 });
      }

      // 2. SCROLL REVEALS
      gsap.utils.toArray('.section-reveal').forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: { trigger: elem, start: "top 85%" },
          y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
        });
      });

      // 3. PRICING CARDS STAGGER
      gsap.from(".pricing-card", {
        scrollTrigger: { trigger: "#plans", start: "top 75%" },
        y: 60, opacity: 0, stagger: 0.2, duration: 0.8, ease: "back.out(1.2)"
      });

    }, appRef);
    return () => ctx.revert();
  }, []);

  // Navigation Logic
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div ref={appRef} className="min-h-screen bg-[#121212] text-[#E0E0E0] font-mono selection:bg-[#00FF41] selection:text-[#121212] overflow-x-hidden">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#121212]/95 border-b border-[#333] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 cursor-pointer group nav-anim" onClick={() => scrollToSection('home')}>
              <span className="text-[#00FF41] font-bold text-xl">{'>'}</span>
              <span className="text-white font-bold text-xl tracking-tight">x-code.studio</span>
              <span className="animate-pulse text-[#00FF41] text-xl">_</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['capabilities', 'social_proof', 'plans', 'audit'].map((item) => (
                  <button key={item} onClick={() => scrollToSection(item)} className="nav-anim text-sm text-gray-400 hover:text-[#00FF41] px-3 py-2 font-medium uppercase tracking-wider">
                    /{item}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#121212] border-b border-[#333]">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['capabilities', 'social_proof', 'plans', 'audit'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item)} 
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-[#00FF41]"
                >
                  /{item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        
        {/* HERO */}
        <section id="home" className="min-h-screen flex items-center justify-center relative border-b border-[#333]">
          <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
            <div className="space-y-6">
              <div className="nav-anim inline-block px-3 py-1 border border-[#00FF41] text-[#00FF41] text-xs uppercase tracking-widest mb-4">
                Creative Technologist | Product Designer | Educator
              </div>
              <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-tight hero-text-anim">
                <div className="block">DESIGN ENGINEERED</div>
                <div className="block text-[#00FF41]">FOR SCALE</div>
              </h1>
              <div className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed hero-sub-anim">
                <span className="text-[#00FF41]">{'>'}</span> Bridging the gap between High-Fidelity Design and High-Performance Code.
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-8 hero-sub-anim">
                <button onClick={() => scrollToSection('plans')} className="px-8 py-3 font-bold text-[#121212] bg-[#00FF41] hover:bg-[#00CC33] transition-all">
                  VIEW_ACCESS_PLANS
                </button>
                <button onClick={() => scrollToSection('audit')} className="px-8 py-3 font-bold text-white border border-[#333] hover:border-white transition-all bg-[#1E1E1E]">
                  BOOK_AUDIT
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* HUMAN BIO (Updated Authority) */}
        <section id="profile" className="py-20 border-b border-[#333] bg-[#1a1a1a]">
          <div className="max-w-5xl mx-auto px-4 section-reveal">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3">
                 <div className="text-[#007ACC] font-bold mb-2 text-sm tracking-widest">WHO_AM_I --human_mode</div>
                 <h2 className="text-3xl font-bold text-white">I SPEAK PIXEL AND I SPEAK LOGIC.</h2>
              </div>
              <div className="w-full md:w-2/3 text-gray-400 leading-relaxed space-y-4">
                <p>
                  I am a <span className="text-white">Designer</span> who learned to code to protect the integrity of my designs.
                </p>
                <p>
                  My career isn't just about fixing bugs; it's about architecture. <span className="text-white">As a Product Design Master Course Teacher</span>, I train the next generation of designers to think in systems. I don't just hand off code; I build the tools (plugins, automations) that empower design teams to work 10x faster.
                </p>
                <p>
                  I bridge the gap between the <span className="text-white">Creative Director's vision</span> and the <span className="text-white">Ad Server's logic</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BRIDGING LOG (Methodology) */}
        <section className="py-20 border-b border-[#333] bg-[#121212] font-mono text-xs md:text-sm">
           <div className="max-w-3xl mx-auto px-4 section-reveal">
              <div className="bg-[#1E1E1E] p-6 border border-[#333] rounded shadow-2xl overflow-x-auto">
                 <div className="flex gap-2 mb-4">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
                 <div className="space-y-2 text-gray-300">
                   <div className="text-[#007ACC] font-bold mb-2">&gt; BRIDGING.log</div>
                   <div><span className="text-purple-400">[INPUT]:</span>&nbsp;&nbsp;Pure Design (Figma/Adobe)</div>
                   <div><span className="text-purple-400">[INPUT]:</span>&nbsp;&nbsp;Pure Engineering (React/Node)</div>
                   <div className="mt-4"><span className="text-yellow-400">[PROCESS]:</span></div>
                   <div className="pl-4">if (Design == Static) &#123;</div>
                   <div className="pl-8 text-[#00FF41]">Inject(GSAP_Timeline); // Make it alive</div>
                   <div className="pl-4">&#125;</div>
                   <div className="pl-4">if (Code == Messy) &#123;</div>
                   <div className="pl-8 text-[#00FF41]">Apply(Design_System_Tokens); // Make it consistent</div>
                   <div className="pl-4">&#125;</div>
                   <div className="mt-4"><span className="text-blue-400">[OUTPUT]:</span> A product that feels expensive and works flawlessly.</div>
                 </div>
              </div>
           </div>
        </section>

        {/* SOCIAL PROOF */}
        <section id="social_proof" className="py-20 border-b border-[#333] bg-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-4">
             <div className="mb-12 section-reveal">
                <h2 className="text-2xl font-bold mb-4"><span className="text-[#00FF41]">{'>'}</span> PEER_VALIDATION --linkedin_verified</h2>
             </div>
             
             <div className="grid md:grid-cols-2 gap-6">
                
                {/* Kristina Brown */}
                <div className="section-reveal border border-[#333] bg-[#121212] p-6 font-mono text-sm relative group hover:border-[#00FF41] transition-colors">
                   <div className="absolute top-4 right-4 text-[#007ACC]"><Linkedin size={16} fill="#007ACC" className="text-[#007ACC]"/></div>
                   <p className="text-gray-300 mb-6 leading-relaxed italic">
                      "As a cornerstone of our development team... he was instrumental in creating high-quality HTML ads for key LCS and GCS clients (Google). He built new workflows that improved the team's efficiency... and directly contributed to exceeding client ROI expectations."
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
                <div className="section-reveal border border-[#333] bg-[#121212] p-6 font-mono text-sm relative group hover:border-[#00FF41] transition-colors">
                   <div className="absolute top-4 right-4 text-[#007ACC]"><Linkedin size={16} fill="#007ACC" className="text-[#007ACC]"/></div>
                   <p className="text-gray-300 mb-6 leading-relaxed italic">
                      "From building automated pipelines and writing smart scripts... Xavier always finds a way to add value. On a large client project his framework allowed us to render assets at massive scale in a fraction of the time, saving the team countless hours."
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
                <div className="section-reveal border border-[#333] bg-[#121212] p-6 font-mono text-sm relative group hover:border-[#00FF41] transition-colors">
                   <div className="absolute top-4 right-4 text-[#007ACC]"><Linkedin size={16} fill="#007ACC" className="text-[#007ACC]"/></div>
                   <p className="text-gray-300 mb-6 leading-relaxed italic">
                      "He masterfully organizes and delivers on large-scale projects, ensuring they are built to scale. Beyond excellent technical skills in areas like web animation, Xavi is a natural leader who genuinely supports the development of his colleagues."
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
                <div className="section-reveal border border-[#333] bg-[#121212] p-6 font-mono text-sm relative group hover:border-[#00FF41] transition-colors">
                   <div className="absolute top-4 right-4 text-[#007ACC]"><Linkedin size={16} fill="#007ACC" className="text-[#007ACC]"/></div>
                   <p className="text-gray-300 mb-6 leading-relaxed italic">
                      "Highly focused professional who seamlessly bridges business objectives with client needs... ensuring that expectations are met with precision. His leadership consistently sets the standard."
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

        {/* CAPABILITIES MATRIX (Updated) */}
        <section id="capabilities" className="py-24 border-b border-[#333]">
           <div className="max-w-7xl mx-auto px-4">
              <div className="mb-16 section-reveal">
                <h2 className="text-3xl font-bold mb-4"><span className="text-[#00FF41]">{'>'}</span> SYSTEM_CAPABILITIES</h2>
                <p className="text-gray-400 max-w-2xl">Bridging the Design-Dev gap.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 
                 {/* 1. MOTION UI (High-Performance) */}
                 <CapabilityCard 
                    icon={<Zap className="text-[#00FF41]" />}
                    title="MOTION_UI.run"
                    skills={["GSAP", "WebGL", "Scrollytelling", "Micro-interactions", "Performance"]}
                    desc="Standard designers use video; I use code. Leveraging GSAP and WebGL to create physics-based, interaction-driven experiences that load instantly. The fluid feel of a native app, in the browser."
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

                 {/* 4. AUTOMATED DESIGN OPS */}
                 <CapabilityCard 
                    icon={<Cpu className="text-[#00FF41]" />}
                    title="AUTOMATED_DESIGN_OPS"
                    skills={["Python Scripting", "Asset Generation Pipelines", "Custom Figma Plugins", "Workflow Automation"]}
                    desc="I build the tools that let your designers design, not do data entry. Automating the boring stuff."
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

        {/* PRICING PLANS */}
        <section id="plans" className="py-24 border-b border-[#333]">
           <div className="max-w-7xl mx-auto px-4">
             <div className="mb-16 text-center section-reveal">
                <h2 className="text-3xl font-bold mb-4">COMMERCIAL_PACKAGES</h2>
                <p className="text-gray-400">Fixed outcomes. No hourly surprises.</p>
             </div>

             <div className="grid md:grid-cols-3 gap-8 items-start">
                <PricingCard 
                  title="WORKFLOW AUDIT"
                  price="€995"
                  period="one-time"
                  desc="Identify the bottlenecks costing you money."
                  features={[
                    "Codebase Review (Git)",
                    "DCO Feed Stress Test",
                    "Performance Profiling",
                    "Strategy PDF Report"
                  ]}
                  cta="BOOK_AUDIT"
                  onClick={() => scrollToSection('audit')}
                />
                
                <PricingCard 
                  title="FRACTIONAL TD"
                  price="€3,500"
                  period="/month"
                  highlight={true}
                  desc="Architecture & Leadership."
                  features={[
                    "Unlimited Request Queue",
                    "Async Trello/Linear Workflow",
                    "Direct Slack Access",
                    "Pause/Cancel Anytime",
                    "Full Stack & Ad Tech Access"
                  ]}
                  cta="SUBSCRIBE_RETAINER"
                  onClick={() => window.open('mailto:hello@x-code.studio?subject=Subscription Inquiry')}
                />

                <PricingCard 
                  title="DESIGN SYSTEM"
                  price="€4,500"
                  period="package"
                  desc="From Atomic Design to Production Code."
                  features={[
                    "Figma System (Atomic, Tokens)",
                    "Ready-to-Dev Hand-off",
                    "Ad Templates (Social, DCO, HTML5)",
                    "UX/UI Web Design & Animations",
                    "Landing Page Custom Interactions"
                  ]}
                  cta="BUILD_SYSTEM"
                  onClick={() => scrollToSection('audit')}
                />
             </div>
           </div>
        </section>

        {/* AUDIT / CONTACT FORM */}
        <section id="audit" className="py-24 bg-[#1E1E1E]">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-[#121212] border border-[#333] rounded-lg shadow-2xl p-8 md:p-12 font-mono">
              
              {formState.succeeded ? (
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
                <form onSubmit={handleFormSubmit} className="space-y-6">
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
                        className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors" 
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
                        className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors" 
                        placeholder="your@email.com" 
                      />
                    </div>
                  </div>

                  {/* MISSION SELECTOR */}
                  <div className="group">
                     <label className="block text-[#007ACC] mb-2" htmlFor="mission">{'>'} select_mission_profile:</label>
                     <div className="relative">
                        <select 
                          id="mission" 
                          name="mission" 
                          className="w-full bg-[#1a1a1a] border border-[#333] text-white p-3 appearance-none focus:border-[#00FF41] outline-none"
                          required
                        >
                           <option value="" disabled selected>-- Select Protocol --</option>
                           <option value="audit">Pipeline Audit (€995) - Fix my workflow</option>
                           <option value="sprint">Dev Sprint (€2.5k) - Critical Firefighting</option>
                           <option value="retainer">Fractional Retainer (€3.5k) - Ongoing Architecture</option>
                           <option value="education">Education/Workshop - Train my team</option>
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
                      className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none resize-none" 
                      placeholder="Context: We are launching a global DCO campaign in 2 weeks..." 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={formState.submitting} 
                    className="w-full bg-[#00FF41] text-[#121212] font-bold px-8 py-4 hover:bg-[#00CC33] transition-colors flex items-center justify-center uppercase tracking-wider disabled:opacity-50"
                  >
                    {formState.submitting ? 'TRANSMITTING...' : '[ TRANSMIT_REQUEST ]'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <section id="newsletter" className="py-20 border-b border-[#333] bg-[#121212]">
           <div className="max-w-3xl mx-auto px-4 text-center section-reveal">
              <Mail className="w-8 h-8 text-[#00FF41] mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">THE KERNEL_LOG</h2>
              <p className="text-gray-400 mb-8">
                 Bi-weekly technical dispatches. Ad Tech insights, DCO architectures, and performance engineering.
              </p>
              
              <div className="bg-[#1E1E1E] p-1 inline-block border border-[#333] w-full max-w-md relative">
                 {newsletterStatus === "success" ? (
                   <div className="flex items-center justify-center p-3 text-[#00FF41]">
                     <CheckCircle className="w-4 h-4 mr-2"/>
                     <span className="font-mono text-sm">SUBSCRIBED_SUCCESSFULLY</span>
                   </div>
                 ) : (
                   <form onSubmit={handleNewsletterSubmit} className="flex">
                      <input 
                        type="email" 
                        placeholder="ENTER_EMAIL_ADDRESS" 
                        className="bg-transparent text-white p-3 outline-none flex-grow font-mono text-sm placeholder-gray-600"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                      />
                      <button 
                        type="submit"
                        disabled={newsletterStatus === "sending"} 
                        className="bg-[#333] text-[#00FF41] hover:bg-[#00FF41] hover:text-[#121212] px-6 font-bold text-sm transition-colors uppercase"
                      >
                        {newsletterStatus === "sending" ? "..." : "[ SUB ]"}
                      </button>
                   </form>
                 )}
              </div>
           </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#121212] border-t border-[#333] py-12">
          <div className="max-w-7xl mx-auto px-4 flex justify-between text-sm text-gray-500">
             <div>&copy; 2025 x-code.studio | Amsterdam, NL</div>
             <a href="mailto:hello@x-code.studio" className="hover:text-[#00FF41]">hello@x-code.studio</a>
          </div>
        </footer>

      </main>
    </div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

function CapabilityCard({ title, desc, skills, icon }) {
  return (
    <div className="section-reveal p-6 border border-[#333] bg-[#1a1a1a] hover:border-[#00FF41] transition-colors group h-full flex flex-col">
       <div className="mb-4">{icon}</div>
       <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
       <p className="text-gray-400 text-sm mb-4 leading-relaxed">{desc}</p>
       <div className="mt-auto flex flex-wrap gap-2">
         {skills.map((s,i) => (
           <span key={i} className="text-xs border border-[#333] text-gray-300 px-2 py-1 bg-[#121212]">{s}</span>
         ))}
       </div>
    </div>
  )
}

function ProtocolStep({ num, title, desc, icon }) {
  return (
    <div className="section-reveal p-6 border border-[#333] bg-[#1a1a1a] hover:border-[#00FF41] transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[#007ACC] font-bold text-lg">{num}</span>
        <div className="text-gray-400 group-hover:text-[#00FF41]">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function PricingCard({ title, price, period, desc, features, cta, highlight, onClick }) {
  return (
    <div className={`pricing-card relative p-8 border ${highlight ? 'border-[#00FF41] bg-[#1a1a1a]' : 'border-[#333] bg-[#121212]'} flex flex-col h-full`}>
      {highlight && <div className="absolute top-0 right-0 bg-[#00FF41] text-[#121212] text-xs font-bold px-2 py-1">MOST_POPULAR</div>}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="text-3xl font-bold text-[#00FF41] mb-1">{price}<span className="text-sm text-gray-500 font-normal">{period}</span></div>
      <p className="text-gray-400 text-sm mb-6 border-b border-[#333] pb-6">{desc}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((f, i) => (
           <li key={i} className="flex items-start text-sm text-gray-300">
             <CheckCircle className="w-4 h-4 text-[#007ACC] mr-2 mt-0.5 shrink-0" />
             {f}
           </li>
        ))}
      </ul>
      <button onClick={onClick} className={`w-full py-3 font-bold uppercase tracking-wider border ${highlight ? 'bg-[#00FF41] text-[#121212] border-[#00FF41]' : 'border-[#333] text-white hover:bg-[#333]'}`}>
        {cta}
      </button>
    </div>
  )
}