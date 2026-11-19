export const INDUSTRIES = [
  'Financial services',
  'Healthcare & life sciences',
  'Retail & consumer',
  'Manufacturing & supply chain',
  'Education & training',
  'Public sector',
  'Professional services',
  'Technology & telecom',
] as const;

export const FUNCTIONS = [
  'Customer service',
  'Operations',
  'Finance & risk',
  'People & HR',
  'Sales & marketing',
  'Legal & compliance',
  'IT & knowledge',
  'Learning & training',
] as const;

export const AI_TYPES = [
  'Conversational AI',
  'Document intelligence',
  'Predictive analytics',
  'Intelligent automation',
  'Generative content',
  'Evaluation & scoring',
] as const;

export type Industry = (typeof INDUSTRIES)[number];
export type BusinessFunction = (typeof FUNCTIONS)[number];
export type AiType = (typeof AI_TYPES)[number];

export interface UseCase {
  slug: string;
  title: string;
  summary: string;
  industries: Industry[];
  fn: BusinessFunction;
  ai: AiType;
  situation: string;
  does: string[];
  watch: string[];
}

export const useCases: UseCase[] = [
  {
    slug: 'support-knowledge-assistant',
    title: 'A knowledge assistant for support teams',
    summary:
      'Agents ask a question in plain language and get an answer drawn from the company’s own manuals, tickets and policies.',
    industries: ['Technology & telecom', 'Retail & consumer'],
    fn: 'Customer service',
    ai: 'Conversational AI',
    situation:
      'The answers exist, but they are spread across wikis, PDFs and old tickets. New agents spend months learning where to look, and experienced ones still lose time searching.',
    does: [
      'Searches approved internal documents and replies in plain language, with a link back to the passage it used.',
      'Says so when the material does not contain an answer, instead of guessing.',
      'Shows which topics people ask about most, so gaps in the documentation become visible.',
    ],
    watch: [
      'Answers are only as good as the documents behind them, so someone needs to own keeping those current.',
      'The agent should see the source and stay responsible for whatever is sent to the customer.',
    ],
  },
  {
    slug: 'ticket-triage-drafts',
    title: 'Support ticket triage and drafted replies',
    summary:
      'Incoming requests are categorised, routed to the right queue and given a draft reply for a person to review.',
    industries: ['Retail & consumer', 'Technology & telecom'],
    fn: 'Customer service',
    ai: 'Conversational AI',
    situation:
      'A shared inbox mixes billing questions, delivery problems and complaints. Sorting it by hand delays the urgent messages behind the routine ones.',
    does: [
      'Reads each message and tags the topic, urgency and language.',
      'Routes it to the right team and drafts a reply from approved templates and past answers.',
      'Sends anything sensitive or unusual straight to a person.',
    ],
    watch: [
      'Keep a human review step for anything that changes money, accounts or commitments.',
      'Check regularly for categories where the tagging goes wrong, and adjust the rules.',
    ],
  },
  {
    slug: 'branch-policy-qa',
    title: 'Policy and product Q&A for branch staff',
    summary:
      'Frontline staff get quick, sourced answers on products, fees and procedures that change often.',
    industries: ['Financial services'],
    fn: 'IT & knowledge',
    ai: 'Conversational AI',
    situation:
      'Branch staff field questions about products and procedures that keep changing, and the circulars announcing the changes are long and easy to miss.',
    does: [
      'Answers staff questions from the latest approved circulars and product sheets.',
      'Shows which document and version each answer came from.',
      'Records unanswered questions so the policy team can see what is unclear.',
    ],
    watch: [
      'Version control matters: an out-of-date circular is worse than no answer.',
      'Advice specific to a customer should stay with trained staff.',
    ],
  },
  {
    slug: 'invoice-capture',
    title: 'Invoice and purchase-order capture',
    summary:
      'Details are read from invoices in any layout and matched to purchase orders, with a person checking the doubtful ones.',
    industries: ['Manufacturing & supply chain', 'Professional services'],
    fn: 'Finance & risk',
    ai: 'Document intelligence',
    situation:
      'Invoices arrive as PDFs, scans and emails in dozens of layouts, and someone retypes the details into the accounting system.',
    does: [
      'Reads the supplier, dates, line items and tax details from each document.',
      'Matches invoices to purchase orders and goods received.',
      'Sends mismatches and low-confidence fields to a person for checking.',
    ],
    watch: [
      'Test with a sample of real, messy documents rather than clean ones.',
      'Keep the original document linked to every entry, for audits.',
    ],
  },
  {
    slug: 'contract-clause-review',
    title: 'Contract clause extraction and review',
    summary:
      'Key clauses are found, compared with the company’s preferred positions and summarised for the reviewer.',
    industries: ['Professional services'],
    fn: 'Legal & compliance',
    ai: 'Document intelligence',
    situation:
      'Reviewing many contracts for the same handful of clauses is slow and repetitive, and easy to get wrong when tired.',
    does: [
      'Finds and extracts clauses such as payment terms, renewal, liability and termination.',
      'Compares them with the company’s preferred positions and highlights the differences.',
      'Produces a short summary for the lawyer or contract manager.',
    ],
    watch: [
      'It supports reviewers and does not replace legal judgement.',
      'Confidential contracts need clear rules about where the documents are processed.',
    ],
  },
  {
    slug: 'onboarding-document-checks',
    title: 'Document checks for customer onboarding',
    summary:
      'Identity and address documents are checked for completeness and consistency before a person makes the decision.',
    industries: ['Financial services'],
    fn: 'Legal & compliance',
    ai: 'Document intelligence',
    situation:
      'Onboarding teams check identity and address documents by eye. It is slow, and the result varies between reviewers.',
    does: [
      'Reads submitted documents and checks the details are consistent with the application.',
      'Flags unreadable, incomplete or mismatched documents so the customer can resubmit.',
      'Leaves the approval decision with the compliance team and logs what was checked.',
    ],
    watch: [
      'Requirements differ by country and product, so agree the rules with compliance before automating a step.',
      'Test across document types and image quality so no group of customers is rejected more often.',
    ],
  },
  {
    slug: 'claims-intake-routing',
    title: 'Claims intake and routing',
    summary:
      'Claims are checked for missing documents, classified and sent to the right handler, with a status trail.',
    industries: ['Healthcare & life sciences', 'Financial services'],
    fn: 'Operations',
    ai: 'Intelligent automation',
    situation:
      'Claims arrive with missing forms and unclear attachments, and handlers spend their time chasing information before the real work starts.',
    does: [
      'Checks each claim for the required documents and asks the claimant for anything missing.',
      'Classifies the claim and routes it to the right handler or queue.',
      'Keeps a status trail so claimants and staff can see where it stands.',
    ],
    watch: [
      'Decisions to pay or reject a claim should stay with people.',
      'Be clear with claimants about which steps are automated.',
    ],
  },
  {
    slug: 'administrative-summaries',
    title: 'Plain-language summaries of long administrative documents',
    summary:
      'Long letters, notes and policy documents are boiled down to the points and deadlines staff need to act on.',
    industries: ['Healthcare & life sciences', 'Public sector'],
    fn: 'Operations',
    ai: 'Generative content',
    situation:
      'Referral letters, case notes and policy documents run long, and administrative staff need the key points to route them correctly.',
    does: [
      'Summarises a long document into a short, structured note.',
      'Highlights dates, deadlines and requested actions.',
      'Links each point back to the passage it came from so it can be checked.',
    ],
    watch: [
      'Use it for administration and routing, not for clinical or legal decisions.',
      'Personal and patient data need strict access controls and a clear storage policy.',
    ],
  },
  {
    slug: 'demand-forecasting',
    title: 'Demand forecasting for replenishment',
    summary:
      'Sales history, season and promotions are combined into reorder suggestions per product and location.',
    industries: ['Retail & consumer'],
    fn: 'Operations',
    ai: 'Predictive analytics',
    situation:
      'Stock is ordered on habit and last year’s figures, which leaves some shelves empty while others fill up with slow sellers.',
    does: [
      'Combines sales history with season, promotions and local events to forecast demand.',
      'Suggests reorder quantities for each product and location.',
      'Shows how confident each forecast is, so planners know where to apply their own judgement.',
    ],
    watch: [
      'New products and sudden changes in demand have little history to learn from.',
      'Planners should be able to override a suggestion and see why it was made.',
    ],
  },
  {
    slug: 'predictive-maintenance',
    title: 'Predictive maintenance alerts',
    summary:
      'Sensor readings are watched for the drift that usually comes before a failure, so work can be planned.',
    industries: ['Manufacturing & supply chain'],
    fn: 'Operations',
    ai: 'Predictive analytics',
    situation:
      'Machines are serviced on a fixed schedule, so some get attention too early while others fail between visits.',
    does: [
      'Learns what normal looks like from readings such as vibration and temperature.',
      'Flags drift that tends to come before a failure.',
      'Suggests a maintenance window and lists the likely cause for the technician.',
    ],
    watch: [
      'It needs enough clean sensor history, which often means fixing data collection first.',
      'Safety-critical equipment still needs its scheduled inspections.',
    ],
  },
  {
    slug: 'supplier-risk-monitoring',
    title: 'Supplier risk monitoring',
    summary:
      'Delivery records, quality reports and public news are combined into an early warning on supplier trouble.',
    industries: ['Manufacturing & supply chain', 'Retail & consumer'],
    fn: 'Finance & risk',
    ai: 'Predictive analytics',
    situation:
      'A late or struggling supplier is usually noticed only after it has already disrupted production or stock.',
    does: [
      'Tracks delivery performance, quality reports and public news for each supplier.',
      'Raises an early warning when several signals point the same way.',
      'Summarises the issue and suggests backup suppliers from the approved list.',
    ],
    watch: [
      'Public information can be wrong or out of date, so verify before acting.',
      'Use an alert to start a conversation with the supplier, not to end one.',
    ],
  },
  {
    slug: 'rubric-based-evaluation',
    title: 'Rubric-based evaluation of written answers',
    summary:
      'Answers are scored against a rubric the teacher defines, with the reasoning shown and borderline cases passed to a person.',
    industries: ['Education & training'],
    fn: 'Learning & training',
    ai: 'Evaluation & scoring',
    situation:
      'Marking a large batch of written answers takes days, and consistency drifts between the first paper and the hundredth.',
    does: [
      'Scores each answer against a rubric the teacher defines.',
      'Explains the score by pointing to the rubric criteria.',
      'Sends borderline or unusual answers to a teacher, who can adjust any score.',
    ],
    watch: [
      'Test it against marks from experienced teachers before relying on it.',
      'Students should have a clear way to ask for a human review.',
    ],
  },
  {
    slug: 'assessment-generation',
    title: 'Assessments drafted from a syllabus',
    summary:
      'Question papers and marking schemes are drafted from the syllabus and course material, for teachers to edit and approve.',
    industries: ['Education & training'],
    fn: 'Learning & training',
    ai: 'Generative content',
    situation:
      'Writing fresh questions for every cohort takes time, and reusing old papers makes them easy to predict.',
    does: [
      'Drafts questions at different difficulty levels from the syllabus and course material.',
      'Produces matching marking schemes.',
      'Lets teachers edit, approve or reject each question before anything is used.',
    ],
    watch: [
      'Every question needs a teacher’s review for accuracy and fairness.',
      'Keep a record of what was generated so papers are not repeated by accident.',
    ],
  },
  {
    slug: 'training-submission-review',
    title: 'Review of employee training submissions',
    summary:
      'Written tasks at the end of a course get quick, specific feedback, with a trainer looking at borderline cases.',
    industries: ['Professional services', 'Technology & telecom'],
    fn: 'Learning & training',
    ai: 'Evaluation & scoring',
    situation:
      'Compliance and skills training often ends with a written task that nobody has time to read closely.',
    does: [
      'Checks each submission against the criteria for the course.',
      'Gives learners specific feedback straight away.',
      'Passes borderline cases, and a sample of the rest, to a trainer.',
    ],
    watch: [
      'Be open with employees that automated feedback is used.',
      'Use results to improve the training rather than to rank people.',
    ],
  },
  {
    slug: 'interview-notes-support',
    title: 'Structured interview notes and scoring support',
    summary:
      'Interview notes become a consistent summary against the role’s criteria, so a panel can compare candidates fairly.',
    industries: ['Professional services', 'Technology & telecom'],
    fn: 'People & HR',
    ai: 'Evaluation & scoring',
    situation:
      'Interviewers keep notes in different formats, which makes comparing candidates slower and less fair than it should be.',
    does: [
      'Turns interview notes or transcripts into a consistent summary against the role’s criteria.',
      'Lines up each candidate’s evidence next to the criteria for the panel to discuss.',
      'Points out criteria that were not covered in the interview.',
    ],
    watch: [
      'The panel makes the hiring decision, not the tool.',
      'Get candidates’ agreement before recording or transcribing an interview.',
    ],
  },
  {
    slug: 'explainable-shortlisting',
    title: 'Explainable CV shortlisting',
    summary:
      'CVs are matched to the job requirements, with the reason shown for each result so recruiters can check and challenge it.',
    industries: ['Professional services', 'Technology & telecom'],
    fn: 'People & HR',
    ai: 'Document intelligence',
    situation:
      'A popular role can attract hundreds of applications, and early screening ends up rushed and inconsistent.',
    does: [
      'Reads CVs and extracts skills, experience and qualifications.',
      'Matches them to the job requirements and shows why each candidate was or was not highlighted.',
      'Keeps a record so recruiters can check and challenge the results.',
    ],
    watch: [
      'Test for bias across groups before use, and keep checking afterwards.',
      'Recruiters should look at the CVs that were not highlighted too. Nobody should be screened out by the tool alone.',
    ],
  },
  {
    slug: 'attrition-early-warning',
    title: 'Early signals of team attrition',
    summary:
      'Anonymised, team-level patterns point to where people are more likely to leave, so managers can start conversations sooner.',
    industries: ['Professional services', 'Technology & telecom'],
    fn: 'People & HR',
    ai: 'Predictive analytics',
    situation:
      'Resignations feel sudden, but there are often earlier patterns at team level, such as workload swings and a long wait for promotion.',
    does: [
      'Looks at aggregated, anonymised patterns such as workload, tenure and time since promotion.',
      'Highlights teams where several factors line up.',
      'Suggests conversations and actions for managers and HR to consider.',
    ],
    watch: [
      'Keep it at team level and never use it to single out named individuals.',
      'Be transparent with staff about what data is used and why.',
    ],
  },
  {
    slug: 'approval-workflow-automation',
    title: 'Approval workflow automation',
    summary:
      'Requests are read, routed to the right approver and followed up, with a full trail of who approved what.',
    industries: ['Public sector', 'Professional services'],
    fn: 'Operations',
    ai: 'Intelligent automation',
    situation:
      'Requests pass between inboxes for sign-off, and nobody is sure where a particular approval is stuck.',
    does: [
      'Reads incoming requests and extracts the details needed to route them.',
      'Sends them to the right approver, with reminders and escalation if they stall.',
      'Updates the underlying systems once approved and keeps an audit trail.',
    ],
    watch: [
      'Write the approval rules down clearly before automating them.',
      'Keep exceptions with people and make them easy to raise.',
    ],
  },
  {
    slug: 'citizen-request-routing',
    title: 'Citizen request classification and routing',
    summary:
      'Requests from residents are read, sorted by topic and location, and sent to the right department with a short summary.',
    industries: ['Public sector'],
    fn: 'Customer service',
    ai: 'Conversational AI',
    situation:
      'Residents send requests by phone, email and web forms, and each one has to be sorted by hand to the right department.',
    does: [
      'Reads each request, identifies the topic and location and routes it to the right department.',
      'Replies with status updates and answers to common questions in the resident’s language.',
      'Hands complex or sensitive cases to staff with a short summary.',
    ],
    watch: [
      'Service must stay accessible to people who cannot or will not use digital channels.',
      'Be clear about what data is kept and for how long.',
    ],
  },
  {
    slug: 'reconciliation-matching',
    title: 'Reconciliation matching',
    summary:
      'Transactions across bank statements and ledgers are matched automatically, so accountants only handle the exceptions.',
    industries: ['Financial services'],
    fn: 'Finance & risk',
    ai: 'Intelligent automation',
    situation:
      'At month end, finance teams match thousands of transactions across statements and ledgers, and most of the time goes on the awkward few.',
    does: [
      'Matches entries using amounts, dates, references and past patterns.',
      'Groups likely matches for quick approval.',
      'Explains why something did not match and queues the exceptions for a person.',
    ],
    watch: [
      'Keep the accountant’s sign-off on any adjustment.',
      'Measure the match rate against a manual sample so errors do not hide in the totals.',
    ],
  },
  {
    slug: 'sales-notes-to-crm',
    title: 'Call notes turned into CRM updates',
    summary:
      'Notes from a sales call become a structured summary and suggested CRM updates that the rep confirms.',
    industries: ['Professional services', 'Technology & telecom'],
    fn: 'Sales & marketing',
    ai: 'Generative content',
    situation:
      'Sales reps dislike updating the CRM, so records end up late, short or missing.',
    does: [
      'Turns call notes or recordings into a structured summary.',
      'Suggests updates to the deal stage, next steps and contacts.',
      'Lets the rep review and confirm before anything is saved.',
    ],
    watch: [
      'Customers should know if calls are recorded or transcribed.',
      'Check summaries for details the call did not actually contain.',
    ],
  },
  {
    slug: 'catalogue-enrichment',
    title: 'Product catalogue enrichment',
    summary:
      'Thin product listings are filled out with consistent descriptions and attributes, for a merchandiser to approve.',
    industries: ['Retail & consumer'],
    fn: 'Sales & marketing',
    ai: 'Generative content',
    situation:
      'A catalogue with thousands of products often has thin or inconsistent descriptions, which hurts search and sales.',
    does: [
      'Drafts consistent descriptions from supplier data and product images.',
      'Fills in missing fields such as size, material and category.',
      'Queues the drafts for a merchandiser to approve, especially for any claim about the product.',
    ],
    watch: [
      'Claims about safety, materials or health must be checked against supplier documentation.',
      'Give it approved examples so the brand’s voice stays consistent.',
    ],
  },
  {
    slug: 'compliance-evidence-reporting',
    title: 'Compliance monitoring and audit reporting',
    summary:
      'Evidence is collected continuously from the systems where controls run, and compiled into the report auditors expect.',
    industries: ['Financial services', 'Public sector'],
    fn: 'Legal & compliance',
    ai: 'Intelligent automation',
    situation:
      'Each quarter, teams scramble to gather evidence from many systems to show that controls were followed.',
    does: [
      'Collects evidence continuously from the systems where controls run.',
      'Highlights gaps and expiring items before the audit.',
      'Compiles the evidence into the report format auditors expect.',
    ],
    watch: [
      'An automated check shows a control ran, not that it was effective, so people still need to assess that.',
      'Keep a log of what the system collected and when.',
    ],
  },
  {
    slug: 'it-helpdesk-self-service',
    title: 'IT helpdesk self-service',
    summary:
      'Common questions are answered in chat, and tickets arrive pre-filled when a person is needed.',
    industries: ['Technology & telecom', 'Professional services'],
    fn: 'IT & knowledge',
    ai: 'Conversational AI',
    situation:
      'Password resets, access requests and how-do-I questions make up much of the helpdesk queue.',
    does: [
      'Answers common questions in chat and walks people through the fix.',
      'Raises a ticket with the details already filled in when it cannot help.',
      'Suggests new help articles from tickets that keep coming back.',
    ],
    watch: [
      'Identity checks for resets and access requests should follow your security policy.',
      'Make it easy to reach a person.',
    ],
  },
];

export const featuredSlugs = [
  'support-knowledge-assistant',
  'invoice-capture',
  'rubric-based-evaluation',
  'explainable-shortlisting',
];

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}

export function relatedUseCases(current: UseCase, count = 3): UseCase[] {
  const others = useCases.filter((u) => u.slug !== current.slug);
  const score = (u: UseCase) =>
    (u.fn === current.fn ? 3 : 0) +
    (u.ai === current.ai ? 2 : 0) +
    u.industries.filter((i) => current.industries.includes(i)).length;
  return others
    .map((u) => ({ u, s: score(u) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, count)
    .map((x) => x.u);
}
