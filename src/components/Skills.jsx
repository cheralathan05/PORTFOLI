import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { LiquidMetalText } from 'motion-organic/react';
import { useTheme, LIQUID_METAL_PALETTE } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const containerRef = useRef(null);
  const { isDark } = useTheme();

  useGSAP(() => {
    const rows = containerRef.current.querySelectorAll('.skill-row');
    rows.forEach(row => {
      gsap.to(row, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef}>
      <div className="container">
        <div className="skills-header">
          <h2>
            <LiquidMetalText
              key={isDark ? 'dark' : 'light'}
              colors={isDark ? LIQUID_METAL_PALETTE.dark : LIQUID_METAL_PALETTE.light}
              speed={6}
            >
              System Architecture
            </LiquidMetalText>
          </h2>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", color: '#ab3503f1' }}>
            // The stack that powers the singularity
          </p>
        </div>
        <div className="skills-grid">
          <div>
            <div className="skill-row">
              <h3>Frontend</h3>
              <p>React.js / Next.js / Vite / Tailwind</p>
            </div>
            <div className="skill-row meow">
              <h3>Backend</h3>
              <p>Node.js / Express / NestJS / Spring Boot</p>
            </div>
            <div className="skill-row">
              <h3>Databases</h3>
              <p>PostgreSQL / MySQL / MongoDB / Redis</p>
            </div>
          </div>
          <div>
            <div className="skill-row">
              <h3>AI & ML</h3>
              <p>Generative AI / GPT-4 / Ollama / PyTorch</p>
            </div>
            <div className="skill-row meow">
              <h3>Languages</h3>
              <p>Java / TypeScript / Python / SQL</p>
            </div>
            <div className="skill-row">
              <h3>3D & Realtime</h3>
              <p>Three.js / WebSockets / Docker / Git</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
