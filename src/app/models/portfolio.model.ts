export interface ContactInfo {
  email: string;
  emailOutlook: string;
  phone: string;
  linkedin: string;
}

export interface ExperienceBullet {
  label: string;
  text: string;
}

export interface Job {
  company: string;
  via?: string;
  role: string;
  location: string;
  period: string;
  partTimePeriod?: string;
  project: string;
  bullets: ExperienceBullet[];
  tech: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Degree {
  level: string;
  field: string;
  school: string;
  location: string;
  period: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  issuerType: 'google' | 'udemy' | 'mitpu';
  image: string;
  date?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  contact: ContactInfo;
  experience: Job[];
  skills: SkillGroup[];
  education: Degree[];
  certifications: Certificate[];
}
