'use client'

import { Timeline } from './Component'

export { IpadCard } from './components/IpadCard'

// Hardcoded SMMA timeline data to bypass i18n caching issues
const smmaTimelineData = [
  {
    title: 'Clinic Audit & Strategy',
    content:
      "We analyze your clinic's current marketing, patient demographics, and competitive landscape. You'll receive a custom growth roadmap identifying your biggest opportunities for patient acquisition.",
  },
  {
    title: 'Website & Funnel Build',
    content:
      'We design and build a high-converting website optimized for integrative health. Complete with patient booking systems, lead capture funnels, and trust-building elements that turn visitors into appointments.',
  },
  {
    title: 'Launch Patient Acquisition',
    content:
      'We launch targeted ad campaigns across Google and Meta, reaching patients actively searching for integrative health solutions. Every campaign is designed to fill your appointment calendar.',
  },
  {
    title: 'Scale & Optimize',
    content:
      'Using real-time analytics, we continuously optimize your campaigns for lower cost-per-patient and higher ROI. As results compound, we scale your marketing to match your growth goals.',
  },
]

export function ProjectLifeCycleTimeline() {
  return (
    <div className="w-full">
      <Timeline data={smmaTimelineData} />
    </div>
  )
}
