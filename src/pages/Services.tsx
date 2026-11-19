import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Arrow from '../components/Arrow';
import { EASE, Magnetic, Reveal, Stagger, StaggerItem } from '../components/motion';
import { capabilities, mailto } from '../data/site';
import { useCases } from '../data/useCases';

export default function Services() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Services
          </motion.p>
          <Reveal as="div" y={26}>
            <h1 className="h1">Six kinds of AI work. One way of working.</h1>
            <p className="lead">
              The use cases library shows the range of problems we take on. These are the building
              blocks behind it, and every solution is shaped around your documents, your tools and
              the way your team already works.
            </p>
          </Reveal>
          <ul className="chips chips-links" aria-label="Jump to a capability">
            {capabilities.map((c) => (
              <li key={c.id}>
                <motion.a href={`#${c.id}`} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
                  {c.title}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          {capabilities.map((c) => {
            const related = useCases.filter((u) => u.ai === c.ai);
            return (
              <article key={c.id} id={c.id} className="svc">
                <Reveal className="svc-head">
                  <span className="svc-n">{c.number}</span>
                  <h2 className="h2 svc-title">{c.title}</h2>
                  <p className="lead-sm">{c.blurb}</p>
                </Reveal>
                <div className="svc-body">
                  <Reveal delay={0.08}>
                    <p className="prose">{c.detail}</p>
                  </Reveal>
                  <div className="svc-cols">
                    <Reveal delay={0.12}>
                      <h3 className="mini-h">What it includes</h3>
                      <ul className="dash-list">
                        {c.includes.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </Reveal>
                    <Reveal delay={0.18}>
                      <h3 className="mini-h">Where it helps</h3>
                      <ul className="dash-list">
                        {c.helps.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </Reveal>
                  </div>
                  <Reveal delay={0.1} className="svc-uc">
                    <h3 className="mini-h">Example use cases</h3>
                    <ul className="svc-uc-list">
                      {related.slice(0, 4).map((u) => (
                        <li key={u.slug}>
                          <Link to={`/use-cases/${u.slug}/`}>{u.title}</Link>
                        </li>
                      ))}
                    </ul>
                    <Link className="text-link" to={`/use-cases/?type=${encodeURIComponent(c.ai)}`}>
                      See all {related.length} <Arrow />
                    </Link>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="cta" aria-labelledby="custom-h">
        <div className="container cta-inner">
          <Stagger gap={0.1}>
            <StaggerItem>
              <h2 id="custom-h" className="cta-title">
                Not on the list? Ask anyway.
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="cta-text">
                Many of our best conversations start with a problem nobody has a name for yet. Send
                us a few lines about it and we will tell you honestly whether AI can help.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="actions">
                <Magnetic>
                  <a className="btn btn-light" href={mailto('A custom AI solution')}>
                    Email us <Arrow />
                  </a>
                </Magnetic>
                <Magnetic>
                  <Link className="btn btn-outline-light" to="/use-cases/">
                    Browse use cases
                  </Link>
                </Magnetic>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </>
  );
}
