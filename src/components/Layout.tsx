import { useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import Header from './Header';
import Footer from './Footer';
import NeuralBackground from './NeuralBackground';
import { metaFor } from '../seo';

function scrollToHashOrTop() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const el = id ? document.getElementById(id) : null;
  if (el) el.scrollIntoView();
  else window.scrollTo(0, 0);
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation();
  const prev = useRef<string | null>(null);

  useEffect(() => {
    const meta = metaFor(pathname);
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description);
  }, [pathname]);

  // Page changes scroll once the old page has faded out (see onExitComplete below).
  // This covers the first load with a #hash, and moves within the same page.
  useEffect(() => {
    const first = prev.current === null;
    const samePage = prev.current === pathname;
    prev.current = pathname;
    if (first) {
      if (hash) scrollToHashOrTop();
    } else if (samePage) {
      scrollToHashOrTop();
    }
  }, [pathname, hash]);

  const policy = pathname.endsWith('/privacy') || pathname.endsWith('/privacy/');

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      {!policy && <NeuralBackground />}
      <Header />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => requestAnimationFrame(scrollToHashOrTop)}
      >
        <motion.main
          id="main"
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  );
}
