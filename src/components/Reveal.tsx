import type { ComponentProps } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type Tag = 'div' | 'h1' | 'h2' | 'p' | 'li' | 'ul' | 'section' | 'tr' | 'form' | 'article';
type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -30 },
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps extends Omit<ComponentProps<typeof motion.div>, 'initial' | 'animate' | 'whileInView' | 'transition'> {
  as?: Tag;
  from?: Direction;
  delay?: number;
  duration?: number;
  scale?: number;
}

/** Scroll-triggered entrance: fades in and slides from `from` once ~20% is in view. */
export default function Reveal({ as = 'div', from = 'up', delay = 0, duration = 0.7, scale = 1, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as] as typeof motion.div;
  const { x, y } = OFFSETS[from];
  return (
    <Component
      initial={reduce ? false : { opacity: 0, x, y, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    />
  );
}
