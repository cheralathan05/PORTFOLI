import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { profileData } from '../data/profileData';
import { VariablePhysicsText } from 'motion-organic/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Hero Entry Animation
    gsap.from('#hero h1', {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out'
    });

    gsap.from('.hero-meta', {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out'
    });

    // Tech Boxes In/Out scrub
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      onEnter: () =>
        gsap.to('.tech-box', {
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out'
        }),
      onLeaveBack: () =>
        gsap.to('.tech-box', {
          y: 50,
          duration: 0.4,
          stagger: 0.2,
          ease: 'power3.out'
        }),
      onEnterBack: () =>
        gsap.to('.tech-box', {
          y: -50,
          duration: 0.5,
          stagger: 0.2,
          ease: 'power3.out'
        }),
      onLeave: () =>
        gsap.to('.tech-box', {
          y: -50,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.in'
        })
    });
  }, { scope: containerRef });

  return (
    <section id="hero" ref={containerRef}>
      <div className="tech-box tb-tl">
        <h4>React & Next.js</h4>
        <p>// Web Front-end</p>
      </div>
      <div className="tech-box tb-tr">
        <h4>Node.js & Python</h4>
        <p>// Backend & GenAI</p>
      </div>
      <div className="tech-box tb-br">
        <h4>Postgres & Redis</h4>
        <p>// Systems & Data</p>
      </div>
      <div className="hero-content">
        <div className="hero-badge-wrap">
          <span className="section-badge hero-status-pill">
            <span className="status-dot-active" />
            CHERALATHAN B.N · SYSTEMS & AI ARCHITECT
          </span>
        </div>
        <h1>
          {profileData.rolePrefix} <br />
          <span className="italic mo-liquid-sheen">{profileData.roleHighlight}</span>
        </h1>
      </div>
      <div className="hero-meta">
        <span>{profileData.location}</span>
        <VariablePhysicsText color="var(--muted)" minWeight={300} maxWeight={700} continuousWave={true}>
          SCROLL TO EXPLORE [↓]
        </VariablePhysicsText>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span className="status-dot-active" />
          {profileData.status}
        </span>
      </div>
    </section>
  );
}
