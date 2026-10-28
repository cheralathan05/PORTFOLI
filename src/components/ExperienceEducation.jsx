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
        <div style={{ marginBottom: '50px' }}>
          <span className="section-badge">// PROFESSIONAL BACKGROUND & TELEMETRY</span>
          <h2>
            <LiquidMetalText
              key={`ee-${isDark ? 'dark' : 'light'}`}
              colors={isDark ? LIQUID_METAL_PALETTE.dark : LIQUID_METAL_PALETTE.light}
              speed={6}
            >
              Experience & Education
            </LiquidMetalText>
          </h2>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--muted)', fontSize: '13px', marginTop: '10px' }}>
            // Track record in AI systems, full-stack engineering, and algorithmic problem-solving
          </p>
        </div>

        {/* 1. Work Experience Grid */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <span className="section-badge" style={{ marginBottom: 0 }}>// WORK EXPERIENCE</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Job 1 */}
            <div className="ee-card meta-card" style={{ padding: '28px', borderLeft: '3px solid var(--bh-red)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <h5 style={{ margin: 0 }}>June 2025 · 1 Month</h5>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--muted)' }}>INTERNSHIP</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--fg)', margin: '6px 0 2px' }}>Generative AI Intern</h3>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', color: 'var(--bh-red)', fontWeight: 600, marginBottom: '14px' }}>
                One Yes Technology Pvt. Ltd.
              </p>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '18px' }}>
                Engineered generative AI workflows, prompt optimization routines, and semantic vector embedding pipelines with Redis caching and REST API integrations.
              </p>
              <div className="project-tags" style={{ marginBottom: 0 }}>
                {['GPT-4', 'Python', 'Redis', 'REST APIs', 'Prompt Engineering', 'Semantic Embeddings'].map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>

            {/* Job 2 */}
            <div className="ee-card meta-card" style={{ padding: '28px', borderLeft: '3px solid #6366f1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <h5 style={{ margin: 0 }}>July 2024 · 1 Month</h5>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--muted)' }}>INTERNSHIP</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--fg)', margin: '6px 0 2px' }}>Cybersecurity Intern</h3>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', color: '#6366f1', fontWeight: 600, marginBottom: '14px' }}>
                Zero Touch Pvt. Ltd.
              </p>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '18px' }}>
                Assessed web attack surfaces against OWASP Top 10 vulnerabilities, performed threat modeling, vulnerability auditing, and incident response simulations.
              </p>
              <div className="project-tags" style={{ marginBottom: 0 }}>
                {['Python', 'OWASP Top 10', 'Threat Modeling', 'Vulnerability Assessment', 'Incident Response'].map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>

            {/* Job 3 */}
            <div className="ee-card meta-card" style={{ padding: '28px', borderLeft: '3px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <h5 style={{ margin: 0 }}>2023 – Present</h5>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--muted)' }}>SELF-DIRECTED / OPEN SOURCE</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--fg)', margin: '6px 0 2px' }}>Full-Stack Developer</h3>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', color: '#10b981', fontWeight: 600, marginBottom: '14px' }}>
                Self-Directed & Open Source
              </p>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '18px' }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '60px' }}>
          {/* Education Column */}
          <div>
            <span className="section-badge">// ACADEMIC EDUCATION</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '16px' }}>
              <div className="ee-card meta-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h5>2023 – 2027 (Expected)</h5>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--bh-red)', fontWeight: 700 }}>
                    CGPA: 7.50 / 10
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--fg)', margin: '6px 0 2px' }}>
                  B.E. Computer Science and Engineering
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
                  K.S.R. College of Engineering
                </p>
              </div>

              <div className="ee-card meta-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h5>2023 Completion</h5>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--bh-red)', fontWeight: 700 }}>
                    HSC: 70%
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--fg)', margin: '6px 0 2px' }}>
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
            <span className="section-badge">// COMPETITIVE PROGRAMMING (JAVA DSA)</span>
            <div className="ee-card meta-card" style={{ padding: '24px', marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <h5>LeetCode Profile</h5>
                <a
                  href="https://github.com/cheralathan05/leetcode"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--bh-red)', textDecoration: 'none' }}
                >
                  View Repo ↗
                </a>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--fg)', margin: '4px 0 10px' }}>
                200+ Problems Solved in Java
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '14px' }}>
                Active practice tackling core algorithmic patterns with optimal time and space complexity:
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
          <span className="section-badge" style={{ marginBottom: '16px' }}>// GITHUB & CODEBASE METRICS</span>
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
              <div className="label">2026 Git Commits</div>
            </div>
            <div className="metric-box">
              <div className="number">45 Days</div>
              <div className="label">Longest Contribution Streak</div>
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
