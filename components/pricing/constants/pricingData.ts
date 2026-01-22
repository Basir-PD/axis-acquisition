import { IntlShape } from 'react-intl'
import { Tier } from '../types'

export const getWebsitePricingTiers = (intl: IntlShape): Tier[] => [
  {
    name: intl.formatMessage({ id: 'pricing.tiers.websites.premium.name' }),
    id: 'tier-website-premium',
    href: '/contact-form',
    featured: false,
    description: intl.formatMessage({
      id: 'pricing.tiers.websites.premium.description',
    }),
    price: intl.formatMessage({ id: 'pricing.tiers.websites.premium.price' }),
    pages: intl.formatMessage({ id: 'pricing.tiers.websites.premium.pages' }),
    timeToMarket: intl.formatMessage({
      id: 'pricing.tiers.websites.premium.timeToMarket',
    }),
    postLaunchSupport: intl.formatMessage({
      id: 'pricing.tiers.websites.premium.postLaunchSupport',
    }),
    revisions: intl.formatMessage({
      id: 'pricing.tiers.websites.premium.revisions',
    }),
    cta: intl.formatMessage({ id: 'pricing.tiers.websites.premium.cta' }),
    additionalFees: intl.formatMessage({
      id: 'pricing.tiers.websites.premium.additionalFees',
    }),
    mainFeatures: intl
      .formatMessage({ id: 'pricing.tiers.websites.premium.mainFeatures' })
      .split('|')
      .map((feature) => feature.trim()),
  },
  {
    name: intl.formatMessage({ id: 'pricing.tiers.websites.standard.name' }),
    id: 'tier-website-standard',
    href: '/contact-form',
    featured: true,
    description: intl.formatMessage({
      id: 'pricing.tiers.websites.standard.description',
    }),
    price: intl.formatMessage({ id: 'pricing.tiers.websites.standard.price' }),
    pages: intl.formatMessage({ id: 'pricing.tiers.websites.standard.pages' }),
    timeToMarket: intl.formatMessage({
      id: 'pricing.tiers.websites.standard.timeToMarket',
    }),
    postLaunchSupport: intl.formatMessage({
      id: 'pricing.tiers.websites.standard.postLaunchSupport',
    }),
    revisions: intl.formatMessage({
      id: 'pricing.tiers.websites.standard.revisions',
    }),
    cta: intl.formatMessage({ id: 'pricing.tiers.websites.standard.cta' }),
    updateWebsite: intl.formatMessage({
      id: 'pricing.tiers.websites.standard.updateWebsite',
    }),
    additionalFees: intl.formatMessage({
      id: 'pricing.tiers.websites.standard.additionalFees',
    }),
    mainFeatures: intl
      .formatMessage({ id: 'pricing.tiers.websites.standard.mainFeatures' })
      .split('|')
      .map((feature) => feature.trim()),
  },
  {
    name: intl.formatMessage({ id: 'pricing.tiers.websites.enterprise.name' }),
    id: 'tier-website-enterprise',
    href: '/contact-form',
    featured: false,
    description: intl.formatMessage({
      id: 'pricing.tiers.websites.enterprise.description',
    }),
    price: intl.formatMessage({
      id: 'pricing.tiers.websites.enterprise.price',
    }),
    pages: intl.formatMessage({
      id: 'pricing.tiers.websites.enterprise.pages',
    }),
    timeToMarket: intl.formatMessage({
      id: 'pricing.tiers.websites.enterprise.timeToMarket',
    }),
    postLaunchSupport: intl.formatMessage({
      id: 'pricing.tiers.websites.enterprise.postLaunchSupport',
    }),
    revisions: intl.formatMessage({
      id: 'pricing.tiers.websites.enterprise.revisions',
    }),
    cta: intl.formatMessage({ id: 'pricing.tiers.websites.enterprise.cta' }),
    additionalInfo: intl.formatMessage({
      id: 'pricing.tiers.websites.enterprise.additionalInfo',
    }),
    mainFeatures: intl
      .formatMessage({ id: 'pricing.tiers.websites.enterprise.mainFeatures' })
      .split('|')
      .map((feature) => feature.trim()),
  },
]

export const getAIPricingTiers = (intl: IntlShape): Tier[] => [
  {
    name: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.combinedAgents.name',
    }),
    id: 'tier-combined-agents',
    href: '/contact-form',
    featured: false,
    description: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.combinedAgents.description',
    }),
    price: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.combinedAgents.price',
    }),
    pages: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.combinedAgents.pages',
    }),
    timeToMarket: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.combinedAgents.timeToMarket',
    }),
    postLaunchSupport: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.combinedAgents.postLaunchSupport',
    }),
    revisions: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.combinedAgents.revisions',
    }),
    cta: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.combinedAgents.cta',
    }),
    additionalFees: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.combinedAgents.additionalFees',
    }),
    mainFeatures: intl
      .formatMessage({
        id: 'pricing.tiers.aiAutomation.combinedAgents.mainFeatures',
      })
      .split('|')
      .map((feature) => feature.trim()),
  },
  {
    name: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.leadGeneration.name',
    }),
    id: 'tier-lead-generation',
    href: '/contact-form',
    featured: true,
    description: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.leadGeneration.description',
    }),
    price: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.leadGeneration.price',
    }),
    pages: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.leadGeneration.pages',
    }),
    timeToMarket: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.leadGeneration.timeToMarket',
    }),
    postLaunchSupport: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.leadGeneration.postLaunchSupport',
    }),
    revisions: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.leadGeneration.revisions',
    }),
    cta: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.leadGeneration.cta',
    }),
    additionalInfo: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.leadGeneration.additionalInfo',
    }),
    mainFeatures: intl
      .formatMessage({
        id: 'pricing.tiers.aiAutomation.leadGeneration.mainFeatures',
      })
      .split('|')
      .map((feature) => feature.trim()),
  },
  {
    name: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.crmAutomation.name',
    }),
    id: 'tier-crm-automation',
    href: '/contact-form',
    featured: false,
    description: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.crmAutomation.description',
    }),
    price: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.crmAutomation.price',
    }),
    pages: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.crmAutomation.pages',
    }),
    timeToMarket: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.crmAutomation.timeToMarket',
    }),
    postLaunchSupport: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.crmAutomation.postLaunchSupport',
    }),
    revisions: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.crmAutomation.revisions',
    }),
    cta: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.crmAutomation.cta',
    }),
    additionalFees: intl.formatMessage({
      id: 'pricing.tiers.aiAutomation.crmAutomation.additionalFees',
    }),
    mainFeatures: intl
      .formatMessage({
        id: 'pricing.tiers.aiAutomation.crmAutomation.mainFeatures',
      })
      .split('|')
      .map((feature) => feature.trim()),
  },
]

// Backward compatibility
export const getPricingTiers = getWebsitePricingTiers
