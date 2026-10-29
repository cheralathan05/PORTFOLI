import React, { useRef } from 'react';
import gsap from 'gsap';
import { useFullscreen } from '../context/FullscreenContext';

export default function FullscreenToggle({ className = '', id = 'fullscreen-toggle' }) {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const iconRef = useRef(null);

  const handleClick = (e) => {
    // Subtle tactile rotation & bounce micro-animation on the icon
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 0.75, rotate: isFullscreen ? -30 : 30 },
        { scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(2.2)' }
      );
    }
    toggleFullscreen();
  };

  return (
    <button
      type="button"
      className={`fullscreen-toggle ${className}`.trim()}
      id={id}
      aria-label={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
      title={isFullscreen ? 'Exit Full Screen (Esc)' : 'Enter Full Screen (F)'}
      onClick={handleClick}
    >
      <span ref={iconRef} className="fullscreen-icon-wrap">
        {isFullscreen ? (
          // Compress / Exit Fullscreen Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fs-icon"
          >
            <path d="M4 14h6m0 0v6m0-6L3 21" />
            <path d="M20 10h-6m0 0V4m0 6 7-7" />
            <path d="M14 14h6m-6 0v6m0-6 7 7" />
            <path d="M10 10H4m6 0V4m0 6L3 3" />
          </svg>
        ) : (
          // Expand / Enter Fullscreen Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fs-icon"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
            <path d="M3 16v3a2 2 0 0 0 2 2h3" />
            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
          </svg>
        )}
      </span>
    </button>
  );
}
