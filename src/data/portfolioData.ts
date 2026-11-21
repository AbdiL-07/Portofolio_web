export interface ProjectItem {
  id: string;
  number: string;
  organization: string;
  title: string;
  summary: string;
  footerTag: string;
  type: 'event' | 'code' | 'leadership';
  timeframe: string;
  role: string;
  deliverables: string[];
  tools: string[];
  codeSnippet?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  artifact: string;
}

export interface SkillItem {
  name: string;
  category: 'Engineering' | 'Design' | 'Productivity' | 'Leadership';
  note: string;
}

export const PORTRAIT_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD1BMkP23HyB2R8tFTWXdt0xcMu1dQsAQA9xheRCM0PNqfVf3Unmc-VJ9IzFXq8vNgDMmSMS5xMx3cCcTeq7Rge6vXr_YjJhETzTeDi6qOaGnuVEhe6C0Bv_s7qMp_BHze_hKK47pjzwKjMTAoGt0M7C2VXAoo4TlljT4xBYdzg80Q_RU0VAjbzwjHetrRQMFj35tA_CMy3lD0hHP8vTboIcvv9zAeiZlhEVWtS7q65sBqvRwMruGyI';

export const PROJECTS: ProjectItem[] = [
  {
    id: 'himala-cup-2026',
    number: '01',
    organization: 'ITPLN Lampung Student Org',
    title: 'HIMALA CUP 2026',
    summary:
      'Appointed PDD Division Coordinator overseeing publication, branding identity, and documentation for the grand annual regional collegiate championship.',
    footerTag: 'PDD Coordinator · Visuals',
    type: 'event',
    timeframe: '2026',
    role: 'PDD Division Coordinator (Publication, Design & Documentation)',
    deliverables: [
      'Unified tournament visual identity across event banners, digital posters, and social media announcements.',
      'Coordinated live match photography, highlight reels, and post-event visual documentation archives.',
      'Managed publication timelines and division task delegation across committee members.',
    ],
    tools: ['Canva Design', 'Event PDD', 'Team Leadership', 'MS PowerPoint'],
  },
  {
    id: 'python-algorithmic-logic',
    number: '02',
    organization: 'Informatics Coursework',
    title: 'Python & Algorithmic Logic',
    summary:
      'Implementation of computational logic pipelines, structured data validation, and modular algorithms mapped through comprehensive Draw.io flowcharts.',
    footerTag: 'VS Code · Python · Architecture',
    type: 'code',
    timeframe: '2026 - Present',
    role: 'Informatics Engineering Student & Developer',
    deliverables: [
      'Structured problem decomposition mapped cleanly in Draw.io flowcharts before implementation.',
      'Modular Python functions featuring matrix filtering, custom sorting metrics, and clear input validation.',
      'Readable codebase maintained in VS Code with test scenarios covering boundary cases.',
    ],
    tools: ['Python', 'VS Code', 'Draw.io Flowcharts', 'Problem Solving'],
    codeSnippet: `def solve_logic(matrix, metric=lambda item: item.score):
    """Structured optimization over validated matrix nodes."""
    nodes = [x for x in matrix if x.valid]
    return sorted(nodes, key=metric, reverse=True)`,
  },
  {
    id: 'ist-pecinta-alam',
    number: '03',
    organization: 'Boarding School Heritage',
    title: 'IST & Pecinta Alam Leadership',
    summary:
      'Directing division operations, environmental expeditions, and member discipline. Honed crisis response, public address, and team accountability.',
    footerTag: 'Division Head · Team Management',
    type: 'leadership',
    timeframe: 'Al-Muhsin Metro',
    role: 'Student Council (IST) & Outdoor Club (Pecinta Alam) Division Head',
    deliverables: [
      'Directed student division operations, daily discipline standards, and structured council reporting.',
      'Planned logistics, safety protocols, and navigation checklists for environmental expeditions.',
      'Delivered public briefings and coordinated cross-division communication during school-wide events.',
    ],
    tools: ['Team Leadership', 'Problem Solving', 'MS Word', 'MS Excel'],
  },
];

export const SKILLS: SkillItem[] = [
  {
    name: 'Python',
    category: 'Engineering',
    note: 'Algorithmic logic, data structures, and clean modular scripting.',
  },
  {
    name: 'VS Code',
    category: 'Engineering',
    note: 'Primary IDE for Python development, debugging, and project workflows.',
  },
  {
    name: 'Draw.io Flowcharts',
    category: 'Engineering',
    note: 'Visualizing system flows, decision trees, and program logic before coding.',
  },
  {
    name: 'Canva Design',
    category: 'Design',
    note: 'Event branding, publication posters, and social media visual systems.',
  },
  {
    name: 'MS Excel',
    category: 'Productivity',
    note: 'Structured data tracking, schedules, and division budgeting tables.',
  },
  {
    name: 'MS Word',
    category: 'Productivity',
    note: 'Formal proposals, event reports, and clean technical documentation.',
  },
  {
    name: 'MS PowerPoint',
    category: 'Design',
    note: 'Executive pitch decks, academic presentations, and visual briefings.',
  },
  {
    name: 'Team Leadership',
    category: 'Leadership',
    note: 'Delegating tasks, aligning divisions, and maintaining accountability.',
  },
  {
    name: 'Event PDD',
    category: 'Design',
    note: 'Publication, design direction, and documentation for campus tournaments.',
  },
  {
    name: 'Problem Solving',
    category: 'Leadership',
    note: 'Breaking complex operational or code challenges into actionable steps.',
  },
];

export const WORK_PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: 'Analyze & Structure',
    description: 'Deconstruct project goals into clear logical components and system flowcharts.',
    artifact: 'Draw.io Logic Blueprint',
  },
  {
    number: '02',
    title: 'Plan & Coordinate',
    description: 'Align team members, establish deadlines, and organize division deliverables.',
    artifact: 'Timeline & Division Matrix',
  },
  {
    number: '03',
    title: 'Design & Visualize',
    description: 'Craft impactful visual identities, presentation decks, and publication assets.',
    artifact: 'Canva & Deck System',
  },
  {
    number: '04',
    title: 'Develop & Code',
    description: 'Write clean Python code within VS Code following structured algorithmic rules.',
    artifact: 'Modular Python Source',
  },
  {
    number: '05',
    title: 'Review & Deliver',
    description: 'Test edge cases, prepare clear documentation, and ensure dependable execution.',
    artifact: 'Verified Final Release',
  },
];
