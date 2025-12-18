'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Code, Database, Zap, Globe } from 'lucide-react';

export default function AuditPage() {
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (id: string) => {
    setIsExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
            <div className="text-[#00FF41] font-bold">WORKFLOW_AUDIT</div>
          </div>
        </div>
      </nav>

      <main className="pt-32">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 border border-[#00FF41] text-[#00FF41] text-xs uppercase tracking-widest">
              Fixed Price Service
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              WORKFLOW<br/>
              <span className="text-[#00FF41]">AUDIT</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Diagnostic scan of your entire ad tech pipeline. Identify bottlenecks. Get actionable recommendations. Delivered as a PDF strategy report.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <div className="text-3xl font-bold text-[#00FF41]">€995</div>
              <div className="text-gray-400">one-time investment</div>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            WHAT_YOU_GET
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                id: 'codebase',
                title: 'Codebase Review (Git)',
                desc: 'I analyze your repository structure, commit history, and code quality. Identify technical debt.',
                details: [
                  'TypeScript / JavaScript audit',
                  'Build pipeline analysis',
                  'Dependencies health check',
                  'Performance bottleneck identification'
                ]
              },
              {
                id: 'dco',
                title: 'DCO Feed Stress Test',
                desc: 'Test your dynamic creative optimization feeds under load. Find breaking points.',
                details: [
                  '10,000+ variant simulation',
                  'Feed parsing validation',
                  'Asset delivery performance',
                  'Localization accuracy check'
                ]
              },
              {
                id: 'performance',
                title: 'Performance Profiling',
                desc: 'Lighthouse audit + Core Web Vitals analysis for your current campaigns.',
                details: [
                  'LCP, FID, CLS scoring',
                  'Network waterfall analysis',
                  'Asset optimization report',
                  'Browser compatibility matrix'
                ]
              },
              {
                id: 'strategy',
                title: 'Strategy PDF Report',
                desc: 'Executive summary + technical deep-dives. 15-25 pages. Actionable roadmap.',
                details: [
                  'Top 10 recommendations',
                  '30/60/90 day implementation plan',
                  'ROI impact projections',
                  'Vendor evaluation matrix'
                ]
              }
            ].map(item => (
              <div key={item.id} className="border border-[#333] bg-[#1a1a1a] p-8 hover:border-[#00FF41] transition-colors">
                <div className="flex items-start gap-4 mb-4 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                  <CheckCircle className="w-6 h-6 text-[#00FF41] shrink-0 mt-1" />
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
                  </div>
                </div>
                {isExpanded[item.id] && (
                  <div className="ml-10 mt-4 space-y-2 border-t border-[#333] pt-4">
                    {item.details.map((detail, i) => (
                      <div key={i} className="text-gray-300 text-sm flex items-center">
                        <span className="text-[#007ACC] mr-2">{'▪'}</span>
                        {detail}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-5xl mx-auto px-4 mb-24 bg-[#1a1a1a] border border-[#333] p-12">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            TIMELINE
          </h2>

          <div className="space-y-8">
            {[
              { day: 'Day 1', label: 'Kickoff Call (30 min)', desc: 'Walk through your stack. Define scope.' },
              { day: 'Day 2-4', label: 'Analysis & Testing', desc: 'Deep-dive audits. Feed simulation. Performance profiling.' },
              { day: 'Day 5', label: 'Deliverable', desc: 'PDF report + 1-hour strategy walkthrough call.' }
            ].map((phase, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="text-[#00FF41] font-bold text-lg min-w-20">{phase.day}</div>
                <div>
                  <h4 className="text-white font-bold">{phase.label}</h4>
                  <p className="text-gray-400">{phase.desc}</p>
                </div>
              </div>
            ))}
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
                q: 'How detailed is the report?',
                a: 'Very. 15-25 pages, including executive summary, technical findings, priority matrix, 30/60/90 day roadmap, and specific vendor recommendations.'
              },
              {
                q: 'Do you need access to production?',
                a: 'I need read-only access to your repository and staging environments. No production access required. Secure process.'
              },
              {
                q: 'Can I get this expedited?',
                a: 'Yes. Add €250 for 3-day express delivery. Add €500 for 2-day rush (starts Monday, delivered Wednesday).'
              },
              {
                q: 'What if I need ongoing support?',
                a: 'After the audit, you can upgrade to a Fractional TD retainer (€3.5k/month) and I&apos;ll implement the roadmap async.'
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
            <h2 className="text-3xl font-bold text-white mb-6">Ready to diagnose your pipeline?</h2>
            <Link 
              href="/#audit"
              className="inline-block bg-[#00FF41] text-[#121212] font-bold px-8 py-4 hover:bg-[#00CC33] transition-colors uppercase tracking-wider"
            >
              Book Now (€995)
            </Link>
            <p className="text-gray-400 mt-6">5-day turnaround. Actionable report. Money-back guarantee if not satisfied.</p>
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
