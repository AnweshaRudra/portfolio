import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

/**
 * Generates a clean, ATS-readable single-page A4 PDF resume at public/Anwesha_Rudra_Resume.pdf
 * using only verified facts supplied by Anwesha Rudra.
 */
function escapePdfText(text) {
  return text
    .replaceAll('\\', '\\\\')
    .replaceAll('(', '\\(')
    .replaceAll(')', '\\)')
    .replace(/[^\x20-\x7E]/g, (ch) => {
      if (ch === '–' || ch === '—') return '-'
      if (ch === '•') return '*'
      if (ch === '“' || ch === '”') return '"'
      if (ch === '’') return "'"
      return ' '
    })
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/)
  const lines = []
  let current = ''
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length <= maxChars) {
      current = candidate
    } else {
      if (current) lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  return lines
}

function buildResumeContentStream() {
  const ops = []
  let y = 804
  const left = 44
  const right = 551

  const drawText = (text, x, yPos, font = 'F1', size = 9.5, gray = 0.12) => {
    ops.push(`${gray} ${gray} ${gray} rg`)
    ops.push(`BT /${font} ${size} Tf 1 0 0 1 ${x} ${yPos} Tm (${escapePdfText(text)}) Tj ET`)
  }

  const drawRule = (yPos) => {
    ops.push('0.68 0.54 0.27 RG 0.8 w')
    ops.push(`${left} ${yPos} m ${right} ${yPos} l S`)
  }

  const sectionHeader = (title) => {
    y -= 10
    drawText(title, left, y, 'F2', 10.5, 0.1)
    y -= 4
    drawRule(y)
    y -= 12
  }

  // Header
  drawText('ANWESHA RUDRA', left, y, 'F2', 18, 0.08)
  y -= 15
  drawText(
    'Dehradun, Uttarakhand, India  |  +91 6289097311  |  anwesharudra2005@gmail.com',
    left,
    y,
    'F1',
    9,
    0.25,
  )
  y -= 12
  drawText(
    'GitHub: https://github.com/AnweshaRudra  |  LinkedIn: https://www.linkedin.com/in/anwesha-rudra-00720a321/',
    left,
    y,
    'F1',
    8.6,
    0.25,
  )
  y -= 13
  drawText(
    '"Part problem-solver, part builder, full-time learner - always compiling something new."',
    left,
    y,
    'F3',
    9,
    0.28,
  )

  // Summary
  sectionHeader('PROFESSIONAL SUMMARY')
  const summaryLines = wrapText(
    'Computer Science and Engineering undergraduate with project experience in machine learning, data processing, business entity resolution, cybersecurity, and mobile application development. Experienced in building Python-based data workflows, integrating intelligent models with applications, and developing end-to-end solutions through collaborative hackathon projects. Seeking technical internships in software development, AI/ML, and data analytics.',
    102,
  )
  for (const line of summaryLines) {
    drawText(line, left, y, 'F1', 9.2, 0.14)
    y -= 11.5
  }

  // Technical Skills
  sectionHeader('TECHNICAL SKILLS')
  const skillRows = [
    ['Programming:', 'Python, Java, JavaScript, SQL'],
    [
      'Data & Machine Learning:',
      'pandas, NumPy, scikit-learn, data cleaning, feature engineering, anomaly detection',
    ],
    [
      'Backend & Mobile:',
      'FastAPI, React Native, Android development, model/API integration',
    ],
    ['Tools:', 'Git, GitHub'],
  ]
  for (const [label, value] of skillRows) {
    drawText(label, left, y, 'F2', 9.2, 0.12)
    drawText(value, left + 122, y, 'F1', 9.2, 0.14)
    y -= 12
  }

  // Projects
  sectionHeader('PROJECTS')
  const projects = [
    {
      heading: 'AI Fake Stock Detector | Financial Anomaly Detection',
      bullets: [
        'Processed stock-market data and engineered features to examine price movements and trading-volume behaviour.',
        'Calculated Z-scores and implemented Isolation Forest to flag potentially unusual price or volume patterns.',
        'Combined statistical and ML-based anomaly detection to identify potentially suspicious market activity and support financial-risk awareness for retail investors.',
      ],
    },
    {
      heading: 'Business Entity Resolution | Multi-Source Business Matching',
      bullets: [
        'Loaded large business datasets, organized training/validation/ground-truth workflows, and normalized business names, addresses, and country fields.',
        'Retrieved candidate matches via character-level TF-IDF and cosine-similarity nearest-neighbour search; trained an XGBoost matching pipeline to generate structured outputs.',
      ],
    },
    {
      heading: 'SolarQuest | Intelligent Solar Recommendation App',
      bullets: [
        'Developed an Android application using roof area and geographical location inputs connected to a solar recommendation workflow and intelligent suitability model.',
      ],
    },
    {
      heading: 'SANGYAN Shield | Cybersecurity Detection App',
      bullets: [
        'Developed a cross-platform mobile workflow integrated with a Python FastAPI backend for screenshot-upload analysis and end-to-end request/response testing.',
      ],
    },
  ]

  for (const proj of projects) {
    drawText(proj.heading, left, y, 'F2', 9.6, 0.1)
    y -= 12
    for (const bullet of proj.bullets) {
      const wrapped = wrapText(bullet, 98)
      wrapped.forEach((line, idx) => {
        drawText(idx === 0 ? `* ${line}` : `  ${line}`, left + 6, y, 'F1', 8.9, 0.16)
        y -= 11
      })
    }
    y -= 3
  }

  // Education
  sectionHeader('EDUCATION')
  const educationRows = [
    'The ICFAI University, Dehradun | B.Tech, Computer Science Engineering (Aug 2024 - May 2028)',
    'West Bengal Board of Higher Secondary Education (WBBHSE) | Higher Secondary, PCMB (Aug 2022 - Jul 2024)',
    'West Bengal Board of Secondary Education (WBBSE) | Secondary Education (Aug 2021 - Jul 2022)',
  ]
  for (const row of educationRows) {
    drawText(row, left, y, 'F1', 9, 0.14)
    y -= 12
  }

  // Achievements & Certification
  sectionHeader('ACHIEVEMENTS & CERTIFICATION')
  const achievements = [
    'Second Place - ByteVerse 1.0 Hackathon, AI Fake Stock Detector',
    'Second Place - GNA University Hackathon 4.0, Clean and Green Technologies, SolarQuest',
    'Top 100 - SANGYAN Hackathon, IIT (BHU)',
    'Participant - AWS Machine Learning Hackathon',
    'Java Beginner to Master - Udemy (Instructor: Abdul Bari)',
  ]
  for (const item of achievements) {
    drawText(`* ${item}`, left + 4, y, 'F1', 9, 0.14)
    y -= 11.5
  }

  return ops.join('\n')
}

function buildPdf(streamContent) {
  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>\nendobj\n',
    `7 0 obj\n<< /Length ${Buffer.byteLength(streamContent, 'utf8')} >>\nstream\n${streamContent}\nendstream\nendobj\n`,
  ]

  let pdf = '%PDF-1.4\n'
  const offsets = [0]
  for (const obj of objects) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'))
    pdf += obj
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf8')
  pdf += `xref\n0 ${objects.length + 1}\n`
  pdf += '0000000000 65535 f \n'
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`
  return Buffer.from(pdf, 'utf8')
}

async function main() {
  const stream = buildResumeContentStream()
  const pdfBuffer = buildPdf(stream)
  const outputPath = resolve('public/Anwesha_Rudra_Resume.pdf')
  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, pdfBuffer)
  console.log(`Generated ${outputPath} (${pdfBuffer.byteLength} bytes)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
