import { SITE } from './data/site';
import { useCases, getUseCase } from './data/useCases';
import { policies, getPolicy } from './content/policies';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

const HOME: PageMeta = {
  path: '/',
  title: `${SITE.name} — ${SITE.tagline}`,
  description:
    'Cortavia is an online AI solutions company. We help businesses find where AI genuinely helps, then build it to fit how they already work.',
};

const STATIC_PAGES: PageMeta[] = [
  HOME,
  {
    path: '/use-cases/',
    title: `AI use cases by industry and function — ${SITE.name}`,
    description:
      'A library of illustrative AI use cases, organised by industry, business function and type of AI. Examples of what is possible, not client results.',
  },
  {
    path: '/services/',
    title: `Services — ${SITE.name}`,
    description:
      'Conversational AI, document intelligence, predictive analytics, intelligent automation, generative content and evaluation. AI built around how your organisation already works.',
  },
  {
    path: '/careers/',
    title: `Careers — ${SITE.name}`,
    description:
      'Join Cortavia, a small, fully online AI solutions company. See our open roles and how to apply.',
  },
  {
    path: '/about/',
    title: `About and contact — ${SITE.name}`,
    description:
      'Cortavia is an online AI solutions company helping businesses think beyond traditional AI. Get in touch at contact@cortavia.in.',
  },
];

export const NOT_FOUND: PageMeta = {
  path: '/404',
  title: `Page not found — ${SITE.name}`,
  description: 'That page could not be found.',
  noindex: true,
};

export function allPages(): PageMeta[] {
  return [
    ...STATIC_PAGES,
    ...useCases.map((u) => ({
      path: `/use-cases/${u.slug}/`,
      title: `${u.title} — AI use case | ${SITE.name}`,
      description: u.summary,
    })),
    ...policies.map((p) => ({
      path: `/${p.slug}/privacy`,
      title: `${p.name} Privacy Policy — ${SITE.name}`,
      description: p.description,
    })),
  ];
}

function normalise(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '');
}

export function metaFor(pathname: string): PageMeta {
  const p = normalise(pathname);
  const found = allPages().find((m) => normalise(m.path) === p);
  if (found) return found;
  const uc = p.startsWith('/use-cases/') ? getUseCase(p.slice('/use-cases/'.length)) : undefined;
  if (uc) return { path: p, title: uc.title, description: uc.summary };
  const pol = /^\/([a-z]+)\/privacy$/.exec(p);
  if (pol && getPolicy(pol[1])) return allPages().find((m) => normalise(m.path) === p) ?? NOT_FOUND;
  return NOT_FOUND;
}
