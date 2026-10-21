import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight, BadgeIndianRupee, Building, Building2, Check, ClipboardList, FileCheck2, FileText, Home, Info, Landmark, Leaf,
  Lock, Mail, MapPin, MessageSquare, Pencil, Phone, Send, Settings, ShieldCheck, Sprout, Sun, Timer, User, Users, Zap,
} from 'lucide-react';
import type { NavSection } from '../Navbar';
import SiteFooter from '../home/SiteFooter';
import QuoteModal from '../home/QuoteModal';
import Reveal from '../Reveal';
import { COMPANY_INFO } from '../../data/solarData';
import { BANK_DETAILS, QUOTE_BENEFITS, SUBSIDIES, TERMS } from './quoteData';
import { EMPTY_QUOTE, quoteEmailBody, validateQuote } from './quoteLogic';
import type { QuoteErrors, QuoteProjectType, QuoteValues } from './quoteLogic';
import '../home/home.css';
import './quote.css';

interface Props {
  onNavigate: (section: NavSection, anchorId?: string) => void;
  quoteOpen: boolean;
  onQuoteOpen: () => void;
  onQuoteClose: () => void;
}

const CHIPS = [
  { icon: Settings, text: 'Customised Solutions' },
  { icon: BadgeIndianRupee, text: 'Competitive Pricing' },
  { icon: Timer, text: 'Fast Response' },
];

const TRUST = [
  { icon: Leaf, title: 'Clean Energy', text: 'A cleaner, greener tomorrow with solar power.' },
  { icon: ShieldCheck, title: 'Trusted Partner', text: 'Authorized dealer for leading solar brands.' },
  { icon: Users, title: 'Expert Team', text: 'Expert installation and professional support.' },
  { icon: Sprout, title: 'Sustainable Future', text: 'Renewable energy for a better world.' },
];

const ORDER: (keyof QuoteValues)[] = ['name', 'email', 'phone', 'capacity', 'location', 'bill', 'details'];

const ToBeQuoted = ({ children = 'To be quoted' }: { children?: ReactNode }) => (
  <span className="qt-tbq"><Pencil size={14} aria-hidden="true" />{children}</span>
);

