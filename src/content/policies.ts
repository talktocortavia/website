import financetrail from './privacy/financetrail.html?raw';
import inventory from './privacy/inventory.html?raw';
import appwall from './privacy/appwall.html?raw';
import synapse from './privacy/synapse.html?raw';

export interface Policy {
  slug: string;
  name: string;
  description: string;
  updated: string;
  html: string;
}

export const policies: Policy[] = [
  {
    slug: 'financetrail',
    name: 'Finance Trail',
    description:
      'Privacy policy for Finance Trail by Cortavia. On-device Indian bank and UPI SMS finance tracking. 100% local, no cloud account, zero data uploads.',
    updated: '17 September 2026',
    html: financetrail,
  },
  {
    slug: 'inventory',
    name: 'Inventory Management',
    description:
      'Privacy policy for Inventory Management (Tile Warehouse) by Cortavia. 100% on-device local inventory and stock tracker. Zero cloud uploads.',
    updated: '17 September 2026',
    html: inventory,
  },
  {
    slug: 'appwall',
    name: 'App Wall',
    description: 'Privacy policy for App Wall by Cortavia. On-device firewall. No accounts. No cloud.',
    updated: '18 August 2026',
    html: appwall,
  },
  {
    slug: 'synapse',
    name: 'Synapse',
    description: 'Privacy policy for Synapse by Cortavia. On-device SMS organizer. No cloud account.',
    updated: '19 August 2026',
    html: synapse,
  },
];

export function getPolicy(slug: string): Policy | undefined {
  return policies.find((p) => p.slug === slug);
}

/** Old URLs that must keep working: they redirect to the current page. */
export const redirects: { from: string; to: string }[] = [
  { from: '/familycfo/privacy', to: '/financetrail/privacy' },
  { from: '/tilewarehouse/privacy', to: '/inventory/privacy' },
  { from: '/privacy', to: '/appwall/privacy' },
  { from: '/privacy-policy', to: '/appwall/privacy' },
];
