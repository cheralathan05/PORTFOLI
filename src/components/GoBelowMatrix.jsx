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

    const totalTextCols = textBitCols.length; // ~77 columns

    // Resize Handler: Spans 100vw from left end to right end!
    const handleResize = () => {
      const displayWidth = window.innerWidth || document.documentElement.clientWidth || 1200;
      // Height between 140px and 175px depending on width
      const displayHeight = Math.min(175, Math.max(130, Math.round(displayWidth * 0.11)));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse & Touch tracking for interactive phosphor illumination wave
    const updatePointerPos = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const onMouseMove = (e) => {
      updatePointerPos(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      mousePosRef.current = { x: -1000, y: -1000 };
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      mousePosRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchstart', onTouchMove, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd, { passive: true });

    // Render loop
    const render = () => {
      time += 0.035;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      const isCurrentDark = isDarkRef.current;

      // Fill canvas background based on current theme: pure #000000 in dark, pure #ffffff in light
      ctx.fillStyle = isCurrentDark ? '#000000' : '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Target 13 rows vertically by default on desktop
      let dotPitch = height / 13;
      let cols = Math.floor(width / dotPitch);

      // Ensure all text fits with zero cutoff on mobile screens
      if (cols < totalTextCols + 6) {
        dotPitch = width / (totalTextCols + 6);
        cols = Math.floor(width / dotPitch);
      }

      // Compute total rows based on dotPitch so full canvas height is populated with LEDs
      const totalRows = Math.max(13, Math.floor(height / dotPitch));
      const dotSize = Math.max(3.2, Math.round(dotPitch * 0.72));

      // Symmetrically center text columns and rows in the middle of the left-to-right matrix
      const startCol = Math.max(1, Math.floor((cols - totalTextCols) / 2));
      const startRow = Math.max(1, Math.floor((totalRows - 8) / 2));

      // Draw all LEDs across the entire screen from left end to right end
      for (let r = 0; r < totalRows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * dotPitch + (dotPitch - dotSize) / 2;
          const y = r * dotPitch + (dotPitch - dotSize) / 2;

          let isLit = false;
          const textColIdx = c - startCol;
          const textRowIdx = r - startRow;

          if (
            textColIdx >= 0 &&
            textColIdx < totalTextCols &&
            textRowIdx >= 0 &&
            textRowIdx < 9
          ) {
            isLit = textBitCols[textColIdx][textRowIdx] === 1;
          }

          // Distance to mouse for interactive hover wave
          const dx = x + dotSize / 2 - mousePosRef.current.x;
          const dy = y + dotSize / 2 - mousePosRef.current.y;
          const dist = Math.hypot(dx, dy);
          const mouseBoost = Math.max(0, 1 - dist / 120);

          if (isLit) {
            if (isCurrentDark) {
              // Dark Mode: Vivid Phosphor Green LED (#22c55e)
              const flicker = Math.sin(time * 2 + c * 0.35 + r * 0.2) * 0.06;
              const alpha = Math.min(1, Math.max(0.85, 0.94 + flicker + mouseBoost * 0.2));

              // Outer LED Bloom
              ctx.shadowColor = 'rgba(34, 197, 94, 0.85)';
              ctx.shadowBlur = 8 + mouseBoost * 8;

              // Diode base
              ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`;
              ctx.beginPath();
              ctx.roundRect(x, y, dotSize, dotSize, 2);
              ctx.fill();

              // Inner high-intensity specular diode highlight
              ctx.shadowBlur = 0;
              ctx.fillStyle = `rgba(134, 239, 172, ${alpha * 0.92})`;
              ctx.beginPath();
              ctx.roundRect(
                x + dotSize * 0.2,
                y + dotSize * 0.2,
                dotSize * 0.6,
                dotSize * 0.6,
                1.5
              );
              ctx.fill();
            } else {
              // Light Mode: High-contrast crisp emerald diode (#16a34a / #15803d)
              const flicker = Math.sin(time * 2 + c * 0.35 + r * 0.2) * 0.04;
              const alpha = Math.min(1, Math.max(0.9, 0.96 + flicker + mouseBoost * 0.15));

              // Outer green shadow bloom
              ctx.shadowColor = 'rgba(22, 163, 74, 0.4)';
              ctx.shadowBlur = 6 + mouseBoost * 6;

              // Diode base
              ctx.fillStyle = `rgba(22, 163, 74, ${alpha})`;
              ctx.beginPath();
              ctx.roundRect(x, y, dotSize, dotSize, 2);
              ctx.fill();

              // Inner highlight
              ctx.shadowBlur = 0;
              ctx.fillStyle = `rgba(34, 197, 94, ${alpha * 0.95})`;
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
          } else {
            // Unlit LED diode spanning across left-to-right background
            ctx.shadowBlur = 0;
            if (isCurrentDark) {
              if (mouseBoost > 0) {
                ctx.fillStyle = `rgba(34, 197, 94, ${mouseBoost * 0.28})`;
              } else {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.038)';
              }

              ctx.beginPath();
              ctx.roundRect(x, y, dotSize, dotSize, 1.5);
              ctx.fill();

              ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
              ctx.lineWidth = 1;
              ctx.stroke();
            } else {
              if (mouseBoost > 0) {
                ctx.fillStyle = `rgba(22, 163, 74, ${mouseBoost * 0.22})`;
              } else {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
              }

              ctx.beginPath();
              ctx.roundRect(x, y, dotSize, dotSize, 1.5);
              ctx.fill();

              ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchstart', onTouchMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
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