export default function QuotePage({ onNavigate, quoteOpen, onQuoteOpen, onQuoteClose }: Props) {
  const openQuote = useCallback(() => onNavigate('quote'), [onNavigate]);
  const [values, setValues] = useState<QuoteValues>(EMPTY_QUOTE);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [busy, setBusy] = useState(false);
  const [drafted, setDrafted] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const reduce = useReducedMotion();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const set = <K extends keyof QuoteValues>(key: K, value: QuoteValues[K]) => {
    setValues(p => ({ ...p, [key]: value }));
    if (errors[key]) setErrors(p => ({ ...p, [key]: undefined }));
    setDrafted(false);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const found = validateQuote(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setDrafted(false);
      const first = ORDER.find(k => found[k]);
      if (first) document.getElementById(`qt-${first}`)?.focus();
      return;
    }
    // This project has no backend: open the visitor's email app with the request drafted.
    setBusy(true);
    window.location.href = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent('Solar quote request')}&body=${encodeURIComponent(quoteEmailBody(values))}`;
    setDrafted(true);
    timer.current = window.setTimeout(() => setBusy(false), 2000);
  };

  const a11y = (k: keyof QuoteValues) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `qt-${k}-err` : undefined,
  });
  const err = (k: keyof QuoteValues) => errors[k] && <p className="qt-error" id={`qt-${k}-err`} role="alert">{errors[k]}</p>;

  return (
    <div className="hp qt">
      {/* ── Hero ── */}
      <section className="qt-hero" aria-labelledby="qt-title">
        <motion.img
          className="qt-hero-img"
          src="/assets/quote/hero.jpg"
          alt=""
          fetchPriority="high"
          initial={reduce ? false : { scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <div className="hp-wrap qt-hero-inner">
          <Reveal className="qt-eyebrow" from="left" delay={0.1}>Solar Solutions</Reveal>
          <Reveal as="h1" id="qt-title" delay={0.25}>Get a Quote</Reveal>
          <Reveal as="p" delay={0.4}>Ready to switch to clean, renewable energy? Fill out the form below and get a personalized quote for your solar installation. Our team will get back to you with the best solution for your needs.</Reveal>
          <ul className="qt-chips">
            {CHIPS.map(({ icon: Icon, text }, i) => <Reveal as="li" key={text} delay={0.55 + i * 0.12}><Icon size={22} aria-hidden="true" />{text}</Reveal>)}
          </ul>
        </div>
      </section>

      {/* ── Request a quote ── */}
      <section className="qt-request" aria-label="Request a quote">
        <div className="hp-wrap qt-request-grid">
          <Reveal from="left" delay={0.1}>
          <form className="qt-form" onSubmit={submit} noValidate>
            <header>
              <span className="qt-badge"><FileText size={24} aria-hidden="true" /></span>
              <div>
                <h2>Request a Quote</h2>
                <p>Tell us about your solar needs and we'll provide you with a detailed quotation based on your requirements.</p>
              </div>
            </header>

            <div className="qt-sec"><span>Your Details</span><i /></div>

            <div className="qt-field">
              <label htmlFor="qt-name">Your Name <b aria-hidden="true">*</b></label>
              <div className="qt-input"><User size={18} aria-hidden="true" />
                <input id="qt-name" autoComplete="name" required placeholder="Enter your full name" value={values.name} onChange={e => set('name', e.target.value)} {...a11y('name')} />
              </div>
              {err('name')}
            </div>

            <div className="qt-row">
              <div className="qt-field">
                <label htmlFor="qt-email">Email Address <b aria-hidden="true">*</b></label>
                <div className="qt-input"><Mail size={18} aria-hidden="true" />
                  <input id="qt-email" type="email" autoComplete="email" required placeholder="you@example.com" value={values.email} onChange={e => set('email', e.target.value)} {...a11y('email')} />
                </div>
                {err('email')}
              </div>
              <div className="qt-field">
                <label htmlFor="qt-phone">Phone Number <b aria-hidden="true">*</b></label>
                <div className="qt-input"><Phone size={18} aria-hidden="true" />
                  <input id="qt-phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+91 XXXXX XXXXX" value={values.phone} onChange={e => set('phone', e.target.value)} {...a11y('phone')} />
                </div>
                {err('phone')}
              </div>
            </div>

            <div className="qt-sec"><span>Project Details</span><i /></div>

            <div className="qt-field">
              <span className="qt-label" id="qt-type-label">Project Type <b aria-hidden="true">*</b></span>
              <div className="qt-seg" role="radiogroup" aria-labelledby="qt-type-label">
                {([['residential', 'Residential', Home], ['commercial', 'Commercial', Building2]] as [QuoteProjectType, string, typeof Home][])
                  .map(([val, text, Icon]) => (
                    <button key={val} type="button" role="radio" aria-checked={values.projectType === val}
                      className={values.projectType === val ? 'is-on' : ''} onClick={() => set('projectType', val)}>
                      <Icon size={16} aria-hidden="true" />{text}
                    </button>
                  ))}
              </div>
            </div>

            <div className="qt-row">
              <div className="qt-field">
                <label htmlFor="qt-capacity">Solar System Capacity (kWp)</label>
                <div className="qt-input"><Sun size={18} aria-hidden="true" />
                  <input id="qt-capacity" autoComplete="off" placeholder="e.g. 3 kWp or 5 kWp" value={values.capacity} onChange={e => set('capacity', e.target.value)} {...a11y('capacity')} />
                </div>
                {err('capacity')}
              </div>
              <div className="qt-field">
                <label htmlFor="qt-location">Location of Installation <b aria-hidden="true">*</b></label>
                <div className="qt-input"><MapPin size={18} aria-hidden="true" />
                  <input id="qt-location" autoComplete="street-address" required placeholder="Your full address or area" value={values.location} onChange={e => set('location', e.target.value)} {...a11y('location')} />
                </div>
                {err('location')}
              </div>
            </div>

            <div className="qt-field">
              <label htmlFor="qt-bill">Monthly Electricity Bill / Energy Requirement</label>
              <div className="qt-input"><Zap size={18} aria-hidden="true" />
                <input id="qt-bill" autoComplete="off" placeholder="e.g. ₹2,000 – ₹5,000 or approx. units per month" value={values.bill} onChange={e => set('bill', e.target.value)} {...a11y('bill')} />
              </div>
              {err('bill')}
            </div>

            <div className="qt-field">
              <label htmlFor="qt-details">Additional Details</label>
              <div className="qt-input is-area"><MessageSquare size={18} aria-hidden="true" />
                <textarea id="qt-details" placeholder="Tell us more about your project (optional)" value={values.details} onChange={e => set('details', e.target.value)} {...a11y('details')} />
              </div>
              {err('details')}
            </div>

            <button type="submit" className="qt-send" disabled={busy} aria-busy={busy}>
              <Send size={20} aria-hidden="true" />{busy ? 'Opening your email app…' : 'Request a Quote'}{!busy && <ArrowRight size={20} aria-hidden="true" />}
            </button>

            <div className="qt-status" role="status" aria-live="polite">
              {drafted && (
                <p>
                  Your email app should now be open with this request drafted to {COMPANY_INFO.email}. Press send there to deliver it — nothing has been sent yet.
                  If nothing opened, email us at <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a> or call <a href={`tel:${COMPANY_INFO.phoneRaw}`}>{COMPANY_INFO.phone}</a>.
                </p>
              )}
            </div>

            <p className="qt-privacy"><Lock size={16} aria-hidden="true" />Fields marked * are required. Your information is safe with us.</p>
          </form>
          </Reveal>

          <Reveal from="right" delay={0.25}>
          <aside className="qt-side">
            <img className="qt-side-img" src="/assets/quote/side.jpg" alt="Solar installers fitting rooftop panels" loading="lazy" />
            <div className="qt-why">
              <h3>Why Choose ENKAY?</h3>
              <ul>
                {QUOTE_BENEFITS.map((b, i) => <Reveal as="li" key={b} from="right" delay={0.4 + i * 0.1}><span><Check size={14} strokeWidth={3} aria-hidden="true" /></span>{b}</Reveal>)}
              </ul>
              <div className="qt-promo">
                <div className="qt-promo-top">
                  <span className="qt-badge is-round"><Leaf size={22} aria-hidden="true" /></span>
                  <div>
                    <h4>Power Your Home With Clean Energy</h4>
                    <p>Save on electricity bills and contribute to a greener planet.</p>
                  </div>
                </div>
                <img src="/assets/quote/illustration.svg" alt="" aria-hidden="true" />
                <em>Switch to Solar. Save for Tomorrow.</em>
              </div>
            </div>
          </aside>
          </Reveal>
        </div>
      </section>

      {/* ── Commercial bid & terms ── */}
      <section className="qt-bid-sec" aria-labelledby="qt-bid-title">
        <div className="hp-wrap">
          <Reveal className="qt-bid-head">
            <div className="qt-eyebrow is-center">Price Summary</div>
            <h2 id="qt-bid-title">Commercial Bid &amp; Terms</h2>
            <p>Quotation for a Solar Power Plant System on the roof of the residence.</p>
          </Reveal>

          <div className="qt-bid-grid">
            <Reveal as="article" className="qt-bid" from="left">
              <div className="qt-bid-top">
                <div><small>Commercial Bid</small><h3>Price Details</h3></div>
                <span className="qt-pill"><MapPin size={14} aria-hidden="true" />Price basis: Chennai</span>
              </div>
              <div className="qt-prod">
                <span className="qt-badge"><Sun size={24} aria-hidden="true" /></span>
                <div>
                  <h4>5000 Wp (5 kWp) On-Grid Solar Power Plant System with Components</h4>
                  <p>Refer to the 5 kWp Bill of Materials for included components.</p>
                </div>
              </div>
              <dl className="qt-table">
                <div><dt>Quantity</dt><dd><b>1 No.</b></dd></div>
                <div><dt>Amount</dt><dd><ToBeQuoted /></dd></div>
                <div><dt>Add: GST @ 5%</dt><dd><ToBeQuoted /></dd></div>
                <div className="is-total"><dt>Total Amount (Rs.)</dt><dd><ToBeQuoted /></dd></div>
              </dl>
              <p className="qt-bid-note"><FileCheck2 size={22} aria-hidden="true" />The technical and commercial proposal includes the technical specifications and details to fulfil your requirements, and commercial terms with our best price.</p>
            </Reveal>

            <div className="qt-stack">
              <Reveal as="article" className="qt-mini" from="right" delay={0.1}>
                <h3><span className="qt-badge is-soft is-yellow"><Landmark size={22} aria-hidden="true" /></span>Subsidy Eligibility</h3>
                <div className="qt-subs">
                  {SUBSIDIES.map(s => (
                    <div key={s.amount}>
                      <p>{s.who.map((w, i) => <span key={w}>{i > 0 && <br />}{w}</span>)}</p>
                      <strong>{s.amount}</strong>
                      <small>Subsidy eligible</small>
                    </div>
                  ))}
                </div>
                <p className="qt-fine"><Info size={16} aria-hidden="true" />Actual subsidy approval and eligibility depend on the applicable scheme requirements.</p>
              </Reveal>

              <Reveal as="article" className="qt-mini" from="right" delay={0.25}>
                <h3><span className="qt-badge is-soft"><Building size={22} aria-hidden="true" /></span>Bank Account Details</h3>
                <dl className="qt-bank">
                  {BANK_DETAILS.map(r => (
                    <div key={r.label}>
                      <dt>{r.label}</dt>
                      <dd className={r.mono ? 'is-mono' : ''}>{r.pending ? <span className="qt-tbq is-plain">{r.pending}</span> : r.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>

          <Reveal as="section" className="qt-terms" aria-labelledby="qt-terms-title">
            <header>
              <h3 id="qt-terms-title"><ClipboardList size={26} aria-hidden="true" />Terms &amp; Conditions</h3>
              <span className="qt-tag">Applicable terms</span>
            </header>
            <ol>
              {TERMS.map((t, i) => (
                <Reveal as="li" key={t.title} delay={(i % 2) * 0.1 + Math.floor(i / 2) * 0.08}>
                  <b>{i + 1}</b>
                  <div><h4>{t.title}</h4><p>{t.text}</p></div>
                </Reveal>
              ))}
            </ol>
          </Reveal>

          <Reveal as="p" className="qt-thanks"><Sun size={26} aria-hidden="true" /><span>“Thanking you and assuring you of our best services always.”</span><Sun size={26} aria-hidden="true" /></Reveal>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="qt-trust" aria-label="Why choose ENKAY">
        <div className="hp-wrap qt-trust-grid">
          {TRUST.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="article" key={title} delay={i * 0.12}>
              <span><Icon size={34} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} onQuote={openQuote} />
      <QuoteModal open={quoteOpen} topic="" onClose={onQuoteClose} />
    </div>
  );
}
