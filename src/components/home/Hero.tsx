import { ArrowRight, BadgeCheck, House, Landmark, LayoutGrid, Sun, Workflow } from 'lucide-react';
import { HERO_PILLS, STEPS } from './homeData';

const PILL_ICONS = [BadgeCheck, House, Landmark];

export default function Hero({ onQuote, onExplore }: { onQuote: () => void; onExplore: () => void }) {
  return (
    <section className="hp-hero" aria-labelledby="hp-hero-title">
      <div className="hp-hero-bg">
        <img src="/assets/home/hero.jpg" alt="Solar panels installed on a brick house roof" fetchPriority="high" />
      </div>
      <div className="hp-wrap">
        <div className="hp-hero-copy">
          <div className="hp-eyebrow is-lime">Green Energy for a Brighter Tomorrow</div>
          <h1 id="hp-hero-title">Capture the Sun, <span>Power Your Future</span></h1>
          <p>
            ENKAY Renewable Energy provides end-to-end solar solutions for homes, industries and businesses.
            We deliver high-quality solar products, trusted brands and expert installation services.
          </p>
          <div className="hp-hero-actions">
            <button className="hp-btn hp-btn-yellow" onClick={onQuote}><Sun size={20} /> Get a Quote <ArrowRight size={18} /></button>
            <button className="hp-btn hp-btn-ghost" onClick={onExplore}><LayoutGrid size={20} /> Explore Our Solutions</button>
          </div>
          <ul className="hp-pills">
            {HERO_PILLS.map((p, i) => {
              const Icon = PILL_ICONS[i];
              return <li key={p} className="hp-pill"><Icon size={18} />{p}</li>;
            })}
          </ul>
        </div>

        <aside className="hp-steps-card" aria-label="Turnkey process">
          <div className="hp-steps-head">
            <span className="hp-steps-ico"><Workflow size={24} /></span>
            <div>
              <h3>Turnkey Solar Solutions</h3>
              <p>Concept to Commissioning</p>
            </div>
          </div>
          <ol className="hp-steps">
            {STEPS.map((s, i) => (
              <li key={s} className={`hp-step${i === STEPS.length - 1 ? ' is-last' : ''}`}>
                <span className="hp-step-dot">{i + 1}</span>
                <span className="hp-step-label">{s}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
