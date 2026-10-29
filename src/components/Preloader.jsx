import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

// 10 Curated Languages for "Welcome"
const WELCOME_DATA = [
  { word: "Welcome", lang: "English", code: "EN" },
  { word: "வணக்கம்", lang: "Tamil", code: "TA" },
  { word: "Bienvenue", lang: "French", code: "FR" },
  { word: "ようこそ", lang: "Japanese", code: "JA" },
  { word: "Bienvenido", lang: "Spanish", code: "ES" },
  { word: "Willkommen", lang: "German", code: "DE" },
  { word: "Benvenuto", lang: "Italian", code: "IT" },
  { word: "स्वागतम्", lang: "Hindi", code: "HI" },
  { word: "Добро пожаловать", lang: "Russian", code: "RU" },
  { word: "أهلاً وسهلاً", lang: "Arabic", code: "AR" },
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const curvePathRef = useRef(null);
  const wordRef = useRef(null);
  const counterObj = useRef({ value: 0 });
  const hasExitedRef = useRef(false);

  // Lock body scroll while preloader is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Exit sequence triggered when progress hits 100
  const triggerExit = () => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        if (onComplete) onComplete();
        // Refresh ScrollTrigger after curtain is gone
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }
      }
    });

    // 1. Fade out the text and lines
    tl.to(contentRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    })
    // 2. Pull up the preloader curtain with SVG organic curve
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut'
    }, '-=0.2');

    // Morph the SVG bottom curve if available
    if (curvePathRef.current) {
      tl.to(curvePathRef.current, {
        attr: { d: "M0 0 L100 0 L100 100 Q50 0 0 100 Z" },
        duration: 0.7,
        ease: 'power3.in'
      }, '-=0.85');
    }
  };

  // Skip button or Escape key
  const handleSkip = () => {
    if (hasExitedRef.current) return;
    counterObj.current.value = 100;
    setProgress(100);
    setCurrentIndex(WELCOME_DATA.length - 1);
    triggerExit();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main counter & language cycling animation
  useEffect(() => {
    const totalDuration = 2.8; // 2.8 seconds total duration

    // Animate counter from 0 to 100
    const tween = gsap.to(counterObj.current, {
      value: 100,
      duration: totalDuration,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(counterObj.current.value);
        setProgress(val);

        // Map 0-100 to the 10 languages
        // 0-9 -> 0, 10-19 -> 1, ..., 90-100 -> 9
        const newIdx = Math.min(
          Math.floor((val / 100) * WELCOME_DATA.length),
          WELCOME_DATA.length - 1
        );
        setCurrentIndex(newIdx);
      },
      onComplete: () => {
        setProgress(100);
        // Small pause at 100 before pulling up the curtain
        gsap.delayedCall(0.25, triggerExit);
      }
    });

    return () => {
      tween.kill();
    };
  }, []);

  // Animate word changes
  useEffect(() => {
    if (wordRef.current) {
      gsap.fromTo(
        wordRef.current,
        { y: 15, opacity: 0, filter: 'blur(4px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.28, ease: 'power2.out' }
      );
    }
  }, [currentIndex]);

  if (isFinished) return null;

  const currentItem = WELCOME_DATA[currentIndex];

  return (
    <div
      ref={containerRef}
      className="preloader-overlay"
      id="portfolio-preloader"
    >
      {/* Film grain noise overlay */}
      <div className="preloader-noise" />

      {/* Top Editorial Bar */}
      <div className="preloader-header">
        <div className="preloader-brand">
          <span className="preloader-status-dot" />
          <span className="mono">CHERALATHAN B.N</span>
        </div>
      </div>

      {/* Center Stage: Welcome Text & Counter Line */}
      <div ref={contentRef} className="preloader-center">
        {/* Language Badge */}
        <div className="preloader-lang-badge mono">
          <span className="lang-code">[{currentItem.code}]</span>
          <span className="lang-name">{currentItem.lang.toUpperCase()}</span>
        </div>

        {/* Dynamic Welcome in 10 Languages */}
        <div className="preloader-word-box">
          <h1 ref={wordRef} className="preloader-welcome-text">
            {currentItem.word}
          </h1>
        </div>

        {/* Counter with Horizontal Dividing Line (Exact Reference Match) */}
        <div className="preloader-line-track">
          <div className="preloader-line preloader-line-left">
            <div
              className="preloader-line-fill left"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="preloader-number" aria-live="polite">
            {progress < 10 ? `0${progress}` : progress}
          </div>

          <div className="preloader-line preloader-line-right">
            <div
              className="preloader-line-fill right"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Subtitle */}
        <div className="preloader-subtext mono">
          INITIALIZING CREATIVE DEVELOPER PORTFOLIO
        </div>
      </div>

      {/* Bottom Liquid Curtain Curve for Cinematic Reveal */}
      <svg
        className="preloader-curve-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={curvePathRef}
          d="M0 0 L100 0 L100 100 Q50 100 0 100 Z"
          fill="#050505"
        />
      </svg>
    </div>
  );
}
