import { Sun } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { WHY_POINTS } from './homeData';

const VIEW = { once: true, amount: 0.2 };

export default function WhyChoose() {
  const reduce = useReducedMotion();
  const from = (x: number, y: number, scale = 1) => (reduce ? false : { opacity: 0, x, y, scale } as const);
  const shown = { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <section id="about" className="hp-why" aria-labelledby="hp-why-title">
      <div className="hp-wrap hp-why-grid">
        <motion.div
          className="hp-collage-reveal"
          initial={from(-60, 0, 0.95)}
          whileInView={shown}
          viewport={VIEW}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="hp-collage">
            <img className="hp-collage-a" src="/assets/home/why-installers.jpg" alt="ENKAY installers fitting a solar panel on a roof" loading="lazy" />
            <img className="hp-collage-b" src="/assets/home/why-building.jpg" alt="Solar array on a completed building" loading="lazy" />
            <div className="hp-collage-badge">
              <Sun size={32} />
              <div><strong>Concept to Commissioning</strong><span>Complete turnkey solar EPC</span></div>
            </div>
          </div>
        </motion.div>
        <div>
          <motion.div
            initial={from(30, -20)}
            whileInView={shown}
            viewport={VIEW}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="hp-eyebrow">Why Choose ENKAY?</div>
            <h2 id="hp-why-title">Your trusted partner for clean, reliable solar power</h2>
          </motion.div>
          <ul className="hp-why-list">
            {WHY_POINTS.map(({ icon: Icon, yellow, title, text }, i) => (
              <motion.li
                key={title}
                initial={from(40, 0)}
                whileInView={shown}
                viewport={VIEW}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
              >
                <div className="hp-why-item">
                  <span className={`hp-ico-circle${yellow ? ' is-yellow' : ''}`}><Icon size={24} /></span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
