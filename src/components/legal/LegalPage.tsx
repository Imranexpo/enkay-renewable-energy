import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, FileText, Mail, Phone } from 'lucide-react';
import type { NavSection } from '../Navbar';
import SiteFooter from '../home/SiteFooter';
import QuoteModal from '../home/QuoteModal';
import Reveal from '../Reveal';
import { COMPANY_INFO } from '../../data/solarData';
import type { LegalDoc } from './legalData';
import '../home/home.css';
import './legal.css';

interface Props {
  doc: LegalDoc;
  related: { label: string; section: NavSection };
  onNavigate: (section: NavSection, anchorId?: string) => void;
  quoteOpen: boolean;
  onQuoteOpen: () => void;
  onQuoteClose: () => void;
}

const num = (i: number) => String(i + 1).padStart(2, '0');

export default function LegalPage({ doc, related, onNavigate, quoteOpen, onQuoteClose }: Props) {
  const openQuote = useCallback(() => onNavigate('quote'), [onNavigate]);
  const [active, setActive] = useState(doc.sections[0].id);

  // Highlight the contents entry for the section currently being read
  useEffect(() => {
    const els = doc.sections.map(s => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-30% 0px -60% 0px' },
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [doc]);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
  };

  return (
    <div className="hp lg">
      {/* ── Hero ── */}
      <section className="lg-hero" aria-labelledby="lg-title">
        <div className="hp-wrap lg-hero-inner">
          <Reveal className="lg-eyebrow" from="left">{doc.eyebrow}</Reveal>
          <Reveal as="h1" id="lg-title" delay={0.1}>{doc.title}</Reveal>
          <Reveal as="p" delay={0.2}>{doc.intro}</Reveal>
          <Reveal className="lg-updated" delay={0.3}><CalendarDays size={16} aria-hidden="true" />Last updated: {doc.updated}</Reveal>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="lg-main">
        <div className="hp-wrap lg-grid">
          <aside className="lg-toc">
            <nav aria-label="On this page">
              <h2>On this page</h2>
              <ol>
                {doc.sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={active === s.id ? 'location' : undefined}
                      onClick={e => { e.preventDefault(); jump(s.id); }}
                    >
                      <span>{num(i)}</span>{s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="lg-doc">
            {doc.sections.map((s, i) => (
              <Reveal as="section" key={s.id} id={s.id} className="lg-sec" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}><span aria-hidden="true">{num(i)}</span>{s.title}</h2>
                {s.body.map((b, j) => (Array.isArray(b)
                  ? <ul key={j}>{b.map(item => <li key={item}>{item}</li>)}</ul>
                  : <p key={j}>{b}</p>))}
              </Reveal>
            ))}

            <Reveal className="lg-help">
              <div>
                <h2>Questions about this {doc.title.includes('Privacy') ? 'policy' : 'page'}?</h2>
                <p>Write to us or call our office at {COMPANY_INFO.address}.</p>
              </div>
              <div className="lg-help-links">
                <a href={`mailto:${COMPANY_INFO.email}`}><Mail size={18} aria-hidden="true" />{COMPANY_INFO.email}</a>
                <a href={`tel:${COMPANY_INFO.phoneRaw}`}><Phone size={18} aria-hidden="true" />{COMPANY_INFO.phone}</a>
              </div>
            </Reveal>

            <button type="button" className="lg-related" onClick={() => onNavigate(related.section)}>
              <FileText size={20} aria-hidden="true" />Read our {related.label}<ArrowRight size={18} aria-hidden="true" />
            </button>
          </article>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} onQuote={openQuote} />
      <QuoteModal open={quoteOpen} topic="" onClose={onQuoteClose} />
    </div>
  );
}
