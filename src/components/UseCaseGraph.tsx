import { useMemo, useState } from 'react';
import { AI_TYPES, FUNCTIONS, INDUSTRIES, type UseCase } from '../data/useCases';

export type GroupKey = 'industry' | 'fn' | 'ai';
export type Selection = Record<GroupKey, string[]>;

type NodeDef = { id: string; key: GroupKey; label: string; x: number; y: number };

const W = 1000;
const H = 548;
const X_IND = 246;
const X_AI = 500;
const X_FN = 754;
const PILL_W = 176;
const TOP = 62;

function column(key: GroupKey, labels: readonly string[], x: number, bottom: number): NodeDef[] {
  const step = labels.length > 1 ? (bottom - TOP) / (labels.length - 1) : 0;
  return labels.map((label, i) => ({ id: `${key}:${label}`, key, label, x, y: TOP + i * step }));
}

const INDUSTRY_NODES = column('industry', INDUSTRIES, X_IND, H - 30);
const AI_NODES = column('ai', AI_TYPES, X_AI, H - 30);
const FN_NODES = column('fn', FUNCTIONS, X_FN, H - 30);
const BY_ID = new Map([...INDUSTRY_NODES, ...AI_NODES, ...FN_NODES].map((n) => [n.id, n]));

/** A circuit trace: horizontal, one vertical run, horizontal, with rounded corners. */
function trace(x1: number, y1: number, x2: number, y2: number, bend: number): string {
  const mid = x1 + (x2 - x1) * bend;
  const dy = y2 - y1;
  if (Math.abs(dy) < 1) return `M${x1} ${y1}H${x2}`;
  const r = Math.min(9, Math.abs(dy) / 2, Math.abs(mid - x1), Math.abs(x2 - mid));
  const s = dy > 0 ? 1 : -1;
  return [
    `M${x1} ${y1}`,
    `H${mid - r}`,
    `Q${mid} ${y1} ${mid} ${y1 + s * r}`,
    `V${y2 - s * r}`,
    `Q${mid} ${y2} ${mid + r} ${y2}`,
    `H${x2}`,
  ].join('');
}

interface Edge {
  id: string;
  from: string;
  to: string;
  d: string;
}

const pillLeft = X_AI - PILL_W / 2;
const pillRight = X_AI + PILL_W / 2;

function edgeFor(a: NodeDef, b: NodeDef, side: 'left' | 'right', salt: number): Edge {
  const bend = 0.1 + ((salt * 47) % 80) / 100; // spread the vertical runs so traces do not stack
  if (side === 'left') {
    return { id: `${a.id}|${b.id}`, from: a.id, to: b.id, d: trace(a.x + 7, a.y, pillLeft, b.y, bend) };
  }
  return { id: `${a.id}|${b.id}`, from: a.id, to: b.id, d: trace(pillRight, a.y, b.x - 7, b.y, bend) };
}

const ALL_EDGES: Edge[] = [];
INDUSTRY_NODES.forEach((i, ii) =>
  AI_NODES.forEach((a, ai) => ALL_EDGES.push(edgeFor(i, a, 'left', ii * 7 + ai))),
);
AI_NODES.forEach((a, ai) =>
  FN_NODES.forEach((f, fi) => ALL_EDGES.push(edgeFor(a, f, 'right', ai * 5 + fi + 3))),
);

function pairsOf(list: UseCase[]): Map<string, number> {
  const m = new Map<string, number>();
  const add = (k: string) => m.set(k, (m.get(k) ?? 0) + 1);
  for (const u of list) {
    for (const ind of u.industries) add(`industry:${ind}|ai:${u.ai}`);
    add(`ai:${u.ai}|fn:${u.fn}`);
  }
  return m;
}

