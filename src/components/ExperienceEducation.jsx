import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { LiquidMetalText } from 'motion-organic/react';
import { useTheme, LIQUID_METAL_PALETTE } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

// Work Experience Dataset with rich impact points and tech taxonomy
const WORK_EXPERIENCES = [
  {
    id: 'gen-ai',
    number: '01',
    role: 'Generative AI Intern',
    company: 'One Yes Technology Pvt. Ltd.',
    location: 'Chennai, India',
    period: 'June 2025 · 1 Month',
    badge: 'INTERNSHIP',
    type: 'ai',
    summary: 'Engineered generative AI workflows, prompt optimization routines, and semantic vector embedding pipelines.',
    impact: [
      'Architected semantic vector retrieval pipelines with Redis caching to slash OpenAI API latency by 40%.',
      'Engineered automated prompt evaluation benchmarks and token optimization routines for GPT-4.',
      'Constructed production-grade REST API integrations linking LLM inference endpoints to frontend client UI.'
    ],
    skills: ['GPT-4', 'Python', 'Redis', 'REST APIs', 'Prompt Engineering', 'Vector Embeddings', 'LangChain', 'OpenAI API']
  },
  {
    id: 'cybersec',
    number: '02',
    role: 'Cybersecurity Intern',
    company: 'Zero Touch Pvt. Ltd.',
    location: 'Chennai, India',
    period: 'July 2024 · 1 Month',
    badge: 'INTERNSHIP',
    type: 'security',
    summary: 'Assessed web attack surfaces against OWASP Top 10 vulnerabilities, performed threat modeling and incident response simulations.',
    impact: [
      'Executed systematic security assessments across web application surfaces targeting OWASP Top 10 vulnerabilities.',
      'Conducted threat modeling, vulnerability auditing, automated penetration testing scripts, and simulated attack vectors.',
      'Formulated comprehensive technical remediation reports delivered directly to senior engineering leadership.'
    ],
    skills: ['Python', 'OWASP Top 10', 'Threat Modeling', 'Vulnerability Assessment', 'Burp Suite', 'Incident Response', 'Network Security']
  },
  {
    id: 'fullstack-dev',
    number: '03',
    role: 'Full-Stack Developer',
    company: 'Self-Directed & Systems Research',
    location: 'Autonomous / Remote',
    period: '2023 – Present',
    badge: 'ACTIVE / OPEN SOURCE',
    type: 'systems',
    summary: 'Designing and shipping scalable full-stack applications, AI developer environments, and 3D web platforms.',
    impact: [
      'Engineered high-concurrency full-stack architectures utilizing Next.js, Node.js, Spring Boot, and PostgreSQL.',
      'Authored 31+ public GitHub repositories with 420+ production commits adhering to clean domain-driven architecture.',
      'Built interactive 3D web experiences with Three.js graphics, custom GSAP particle physics, and WebSocket streaming.'
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Spring Boot', 'PostgreSQL', 'Docker', 'Three.js', 'TailwindCSS', 'Redis']
  }
];

export default function ExperienceEducation() {
  const containerRef = useRef(null);
  const { isDark } = useTheme();

  const handleSpotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  useGSAP(() => {
    // Staggered perspective reveal for all experience cards
    const cards = containerRef.current.querySelectorAll('.ee-spotlight-card');
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          delay: (index % 3) * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animate timeline connected pulse line
    gsap.fromTo(
      '.ee-timeline-rail-fill',
      { height: '0%' },
      {
        height: '100%',
        duration: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '#work-timeline-container',
          start: 'top 80%',
          end: 'bottom 80%',
          scrub: 0.8
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="experience-education" ref={containerRef} className="ee-section">
      <div className="container">
        {/* Section Header */}
        <div className="ee-header-wrap">
          <div className="ee-header-meta">
            <span className="section-badge">
              <span className="ee-pulse-dot" />
              BACKGROUND & TRACK RECORD
            </span>
            <span className="ee-header-tag mono">VERIFIED MILESTONES // 2023 - 2026</span>
          </div>

          <div className="ee-header-main">
            <h2>
              <LiquidMetalText
                key={`ee-${isDark ? 'dark' : 'light'}`}
                colors={isDark ? LIQUID_METAL_PALETTE.dark : LIQUID_METAL_PALETTE.light}
                speed={6}
              >
                Work Experience
              </LiquidMetalText>
            </h2>

            <p className="ee-header-desc">
              Engineering journey spanning generative AI workflows, distributed full-stack platforms,
              and cybersecurity defense simulations.
            </p>
          </div>
        </div>

        {/* 1. WORK EXPERIENCE (Cyber-Timeline Rail) */}
        <div id="work-timeline-container" className="ee-timeline-block">
          <div className="ee-block-header">
            <div className="ee-block-title-wrap">
              <span className="section-badge">Work Experience & Research</span>
              <span className="ee-block-counter mono">03 ROLES // ENTERPRISE & OPEN SOURCE</span>
            </div>
            <div className="ee-timeline-live-tag mono">
              <span className="ee-live-indicator" />
              <span>SYSTEM STATUS: PRODUCTION READY</span>
            </div>
          </div>

          <div className="ee-timeline-track">
            {/* The Connected Optical Rail Line */}
            <div className="ee-timeline-rail">
              <div className="ee-timeline-rail-fill" />
            </div>

            <div className="ee-cards-grid">
              {WORK_EXPERIENCES.map((exp) => (
                <div
                  key={exp.id}
                  className={`ee-spotlight-card spotlight-card ee-type-${exp.type}`}
                  onMouseMove={handleSpotlight}
                >
                  {/* Card Corner Index */}
                  <div className="ee-card-top">
                    <div className="ee-card-meta-left">
                      <span className="ee-card-num mono">{exp.number}</span>
                      <span className="ee-card-period mono">{exp.period}</span>
                    </div>

                    <span className={`ee-role-badge badge-${exp.type} mono`}>
                      <span className="badge-dot" />
                      {exp.badge}
                    </span>
                  </div>

                  {/* Role & Company Header */}
                  <div className="ee-card-title-area">
                    <h3 className="ee-role-title">{exp.role}</h3>
                    <div className="ee-company-row">
                      <span className="ee-company-name">{exp.company}</span>
                      <span className="ee-company-dot">·</span>
                      <span className="ee-company-loc mono">{exp.location}</span>
                    </div>
                  </div>

                  {/* Impact Summary Points */}
                  <div className="ee-impact-list">
                    {exp.impact.map((point, i) => (
                      <div key={i} className="ee-impact-item">
                        <span className="ee-bullet-icon">✦</span>
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Taxonomy Chips */}
                  <div className="ee-tags-wrap">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="ee-tech-pill mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
