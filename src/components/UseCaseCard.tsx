import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { UseCase } from '../data/useCases';
import Arrow from './Arrow';

export default function UseCaseCard({
  u,
  dark = false,
  animateLayout = false,
}: {
  u: UseCase;
  dark?: boolean;
  /** Animate position changes, used by the filtered grid. */
  animateLayout?: boolean;
}) {
  return (
    <motion.div
      className="uc-item"
      layout={animateLayout ? 'position' : false}
      initial={animateLayout ? { opacity: 0, scale: 0.94 } : false}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 36, opacity: { duration: 0.25 } }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/use-cases/${u.slug}/`} className={`uc-card${dark ? ' uc-card-dark' : ''}`}>
        <p className="tag-line">{u.industries.join(' · ')}</p>
        <h3 className="uc-title">{u.title}</h3>
        <p className="uc-summary">{u.summary}</p>
        <div className="uc-foot">
          <span className="uc-meta">
            {u.ai} <span aria-hidden="true">/</span> {u.fn}
          </span>
          <Arrow />
        </div>
      </Link>
    </motion.div>
  );
}
