import { IntlShape } from 'react-intl'

export interface PackageFeature {
  text: string
  included: boolean
}

export interface PricingPackage {
  id: string
  name: string
  price: string
  priceValue?: number // Numeric value for comparison
  description: string
  pages: string
  timeToMarket: string
  postLaunchSupport: string
  revisions?: string
  featured?: boolean
  popular?: boolean
  features: string[]
  detailedFeatures?: PackageFeature[]
}

export const getPackages = (intl: IntlShape): PricingPackage[] => [
  {
    id: 'standard',
    name: intl.formatMessage({
      id: 'pricing.tiers.standard.name',
      defaultMessage: 'Standard',
    }),
    price: intl.formatMessage({
      id: 'pricing.tiers.standard.price',
      defaultMessage: '$1,500',
    }),
    priceValue: 1500,
    description: intl.formatMessage({
      id: 'pricing.tiers.standard.description',
      defaultMessage:
        'Ideal for new & small businesses. A great starting point.',
    }),
    pages: intl.formatMessage({
      id: 'pricing.tiers.standard.pages',
      defaultMessage: 'Up to 5 pages',
    }),
    timeToMarket: intl.formatMessage({
      id: 'pricing.tiers.standard.timeToMarket',
      defaultMessage: '2 weeks',
    }),
    postLaunchSupport: intl.formatMessage({
      id: 'pricing.tiers.standard.postLaunchSupport',
      defaultMessage: '2 weeks of post-launch support',
    }),
    revisions: intl.formatMessage({
      id: 'pricing.tiers.standard.revisions',
      defaultMessage: '3 revisions',
    }),
    featured: true,
    popular: true,
    features: [
      intl.formatMessage({
        id: 'pricing.features.mobileSeoOptimization',
        defaultMessage: 'Mobile & SEO optimization',
      }),
      intl.formatMessage({
        id: 'pricing.features.contactForm',
        defaultMessage: 'Contact form',
      }),
      intl.formatMessage({
        id: 'pricing.features.calendarAppointment',
        defaultMessage: 'Calendar appointment integration',
      }),
      intl.formatMessage({
        id: 'pricing.features.aiChatbot',
        defaultMessage: 'AI-powered chatbot',
      }),
      intl.formatMessage({
        id: 'pricing.features.contentManagement',
        defaultMessage: 'Content Management System',
      }),
      intl.formatMessage({
        id: 'pricing.features.logoDesign',
        defaultMessage: 'Logo design included',
      }),
      intl.formatMessage({
        id: 'pricing.features.hosting',
        defaultMessage: '6 months free hosting, then $15/month',
      }),
    ],
  },
  {
    id: 'premium',
    name: intl.formatMessage({
      id: 'pricing.tiers.premium.name',
      defaultMessage: 'Premium',
    }),
    price: intl.formatMessage({
      id: 'pricing.tiers.premium.price',
      defaultMessage: '$4,500',
    }),
    priceValue: 4500,
    description: intl.formatMessage({
      id: 'pricing.tiers.premium.description',
      defaultMessage:
        'More power, more features. Ideal for growth stage companies which need more from their website.',
    }),
    pages: intl.formatMessage({
      id: 'pricing.tiers.premium.pages',
      defaultMessage: 'Up to 10 pages',
    }),
    timeToMarket: intl.formatMessage({
      id: 'pricing.tiers.premium.timeToMarket',
      defaultMessage: '15 to 25 days',
    }),
    postLaunchSupport: intl.formatMessage({
      id: 'pricing.tiers.premium.postLaunchSupport',
      defaultMessage: '60 days post-launch support',
    }),
    revisions: intl.formatMessage({
      id: 'pricing.tiers.premium.revisions',
      defaultMessage: '4 rounds of revisions',
    }),
    features: [
      intl.formatMessage({
        id: 'pricing.features.everythingInStandard',
        defaultMessage: 'Everything in Standard',
      }),
      intl.formatMessage({
        id: 'pricing.features.customAnimations',
        defaultMessage: 'Custom Animations',
      }),
      intl.formatMessage({
        id: 'pricing.features.advancedSeo',
        defaultMessage: 'Advanced SEO',
      }),
      intl.formatMessage({
        id: 'pricing.features.blogSetup',
        defaultMessage: 'Blog Setup',
      }),
      intl.formatMessage({
        id: 'pricing.features.ecommerce',
        defaultMessage: 'E-commerce Ready',
      }),
      intl.formatMessage({
        id: 'pricing.features.emailMarketing',
        defaultMessage: 'Email Marketing Integration',
      }),
      intl.formatMessage({
        id: 'pricing.features.advancedAnalytics',
        defaultMessage: 'Advanced Analytics',
      }),
      intl.formatMessage({
        id: 'pricing.features.customGraphics',
        defaultMessage: 'Custom Graphics',
      }),
      // intl.formatMessage({
      //   id: 'pricing.features.multiLanguage',
      //   defaultMessage: 'Multi-language Support',
      // }),
      intl.formatMessage({
        id: 'pricing.features.unlimitedStockPhotos',
        defaultMessage: 'Unlimited Stock Photos',
      }),
    ],
  },
  {
    id: 'enterprise',
    name: intl.formatMessage({
      id: 'pricing.tiers.enterprise.name',
      defaultMessage: 'Enterprise',
    }),
    price: intl.formatMessage({
      id: 'pricing.tiers.enterprise.price',
      defaultMessage: 'Custom Quote',
    }),
    description: intl.formatMessage({
      id: 'pricing.tiers.enterprise.description',
      defaultMessage:
        'Ultimate power & features. Ideal for established businesses ready for exponential growth.',
    }),
    pages: intl.formatMessage({
      id: 'pricing.tiers.enterprise.pages',
      defaultMessage: 'Max 50 pages',
    }),
    timeToMarket: intl.formatMessage({
      id: 'pricing.tiers.enterprise.timeToMarket',
      defaultMessage: 'Custom timeline',
    }),
    postLaunchSupport: intl.formatMessage({
      id: 'pricing.tiers.enterprise.postLaunchSupport',
      defaultMessage: 'Extended support',
    }),
    revisions: intl.formatMessage({
      id: 'pricing.tiers.enterprise.revisions',
      defaultMessage: 'Unlimited revisions',
    }),
    features: [
      intl.formatMessage({
        id: 'pricing.features.everythingInPremium',
        defaultMessage: 'Everything in Premium',
      }),
      intl.formatMessage({
        id: 'pricing.features.customDevelopment',
        defaultMessage: 'Custom Development',
      }),
      intl.formatMessage({
        id: 'pricing.features.apiIntegrations',
        defaultMessage: 'API Integrations',
      }),
      intl.formatMessage({
        id: 'pricing.features.dedicatedSupport',
        defaultMessage: 'Dedicated Support Team',
      }),
      intl.formatMessage({
        id: 'pricing.features.performanceOptimization',
        defaultMessage: 'Performance Optimization',
      }),
      intl.formatMessage({
        id: 'pricing.features.customCms',
        defaultMessage: 'Custom CMS',
      }),
      intl.formatMessage({
        id: 'pricing.features.advancedSecurity',
        defaultMessage: 'Advanced Security',
      }),
      intl.formatMessage({
        id: 'pricing.features.loadBalancing',
        defaultMessage: 'Load Balancing',
      }),
      intl.formatMessage({
        id: 'pricing.features.prioritySupport',
        defaultMessage: '24/7 Priority Support',
      }),
      intl.formatMessage({
        id: 'pricing.features.sla',
        defaultMessage: 'SLA Guarantee',
      }),
    ],
  },
]
