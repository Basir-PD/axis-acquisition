import { TimelineStep } from '../components/TimelineStep'
import { FormattedMessage } from 'react-intl'

export const getTimelineData = (intl: any) => [
  {
    title: intl.formatMessage({
      id: 'timeline.steps.planning.title',
      defaultMessage: 'Clinic Audit & Strategy',
    }),
    content: (
      <TimelineStep
        description={
          <FormattedMessage
            id="timeline.steps.planning.description"
            defaultMessage="We analyze your clinic's current marketing, patient demographics, and growth opportunities to create a custom acquisition strategy tailored to integrative medicine."
          />
        }
      />
    ),
  },
  {
    title: intl.formatMessage({
      id: 'timeline.steps.branding.title',
      defaultMessage: 'Website & Funnel Build',
    }),
    content: (
      <TimelineStep
        description={
          <FormattedMessage
            id="timeline.steps.branding.description"
            defaultMessage="We design a conversion-optimized website and patient booking funnel that positions your clinic as the premier integrative health destination in your area."
          />
        }
      />
    ),
  },
  {
    title: intl.formatMessage({
      id: 'timeline.steps.feedback.title',
      defaultMessage: 'Launch Patient Acquisition',
    }),
    content: (
      <TimelineStep
        description={
          <FormattedMessage
            id="timeline.steps.feedback.description"
            defaultMessage="We activate targeted ad campaigns across Google, Facebook, and Instagram to reach health-conscious patients actively seeking integrative care in your market."
          />
        }
      />
    ),
  },
  {
    title: intl.formatMessage({
      id: 'timeline.steps.launch.title',
      defaultMessage: 'Scale & Optimize',
    }),
    content: (
      <TimelineStep
        description={
          <FormattedMessage
            id="timeline.steps.launch.description"
            defaultMessage="We continuously optimize your campaigns, scale what works, and implement retention systems to maximize patient lifetime value and referrals."
          />
        }
      />
    ),
  },
]
