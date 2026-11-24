import type { ProjectItem } from './types'

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ai-fake-stock-detector',
    title: 'AI Fake Stock Detector',
    subtitle: 'Financial Anomaly Detection',
    domain: 'AI & ML',
    status: 'Hackathon Project',
    featured: true,
    summary:
      'Combined statistical Z-score thresholds and Isolation Forest anomaly detection on market price and trading-volume features to flag potentially suspicious market activity for retail investors.',
    problem:
      'Retail investors face elevated risk from sudden, anomalous stock price and volume movements that are difficult to spot quickly without structured quantitative screening.',
    role: 'Built market data processing, engineered price and volume features, implemented Z-score and Isolation Forest detection, and presented financial-risk outputs. [Placeholder: Confirm exact team size and personal vs. teammate split]',
    approach: [
      'Processed stock-market data and engineered features examining price movements and trading-volume behaviour.',
      'Calculated statistical Z-scores alongside an Isolation Forest model to flag potentially unusual price or volume patterns.',
      'Combined statistical and machine learning anomaly signals into a unified suspicious-activity indicator.',
      'Presented detection outputs clearly to support financial-risk awareness for retail investors.',
    ],
    stack: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'Isolation Forest', 'Statistical Z-Score'],
    architecture:
      'Market data ingestion -> Feature engineering (price & volume behaviour) -> Dual detection layer (Z-Score + Isolation Forest) -> Risk awareness output presentation.',
    outcome:
      'Awarded Second Place at ByteVerse 1.0 Hackathon. [Placeholder: Confirm verified repository URL, live demo link, and whether any quantitative evaluation metrics should be published]',
    repoPlaceholder: 'Placeholder: Add verified GitHub repository URL for AI Fake Stock Detector',
    demoPlaceholder: 'Placeholder: Add live demo or presentation link if available',
  },
  {
    id: 'business-entity-resolution',
    title: 'Business Entity Resolution',
    subtitle: 'Multi-Source Business Matching',
    domain: 'AI & ML',
    status: 'Research / Challenge',
    featured: true,
    summary:
      'Built an end-to-end entity matching pipeline combining string normalization, character-level TF-IDF cosine-similarity candidate retrieval, and XGBoost match prediction across large business datasets.',
    problem:
      'Matching business records across multiple sources is error-prone due to inconsistent naming, formatting variations, addresses, and country fields across large datasets.',
    role: 'Implemented dataset loading, training/validation/ground-truth workflows, text normalization, TF-IDF nearest-neighbour retrieval, feature engineering, and XGBoost pipeline. [Placeholder: Confirm exact challenge name/organisation and personal vs. team scope]',
    approach: [
      'Loaded large business datasets and organized structured training, validation, and ground-truth workflows.',
      'Normalized business names, addresses, and country fields to reduce cross-record inconsistencies.',
      'Retrieved candidate matches efficiently using character-level TF-IDF and cosine-similarity nearest-neighbour search.',
      'Trained an XGBoost matching pipeline over engineered pair features to predict matches and export structured outputs.',
    ],
    stack: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'TF-IDF', 'XGBoost'],
    architecture:
      'Multi-source records -> Text & field normalization -> Character TF-IDF + Cosine similarity candidate blocking -> Pairwise feature engineering -> XGBoost classifier -> Structured match output.',
    outcome:
      'Delivered working matching pipeline with structured predictions. [Placeholder: Confirm challenge outcome/ranking and GitHub repository URL]',
    repoPlaceholder: 'Placeholder: Add verified GitHub repository URL for Business Entity Resolution',
    demoPlaceholder: 'Placeholder: Add documentation or notebook link if available',
  },
  {
    id: 'solarquest',
    title: 'SolarQuest',
    subtitle: 'Intelligent Solar Recommendation App',
    domain: 'Mobile & API',
    status: 'Hackathon Project',
    featured: true,
    summary:
      'Android application that takes roof area and geographical location inputs and connects them to an intelligent recommendation workflow for rooftop solar suitability assessment.',
    problem:
      'Homeowners and prospective solar adopters lack an accessible mobile way to evaluate rooftop solar suitability from basic roof area and location parameters.',
    role: 'Developed Android application input workflow, connected roof area and geolocation inputs to the solar recommendation workflow, and integrated model outputs into the UI. [Placeholder: Confirm teammate responsibilities and model details]',
    approach: [
      'Developed an Android application capturing roof area and geographical location as user inputs.',
      'Processed user inputs through a structured solar recommendation workflow.',
      'Integrated an intelligent recommendation model with the mobile application for suitability assessment.',
      'Presented actionable solar recommendations to help users explore rooftop solar solutions.',
    ],
    stack: ['Android Development', 'Java', 'Model / API Integration', 'Python'],
    architecture:
      'Android Client (Roof area & geolocation capture) -> Solar recommendation workflow & intelligent model -> Suitability assessment & recommendation display.',
    outcome:
      'Awarded Second Place at GNA University Hackathon 4.0 (Clean and Green Technologies). [Placeholder: Confirm GitHub repository URL and APK/demo availability]',
    repoPlaceholder: 'Placeholder: Add verified GitHub repository URL for SolarQuest',
    demoPlaceholder: 'Placeholder: Add demo video or walkthrough link if available',
  },
  {
    id: 'sangyan-shield',
    title: 'SANGYAN Shield',
    subtitle: 'Cybersecurity Detection App',
    domain: 'Mobile & API',
    status: 'Prototype',
    summary:
      'Cross-platform mobile application integrated with a Python FastAPI backend to submit screenshots and inputs to a cybersecurity detection engine and display returned analysis.',
    problem:
      'Users need a straightforward mobile workflow to inspect suspicious messages or screenshots against an automated cybersecurity analysis backend.',
    role: 'Developed cross-platform mobile workflow, integrated with Python FastAPI backend, wired screenshot upload and response handling, and debugged end-to-end integration. [Placeholder: Confirm personal vs. teammate split]',
    approach: [
      'Built a cross-platform mobile workflow for submitting user inputs to a cybersecurity detection engine.',
      'Integrated the mobile frontend with a Python FastAPI backend communicating with the analysis pipeline.',
      'Connected screenshot-upload and analysis endpoints for backend request handling and model-driven processing.',
      'Tested image uploads, backend requests, and returned analysis responses while troubleshooting integration issues.',
    ],
    stack: ['React Native', 'FastAPI', 'Python', 'REST API Integration'],
    architecture:
      'Cross-platform Mobile UI (Screenshot/input submission) -> FastAPI Backend -> Cybersecurity detection & analysis pipeline -> Structured response UI.',
    outcome:
      'Selected in Top 100 at SANGYAN Hackathon, IIT (BHU). [Placeholder: Confirm GitHub repository URL and demonstrable build status]',
    repoPlaceholder: 'Placeholder: Add verified GitHub repository URL for SANGYAN Shield',
    demoPlaceholder: 'Placeholder: Add demo video or API docs link if available',
  },
]
