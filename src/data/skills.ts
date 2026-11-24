import type { SkillCategory } from './types'

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    houseTitle: 'Order of Syntax',
    categoryName: 'Programming',
    description: 'Core languages used across data workflows, mobile apps, and backend services.',
    skills: ['Python', 'Java', 'JavaScript', 'SQL'],
  },
  {
    id: 'data-ml',
    houseTitle: 'Order of Insight',
    categoryName: 'Data & Machine Learning',
    description: 'Exploratory pipelines, preprocessing, feature construction, and anomaly detection.',
    skills: [
      'pandas',
      'NumPy',
      'scikit-learn',
      'Data Cleaning',
      'Feature Engineering',
      'Anomaly Detection',
    ],
  },
  {
    id: 'backend-mobile',
    houseTitle: 'Order of Craft',
    categoryName: 'Backend & Mobile',
    description: 'Cross-platform and native mobile interfaces integrated with Python APIs and models.',
    skills: ['FastAPI', 'React Native', 'Android Development', 'Model / API Integration'],
  },
  {
    id: 'tools',
    houseTitle: 'Order of the Forge',
    categoryName: 'Tools & Version Control',
    description: 'Source control and collaborative engineering workflows.',
    skills: ['Git', 'GitHub'],
  },
]
