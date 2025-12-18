'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle, Zap, Calendar, MessageSquare } from 'lucide-react';

export default function SprintPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] font-mono">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#121212]/95 border-b border-[#333] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-[#00FF41]" />
              <span className="text-white group-hover:text-[#00FF41] transition-colors">x-code.studio</span>
            </Link>
            <div className="text-[#00FF41] font-bold">DEV_SPRINT</div>
          </div>
        </div>
      </nav>

      <main className="pt-32">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 border border-[#00FF41] text-[#00FF41] text-xs uppercase tracking-widest">
              Critical Firefighting
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              5-DAY<br/>
              <span className="text-[#00FF41]">DEV SPRINT</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              I block my calendar for 5 days. You get a dedicated technologist focused on one critical feature. Delivered Friday.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <div className="text-3xl font-bold text-[#00FF41]">€2,500</div>
              <div className="text-gray-400">/week</div>
            </div>
          </div>
        </section>

        {/* Best For */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            BEST_FOR
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              'Launch deadline is Monday. You need the feature live by Friday.',
              'Your lead dev quit. You need someone to stabilize the codebase.',
              'Campaign goes live in 5 days. Need a React component + integration.',
              'GSAP animation performance is tanking. Need emergency optimization.',
              'Feed automation broke. Need to rebuild the pipeline ASAP.',
              'New ad format requirement. Need to build & test by EOW.'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 border-l-2 border-[#00FF41] pl-6">
                <CheckCircle className="w-5 h-5 text-[#00FF41] shrink-0 mt-1" />
                <p className="text-gray-400">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What Happens */}
        <section className="max-w-5xl mx-auto px-4 mb-24 bg-[#1a1a1a] border border-[#333] p-12">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            SPRINT_PROTOCOL
          </h2>

          <div className="space-y-8">
            {[
              {
                day: 'Monday 9:00',
                title: 'Kickoff Standup (30 min)',
                items: [
                  'Define the single feature/fix',
                  'Scope & acceptance criteria',
                  'Tech stack alignment',
                  'Daily standup time (async, Slack)'
                ]
              },
              {
                day: 'Mon-Thu',
                title: 'Execution Phase',
                items: [
                  'Full-day focus on your feature',
                  'Daily async standup (15 min Slack)',
                  'Code pushed to your repo daily',
                  'Staging preview links by EOD'
                ]
              },
              {
                day: 'Friday EOD',
                title: '5-Day Guarantee Delivery',
                items: [
                  'Feature complete & tested',
                  'Code review + documentation',
                  'Handoff call (30 min)',
                  'Ready for production deployment'
                ]
              }
            ].map((phase, i) => (
              <div key={i}>
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="w-6 h-6 text-[#00FF41]" />
                  <h3 className="text-2xl font-bold text-white">{phase.day}</h3>
                </div>
                <h4 className="text-lg text-[#007ACC] font-bold mb-4">{phase.title}</h4>
                <ul className="space-y-3 ml-10">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-center text-gray-400">
                      <span className="text-[#00FF41] mr-3">▪</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Scope & Expectations */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            SCOPE_GUIDE
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-[#00FF41]/50 bg-[#1a1a1a] p-8">
              <h3 className="text-xl font-bold text-[#00FF41] mb-4">✓ FITS IN 5 DAYS</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{'▪'} React component (300-500 lines)</li>
                <li>{'▪'} GSAP animation + optimization</li>
                <li>{'▪'} Node.js script automation</li>
                <li>{'▪'} API integration (REST/GraphQL)</li>
                <li>{'▪'} Performance optimization</li>
                <li>{'▪'} Bug fix + refactoring</li>
              </ul>
            </div>

            <div className="border border-[#333] bg-[#121212] p-8">
              <h3 className="text-xl font-bold text-gray-400 mb-4">✗ DOESN&apos;T FIT</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{'▪'} Full app rebuild</li>
                <li>{'▪'} Multi-feature architectural change</li>
                <li>{'▪'} Extensive data migration</li>
                <li>{'▪'} Compliance/security audit</li>
                <li>{'▪'} Team training/education</li>
                <li>{'▪'} Design mockups (dev only)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            FAQ
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'What if my feature isn&apos;t done by Friday?',
                a: 'I guarantee delivery of the scope we defined Monday morning. If scope grows, we adjust. If I underestimate, I continue until Friday EOD.'
              },
              {
                q: 'Do I get source code & documentation?',
                a: 'Yes. Full source code pushed to your repo daily. Inline code comments. README documentation. Handoff runbook.'
              },
              {
                q: 'Can I add more features mid-sprint?',
                a: 'No scope creep. We defined the feature Monday. If you want more, it&apos;s a second sprint or upgrade to a monthly retainer.'
              },
              {
                q: 'What if I need the sprint to start Wednesday?',
                a: 'Standard sprint is Mon-Fri. Wed-Sun sprint is €3,250 (weekend rates). Thu-Mon sprint is €3,000. Custom dates negotiable.'
              },
              {
                q: 'Can I extend into the next week?',
                a: 'Yes. The sprint ends Friday EOD. If you want continued work, book another sprint or upgrade to a monthly Fractional TD.'
              }
            ].map((item, i) => (
              <div key={i} className="border border-[#333] bg-[#1a1a1a] p-6">
                <h4 className="text-white font-bold mb-3">{item.q}</h4>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] border border-[#333] p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Need to move fast?</h2>
            <Link 
              href="/#audit"
              className="inline-block bg-[#00FF41] text-[#121212] font-bold px-8 py-4 hover:bg-[#00CC33] transition-colors uppercase tracking-wider"
            >
              Book Your Sprint (€2,500)
            </Link>
            <p className="text-gray-400 mt-6">Monday kickoff. Friday delivery. Guaranteed.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#333] py-12 text-center text-gray-500 text-sm">
          <p>&copy; 2025 x-code.studio | Amsterdam, NL</p>
        </footer>
      </main>
    </div>
  );
}
