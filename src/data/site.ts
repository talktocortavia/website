import { AI_TYPES, type AiType } from './useCases';

export const SITE = {
  name: 'Cortavia',
  legalName: 'CORTAVIA AI Solutions',
  url: 'https://cortavia.in',
  email: 'contact@cortavia.in',
  tagline: 'Think beyond AI',
  year: 2026,
};

export function mailto(subject?: string, body?: string): string {
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${SITE.email}${params.length ? `?${params.join('&')}` : ''}`;
}

export interface Capability {
  id: string;
  number: string;
  ai: AiType;
  title: string;
  blurb: string;
  detail: string;
  includes: string[];
  helps: string[];
}

/** Slug used for the anchors on the Services page, e.g. "conversational-ai". */
export function aiSlug(ai: string): string {
  return ai.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const capabilityCopy: Record<AiType, Omit<Capability, 'id' | 'number' | 'ai'>> = {
  'Conversational AI': {
    title: 'Conversational AI',
    blurb:
      'Assistants that answer questions from your own documents, in the language your people actually use.',
    detail:
      'We connect an assistant to the material you already have, such as manuals, policies, wikis and past tickets, so people stop hunting through folders. It suits customer support, internal help desks, training and knowledge management.',
    includes: [
      'Answers grounded in your documents, with the source shown',
      'Hand-off to a person when the assistant is not sure',
      'Several languages',
      'Usage reporting that shows where your documentation has gaps',
    ],
    helps: [
      'Fewer repeat questions reaching your team',
      'Faster onboarding for new staff',
      'One searchable source of organisational knowledge',
    ],
  },
  'Document intelligence': {
    title: 'Document intelligence',
    blurb:
      'Reading, extracting and checking the information locked inside contracts, forms, invoices and reports.',
    detail:
      'Much of the work in an organisation is people reading documents and typing what they found somewhere else. We build systems that do the reading, flag what looks wrong, and leave the judgement to a person.',
    includes: [
      'Extraction from forms, invoices, contracts and reports',
      'Checks against your own rules and reference data',
      'Summaries and comparisons across long documents',
      'A review screen for anything the system is unsure about',
    ],
    helps: [
      'Less re-keying and fewer transcription errors',
      'Faster turnaround on document-heavy requests',
      'A clear record of what was read and why',
    ],
  },
  'Predictive analytics': {
    title: 'Predictive analytics',
    blurb:
      'Forecasts and early warnings built from your own history, with the reasoning shown alongside the number.',
    detail:
      'We look at what your data can honestly support, build models that fit it, and present results in a way the people making the decision can question. We will say plainly when the data is not enough.',
    includes: [
      'Demand, workload and risk forecasting',
      'Early-warning signals for churn, delays and quality issues',
      'Explanations for every prediction',
      'Monitoring so you know when a model needs attention',
    ],
    helps: [
      'Earlier sight of problems',
      'Plans based on evidence rather than habit',
      'Decisions that can be explained afterwards',
    ],
  },
  'Intelligent automation': {
    title: 'Intelligent automation',
    blurb:
      'Routine workflows and approvals handled end to end, with people stepping in for the exceptions.',
    detail:
      'We map how work really moves through your organisation, then automate the repetitive parts with a mix of AI and conventional workflow tools. Sometimes the right answer is a simple workflow with no AI in it, and we will say so.',
    includes: [
      'Intake, routing and approvals',
      'Integration with the systems and RPA tools you already use',
      'Exception queues for people to resolve',
      'An audit trail and a live view of each process',
    ],
    helps: [
      'Less manual chasing and hand-off',
      'Faster handling of routine requests',
      'Visibility over work that used to disappear into inboxes',
    ],
  },
  'Generative content': {
    title: 'Generative content',
    blurb:
      'First drafts of reports, replies, descriptions and learning material, in your voice and with a person approving.',
    detail:
      'We set up generation around your templates, tone and approved facts, so drafts start close to finished. A person reviews before anything goes out.',
    includes: [
      'Drafting from your templates, data and style guide',
      'Personalisation at volume',
      'Review and approval steps',
      'Guardrails for claims, tone and sensitive topics',
    ],
    helps: [
      'Less time on blank pages and repetitive writing',
      'More consistent communication',
      'Content that stays within what you can stand behind',
    ],
  },
  'Evaluation & scoring': {
    title: 'Evaluation and scoring',
    blurb:
      'Assessments, reviews and rankings built around your rubric, with each score explained.',
    detail:
      'You define what good looks like. The system drafts assessments, scores responses against that standard and gives the reasoning, while people keep the final say on anything borderline or high-stakes.',
    includes: [
      'Assessments generated from your syllabus or criteria',
      'Consistent scoring against rubrics you define',
      'Written answers, multiple choice and coding tasks',
      'Reasoning attached to every score, and progress tracking over time',
    ],
    helps: [
      'Less time on repetitive marking and review',
      'More consistent evaluation across large groups',
      'Clearer insight into where people need support',
    ],
  },
};

export const capabilities: Capability[] = AI_TYPES.map((ai, i) => ({
  id: aiSlug(ai),
  number: String(i + 1).padStart(2, '0'),
  ai,
  ...capabilityCopy[ai],
}));

export const steps = [
  {
    n: '1',
    title: 'Listen',
    text: 'We start with how the work actually happens today: the tools, the hand-offs, and where time goes.',
  },
  {
    n: '2',
    title: 'Scope',
    text: 'We pick one or two places where AI genuinely helps, and say plainly where it would not.',
  },
  {
    n: '3',
    title: 'Build',
    text: 'We build with your documents and systems, and show working versions early so you can steer.',
  },
  {
    n: '4',
    title: 'Hand over',
    text: 'You get something your team can run, with documentation and a way to check how it is performing.',
  },
];

export const principles = [
  {
    title: 'Start with the work, not the model',
    text: 'We look at the process first. Sometimes the right answer is a simple workflow and no AI at all, and we will say so.',
  },
  {
    title: 'People stay in charge of people decisions',
    text: 'Anything that affects someone’s job, grade or pay is a recommendation for a person to review, never an automatic outcome.',
  },
  {
    title: 'Only the data that is needed',
    text: 'We ask for the minimum, write down where it goes, and agree with you how it is stored and for how long.',
  },
  {
    title: 'Honest reporting',
    text: 'You will hear what worked and what did not, including the parts of a pilot we would not repeat.',
  },
];

export const techStack = [
  { id: 'langchain', name: 'LangChain', category: 'Orchestration', desc: 'Enterprise agent chains' },
  { id: 'langgraph', name: 'LangGraph', category: 'Multi-agent', desc: 'Cyclic stateful graphs' },
  { id: 'gpt', name: 'GPT', category: 'Foundation LLM', desc: 'Multimodal reasoning' },
  { id: 'claude', name: 'Claude', category: 'Reasoning', desc: 'Deep analytical synthesis' },
  { id: 'llama', name: 'Llama', category: 'Open weights', desc: 'Private, self-hosted inference' },
  { id: 'mcp', name: 'MCP', category: 'Tool calling', desc: 'Model context interoperability' },
  { id: 'aws', name: 'AWS Bedrock', category: 'Cloud infrastructure', desc: 'Managed model hosting' },
  { id: 'azure', name: 'Azure OpenAI', category: 'Enterprise cloud', desc: 'Enterprise private inference' },
];
