import { useCallback } from 'react';
import type { NavSection } from '../Navbar';
import Hero from './Hero';
import TrustedBrands from './TrustedBrands';
import WhyChoose from './WhyChoose';
import Solutions from './Solutions';
import CtaBanner from './CtaBanner';
import SiteFooter from './SiteFooter';
import './home.css';

interface HomePageProps {
  onNavigate: (section: NavSection, anchorId?: string) => void;
  quoteOpen: boolean;
  onQuoteOpen: () => void;
  onQuoteClose: () => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const openQuote = useCallback((_topic = '') => onNavigate('quote'), [onNavigate]);

  return (
    <div className="hp">
      <Hero onQuote={() => openQuote()} onExplore={() => onNavigate('services')} />
      <TrustedBrands overlap />
      <WhyChoose />
      <Solutions onEnquire={openQuote} />
      <CtaBanner onQuote={() => openQuote()} />
      <SiteFooter onNavigate={onNavigate} onQuote={() => openQuote()} />
    </div>
  );
}
