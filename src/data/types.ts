export type DestinationId =
  | 'winterfell'
  | 'citadel'
  | 'kings-landing'
  | 'dragonstone'
  | 'the-wall'
  | 'ravens-keep'

export type SceneMode = 'intro' | 'map' | 'chronicle'

export interface DestinationInfo {
  id: DestinationId
  realmName: string
  portfolioTitle: string
  shortDescription: string
  visualTreatment: string
  regionTag: string
  /** 3D position [x, y, z] on the kingdom map */
  mapPosition: [number, number, number]
  /** Camera position [x, y, z] when focusing this landmark */
  cameraPosition: [number, number, number]
  /** Camera lookAt target [x, y, z] when focusing this landmark */
  cameraTarget: [number, number, number]
  /** Geometry silhouette hint for greybox and map legend */
  landmarkKind: 'keep' | 'spire' | 'citadel' | 'fortress' | 'wall' | 'tower'
  accentHex: string
}

export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  domain: 'AI & ML' | 'Mobile & API'
  status: 'Hackathon Project' | 'Prototype' | 'Research / Challenge' | 'Academic Project'
  featured?: boolean
  summary: string
  problem: string
  role: string
  approach: string[]
  stack: string[]
  architecture: string
  outcome: string
  repoUrl?: string
  repoPlaceholder: string
  demoUrl?: string
  demoPlaceholder: string
}

export interface SkillCategory {
  id: string
  houseTitle: string
  categoryName: string
  description: string
  skills: string[]
}

export interface AchievementItem {
  id: string
  title: string
  eventOrIssuer: string
  type: 'Hackathon Award' | 'Hackathon Selection' | 'Participation' | 'Certification'
  datePlaceholder: string
  relatedProject?: string
  verificationNote?: string
}

export interface EducationItem {
  id: string
  institution: string
  credential: string
  period: string
  notes?: string
}

export interface ExperienceItem {
  id: string
  title: string
  context: string
  period: string
  statusNote: string
  responsibilities: string[]
  challenges: string
}

export interface ProfileData {
  realmTitle: string
  tagline: string
  ownerName: string
  quote: string
  location: string
  targetRoles: string
  summary: string
  emailPlaceholder: string
  emailHref?: string
  phonePlaceholder: string
  githubPlaceholder: string
  githubUrl?: string
  linkedinPlaceholder: string
  linkedinUrl?: string
  resumePlaceholder: string
  resumeUrl?: string
  education: EducationItem[]
}
