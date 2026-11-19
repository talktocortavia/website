import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import UseCaseCard from '../components/UseCaseCard';
import UseCaseGraph, { type GroupKey, type Selection } from '../components/UseCaseGraph';
import {
  AI_TYPES,
  FUNCTIONS,
  INDUSTRIES,
  useCases,
  type UseCase,
} from '../data/useCases';
import { EASE, Reveal } from '../components/motion';

const EMPTY: Selection = { industry: [], fn: [], ai: [] };

const GROUPS: { key: GroupKey; param: string; label: string; options: readonly string[] }[] = [
  { key: 'industry', param: 'industry', label: 'Industry', options: INDUSTRIES },
  { key: 'fn', param: 'function', label: 'Business function', options: FUNCTIONS },
  { key: 'ai', param: 'type', label: 'Type of AI', options: AI_TYPES },
];

function matches(u: UseCase, sel: Selection, q: string, skip?: GroupKey): boolean {
  if (skip !== 'industry' && sel.industry.length && !u.industries.some((i) => sel.industry.includes(i)))
    return false;
  if (skip !== 'fn' && sel.fn.length && !sel.fn.includes(u.fn)) return false;
  if (skip !== 'ai' && sel.ai.length && !sel.ai.includes(u.ai)) return false;
  if (q) {
    const hay = `${u.title} ${u.summary} ${u.industries.join(' ')} ${u.fn} ${u.ai}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function optionValueMatches(u: UseCase, key: GroupKey, option: string): boolean {
  if (key === 'industry') return u.industries.includes(option as UseCase['industries'][number]);
  if (key === 'fn') return u.fn === option;
  return u.ai === option;
}

export default function UseCases() {
  const [sel, setSel] = useState<Selection>(EMPTY);
  const [query, setQuery] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const ready = useRef(false);

  // Read filters from the address once, after hydration.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const next: Selection = { industry: [], fn: [], ai: [] };
    for (const g of GROUPS) {
      const raw = p.get(g.param);
      if (raw) next[g.key] = raw.split(',').filter((v) => g.options.includes(v));
    }
    setSel(next);
    setQuery(p.get('q') ?? '');
    ready.current = true;
  }, []);

  // Keep the address in step with the filters so a view can be shared.
  useEffect(() => {
    if (!ready.current) return;
    const p = new URLSearchParams();
    for (const g of GROUPS) if (sel[g.key].length) p.set(g.param, sel[g.key].join(','));
    if (query.trim()) p.set('q', query.trim());
    const qs = p.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
  }, [sel, query]);

  const q = query.trim().toLowerCase();
  const visible = useMemo(() => useCases.filter((u) => matches(u, sel, q)), [sel, q]);
  const activeCount = sel.industry.length + sel.fn.length + sel.ai.length;

  const toggle = (key: GroupKey, option: string) =>
    setSel((s) => ({
      ...s,
      [key]: s[key].includes(option) ? s[key].filter((o) => o !== option) : [...s[key], option],
    }));

  const clear = () => {
    setSel(EMPTY);
    setQuery('');
  };

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Use cases</p>
          <Reveal y={26}>
            <h1 className="h1">Where AI helps, by industry, function and type.</h1>
            <p className="lead">
              A growing library of illustrative examples. Each one describes a common problem, what
              AI can do about it, and what to watch for. They show what is possible. They are not
              client results.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="uc-graph-band">
        <div className="container">
          <div className="uc-toolbar">
            <label className="search">
              <span className="sr-only">Search use cases</span>
              <input
                type="search"
                placeholder="Search use cases"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <p className="result-count" role="status" aria-live="polite">
              {visible.length} of {useCases.length} use cases
            </p>
            <button type="button" className="link-btn link-btn-light" onClick={clear} disabled={!activeCount && !q}>
              Clear
            </button>
          </div>
          <div className="ug-wrap">
            <UseCaseGraph sel={sel} visible={visible} all={useCases} onToggle={toggle} />
          </div>
          <p className="ug-hint">Select an industry, a type of AI or a function. The traces show which use cases connect them.</p>

          <aside className={`filters${panelOpen ? ' is-open' : ''}`} aria-label="Filter use cases">
            <button
              type="button"
              className="filters-toggle"
              aria-expanded={panelOpen}
              aria-controls="filter-panel"
              onClick={() => setPanelOpen((o) => !o)}
            >
              Filters{activeCount ? ` (${activeCount})` : ''}
            </button>
            <div id="filter-panel" className="filters-panel">
              {GROUPS.map((g) => (
                <fieldset key={g.key} className="fgroup">
                  <legend>{g.label}</legend>
                  {g.options.map((o) => {
                    const checked = sel[g.key].includes(o);
                    const count = useCases.filter(
                      (u) => matches(u, sel, q, g.key) && optionValueMatches(u, g.key, o),
                    ).length;
                    return (
                      <label key={o} className={`fopt${count === 0 && !checked ? ' is-empty' : ''}`}>
                        <input type="checkbox" checked={checked} onChange={() => toggle(g.key, o)} />
                        <span className="fopt-label">{o}</span>
                        <span className="fopt-count">{count}</span>
                      </label>
                    );
                  })}
                </fieldset>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="uc-results">
            <LayoutGroup>
              <motion.div className="uc-grid uc-grid-3" layout>
                <AnimatePresence initial={false} mode="popLayout">
                  {visible.map((u) => (
                    <UseCaseCard key={u.slug} u={u} animateLayout />
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
            <AnimatePresence>
              {visible.length === 0 && (
                <motion.div
                  className="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="empty-title">Nothing matches those filters.</p>
                  <p>Try removing one, or search for a different word.</p>
                  <button type="button" className="btn btn-primary btn-sm" onClick={clear}>
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
