import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Logo from './Logo';
import { SITE, mailto } from '../data/site';

export default function Footer() {
  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -5% 0px' }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p className="footer-tag">{SITE.tagline}.</p>
          <p className="footer-note">
            An online AI solutions company. We work with clients remotely.
          </p>
        </div>
        <nav className="footer-col" aria-label="Explore">
          <h2 className="footer-h">Explore</h2>
          <Link to="/use-cases/">Use cases</Link>
          <Link to="/services/">Services</Link>
          <Link to="/about/">About</Link>
          <Link to="/careers/">Careers</Link>
        </nav>
        <div className="footer-col">
          <h2 className="footer-h">Contact</h2>
          <a href={mailto()}>{SITE.email}</a>
          <p className="footer-small">We reply within 24 hours.</p>
        </div>
      </div>
      <div className="container footer-base">
        <span>
          © {SITE.year} {SITE.legalName}
        </span>
        <span>cortavia.in</span>
      </div>
    </motion.footer>
  );
}
