import { ArrowRight } from 'lucide-react';
import { SOLUTIONS } from './homeData';

export default function Solutions({ onEnquire }: { onEnquire: (topic: string) => void }) {
  return (
    <section id="services" className="hp-solutions" aria-labelledby="hp-sol-title">
      <div className="hp-wrap">
        <div className="hp-section-head">
          <div className="hp-eyebrow is-center">Our Solutions</div>
          <h2 id="hp-sol-title">End-to-end solar for every need</h2>
          <p>From rooftop homes to large industrial plants — designed, supplied, installed and commissioned by ENKAY.</p>
        </div>
        <div className="hp-sol-grid">
          {SOLUTIONS.map(({ icon: Icon, img, title, text }) => (
            <article key={title} className="hp-sol-card">
              <div className="hp-sol-img">
                <img src={img} alt={title} loading="lazy" />
                <span className="hp-sol-ico"><Icon size={26} /></span>
              </div>
              <div className="hp-sol-body">
                <h3>{title}</h3>
                <p>{text}</p>
                <button className="hp-link" onClick={() => onEnquire(title)}>Learn more <ArrowRight size={15} /></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
