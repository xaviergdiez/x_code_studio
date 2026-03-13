'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Zap, CheckCircle, Menu, X, ArrowRight, ExternalLink, RefreshCw, Globe, Linkedin, Cpu, GraduationCap, Figma, ChevronRight, Activity, Shield, FileText, Target, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useForm } from '@formspree/react';

/**
 * x-code.studio — Strategic AdTech Consultancy
 * FULL GSAP SHOWCASE / HACKER TERMINAL AESTHETIC
 * Boot Sequence → Matrix Rain → Typewriter → Glitch → Scroll Animations
 */

// ═══════════════════════════════════════════════════════════════
// MATRIX RAIN — Canvas-based falling characters
// ═══════════════════════════════════════════════════════════════
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:<>,.?/~`ΣΠΔΩαβγδ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.globalAlpha = Math.random() * 0.5 + 0.1;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5 + Math.random() * 0.5;
      }
    };

    const interval = setInterval(draw, 50);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
}

// ═══════════════════════════════════════════════════════════════
// TEXT SCRAMBLE — Resolves random characters into target text
// ═══════════════════════════════════════════════════════════════
function useTextScramble(text: string, isActive: boolean, speed = 30) {
  const [display, setDisplay] = useState('');
  const chars = '!@#$%^&*()_+-=[]{}|;:<>,.?/~`01';

  useEffect(() => {
    if (!isActive) { setDisplay(''); return; }
    let iteration = 0;
    const maxIterations = text.length;
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      iteration += 1 / 3;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, isActive, speed]);

  return display;
}

