import { useCallback } from 'react';
import { ArrowRight, BadgeCheck, Info, ListChecks, Medal, PlugZap, ShieldCheck, Sun } from 'lucide-react';
import type { NavSection } from '../Navbar';
import SiteFooter from '../home/SiteFooter';
import QuoteModal from '../home/QuoteModal';
import {
  BOM, CATEGORIES, CERT_SPEC, MODULE_SPEC, OTHER_OPTIONS, PRODUCTS_CTA_BG, PRODUCTS_HERO_IMAGE,
} from './productsData';
import '../home/home.css';
import './products.css';

interface ProductsPageProps {
  onNavigate: (section: NavSection, anchorId?: string) => void;
  quoteOpen: boolean;
  onQuoteOpen: () => void;
  onQuoteClose: () => void;
}

export default function ProductsPage({ onNavigate, quoteOpen, onQuoteOpen, onQuoteClose }: ProductsPageProps) {
  const openQuote = useCallback(() => onNavigate('quote'), [onNavigate]);

  return (
    <div className="hp pb">
      {/* ── Hero ── */}
      <section className="pb-hero" aria-labelledby="pb-hero-title">
        <img className="pb-hero-img" src={PRODUCTS_HERO_IMAGE} alt="Solar panels" fetchPriority="high" />
        <div className="hp-wrap pb-hero-inner">
          <div className="hp-eyebrow">Our Products</div>
          <h1 id="pb-hero-title">Leading Brands. Quality Solar Solutions.</h1>
          <p>We are an authorized dealer for trusted solar brands in India, offering solar products for residential, industrial and commercial applications.</p>
          <ul className="pb-hero-list">
            <li><BadgeCheck size={22} />Authorized Dealer</li>
            <li><ShieldCheck size={22} />TUV &amp; ETL Certified Modules</li>
          </ul>
        </div>
      </section>

      {/* ── Product categories ── */}
      <section className="pb-cats" aria-labelledby="pb-cats-title">
        <div className="hp-wrap">
          <div className="pb-head">
            <div className="hp-eyebrow is-center">Product Categories</div>
            <h2 id="pb-cats-title">Everything your solar plant needs</h2>
            <p>Quality components for residential, industrial and commercial solar power plants.</p>
          </div>
          <div className="pb-cat-grid">
            {CATEGORIES.map(({ icon: Icon, img, title, side }) => (
              <article key={title} className={side ? `pb-cat is-${side}` : 'pb-cat'}>
                <img src={img} alt={title} loading="lazy" />
                <div className="pb-cat-body">
                  <span className="pb-ico"><Icon size={22} /></span>
                  <h3>{title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specifications ── */}
      {/* <section className="pb-specs" aria-labelledby="pb-specs-title">
        <div className="hp-wrap">
          <div className="pb-head">
            <div className="hp-eyebrow is-center">Specifications</div>
            <h2 id="pb-specs-title">Panel range, certifications &amp; inverter options</h2>
          </div>
          <div className="pb-spec-grid">
            <article className="pb-spec">
              <span className="pb-spec-ico"><LayoutGrid size={26} /></span>
              <h3>Solar PV Modules</h3>
              <div className="pb-range">{MODULE_SPEC.range} <small>{MODULE_SPEC.unit}</small></div>
              <p>{MODULE_SPEC.text}</p>
              <dl>{MODULE_SPEC.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            </article>

            <article className="pb-spec is-dark">
              <span className="pb-spec-ico is-yellow"><ShieldCheck size={26} /></span>
              <h3>Certifications</h3>
              <p>{CERT_SPEC.note}</p>
              <dl>{CERT_SPEC.rows.map(([k, v]) => <div key={k + v}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              <div className="pb-badges">
                <span><ShieldCheck size={16} />{CERT_SPEC.badges[0]}</span>
                <span><Medal size={16} />{CERT_SPEC.badges[1]}</span>
              </div>
            </article>

            <article className="pb-spec">
              <span className="pb-spec-ico"><PlugZap size={26} /></span>
              <h3>Inverter Options</h3>
              <dl className="is-tight">{INVERTER_SPEC.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            </article>
          </div>
        </div>
      </section> */}

      {/* ── Bill of materials ── */}
      <section className="pb-bom" aria-labelledby="pb-bom-title">
        <div className="hp-wrap">
          <div className="pb-bom-head">
            <div>
              <div id="pb-bom-title" className="hp-eyebrow">Bill of Materials</div>
            </div>
            <span className="pb-count"><ListChecks size={20} />{BOM.length} line items</span>
          </div>

          <div className="pb-table-wrap">
            <table className="pb-table">
              <thead>
                <tr>
                  <th>No.</th><th>Item</th><th>Brand</th>
                </tr>
              </thead>
              <tbody>
                {BOM.map((r, i) => (
                  <tr key={r.item}>
                    <td data-label="No."><b className="pb-no">{i + 1}</b></td>
                    <td className="pb-item">{r.item}</td>
                    <td data-label="Brand" className={r.brand ? 'pb-brand' : 'is-na'}>{r.brand ?? 'Not specified'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="pb-note">Items marked “Not specified” were not specified in the client proposal.</p>
          </div>
        </div>
      </section>

      {/* ── Other options ── */}
      <section className="pb-other" aria-labelledby="pb-other-title">
        <div className="hp-wrap pb-other-grid">
          <div>
            <div className="hp-eyebrow">Additional Options</div>
            <h2 id="pb-other-title">Other Available Product &amp; Installation Options</h2>
            <p>Additional products and services available on request. These options are listed separately and are not part of the 5 kWp Bill of Materials above.</p>
            <div className="pb-info"><Info size={18} />Contact our team to confirm the options that suit your project.</div>
          </div>
          <ul className="pb-options">
            {OTHER_OPTIONS.map(o => <li key={o}><span />{o}</li>)}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-cta-sec" aria-labelledby="pb-cta-title">
        <div className="hp-wrap">
          <div className="pb-cta" style={{ backgroundImage: `url(${PRODUCTS_CTA_BG})` }}>
            <div className="pb-cta-copy">
              <div className="hp-eyebrow is-lime">Need a product recommendation?</div>
              <h2 id="pb-cta-title">Get the right components for your plant</h2>
              <p>Our team will help you choose quality products from trusted brands for your solar project.</p>
            </div>
            <button className="hp-btn hp-btn-yellow" onClick={openQuote}><Sun size={20} /> Get a Quote <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} onQuote={openQuote} />
      <QuoteModal open={quoteOpen} topic="" onClose={onQuoteClose} />
    </div>
  );
}
