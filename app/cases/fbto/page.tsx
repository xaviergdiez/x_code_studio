'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Award, TrendingUp } from 'lucide-react';

export default function FBTOCase() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] font-mono">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#121212]/95 border-b border-[#333] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Back to home link */}
            <Link
              href="/"
              className="inline-flex items-center text-[#00FF41] hover:text-[#00CC33] transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              ./BACK_TO_HOME
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['services', 'methodology', 'contact'].map((item) => (
                  <Link
                    key={item}
                    href={`/#${item}`}
                    className="text-sm text-gray-400 hover:text-[#00FF41] transition-colors duration-200 px-3 py-2 rounded-md font-medium uppercase tracking-wider"
                  >
                    /{item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed nav */}
      <div className="pt-16"></div>

      {/* Hero Section */}
      <section className="border-b border-[#333] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="inline-block px-3 py-1 border border-[#E91E63] text-[#E91E63] text-xs uppercase tracking-widest">
                Case Study
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-[#FFD700]/10 border border-[#FFD700] text-[#FFD700] text-xs uppercase tracking-widest">
                <Award className="w-3 h-3 mr-1" />
                Campaign of the Year
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white">
              FBTO
            </h1>

            <h2 className="text-2xl md:text-3xl text-[#E91E63]">
              Rich Media Health Insurance Campaign
            </h2>

            <p className="text-xl text-gray-400 max-w-3xl">
              Award-winning rich media campaign for FBTO Insurance, explaining complex insurance products through interactive storytelling and animated calculators
            </p>

            <div className="inline-block px-4 py-2 bg-[#E91E63]/10 border border-[#E91E63] text-[#E91E63] rounded">
              Weborama APTO Winner - Netherlands Market
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#1E1E1E] border border-[#333] p-6 rounded">
              <div className="text-4xl font-bold text-[#00FF41]">3x</div>
              <div className="text-gray-400 mt-2">CTR vs Static Ads</div>
            </div>
            <div className="bg-[#1E1E1E] border border-[#333] p-6 rounded">
              <div className="text-4xl font-bold text-[#00FF41]">12.6s</div>
              <div className="text-gray-400 mt-2">Average Time-in-Frame</div>
            </div>
            <div className="bg-[#1E1E1E] border border-[#333] p-6 rounded">
              <div className="text-4xl font-bold text-[#00FF41]">61%</div>
              <div className="text-gray-400 mt-2">Brand Recall Lift</div>
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
                  FBTO Insurance needed engaging rich media campaigns to explain complex insurance products while maintaining user attention and driving conversions in a competitive market.
                </p>
                <p>
                  The insurance industry faces the challenge of making dry, complex products engaging and understandable. Users often bounce from traditional banner ads without engaging with the content or understanding the value proposition.
                </p>
              </div>
            </div>

            <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded">
              <h4 className="text-lg font-bold text-white mb-4">Key Challenges</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#E91E63] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Explain complex insurance products simply</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#E91E63] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Maintain user engagement and attention</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#E91E63] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Drive conversions in competitive market</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#E91E63] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Stand out from traditional static ads</span>
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
              <h4 className="text-xl font-bold text-[#E91E63] mb-4">Interactive Rich Media Campaign</h4>
              <p className="text-gray-400 leading-relaxed mb-6">
                Created interactive rich media campaigns that explained complex insurance products through animated storytelling and interactive calculators. Users could engage directly with the content, calculating personalized insurance quotes and exploring coverage options.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-[#E91E63] mr-2">▸</span>
                    <span className="text-gray-300">Animated storytelling sequences</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#E91E63] mr-2">▸</span>
                    <span className="text-gray-300">Interactive insurance calculators</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#E91E63] mr-2">▸</span>
                    <span className="text-gray-300">Personalized quote generation</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-[#E91E63] mr-2">▸</span>
                    <span className="text-gray-300">Video integration and playback</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#E91E63] mr-2">▸</span>
                    <span className="text-gray-300">Responsive multi-device support</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#E91E63] mr-2">▸</span>
                    <span className="text-gray-300">Analytics and engagement tracking</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#333] p-8 rounded">
              <h4 className="text-xl font-bold text-[#E91E63] mb-4">Technical Implementation</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-[#E91E63] mb-2 uppercase tracking-wider">Frontend</div>
                  <ul className="space-y-2 text-gray-400">
                    <li>HTML5 Canvas</li>
                    <li>GSAP Animation</li>
                    <li>SVG Graphics</li>
                    <li>Interactive Forms</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-[#E91E63] mb-2 uppercase tracking-wider">Features</div>
                  <ul className="space-y-2 text-gray-400">
                    <li>Video Integration</li>
                    <li>Calculator Logic</li>
                    <li>Form Validation</li>
                    <li>Analytics Events</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-[#E91E63] mb-2 uppercase tracking-wider">Optimization</div>
                  <ul className="space-y-2 text-gray-400">
                    <li>Performance Tuning</li>
                    <li>Cross-browser Testing</li>
                    <li>Mobile Optimization</li>
                    <li>Load Time Reduction</li>
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
              <h4 className="text-lg font-bold text-white mb-6">Campaign Performance</h4>
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-[#00FF41]">250%</div>
                  <div className="text-gray-400 mt-1">Engagement increase vs static</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00FF41]">85%</div>
                  <div className="text-gray-400 mt-1">Conversion rate bump</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00FF41]">12.6s</div>
                  <div className="text-gray-400 mt-1">Average time-in-frame (industry avg: 3s)</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded">
              <h4 className="text-lg font-bold text-white mb-6">Awards & Recognition</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Award className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">Weborama APTO Winner</div>
                    <div className="text-sm text-gray-400">Campaign of the Year - Netherlands</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">Industry Recognition</div>
                    <div className="text-sm text-gray-400">Featured in insurance marketing publications</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">Client Satisfaction</div>
                    <div className="text-sm text-gray-400">Extended contract for multiple campaigns</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="mt-8 bg-[#1E1E1E] border border-[#333] p-8 rounded">
            <h4 className="text-lg font-bold text-white mb-6">Key Achievements</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white font-medium">61% Brand Recall Lift</div>
                  <div className="text-sm text-gray-400">Significantly above industry average</div>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white font-medium">3x CTR Improvement</div>
                  <div className="text-sm text-gray-400">Compared to static banner ads</div>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white font-medium">Award-Winning Creative</div>
                  <div className="text-sm text-gray-400">Industry recognition for innovation</div>
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
            {['HTML5 Canvas', 'GSAP Animation', 'SVG', 'Interactive', 'Video Integration', 'Form Validation', 'Analytics', 'Mobile Optimization', 'Rich Media', 'Cross-browser'].map((tech, index) => (
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
