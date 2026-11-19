import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Arrow from '../components/Arrow';
import { EASE, Magnetic, Reveal, Stagger, StaggerItem } from '../components/motion';
import { perks, roles, type Role } from '../data/careers';
import { SITE, mailto } from '../data/site';

function applyLink(role: Role) {
  return mailto(
    `Application for ${role.title} - [Your Name]`,
    `Hi Cortavia team,\n\nPlease find attached my resume for the ${role.title} position.\n\nLinkedIn / portfolio: \n\nThank you,\n[Your Name]`,
  );
}

function RoleCard({ role, defaultOpen }: { role: Role; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `role-${role.id}`;
  return (
    <Reveal as="article" className="role" id={role.id}>
      <button
        type="button"
        className="role-head"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="role-main">
          <span className="role-title">{role.title}</span>
          <span className="role-meta">
            {role.team} · {role.type} · {role.location}
          </span>
        </span>
        <motion.span
          className="role-plus"
          aria-hidden="true"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className="role-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="role-body">
              <p className="lead-sm">{role.summary}</p>
              <div className="svc-cols">
                <div>
                  <h3 className="mini-h">What you will do</h3>
                  <ul className="dash-list">
                    {role.doing.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mini-h">Who we are looking for</h3>
                  <ul className="dash-list">
                    {role.looking.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Magnetic>
                <a className="btn btn-primary" href={applyLink(role)}>
                  Apply by email <Arrow />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

export default function Careers() {
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
            Careers
          </motion.p>
          <Reveal y={26}>
            <h1 className="h1">Help us make AI do useful work.</h1>
            <p className="lead">
              Cortavia is a small, fully online team. We are looking for people who like explaining
              difficult things simply and who want to learn by working on real problems.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="open-roles">
        <div className="container split">
          <div className="split-head">
            <p className="eyebrow">Open roles</p>
            <h2 id="open-roles" className="h2">
              Currently hiring.
            </h2>
            <p className="muted">We review applications on a rolling basis.</p>
          </div>
          <div className="roles">
            {roles.map((r, i) => (
              <RoleCard key={r.id} role={r} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="why-h">
        <div className="container split">
          <div className="split-head">
            <p className="eyebrow">Working here</p>
            <h2 id="why-h" className="h2">
              What you can expect.
            </h2>
          </div>
          <Stagger as="dl" className="principles" gap={0.1}>
            {perks.map((p) => (
              <StaggerItem key={p.k} className="principle">
                <dt>{p.k}</dt>
                <dd>{p.v}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="cta" aria-labelledby="apply-h">
        <div className="container cta-inner">
          <Stagger gap={0.1}>
            <StaggerItem>
              <h2 id="apply-h" className="cta-title">
                Do not see a role that fits?
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="cta-text">
                Send your resume and a line about what you would like to work on, along with a link
                to your portfolio or LinkedIn. We will get back to qualified candidates within a few
                days.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="actions">
                <Magnetic>
                  <a className="btn btn-light" href={mailto('Careers at Cortavia')}>
                    Email {SITE.email} <Arrow />
                  </a>
                </Magnetic>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </>
  );
}
