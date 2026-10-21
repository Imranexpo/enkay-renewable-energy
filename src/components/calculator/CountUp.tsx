import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

interface CountUpProps {
  value: number;
  format: (n: number) => string;
  duration?: number;
  /** Wait until scrolled into view before counting (for static page content). */
  onView?: boolean;
}

/** Counts from 0 up to `value`, re-running whenever `value` changes. */
export default function CountUp({ value, format, duration = 1.1, onView = false }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce || (onView && !inView)) {
      node.textContent = format(onView && !inView ? 0 : value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: v => { node.textContent = format(v); },
    });
    return () => controls.stop();
  }, [value, format, duration, onView, inView, reduce]);

  return <span ref={ref}>{format(value)}</span>;
}
