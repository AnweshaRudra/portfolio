import type { ExperienceItem } from './types'

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'internship-readiness',
    title: 'Seeking Technical Internships',
    context: 'Software Development • AI/ML • Data Analytics',
    period: 'Current Focus (B.Tech CSE, 2024 – 2028)',
    statusNote:
      'No prior corporate internship listed yet — Placeholder: Add any formal internships, open-source roles, or campus leadership if applicable.',
    responsibilities: [
      'Building Python-based data processing, normalization, and machine learning pipelines.',
      'Integrating trained analytical models with mobile and web applications via REST APIs.',
      'Delivering end-to-end prototypes under time constraints in collaborative hackathon teams.',
    ],
    challenges:
      'Bridging model pipelines with reliable user-facing mobile workflows and handling messy, real-world multi-source datasets.',
  },
  {
    id: 'hackathon-engineering',
    title: 'Collaborative Hackathon Engineering',
    context: 'ByteVerse 1.0 • GNA University 4.0 • IIT (BHU) SANGYAN • AWS ML',
    period: 'Undergraduate Projects (Verified)',
    statusNote: 'Verified from resume project and achievement records.',
    responsibilities: [
      'Engineered statistical + Isolation Forest anomaly detection workflows for retail financial risk awareness.',
      'Designed FastAPI + React Native screenshot upload and analysis integration, testing and troubleshooting request/response flows.',
      'Connected Android geolocation and roof-area capture with intelligent solar suitability recommendations.',
    ],
    challenges:
      'Troubleshooting mobile-to-FastAPI image upload pipelines, normalizing noisy multi-source entity records, and balancing prototype scope during hackathons.',
  },
]
