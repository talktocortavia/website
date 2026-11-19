import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import Logo from './Logo';
import { Magnetic } from './motion';
import { mailto } from '../data/site';

const links = [
  { to: '/', label: 'Home' },
  { to: '/use-cases/', label: 'Use cases' },
  { to: '/services/', label: 'Services' },
  { to: '/about/', label: 'About' },
  { to: '/careers/', label: 'Careers' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();

  // Slide away when scrolling down, come back on any scroll up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (y < 120) setHidden(false);
    else if (y > prev + 4) setHidden(true);
    else if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  const showLinks = !mobile || open;

  return (
    <motion.header
      className="site-header"
      animate={{ y: hidden && !open ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="container header-inner">
        <Logo />
        <nav id="primary-nav" className={`nav${open ? ' is-open' : ''}`} aria-label="Primary">
          {links.map((l, i) => (
            <motion.div
              key={l.to}
              className="nav-item"
              initial={false}
              animate={showLinks ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.4, delay: mobile && open ? 0.06 * i + 0.05 : 0 }}
            >
              <NavLink to={l.to} end={l.to === '/'} className="nav-link">
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="nav-underline"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
          <motion.div
            className="nav-item"
            initial={false}
            animate={showLinks ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.4, delay: mobile && open ? 0.06 * links.length + 0.05 : 0 }}
          >
            <Magnetic strength={0.2}>
              <a className="btn btn-primary btn-sm" href={mailto('Enquiry from cortavia.in')}>
                Get in touch
              </a>
            </Magnetic>
          </motion.div>
        </nav>
        <motion.button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="nav-toggle-bars" aria-hidden="true" />
        </motion.button>
      </div>
    </motion.header>
  );
}
