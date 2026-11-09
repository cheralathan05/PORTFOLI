import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LiquidMetalText from './LiquidMetalText';
import { projects } from '../data/projectsData';
import { MoPortalLink } from '../context/PortalTransitionContext';
import { useTheme, LIQUID_METAL_PALETTE } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const featured = projects.filter((p) => p.featured);

function FeaturedVideo({ src, poster, objectPosition, title, isActive }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      const isMobile = window.innerWidth <= 768 || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      // On mobile screens, do not autoplay 400MB videos automatically to prevent memory freezing
      if (!isMobile) {
        setShouldLoad(true);
        video.defaultMuted = true;
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      }
    } else {
      // Whenever inactive, pause immediately to free up GPU decoder pipeline!
      if (!video.paused) {
        video.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  // Pause playback when tab is hidden to save GPU cycles and battery
  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden && !video.paused) {
        video.pause();
        setIsPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const togglePlay = useCallback((e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    if (video.paused) {
      setShouldLoad(true);
      if (!video.src && src) {
        video.src = src;
      }
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [src]);

  return (
    <div
      ref={containerRef}
      className="feature-video-wrapper"
      onClick={togglePlay}
      style={{ cursor: 'pointer', width: '100%', height: '100%', position: 'relative' }}
      title={isPlaying ? 'Click to pause' : 'Click to play demo'}
    >
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload={shouldLoad ? 'metadata' : 'none'}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={(e) => {
          e.currentTarget.defaultMuted = true;
          e.currentTarget.muted = true;
          e.currentTarget.play().catch(() => {});
        }}
        style={objectPosition ? { objectPosition } : undefined}
      />
      <button
        type="button"
        className="video-play-indicator"
        aria-label={isPlaying ? 'Pause demo video' : 'Play demo video'}
        onClick={togglePlay}
      >
        {isPlaying ? (
          <>
            <span className="video-dot-live" />
            <span>DEMO PLAYING</span>
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>CLICK TO PLAY</span>
          </>
        )}
      </button>
    </div>
  );
}

export default function FeaturedWork() {
  const containerRef = useRef(null);
  const { isDark } = useTheme();
  const [activeCardIndex, setActiveCardIndex] = useState(-1);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = gsap.utils.toArray('.feature-card');
    const mm = gsap.matchMedia();

    // Global watcher to pause all videos when outside featured section
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onLeave: () => setActiveCardIndex(-1),
      onLeaveBack: () => setActiveCardIndex(-1),
    });

    // Desktop: full stacked cards with media parallax
    mm.add('(min-width: 769px)', () => {
      cards.forEach((card, i) => {
        const mediaEl = card.querySelector('.feature-media img, .feature-media video');
        if (mediaEl) {
          gsap.fromTo(mediaEl, { yPercent: -6 }, {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        }

        // Active card tracker so only 1 video plays at any time
        ScrollTrigger.create({
          trigger: card,
          start: i === 0 ? 'top 60%' : 'top top+=20',
          endTrigger: i === cards.length - 1 ? containerRef.current : cards[i + 1],
          end: i === cards.length - 1 ? 'bottom top' : 'top top+=20',
          onEnter: () => setActiveCardIndex(i),
          onEnterBack: () => setActiveCardIndex(i),
        });

        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cards[cards.length - 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
        });
        const recede = { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true };
        gsap.to(card.querySelector('.feature-inner'), { scale: 0.9, ease: 'none', scrollTrigger: recede });
        gsap.to(card.querySelector('.feature-shade'), { opacity: 0.7, ease: 'none', scrollTrigger: recede });
      });
    });

    // Mobile: smooth sticky card stack without layout thrashing
    mm.add('(max-width: 768px)', () => {
      cards.forEach((card, i) => {
        // Active card tracker
        ScrollTrigger.create({
          trigger: card,
          start: i === 0 ? 'top 60%' : 'top top+=20',
          endTrigger: i === cards.length - 1 ? containerRef.current : cards[i + 1],
          end: i === cards.length - 1 ? 'bottom top' : 'top top+=20',
          onEnter: () => setActiveCardIndex(i),
          onEnterBack: () => setActiveCardIndex(i),
        });

        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cards[cards.length - 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
        });
        const recede = { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: 0.3 };
        gsap.to(card.querySelector('.feature-shade'), { opacity: 0.65, ease: 'none', scrollTrigger: recede });
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="projects" className="featured-section" ref={containerRef}>
      <div className="container featured-header">
        <div className="featured-header-row">
          <div>
            <span className="section-badge">
              <span className="live-pulse-dot" />
              Verified Production Builds
            </span>
            <h2>
              <LiquidMetalText
                key={`featured-${isDark ? 'dark' : 'light'}`}
                colors={isDark ? LIQUID_METAL_PALETTE.dark : LIQUID_METAL_PALETTE.light}
                speed={6}
              >
                Featured Work
              </LiquidMetalText>
            </h2>
          </div>
          <div className="live-systems-status mono">
            <span className="live-pulse-ring">
              <span className="live-status-dot" />
            </span>
            <span>5 CLOUD APPS DEPLOYED // RENDER</span>
          </div>
        </div>

        {/* Innovative Live Deployments Quick-Launch Dock */}
        <div className="live-deployments-dock">
          <div className="dock-label mono">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>LIVE LAUNCHPAD:</span>
          </div>
          <div className="dock-chips">
            {projects.filter(p => p.live).map((p) => (
              <a
                key={`dock-${p.id}`}
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="dock-chip mono"
                title={`Launch ${p.title} Live Application`}
              >
                <span className="chip-dot" />
                <span className="chip-text">{p.liveShortName || p.title}</span>
                <span className="chip-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {featured.map((p, i) => (
        <article className="feature-card" key={p.id} style={{ '--card-accent': p.accent }}>
          <div className="feature-inner">
            <div className="feature-copy">
              <div className="feature-top-meta">
                <span className="feature-num">{p.num}</span>
                {p.live && (
                  <span className="feature-live-pill mono">
                    <span className="live-btn-dot" />
                    LIVE ON RENDER
                  </span>
                )}
              </div>
              <h3>{p.title}</h3>
              <p className="feature-badge">{p.badge}</p>
              <p className="feature-desc">{p.shortDesc}</p>
              <ul className="feature-facts">
                {p.metrics.slice(0, 3).map((m) => (
                  <li key={m.label}>
                    <strong>{m.number}</strong>
                    <span>{m.label}</span>
                  </li>
                ))}
              </ul>
              <div className="project-tags">
                {p.stack.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
              <div className="feature-actions">
                {p.live && (
                  <a
                    className="feature-live-btn"
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Launch ${p.title} Live Application`}
                  >
                    <span className="live-btn-dot" />
                    <span>Launch Live App</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
                <MoPortalLink
                  to={`/project/${p.id}`}
                  transition={p.transition}
                  word={p.transitionWord || p.title}
                  className="project-link-btn"
                >
                  <span>Case Study</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </MoPortalLink>
                {p.github && (
                  <a className="feature-ghost-btn" href={p.github} target="_blank" rel="noopener noreferrer">
                    Source on GitHub
                  </a>
                )}
              </div>
            </div>
            <div className="feature-media">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feature-media-live-hud"
                  title={`Launch ${p.title} Live Application in New Tab`}
                >
                  <span className="live-hud-dot-wrap">
                    <span className="live-hud-dot-ring" />
                    <span className="live-hud-dot" />
                  </span>
                  <span className="live-hud-label mono">LIVE DEMO ↗</span>
                </a>
              )}
              {p.video ? (
                <FeaturedVideo
                  src={p.video}
                  poster={p.image}
                  objectPosition={p.imagePosition}
                  title={p.title}
                  isActive={activeCardIndex === i}
                />
              ) : (
                <img src={p.image} alt={`${p.title} preview`} loading="lazy" style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined} />
              )}
            </div>
            <div className="feature-shade" aria-hidden="true" />
          </div>
        </article>
      ))}
    </section>
  );
}
