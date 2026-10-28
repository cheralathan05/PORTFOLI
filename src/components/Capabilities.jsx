import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Capabilities() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const items = containerRef.current.querySelectorAll('.cap-item');
    items.forEach(item => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section id="capabilities" ref={containerRef}>
      <div className="container">
        <div className="caps-grid">
          <div className="cap-item">
            <h4>// 01. Full-Stack Engineering</h4>
            <h3>Scalable Web Systems</h3>
            <p>
              Engineering robust full-stack platforms using React, Next.js, Node.js, and Spring Boot with TypeScript and clean modular boundaries.
            </p>
          </div>
          <div className="cap-item">
            <h4>// 02. Generative AI & ML</h4>
            <h3>Intelligent Automations</h3>
            <p>
              Integrating GPT-4, OpenAI APIs, prompt engineering, semantic vector embeddings, and local Ollama LLMs into seamless automated pipelines.
            </p>
          </div>
          <div className="cap-item">
            <h4>// 03. High Performance & 3D</h4>
            <h3>Real-Time & Algorithms</h3>
            <p>
              Solving complex data structures with 200+ LeetCode problems, WebSockets, Three.js 3D graphics, and high-concurrency database architectures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
