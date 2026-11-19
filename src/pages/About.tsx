import { motion } from 'motion/react';
import Arrow from '../components/Arrow';
import { EASE, Magnetic, Reveal, Stagger, StaggerItem } from '../components/motion';
import { SITE, mailto, principles } from '../data/site';

export default function About() {
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
            About
          </motion.p>
          <Reveal y={26}>
            <h1 className="h1">Helping businesses think beyond traditional AI.</h1>
            <p className="lead">
              Cortavia is an online AI solutions company. We are a team of AI experts, data
              scientists and business consultants who want AI to do useful, practical work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container split">
          <div className="split-head">
            <p className="eyebrow">Who we are</p>
            <h2 className="h2">Fully online, close to your problem.</h2>
          </div>
          <Reveal className="prose-col">
            <p className="prose">
              We work entirely online, partnering with clients remotely to understand their
              challenges, find the opportunities, and build AI that fits the way they already work.
            </p>
            <div className="vm">
              <div>
                <h3 className="mini-h">Our vision</h3>
                <p>
                  A future where AI is part of every part of business operations, making
                  organisations more agile, more data-driven and more centred on their customers.
                </p>
              </div>
              <div>
                <h3 className="mini-h">Our mission</h3>
                <p>
                  Deliver production-ready AI that solves real business problems, technically strong
                  and aligned with each client’s goals.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="approach-h">
        <div className="container split">
          <div className="split-head">
            <p className="eyebrow">Our approach</p>
            <h2 id="approach-h" className="h2">
              What you can expect from us.
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

      <section id="contact" className="cta" aria-labelledby="contact-h">
        <div className="container cta-inner">
          <p className="eyebrow eyebrow-light">Get in touch</p>
          <h2 id="contact-h" className="cta-title">
            Reach us by email.
          </h2>
          <p className="cta-text">We will get back to you within 24 hours.</p>
          <Magnetic>
            <a className="cta-mail" href={mailto('Enquiry from cortavia.in')}>
              {SITE.email} <Arrow />
            </a>
          </Magnetic>
        </div>
      </section>
    </>
  );
}
