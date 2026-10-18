import type { SkillItem, ProjectItem, TimelineItem, JourneyStep } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Shivam Gawande',
  monogram: 'SG.',
  title: 'Computer Science Student • AI/ML • Agentic AI • Developer',
  phone: '8010439347',
  email: 'shivamgawande082@gmail.com',
  github: 'https://github.com/gawandeshiv71-oss',
  githubUsername: 'gawandeshiv71-oss',
  linkedin: 'https://www.linkedin.com/in/shivam-gawande-1a0752384',
  institution: 'Cusrow Wadia Institute of Technology (CWIT)',
  institutionShort: 'CWIT, Pune',
  degree: 'Diploma in Computer Science & Engineering',
  location: 'Pune, Maharashtra, India',
  status: 'Open for Opportunities & Collaborations',
  heroTagline: 'I build intelligent systems, interactive experiences and practical digital solutions.',
  aboutHeadline: 'WHO IS SHIVAM?',
  aboutBio: "I am a Computer Science student at Cusrow Wadia Institute of Technology, passionate about software development, AI/ML, Agentic AI, and building real-world engineering solutions. From low-level system design in C/C++ to building autonomous AI agents and responsive web platforms, I focus on crafting scalable, dependable, and high-impact digital experiences.",
  avatarPhotos: {
    badge: '/assets/shivam_badge.jpg',
    outdoor: '/assets/shivam_outdoor.png'
  }
};

export const ABOUT_SKILL_BADGES = [
  'C',
  'C++',
  'Python',
  'JavaScript',
  'HTML',
  'CSS',
  'React',
  'AI/ML',
  'Agentic AI',
  'DSA'
];