// ═══════════════════════════════════════════════════════════════
// ANIMATED LOGO — Inline SVG with GSAP entrance
// ═══════════════════════════════════════════════════════════════
function AnimatedLogo({ className = '', size = 28 }: { className?: string; size?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const left = svgRef.current.querySelector('.chevron-l');
    const right = svgRef.current.querySelector('.chevron-r');
    if (!left || !right) return;

    gsap.set([left, right], { opacity: 0 });
    gsap.to(left, { opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' });
    gsap.fromTo(right, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, delay: 0.35, ease: 'power3.out' });
  }, []);

  const h = size * (1029 / 1235);
  return (
    <svg ref={svgRef} className={className} width={size} height={h} viewBox="0 0 1235 1029" fill="none">
      <path className="chevron-l" d="M218.067 1029L726.89 512.587L218.067 0H0.000162074L504.997 506.849V518.325L0.000162074 1029H218.067Z" fill="white" />
      <path className="chevron-r" d="M1016.93 1029L508.11 512.587L1016.93 0H1235L730.003 506.849V518.325L1235 1029H1016.93Z" fill="#00FF41" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// BOOT SEQUENCE — Terminal startup animation
// ═══════════════════════════════════════════════════════════════
function BootSequence({ onComplete }: { onComplete: () => void }) {
  const bootRef = useRef<HTMLDivElement>(null);

  const bootLines = [
    { text: '[  0.000000] x-code.studio kernel v4.2.0 initializing...', cls: 'dim' },
    { text: '[  0.001203] BIOS: Creative Technology Architecture Module loaded', cls: '' },
    { text: '[  0.002811] Memory: 18 years experience mapped @ 0x00FF41', cls: '' },
    { text: '[  0.004102] CPU: Golden Triangle Processor — DCO | GSAP | Automation', cls: 'accent' },
    { text: '[  0.005934] Network: Amsterdam, NL — Latency: 0ms to production', cls: '' },
    { text: '[  0.007221] Storage: BMW, Google, Huawei, FBTO case archives mounted', cls: 'dim' },
    { text: '[  0.008830] Compliance: Wet DBA 2025 — resultaatsverplichting [  OK  ]', cls: '' },
    { text: '[  0.010001] Security: Deliverable-based SLA framework initialized', cls: '' },
    { text: '[  0.011442] GSAP 3.14.1 + ScrollTrigger registered ............. [  OK  ]', cls: '' },
    { text: '[  0.012000] x-code.studio boot complete. Welcome.', cls: 'accent' },
  ];

  useEffect(() => {
    if (!bootRef.current) return;
    const lines = bootRef.current.querySelectorAll('.boot-line');
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(bootRef.current, {
          opacity: 0,
          duration: 0.5,
          delay: 0.3,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    lines.forEach((line, i) => {
      tl.to(line, {
        opacity: 1,
        duration: 0.02,
        delay: i === 0 ? 0.2 : 0,
      }, i * 0.12);
    });
  }, [onComplete]);

  return (
    <div ref={bootRef} className="boot-screen">
      <div className="max-w-3xl mx-auto w-full">
        {bootLines.map((line, i) => (
          <div key={i} className={`boot-line ${line.cls}`}>{line.text}</div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [booted, setBooted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [state, handleSubmit] = useForm("xdkqvorr");

  // Hero text scramble
  const heroLine1 = useTextScramble('TOOLS, TEACHING', booted);
  const heroLine2 = useTextScramble('& AUTOMATION', booted);

  const handleBootComplete = useCallback(() => setBooted(true), []);

  // ─────────────────────────────────────────────────────────────
  // GSAP MASTER ANIMATION ENGINE
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!booted) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // ── 1. SCROLL PROGRESS BAR ──
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        });
        gsap.set(progressRef.current, { scaleX: 0 });
      }

      // ── 2. HERO ENTRANCE SEQUENCE ──
      const heroTL = gsap.timeline({ delay: 0.1 });
      heroTL
        .from('.hero-badge', { y: -30, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' })
        .from('.hero-title', { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from('.hero-subtitle', { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .from('.hero-cta', { y: 30, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.3')
        .from('.hero-scroll-indicator', { opacity: 0, y: -10, duration: 0.5 }, '-=0.1');

      // ── 3. NAV ENTRANCE ──
      gsap.from('.nav-item', {
        y: -20, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out', delay: 0.3,
      });

      // ── 4. HERO PARALLAX ON SCROLL ──
      if (heroRef.current) {
        gsap.to('.hero-content', {
          y: -100, opacity: 0, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.matrix-canvas', {
          y: 50, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      }

      // ── 5. SECTION REVEALS (Staggered + Rotation) ──
      gsap.utils.toArray('.reveal-up').forEach((el) => {
        gsap.from(el as Element, {
          y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el as Element, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray('.reveal-left').forEach((el) => {
        gsap.from(el as Element, {
          x: -80, opacity: 0, rotateY: 5, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el as Element, start: 'top 85%', once: true },
        });
      });

      gsap.utils.toArray('.reveal-right').forEach((el) => {
        gsap.from(el as Element, {
          x: 80, opacity: 0, rotateY: -5, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el as Element, start: 'top 85%', once: true },
        });
      });

      // ── 6. AUDIT LOG CARDS — Cinematic stagger ──
      gsap.utils.toArray('.audit-card').forEach((card, i) => {
        const el = card as Element;
        gsap.from(el, {
          y: 80, opacity: 0, scale: 0.95, rotateX: 4, duration: 0.8, delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
        // Internal columns stagger
        gsap.from(el.querySelectorAll('.audit-col'), {
          y: 30, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      // ── 7. SERVICE CARDS — Fan-out entrance ──
      gsap.utils.toArray('.service-card').forEach((card, i) => {
        const el = card as Element;
        gsap.from(el, {
          y: 100, opacity: 0, scale: 0.9, rotation: (i % 2 === 0 ? -3 : 3),
          duration: 0.8, delay: i * 0.1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });

      // ── 8. CASE STUDY CARDS — Perspective fly-in ──
      gsap.utils.toArray('.case-card').forEach((card, i) => {
        const el = card as Element;
        const fromLeft = i % 2 === 0;
        gsap.from(el, {
          x: fromLeft ? -120 : 120, y: 60, opacity: 0, rotateY: fromLeft ? 8 : -8,
          scale: 0.92, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      // ── 9. TESTIMONIALS — Slide up with glow ──
      gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        const el = card as Element;
        gsap.from(el, {
          y: 50, opacity: 0, scale: 0.97, duration: 0.7, delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      // ── 10. OFFERING CARDS — Scale bounce ──
      gsap.utils.toArray('.offering-card').forEach((card, i) => {
        const el = card as Element;
        gsap.from(el, {
          y: 80, opacity: 0, scale: 0.85, duration: 0.7, delay: i * 0.12,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });

      // ── 11. PROTOCOL STEPS — Sequential wipe ──
      gsap.utils.toArray('.protocol-step').forEach((step, i) => {
        const el = step as Element;
        gsap.from(el, {
          x: -60, opacity: 0, duration: 0.7, delay: i * 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      // ── 12. SECTION HEADER GLITCH ──
      gsap.utils.toArray('.glitch-trigger').forEach((el) => {
        const element = el as HTMLElement;
        ScrollTrigger.create({
          trigger: element,
          start: 'top 80%',
          onEnter: () => {
            element.classList.add('active');
            setTimeout(() => element.classList.remove('active'), 300);
          },
          onEnterBack: () => {
            element.classList.add('active');
            setTimeout(() => element.classList.remove('active'), 300);
          },
        });
      });

      // ── 13. CONTACT FORM — Dramatic entrance ──
      gsap.from('.contact-form-wrapper', {
        y: 100, opacity: 0, scale: 0.95, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form-wrapper', start: 'top 85%', once: true },
      });

      // ── 14. FOOTER — Slide up ──
      gsap.from('.footer-content', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.footer-content', start: 'top 95%', once: true },
      });

      // ── 15. HORIZONTAL LINE DRAWS ──
      gsap.utils.toArray('.line-draw').forEach((el) => {
        gsap.from(el as Element, {
          scaleX: 0, transformOrigin: 'left center', duration: 1.0, ease: 'power3.inOut',
          scrollTrigger: { trigger: el as Element, start: 'top 90%', once: true },
        });
      });

    }, appRef);

    return () => ctx.revert();
  }, [booted]);

  // ─────────────────────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────────────────────
  const nav = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════
  return (
    <div ref={appRef} className="min-h-screen bg-[#121212] text-[#E0E0E0] font-mono overflow-x-hidden noise-overlay">

      {/* BOOT SEQUENCE */}
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      {/* CRT SCANLINE OVERLAY */}
      <div className="crt-overlay" />

      {/* SCROLL PROGRESS BAR */}
      <div ref={progressRef} className="scroll-progress w-full" />

      {/* ═══════════════════ NAVIGATION ═══════════════════ */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#121212]/90 border-b border-[#333] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 cursor-pointer group nav-item" onClick={() => nav('home')}>
              <AnimatedLogo size={26} />
              <span className="text-white font-bold text-xl tracking-tight group-hover:text-[#00FF41] transition-colors neon-glow">
                x-code.studio
              </span>
            </div>
            <div className="hidden md:flex items-baseline space-x-6">
              {['services', 'methodology', 'work', 'contact'].map((item) => (
                <button key={item} onClick={() => nav(item)}
                  className="nav-item text-sm text-gray-400 hover:text-[#00FF41] transition-colors px-3 py-2 font-medium uppercase tracking-wider relative group">
                  /{item}
                  <span className="absolute bottom-0 left-0 w-full h-px bg-[#00FF41] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              ))}
              <button onClick={() => nav('methodology')}
                className="nav-item magnetic-btn text-sm text-[#121212] bg-[#00FF41] hover:bg-[#00CC33] transition-colors px-4 py-2 font-bold uppercase tracking-wider neon-box-glow">
                Browse Tools
              </button>
            </div>
            <div className="md:hidden nav-item">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-400 hover:text-white p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1E1E1E] border-b border-[#333]">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {['services', 'methodology', 'work', 'audit', 'contact'].map((item) => (
                <button key={item} onClick={() => nav(item)}
                  className="text-gray-300 hover:text-[#00FF41] block px-3 py-2 text-base font-medium w-full text-left uppercase">
                  ./{item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════════ MAIN CONTENT ═══════════════════ */}
      <main className="pt-16">

        {/* ── HERO ── */}
        <section ref={heroRef} id="home" className="min-h-screen flex items-center justify-center relative border-b border-[#333] overflow-hidden">
          <MatrixRain />
          <div className="absolute inset-0 z-[1] grid-bg" />
          {/* Radial gradient for depth */}
          <div className="absolute inset-0 z-[2]" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,255,65,0.03) 0%, transparent 50%)' }} />

          <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 w-full">
            <div className="space-y-6">
              <div className="hero-badge inline-block px-3 py-1 border border-[#00FF41]/50 text-[#00FF41] text-xs uppercase tracking-[0.3em] neon-glow">
                Tools. Teaching. Automation.
              </div>

              <h1 className="hero-title text-4xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9]">
                <span className="block glitch glitch-trigger" data-text={heroLine1}>{heroLine1}</span>
                <span className="block text-[#00FF41] neon-glow-strong glitch glitch-trigger" data-text={heroLine2}>{heroLine2}</span>
              </h1>

              <p className="hero-subtitle max-w-2xl text-base md:text-lg text-gray-500 leading-relaxed font-mono">
                <span className="text-[#00FF41] neon-glow">{'>'}</span> I teach product design at NEOLAND and build workflow automation tools for agencies tired of manually resizing 500 banners per campaign. Not a consultancy. Not an agency. Just: here&apos;s the tool I built, here&apos;s how to use it, now you&apos;re unblocked.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button onClick={() => nav('methodology')}
                  className="hero-cta magnetic-btn px-8 py-3.5 font-bold text-[#121212] bg-[#00FF41] hover:bg-[#00CC33] transition-all neon-box-glow text-sm tracking-wider">
                  BROWSE_TOOLBOX
                </button>
                <button onClick={() => nav('audit')}
                  className="hero-cta magnetic-btn px-8 py-3.5 font-bold text-white border border-[#333] hover:border-[#00FF41] transition-all bg-[#1E1E1E] text-sm tracking-wider">
                  FREE_CALCULATORS
                </button>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-gray-600">
            <span className="text-xs tracking-widest uppercase mb-2">scroll</span>
            <ChevronDown size={16} className="scroll-indicator" />
          </div>
        </section>

        {/* ── POSITIONING STATEMENT ── */}
        <section id="profile" className="py-24 border-b border-[#333] bg-[#1a1a1a] relative">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:w-1/3 reveal-left">
                <div className="text-[#007ACC] font-bold mb-3 text-xs tracking-[0.3em]">THE_MAKER</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  I BUILD TOOLS.<br />YOU USE THEM.<br /><span className="text-[#00FF41] neon-glow">PROBLEM SOLVED.</span>
                </h2>
                <div className="h-px w-16 bg-gradient-to-r from-[#00FF41] to-transparent mt-6 line-draw" />
              </div>
              <div className="w-full md:w-2/3 text-gray-400 leading-relaxed space-y-5 reveal-right">
                <p>
                  I teach <span className="text-white">Product Design at NEOLAND</span> during the week. On weekends, I build automation tools that solve problems I keep hearing about from agencies: banner production bottlenecks, manual resizing hell, DCO implementations that take months, Figma-to-code handoff disasters.
                </p>
                <p>
                  So I formalized the weekend hacking into <span className="text-[#00FF41] neon-glow">x-code.studio</span>. Scripts. Templates. Plugins. Documentation. Now available as <span className="text-white">pre-built tools you can download and use today</span>.
                </p>
                <p>
                  With <span className="text-white">18+ years</span> bridging design and engineering — global campaigns for <span className="text-white">BMW, Google, and Huawei</span> at MediaMonks — every tool I sell is something I built to solve a <span className="text-[#00FF41]">real production problem</span>. Not selling hours. Selling solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURE AUDIT LOG ── */}
        <section className="py-24 border-b border-[#333] relative">
          <div className="absolute inset-0 grid-bg-dense opacity-30" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="mb-16 reveal-up">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 break-all">
                <span className="text-[#00FF41] neon-glow glitch glitch-trigger" data-text=">">{'>'}</span> ARCHITECTURE_AUDIT<span className="text-[#007ACC]">.log</span>
              </h2>
              <p className="text-gray-500 max-w-2xl">Real problems diagnosed. Real solutions delivered. Result-based.</p>
              <div className="h-px w-24 bg-gradient-to-r from-[#007ACC] to-transparent mt-4 line-draw" />
            </div>

            <div className="space-y-6">
              {[
                {
                  problems: ['Static design mockups', 'Touch targets 32px below WCAG AA', 'No responsive touch feedback'],
                  analysis: ['48×48px minimum for mobile', 'Spacing logic in Figma Variables', 'CSS Grid for perfect alignment'],
                  deliverables: ['Design Tokens system implemented', '100% WCAG AA compliance achieved', 'Device-agnostic responsive layout'],
                },
                {
                  problems: ['Colors inconsistent across states', 'No component library documentation', 'Figma to React mismatch'],
                  analysis: ['Built Figma Variables for all tokens', 'Exported to Tailwind config', 'Atomic design principles'],
                  deliverables: ['Single source of truth established', 'Bi-directional sync (Figma ↔ Code)', '40% faster component creation'],
                },
                {
                  problems: ['CSS animations cause jank', '45fps instead of 60fps', 'Scrollytelling feels sluggish'],
                  analysis: ['Switched to GSAP + GPU acceleration', 'ScrollTrigger for scroll sync', 'Will-change and transform optimization'],
                  deliverables: ['Consistent 60fps performance', 'Core Web Vitals passed', 'Micro-interactions feel native'],
                },
              ].map((audit, idx) => (
                <div key={idx} className="audit-card bg-[#1E1E1E] border border-[#333] p-8 rounded hover:border-[#007ACC]/50 transition-colors neon-box-glow">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="audit-col">
                      <div className="text-red-400 font-bold text-sm tracking-widest mb-3 uppercase">Problem</div>
                      <div className="space-y-2">{audit.problems.map((p, i) => <div key={i} className="text-gray-300 text-sm"><span className="text-red-400 mr-2">▸</span>{p}</div>)}</div>
                    </div>
                    <div className="audit-col">
                      <div className="text-yellow-400 font-bold text-sm tracking-widest mb-3 uppercase">Analysis</div>
                      <div className="space-y-2">{audit.analysis.map((a, i) => <div key={i} className="text-gray-300 text-sm"><span className="text-yellow-400 mr-2">▸</span>{a}</div>)}</div>
                    </div>
                    <div className="audit-col">
                      <div className="text-[#00FF41] font-bold text-sm tracking-widest mb-3 uppercase neon-glow">Deliverable</div>
                      <div className="space-y-2">{audit.deliverables.map((d, i) => <div key={i} className="text-gray-300 text-sm"><span className="text-[#00FF41] mr-2">▸</span>{d}</div>)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* EFFICIENCY ESTIMATOR */}
            <EfficiencyEstimator />
          </div>
        </section>

        {/* ── CLIENT VALIDATION ── */}
        <section className="py-24 border-b border-[#333] bg-[#121212]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-12 reveal-up">
              <h2 className="text-2xl font-bold mb-3">
                <span className="text-[#00FF41] neon-glow">{'>'}</span> CLIENT_VALIDATION <span className="text-[#007ACC]">--linkedin_verified</span>
              </h2>
              <div className="h-px w-20 bg-gradient-to-r from-[#00FF41] to-transparent mt-3 line-draw" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { quote: '"As a cornerstone of our development team... he was instrumental in creating high-quality HTML ads for key LCS and GCS clients (Google). He built new workflows that improved the team\'s efficiency... and directly contributed to exceeding client ROI expectations."', name: 'Kristina Brown', role: 'Senior Program Manager @ Monks', initials: 'KB' },
                { quote: '"From building automated pipelines and writing smart scripts... Xavier always finds a way to add value. On a large client project his framework allowed us to render assets at massive scale in a fraction of the time, saving the team countless hours."', name: 'Tim Wolters', role: 'Design Lead @ Monks', initials: 'TW' },
                { quote: '"He masterfully organizes and delivers on large-scale projects, ensuring they are built to scale. Beyond excellent technical skills in areas like web animation, Xavi is a natural leader who genuinely supports the development of his colleagues."', name: 'Pablo Carreira', role: 'Lead Display Developer', initials: 'PC' },
                { quote: '"Highly focused professional who seamlessly bridges business objectives with client needs... ensuring that expectations are met with precision. His leadership consistently sets the standard."', name: 'Jordan Maders', role: 'Director / Post Production', initials: 'JM' },
              ].map((t, i) => (
                <div key={i} className="testimonial-card border border-[#333] bg-[#1a1a1a] p-6 text-sm relative group hover:border-[#00FF41]/50 transition-all">
                  <div className="absolute top-4 right-4 text-[#007ACC]"><Linkedin size={16} fill="#007ACC" /></div>
                  <p className="text-gray-300 mb-6 leading-relaxed italic pr-8">{t.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center text-[#00FF41] font-bold text-xs border border-[#444]">{t.initials}</div>
                    <div>
                      <div className="text-white font-bold">{t.name}</div>
                      <div className="text-gray-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-24 border-b border-[#333] relative">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="mb-16 reveal-up">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 break-all">
                <span className="text-[#00FF41] neon-glow glitch glitch-trigger" data-text=">">{'>'}</span> SERVICE_ARCHITECTURE
              </h2>
              <p className="text-gray-500 max-w-2xl">Six specialized service pillars. Each delivers a defined result — not hours.</p>
              <div className="h-px w-24 bg-gradient-to-r from-[#00FF41] to-transparent mt-4 line-draw" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <FileText className="text-[#00FF41]" />, title: 'ARCHITECTURE_AUDIT', skills: ['Tech Stack Review', 'DCO Feed Stress Test', 'Performance Profiling', 'Feasibility Report'], desc: 'Pre-production consultancy to validate campaign feasibility and tech stacks. Deliverable: a comprehensive Feasibility Report & Technical Documentation.' },
                { icon: <Cpu className="text-[#00FF41]" />, title: 'WORKFLOW_AUTOMATION', skills: ['Python/Node.js Scripts', 'Asset Pipelines', 'Figma Plugins', 'Auto-Resizer'], desc: 'Custom scripts and tools that automate asset production. Deliverable: production-ready automation tools saving hundreds of hours per campaign.' },
                { icon: <Globe className="text-[#00FF41]" />, title: 'DCO_EXECUTION', skills: ['DV360', 'Dynamic Remarketing', 'CM360', 'Feed Architecture'], desc: 'Data-Driven Creative feeds into high-fidelity ad experiences. Deliverable: fully functional DCO pipeline at scale.' },
                { icon: <Zap className="text-[#00FF41]" />, title: 'VISUAL_ENGINEERING', skills: ['GSAP', 'WebGL', 'Scrollytelling', '60fps', 'Micro-interactions'], desc: 'Code-based motion and interaction design. Deliverable: GPU-accelerated interactive experiences with broadcast-quality animation.' },
                { icon: <Figma className="text-[#00FF41]" />, title: 'DESIGN_SYSTEMS', skills: ['Design Tokens', 'Figma Variables', 'Component Libs', 'Bi-Directional Sync'], desc: 'Bridging Figma and React with living style guides. Deliverable: production-grade design system ensuring intent survives handoff.' },
                { icon: <GraduationCap className="text-[#00FF41]" />, title: 'CORPORATE_TRAINING', skills: ['NEOLAND Master', 'Dev-Design Bridge', 'Workshops', '2-Day Programs'], desc: 'Up-skilling agency teams to bridge the design-dev gap. Deliverable: intensive workshops with certified curriculum.' },
              ].map((s, i) => (
                <div key={i} className="service-card tilt-card p-6 border border-[#333] bg-[#1a1a1a] hover:border-[#00FF41]/50 transition-all h-full flex flex-col group">
                  <div className="mb-4 group-hover:scale-110 transition-transform">{s.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-grow">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {s.skills.map((sk, j) => <span key={j} className="text-[10px] border border-[#333] text-gray-400 px-2 py-0.5 bg-[#121212] hover:border-[#00FF41]/30 hover:text-[#00FF41] transition-colors">{sk}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXECUTION PROTOCOL & OFFERINGS ── */}
        <section id="methodology" className="py-24 border-b border-[#333] bg-[#1E1E1E] relative">
          <div className="absolute inset-0 grid-bg-dense opacity-20" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">

            {/* Protocol */}
            <div className="mb-24">
              <div className="mb-16 text-center reveal-up">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 break-all">
                  <span className="text-[#00FF41] neon-glow glitch glitch-trigger" data-text=">">{'>'}</span> EXECUTION_PROTOCOL
                </h2>
                <p className="text-gray-500">Project-based. Result-oriented. Async-first.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { num: '01', title: 'Scope & Define', icon: <Target className="w-5 h-5" />, desc: 'Every engagement starts with a defined scope and deliverable. We agree on the output — a report, a script, a system — not a number of hours.' },
                  { num: '02', title: 'Execute & Deliver', icon: <RefreshCw className="w-5 h-5" />, desc: 'I determine the methods and timing independently. Daily commits and async updates. Production-quality output.' },
                  { num: '03', title: 'Review & Handoff', icon: <CheckCircle className="w-5 h-5" />, desc: 'Deliverables reviewed against agreed specifications. Full documentation and knowledge transfer. Your team owns the result.' },
                ].map((step, i) => (
                  <div key={i} className="protocol-step p-6 border border-[#333] bg-[#1a1a1a] hover:border-[#00FF41]/50 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[#007ACC] font-bold text-2xl">{step.num}</span>
                      <div className="text-gray-500 group-hover:text-[#00FF41] transition-colors">{step.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Badge */}
            <div className="mb-16 reveal-up">
              <div className="border border-[#007ACC]/30 bg-[#007ACC]/5 p-6 rounded flex items-start gap-4 pulse-ring">
                <Shield className="w-8 h-8 text-[#007ACC] shrink-0 mt-1" />
                <div>
                  <div className="text-white font-bold mb-2">Wet DBA 2025 Compliant</div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    All engagements operate on a <span className="text-white">result-obligation basis</span> (resultaatsverplichting). Scope is defined by deliverables and SLAs — not time, availability, or organizational embedding.
                  </p>
                </div>
              </div>
            </div>

            {/* Offerings */}
            <OfferingsSection />
          </div>
        </section>

        {/* ── CASE STUDIES ── */}
        <section id="work" className="py-24 border-b border-[#333] relative">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="reveal-up mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 break-all">
                <span className="text-[#00FF41] neon-glow glitch glitch-trigger" data-text=">">{'>'}</span> PROBLEMS_I&apos;VE_SOLVED
              </h2>
              <p className="text-gray-500 max-w-2xl mt-2">Every client project taught me something that became a reusable tool.</p>
              <div className="h-px w-20 bg-gradient-to-r from-[#00FF41] to-transparent mt-3 line-draw" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { client: 'BMW / MINI', project: 'Global Asset Scale', stats: ['75% reduction in production time', '40+ markets served', '500+ variants per campaign'], tech: ['Adobe', 'Figma API', 'Automation', 'React'], desc: 'Delivered a scalable asset management system enabling rapid localization across 40+ markets. Result: a production pipeline that cut campaign turnaround by 75%.', slug: 'bmw-mini', tool: 'Banner Automation Kit — €250', toolLink: '#audit' },
                { client: 'GTECH', project: 'Data-to-Creative Pipeline', stats: ['300% ad relevance increase', '45% CTR improvement', 'Real-time optimization'], tech: ['Machine Learning', 'Google Ads API', 'Node.js', 'Analytics'], desc: 'Built an AI-powered pipeline analyzing user signals to generate optimized ad variants. Result: 45% CTR improvement through automated creative optimization.', slug: 'gtech', tool: 'DCO Implementation Blueprint — €500', toolLink: '#audit' },
                { client: 'FBTO', project: 'Rich Media Experience', stats: ['250% engagement increase', '85% conversion bump', 'Award-winning creative'], tech: ['HTML5 Canvas', 'GSAP Animation', 'SVG', 'Interactive'], desc: 'Created interactive rich media campaigns explaining complex insurance products through animated storytelling. Result: 250% engagement increase.', slug: 'fbto', tool: 'GSAP Animation Library — €150', toolLink: '#audit' },
                { client: 'HUAWEI', project: 'Color Takes Over', stats: ['400% product interaction', '95% completion rate', 'Cross-platform consistency'], tech: ['3D CSS Transforms', 'WebGL', 'Color Theory', 'Mobile Opt'], desc: 'Delivered an immersive color-interactive experience for device exploration with 3D-like rotations. Result: 400% product interaction increase.', slug: 'huawei', tool: 'Figma Banner Template Library — €100', toolLink: '#audit' },
              ].map((c, i) => (
                <div key={i} className="case-card bg-[#121212] border border-[#333] hover:border-[#007ACC]/50 transition-all rounded group overflow-hidden">
                  <div className="p-6 border-b border-[#333] bg-[#1E1E1E]/50 flex justify-between items-center">
                    <div>
                      <div className="text-[#007ACC] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Client</div>
                      <div className="text-xl font-bold text-white">{c.client}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Project</div>
                      <div className="text-gray-300 text-sm">{c.project}</div>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-400 mb-6 leading-relaxed text-sm">{c.desc}</p>
                    <div className="space-y-3 mb-6">
                      {c.stats.map((s, j) => (
                        <div key={j} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-[#00FF41] mr-2 mt-0.5 shrink-0" />
                          <span className="text-gray-300 text-sm">{s}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.tech.map((t, j) => <span key={j} className="text-[10px] font-mono bg-[#333] text-gray-400 px-2 py-0.5 rounded">{t}</span>)}
                    </div>
                  </div>
                  <Link href={`/cases/${c.slug}`} className="block px-6 py-3 bg-[#1E1E1E]/30 border-t border-[#333] flex justify-between items-center group-hover:bg-[#007ACC]/10 transition-colors">
                    <span className="text-sm font-bold text-gray-500 group-hover:text-[#007ACC] transition-colors">VIEW_PROJECT_LOG</span>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#007ACC] group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href={c.toolLink} className="block px-6 py-3 bg-[#00FF41]/5 border-t border-[#00FF41]/20 flex justify-between items-center hover:bg-[#00FF41]/10 transition-colors">
                    <span className="text-xs font-bold text-[#00FF41]/70 hover:text-[#00FF41] transition-colors">→ Tool built from this: {c.tool}</span>
                    <ArrowRight className="w-3 h-3 text-[#00FF41]/50" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT / AUDIT FORM ── */}
        <section id="audit" className="py-24 bg-[#1E1E1E] relative">
          <div className="absolute inset-0 grid-bg-dense opacity-10" />
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="contact-form-wrapper bg-[#121212] border border-[#333] rounded-lg shadow-2xl p-8 md:p-12 neon-box-glow">
              {state.succeeded ? (
                <div className="text-center py-12 border border-[#00FF41]/30 bg-[#00FF41]/5 rounded">
                  <CheckCircle className="w-16 h-16 text-[#00FF41] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2 neon-glow">TRANSMISSION_RECEIVED</h3>
                  <p className="text-gray-400">I will analyze your request and respond with a scoped proposal.</p>
                  <button onClick={() => window.location.reload()} className="mt-6 text-sm text-[#00FF41] hover:underline">[ New_Transmission ]</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                      <span className="text-[#00FF41] neon-glow-strong mr-2 flicker">█</span>
                      WHAT_DO_YOU_NEED?
                    </h3>
                    <p className="text-gray-500 text-sm">Pick a path and I&apos;ll get back to you within 24–48 hours. Response time: 24-48 hours.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#007ACC] mb-2 text-sm" htmlFor="name">{'>'} organization:</label>
                      <input id="name" type="text" name="name" required
                        className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors placeholder-gray-700 text-sm"
                        placeholder="Name / Agency" />
                    </div>
                    <div>
                      <label className="block text-[#007ACC] mb-2 text-sm" htmlFor="email">{'>'} contact_email:</label>
                      <input id="email" type="email" name="email" required
                        className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none transition-colors placeholder-gray-700 text-sm"
                        placeholder="your@email.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#007ACC] mb-2 text-sm" htmlFor="mission">{'>'} select_service:</label>
                    <div className="relative">
                      <select id="mission" name="mission" required
                        className="w-full bg-[#1a1a1a] border border-[#333] text-white p-3 appearance-none focus:border-[#00FF41] outline-none transition-colors text-sm">
                        <option value="">-- What do you need? --</option>
                        <option value="buy-tool">I want to buy a tool (Banner Kit, GSAP Library, DCO Blueprint...)</option>
                        <option value="workshop">I want to book a workshop (€500/session — team training)</option>
                        <option value="workflow-audit">I need a workflow audit (€995 — 1-week deep dive)</option>
                        <option value="design-system">I need a design system rescue (€2,950 — 1-week sprint)</option>
                        <option value="other">Something else — let me explain below</option>
                      </select>
                      <div className="absolute right-3 top-3 pointer-events-none text-gray-500"><ChevronRight className="rotate-90 w-4 h-4" /></div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#007ACC] mb-2 text-sm" htmlFor="message">{'>'} project_brief:</label>
                    <textarea id="message" name="message" required rows={3}
                      className="w-full bg-transparent border-b border-[#333] focus:border-[#00FF41] text-white p-2 outline-none resize-none transition-colors placeholder-gray-700 text-sm"
                      placeholder="Describe the project scope..." />
                  </div>

                  <button type="submit" disabled={state.submitting}
                    className="magnetic-btn w-full md:w-auto bg-[#00FF41] text-[#121212] font-bold px-8 py-4 hover:bg-[#00CC33] transition-colors flex items-center justify-center uppercase tracking-wider disabled:opacity-50 neon-box-glow text-sm">
                    {state.submitting ? 'TRANSMITTING...' : '[ REQUEST_PROPOSAL ]'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer id="contact" className="bg-[#121212] border-t border-[#333] py-24">
          <div className="footer-content max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <AnimatedLogo size={32} />
                  <h4 className="text-2xl font-bold text-white neon-glow">x-code.studio</h4>
                </div>
                <p className="text-gray-500 mb-6 max-w-md text-sm leading-relaxed">
                  Tools, teaching & automation for ad-tech. I build the scripts, templates and blueprints that fix banner production — then I teach teams how to use them.
                </p>
                <a href="mailto:hello@x-code.studio" className="text-[#00FF41] hover:underline neon-glow">hello@x-code.studio</a>
              </div>
              <div className="md:text-right">
                <h4 className="text-xl font-bold text-white mb-6">Directory_</h4>
                <div className="flex flex-col md:items-end space-y-3">
                  <a href="https://linkedin.com/in/xavier-garcia-diez" className="text-gray-500 hover:text-white flex items-center text-sm transition-colors">LinkedIn <ExternalLink className="w-3 h-3 ml-2" /></a>
                  <a href="https://github.com/xaviergdiez" className="text-gray-500 hover:text-white flex items-center text-sm transition-colors">GitHub <ExternalLink className="w-3 h-3 ml-2" /></a>
                  <a href="https://www.neoland.online//master-product-design" className="text-gray-500 hover:text-white flex items-center text-sm transition-colors">NEOLAND Master Course <ExternalLink className="w-3 h-3 ml-2" /></a>
                  <span className="text-gray-700 text-xs mt-4">KVK: Pending | BTW-id: Pending</span>
                </div>
              </div>
            </div>
            <div className="h-px w-full bg-[#333] line-draw" />
            <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs">
              <div>&copy; {new Date().getFullYear()} x-code.studio | Amsterdam, NL | Tools, Teaching & Automation</div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-[#00FF41] transition-colors">./privacy</a>
                <a href="#" className="hover:text-[#00FF41] transition-colors">./terms</a>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// OFFERINGS SECTION
// ═══════════════════════════════════════════════════════════════
function OfferingsSection() {
  const offerings = [
    { id: 'automation', title: 'BANNER AUTOMATION KIT', sub: '€250 — one-time', desc: 'Python/Node.js scripts that resize a master banner to 30 sizes automatically. 40 hours manual → 2 hours.', features: ['30 standard banner sizes', 'CSV data injection scripts', 'Setup video guide included', 'Lifetime updates', 'Instant download'], cta: 'GET_KIT →', link: '#audit', hl: false },
    { id: 'gsap', title: 'GSAP ANIMATION LIBRARY', sub: '€150 — one-time', desc: '15 production-ready animation templates. Copy-paste ready, performance optimized, commercial license included.', features: ['15 pre-built templates', 'Parallax, scroll-reveal, more', 'GPU-accelerated', 'Commercial license', 'Instant download'], cta: 'GET_LIBRARY →', link: '#audit', hl: false },
    { id: 'dco', title: 'DCO IMPLEMENTATION BLUEPRINT', sub: '€500 — one-time', desc: '50-page guide covering DCO architecture from feed design to platform integration. Includes 1-hour walkthrough call.', features: ['50-page PDF guide', 'Feed validation scripts', 'Google & Meta integration', 'Architecture diagrams', '1-hour Zoom walkthrough'], cta: 'GET_BLUEPRINT →', link: '#audit', hl: true },
    { id: 'audit', title: 'WORKFLOW AUDIT', sub: '€995 fixed-price', desc: '1-week deep dive into your production workflow. Written report + implementation roadmap. No ongoing commitment.', features: ['1-week analysis sprint', 'Written audit report', 'Implementation roadmap', 'Deliverable-based', 'No retainer required'], cta: 'BOOK_AUDIT →', link: '/offerings/audit', hl: false },
    { id: 'system', title: 'DESIGN SYSTEM RESCUE', sub: '€2,950 fixed-price', desc: 'Fix your broken Figma system. 1-week sprint, deliverable-based. Clean design system + dev handoff guide.', features: ['System audit & refactor', 'Figma Variables & Tokens', 'Dev handover package', 'Style guide documentation', 'Async delivery'], cta: 'SCOPE_PROJECT →', link: '/offerings/design-system', hl: false },
    { id: 'workshop', title: 'TEAM WORKSHOP', sub: '€500/session', desc: '2-hour live team training. Banner production, DCO basics, or design-to-dev bridge. NEOLAND certified curriculum.', features: ['2-hour live session', 'Live coding included', 'Q&A included', 'NEOLAND certified', 'Remote or on-site'], cta: 'BOOK_WORKSHOP →', link: '#audit', hl: false },
  ];

  return (
    <div className="border-t border-[#333] pt-24">
      <div className="mb-16 text-center reveal-up">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 break-all">
          <span className="text-[#00FF41] neon-glow glitch glitch-trigger" data-text=">">{'>'}</span> THE_TOOLBOX
        </h2>
        <p className="text-gray-500">Tools, blueprints & workshops. Buy once, use forever. No retainers.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {offerings.map((o) => (
          <div key={o.id}
            className={`offering-card relative p-6 border flex flex-col h-full transition-all duration-300 hover:border-[#00FF41]/40 group ${o.hl ? 'border-[#00FF41]/50 bg-[#1a1a1a] neon-box-glow' : 'border-[#333] bg-[#121212]'}`}>
            {o.hl && <div className="absolute top-0 right-0 bg-[#00FF41] text-[#121212] text-[10px] font-bold px-2 py-0.5 tracking-wider">RECOMMENDED</div>}
            <h3 className="text-lg font-bold text-white mb-1">{o.title}</h3>
            <div className="text-xs text-gray-600 mb-4">{o.sub}</div>
            <p className="text-gray-400 text-sm mb-6 border-b border-[#333] pb-4">{o.desc}</p>
            <ul className="space-y-2 mb-6 flex-grow">
              {o.features.map((f, j) => (
                <li key={j} className="flex items-start text-xs text-gray-400">
                  <CheckCircle className="w-3 h-3 text-[#007ACC] mr-2 mt-0.5 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Link href={o.link}
              className={`magnetic-btn block w-full py-2.5 font-bold uppercase tracking-wider border text-xs text-center transition-all duration-300 ${o.hl ? 'bg-[#00FF41] text-[#121212] border-[#00FF41]' : 'border-[#333] text-white hover:bg-[#333]'}`}>
              {o.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EFFICIENCY ESTIMATOR (Full sliders preserved)
// ═══════════════════════════════════════════════════════════════
function EfficiencyEstimator() {
  const [banners, setBanners] = useState(50);
  const [timePerBanner, setTimePerBanner] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(85);

  const manualCost = banners * timePerBanner * hourlyRate;
  const automatedTime = banners * 0.1;
  const automatedCost = automatedTime * hourlyRate;
  const savings = manualCost - automatedCost;

  return (
    <div className="mt-16 audit-card bg-[#1E1E1E] border border-[#333] p-8 rounded neon-box-glow">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-[#007ACC] text-xs mb-3 tracking-widest">
              <Activity size={12} />EFFICIENCY_GAP_ANALYSIS
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Are you burning budget on manual versioning?</h3>
            <div className="h-px w-16 bg-gradient-to-r from-[#00FF41] to-transparent mb-6 line-draw" />
          </div>
          <p className="text-gray-500 mb-6 leading-relaxed text-sm">
            Agencies bleed profit in the &quot;Versioning Phase.&quot; Use this calculator to see how much manual production is costing you per campaign vs. an Automated Pipeline.
          </p>
          <ul className="space-y-2.5">
            {['Designers copy-pasting text into 50 Figma frames.', 'Developers manually tweaking CSS for every language.', 'QA team checking every banner size manually.', 'Project managers tracking versions in spreadsheets.', 'Back-and-forth revisions eating days of billable hours.', 'Exporting assets one-by-one from design tools.'].map((pain, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="p-0.5 bg-red-400/10 text-red-400 rounded mt-1 shrink-0"><Activity size={10} /></div>
                <span className="text-gray-400 text-xs">{pain}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#121212] border border-[#333] p-6 rounded relative">
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#00FF41]/10 text-[#00FF41] text-[10px] border-b border-l border-[#00FF41]/20 tracking-widest neon-glow">
            INTERACTIVE
          </div>

          <div className="space-y-6 mt-4">
            <div>
              <label className="block text-[10px] text-gray-600 mb-3 uppercase tracking-widest">Campaign Volume (Assets)</label>
              <input type="range" min="10" max="500" value={banners} onChange={(e) => setBanners(Number(e.target.value))}
                style={{ background: `linear-gradient(to right, #00FF41 ${((banners - 10) / (500 - 10)) * 100}%, #444 ${((banners - 10) / (500 - 10)) * 100}%)` }} />
              <div className="text-right text-white text-lg mt-3">{banners} <span className="text-gray-600 text-sm">assets</span></div>
            </div>
            <div>
              <label className="block text-[10px] text-gray-600 mb-3 uppercase tracking-widest">Manual Time Per Asset (Hours)</label>
              <input type="range" min="0.5" max="5" step="0.5" value={timePerBanner} onChange={(e) => setTimePerBanner(Number(e.target.value))}
                style={{ background: `linear-gradient(to right, #00FF41 ${((timePerBanner - 0.5) / (5 - 0.5)) * 100}%, #444 ${((timePerBanner - 0.5) / (5 - 0.5)) * 100}%)` }} />
              <div className="text-right text-white text-lg mt-3">{timePerBanner} <span className="text-gray-600 text-sm">hrs</span></div>
            </div>
            <div>
              <label className="block text-[10px] text-gray-600 mb-3 uppercase tracking-widest">Hourly Rate (€)</label>
              <input type="range" min="40" max="200" step="5" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))}
                style={{ background: `linear-gradient(to right, #00FF41 ${((hourlyRate - 40) / (200 - 40)) * 100}%, #444 ${((hourlyRate - 40) / (200 - 40)) * 100}%)` }} />
              <div className="text-right text-white text-lg mt-3">€{hourlyRate}<span className="text-gray-600 text-sm">/hr</span></div>
            </div>

            <div className="pt-6 border-t border-[#333]">
              <div className="text-gray-600 text-[10px] uppercase tracking-widest mb-2">Potential Savings:</div>
              <div className="text-5xl font-bold text-[#00FF41] neon-glow-strong">€{savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <div className="text-[10px] text-gray-600 mt-2 uppercase tracking-widest">Per Campaign</div>
              <button onClick={() => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })}
                className="magnetic-btn w-full mt-6 bg-[#00FF41] text-[#121212] font-bold px-6 py-3 hover:bg-[#00CC33] transition-all uppercase tracking-wider text-xs flex items-center justify-center gap-2 neon-box-glow">
                SEE_WHICH_TOOL_SOLVES_THIS <ArrowRight size={14} />
              </button>
              <div className="mt-4 space-y-1 text-[10px] text-gray-500">
                <div>→ Banner Automation Kit (€250)</div>
                <div>→ DCO Implementation Blueprint (€500)</div>
                <div>→ GSAP Animation Library (€150)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
