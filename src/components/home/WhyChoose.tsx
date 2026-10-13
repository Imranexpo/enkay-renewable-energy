import { Sun } from 'lucide-react';
import { WHY_POINTS } from './homeData';

export default function WhyChoose() {
  return (
    <section id="about" className="hp-why" aria-labelledby="hp-why-title">
      <div className="hp-wrap hp-why-grid">
        <div className="hp-collage">
          <img className="hp-collage-a" src="/assets/home/why-installers.jpg" alt="ENKAY installers fitting a solar panel on a roof" loading="lazy" />
          <img className="hp-collage-b" src="/assets/home/why-building.jpg" alt="Solar array on a completed building" loading="lazy" />
          <div className="hp-collage-badge">
            <Sun size={32} />
            <div><strong>Concept to Commissioning</strong><span>Complete turnkey solar EPC</span></div>
          </div>
        </div>
        <div>
          <div className="hp-eyebrow">Why Choose ENKAY?</div>
          <h2 id="hp-why-title">Your trusted partner for clean, reliable solar power</h2>
          <ul className="hp-why-list">
            {WHY_POINTS.map(({ icon: Icon, yellow, title, text }) => (
              <li key={title} className="hp-why-item">
                <span className={`hp-ico-circle${yellow ? ' is-yellow' : ''}`}><Icon size={24} /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