export default function UseCaseGraph({
  sel,
  visible,
  all,
  onToggle,
}: {
  sel: Selection;
  visible: UseCase[];
  all: UseCase[];
  onToggle: (key: GroupKey, label: string) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);

  const possible = useMemo(() => pairsOf(all), [all]);
  const live = useMemo(() => pairsOf(visible), [visible]);

  const counts = useMemo(() => {
    const c = new Map<string, number>();
    for (const u of visible) {
      for (const i of u.industries) c.set(`industry:${i}`, (c.get(`industry:${i}`) ?? 0) + 1);
      c.set(`ai:${u.ai}`, (c.get(`ai:${u.ai}`) ?? 0) + 1);
      c.set(`fn:${u.fn}`, (c.get(`fn:${u.fn}`) ?? 0) + 1);
    }
    return c;
  }, [visible]);

  const isSelected = (n: NodeDef) => sel[n.key].includes(n.label);
  const edges = ALL_EDGES.filter((e) => possible.has(e.id));

  const toggle = (n: NodeDef) => onToggle(n.key, n.label);

  const renderNode = (n: NodeDef) => {
    const selected = isSelected(n);
    const count = counts.get(n.id) ?? 0;
    const dim = count === 0 && !selected;
    const cls = `gn gn-${n.key}${selected ? ' is-sel' : ''}${dim ? ' is-dim' : ''}${hover === n.id ? ' is-hover' : ''}`;
    const label = `${n.label}, ${count} use case${count === 1 ? '' : 's'}`;
    const onKey = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle(n);
      }
    };
    const common = {
      className: cls,
      role: 'checkbox' as const,
      'aria-checked': selected,
      'aria-label': label,
      tabIndex: 0,
      onClick: () => toggle(n),
      onKeyDown: onKey,
      onMouseEnter: () => setHover(n.id),
      onMouseLeave: () => setHover(null),
      onFocus: () => setHover(n.id),
      onBlur: () => setHover(null),
    };
    if (n.key === 'ai') {
      return (
        <g key={n.id} {...common}>
          <rect className="gn-pill" x={pillLeft} y={n.y - 17} width={PILL_W} height={34} rx={17} />
          <text className="gn-text" x={X_AI} y={n.y + 0.5} textAnchor="middle" dominantBaseline="middle">
            {n.label}
          </text>
        </g>
      );
    }
    const left = n.key === 'industry';
    return (
      <g key={n.id} {...common}>
        <rect className="gn-hit" x={left ? n.x - 250 : n.x - 10} y={n.y - 16} width={260} height={32} />
        <circle className="gn-dot" cx={n.x} cy={n.y} r={6} />
        <circle className="gn-ring" cx={n.x} cy={n.y} r={11} />
        <text
          className="gn-text"
          x={left ? n.x - 20 : n.x + 20}
          y={n.y + 0.5}
          textAnchor={left ? 'end' : 'start'}
          dominantBaseline="middle"
        >
          {n.label}
          <tspan className="gn-count" dx="7">
            {count}
          </tspan>
        </text>
      </g>
    );
  };

  const hovered = hover ? BY_ID.get(hover) : null;

  return (
    <svg
      className="ug"
      viewBox={`0 0 ${W} ${H}`}
      role="group"
      aria-label="Use cases by industry, type of AI and business function. Select nodes to filter."
    >
      {[
        ['Industry', X_IND],
        ['Type of AI', X_AI],
        ['Function', X_FN],
      ].map(([t, x]) => (
        <text key={t} className="ug-head" x={x as number} y={20} textAnchor="middle">
          {t}
        </text>
      ))}

      <g className="ug-edges">
        {edges.map((e) => {
          const n = live.get(e.id) ?? 0;
          const touches = hovered && (e.from === hovered.id || e.to === hovered.id);
          const selTouch =
            (BY_ID.get(e.from) && isSelected(BY_ID.get(e.from)!)) ||
            (BY_ID.get(e.to) && isSelected(BY_ID.get(e.to)!));
          const cls = `ge${n ? ' on' : ''}${touches && n ? ' hot' : ''}${selTouch && n ? ' sel' : ''}`;
          return <path key={e.id} className={cls} d={e.d} style={{ strokeWidth: n ? 1 + Math.min(n, 4) * 0.6 : 1 }} />;
        })}
      </g>
      <g className="ug-nodes">{[...INDUSTRY_NODES, ...AI_NODES, ...FN_NODES].map(renderNode)}</g>
    </svg>
  );
}
