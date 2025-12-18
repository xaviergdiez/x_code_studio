'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Globe, Users, TrendingUp } from 'lucide-react';

export default function GtechCase() {
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
            <div className="inline-block px-3 py-1 border border-[#4285F4] text-[#4285F4] text-xs uppercase tracking-widest">
              Leadership Case Study
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-[#4285F4]"></div>
                <div className="w-3 h-3 rounded-full bg-[#EA4335]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FBBC04]"></div>
                <div className="w-3 h-3 rounded-full bg-[#34A853]"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Google gTech
              </h1>
            </div>

            <h2 className="text-2xl md:text-3xl text-[#4285F4]">
              Global Display Solutions Leadership
            </h2>

            <p className="text-xl text-gray-400 max-w-3xl">
              Leading 15+ developers across AMER, EMEA & APAC regions, delivering enterprise-grade solutions for millions of customers while maintaining 24/7 global coverage
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-[#1E1E1E] border border-[#333] p-6 rounded">
              <div className="text-4xl font-bold text-[#00FF41]">$66M+</div>
              <div className="text-gray-400 mt-2">Team Revenue Impact</div>
            </div>
            <div className="bg-[#1E1E1E] border border-[#333] p-6 rounded">
              <div className="text-4xl font-bold text-[#00FF41]">15+</div>
              <div className="text-gray-400 mt-2">Developers Managed</div>
            </div>
            <div className="bg-[#1E1E1E] border border-[#333] p-6 rounded">
              <div className="text-4xl font-bold text-[#00FF41]">230%</div>
              <div className="text-gray-400 mt-2">Conversion Lift</div>
            </div>
            <div className="bg-[#1E1E1E] border border-[#333] p-6 rounded">
              <div className="text-4xl font-bold text-[#00FF41]">98%</div>
              <div className="text-gray-400 mt-2">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Role & Responsibility */}
      <section className="border-b border-[#333] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-[#00FF41] mr-4">{'>'}</span>
                LEADERSHIP_ROLE
              </h3>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  As <strong className="text-white">Lead Developer for Global gTech Display Solutions Team</strong>, I spearheaded technical innovation across AMER, EMEA, and APAC regions, managing 15+ developers across multiple time zones while delivering enterprise-grade solutions at unprecedented scale.
                </p>
                <p>
                  gTech Ads serves as Google{"'"} comprehensive support and technical services division for the entire Ad products stack, from small businesses to enterprise customers globally. Our mission encompasses enabling better self-help tools, providing interactive support, setting up complex campaigns, and delivering bespoke technical and measurement solutions.
                </p>
              </div>
            </div>

            <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded">
              <h4 className="text-lg font-bold text-white mb-4">Core Responsibilities</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Global team management across 3 regions</span>
                </li>
                <li className="flex items-start">
                  <Globe className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">24/7 coverage coordination and support</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Enterprise solution architecture</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">500+ custom solutions annually</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Teams */}
      <section className="border-b border-[#333] py-16 md:py-24 bg-[#1E1E1E]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-white mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            GLOBAL_TEAM_STRUCTURE
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* EMEA */}
            <div className="bg-[#121212] border border-[#4285F4] p-8 rounded hover:border-[#4285F4]/70 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-[#4285F4]">EMEA Team</h4>
                <Globe className="w-8 h-8 text-[#4285F4]" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Coverage</div>
                  <div className="text-2xl font-bold text-white">95+ Markets</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Focus Areas</div>
                  <div className="text-gray-300">DCO & Dynamic Remarketing</div>
                </div>
                <div className="pt-4 border-t border-[#333]">
                  <div className="text-sm text-gray-400">
                    Leading development efforts across Europe, Middle East, and Africa with focus on localized solutions and multi-market campaigns.
                  </div>
                </div>
              </div>
            </div>

            {/* AMER */}
            <div className="bg-[#121212] border border-[#EA4335] p-8 rounded hover:border-[#EA4335]/70 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-[#EA4335]">AMER Team</h4>
                <Users className="w-8 h-8 text-[#EA4335]" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Team Size</div>
                  <div className="text-2xl font-bold text-white">15+ Members</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Focus Areas</div>
                  <div className="text-gray-300">HTML5 & Studio Solutions</div>
                </div>
                <div className="pt-4 border-t border-[#333]">
                  <div className="text-sm text-gray-400">
                    Managing North and South American operations with emphasis on high-volume HTML5 production and Studio DCO implementations.
                  </div>
                </div>
              </div>
            </div>

            {/* APAC */}
            <div className="bg-[#121212] border border-[#34A853] p-8 rounded hover:border-[#34A853]/70 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-[#34A853]">APAC Team</h4>
                <TrendingUp className="w-8 h-8 text-[#34A853]" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Operations</div>
                  <div className="text-2xl font-bold text-white">24/7 Coverage</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Focus Areas</div>
                  <div className="text-gray-300">DV360 & Mobile</div>
                </div>
                <div className="pt-4 border-t border-[#333]">
                  <div className="text-sm text-gray-400">
                    Coordinating Asia-Pacific development with specialization in Display & Video 360 and mobile-first advertising solutions.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Achievements */}
      <section className="border-b border-[#333] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-white mb-12 flex items-center">
            <span className="text-[#00FF41] mr-4">{'>'}</span>
            IMPACT_METRICS
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded">
              <h4 className="text-lg font-bold text-white mb-6">Leadership Impact</h4>
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-[#00FF41]">300%</div>
                  <div className="text-gray-400 mt-1">Ad relevance increase through ML pipeline</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00FF41]">45%</div>
                  <div className="text-gray-400 mt-1">CTR improvement across campaigns</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00FF41]">500+</div>
                  <div className="text-gray-400 mt-1">Custom solutions delivered annually</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded">
              <h4 className="text-lg font-bold text-white mb-6">Technical Innovations</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">AI-Powered Pipeline</div>
                    <div className="text-sm text-gray-400">Real-time ad optimization using ML</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">Google Ads API Integration</div>
                    <div className="text-sm text-gray-400">Seamless platform connectivity</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">Analytics Dashboard</div>
                    <div className="text-sm text-gray-400">Enterprise-grade reporting tools</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">45% Faster Deployment</div>
                    <div className="text-sm text-gray-400">Standardized frameworks across regions</div>
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
            {['Machine Learning', 'Google Ads API', 'Node.js', 'Analytics', 'Display & Video 360', 'Studio DCO', 'HTML5', 'Dynamic Remarketing', 'Enterprise Architecture', 'Global Deployment'].map((tech, index) => (
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
