import { useCallback, useState } from 'react';
import { ArrowRight, Phone, Sun } from 'lucide-react';
import type { NavSection } from '../Navbar';
import { COMPANY_INFO } from '../../data/solarData';
import SiteFooter from '../home/SiteFooter';
import QuoteModal from '../home/QuoteModal';
import {
  CTA_BG, HERO_SERVICES, PROCESS_BG, PROCESS_STEPS, SERVE_CARDS, SERVICES_HERO_IMAGE, SERVICE_CARDS, SEGMENT_TILES,
} from './servicesData';
import '../home/home.css';
import './services.css';

interface ServicesPageProps {
  onNavigate: (section: NavSection, anchorId?: string) => void;
  quoteOpen: boolean;
  onQuoteOpen: () => void;
  onQuoteClose: () => void;
}

export default function ServicesPage({ onNavigate, quoteOpen, onQuoteOpen, onQuoteClose }: ServicesPageProps) {
  const [topic, setTopic] = useState('');
  const openQuote = useCallback((t = '') => { setTopic(t); onQuoteOpen(); }, [onQuoteOpen]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <div className="hp sv">
      {/* ── Hero ── */}
      <section className="sv-hero" aria-labelledby="sv-hero-title">
        <img className="sv-hero-img" src={SERVICES_HERO_IMAGE} alt="Technician installing solar panels" fetchPriority="high" />
        <div className="hp-wrap sv-hero-inner">
          <div className="hp-eyebrow">Our Services</div>
          <h1 id="sv-hero-title">Services &amp; Solutions</h1>
          <p>From consultation to commissioning, we provide complete solar solutions tailored to your needs.</p>
          <ul className="sv-hero-list">
            {HERO_SERVICES.map(({ icon: Icon, label }) => <li key={label}><Icon size={22} />{label}</li>)}
          </ul>
        </div>
      </section>

      {/* ── Segment tiles overlapping the hero ── */}
      <div className="hp-wrap sv-tiles-wrap">
        <ul className="sv-tiles">
          {SEGMENT_TILES.map(({ icon: Icon, title, text, target }) => (
            <li key={title}>
              <button onClick={() => scrollTo(target)}>
                <span className="sv-ico"><Icon size={26} /></span>
                <span><strong>{title}</strong><small>{text}</small></span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ── What we do ── */}
      <section className="sv-what" aria-labelledby="sv-what-title">
        <div className="hp-wrap">
          <div className="sv-head">
            <div className="hp-eyebrow is-center">What We Do</div>
            <h2 id="sv-what-title">Complete solar services under one roof</h2>
            <p>Solutions available for residential, industrial and commercial solar power projects.</p>
          </div>
          <div className="sv-grid">
            {SERVICE_CARDS.map(({ icon: Icon, img, title, text }, i) => {
              const n = String(i + 1).padStart(2, '0');
              return (
                <article key={title} id={`svc-${n}`} className="sv-card">
                  <div className="sv-card-img">
                    <img src={img} alt={title} loading="lazy" />
                    <span className="sv-num">{n}</span>
                    <span className="sv-card-ico"><Icon size={26} /></span>
                  </div>
                  <div className="sv-card-body">
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <button className="hp-link" onClick={() => openQuote(title)}>Learn more <ArrowRight size={15} /></button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Turnkey process ── */}
      <section className="sv-process" aria-labelledby="sv-process-title">
        <img className="sv-process-bg" src={PROCESS_BG} alt="" loading="lazy" />
        <div className="hp-wrap">
          <div className="sv-head is-light">
            <div className="hp-eyebrow is-center is-lime">Our Turnkey Process</div>
            <h2 id="sv-process-title">Concept to Commissioning</h2>
            <p>
              Complete TURNKEY solutions for solar PV power plants of any capacity — Design Engineering, Procurement,
              Construction and Commissioning (EPC).
            </p>
          </div>
          <ol className="sv-steps">
            {PROCESS_STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className={i === PROCESS_STEPS.length - 1 ? 'is-last' : ''}>
                <span className="sv-step-circle">
                  <Icon size={36} strokeWidth={1.6} />
                  <b>{i + 1}</b>
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <p className="sv-avail"><Sun size={18} /> Available for residential, industrial and commercial solar power projects</p>
        </div>
      </section>

      {/* ── Who we serve ── */}
      <section className="sv-serve" aria-labelledby="sv-serve-title">
        <div className="hp-wrap">
          <div className="sv-head">
            <div className="hp-eyebrow is-center">Who We Serve</div>
            <h2 id="sv-serve-title">Solar for every scale</h2>
          </div>
          <div className="sv-serve-grid">
            {SERVE_CARDS.map(({ icon: Icon, img, title, text }) => (
              <article key={title} className="sv-serve-card">
                <img src={img} alt={`${title} solar installation`} loading="lazy" />
                <div>
                  <h3><Icon size={24} />{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="sv-cta-sec" aria-labelledby="sv-cta-title">
        <div className="hp-wrap">
          <div className="sv-cta" style={{ backgroundImage: `url(${CTA_BG})` }}>
            <div className="sv-cta-copy">
              <div className="hp-eyebrow is-lime">Not sure where to start?</div>
              <h2 id="sv-cta-title">Find the Right Solar Solution</h2>
              <p>Tell us about your home or business and our team will recommend a solution that fits your needs.</p>
            </div>
            <div className="sv-cta-actions">
              <button className="hp-btn hp-btn-yellow" onClick={() => openQuote()}><Sun size={20} /> Get a Quote <ArrowRight size={18} /></button>
              <a className="sv-cta-call" href={`tel:${COMPANY_INFO.phoneRaw}`}><Phone size={20} /> Talk to Our Team</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} onQuote={() => openQuote()} />
      <QuoteModal open={quoteOpen} topic={topic} onClose={onQuoteClose} />
    </div>
  );
}
