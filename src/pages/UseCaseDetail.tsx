import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import Arrow from '../components/Arrow';
import UseCaseCard from '../components/UseCaseCard';
import NotFound from './NotFound';
import { getUseCase, relatedUseCases } from '../data/useCases';
import { EASE, Magnetic, Reveal, Stagger, StaggerItem } from '../components/motion';
import { aiSlug, mailto } from '../data/site';

export default function UseCaseDetail() {
  const { slug = '' } = useParams();
  const u = getUseCase(slug);
  if (!u) return <NotFound />;
  const related = relatedUseCases(u);

  return (
    <>
      <section className="page-head page-head-detail">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/use-cases/">Use cases</Link>
            <span aria-hidden="true">/</span>
            <span>{u.fn}</span>
          </nav>
          <motion.h1
            className="h1 narrow-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            {u.title}
          </motion.h1>
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            {u.summary}
          </motion.p>
          <Stagger as="ul" className="chips" gap={0.06}>
            {u.industries.map((i) => (
              <StaggerItem as="li" key={i}>
                {i}
              </StaggerItem>
            ))}
            <StaggerItem as="li">{u.fn}</StaggerItem>
            <StaggerItem as="li">
              <Link to={`/services/#${aiSlug(u.ai)}`} className="chip-link">
                {u.ai} <span aria-hidden="true">→</span>
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="section-tight">
        <div className="container detail-grid">
          <div className="detail-main">
            <Reveal>
              <h2 className="h3">The situation</h2>
              <p className="prose">{u.situation}</p>
            </Reveal>

            <Reveal>
              <h2 className="h3">What AI does here</h2>
            </Reveal>
            <Stagger as="ul" className="checklist" gap={0.07}>
              {u.does.map((d) => (
                <StaggerItem as="li" key={d}>
                  {d}
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal>
              <h2 className="h3">What to watch for</h2>
            </Reveal>
            <Stagger as="ul" className="watchlist" gap={0.07}>
              {u.watch.map((w) => (
                <StaggerItem as="li" key={w}>
                  {w}
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <aside className="detail-side">
            <Reveal className="side-card">
              <p className="tag-line">Illustrative example</p>
              <p>
                This describes what is possible. It is not a result from a client project, and it
                would be shaped around your own data and processes.
              </p>
            </Reveal>
            <Reveal className="side-card side-card-green" delay={0.1}>
              <h2 className="side-h">Think this could fit?</h2>
              <p>Tell us about your version of the problem.</p>
              <Magnetic strength={0.2}>
                <a
                  className="btn btn-light btn-sm"
                  href={mailto(`Use case: ${u.title}`, `Hello Cortavia,\n\nI read about "${u.title}" and would like to talk about it.\n`)}
                >
                  Email us <Arrow />
                </a>
              </Magnetic>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="section-tint section-tight">
        <div className="container">
          <Reveal>
            <h2 className="h3">Related use cases</h2>
          </Reveal>
          <Stagger className="uc-grid uc-grid-3" gap={0.1}>
            {related.map((r) => (
              <StaggerItem key={r.slug} className="uc-cell">
                <UseCaseCard u={r} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
