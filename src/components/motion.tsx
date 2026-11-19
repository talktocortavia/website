import { useRef, type ElementType, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
  type Variants,
} from 'motion/react';

export const EASE = [0.2, 0.7, 0.2, 1] as const;

/** Fades and lifts its children into view the first time they scroll on screen. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  as = 'div',
  className,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'section' | 'article' | 'p' | 'dl' | 'ol' | 'ul' | 'span';
  className?: string;
} & Omit<HTMLMotionProps<'div'>, 'children' | 'className'>) {
  const Tag = motion[as] as ElementType;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export const staggerParent = (gap = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren } },
});

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/** Container whose direct <StaggerItem> children reveal one after another. */
export function Stagger({
  children,
  as = 'div',
  className,
  gap = 0.08,
}: {
  children: ReactNode;
  as?: 'div' | 'ul' | 'ol' | 'dl' | 'section';
  className?: string;
  gap?: number;
}) {
  const Tag = motion[as] as ElementType;
  return (
    <Tag
      className={className}
      variants={staggerParent(gap)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  as = 'div',
  className,
}: {
  children: ReactNode;
  as?: 'div' | 'li';
  className?: string;
}) {
  const Tag = motion[as] as ElementType;
  return (
    <Tag className={className} variants={staggerChild}>
      {children}
    </Tag>
  );
}

/** Nudges its child toward the pointer, like a magnet. Off for touch and reduced motion. */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="magnetic"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
