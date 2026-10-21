import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SYSTEM_TYPES, type SystemType } from './homeData';

const CARD_DELAYS = [0.1, 0.3, 0.5];

function SystemCard({ system, index, onEnquire }: { system: SystemType; index: number; onEnquire: (topic: string) => void }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="hp-sys-reveal"
      initial={reduce ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 70, damping: 16, delay: CARD_DELAYS[index] }}
    >
    <article className={`hp-sys-card is-${system.id}`}>
      <div className="hp-sys-img">
        <img src={system.img} alt={`${system.title} layout: how power flows between panels, inverter and home`} loading="lazy" />
      </div>
      <div className="hp-sys-body">
        <span className="hp-sys-tag">{system.tag}</span>
        <h3>{system.title}</h3>
        <p className="hp-sys-tagline">{system.tagline}</p>
        <ul className="hp-sys-points">
          {system.points.map((point) => (
            <li key={point}><span className="hp-sys-check"><Check size={13} strokeWidth={3} /></span>{point}</li>
          ))}
        </ul>
        <div className="hp-sys-best"><Sparkles size={14} />{system.best}</div>
        <button className="hp-link" onClick={() => onEnquire(system.title)}>Get a quote for this <ArrowRight size={15} /></button>
      </div>
    </article>
    </motion.div>
  );
}

export default function Solutions({ onEnquire }: { onEnquire: (topic: string) => void }) {
  const reduce = useReducedMotion();
  return (
    <section id="services" className="hp-solutions" aria-labelledby="hp-sol-title">
      <div className="hp-wrap">
        <motion.div
          className="hp-section-head"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="hp-eyebrow is-center">Solar System Types</div>
          <h2 id="hp-sol-title">Explore Solar Power Solutions</h2>
          <p>Understand the clear difference between On-Grid, Off-Grid, and Hybrid solar setups tailored for your energy needs.</p>
        </motion.div>
        <div className="hp-sys-grid">
          {SYSTEM_TYPES.map((system, i) => <SystemCard key={system.id} system={system} index={i} onEnquire={onEnquire} />)}
        </div>
      </div>
    </section>
  );
}
