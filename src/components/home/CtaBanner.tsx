import { ArrowRight, Calculator, CircleCheck, Landmark, Sun } from 'lucide-react';

const CHECKS = ['Trusted Brands', 'Expert Installation', 'Turnkey EPC', 'Subsidy Assistance'];

export default function CtaBanner({ onQuote }: { onQuote: () => void }) {
  return (
    <section id="calculator" className="hp-cta-sec" aria-labelledby="hp-cta-title">
      <div className="hp-wrap">
        <div className="hp-cta">
          <div className="hp-cta-copy">
            <div className="hp-eyebrow is-lime">Clean Energy, Smart Savings</div>
            <h2 id="hp-cta-title">Switch to solar with a partner you can trust</h2>
            <p>Complete turnkey solar solutions for homes, industries and businesses — with high-quality products from leading brands and expert installation.</p>
            <ul className="hp-checks">
              {CHECKS.map(c => <li key={c}><CircleCheck size={20} />{c}</li>)}
            </ul>
            <div className="hp-cta-actions">
              <button className="hp-btn hp-btn-yellow" onClick={onQuote}><Sun size={20} /> Get a Quote <ArrowRight size={18} /></button>
              <button className="hp-btn hp-btn-ghost" onClick={onQuote}><Calculator size={20} /> Solar Savings Calculator</button>
            </div>
          </div>
          <div className="hp-cta-media">
            <img src="/assets/home/cta-solar.jpg" alt="Rows of solar panels under a cloudy blue sky" loading="lazy" />
            <div className="hp-cta-note">
              <span className="hp-cta-note-ico"><Landmark size={26} /></span>
              <div>
                <h3>Subsidy eligibility guidance</h3>
                <p>PM Surya Ghar: Muft Bijli Yojana and State Government schemes — ask our team.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
