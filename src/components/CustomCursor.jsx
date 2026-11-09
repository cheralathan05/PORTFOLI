import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    // Skip entirely on touch / mobile devices — cursor is hidden via CSS anyway
    if (typeof window === 'undefined') return;
    if (window.innerWidth <= 768 || window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cc = canvasRef.current;
    if (!cc) return;
    const cctx = cc.getContext('2d', { alpha: true });
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ps = [];
    let animationFrameId = 0;
    let isPageVisible = true;
    let isRunning = false;
    let lastMouseMoveTime = performance.now();
    let width = window.innerWidth;
    let height = window.innerHeight;
    const MAX_PARTICLES = 40; // Cap particle count to avoid GC pressure

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap DPR for perf
      cc.width = width * dpr;
      cc.height = height * dpr;
      cc.style.width = `${width}px`;
      cc.style.height = `${height}px`;
      cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawStaticCursor();
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    class P {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.size = Math.random() * 1.9 + 0.2;
      }
      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const d = Math.hypot(dx, dy);
        if (d < 170) {
          const f = (140 - d) / 140;
          this.vx += (dx / d) * f * 0.3;
          this.vy += (dy / d) * f * 0.3;
        }
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.life -= 0.0225;
      }
    }

    const drawStaticCursor = () => {
      cctx.clearRect(0, 0, width, height);
      const darkActive = document.documentElement.getAttribute('data-theme') === 'dark';
      const coreColor = darkActive ? 'rgba(242,240,235,0.9)' : 'rgba(255,255,255,0.9)';
      const innerColor = darkActive ? 'rgba(10,10,11,1)' : 'rgba(14,14,15,1)';
      const strokeColor = darkActive ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)';

      // Core
      cctx.fillStyle = coreColor;
      cctx.beginPath();
      cctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
      cctx.fill();

      cctx.fillStyle = innerColor;
      cctx.beginPath();
      cctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      cctx.fill();

      cctx.strokeStyle = strokeColor;
      cctx.lineWidth = 1.5;
      cctx.beginPath();
      cctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
      cctx.stroke();
    };

    const animC = () => {
      if (!isPageVisible) { isRunning = false; animationFrameId = 0; return; }

      cctx.clearRect(0, 0, width, height);
      const darkActive = document.documentElement.getAttribute('data-theme') === 'dark';
      const coreColor = darkActive ? 'rgba(242,240,235,0.9)' : 'rgba(255,255,255,0.9)';
      const innerColor = darkActive ? 'rgba(10,10,11,1)' : 'rgba(14,14,15,1)';
      const strokeColor = darkActive ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)';

      // Core
      cctx.fillStyle = coreColor;
      cctx.beginPath();
      cctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
      cctx.fill();

      cctx.fillStyle = innerColor;
      cctx.beginPath();
      cctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      cctx.fill();

      cctx.strokeStyle = strokeColor;
      cctx.lineWidth = 1.5;
      cctx.beginPath();
      cctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
      cctx.stroke();

      // Particles
      const pColor = darkActive ? '242,240,235' : '14,14,15';
      for (let i = ps.length - 1; i >= 0; i--) {
        ps[i].update();
        if (ps[i].life <= 0) { ps.splice(i, 1); continue; }
        cctx.fillStyle = `rgba(${pColor},${ps[i].life})`;
        cctx.beginPath();
        cctx.arc(ps[i].x, ps[i].y, ps[i].size, 0, Math.PI * 2);
        cctx.fill();
      }

      // If all particles faded and mouse hasn't moved for 150ms, stop RAF loop to save 100% CPU/GPU!
      if (ps.length === 0 && (performance.now() - lastMouseMoveTime > 150)) {
        isRunning = false;
        animationFrameId = 0;
        return;
      }

      animationFrameId = requestAnimationFrame(animC);
    };

    const startAnim = () => {
      if (!isRunning && isPageVisible) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(animC);
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMouseMoveTime = performance.now();
      if (ps.length < MAX_PARTICLES) {
        for (let i = 0; i < 2; i++) {
          ps.push(new P(mouse.x + (Math.random() - 0.5) * 40, mouse.y + (Math.random() - 0.5) * 40));
        }
      }
      startAnim();
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Pause when tab is hidden, wake up when visible
    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        drawStaticCursor();
      } else {
        isRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    drawStaticCursor();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="cursor-canvas" ref={canvasRef} />;
}
