import React, { useState, useEffect } from 'react';
import LogoIntro from './components/LogoIntro';
import Navbar from './components/Navbar';
import type { NavSection } from './components/Navbar';

const SESSION_KEY = 'enkay_intro_shown';

function hasSeenIntroThisSession(): boolean {
  try { return sessionStorage.getItem(SESSION_KEY) === 'true'; }
  catch { return false; }
}
function markIntroSeen(): void {
  try { sessionStorage.setItem(SESSION_KEY, 'true'); }
  catch { /* noop */ }
}

export default function App() {
  // null = determining | true = show intro | false = skip to site
  const [showIntro,   setShowIntro]   = useState<boolean | null>(null);
  // Navbar fades in after intro completes
  const [navVisible,  setNavVisible]  = useState(false);
  const [activePage,  setActivePage]  = useState<NavSection>('home');
  const [quoteOpen,   setQuoteOpen]   = useState(false);

  // Determine first-visit after mount (avoids SSR/hydration mismatch)
  useEffect(() => {
    if (hasSeenIntroThisSession()) {
      setShowIntro(false);
      // Already seen intro → navbar visible immediately
      setNavVisible(true);
    } else {
      setShowIntro(true);
    }
  }, []);

  // ── Intro → Navbar handoff ─────────────────────────────────────────────
  const handleIntroComplete = () => {
    markIntroSeen();
    setShowIntro(false);
    // Small delay lets intro overlay finish its own fade-out before navbar rises
    setTimeout(() => setNavVisible(true), 120);
  };

  // ── Navigation ─────────────────────────────────────────────────────────
  const handleNavigate = (section: NavSection, anchorId?: string) => {
    setActivePage(section);
    if (anchorId) {
      setTimeout(() => {
        document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (showIntro === null) return null;

  return (
    <>
      {/* ── Logo intro (first visit only) ── */}
      {showIntro && <LogoIntro onComplete={handleIntroComplete} />}

      {/* ── Navbar — fades in after intro ── */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onQuoteClick={() => setQuoteOpen(true)}
        visible={navVisible}
      />

      {/* ── Page body placeholder (padded below navbar) ── */}
      <main
        style={{
          paddingTop: 124, // topbar(36) + mainbar(88)
          minHeight: '100vh',
          opacity: navVisible ? 1 : 0,
          transition: 'opacity 0.5s ease 0.15s',
        }}
      >
        {/* Homepage sections will be added here */}
      </main>
    </>
  );
}
