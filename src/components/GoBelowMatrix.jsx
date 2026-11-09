import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

// Exact 7-row / 5-col dot-matrix pixel font matching the user's reference image
const GLYPHS = {
  'G': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  'o': [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  'B': [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  'e': [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [0, 1, 1, 0],
  ],
  'l': [
    [1, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
  ],
  'w': [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [0, 1, 0, 1, 0],
  ],
  't': [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  'E': [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  'x': [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  'p': [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0] // descender
  ],
  'r': [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  ' ': [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]
};

export default function GoBelowMatrix() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let time = 0;
    let isVisible = false;
    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth <= 768;

    // Build the 2D bit array for "Go Below to Explore"
    const text = "Go Below to Explore";
    let textBitCols = [];

    for (let charIndex = 0; charIndex < text.length; charIndex++) {
      const ch = text[charIndex];
      const glyph = GLYPHS[ch] || GLYPHS[' '];
      const glyphRows = glyph.length;
      const glyphCols = glyph[0].length;

      for (let c = 0; c < glyphCols; c++) {
        let colBits = [];
        for (let r = 0; r < 9; r++) {
          if (r < glyphRows) {
            colBits.push(glyph[r][c] || 0);
          } else {
            colBits.push(0);
          }
        }
        textBitCols.push(colBits);
      }

      // 1 dot gap between letters (unless space)
      if (ch !== ' ' && charIndex < text.length - 1 && text[charIndex + 1] !== ' ') {
        textBitCols.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }
    }

    const totalTextCols = textBitCols.length;

    // Cached layout values & Offscreen background canvas for ultra-high FPS
    let displayWidth = 0;
    let displayHeight = 0;
    let dotPitch = 0;
    let cols = 0;
    let totalRows = 0;
    let dotSize = 0;
    let startCol = 0;
    let startRow = 0;

    let offscreenBg = document.createElement('canvas');
    let offscreenCtx = offscreenBg.getContext('2d');
    let cachedTheme = null;

    const buildBackgroundGrid = (isCurrentDark, dpr) => {
      offscreenBg.width = displayWidth * dpr;
      offscreenBg.height = displayHeight * dpr;
      offscreenCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fill canvas background
      offscreenCtx.fillStyle = isCurrentDark ? '#000000' : '#ffffff';
      offscreenCtx.fillRect(0, 0, displayWidth, displayHeight);

      // Draw all unlit diodes once to offscreen cache
      offscreenCtx.shadowBlur = 0;
      for (let r = 0; r < totalRows; r++) {
        for (let c = 0; c < cols; c++) {
          const textColIdx = c - startCol;
          const textRowIdx = r - startRow;
          const isLit = textColIdx >= 0 && textColIdx < totalTextCols && textRowIdx >= 0 && textRowIdx < 9 && textBitCols[textColIdx][textRowIdx] === 1;
          if (isLit) continue;

          const x = c * dotPitch + (dotPitch - dotSize) / 2;
          const y = r * dotPitch + (dotPitch - dotSize) / 2;

          offscreenCtx.fillStyle = isCurrentDark ? 'rgba(255, 255, 255, 0.038)' : 'rgba(0, 0, 0, 0.04)';
          offscreenCtx.beginPath();
          offscreenCtx.roundRect(x, y, dotSize, dotSize, 1.5);
          offscreenCtx.fill();

          offscreenCtx.strokeStyle = isCurrentDark ? 'rgba(0, 0, 0, 0.55)' : 'rgba(0, 0, 0, 0.08)';
          offscreenCtx.lineWidth = 1;
          offscreenCtx.stroke();
        }
      }
      cachedTheme = isCurrentDark;
    };

    const handleResize = () => {
      displayWidth = window.innerWidth || document.documentElement.clientWidth || 1200;
      displayHeight = Math.min(175, Math.max(130, Math.round(displayWidth * 0.11)));

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dotPitch = displayHeight / 13;
      cols = Math.floor(displayWidth / dotPitch);
      if (cols < totalTextCols + 6) {
        dotPitch = displayWidth / (totalTextCols + 6);
        cols = Math.floor(displayWidth / dotPitch);
      }
      totalRows = Math.max(13, Math.floor(displayHeight / dotPitch));
      dotSize = Math.max(3.2, Math.round(dotPitch * 0.72));
      startCol = Math.max(1, Math.floor((cols - totalTextCols) / 2));
      startRow = Math.max(1, Math.floor((totalRows - 8) / 2));

      buildBackgroundGrid(isDarkRef.current, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Pointer tracking
    const updatePointerPos = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const onMouseMove = (e) => updatePointerPos(e.clientX, e.clientY);
    const onMouseLeave = () => { mousePosRef.current = { x: -1000, y: -1000 }; };
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => { mousePosRef.current = { x: -1000, y: -1000 }; };

    canvas.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', onMouseLeave, { passive: true });
    canvas.addEventListener('touchstart', onTouchMove, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd, { passive: true });

    // High performance render loop
    let lastRenderTime = 0;
    const render = (now) => {
      if (!isVisible) { animationFrameId = 0; return; }

      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;
      const hasMouseNearby = mx > -500 && my > -500;

      // Throttle idle phosphor flicker to 30fps when mouse is not hovering to conserve CPU/battery
      if (!hasMouseNearby && now && (now - lastRenderTime < 33)) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastRenderTime = now;

      time += 0.035;
      const isCurrentDark = isDarkRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      // Rebuild cached offscreen background if theme switched
      if (cachedTheme !== isCurrentDark) {
        buildBackgroundGrid(isCurrentDark, dpr);
      }

      // Blit entire pre-rendered unlit matrix background in 1 call (instant GPU copy)
      ctx.drawImage(offscreenBg, 0, 0, displayWidth, displayHeight);

      // Draw lit text LED diodes with zero CPU shadowBlur (handled via hardware CSS drop-shadow)
      ctx.shadowBlur = 0;
      for (let textColIdx = 0; textColIdx < totalTextCols; textColIdx++) {
        const c = startCol + textColIdx;
        const colBits = textBitCols[textColIdx];
        const x = c * dotPitch + (dotPitch - dotSize) / 2;

        for (let textRowIdx = 0; textRowIdx < 9; textRowIdx++) {
          if (colBits[textRowIdx] !== 1) continue;
          const r = startRow + textRowIdx;
          const y = r * dotPitch + (dotPitch - dotSize) / 2;

          let mouseBoost = 0;
          if (hasMouseNearby) {
            const dx = x + dotSize / 2 - mx;
            const dy = y + dotSize / 2 - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            mouseBoost = dist < 120 ? Math.max(0, 1 - dist / 120) : 0;
          }

          const flicker = Math.sin(time * 2 + c * 0.35 + r * 0.2) * (isCurrentDark ? 0.06 : 0.04);
          const alpha = Math.min(1, Math.max(isCurrentDark ? 0.85 : 0.9, (isCurrentDark ? 0.94 : 0.96) + flicker + mouseBoost * (isCurrentDark ? 0.2 : 0.15)));

          // Diode base (crisp GPU rasterization)
          ctx.fillStyle = isCurrentDark ? `rgba(34, 197, 94, ${alpha})` : `rgba(22, 163, 74, ${alpha})`;
          ctx.beginPath();
          ctx.roundRect(x, y, dotSize, dotSize, 2);
          ctx.fill();

          // Inner highlight
          ctx.fillStyle = isCurrentDark ? `rgba(134, 239, 172, ${alpha * 0.92})` : `rgba(34, 197, 94, ${alpha * 0.95})`;
          ctx.beginPath();
          ctx.roundRect(
            x + dotSize * 0.2,
            y + dotSize * 0.2,
            dotSize * 0.6,
            dotSize * 0.6,
            1.5
          );
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver — runs only when visible
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    }, { threshold: 0.05 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchstart', onTouchMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollDown = () => {
    const target =
      document.getElementById('experience-education') ||
      document.getElementById('featured-work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="led-matrix-wrapper full-bleed"
      onClick={handleScrollDown}
      role="button"
      tabIndex={0}
      title="Click to explore Work Experience below"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleScrollDown();
        }
      }}
    >
      {/* Industrial Chassis spanning left end to right end */}
      <div className="led-matrix-chassis">
        {/* Top Hardware Header */}
        <div className="led-matrix-header mono">
          <div className="led-matrix-meta-left">
            <span className="led-power-dot" />
            <span>LED MATRIX BUS // [ GREEN PHOSPHOR ]</span>
          </div>
          <div className="led-matrix-meta-right">
            <span>TRANSIT DISPLAY 60HZ</span>
            <span className="led-scroll-hint">[ CLICK TO SCROLL ↓ ]</span>
          </div>
        </div>

        {/* Display Screen */}
        <div className="led-screen-container">
          <canvas ref={canvasRef} className="led-matrix-canvas" />
          {/* Glass Scanline & Specular Vignette Overlay */}
          <div className="led-glass-glare" />
        </div>

        {/* Bottom Hardware Sub-Bar */}
        <div className="led-matrix-footer mono">
          <div className="led-matrix-footer-left">
            <span>SYS.STATUS: OPERATIONAL</span>
          </div>
          <div className="led-matrix-footer-arrow">
            <span className="bouncing-arrow">↓</span>
            <span>SCROLL TO EXPLORE SELECTED WORKS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
