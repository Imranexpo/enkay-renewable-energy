import { useCallback, useState } from 'react';
import type { NavSection } from '../Navbar';
import Hero from './Hero';
import TrustedBrands from './TrustedBrands';
import WhyChoose from './WhyChoose';
import Solutions from './Solutions';
import Products from './Products';
import CtaBanner from './CtaBanner';
import SiteFooter from './SiteFooter';
import QuoteModal from './QuoteModal';
import './home.css';

interface HomePageProps {
  onNavigate: (section: NavSection, anchorId?: string) => void;
  quoteOpen: boolean;
  onQuoteOpen: () => void;
  onQuoteClose: () => void;
}

export default function HomePage({ onNavigate, quoteOpen, onQuoteOpen, onQuoteClose }: HomePageProps) {
  const [topic, setTopic] = useState('');

  const openQuote = useCallback((t = '') => { if (t) { setTopic(t); onQuoteOpen(); } else onNavigate('quote'); }, [onQuoteOpen, onNavigate]);

  return (
    <div className="hp">
      <Hero onQuote={() => openQuote()} onExplore={() => onNavigate('services')} />
      <TrustedBrands />
      <WhyChoose />
      <Solutions onEnquire={openQuote} />
      <Products onViewAll={() => onNavigate('products')} onEnquire={openQuote} />
      <CtaBanner onQuote={() => openQuote()} />
      <SiteFooter onNavigate={onNavigate} onQuote={() => openQuote()} />
      <QuoteModal open={quoteOpen} topic={topic} onClose={onQuoteClose} />
    </div>
  );
}