export const SKILLS_DATA: SkillItem[] = [
  // Programming
  {
    id: 'c',
    name: 'C',
    category: 'programming',
    level: 90,
    iconName: 'Code',
    description: 'Core procedural programming, low-level memory allocation, pointers, and fundamental algorithmic design.'
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'programming',
    level: 92,
    iconName: 'Cpu',
    description: 'Object-oriented programming, STL, memory optimization, templates, and robust system architecture.'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'programming',
    level: 88,
    iconName: 'Terminal',
    description: 'Scripting, AI/ML pipelines, automation routines, LLM agent workflows, and API integrations.'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'programming',
    level: 86,
    iconName: 'FileCode',
    description: 'Modern ES6+, asynchronous event architecture, DOM manipulation, and dynamic client experiences.'
  },

  // Web Development
  {
    id: 'html',
    name: 'HTML5',
    category: 'web',
    level: 95,
    iconName: 'Layout',
    description: 'Semantic markup, accessibility standards, SEO structure, and clean DOM trees.'
  },
  {
    id: 'css',
    name: 'CSS3',
    category: 'web',
    level: 90,
    iconName: 'Palette',
    description: 'Responsive styling, Flexbox, CSS Grid, custom keyframes, modern design tokens, and glassmorphism.'
  },
  {
    id: 'react',
    name: 'React',
    category: 'web',
    level: 88,
    iconName: 'Layers',
    description: 'Component-driven architecture, state management, custom hooks, reusable design systems, and fast SPAs.'
  },
  {
    id: 'responsive-design',
    name: 'Responsive Design',
    category: 'web',
    level: 94,
    iconName: 'Smartphone',
    description: 'Mobile-first layouts, adaptive viewports, touch optimizations, and smooth cross-browser rendering.'
  },

  // AI & Modern Tech
  {
    id: 'ai-ml',
    name: 'AI/ML',
    category: 'ai',
    level: 85,
    iconName: 'Brain',
    description: 'Machine learning fundamentals, predictive models, data preprocessing, and model fine-tuning.'
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI',
    category: 'ai',
    level: 87,
    iconName: 'Bot',
    description: 'Autonomous goal-driven systems, multi-agent coordination, tool-calling pipelines, and autonomous workflows.'
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    category: 'ai',
    level: 86,
    iconName: 'Sparkles',
    description: 'Task decomposition, autonomous decision frameworks, prompt chaining, and memory-backed reasoning.'
  },
  {
    id: 'automation',
    name: 'Automation',
    category: 'ai',
    level: 89,
    iconName: 'Workflow',
    description: 'Automating repetitive human workflows, business logic pipelines, and system orchestrations.'
  },

  // Computer Science Fundamentals
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'cs',
    level: 88,
    iconName: 'Binary',
    description: 'Arrays, Linked Lists, Trees, Graphs, Sorting, Searching, and Big-O computational complexity.'
  },
  {
    id: 'oop',
    name: 'OOP',
    category: 'cs',
    level: 92,
    iconName: 'Boxes',
    description: 'Encapsulation, Inheritance, Polymorphism, Abstraction, and clean modular software design.'
  },
  {
    id: 'database',
    name: 'Database (DBMS / SQL)',
    category: 'cs',
    level: 86,
    iconName: 'Database',
    description: 'Relational schema design, normalization (3NF), complex SQL queries, indexing, and ACID transactions.'
  },
  {
    id: 'computer-networks',
    name: 'Computer Networks',
    category: 'cs',
    level: 84,
    iconName: 'Network',
    description: 'OSI & TCP/IP stack, HTTP/HTTPS, routing protocols, sockets, and client-server communication models.'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'transitos',
    title: 'TransitOS',
    tagline: 'AI-Powered Transportation Management Platform',
    description: 'An intelligent transportation management system designed to connect and manage trucks, owners and administrators with AI-powered features.',
    category: 'AI & Fullstack',
    tags: ['React', 'Python', 'AI/ML', 'Logistics Engine', 'Node.js'],
    accentColor: '#00f0ff',
    featured: true,
    githubUrl: 'https://github.com/gawandeshiv71-oss/TransitOS',
    stats: [
      { label: 'Role Management', value: 'Trucks / Owners / Admins' },
      { label: 'AI Optimization', value: 'Route & Fuel Telemetry' },
      { label: 'Architecture', value: 'Microservices & Real-time' }
    ],
    fullDetails: [
      'Problem: Managing heterogeneous freight logistics across drivers, truck fleet owners, and dispatch administrators suffers from disconnected communication, poor route planning, and delayed reporting.',
      'Solution: Engineered TransitOS as a centralized unified dashboard bridging all stakeholders with predictive AI modules for optimal route forecasting and automated maintenance anomaly detection.',
      'Technology & Stack: Developed using React, Python AI analytics pipelines, responsive dashboard components, and real-time status telemetry.',
      'My Contribution: Designed the system architecture, state transitions between driver and admin roles, and integrated predictive route analytics.'
    ],
    features: [
      'Multi-stakeholder portal (Driver, Fleet Operator, Super Admin)',
      'AI-based route forecasting & dynamic capacity matching',
      'Real-time vehicle status indicators and incident alerts',
      'Digital bill of lading & instant ledger dispatch records'
    ]
  },
  {
    id: 'aos-ai-ca',
    title: 'AOS – AI for CA',
    tagline: 'Autonomous AI Assistant for Chartered Accountants',
    description: 'An AI-based automation concept designed to simplify repetitive CA workflows and improve productivity.',
    category: 'Automation & AI',
    tags: ['Agentic AI', 'Python', 'Document AI', 'Workflow Automation', 'Tax Engine'],
    accentColor: '#10b981',
    featured: true,
    githubUrl: 'https://github.com/gawandeshiv71-oss/AOS-AI-CA',
    stats: [
      { label: 'Workflow Efficiency', value: 'Autonomous Reconciliation' },
      { label: 'Domain', value: 'Tax, Audit & GST Filing' },
      { label: 'Agent Core', value: 'Tool Chaining & Extraction' }
    ],
    fullDetails: [
      'Problem: Chartered Accountants spend significant manual hours extracting tabular data from paper/PDF vouchers, cross-checking tax ledgers, and identifying compliance discrepancies.',
      'Solution: Architected AOS as an autonomous assistant concept leveraging document AI and tool chaining to automatically parse invoices, verify GST entries, and flag accounting mismatches.',
      'Technology & Stack: Agentic AI frameworks, Python, Document parsing models, and structured spreadsheet output generators.',
      'My Contribution: Conceived the autonomous tool-execution pipeline, prompt orchestration for accounting queries, and reconciliation logic.'
    ],
    features: [
      'Autonomous audit trail generation & ledger discrepancy scanning',
      'Smart extraction of tax invoices, receipts, and vouchers',
      'Accounting agent pipeline for repetitive spreadsheet reconciliations',
      'Privacy-conscious execution architecture protecting financial documents'
    ]
  },
  {
    id: 'atm-management',
    title: 'ATM Management System',
    tagline: 'Robust C++ OOP Console-Based Financial System',
    description: 'A console-based ATM management system demonstrating Object-Oriented Programming concepts in C++.',
    category: 'C++ & Systems',
    tags: ['C++', 'OOP', 'Data Structures', 'File Handling', 'System Design'],
    accentColor: '#8b5cf6',
    featured: false,
    githubUrl: 'https://github.com/gawandeshiv71-oss/ATM-Management-System',
    stats: [
      { label: 'Language', value: 'C++ 17' },
      { label: 'Concepts', value: 'OOP, File I/O, Error Handling' },
      { label: 'Architecture', value: 'State Machine & PIN Auth' }
    ],
    fullDetails: [
      'Problem: Simulating secure banking transactions requires strictly encapsulated account states, bulletproof error handling, and persistent data storage.',
      'Solution: Implemented a robust C++ OOP console system utilizing encapsulation for balance and PIN storage, inheritance for account types, and file streams for persistent transaction history.',
      'Technology & Stack: C++ 17, standard template library (STL), file I/O streams, and defensive input sanitization.',
      'My Contribution: Programmed the state machine, authentication logic, persistent ledger file handling, and account inheritance hierarchy.'
    ],
    features: [
      'Multi-user authenticated session state with PIN encryption hashing',
      'Transactional capabilities: Cash Withdrawal, Deposit, Transfer, Balance Inquiry',
      'Mini-statement generator tracking timestamped transaction histories',
      'Defensive input validation preventing buffer overflows and runtime crashes'
    ]
  },
  {
    id: 'royal-ride',
    title: 'RoyalRide',
    tagline: 'Luxury Car Rental Management System',
    description: 'A car rental management system designed with database integration for managing vehicles, customers and rentals.',
    category: 'Database Application',
    tags: ['Database / SQL', 'JavaScript', 'CSS', 'Full-Stack Architecture'],
    accentColor: '#f43f5e',
    featured: false,
    githubUrl: 'https://github.com/gawandeshiv71-oss/RoyalRide',
    stats: [
      { label: 'Data Model', value: 'Relational 3NF Schema' },
      { label: 'Fleet Tier', value: 'Premium & Luxury Segments' },
      { label: 'Integrations', value: 'Rental Booking Engine' }
    ],
    fullDetails: [
      'Problem: High-end vehicle rentals require strict inventory controls, customer KYC verification, and dynamic pricing calculations based on duration and vehicle tier.',
      'Solution: Engineered RoyalRide as a database-backed rental management system ensuring referential integrity across car availability, bookings, and customer accounts.',
      'Technology & Stack: Relational SQL Database, JavaScript, HTML5/CSS3, and administrative interface dashboards.',
      'My Contribution: Designed the normalized 3NF database schema, written queries for fleet availability filtering, and styled the customer booking interface.'
    ],
    features: [
      'Dynamic inventory tracker with status indicators (Available, Booked, In Maintenance)',
      'Customer verification and rental reservation scheduler',
      'Automated invoice calculation with late penalty & insurance riders',
      'Relational database queries for utilization rate reports and revenue metrics'
    ]
  }
];

