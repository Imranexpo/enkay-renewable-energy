import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from './homeData';

export default function Products({ onViewAll, onEnquire }: { onViewAll: () => void; onEnquire: (topic: string) => void }) {
  return (
    <section id="products" className="hp-products" aria-labelledby="hp-prod-title">
      <div className="hp-wrap">
        <div className="hp-products-head">
          <div>
            <div className="hp-eyebrow">Product Highlights</div>
            <h2 id="hp-prod-title">Quality components for every system</h2>
          </div>
          <button className="hp-link hp-link-strong" onClick={onViewAll}>View Products &amp; Brands <ArrowRight size={18} /></button>
        </div>
        <div className="hp-prod-grid">
          {PRODUCTS.map(p => (
            <button key={p.title} className="hp-prod" onClick={() => onEnquire(p.title)}>
              <img src={p.img} alt={p.title} loading="lazy" />
              <span className="hp-prod-foot">
                <h3>{p.title}</h3>
                <span className="hp-prod-arrow"><ArrowUpRight size={16} /></span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
