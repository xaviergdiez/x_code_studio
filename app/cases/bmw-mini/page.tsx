'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';

export default function BMWMiniCase() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] font-mono">
      {/* Header */}
      <header className="border-b border-[#333] bg-[#121212]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-[#00FF41] hover:text-[#00CC33] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            ./BACK_TO_HOME
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-[#333] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 border border-[#007ACC] text-[#007ACC] text-xs uppercase tracking-widest">
              Case Study
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white">
              BMW / MINI
            </h1>

            <h2 className="text-2xl md:text-3xl text-[#007ACC]">
              Dynamic Asset Management Revolution
            </h2>

            <p className="text-xl text-gray-400 max-w-3xl">
              Transforming BMW & MINI's global creative operations through advanced DCO technology and asset optimization
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#1E1E1E] border border-[#333] p-6 rounded">
              <div className="text-4xl font-bold text-[#00FF41]">34,000+</div>
              <div className="text-gray-400 mt-2">Assets Managed</div>
            </div>
            <div className="bg-[#1E1E1E] border border-[#333] p-6 rounded">
              <div className="text-4xl font-bold text-[#00FF41]">27+</div>
              <div className="text-gray-400 mt-2">Markets</div>
            </div>
            <div className="bg-[#1E1E1E] border border-[#333] p-6 rounded">
              <div className="text-4xl font-bold text-[#00FF41]">71%</div>
              <div className="text-gray-400 mt-2">Cost Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="border-b border-[#333] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-[#00FF41] mr-4">{'>'}</span>
                THE_CHALLENGE
              </h3>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  BMW/MINI needed to streamline their global creative production process across multiple markets while maintaining brand consistency and reducing time-to-market for campaign assets.
                </p>
                <p>
                  The challenge involved managing thousands of assets across different regions, languages, and platforms while ensuring brand guidelines were maintained and campaigns could be deployed rapidly.
                </p>
              </div>
            </div>

            <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded">
              <h4 className="text-lg font-bold text-white mb-4">Key Requirements</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Global asset management across 27+ markets</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Maintain brand consistency across regions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Reduce production time and costs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Enable rapid campaign deployment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="border-b border-[#333] py-16 md:py-24 bg-[#1E1E1E]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-white mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            THE_SOLUTION
          </h3>

          <div className="space-y-8">
            <div className="bg-[#121212] border border-[#333] p-8 rounded">
              <h4 className="text-xl font-bold text-[#007ACC] mb-4">Dynamic Creative Optimization (DCO) System</h4>
              <p className="text-gray-400 leading-relaxed mb-6">
                Developed a comprehensive DCO system that enabled real-time asset generation and optimization across all markets and platforms. The system leveraged automation to create 300M+ dynamic variable combinations.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-[#00FF41] mr-2">▸</span>
                    <span className="text-gray-300">Automated asset generation pipeline</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#00FF41] mr-2">▸</span>
                    <span className="text-gray-300">Real-time localization engine</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#00FF41] mr-2">▸</span>
                    <span className="text-gray-300">Brand compliance validation</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-[#00FF41] mr-2">▸</span>
                    <span className="text-gray-300">Multi-platform deployment</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#00FF41] mr-2">▸</span>
                    <span className="text-gray-300">Performance analytics integration</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#00FF41] mr-2">▸</span>
                    <span className="text-gray-300">Version control system</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#333] p-8 rounded">
              <h4 className="text-xl font-bold text-[#007ACC] mb-4">Technical Implementation</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-[#00FF41] mb-2 uppercase tracking-wider">Frontend</div>
                  <ul className="space-y-2 text-gray-400">
                    <li>React.js</li>
                    <li>GSAP Animation</li>
                    <li>HTML5 Canvas</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-[#00FF41] mb-2 uppercase tracking-wider">Backend</div>
                  <ul className="space-y-2 text-gray-400">
                    <li>Node.js</li>
                    <li>Figma API Integration</li>
                    <li>Adobe Creative Cloud</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-[#00FF41] mb-2 uppercase tracking-wider">Tools</div>
                  <ul className="space-y-2 text-gray-400">
                    <li>Automation Scripts</li>
                    <li>Quality Assurance</li>
                    <li>Analytics Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="border-b border-[#333] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-white mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            THE_RESULTS
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded">
              <h4 className="text-lg font-bold text-white mb-6">Business Impact</h4>
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-[#00FF41]">75%</div>
                  <div className="text-gray-400 mt-1">Reduction in production time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00FF41]">71%</div>
                  <div className="text-gray-400 mt-1">Cost reduction achieved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00FF41]">40+</div>
                  <div className="text-gray-400 mt-1">Markets served globally</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded">
              <h4 className="text-lg font-bold text-white mb-6">Technical Achievements</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">300M+ Variable Combinations</div>
                    <div className="text-sm text-gray-400">Dynamic asset generation at scale</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">Real-time Optimization</div>
                    <div className="text-sm text-gray-400">Asset optimization across all touchpoints</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">Global Consistency</div>
                    <div className="text-sm text-gray-400">Brand compliance with local customization</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">500+ Variants per Campaign</div>
                    <div className="text-sm text-gray-400">Automated production at unprecedented scale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-white mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            TECH_STACK
          </h3>

          <div className="flex flex-wrap gap-3">
            {['Adobe Creative Cloud', 'Figma API', 'Automation', 'React', 'Node.js', 'GSAP', 'HTML5 Canvas', 'DCO', 'Analytics', 'Quality Assurance'].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#1E1E1E] border border-[#333] text-gray-300 rounded text-sm font-mono hover:border-[#00FF41] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-[#121212] bg-[#00FF41] hover:bg-[#00CC33] transition-all"
            >
              ./BACK_TO_HOME
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
