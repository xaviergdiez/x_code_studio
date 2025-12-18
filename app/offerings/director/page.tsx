'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle, Slack, TrendingUp, Users } from 'lucide-react';

export default function DirectorPage() {
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
            <div className="text-[#00FF41] font-bold">FRACTIONAL_TD</div>
          </div>
        </div>
      </nav>

      <main className="pt-32">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 border border-[#00FF41] text-[#00FF41] text-xs uppercase tracking-widest">
              Ongoing Leadership
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              FRACTIONAL<br/>
              <span className="text-[#00FF41]">TECHNICAL DIRECTOR</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Your dedicated technologist. Async-first collaboration. Build your roadmap together. Scale on demand.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <div className="text-3xl font-bold text-[#00FF41]">€3,500</div>
              <div className="text-gray-400">/month</div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            WHAT_YOU_GET
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Slack className="w-8 h-8 text-[#00FF41]" />,
                title: 'Direct Slack Access',
                desc: 'Real-time communication. 24h response SLA. Share context as it happens.'
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-[#00FF41]" />,
                title: 'Unlimited Request Queue',
                desc: 'Add tasks to your backlog anytime. I execute linearly, pulling from the top.'
              },
              {
                icon: <Users className="w-8 h-8 text-[#00FF41]" />,
                title: 'One Active Task',
                desc: 'Full focus on your current priority. No context-switching. Quality over quantity.'
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-[#00FF41]" />,
                title: 'Strategic Planning',
                desc: 'Monthly roadmap calls. Quarterly reviews. Adjust priorities as market shifts.'
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-[#00FF41]" />,
                title: 'Full Stack Access',
                desc: 'Frontend, backend, DevOps, ad tech. Whatever your stack needs.'
              },
              {
                icon: <Users className="w-8 h-8 text-[#00FF41]" />,
                title: 'Team Mentorship',
                desc: 'Code reviews. Architecture guidance. Upskill your internal team.'
              }
            ].map((item, i) => (
              <div key={i} className="border border-[#333] bg-[#1a1a1a] p-8 hover:border-[#00FF41] transition-colors">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typical Workflow */}
        <section className="max-w-5xl mx-auto px-4 mb-24 bg-[#1a1a1a] border border-[#333] p-12">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            TYPICAL_WORKFLOW
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg text-[#007ACC] font-bold mb-4">Onboarding (Week 1)</h3>
              <ul className="space-y-2 ml-6 text-gray-400">
                <li>{'▪'} Audit your codebase & ad tech stack</li>
                <li>{'▪'} Initial roadmap workshop (2 hours)</li>
                <li>{'▪'} Set up Slack channel & backlog process</li>
                <li>{'▪'} First sprint planning</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg text-[#007ACC] font-bold mb-4">Weekly Cadence</h3>
              <ul className="space-y-2 ml-6 text-gray-400">
                <li>{'▪'} Monday: Async standup (Slack message)</li>
                <li>{'▪'} Daily: Code pushes + Slack updates</li>
                <li>{'▪'} Friday: Weekly recap + priority reset</li>
                <li>{'▪'} Ad hoc: Real-time collaboration for blockers</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg text-[#007ACC] font-bold mb-4">Monthly & Quarterly</h3>
              <ul className="space-y-2 ml-6 text-gray-400">
                <li>{'▪'} Monthly strategy call (1 hour, video)</li>
                <li>{'▪'} Quarterly business review (2 hours, deep-dive)</li>
                <li>{'▪'} Roadmap adjustments based on market/tech shifts</li>
                <li>{'▪'} Performance metrics & ROI analysis</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Example Tasks */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            TYPICAL_TASKS
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              'Build a React component library for your ad campaigns',
              'Optimize GSAP animations for 60fps delivery across browsers',
              'Architect a Node.js feed automation pipeline',
              'Integrate DCO with DV360 + Campaign Manager 360',
              'Performance audit + Core Web Vitals optimization',
              'Set up monitoring & alerting for ad serving errors',
              'Migrate codebase to TypeScript',
              'Build WebGL interactive experience',
              'Implement A/B testing framework',
              'Train your team on modern ad tech best practices',
              'Code review & refactor legacy campaigns',
              'Design multi-region localization system'
            ].map((task, i) => (
              <div key={i} className="flex items-start gap-4 border-l-2 border-[#00FF41] pl-6">
                <CheckCircle className="w-5 h-5 text-[#00FF41] shrink-0 mt-1" />
                <p className="text-gray-400">{task}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Commitment & Flexibility */}
        <section className="max-w-5xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            COMMITMENT
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-[#00FF41]/50 bg-[#1a1a1a] p-8">
              <h3 className="text-xl font-bold text-[#00FF41] mb-4">Minimum: 1 Month</h3>
              <p className="text-gray-400 mb-4">Get onboarded. Ship first features. See results.</p>
              <p className="text-sm text-gray-500">€3,500/month</p>
            </div>

            <div className="border border-[#00FF41]/50 bg-[#1a1a1a] p-8">
              <h3 className="text-xl font-bold text-[#00FF41] mb-4">Cancel Anytime</h3>
              <p className="text-gray-400 mb-4">No lock-in. Pause/cancel with 2 weeks notice.</p>
              <p className="text-sm text-gray-500">Month-to-month flexibility</p>
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
                q: 'How many hours per week?',
                a: 'Flexible. Some weeks 30 hours, some 50. It depends on what you need. We align on priorities—quality over fake hours.'
              },
              {
                q: 'Can I scale up mid-month?',
                a: 'Yes. Need a sprint on top? That&apos;s a +€2,500 sprint fee. Need to double hours? We can negotiate.'
              },
              {
                q: 'What if I need to pause?',
                a: 'No problem. Give 2 weeks notice. Pause for a month, then restart. Your backlog stays. No penalty.'
              },
              {
                q: 'Do you do team meetings/standups?',
                a: 'I&apos;m async-first. For critical calls, I show up. But most communication is Slack + GitHub PRs.'
              },
              {
                q: 'What if the monthly fee is too much?',
                a: 'Do an Audit first (€995). Or book a Dev Sprint (€2,500/week). Then upgrade to retainer if it makes sense.'
              },
              {
                q: 'Can I hire you full-time?',
                a: 'Not for employment. But I can do fractional longer-term (6-12 months, month-to-month). Agencies love this model.'
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
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] border border-[#00FF41] p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to scale your team?</h2>
            <a 
              href="mailto:hello@x-code.studio?subject=Fractional+TD+Inquiry"
              className="inline-block bg-[#00FF41] text-[#121212] font-bold px-8 py-4 hover:bg-[#00CC33] transition-colors uppercase tracking-wider"
            >
              Start a Conversation (€3,500/month)
            </a>
            <p className="text-gray-400 mt-6">Let&apos;s discuss your roadmap. No pitch. Just strategy.</p>
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
