import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { profileData } from '../data/profileData';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined') {
  window.ScrollTrigger = ScrollTrigger;
}

function LiquidLensText({ text }) {
  const containerRef = useRef(null);
  const bubbleRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e) => {
    if (!containerRef.current || !bubbleRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    bubbleRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(1)`;
  };

  return (
    <span
      ref={containerRef}
      className="mo-liquid-refraction-container"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
    >
      <span className="mo-refraction-text-content">{text}</span>
      <span
        ref={bubbleRef}
        className={`mo-liquid-lens-bubble ${isHovered ? 'active' : ''}`}
        aria-hidden="true"
      />
    </span>
  );
}

export default function MorphSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const section = containerRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // 1. Desktop / Laptop (width >= 769px) - 100% UNTOUCHED ORIGINAL BEHAVIOR
    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        '#dev-image',
        {
          scale: 0.88,
          opacity: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        },
        0
      );

      tl.fromTo(
        '#dev-text',
        {
          opacity: 0,
          scale: 0.85,
        },
        {
          opacity: 1,
          scale: 1.2,
          duration: 1.5,
          ease: 'power1.inOut',
        },
        0
      );

      tl.to({}, { duration: 0.6 });

      return () => {
        tl.kill();
      };
    });

    // 2. Mobile View (width <= 768px) - Pinned firmly, completes name, dissolves away cleanly with zero trailing gap
    mm.add('(max-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=90%',
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Cross-fade morph blend (photo dissolves out, name dissolves in)
      tl.to(
        '#dev-image',
        {
          scale: 0.88,
          opacity: 0,
          duration: 0.9,
          ease: 'power1.inOut',
        },
        0
      );

      tl.fromTo(
        '#dev-text',
        {
          opacity: 0,
          scale: 0.85,
        },
        {
          opacity: 1,
          scale: 1.08,
          duration: 0.9,
          ease: 'power1.inOut',
        },
        0
      );

      // Phase 2: Hold phase so the complete name is clearly readable
      tl.to({}, { duration: 0.35 });

      // Phase 3: Exit dissolve - after animation, the name dissolves out completely (is gone!)
      tl.to(
        '#dev-text',
        {
          opacity: 0,
          scale: 1.12,
          duration: 0.65,
          ease: 'power1.inOut',
        }
      );

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, { scope: containerRef });

  return (
    <section id="morph-section" ref={containerRef}>
      <div className="morph-wrapper">
        <img src={profileData.morphImage} id="dev-image" alt={profileData.name} />
        <h2 id="dev-text">
          <LiquidLensText text={profileData.name} />
        </h2>
      </div>
    </section>
  );
}
