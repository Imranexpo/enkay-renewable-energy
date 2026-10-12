import React, { useEffect, useRef, useState, useCallback } from 'react';

interface LogoIntroProps {
  onComplete: () => void;
}

type IntroPhase =
  | 'entering'   // fading in overlay
  | 'playing'    // video running
  | 'exiting'    // fading out
  | 'done';      // unmounted

const FADE_IN_MS  = 500;
const FADE_OUT_MS = 700;
const FALLBACK_MS = 15000; // absolute bail-out

export default function LogoIntro({ onComplete }: LogoIntroProps) {
  const videoRef        = useRef<HTMLVideoElement>(null);
  const fallbackRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [phase, setPhase]           = useState<IntroPhase>('entering');
  const [skipVisible, setSkipVisible] = useState(false);

  // ── begin graceful exit ─────────────────────────────────────────────────
  const beginExit = useCallback(() => {
    if (fallbackRef.current) clearTimeout(fallbackRef.current);
    setPhase('exiting');
    setTimeout(() => { setPhase('done'); onComplete(); }, FADE_OUT_MS);
  }, [onComplete]);

  // ── mount: lock scroll, advance phases, set fallback ───────────────────
  useEffect(() => {
    // Force html + body to be edge-to-edge with no scroll
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyMargin   = document.body.style.margin;
    const prevBodyPadding  = document.body.style.padding;

    html.style.overflow          = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.margin   = '0';
    document.body.style.padding  = '0';

    // Advance to 'playing' after fade-in finishes
    const fadeTimer = setTimeout(() => setPhase('playing'), FADE_IN_MS);
    // Show skip after 2 s
    const skipTimer = setTimeout(() => setSkipVisible(true), 2000);
    // Absolute fallback
    fallbackRef.current = setTimeout(beginExit, FALLBACK_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(skipTimer);
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
      html.style.overflow          = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.margin   = prevBodyMargin;
      document.body.style.padding  = prevBodyPadding;
    };
  }, [beginExit]);

  // ── trigger video.play() once phase reaches 'playing' ──────────────────
  useEffect(() => {
    if (phase !== 'playing') return;
    const video = videoRef.current;
    if (!video) { beginExit(); return; }
    video.play().catch(() => beginExit()); // graceful fallback if autoplay blocked
  }, [phase, beginExit]);

  if (phase === 'done') return null;

  const opacity           = phase === 'exiting' ? 0 : phase === 'entering' ? 0 : 1;
  const transitionMs      = phase === 'entering' ? FADE_IN_MS : FADE_OUT_MS;

  return (
    <div
      role="dialog"
      aria-label="ENKAY Renewable Energy — Introduction"
      aria-modal="true"
      style={{
        /* ── Full viewport lock — zero gaps ── */
        position: 'fixed',
        top:    0,
        left:   0,
        width:  '100vw',
        height: '100vh',
        margin:  0,
        padding: 0,
        zIndex: 99999,
        overflow: 'hidden',

        /* ── Pure black bg — no white flash ── */
        backgroundColor: '#000000',

        /* ── Opacity transition for fade in/out ── */
        opacity,
        transition: `opacity ${transitionMs}ms ease`,
        willChange: 'opacity',
      }}
    >
      {/* ── Full-bleed video — object-fit: cover, edge-to-edge ── */}
      {phase !== 'entering' && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={beginExit}
          onError={beginExit}
          aria-hidden="true"
          style={{
            /* Stretch to fill the entire viewport — no black bars */
            position: 'absolute',
            top:    0,
            left:   0,
            width:  '100%',
            height: '100%',
            objectFit: 'cover',       // fills edge-to-edge, no letterboxing
            objectPosition: 'center',
            display: 'block',
            margin:  0,
            padding: 0,
            border:  'none',
            outline: 'none',
            /* Force GPU compositing for sharp HD rendering */
            imageRendering: 'auto',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <source src="/assets/enkay-logo-intro-silent.mp4" type="video/mp4" />
        </video>
      )}

      {/* ── Subtle center-glow accent (purely decorative) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(254,191,51,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Skip button ── */}
      {skipVisible && phase !== 'exiting' && (
        <button
          onClick={beginExit}
          aria-label="Skip intro"
          style={{
            position:   'absolute',
            bottom:     '2rem',
            right:      '2rem',
            zIndex:     1,
            background: 'rgba(255,255,255,0.07)',
            border:     '1px solid rgba(255,255,255,0.18)',
            borderRadius: '999px',
            color:        'rgba(255,255,255,0.6)',
            fontSize:     '0.72rem',
            fontFamily:   'Manrope, sans-serif',
            fontWeight:   600,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            padding:      '0.42rem 1.1rem',
            cursor:       'pointer',
            backdropFilter:         'blur(8px)',
            WebkitBackdropFilter:   'blur(8px)',
            transition: 'background 0.2s, color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background   = 'rgba(254,191,51,0.15)';
            b.style.color        = 'rgba(254,191,51,0.95)';
            b.style.borderColor  = 'rgba(254,191,51,0.4)';
          }}
          onMouseLeave={e => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background   = 'rgba(255,255,255,0.07)';
            b.style.color        = 'rgba(255,255,255,0.6)';
            b.style.borderColor  = 'rgba(255,255,255,0.18)';
          }}
        >
          Skip ›
        </button>
      )}
    </div>
  );
}
