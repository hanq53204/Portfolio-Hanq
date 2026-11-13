export type Language = 'vi' | 'en';
export type Theme = 'dark' | 'light';

export type SectionId = 'home' | 'about' | 'projects' | 'experience' | 'contact';

export type ProjectCategory =
  | 'All'
  | 'Monitoring & DevOps'
  | 'Security & ML'
  | 'System Admin';

export type SkillIconKey = 'server' | 'activity' | 'shield' | 'terminal';

export interface NavLinkItem {
  id: SectionId;
  label: string;
  href: string;
}

export interface NavData {
  brandName: string;
  brandTag: string;
  links: NavLinkItem[];
  themeToLightLabel: string;
  themeToDarkLabel: string;
  languageAriaLabel: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
}

export interface TerminalCommandInfo {
  command: string;
  description: string;
  output: string[];
}

export interface TerminalData {
  title: string;
  shellBadge: string;
  promptUser: string;
  welcomeLines: string[];
  inputLabel: string;
  inputPlaceholder: string;
  quickChipsLabel: string;
  clearLabel: string;
  clearDescription: string;
  clearedNotice: string;
  historyHint: string;
  unknownCommandPrefix: string;
  helpHint: string;
  commands: Record<string, TerminalCommandInfo>;
}

export interface HeroData {
  greeting: string;
  name: string;
  role: string;
  summary: string;
  ctaProjects: string;
  ctaCv: string;
  ctaContact: string;
  cvUrl: string;
  cvNotice: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  icon: SkillIconKey;
  skills: string[];
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutData {
  eyebrow: string;
  title: string;
  subtitle: string;
  storyTitle: string;
  storyParagraphs: string[];
  methodologyTitle: string;
  methodologyPoints: string[];
  stats: AboutStat[];
  skillsTitle: string;
  skillGroups: SkillGroup[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  summary: string;
  problem: string;
  architecture: string;
  outcome: string;
  highlights: string[];
  techStack: string[];
  statusLabel: string;
  repoUrl?: string;
  demoUrl?: string;
}

export interface ProjectsData {
  eyebrow: string;
  title: string;
  subtitle: string;
  categories: ProjectCategory[];
  filterAriaLabel: string;
  viewDetailsLabel: string;
  closeModalLabel: string;
  problemLabel: string;
  architectureLabel: string;
  outcomeLabel: string;
  highlightsLabel: string;
  techStackLabel: string;
  sourceLabel: string;
  demoLabel: string;
  emptyCategoryMessage: string;
  items: ProjectItem[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  type: 'education' | 'work';
  description: string;
  highlights: string[];
  tags: string[];
}

export interface ExperienceData {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: ExperienceItem[];
}

export interface SocialLinkItem {
  id: 'email' | 'github' | 'linkedin';
  label: string;
  value: string;
  href: string;
}

export interface ContactData {
  eyebrow: string;
  title: string;
  subtitle: string;
  locationLabel: string;
  locationValue: string;
  availabilityLabel: string;
  availabilityValue: string;
  socialTitle: string;
  copyLabel: string;
  copiedLabel: string;
  openLinkLabel: string;
  socialLinks: SocialLinkItem[];
  form: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submittingLabel: string;
    successMessage: string;
    errorMessage: string;
    sendAnotherLabel: string;
  };
}

export interface FooterData {
  brandName: string;
  tagline: string;
  systemStatusLabel: string;
  systemStatusValue: string;
  quickLinksTitle: string;
  connectTitle: string;
  location: string;
  builtWith: string;
  copyright: string;
}

export interface PortfolioContent {
  metaTitle: string;
  nav: NavData;
  hero: HeroData;
  terminal: TerminalData;
  about: AboutData;
  projects: ProjectsData;
  experience: ExperienceData;
  contact: ContactData;
  footer: FooterData;
}

export type BilingualPortfolioData = Record<Language, PortfolioContent>;

