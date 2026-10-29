import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import gsap from 'gsap';

const FullscreenContext = createContext();

export function FullscreenProvider({ children }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hudMessage, setHudMessage] = useState(null);
  const [hudActive, setHudActive] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const hudRef = useRef(null);
  const hudTimeoutRef = useRef(null);
  const flashRef = useRef(null);

  // Helper to determine active fullscreen element across browsers
  const getFullscreenElement = () => {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement ||
      null
    );
  };

  // Trigger luxury HUD pill animation
  const displayHud = useCallback((message) => {
    setHudMessage(message);
    setHudActive(true);

    if (hudTimeoutRef.current) clearTimeout(hudTimeoutRef.current);

    // GSAP entrance
    setTimeout(() => {
      if (hudRef.current) {
        gsap.killTweensOf(hudRef.current);
        gsap.fromTo(
          hudRef.current,
          { y: -30, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.8)' }
        );
      }
    }, 10);

    // Auto-dismiss after 2.4s
    hudTimeoutRef.current = setTimeout(() => {
      if (hudRef.current) {
        gsap.to(hudRef.current, {
          y: -25,
          opacity: 0,
          scale: 0.96,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => {
            setHudActive(false);
            setHudMessage(null);
          }
        });
      } else {
        setHudActive(false);
        setHudMessage(null);
      }
    }, 2400);
  }, []);

  // Trigger subtle ambient lens expansion wave
  const triggerLensFlash = useCallback(() => {
    setShowFlash(true);
    setTimeout(() => {
      if (flashRef.current) {
        gsap.fromTo(
          flashRef.current,
          { opacity: 0.8, scale: 0.98 },
          {
            opacity: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power2.out',
            onComplete: () => setShowFlash(false)
          }
        );
      } else {
        setShowFlash(false);
      }
    }, 10);
  }, []);

  // Sync state on fullscreenchange (including Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!getFullscreenElement();
      setIsFullscreen(active);

      if (active) {
        triggerLensFlash();
        displayHud('FULLSCREEN MODE ACTIVATED');
      } else {
        displayHud('WINDOWED MODE RESTORED');
      }

      // Refresh ScrollTrigger to ensure all dimensions adapt seamlessly
      if (window.ScrollTrigger) {
        setTimeout(() => window.ScrollTrigger.refresh(), 150);
      }
    };

    const events = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'MSFullscreenChange'
    ];

    events.forEach((evt) => document.addEventListener(evt, handleFullscreenChange));

    return () => {
      events.forEach((evt) => document.removeEventListener(evt, handleFullscreenChange));
      if (hudTimeoutRef.current) clearTimeout(hudTimeoutRef.current);
    };
  }, [displayHud, triggerLensFlash]);

  // Request or exit fullscreen
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!getFullscreenElement()) {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen toggle failed:', err);
    }
  }, []);

  // Keyboard shortcut: Press 'F' to toggle fullscreen (only when not typing in inputs/textareas)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key.toLowerCase() === 'f' &&
        !['input', 'textarea', 'select'].includes(e.target?.tagName?.toLowerCase()) &&
        !e.target?.isContentEditable &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleFullscreen]);

  return (
    <FullscreenContext.Provider value={{ isFullscreen, toggleFullscreen }}>
      {children}

      {/* Subtle Spatial Lens Expansion Wave */}
      {showFlash && (
        <div ref={flashRef} className="fullscreen-lens-wave" aria-hidden="true" />
      )}

      {/* Luxury HUD Pill Notification */}
      {hudActive && (
        <div ref={hudRef} className="fullscreen-hud-pill" role="status" aria-live="polite">
          <span className={`fullscreen-hud-dot ${isFullscreen ? 'active' : ''}`} />
          <span className="fullscreen-hud-text mono">
            {hudMessage}
          </span>
          <span className="fullscreen-hud-hint mono">
            {isFullscreen ? '[ESC TO EXIT]' : '[PRESS F FOR FULL]'}
          </span>
        </div>
      )}
    </FullscreenContext.Provider>
  );
}

export function useFullscreen() {
  const context = useContext(FullscreenContext);
  if (!context) {
    return { isFullscreen: false, toggleFullscreen: () => {} };
  }
  return context;
}
