interface I18nConfig {
  prefixDefault: boolean
  locales: string[]
  defaultLocale: string
}

const i18nConfig: I18nConfig = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  prefixDefault: true, // Set to true to ensure consistent routing with locale prefixes
}

export default i18nConfig
