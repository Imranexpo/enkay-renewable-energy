import { useEffect, useId, useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import { INVERTER_BRANDS, PANEL_BRANDS, type Brand } from './homeData';

const SPEED = 28; // px per second — slow, calm drift
const RESUME_DELAY = 1200; // ms to wait after a touch/drag before drifting again

function BrandCard({ brand, hidden }: { brand: Brand; hidden: boolean }) {
  return (
    <li className="hp-brand" title={brand.name} aria-hidden={hidden || undefined}>
      {brand.src ? (
        <img src={brand.src} alt={brand.name} loading="lazy" draggable={false} />
      ) : (
        <span className={`hp-wm hp-wm-${brand.slug}`} role="img" aria-label={brand.name}>
          <b>{brand.mark![0]}</b>
          {brand.mark![1] && <i>{brand.mark![1]}</i>}
        </span>
      )}
    </li>
  );
}

/**
 * One marquee row. The list is rendered twice and scrolled by exactly one list-width,
 * so the loop is seamless. It is a real scroll container, so touch/trackpad dragging works;
 * the drift pauses while hovered, focused or touched.
 */
function MarqueeRow({ label, brands, dir }: { label: string; brands: Brand[]; dir: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const sign = dir === 'left' ? 1 : -1;
    let pos = 0;
    let last = 0;
    let raf = 0;
    let paused = false;
    let resumeTimer = 0;
    let started = false;

    const half = () => el.scrollWidth / 2;

    const tick = (t: number) => {
      const dt = Math.min((t - (last || t)) / 1000, 0.05);
      last = t;
      const h = half();
      if (h > el.clientWidth) {
        if (!started) {
          pos = dir === 'left' ? 0 : h;
          started = true;
        }
        if (paused) {
          pos = el.scrollLeft; // follow the user's own scrolling
        } else {
          pos += sign * SPEED * dt;
        }
        if (pos >= h) pos -= h;
        if (pos < 0) pos += h;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };

    const pause = () => { window.clearTimeout(resumeTimer); paused = true; };
    const resume = (delay = 0) => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => { pos = el.scrollLeft; paused = false; }, delay);
    };
    const onEnter = (e: PointerEvent) => { if (e.pointerType === 'mouse') pause(); };
    const onLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse') resume(); };
    const onTouchStart = () => pause();
    const onTouchEnd = () => resume(RESUME_DELAY);
    const onFocusIn = () => pause();
    const onFocusOut = () => resume();

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);
    el.addEventListener('focusin', onFocusIn);
    el.addEventListener('focusout', onFocusOut);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      el.removeEventListener('focusin', onFocusIn);
      el.removeEventListener('focusout', onFocusOut);
    };
  }, [dir]);

  return (
    <div className="hp-brand-cat">
      <h3 className="hp-brand-cat-title">{label}</h3>
      <div className="hp-marquee" ref={ref}>
        {[0, 1].map(group => (
          <ul
            key={group}
            className="hp-marquee-track"
            aria-label={group === 0 ? label : undefined}
            aria-hidden={group === 1 || undefined}
          >
            {/* repeated so one track is always wider than the visible row */}
            {[0, 1].flatMap(copy =>
              brands.map(b => (
                <BrandCard key={`${copy}-${b.name}`} brand={b} hidden={group === 1 || copy === 1} />
              )),
            )}
          </ul>
        ))}
      </div>
    </div>
  );
}

interface TrustedBrandsProps {
  /** Section heading — "Our Trusted Brands" on Home, "Premium Quality Brands" on About. */
  title?: string;
  /** Pull the card up over the bottom edge of the hero (Home only). */
  overlap?: boolean;
}

export default function TrustedBrands({ title = 'Our Trusted Brands', overlap = false }: TrustedBrandsProps) {
  const titleId = useId();
  return (
    <div className={`hp-wrap hp-brands-wrap${overlap ? ' is-overlap' : ''}`}>
      <section className="hp-brands" aria-labelledby={titleId}>
        <div className="hp-brands-head">
          <h2 id={titleId} className="hp-brands-title"><ShieldCheck size={20} /> {title}</h2>
          <p>We provide only top-quality solar panels, inverters, cables and accessories from reputed brands.</p>
        </div>
        <MarqueeRow label="PV panels Brands (N-Type, Bi-Facial)" brands={PANEL_BRANDS} dir="left" />
        <MarqueeRow label="Inverter Brands" brands={INVERTER_BRANDS} dir="right" />
      </section>
    </div>
  );
}
