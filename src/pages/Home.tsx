import { Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import heroMark from '../assets/mark-960.webp';
import Arrow from '../components/Arrow';
import UseCaseCard from '../components/UseCaseCard';
import { EASE, Magnetic, Reveal, Stagger, StaggerItem } from '../components/motion';
import { featuredSlugs, getUseCase, useCases, type UseCase } from '../data/useCases';
import { SITE, capabilities, mailto, principles, steps, techStack } from '../data/site';

const featured = featuredSlugs
  .map((s) => getUseCase(s))
  .filter((u): u is UseCase => Boolean(u));

function Words({
  children,
  delay = 0,
  className = '',
}: {
  children: string;
  delay?: number;
  className?: string;
}) {
  return (
    <>
      {children.split(' ').map((w, i) => (
        <Fragment key={i}>
          <span className={`word-mask ${className}`}>
            <motion.span
              className="word"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, delay: delay + i * 0.07, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>{' '}
        </Fragment>
      ))}
    </>
  );
}

function HeroMark() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-1, 1], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(px, [-1, 1], [-8, 8]), { stiffness: 120, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <motion.div
      ref={ref}
      className="hero-mark"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.25, ease: EASE }}
      style={{ y: reduce ? 0 : scrollY, rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, perspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width) * 2 - 1);
        py.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.img
        src={heroMark}
        width={960}
        height={960}
        alt=""
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

function StepsLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  return (
    <div ref={ref} className="steps-track" aria-hidden="true">
      <motion.div className="steps-line" style={{ scaleX }} />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Online AI solutions company
            </motion.p>
            <h1 className="hero-title">
              <Words delay={0.1}>AI that</Words>
              <span className="hl-group">
                <Words delay={0.3} className="hl">
                  earns its place
                </Words>
                <motion.span
                  className="hl-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
                />
              </span>{' '}
              <Words delay={0.5}>in your business.</Words>
            </h1>
            <motion.p
              className="lead"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
            >
              Cortavia helps teams find the places where AI genuinely helps, then builds it to fit
              how they already work. No jargon, and no AI for its own sake.
            </motion.p>
            <motion.div
              className="actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            >
              <Magnetic>
                <Link className="btn btn-primary" to="/use-cases/">
                  Explore use cases <Arrow />
                </Link>
              </Magnetic>
              <Magnetic>
                <a className="btn btn-ghost" href={mailto('Enquiry from cortavia.in')}>
                  Talk to us
                </a>
              </Magnetic>
            </motion.div>
          </div>
          <HeroMark />
        </div>
        <div className="container">
          <Stagger as="ul" className="ledger" gap={0.12}>
            <StaggerItem as="li">
              <span className="ledger-k">Remote-first</span>
              <span className="ledger-v">We work with clients online, wherever they are.</span>
            </StaggerItem>
            <StaggerItem as="li">
              <span className="ledger-k">Fits your tools</span>
              <span className="ledger-v">Built around the systems and documents you already use.</span>
            </StaggerItem>
            <StaggerItem as="li">
              <span className="ledger-k">People in the loop</span>
              <span className="ledger-v">Important decisions stay with the people responsible.</span>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="section" aria-labelledby="what-we-do">
        <div className="container split">
          <div className="split-head">
            <p className="eyebrow">What we do</p>
            <h2 id="what-we-do" className="h2">
              Six kinds of AI work, one way of working.
            </h2>
            <p className="muted">
              Each one starts from a real piece of work in your organisation. The use cases library
              shows the range; these are the building blocks behind it.
            </p>
          </div>
          <ol className="rows">
            {capabilities.map((c) => {
              const n = useCases.filter((u) => u.ai === c.ai).length;
              return (
                <Reveal as="li" key={c.id} className="row">
                  <span className="row-n">{c.number}</span>
                  <div className="row-body">
                    <h3 className="row-title">{c.title}</h3>
                    <p>{c.blurb}</p>
                    <p className="row-count">{n} use cases</p>
                  </div>
                  <Link
                    className="row-link"
                    to={`/services/#${c.id}`}
                    aria-label={`Read about ${c.title}`}
                  >
                    <Arrow />
                  </Link>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="how-we-work">
        <div className="container">
          <p className="eyebrow">How we work</p>
          <h2 id="how-we-work" className="h2 narrow">
            Small steps, shown early, handed over properly.
          </h2>
          <StepsLine />
          <Stagger as="ol" className="steps" gap={0.14}>
            {steps.map((s) => (
              <StaggerItem as="li" key={s.n} className="step">
                <span className="step-n">{s.n}</span>
                <h3 className="step-title">{s.title}</h3>
                <p>{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="band" aria-labelledby="use-cases-h">
        <div className="container">
          <div className="band-head">
            <div>
              <p className="eyebrow eyebrow-light">Use cases</p>
              <h2 id="use-cases-h" className="h2">
                Where AI actually helps.
              </h2>
            </div>
            <p className="band-note">
              A library of {useCases.length} illustrative examples across industries and functions.
              They show what is possible. They are not client results.
            </p>
          </div>
          <Stagger className="uc-grid uc-grid-band" gap={0.1}>
            {featured.map((u) => (
              <StaggerItem key={u.slug} className="uc-cell">
                <UseCaseCard u={u} dark />
              </StaggerItem>
            ))}
          </Stagger>
          <div className="band-foot">
            <Link className="btn btn-light" to="/use-cases/">
              Browse all {useCases.length} use cases <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="principles-h">
        <div className="container split">
          <div className="split-head">
            <p className="eyebrow">How we think</p>
            <h2 id="principles-h" className="h2">
              We would rather tell you AI is not the answer than sell you one that is.
            </h2>
          </div>
          <Stagger as="dl" className="principles" gap={0.1}>
            {principles.map((p) => (
              <StaggerItem key={p.title} className="principle">
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="tech-h">
        <div className="container">
          <p className="eyebrow">Technology foundations</p>
          <h2 id="tech-h" className="h2 narrow">
            Built with the frontier AI stack.
          </h2>
          <p className="muted tech-intro">
            We combine leading open-source agent frameworks with the best proprietary models, and
            choose per project rather than by habit.
          </p>
          <Stagger as="ul" className="tech-grid" gap={0.07}>
            {techStack.map((t) => (
              <StaggerItem as="li" key={t.id} className="tech-item">
                <motion.div className="tech-card" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <span className="tech-logo">
                    <img src={`/images/tech/${t.id}.webp`} alt="" loading="lazy" width={44} height={44} />
                  </span>
                  <h3 className="tech-name">{t.name}</h3>
                  <span className="tech-cat">{t.category}</span>
                  <p className="tech-desc">{t.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="cta" aria-labelledby="cta-h">
        <div className="container cta-inner">
          <h2 id="cta-h" className="cta-title">
            Have a process in mind?
          </h2>
          <p className="cta-text">
            Tell us what takes too long, or goes wrong too often. We will tell you honestly whether
            AI can help.
          </p>
          <div className="actions">
            <Magnetic>
              <a className="btn btn-light" href={mailto('A process I would like to look at')}>
                Email {SITE.email}
              </a>
            </Magnetic>
            <Magnetic>
              <Link className="btn btn-outline-light" to="/services/">
                See our services
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
