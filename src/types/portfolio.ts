export interface SkillItem {
  id: string;
  name: string;
  category: 'programming' | 'web' | 'ai' | 'cs';
  level: number;
  iconName: string;
  description: string;
  highlight?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDetails: string[];
  features: string[];
  tags: string[];
  category: 'AI & Fullstack' | 'Automation & AI' | 'C++ & Systems' | 'Database Application';
  githubUrl: string;
  liveUrl?: string;
  stats: { label: string; value: string }[];
  featured: boolean;
  accentColor: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  organization: string;
  description: string;
  details: string[];
  status: 'Completed' | 'In Progress' | 'Upcoming';
  skills: string[];
}

export interface JourneyStep {
  step: number;
  title: string;
  shortDesc: string;
  badge: string;
  skills: string[];
  status: 'Mastered' | 'Active Focus' | 'Next Frontier';
}
