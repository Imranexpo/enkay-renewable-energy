import { useCallback } from 'react';
import { BadgeCheck, Check, Eye, Lightbulb, MapPin, ShieldCheck, Sun, Target, Workflow } from 'lucide-react';
import type { NavSection } from '../Navbar';
import SiteFooter from '../home/SiteFooter';
import QuoteModal from '../home/QuoteModal';
import { BRANDS } from '../home/homeData';
import { ABOUT_BADGES, ABOUT_IMAGES, PARTNER_BRANDS, WHY_LIST } from './aboutData';
import '../home/home.css';
import './about.css';

interface AboutPageProps {
  onNavigate: (section: NavSection, anchorId?: string) => void;
  quoteOpen: boolean;
  onQuoteOpen: () => void;
  onQuoteClose: () => void;
}

const BADGE_ICONS = [BadgeCheck, ShieldCheck, Workflow];

export default function AboutPage({ onNavigate, quoteOpen, onQuoteOpen, onQuoteClose }: AboutPageProps) {
  const openQuote = useCallback(() => onQuoteOpen(), [onQuoteOpen]);

  return (
    <div className="hp ab">
      {/* ── Hero ── */}
      <section className="ab-hero" aria-labelledby="ab-hero-title">
        <img className="ab-hero-img" src={ABOUT_IMAGES.hero} alt="Aerial view of a large solar farm" fetchPriority="high" />
        <div className="ab-wrap ab-hero-inner">
          <div className="hp-eyebrow">About ENKAY</div>
          <h1 id="ab-hero-title">Powering a Sustainable Tomorrow</h1>
          <p>
            A trusted and authorized dealer for leading solar brands, delivering turnkey solar PV solutions for
            residential, industrial and commercial applications.
          </p>
          <ul className="ab-badges">
            {ABOUT_BADGES.map((b, i) => {
              const Icon = BADGE_ICONS[i];
              return <li key={b}><Icon size={22} />{b}</li>;
            })}
          </ul>
        </div>
      </section>

      {/* ── Who we are ── */}
      <section className="ab-who ab-wrap" aria-labelledby="ab-who-title">
        <div className="ab-who-media">
          <span className="ab-dash" aria-hidden="true" />
          <img src={ABOUT_IMAGES.who} alt="ENKAY engineer overlooking a solar installation" loading="lazy" />
          <div className="ab-who-card">
            <span className="ab-ico-green"><MapPin size={26} /></span>
            <h3>Based in Chennai, Tamil Nadu</h3>
            <p>Serving residential, industrial and commercial solar power plant applications.</p>
          </div>
        </div>
        <div className="ab-who-copy">
          <div className="hp-eyebrow">Who We Are</div>
          <h2 id="ab-who-title">Your trusted solar partner in Tamil Nadu</h2>
          <blockquote className="ab-quote">
            ENKAY Renewable Energy is a trusted and authorized dealer for leading solar brands including Rayzon Solar,
            Waaree Energies Pvt. Ltd., VSole Energy, Adani Solar and Sungrow Energy. We are also associated with leading
            solar on-grid and off-grid inverter manufacturers in Tamil Nadu for residential, industrial and commercial
            solar power plant applications.
          </blockquote>
          <p className="ab-lead">
            We specialize in the design, installation, and maintenance of high-quality rooftop solar systems for
            residential, commercial, and industrial sectors — backed by expert installation and after-sales support.
          </p>
          <ul className="ab-pills">
            {PARTNER_BRANDS.map(b => <li key={b}><Sun size={16} />{b}</li>)}
          </ul>
        </div>
      </section>

      {/* ── Why choose ── */}
      <section className="ab-wrap ab-why-sec" aria-labelledby="ab-why-title">
        <div className="ab-why">
          <div className="ab-why-list">
            <h2 id="ab-why-title">Why Choose Enkay?</h2>
            <ul>
              {WHY_LIST.map(t => (
                <li key={t}><span className="ab-check"><Check size={18} strokeWidth={3} /></span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="ab-why-media">
            <img src={ABOUT_IMAGES.why} alt="Hands holding a young plant in sunlit soil" loading="lazy" />
            <p>Clean Energy for a Better Tomorrow</p>
          </div>
        </div>
      </section>

      {/* ── Vision & mission ── */}
      <section className="ab-wrap ab-vm" aria-label="Vision and mission">
        <article className="ab-vm-card">
          <span className="ab-ico-green"><Eye size={26} /></span>
          <div>
            <h3>Our Vision</h3>
            <p>To harness the power of nature for the sustainable development of our society and create a pollution-free future.</p>
          </div>
        </article>
        <article className="ab-vm-card">
          <span className="ab-ico-yellow"><Target size={26} /></span>
          <div>
            <h3>Our Mission</h3>
            <p>
              To make solar energy accessible and affordable for every home and business by providing reliable,
              cost-effective, and high-quality solar solutions that reduce electricity bills and promote energy independence.
            </p>
          </div>
        </article>
      </section>

      {/* ── Tagline ── */}
      <section className="ab-wrap ab-tag-sec" aria-label="Our tagline">
        <div className="ab-tag" style={{ backgroundImage: `url(${ABOUT_IMAGES.tagline})` }}>
          <Lightbulb size={46} strokeWidth={1.6} />
          <div>
            <span>Our Tagline</span>
            <strong>Powering Tomorrow with Solar Today.</strong>
          </div>
        </div>
      </section>

      {/* ── Premium brands ── */}
      <section className="ab-wrap ab-brands" aria-labelledby="ab-brands-title">
        <h2 id="ab-brands-title">Premium Quality Brands</h2>
        <p>We provide only top-quality solar panels, inverters, cables and accessories from reputed brands to our esteemed customers.</p>
        <ul className="ab-brand-grid">
          {BRANDS.map(b => (
            <li key={b.name}><img src={b.src} alt={b.name} width={b.w} height={b.h} loading="lazy" /></li>
          ))}
        </ul>
      </section>

      <SiteFooter onNavigate={onNavigate} onQuote={openQuote} />
      <QuoteModal open={quoteOpen} onClose={onQuoteClose} />
    </div>
  );
}