export const ACHIEVEMENTS_DATA = {
  title: 'Hackathon Participant / Winner',
  badge: 'COMPETITIVE SPRINT EXCELLENCE',
  quote: 'Built innovative solutions under pressure and gained hands-on experience working with modern technologies.',
  highlights: [
    {
      metric: '24-36 Hours',
      label: 'Rapid Prototyping',
      detail: 'Iterated from whitepaper concept to functional AI & software prototype under strict hackathon deadlines.'
    },
    {
      metric: 'Real-World AI',
      label: 'Solution Architecture',
      detail: 'Designed practical systems that combine LLMs, automation, and full-stack software to solve tangible problems.'
    },
    {
      metric: 'Collaborative Lead',
      label: 'Team Synergy',
      detail: 'Spearheaded technical development, git coordination, and live pitch demos to technical judging panels.'
    }
  ]
};

export const EDUCATION_DATA: TimelineItem[] = [
  {
    year: '2023 - Present',
    title: 'Diploma in Computer Science & Engineering',
    subtitle: 'Undergraduate Technical Diploma',
    organization: 'Cusrow Wadia Institute of Technology (CWIT), Pune',
    description: 'Enrolled in a premier technical institute, building deep foundations in systems programming, data structures, algorithms, databases, and software engineering.',
    status: 'In Progress',
    skills: ['C', 'C++', 'Data Structures', 'Database Systems', 'Computer Networks', 'Operating Systems', 'Web Tech'],
    details: [
      'Consistently recognized for top-tier practical project submissions and hands-on lab execution.',
      'Represented the department in technical competitions, hackathons, and software exhibitions.',
      'Active focus on bridging classroom theoretical computer science with modern AI/ML applications.'
    ]
  }
];

