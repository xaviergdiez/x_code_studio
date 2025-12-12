import React, { useState } from 'react';
import { Terminal, Code, Cpu, Zap, ChevronRight, CheckCircle, Menu, X } from 'lucide-react';

/**
 * x-code.studio - Technical Director as a Service
 * Brand Aesthetic: CLI/Terminal, Monospaced, Dark Mode
 * Colors: Charcoal (#121212), Neon Green (#00FF41), Electric Blue (#007ACC)
 */

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Logic
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] font-mono selection:bg-[#00FF41] selection:text-[#121212]">
      
      {/* Navigation Bar - Status Line Style */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#121212]/95 border-b border-[#333] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo: > x-code.studio _ */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => scrollToSection('home')}
            >
              <span className="text-[#00FF41] font-bold text-xl">{'>'}</span>
              <span className="text-white font-bold text-xl tracking-tight group-hover:text-[#00FF41] transition-colors">
                x-code.studio
              </span>
              <span className="animate-pulse text-[#00FF41] text-xl">_</span>
            </div>

            {/* Desktop Navigation: Directory Paths */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['services', 'methodology', 'audit', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-sm text-gray-400 hover:text-[#00FF41] transition-colors duration-200 px-3 py-2 rounded-md font-medium"
                  >
                    /{item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
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
              {['services', 'methodology', 'audit', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-300 hover:text-[#00FF41] block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  ./{item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        
        {/* HERO SECTION: The "Hybrid" Statement */}
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
              <div className="inline-block px-3 py-1 border border-[#00FF41] text-[#00FF41] text-xs uppercase tracking-widest mb-4">
                System Status: Online
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-tight">
                BRIDGING THE <br />
                <span className="text-[#007ACC]">DESIGN</span>-<span className="text-[#00FF41]">DEV</span> GAP
              </h1>
              
              <p className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed">
                <span className="text-[#00FF41]">{'>'}</span> Technical Director as a Service.<br/>
                Optimization, Automation, and High-Performance Code for Elite Agencies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button 
                  onClick={() => scrollToSection('audit')}
                  className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-[#121212] bg-[#00FF41] hover:bg-[#00CC33] transition-all"
                >
                  <Terminal className="w-5 h-5 mr-2" />
                  ./RUN_AUDIT
                </button>
                
                <button 
                  onClick={() => scrollToSection('services')}
                  className="group inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white border border-[#333] hover:border-white transition-all bg-[#1E1E1E]"
                >
                  <Code className="w-5 h-5 mr-2" />
                  ./VIEW_WORK
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM/SOLUTION: Split Terminal View */}
        <section id="methodology" className="py-24 bg-[#121212] border-b border-[#333]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-stretch">
              
              {/* Left Pane: The Problem (Red Accent) */}
              <div className="bg-[#1E1E1E] rounded border border-[#333] p-6 relative overflow-hidden group hover:border-red-500/50 transition-colors">
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

              {/* Right Pane: The Solution (Green Accent) */}
              <div className="bg-[#1E1E1E] rounded border border-[#333] p-6 relative overflow-hidden group hover:border-[#00FF41]/50 transition-colors">
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

        {/* SERVICES: The Four Modules */}
        <section id="services" className="py-24 border-b border-[#333]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 flex items-center">
              <span className="text-[#00FF41] mr-4">{'>'}</span> 
              AVAILABLE_MODULES
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Module 1 */}
              <ServiceCard 
                id="01" 
                title="PRODUCTION.exe" 
                icon={<Zap className="w-6 h-6 text-[#00FF41]" />}
                desc="High-end execution. GSAP motion graphics, Dynamic Content Optimization (DCO), and complex frontend architecture. We build what your internal team can't."
              />
              {/* Module 2 */}
              <ServiceCard 
                id="02" 
                title="CONSULTANCY.sys" 
                icon={<Terminal className="w-6 h-6 text-[#007ACC]" />}
                desc="Workflow Audits. From broken pipelines to profitable systems. We identify the 'Designer-Developer' friction points and script the solution."
              />
              {/* Module 3 */}
              <ServiceCard 
                id="03" 
                title="EDUCATION.lib" 
                icon={<Code className="w-6 h-6 text-yellow-500" />}
                desc="Upskilling internal teams. Based on the Master Course curriculum at NEOLAND. Elevate your juniors to architects."
              />
              {/* Module 4 */}
              <ServiceCard 
                id="04" 
                title="R&D_LABS.bat" 
                icon={<Cpu className="w-6 h-6 text-purple-500" />}
                desc="Proprietary micro-SaaS tools for agency automation. Beta access available for retainer clients."
              />
            </div>
          </div>
        </section>

        {/* AUDIT FORM: Command Line Input */}
        <section id="audit" className="py-24 bg-[#1E1E1E]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#121212] border border-[#333] rounded-lg shadow-2xl p-8 md:p-12">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  <span className="text-[#00FF41] blink mr-2">█</span>
                  RUN_DIAGNOSTIC
                </h3>
                <p className="text-gray-400">
                  Your production pipeline is leaking money. Let&apos;s find the leak.
                </p>
              </div>

              <form className="space-y-6 font-mono text-sm md:text-base">
                <div className="group">
                  <label className="block text-[#007ACC] mb-2">{'>'} enter_name:</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors"
                    placeholder="John Doe" 
                  />
                </div>

                <div className="group">
                  <label className="block text-[#007ACC] mb-2">{'>'} target_email:</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors"
                    placeholder="john@agency.com" 
                  />
                </div>

                <div className="group">
                  <label className="block text-[#007ACC] mb-2">{'>'} describe_stack_trace:</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors resize-none"
                    placeholder="We use React and Figma, but handoffs take 3 days..." 
                  />
                </div>

                <div className="pt-6">
                  <button type="button" className="w-full md:w-auto bg-[#00FF41] text-[#121212] font-bold px-8 py-4 hover:bg-[#00CC33] transition-colors flex items-center justify-center">
                    EXECUTE_REQUEST <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#121212] border-t border-[#333] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <div className="mb-4 md:mb-0 font-mono">
              &copy; {new Date().getFullYear()} x-code.studio <span className="mx-2">|</span> Amsterdam, NL
            </div>
            <div className="flex space-x-6">
               <a href="#" className="hover:text-[#00FF41]">./privacy</a>
               <a href="#" className="hover:text-[#00FF41]">./terms</a>
               <a href="#" className="hover:text-[#00FF41]">./contact</a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}

// Sub-Component for Service Cards
function ServiceCard({ id, title, icon, desc }: { id: string; title: string; icon: React.ReactNode; desc: string }) {
  return (
    <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded hover:border-[#00FF41] transition-all duration-300 group cursor-default">
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
      <p className="text-gray-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}