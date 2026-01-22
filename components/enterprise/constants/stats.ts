import { Building2, Users, TrendingUp, DollarSign } from 'lucide-react'
import { IntlShape } from 'react-intl'

export const getEnterpriseStats = (intl: IntlShape) => [
  {
    number: '50+',
    label: intl.formatMessage({
      id: 'enterprise.stats.clinicsScaled',
      defaultMessage: 'Integrative Health Clinics Scaled',
    }),
    icon: Building2,
    numericValue: 50,
    suffix: '+',
  },
  {
    number: '3x',
    label: intl.formatMessage({
      id: 'enterprise.stats.patientIncrease',
      defaultMessage: 'Average Patient Increase',
    }),
    icon: Users,
    numericValue: 3,
    suffix: 'x',
  },
  {
    number: '$2.4M',
    label: intl.formatMessage({
      id: 'enterprise.stats.revenueGenerated',
      defaultMessage: 'Revenue Generated for Clinics',
    }),
    icon: DollarSign,
    numericValue: 2.4,
    suffix: 'M',
    prefix: '$',
  },
  {
    number: '312%',
    label: intl.formatMessage({
      id: 'enterprise.stats.avgRoi',
      defaultMessage: 'Avg. Marketing ROI',
    }),
    icon: TrendingUp,
    numericValue: 312,
    suffix: '%',
  },
]