export const LEARNING_JOURNEY_DATA: JourneyStep[] = [
  {
    step: 1,
    title: 'Computer Science',
    shortDesc: 'Discovered core computing principles, logic gates, binary representations, and computational thinking.',
    badge: 'Foundation',
    skills: ['Boolean Logic', 'Architecture Basics', 'Computational Thinking'],
    status: 'Mastered'
  },
  {
    step: 2,
    title: 'Programming',
    shortDesc: 'Mastered procedural and object-oriented fundamentals through intensive C and C++ practice.',
    badge: 'Core Syntax',
    skills: ['C', 'C++', 'Memory Management', 'Pointers', 'OOP'],
    status: 'Mastered'
  },
  {
    step: 3,
    title: 'Web Development',
    shortDesc: 'Crafted interactive, responsive frontend user interfaces with HTML5, CSS3, modern JavaScript, and React.',
    badge: 'Interfaces',
    skills: ['HTML/CSS', 'JavaScript ES6+', 'React', 'Responsive Design'],
    status: 'Mastered'
  },
  {
    step: 4,
    title: 'AI / Machine Learning',
    shortDesc: 'Stepped into data-driven computing, model training, feature extraction, and neural network foundations.',
    badge: 'Intelligence',
    skills: ['Python', 'NumPy/Pandas', 'Scikit-Learn', 'ML Models'],
    status: 'Mastered'
  },
  {
    step: 5,
    title: 'Agentic AI',
    shortDesc: 'Architecting autonomous AI agents, tool-augmented LLMs, multi-agent frameworks, and autonomous pipelines.',
    badge: 'Autonomy',
    skills: ['Autonomous Agents', 'Tool Calling', 'Prompt Orchestration', 'Workflow Chains'],
    status: 'Active Focus'
  },
  {
    step: 6,
    title: 'Real-World Projects',
    shortDesc: 'Translating concepts into impactful software: TransitOS, AOS for CAs, ATM Systems, RoyalRide.',
    badge: 'Execution',
    skills: ['Fullstack Architecture', 'System Design', 'Database Integration'],
    status: 'Active Focus'
  },
  {
    step: 7,
    title: 'Hackathons',
    shortDesc: 'Thriving under pressure, collaborating in intense sprint environments, and shipping winning MVPs.',
    badge: 'Competition',
    skills: ['Rapid Prototyping', 'Team Synergy', 'Live Demo Pitches'],
    status: 'Active Focus'
  },
  {
    step: 8,
    title: 'Future Software Engineer',
    shortDesc: 'Scaling systems, mastering distributed architectures, and building next-generation AI-native platforms.',
    badge: 'Horizon',
    skills: ['Large-scale Distributed Systems', 'Agentic Systems at Scale', 'Impactful Engineering'],
    status: 'Next Frontier'
  }
];

export const PAGES_LIST = [
  { id: 'home', number: '01', title: 'HOME', path: '#home' },
  { id: 'about', number: '02', title: 'ABOUT', path: '#about' },
  { id: 'projects', number: '03', title: 'PROJECTS', path: '#projects' },
  { id: 'skills', number: '04', title: 'SKILLS', path: '#skills' },
  { id: 'journey', number: '05', title: 'JOURNEY', path: '#journey' },
  { id: 'achievements', number: '06', title: 'ACHIEVEMENTS', path: '#achievements' },
  { id: 'contact', number: '07', title: 'CONTACT', path: '#contact' }
];
