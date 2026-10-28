import React from 'react';

export default function Marquee() {
  const items = [
    'REACT', 'NEXT.JS', 'NODE.JS', 'TYPESCRIPT', 'PYTHON', 'JAVA', 'POSTGRESQL', 'GENERATIVE AI',
    'THREE.JS', 'DOCKER', 'SPRING BOOT', 'REDIS', 'MONGODB', 'TAILWIND CSS', 'FASTAPI', 'GSAP'
  ];

  return (
    <div className="marquee">
      <div className="marquee-content">
        {items.map((tech, idx) => (
          <span key={idx}>{tech}</span>
        ))}
        {items.map((tech, idx) => (
          <span key={`dup-${idx}`}>{tech}</span>
        ))}
      </div>
    </div>
  );
}
