import { ShieldCheck } from 'lucide-react';
import { BRANDS } from './homeData';

export default function TrustedBrands() {
  return (
    <div className="hp-wrap hp-brands-wrap">
      <section className="hp-brands" aria-labelledby="hp-brands-title">
        <div className="hp-brands-head">
          <h2 id="hp-brands-title" className="hp-brands-title"><ShieldCheck size={20} /> Our Trusted Brands</h2>
          <p>We provide only top-quality solar panels, inverters, cables and accessories from reputed brands.</p>
        </div>
        <ul className="hp-brand-grid">
          {BRANDS.map(b => (
            <li key={b.name} className="hp-brand">
              <img src={b.src} alt={b.name} width={b.w} height={b.h} loading="lazy" />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
