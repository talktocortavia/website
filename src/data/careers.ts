export interface Role {
  id: string;
  title: string;
  team: string;
  type: string;
  location: string;
  summary: string;
  doing: string[];
  looking: string[];
}

// Carried over from the previous site. Edit or add roles here and the page updates.
export const roles: Role[] = [
  {
    id: 'marketing-intern',
    title: 'Marketing Intern',
    team: 'Marketing & growth',
    type: 'Internship',
    location: 'Remote (India or global)',
    summary:
      'Help us explain what Cortavia does, in plain language, to the people who might need it.',
    doing: [
      'Create and curate content about Cortavia’s AI solutions, use cases and technology updates.',
      'Manage and grow our presence on LinkedIn, X and industry forums.',
      'Assist with digital outreach, community building and enterprise engagement campaigns.',
      'Research AI agent trends, competitor positioning and enterprise software demand.',
    ],
    looking: [
      'Interest in artificial intelligence, tech start-ups and digital storytelling.',
      'Strong written English and copy-editing skills.',
      'Familiarity with LinkedIn strategy, content scheduling and basic design tools such as Canva or Figma.',
      'A self-starter who wants to learn and take ownership in a fast-moving team.',
    ],
  },
];

export const perks = [
  { k: 'Remote and flexible', v: 'We are an online company and work with people wherever they are.' },
  { k: 'Learning and mentorship', v: 'You work alongside the team and get feedback on real work.' },
  { k: 'Certificate of internship', v: 'Awarded on completion of an internship.' },
];
