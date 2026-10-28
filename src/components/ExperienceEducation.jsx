import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { LiquidMetalText } from 'motion-organic/react';
import { useTheme, LIQUID_METAL_PALETTE } from '../context/ThemeContext';
import { profileData } from '../data/profileData';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceEducation() {
  const containerRef = useRef(null);
  const { isDark } = useTheme();

  useGSAP(() => {
    const cards = containerRef.current.querySelectorAll('.ee-card, .metric-box');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="experience-education" ref={containerRef} style={{ padding: '120px 0', borderTop: '1px solid var(--line)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '56px' }}>
          <span className="section-badge">Background & Track Record</span>
          <h2>
            <LiquidMetalText
              key={`ee-${isDark ? 'dark' : 'light'}`}
              colors={isDark ? LIQUID_METAL_PALETTE.dark : LIQUID_METAL_PALETTE.light}
              speed={6}
            >
              Experience & Education
            </LiquidMetalText>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '10px', maxWidth: '640px', lineHeight: '1.6' }}>
            Professional journey across generative AI pipelines, distributed full-stack architectures, and algorithmic problem-solving.
          </p>
        </div>

        {/* 1. Work Experience Grid */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ marginBottom: '24px' }}>
            <span className="section-badge">Work Experience</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Job 1 */}
            <div className="ee-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--muted)' }}>June 2025 · 1 Month</span>
                <span className="ee-role-badge">INTERNSHIP</span>
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--fg)', margin: '4px 0 2px', letterSpacing: '-0.02em' }}>
                Generative AI Intern
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 500, marginBottom: '16px' }}>
                One Yes Technology Pvt. Ltd. · Chennai
              </p>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.65', marginBottom: '22px' }}>
                Engineered generative AI workflows, prompt optimization routines, and semantic vector embedding pipelines with Redis caching and REST API integrations.
              </p>
              <div className="project-tags" style={{ marginBottom: 0 }}>
                {['GPT-4', 'Python', 'Redis', 'REST APIs', 'Prompt Engineering', 'Semantic Embeddings'].map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>

            {/* Job 2 */}
            <div className="ee-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--muted)' }}>July 2024 · 1 Month</span>
                <span className="ee-role-badge">INTERNSHIP</span>
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--fg)', margin: '4px 0 2px', letterSpacing: '-0.02em' }}>
                Cybersecurity Intern
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 500, marginBottom: '16px' }}>
                Zero Touch Pvt. Ltd. · Chennai
              </p>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.65', marginBottom: '22px' }}>
                Assessed web attack surfaces against OWASP Top 10 vulnerabilities, performed threat modeling, vulnerability auditing, and incident response simulations.
              </p>
              <div className="project-tags" style={{ marginBottom: 0 }}>
                {['Python', 'OWASP Top 10', 'Threat Modeling', 'Vulnerability Assessment', 'Incident Response'].map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>

            {/* Job 3 */}
            <div className="ee-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--muted)' }}>2023 – Present</span>
                <span className="ee-role-badge">OPEN SOURCE</span>
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--fg)', margin: '4px 0 2px', letterSpacing: '-0.02em' }}>
                Full-Stack Developer
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 500, marginBottom: '16px' }}>
                Self-Directed & Systems Research
              </p>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.65', marginBottom: '22px' }}>
                Designing and shipping scalable full-stack applications, AI developer environments, and 3D web platforms across Next.js, Node.js, and PostgreSQL.
              </p>
              <div className="project-tags" style={{ marginBottom: 0 }}>
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'MySQL', 'Prisma', 'Docker', 'Three.js'].map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Education & Competitive Programming Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '64px' }}>
          {/* Education Column */}
          <div>
            <span className="section-badge">Academic Education</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '16px' }}>
              <div className="ee-card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--muted)' }}>2023 – 2027 (Expected)</span>
                  <span className="ee-role-badge" style={{ fontWeight: 600, color: 'var(--fg)' }}>
                    CGPA: 7.50 / 10
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--fg)', margin: '4px 0 4px', letterSpacing: '-0.02em' }}>
                  B.E. Computer Science and Engineering
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
                  K.S.R. College of Engineering · Anna University
                </p>
              </div>

              <div className="ee-card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--muted)' }}>2023 Completion</span>
                  <span className="ee-role-badge" style={{ fontWeight: 600, color: 'var(--fg)' }}>
                    HSC: 70%
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--fg)', margin: '4px 0 4px', letterSpacing: '-0.02em' }}>
                  Higher Secondary Certificate (HSC)
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
                  Saru Matric Higher Secondary School
                </p>
              </div>
            </div>
          </div>

          {/* Competitive Programming Column */}
          <div>
            <span className="section-badge">Algorithmic Problem-Solving</span>
            <div className="ee-card" style={{ padding: '28px', marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--muted)' }}>LeetCode & Java DSA</span>
                <a
                  href="https://github.com/cheralathan05/leetcode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn"
                  style={{ padding: '6px 14px', fontSize: '11px' }}
                >
                  View LeetCode Repo ↗
                </a>
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--fg)', margin: '4px 0 10px', letterSpacing: '-0.02em' }}>
                200+ Problems Solved in Java
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.65', marginBottom: '18px' }}>
                Active algorithmic mastery across core computer science patterns with optimal time and space complexity:
              </p>
              <div className="project-tags" style={{ marginBottom: 0 }}>
                {[
                  'Dynamic Programming',
                  'Binary Trees & BST',
                  'Graph Algorithms',
                  'BFS & DFS',
                  "Dijkstra's Shortest Path",
                  'Two Pointers',
                  'Sliding Window'
                ].map((topic) => (
                  <span className="tag" key={topic}>{topic}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. GitHub & Platform Live Metrics */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <span className="section-badge">Engineering & Codebase Metrics</span>
          </div>
          <div className="metrics-grid">
            <div className="metric-box">
              <div className="number">200+</div>
              <div className="label">LeetCode Problems Solved</div>
            </div>
            <div className="metric-box">
              <div className="number">31</div>
              <div className="label">Public GitHub Repositories</div>
            </div>
            <div className="metric-box">
              <div className="number">422+</div>
              <div className="label">2026 Production Commits</div>
            </div>
            <div className="metric-box">
              <div className="number">45 Days</div>
              <div className="label">Longest Continuous Streak</div>
            </div>
            <div className="metric-box">
              <div className="number">12+</div>
              <div className="label">GitHub Stars Earned</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
