'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Smartphone, Palette } from 'lucide-react';
import gsap from 'gsap';

export default function HuaweiCase() {
  const heroRef = useRef(null);

  useEffect(() => {
    // GSAP animation for color cycling - matches portfolio behavior
    const tl = gsap.timeline({ repeat: -1 });

    // Register GSAP plugins
    gsap.registerPlugin();

    tl
      // Set initial state - All phones hidden except green
      .set('.front-phone', { autoAlpha: 0 })
      .set('.back-phone', { autoAlpha: 0 })
      .set('#green-front', { autoAlpha: 1 })
      .set('#green-back', { autoAlpha: 1 })
      // Set initial text color to white with important flag
      .set('.hero-text', { color: '#ffffff', immediateRender: true })
      .set('.hero-metric', { borderColor: '#ffffff', immediateRender: true })
      .set('.hero-border', { borderColor: '#ffffff', immediateRender: true })

      // Define animation labels for each color phase
      .addLabel('green_start', 0)
      .addLabel('to_orange', 2)
      .addLabel('to_black', 4)
      .addLabel('to_blue', 6)
      .addLabel('cycle_end', 8)

      // Phase 1: Orange fades in on top while gradient changes to orange
      .to('.bg-gradient-stop-1', { duration: 1.5, attr: { 'stop-color': '#ff8400' }, ease: 'sine.inOut' }, 'to_orange')
      .to('.bg-gradient-stop-2', { duration: 1.5, attr: { 'stop-color': '#ff6700' }, ease: 'sine.inOut' }, 'to_orange+=0.1')
      .to('.bg-gradient-stop-3', { duration: 1.5, attr: { 'stop-color': '#ff3602' }, ease: 'sine.inOut' }, 'to_orange+=0.2')
      .to(['#orange-front', '#orange-back'], { duration: 1, autoAlpha: 1, ease: 'sine.inOut' }, 'to_orange')
      // Text color changes to black on orange background (smoother easing for color)
      .to('.hero-text', { duration: 1.5, color: '#121212', ease: 'power1.inOut', overwrite: 'auto' }, 'to_orange')
      .to('.hero-metric', { duration: 1.5, borderColor: '#121212', ease: 'power1.inOut', overwrite: 'auto' }, 'to_orange')
      .to('.hero-border', { duration: 1.5, borderColor: '#121212', ease: 'power1.inOut', overwrite: 'auto' }, 'to_orange')

      // Phase 2: Black fades in on top while gradient changes to black
      .to('.bg-gradient-stop-1', { duration: 1.5, attr: { 'stop-color': '#7c7c7c' }, ease: 'sine.inOut' }, 'to_black')
      .to('.bg-gradient-stop-2', { duration: 1.5, attr: { 'stop-color': '#4a4a4a' }, ease: 'sine.inOut' }, 'to_black+=0.1')
      .to('.bg-gradient-stop-3', { duration: 1.5, attr: { 'stop-color': '#000000' }, ease: 'sine.inOut' }, 'to_black+=0.2')
      .to(['#black-front', '#black-back'], { duration: 1, autoAlpha: 1, ease: 'sine.inOut' }, 'to_black')
      // Text color changes to white on black background (smoother easing for color)
      .to('.hero-text', { duration: 1.5, color: '#ffffff', ease: 'power1.inOut', overwrite: 'auto' }, 'to_black')
      .to('.hero-metric', { duration: 1.5, borderColor: '#ffffff', ease: 'power1.inOut', overwrite: 'auto' }, 'to_black')
      .to('.hero-border', { duration: 1.5, borderColor: '#ffffff', ease: 'power1.inOut', overwrite: 'auto' }, 'to_black')

      // Phase 3: Blue fades in on top while gradient changes to blue
      .to('.bg-gradient-stop-1', { duration: 1.5, attr: { 'stop-color': '#d8edfc' }, ease: 'sine.inOut' }, 'to_blue')
      .to('.bg-gradient-stop-2', { duration: 1.5, attr: { 'stop-color': '#a1daf8' }, ease: 'sine.inOut' }, 'to_blue+=0.1')
      .to('.bg-gradient-stop-3', { duration: 1.5, attr: { 'stop-color': '#4db4e7' }, ease: 'sine.inOut' }, 'to_blue+=0.2')
      .to(['#blue-front', '#blue-back'], { duration: 1, autoAlpha: 1, ease: 'sine.inOut' }, 'to_blue')
      // Text color changes to black on blue background (smoother easing for color)
      .to('.hero-text', { duration: 1.5, color: '#121212', ease: 'power1.inOut', overwrite: 'auto' }, 'to_blue')
      .to('.hero-metric', { duration: 1.5, borderColor: '#121212', ease: 'power1.inOut', overwrite: 'auto' }, 'to_blue')
      .to('.hero-border', { duration: 1.5, borderColor: '#121212', ease: 'power1.inOut', overwrite: 'auto' }, 'to_blue')

      // Phase 4: Reset for loop - hide all phones except green, reset gradient to green
      .to(['#orange-front', '#orange-back', '#black-front', '#black-back', '#blue-front', '#blue-back'], {
        duration: 0.5,
        autoAlpha: 0,
        ease: 'sine.inOut'
      }, 'cycle_end')
      .to('.bg-gradient-stop-1', { duration: 0.5, attr: { 'stop-color': '#02b09c' }, ease: 'sine.inOut' }, 'cycle_end')
      .to('.bg-gradient-stop-2', { duration: 0.5, attr: { 'stop-color': '#009d91' }, ease: 'sine.inOut' }, 'cycle_end+=0.1')
      .to('.bg-gradient-stop-3', { duration: 0.5, attr: { 'stop-color': '#027b7f' }, ease: 'sine.inOut' }, 'cycle_end+=0.2')
      // Text color resets to white on green background (smoother easing for color)
      .to('.hero-text', { duration: 0.5, color: '#ffffff', ease: 'power1.inOut', overwrite: 'auto' }, 'cycle_end')
      .to('.hero-metric', { duration: 0.5, borderColor: '#ffffff', ease: 'power1.inOut', overwrite: 'auto' }, 'cycle_end')
      .to('.hero-border', { duration: 0.5, borderColor: '#ffffff', ease: 'power1.inOut', overwrite: 'auto' }, 'cycle_end');

    return () => {
      tl.kill();
    };
  }, []);

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

      {/* Interactive Hero Section with Rotating Phones */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden border-b border-[#333]">
        {/* SVG Background with animated gradient */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%">
              <stop className="bg-gradient-stop-1" offset="0" stopColor="#02b09c" stopOpacity="1" />
              <stop className="bg-gradient-stop-2" offset="0.48" stopColor="#009d91" stopOpacity="1" />
              <stop className="bg-gradient-stop-3" offset="1" stopColor="#027b7f" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-gradient)" />
        </svg>

        {/* Phones Wrapper */}
        <div className="absolute top-1/2 h-screen overflow-hidden flex flex-col items-center justify-center"
             style={{ 
               right: 'var(--phone-right, -10%)', 
               width: 'var(--phone-width, 70%)', 
               transform: 'translateY(-50%) rotate(25deg) scale(var(--phone-scale, 2))'
             }}>
          
          <style>{`
            @media (max-width: 768px) {
              :root {
                --phone-right: -30%;
                --phone-width: 100%;
                --phone-scale: 0.8;
              }
            }
            @media (min-width: 769px) {
              :root {
                --phone-right: -10%;
                --phone-width: 70%;
                --phone-scale: 2;
              }
            }
          `}</style>

          {/* Front Phone */}
          <svg className="h-screen w-auto mb-8" style={{ transform: 'rotate(180deg)' }} viewBox="0 0 400 840">
            <defs>
              <pattern id="front-phones-pattern" patternUnits="userSpaceOnUse" width="400" height="840" x="0" y="0">
                <image id="green-front" className="front-phone" href="/images/huawei/green_front.jpg" width="400" height="840" x="0" y="0" opacity="1" />
                <image id="orange-front" className="front-phone" href="/images/huawei/orange_front.jpg" width="400" height="840" x="0" y="0" opacity="0" />
                <image id="black-front" className="front-phone" href="/images/huawei/black_front.jpg" width="400" height="840" x="0" y="0" opacity="0" />
                <image id="blue-front" className="front-phone" href="/images/huawei/blue_front.jpg" width="400" height="840" x="0" y="0" opacity="0" />
              </pattern>
            </defs>
            <g fill="url(#front-phones-pattern)">
              <path d="M390.48,309.19c0-2-.21-3.55-2.87-3.11V272.84c2.4.27,2.87-1,2.87-3q-.08-46.68,0-93.36c0-2-.21-3.55-3-3.09v-2.64c0-36.74,0-69.56,0-106.3,0-5.26-.08-10.53-.44-15.77-.75-10.87-4.83-20.21-13.54-27.11-3.9-3.08-8.12-5.81-13.28-6.14-5.88-.37-11.77-.68-17.66-.68L200,14.68q-69,0-137.91,0c-7.58,0-15.17.19-22.75.41a17.33,17.33,0,0,0-5.55.93C23.22,20,16,27.38,12.45,38.15,9.78,46.3,9.53,54.79,9.53,63.28c0,235.24,0,466.56,0,701.81,0,9.11.38,18.23.79,27.34.38,8.77,3.15,16.74,9,23.42,4.46,5.1,9.81,9.24,16.64,10.22a126.62,126.62,0,0,0,17.86.91q73.08,0,146.18,0l143.35,0q6.86,0,13.69-.46a26.14,26.14,0,0,0,7.61-1.25A33.29,33.29,0,0,0,382.8,809c3.7-7.14,4.7-14.87,4.7-22.78q0-215.35,0-430.72v-3c2.4.27,3-.8,3-2.84Q390.39,329.42,390.48,309.19Z" />
            </g>
          </svg>

          {/* Back Phone */}
          <svg className="h-screen w-auto mt-8" viewBox="0 0 400 840">
            <defs>
              <pattern id="back-phones-pattern" patternUnits="userSpaceOnUse" width="400" height="840" x="0" y="0">
                <image id="green-back" className="back-phone" href="/images/huawei/green_back.jpg" width="400" height="840" x="0" y="0" opacity="1" />
                <image id="orange-back" className="back-phone" href="/images/huawei/orange_back.jpg" width="400" height="840" x="0" y="0" opacity="0" />
                <image id="black-back" className="back-phone" href="/images/huawei/black_back.jpg" width="400" height="840" x="0" y="0" opacity="0" />
                <image id="blue-back" className="back-phone" href="/images/huawei/blue_back.jpg" width="400" height="840" x="0" y="0" opacity="0" />
              </pattern>
            </defs>
            <g fill="url(#back-phones-pattern)">
              <path d="M9.52,309.19c0-2,.21-3.55,2.87-3.11V272.84c-2.4.27-2.87-1-2.87-3q.08-46.68,0-93.36c0-2,.21-3.55,3-3.09v-2.64c0-36.74,0-69.56,0-106.3,0-5.26.08-10.53.44-15.77.75-10.87,4.83-20.21,13.54-27.11,3.9-3.08,8.12-5.81,13.28-6.14,5.88-.37,11.77-.68,17.66-.68l142.57,0q69,0,137.91,0c7.58,0,15.17.19,22.75.41a17.33,17.33,0,0,1,5.55.93c10.57,4,17.82,11.35,21.34,22.12,2.67,8.15,2.92,16.64,2.92,25.13,0,235.24,0,466.56,0,701.81,0,9.11-.38,18.23-.79,27.34-.38,8.77-3.15,16.74-9,23.42-4.46,5.1-9.81,9.24-16.64,10.22a126.62,126.62,0,0,1-17.86.91Q273.1,827,200,827L56.65,827q-6.85,0-13.69-.46a26.14,26.14,0,0,1-7.61-1.25A33.29,33.29,0,0,1,17.2,809c-3.7-7.14-4.7-14.87-4.7-22.78q0-215.35,0-430.72v-3c-2.4.27-3-.8-3-2.84Q9.61,329.42,9.52,309.19Z" />
            </g>
          </svg>
        </div>

        {/* Text Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-start md:justify-start">
          <div className="max-w-lg md:max-w-xl space-y-4 md:space-y-6 py-20 md:py-0 w-full md:w-auto">
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <div className="hero-text hero-border inline-block px-2 md:px-3 py-1 border text-xs uppercase tracking-widest" style={{ color: '#ffffff', borderColor: '#ffffff' }}>
                Case Study
              </div>
              <div className="hero-text hero-border inline-flex items-center px-2 md:px-3 py-1 bg-white/10 border text-xs uppercase tracking-widest" style={{ color: '#ffffff', borderColor: '#ffffff' }}>
                Weborama APTO
              </div>
            </div>

            <h1 className="hero-text text-4xl md:text-7xl font-bold" style={{ color: '#ffffff' }}>
              HUAWEI
            </h1>

            <h2 className="hero-text text-xl md:text-4xl font-bold" style={{ color: '#ffffff' }}>
              Color Takes Over
            </h2>

            <p className="hero-text text-base md:text-lg leading-relaxed" style={{ color: '#ffffff' }}>
              Immersive color-interactive experience allowing users to explore device variants with 3D-like rotations and dynamic backgrounds
            </p>

            <div className="flex gap-2 md:gap-4 pt-4 flex-col">
              <div className="hero-metric bg-white/10 backdrop-blur-sm border px-3 md:px-6 py-2 md:py-4 rounded text-sm md:text-base" style={{ borderColor: '#ffffff' }}>
                <div className="hero-text text-xl md:text-3xl font-bold" style={{ color: '#ffffff' }}>{'<'}150KB</div>
                <div className="hero-text text-xs md:text-sm mt-1" style={{ color: '#ffffff' }}>Optimized Size</div>
              </div>
              <div className="hero-metric bg-white/10 backdrop-blur-sm border px-3 md:px-6 py-2 md:py-4 rounded text-sm md:text-base" style={{ borderColor: '#ffffff' }}>
                <div className="hero-text text-xl md:text-3xl font-bold" style={{ color: '#ffffff' }}>52%</div>
                <div className="hero-text text-xs md:text-sm mt-1" style={{ color: '#ffffff' }}>Engagement Lift</div>
              </div>
              <div className="hero-metric bg-white/10 backdrop-blur-sm border px-3 md:px-6 py-2 md:py-4 rounded text-sm md:text-base" style={{ borderColor: '#ffffff' }}>
                <div className="hero-text text-xl md:text-3xl font-bold" style={{ color: '#ffffff' }}>78%</div>
                <div className="hero-text text-xs md:text-sm mt-1" style={{ color: '#ffffff' }}>Viewability</div>
              </div>
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
                  Huawei wanted to showcase their new P30 Pro smartphone{"'"} vibrant color variants through an immersive digital campaign that would highlight the premium design and color technology.
                </p>
                <p>
                  The challenge was to create an engaging, interactive experience that would allow users to explore different color options while maintaining optimal file size for fast loading and high viewability rates across all devices.
                </p>
              </div>
            </div>

            <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded">
              <h4 className="text-lg font-bold text-white mb-4">Key Challenges</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Palette className="w-5 h-5 text-[#FF0080] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Showcase vibrant color variants effectively</span>
                </li>
                <li className="flex items-start">
                  <Smartphone className="w-5 h-5 text-[#00D4FF] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Create 3D-like rotation experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Maintain file size under 150KB</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <span className="text-gray-300">Cross-platform consistency</span>
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
              <h4 className="text-xl font-bold bg-gradient-to-r from-[#FF0080] to-[#00D4FF] bg-clip-text text-transparent mb-4">
                Interactive Color Experience
              </h4>
              <p className="text-gray-400 leading-relaxed mb-6">
                Developed an immersive interactive experience using advanced SVG masking and CSS transforms to create a 3D-like rotation effect. Users could explore different color variants with smooth animations and dynamic background color transitions that matched the selected device.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-[#FF0080] mr-2">▸</span>
                    <span className="text-gray-300">Advanced SVG masking technique</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#00D4FF] mr-2">▸</span>
                    <span className="text-gray-300">3D CSS transforms</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#00FF41] mr-2">▸</span>
                    <span className="text-gray-300">Dynamic color transitions</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-[#FF0080] mr-2">▸</span>
                    <span className="text-gray-300">Interactive hotspots</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#00D4FF] mr-2">▸</span>
                    <span className="text-gray-300">Smooth GSAP animations</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#00FF41] mr-2">▸</span>
                    <span className="text-gray-300">Mobile-optimized touch controls</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#333] p-8 rounded">
              <h4 className="text-xl font-bold bg-gradient-to-r from-[#FF0080] to-[#00D4FF] bg-clip-text text-transparent mb-4">
                Technical Innovation
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-[#FF0080] mb-2 uppercase tracking-wider">Graphics</div>
                  <ul className="space-y-2 text-gray-400">
                    <li>SVG Masking</li>
                    <li>Color Theory</li>
                    <li>Vector Graphics</li>
                    <li>Optimized Assets</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-[#00D4FF] mb-2 uppercase tracking-wider">Animation</div>
                  <ul className="space-y-2 text-gray-400">
                    <li>3D CSS Transforms</li>
                    <li>GSAP Timeline</li>
                    <li>WebGL Effects</li>
                    <li>Smooth Transitions</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-[#00FF41] mb-2 uppercase tracking-wider">Optimization</div>
                  <ul className="space-y-2 text-gray-400">
                    <li>File Size {'<'}150KB</li>
                    <li>Mobile First</li>
                    <li>Fast Loading</li>
                    <li>Cross-platform</li>
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
                  <div className="text-3xl font-bold text-[#00FF41]">400%</div>
                  <div className="text-gray-400 mt-1">Product interaction increase</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00FF41]">95%</div>
                  <div className="text-gray-400 mt-1">Completion rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00FF41]">78%</div>
                  <div className="text-gray-400 mt-1">Viewability rate achieved</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1E1E1E] border border-[#333] p-8 rounded">
              <h4 className="text-lg font-bold text-white mb-6">Technical Achievements</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">Optimized File Size</div>
                    <div className="text-sm text-gray-400">Under 150KB while maintaining quality</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">Advanced SVG Animations</div>
                    <div className="text-sm text-gray-400">Innovative masking techniques</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">Cross-Platform Consistency</div>
                    <div className="text-sm text-gray-400">Seamless experience across devices</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#00FF41] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">52% Engagement Lift</div>
                    <div className="text-sm text-gray-400">Significantly above benchmarks</div>
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
            {['Design_Tokens', 'Interaction_Design', 'Micro_Animations', 'Scrollytelling', 'Color_Systems', 'Atomic_Design', 'Motion_UI', 'Performance_Tuning', 'Responsive_Design', 'Touch_Interactions'].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#1E1E1E] border border-[#333] text-gray-300 rounded text-sm font-mono hover:border-[#00FF41] transition-colors"
              >
                {`[${tech}]`}
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
