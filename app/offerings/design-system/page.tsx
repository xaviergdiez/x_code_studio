'use client';

import { ArrowLeft, CheckCircle, Figma, Code, Zap, Palette, Database } from 'lucide-react';
import Link from 'next/link';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] font-mono">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/95 border-b border-[#333] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:text-[#00FF41] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-bold">BACK_TO_HOME</span>
          </Link>
          <div className="text-right">
            <div className="text-sm text-[#007ACC]">DESIGN_SYS.config</div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        
        {/* HERO */}
        <section className="min-h-screen flex items-center justify-center relative border-b border-[#333] bg-[#1E1E1E]">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 w-full">
            <div className="space-y-8">
              <div className="inline-block px-3 py-1 border border-[#00FF41] text-[#00FF41] text-xs uppercase tracking-widest">
                DESIGN_SYS.config
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight">
                <span className="block">ARCHITECTING THE</span>
                <span className="block text-[#00FF41]">SOURCE OF TRUTH</span>
              </h1>
              
              <div className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed">
                <span className="text-[#00FF41]">{'>'}</span> Bridging Figma and React. I build Living Style Guides and Token Systems that ensure the design intent survives the development process. From atomic components to dark-mode architecture.
              </div>

              <div className="pt-8">
                <div className="inline-block px-6 py-3 bg-[#00FF41] text-[#121212] font-bold uppercase tracking-wider hover:bg-[#00CC33] transition-all">
                  €4,500 / PACKAGE
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="py-24 border-b border-[#333] bg-[#121212]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-4"><span className="text-[#00FF41]">{'>'}</span> WHAT_YOU_GET</h2>
              <p className="text-gray-400">Everything you need to scale design operations.</p>
            </div>

            <div className="space-y-6">
              <FeatureBlock
                icon={<Figma className="w-6 h-6 text-[#00FF41]" />}
                title="FIGMA DESIGN SYSTEM"
                desc="Complete atomic design methodology. Design Tokens, Figma Variables, responsive components at every scale (atoms → organisms). Light/dark mode pre-built."
                keywords={["Atomic Design", "Design Tokens", "Figma Variables", "Component Library"]}
              />

              <FeatureBlock
                icon={<Code className="w-6 h-6 text-[#00FF41]" />}
                title="READY-TO-DEV HAND-OFF"
                desc="Your developers receive documented, organized, production-ready component specs. No guesswork. No back-and-forth. Figma → React is seamless."
                keywords={["Component Specs", "Figma Documentation", "Dev Handoff", "Component Inventory"]}
              />

              <FeatureBlock
                icon={<Zap className="w-6 h-6 text-[#00FF41]" />}
                title="ADVERTISING TEMPLATES"
                desc="Ready-to-customize display ad frameworks. Covers Social Ads, Rich Media, HTML5, and DCO-enabled banner templates. Brand-consistent, performance-optimized."
                keywords={["Display Ads", "Rich Media", "HTML5", "DCO Framework"]}
              />

              <FeatureBlock
                icon={<Palette className="w-6 h-6 text-[#00FF41]" />}
                title="UX/UI WEB DESIGN"
                desc="Modern interface design for web applications. Accessibility-first, performance-optimized. From wireframes to hi-fi design system implementation."
                keywords={["Web Design", "Accessibility (A11y)", "UI/UX", "Design Systems"]}
              />

              <FeatureBlock
                icon={<Database className="w-6 h-6 text-[#00FF41]" />}
                title="LANDING PAGE ANIMATIONS"
                desc="Custom GSAP animations and interactions. Scrollytelling, micro-interactions, page transitions. High-fidelity motion that feels native."
                keywords={["GSAP Animations", "Scrollytelling", "Micro-interactions", "Performance"]}
              />
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section className="py-24 border-b border-[#333] bg-[#1a1a1a]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-4"><span className="text-[#00FF41]">{'>'}</span> DELIVERABLES</h2>
              <p className="text-gray-400">Exactly what you&apos;ll receive.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-[#333] bg-[#1E1E1E] p-8 rounded">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#00FF41]" />
                  Figma File
                </h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>{'>'} Atomic Design structure (atoms, molecules, organisms)</li>
                  <li>{'>'} Design Tokens + Figma Variables</li>
                  <li>{'>'} Light & Dark mode components</li>
                  <li>{'>'} 50+ reusable components</li>
                  <li>{'>'} Copy, specs, and usage guidelines</li>
                </ul>
              </div>

              <div className="border border-[#333] bg-[#1E1E1E] p-8 rounded">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#00FF41]" />
                  Ad Templates
                </h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>{'>'} Social Media templates (16:9, Square, Stories)</li>
                  <li>{'>'} Rich Media banner framework</li>
                  <li>{'>'} HTML5 ad scaffold + GSAP animations</li>
                  <li>{'>'} DCO-ready data feeds + placeholders</li>
                  <li>{'>'} Performance optimized for all platforms</li>
                </ul>
              </div>

              <div className="border border-[#333] bg-[#1E1E1E] p-8 rounded">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#00FF41]" />
                  Web Design
                </h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>{'>'} Marketing website design (6-8 pages)</li>
                  <li>{'>'} Mobile-first responsive design</li>
                  <li>{'>'} Interaction & animation specifications</li>
                  <li>{'>'} Accessibility audit (WCAG 2.1 AA)</li>
                  <li>{'>'} Design handoff documentation</li>
                </ul>
              </div>

              <div className="border border-[#333] bg-[#1E1E1E] p-8 rounded">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#00FF41]" />
                  Development Assets
                </h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>{'>'} React component library scaffold</li>
                  <li>{'>'} CSS/Tailwind tokens</li>
                  <li>{'>'} GSAP animation code snippets</li>
                  <li>{'>'} GitHub repository + documentation</li>
                  <li>{'>'} Developer handoff guide</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHY THIS WORKS */}
        <section className="py-24 border-b border-[#333] bg-[#121212]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-4"><span className="text-[#00FF41]">{'>'}</span> WHY_THIS_WORKS</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">FOR CTOS</h3>
                <p className="text-gray-400 leading-relaxed">
                  Design Systems solve scalability. Your team ships 10x faster because components are pre-built, tested, and documented. One source of truth means fewer bugs, cleaner code, and faster feature velocity.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">FOR CREATIVE DIRECTORS</h3>
                <p className="text-gray-400 leading-relaxed">
                  Consistency across all touchpoints. No more design drift. Every ad, every landing page, every email uses the same token system. Your brand integrity is protected by architecture.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">FOR AGENCIES</h3>
                <p className="text-gray-400 leading-relaxed">
                  This is the infrastructure your clients need but can&apos;t build themselves. You become the strategic partner, not the order-taker. Justify premium pricing because you&apos;re building systems, not banners.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">FOR DESIGNERS & DEVS</h3>
                <p className="text-gray-400 leading-relaxed">
                  A shared vocabulary. Designers work in Figma with tokens. Devs implement those exact tokens in code. No miscommunication. No rework. Collaboration becomes seamless.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-24 border-b border-[#333] bg-[#1a1a1a]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-4"><span className="text-[#00FF41]">{'>'}</span> PROJECT_TIMELINE</h2>
              <p className="text-gray-400">Typical engagement: 6-8 weeks</p>
            </div>

            <div className="space-y-6">
              <TimelineStep
                week="WEEK 01-02"
                title="DISCOVERY & AUDIT"
                items={["Audit existing design & code", "Define token structure", "Plan atomic design hierarchy"]}
              />
              <TimelineStep
                week="WEEK 03-04"
                title="DESIGN SYSTEM FOUNDATION"
                items={["Build Figma component library", "Define Design Tokens & Variables", "Create responsive component specs"]}
              />
              <TimelineStep
                week="WEEK 05-06"
                title="AD TEMPLATES & WEB DESIGN"
                items={["Design display ad templates (Social, Rich Media, HTML5)", "Design web pages using system components", "Implement GSAP animations"]}
              />
              <TimelineStep
                week="WEEK 07-08"
                title="HANDOFF & DOCUMENTATION"
                items={["Prepare Figma handoff specs", "Document component usage", "Create developer setup guide", "Final review & iteration"]}
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 border-b border-[#333] bg-[#121212]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-4"><span className="text-[#00FF41]">{'>'}</span> FAQ</h2>
            </div>

            <div className="space-y-4">
              <FAQItem
                q="What if we already have a design system?"
                a="I audit it, improve it, and scale it. Most existing systems lack proper tokenization or consistency. We&apos;ll enhance what you have and add the missing pieces."
              />
              <FAQItem
                q="Can you include dev implementation?"
                a="Yes. That&apos;s a separate engagement (€2,500+). This package covers Figma + deliverables. You or your team implement the React components."
              />
              <FAQItem
                q="Do you offer ongoing support?"
                a="Yes. After delivery, you can add me as your Fractional TD (€3,500/month) to maintain and evolve the system as your product grows."
              />
              <FAQItem
                q="What design tool do you use?"
                a="Figma exclusively. It&apos;s the industry standard for component systems, tokens, and handoff. Full integration with Figma Variables and documentation."
              />
              <FAQItem
                q="Can we customize the timeline?"
                a="Yes. If you need it faster, we can compress the timeline. If you need more polish, we can extend. Let&apos;s discuss your constraints."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#1E1E1E] border-t border-[#333]">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">READY TO BUILD YOUR SYSTEM?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s architect the infrastructure that scales your design operations.
            </p>
            <a 
              href="mailto:hello@x-code.studio?subject=Design%20System%20Inquiry%20-%20DESIGN_SYS.config"
              className="inline-block px-8 py-4 bg-[#00FF41] text-[#121212] font-bold uppercase tracking-wider hover:bg-[#00CC33] transition-all text-lg"
            >
              BOOK_CONSULTATION
            </a>
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

function FeatureBlock({ icon, title, desc, keywords }: { icon: React.ReactNode; title: string; desc: string; keywords: string[] }) {
  return (
    <div className="border border-[#333] bg-[#1E1E1E] p-8 rounded hover:border-[#00FF41] transition-colors">
      <div className="flex gap-4 mb-4">
        <div className="p-2 bg-[#121212] rounded border border-[#333]">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white flex items-center">{title}</h3>
      </div>
      <p className="text-gray-400 mb-4 leading-relaxed">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {keywords.map((kw, i) => (
          <span key={i} className="text-xs bg-[#121212] border border-[#333] text-gray-300 px-2 py-1 rounded">
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
}

function TimelineStep({ week, title, items }: { week: string; title: string; items: string[] }) {
  return (
    <div className="border-l-4 border-[#00FF41] pl-6 py-4">
      <div className="text-[#00FF41] font-bold text-sm mb-2">{week}</div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <ul className="space-y-2 text-gray-400">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-[#00FF41] font-bold mr-2">{'>'}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="border border-[#333] bg-[#1E1E1E] p-6 rounded hover:border-[#00FF41] transition-colors group cursor-pointer">
      <summary className="font-bold text-white flex justify-between items-center">
        <span>{q}</span>
        <span className="text-[#00FF41] group-open:rotate-180 transition-transform">▼</span>
      </summary>
      <p className="text-gray-400 mt-4 leading-relaxed">{a}</p>
    </details>
  );
}
