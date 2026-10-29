import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useFullscreen } from '../context/FullscreenContext';

export default function FullscreenToggle({ className = '', id = 'top-right-fullscreen-toggle' }) {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);

  // Subtle entrance animation on initial mount
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -16, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.2, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.08,
        duration: 0.35,
        ease: 'power2.out'
      });
    }
    if (tooltipRef.current) {
      gsap.fromTo(
        tooltipRef.current,
        { opacity: 0, x: 8, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1, duration: 0.28, ease: 'back.out(2)' }
      );
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.35,
        ease: 'power2.out'
      });
    }
  };

  const handleClick = (e) => {
    // Tactile elastic spring micro-interaction
    if (buttonRef.current) {
      gsap.timeline()
        .to(buttonRef.current, { scale: 0.88, duration: 0.08, ease: 'power2.in' })
        .to(buttonRef.current, { scale: 1.12, duration: 0.22, ease: 'back.out(2.8)' })
        .to(buttonRef.current, { scale: 1, duration: 0.2, ease: 'power2.out' });
    }
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 0.75, rotate: isFullscreen ? -15 : 15 },
        { scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(2.2)' }
      );
    }
    toggleFullscreen();
  };

  return (
    <div
      ref={containerRef}
      className={`top-right-fullscreen-wrapper ${className}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Luxury Floating Tooltip */}
      <div
        ref={tooltipRef}
        className={`fs-floating-tooltip ${isHovered ? 'visible' : ''}`}
        aria-hidden="true"
      >
        <span className={`fs-tooltip-dot ${isFullscreen ? 'active' : ''}`} />
        <span className="fs-tooltip-label">
          {isFullscreen ? 'EXIT FULL' : 'FULLSCREEN'}
        </span>
        <span className="fs-tooltip-kbd">
          {isFullscreen ? 'ESC' : 'F'}
        </span>
      </div>

      {/* Main Standard Fullscreen Button */}
      <button
        ref={buttonRef}
        type="button"
        className={`top-right-fullscreen-btn ${isFullscreen ? 'is-active' : ''}`}
        id={id}
        aria-label={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
        aria-pressed={isFullscreen}
        title={isFullscreen ? 'Exit Full Screen (Esc)' : 'Enter Full Screen (F)'}
        onClick={handleClick}
      >
        {/* Specular Glare Glow */}
        <span className="fs-btn-glow" aria-hidden="true" />

        <span ref={iconRef} className="fullscreen-icon-wrap">
          {isFullscreen ? (
            /* STANDARD EXIT FULLSCREEN (4 inward corner brackets) */
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="standard-fs-icon exit-icon"
              aria-hidden="true"
            >
              <path d="M8 3v5H3" />
              <path d="M16 3v5h5" />
              <path d="M8 21v-5H3" />
              <path d="M16 21v-5h5" />
            </svg>
          ) : (
            /* STANDARD ENTER FULLSCREEN (4 outward corner brackets) */
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="standard-fs-icon enter-icon"
              aria-hidden="true"
            >
              <path d="M3 8V3h5" />
              <path d="M21 8V3h-5" />
              <path d="M3 16v5h5" />
              <path d="M21 16v5h-5" />
            </svg>
          )}
        </span>

        {/* Live Active Status Indicator LED */}
        {isFullscreen && <span className="fs-active-dot" aria-hidden="true" />}
      </button>
    </div>
  );
}
