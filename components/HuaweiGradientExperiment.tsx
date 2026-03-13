'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function HuaweiGradientExperiment() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const phoneBackRef = useRef<SVGSVGElement>(null);
  const outlineContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    // Animation timeline (converted from GSAP2 to GSAP3)
    const tl = gsap.timeline({ delay: 0.5 });

    // Reset function - set initial states
    const reset = () => {
      gsap.set("#phone_back", { autoAlpha: 0 });
      gsap.set(["#phone_back", "#phone_outline"], { transformOrigin: "150px 300px" });
      gsap.set("#cta_container", { autoAlpha: 0 });
      gsap.set("#toplogo", { autoAlpha: 0, transformOrigin: "center center" });
      gsap.set("#overlay", { autoAlpha: 1 });
    };

    // Main animation sequence
    const animate = () => {
      gsap.to("#overlay", { duration: 0.8, autoAlpha: 0 });

      tl
        .to("#phone_logo", { duration: 0.5, stroke: "transparent", fill: "#fff", ease: "sine.inOut" })
        .to("#phone_back", { duration: 1, autoAlpha: 1, ease: "sine.inOut" }, '-=1')
        .to(["#phone_back", "#phone_outline"], { duration: 2, scale: 0.8, ease: "sine.inOut" }, '-=2')
        // Stagger gradient stops (GSAP3 syntax)
        .to("#phone_gradient stop", {
          duration: 1.6,
          stopColor: (i) => {
            const colors = [
              'hsl(212, 30%, 8%)',
              'hsl(219, 29%, 9%)',
              'hsl(237, 30%, 12%)',
              'hsl(248, 38%, 16%)',
              'hsl(253, 45%, 22%)',
              'hsl(240, 51%, 48%)',
              'hsl(204, 95%, 60%)',
              'hsl(197, 94%, 79%)'
            ];
            return colors[i] || colors[0];
          },
          stagger: 0.2,
          ease: "sine.inOut"
        }, '-=1')
        .to("#bg_gradient stop", {
          duration: 1.6,
          stopColor: (i) => {
            const colors = [
              'hsl(212, 30%, 8%)',
              'hsl(219, 29%, 9%)',
              'hsl(237, 30%, 12%)',
              'hsl(248, 38%, 16%)',
              'hsl(253, 45%, 22%)',
              'hsl(240, 51%, 48%)',
              'hsl(204, 95%, 60%)',
              'hsl(197, 94%, 79%)'
            ];
            return colors[i] || colors[0];
          },
          stagger: 0.2,
          ease: "sine.inOut"
        }, '-=3')
        .to("#cta_container", { duration: 0.7, autoAlpha: 1, ease: "sine.out" })
        .to("#toplogo", { duration: 0.7, autoAlpha: 1, ease: "sine.out" }, '-=3')
        .to(".logoLetter", { duration: 0.7, fill: "#000", ease: "sine.in" }, '-=2.3');
    };

    // Mouse interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const xPos = (mouseX / banner.clientWidth) - 0.5;
      const yPos = (mouseY / banner.clientHeight) - 0.5;
      const rotationYValue = 10 * xPos;
      const rotationXValue = 10 * yPos;

      animatePhone(rotationYValue, rotationXValue);
      gradientShift(rotationYValue, rotationXValue);
      bgShift(rotationYValue, rotationXValue);
    };

    const animatePhone = (rotationYValue: number, rotationXValue: number) => {
      gsap.to(["#phone_back", "#outline_container"], {
        duration: 0.3,
        rotationY: rotationYValue,
        rotationX: rotationXValue,
        ease: "power2.inOut",
        transformPerspective: 600
      });
    };

    const gradientShift = (rotationYValue: number, rotationXValue: number) => {
      gsap.to("#phone_gradient stop", {
        duration: 0.0375,
        stopColor: (i) => {
          const baseColors = [
            { h: 212, s: 30, l: 8 },
            { h: 219, s: 29, l: 9 },
            { h: 237, s: 30, l: 12 },
            { h: 248, s: 38, l: 16 },
            { h: 253, s: 45, l: 22 },
            { h: 240, s: 51, l: 48 },
            { h: 204, s: 95, l: 60 },
            { h: 197, s: 94, l: 79 }
          ];
          const color = baseColors[i] || baseColors[0];
          const multiplier = i === 0 ? 1 : 3;
          return `hsl(${color.h + rotationYValue * multiplier}, ${color.s + rotationXValue}%, ${color.l + rotationXValue}%)`;
        },
        stagger: 0.0375,
        ease: "sine.inOut"
      });
    };

    const bgShift = (rotationYValue: number, rotationXValue: number) => {
      gsap.to("#bg_gradient stop", {
        duration: 0.0375,
        stopColor: (i) => {
          const baseColors = [
            { h: 212, s: 30, l: 8 },
            { h: 219, s: 29, l: 9 },
            { h: 237, s: 30, l: 12 },
            { h: 248, s: 38, l: 16 },
            { h: 253, s: 45, l: 22 },
            { h: 240, s: 51, l: 48 },
            { h: 204, s: 95, l: 60 },
            { h: 197, s: 94, l: 79 }
          ];
          const color = baseColors[i] || baseColors[0];
          const multiplier = i === 0 ? 1 : 3;
          return `hsl(${color.h - rotationYValue * multiplier}, ${color.s - rotationXValue}%, ${color.l - rotationXValue}%)`;
        },
        stagger: 0.0375,
        ease: "sine.inOut"
      });
    };

    // Initialize
    reset();
    animate();

    // Add mouse interaction after 6 seconds
    const timeoutId = setTimeout(() => {
      banner.addEventListener('mousemove', handleMouseMove);
    }, 6000);

    setIsReady(true);

    return () => {
      clearTimeout(timeoutId);
      banner.removeEventListener('mousemove', handleMouseMove);
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      className="relative w-full bg-black overflow-hidden cursor-pointer"
      style={{
        width: '300px',
        height: '600px',
        visibility: isReady ? 'visible' : 'hidden',
        perspective: '600px'
      }}
    >
      {/* Background SVG */}
      <svg
        id="bg"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 600 1200"
      >
        <linearGradient id="bg_gradient" x1="445.77" y1="1143.37" x2="156.92" y2="65.38" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="hsl(212, 30%, 8%)" />
          <stop offset="0.1" stopColor="hsl(212, 30%, 8%)" />
          <stop offset="0.18" stopColor="hsl(212, 30%, 8%)" />
          <stop offset="0.26" stopColor="hsl(212, 30%, 8%)" />
          <stop offset="0.32" stopColor="hsl(212, 30%, 8%)" />
          <stop offset="0.6" stopColor="hsl(212, 30%, 8%)" />
          <stop offset="0.87" stopColor="hsl(239, 58%, 32%)" />
          <stop offset="1" stopColor="hsl(240, 51%, 48%)" />
        </linearGradient>

        <rect id="bg" width="600" height="1200" x="0" y="0" fill="url(#bg_gradient)" />

        <g id="toplogo">
          <g id="toplogo_letters">
            <polygon id="toplogo_letterH" className="logoLetter"
              points="285.18 61.04 276.07 61.04 276.07 53.01 272.03 53.01 272.03 72.91 276.07 72.91 276.07 64.83 285.18 64.83 285.18 72.91 289.22 72.91 289.22 53.01 285.18 53.01 285.18 61.04"
              fill="#fff" />
            <path id="toplogo_letterU" className="logoLetter"
              d="M307.92,64.4c0,3.24-1.6,5-4.52,5s-4.55-1.77-4.55-5.1V53h-4V64.4c0,5.6,3.11,8.81,8.54,8.81s8.61-3.27,8.61-9V53h-4Z"
              fill="#fff" />
            <path id="toplogo_letterA" className="logoLetter"
              d="M329,68.76l1.79,4.14h4.23l-8.68-19.77L326.3,53h-3.53L314,72.9h4.12l1.69-3.85h0l.12-.29Zm-4.56-10.71,2.88,6.66h0l.19.46h-6.1l.19-.46h0Z"
              fill="#fff" />
            <polygon id="toplogo_letterW" className="logoLetter"
              points="354.58 66.69 350.06 53.01 346.77 53.01 342.25 66.69 337.86 53.02 333.56 53.02 340.49 72.91 343.84 72.91 348.36 59.85 352.88 72.91 356.25 72.91 363.17 53.02 358.99 53.02 354.58 66.69"
              fill="#fff" />
            <polygon id="toplogo_letterE" className="logoLetter"
              points="370.41 64.35 377.75 64.35 377.75 60.72 370.41 60.72 370.41 56.65 381.07 56.65 381.07 53.03 366.43 53.03 366.43 72.9 381.45 72.9 381.45 69.27 370.41 69.27 370.41 64.35"
              fill="#fff" />
            <rect id="toplogo_letterI" className="logoLetter" x="386.26" y="53.01" width="3.98" height="19.87" fill="#fff" />
          </g>

          <path id="toplogo_symbol"
            d="M232.29,70.8a.19.19,0,0,1-.22,0c-2.24-1.12-11.91-6-15.9-9.93a7.69,7.69,0,0,1-2.65-5.25c-.33-4.35,4.25-8.7,4.25-8.7a119.55,119.55,0,0,1,14.56,23.65h0a.16.16,0,0,1,0,.19m-1.5,3.33c0-.14-.21-.14-.21-.14h0l-16.08.56c1.74,3.12,4.68,5.54,7.74,4.79,2.11-.52,6.9-3.87,8.48-5h0c.12-.11.08-.2.08-.2m.24-1.45c.08-.12-.06-.23-.06-.23h0c-7.07-4.77-20.77-12.1-20.77-12.1a9.55,9.55,0,0,0,5.51,11.79,9.82,9.82,0,0,0,3.08.67c.24,0,9.57,0,12.07,0a.19.19,0,0,0,.16-.11M232.1,40c-.7.06-2.59.49-2.59.49a7.44,7.44,0,0,0-5.26,5,9.8,9.8,0,0,0,0,5.11c1.42,6.32,8.42,16.7,9.92,18.88a.2.2,0,0,0,.19.07.21.21,0,0,0,.15-.21h0C236.85,46.14,232.1,40,232.1,40m5.33,29.51a.19.19,0,0,0,.23-.09h0c1.55-2.23,8.5-12.56,9.92-18.85a10.68,10.68,0,0,0,0-5.11,7.49,7.49,0,0,0-5.32-5s-1.23-.31-2.53-.49c0,0-4.77,6.15-2.46,29.33h0a.19.19,0,0,0,.12.18M241.24,74s-.14,0-.18.12,0,.15.06.22h0c1.54,1.1,6.21,4.37,8.46,5,0,0,4.16,1.42,7.77-4.8L241.24,74Zm20.39-13.69S248,67.66,240.88,72.43h0a.21.21,0,0,0-.09.23s.07.12.17.12h0c2.53,0,12.11,0,12.36,0a9.84,9.84,0,0,0,2.77-.63,9.42,9.42,0,0,0,5.17-5,9.73,9.73,0,0,0,.36-6.85m-22,10.49a.22.22,0,0,0,.22,0h0c2.3-1.15,11.89-6,15.87-9.91a7.75,7.75,0,0,0,2.64-5.27c.3-4.51-4.24-8.68-4.24-8.68a119.64,119.64,0,0,0-14.54,23.58h0a.24.24,0,0,0,0,.26"
            fill="#c3182d" />
        </g>
      </svg>

      {/* Phone Back SVG */}
      <svg
        ref={phoneBackRef}
        id="phone_back"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 600 1200"
      >
        <defs>
          <linearGradient id="phone_gradient" x1="445.77" y1="1143.37" x2="156.92" y2="65.38" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="hsl(212, 30%, 8%)" />
            <stop offset="0.1" stopColor="hsl(212, 30%, 8%)" />
            <stop offset="0.18" stopColor="hsl(212, 30%, 8%)" />
            <stop offset="0.26" stopColor="hsl(212, 30%, 8%)" />
            <stop offset="0.32" stopColor="hsl(212, 30%, 8%)" />
            <stop offset="0.6" stopColor="hsl(212, 30%, 8%)" />
            <stop offset="0.87" stopColor="hsl(239, 58%, 32%)" />
            <stop offset="1" stopColor="hsl(240, 51%, 48%)" />
          </linearGradient>

          <pattern id="phoneMask" patternUnits="userSpaceOnUse" width="600" height="1200" x="0" y="0">
            <image xlinkHref="/images/huawei/phone.jpg" width="600" height="1200" x="0" y="0" />
          </pattern>
        </defs>

        <path
          fill="url(#phoneMask)"
          d="M404.81,1137.48c-23.14,0-44.39,0-67.52-.06-6.57,0-13.25-.12-19.7-.22-6.77-.12-13.77-.23-20.66-.23h-1.11q-41.91.08-83.81.23-44.07.13-88.14.23h-.3c-13.52,0-23.6-1.74-32.66-5.65-18.18-7.83-28.66-22-31.15-42a332.74,332.74,0,0,1-2.42-40.24c-.12-113.57-.15-228-.17-339.72q0-73.11,0-146.21c0-.4,0-.82.07-1.25.17-1.95.38-4.39-3-5.27a9.48,9.48,0,0,1-.44-3.11c-.07-19.81-.11-39.23,0-59a5,5,0,0,1,1.14-2.37,11.24,11.24,0,0,0,1-1.61l.25-.5a7.77,7.77,0,0,0,1-3.17c.09-11.32.07-22.83.05-34,0-2.39-.19-3.16-.77-3.33-3.42-1-3.14-3.23-2.82-5.8a14.67,14.67,0,0,0,.17-2.06c-.13-42.63-.11-85.44-.09-118,0-.49,0-1-.07-1.5-.16-2.21-.3-4.12,2.44-5.31,1-.45,1.09-2.53,1.09-5.2v-.34c0-51.29,0-109.42,0-166.48,0-15.36,1.77-27.8,5.65-39.12,5.92-17.32,16.86-27.89,32.5-31.43a177.64,177.64,0,0,1,38.3-4.71c55-.17,114-.25,180.24-.25,59.95,0,117.9.07,163.33.13,15,0,26.78,2,36.94,6.24,17.19,7.17,27.15,21,30.45,42.25a169.77,169.77,0,0,1,1.91,25.78c.09,128.35.09,258.86.09,385.07v82.36h-.45v82.49q0,96,0,191.92V889c0,50.8,0,103.33-.06,155,0,3.45,0,5.9,0,9.36.08,10,.15,20.41-.53,30.56-1.32,19.33-8.52,33.3-22,42.7-9.49,6.61-20.6,8.69-29.22,9.77a182.56,182.56,0,0,1-21.88,1.06Q438.6,1137.48,404.81,1137.48Z"
        />

        <path
          className="twilight"
          fill="url(#phone_gradient)"
          d="M59.26,600.46q0-219.23,0-438.46c0-12.72,0-25.47.72-38.16C61.08,106,70.26,93.15,86.36,85.42c10.16-4.89,21.08-6.71,32.25-6.75,28.1-.11,56.2,0,84.29,0q141.75,0,283.49.09c6.48,0,13.21.27,19.4,2,20.62,5.66,31.6,20.73,36.2,40.62a126.3,126.3,0,0,1,3.12,28q.33,150.06.13,300.12,0,312.21-.08,624.42c0,6.85-.19,14-2.1,20.48-5,17.07-18.12,26.35-34.19,31.89A86.86,86.86,0,0,1,480,1131q-137.78-.65-275.54-1c-32-.12-64-.1-96-.68-10.75-.2-20-5.56-28.42-12-14.77-11.35-21-26.83-21-45.14V600.46ZM300.20,188.09H255.6a32.4,32.4,0,0,0-32.23,32.58q0,46.12,0,92.23a43.32,43.32,0,0,0,1,9.37c3.45,15.51,18.22,26.42,35.74,26.2,29.61-.38,59.21-.83,88.81-1.53,12.81-.31,22.56-6.16,27.39-18.38a43.06,43.06,0,0,0,3.22-15q.47-46.68.14-93.36c-.11-16.95-16-32.08-33-32.11Q323.46,188.06,300.20,188.09Z"
        />

        <path
          id="phone_logo"
          d="M264.9,912h3.35v16.5H264.9v-6.7h-7.55v6.7H254V912h3.35v6.66h7.55Zm18.86,9.45c0,2.68-1.34,4.11-3.75,4.11s-3.77-1.47-3.77-4.23V912h-3.35v9.44c0,4.63,2.58,7.3,7.07,7.3s7.14-2.71,7.14-7.44V912h-3.34Zm38.67,1.9L318.69,912H316l-3.75,11.35L308.57,912H305l5.74,16.49h2.78l3.75-10.83L321,928.46h2.79L329.55,912h-3.47Zm13.12-1.95h6.09v-3h-6.09V915h8.84v-3H332.25v16.47h12.46v-3h-9.16ZM348.7,912v16.48H352V912Zm-55,13.06-.1.24h0l-1.41,3.19H288.8L296.06,912H299l.06.1,7.2,16.39h-3.5L301.26,925Zm1.4-3.36h0L295,922H300l-.16-.38h0l-2.39-5.52Z"
          fill="transparent"
          stroke="#fff"
          strokeMiterlimit="10"
        />
      </svg>

      {/* Phone Outline */}
      <div ref={outlineContainerRef} id="outline_container" className="absolute inset-0 w-full h-full">
        <svg
          id="phone_outline"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 1200"
        >
          <path
            id="outer_phone"
            d="M109.62,1129.32c-10.74-.2-20-5.56-28.41-12-14.77-11.35-21-26.83-21-45.14V600.46h.22q0-219.23,0-438.46c0-12.72,0-25.47.73-38.16C62.25,106,71.43,93.15,87.53,85.42c10.16-4.89,21.08-6.71,32.25-6.75,28.1-.11,56.19,0,84.29,0,94.5,0,191,0,285.49.09,6.48,0,13.21.27,19.4,2,20.62,5.66,31.6,20.73,36.2,40.62a126.89,126.89,0,0,1,3.12,28c.21,100-1.87,200.08-1.87,300.12q0,312.21-.08,624.42c0,6.85-.19,14-2.11,20.48-5,17.07-18.11,26.35-34.19,31.89a86.77,86.77,0,0,1-28.88,4.79l-12.46-.06Z"
            fill="transparent"
            stroke="#fff"
            strokeMiterlimit="10"
          />
          <path
            id="inner_phone"
            d="M301.37,188.09H256.76a32.4,32.4,0,0,0-32.22,32.58q-.06,46.12,0,92.23a44,44,0,0,0,1,9.37c3.45,15.51,18.22,26.42,35.74,26.2,29.6-.38,59.21-.83,88.8-1.53,12.81-.31,22.57-6.16,27.39-18.38a43.07,43.07,0,0,0,3.23-15q.46-46.68.14-93.36c-.12-16.95-16-32.08-33-32.11Q324.61,188.06,301.37,188.09Z"
            fill="transparent"
            stroke="#fff"
            strokeMiterlimit="10"
          />
        </svg>
      </div>

      {/* Overlay and Border */}
      <div id="overlay" className="absolute inset-0 w-full h-full bg-white" />
      <div id="border" className="absolute inset-0 w-full h-full border border-[#666] box-border pointer-events-none" />

      {/* CTA Container */}
      <div
        id="cta_container"
        className="absolute left-[75px] top-[550px] w-[150px] h-[30px] overflow-hidden text-white text-center text-xs font-light leading-[30px] border border-red-600 cursor-pointer"
      >
        <div id="bg" className="absolute inset-0" />
        <div id="slider" className="absolute inset-0 bg-red-600 -left-full" />
        <div id="cta_txt" className="absolute inset-0 z-10">ONTDEK MEER</div>
      </div>
    </div>
  );
}
