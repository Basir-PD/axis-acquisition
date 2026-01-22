'use client'

import { usePathname } from 'next/navigation'
import i18nConfig from '@/i18nConfig'

export default function LanguageChanger() {
  const currentPathname = usePathname()

  // Get current locale from pathname or default
  const getCurrentLocale = () => {
    const pathSegments = currentPathname.split('/').filter(Boolean)
    const firstSegment = pathSegments[0]

    // Check if the first segment is a locale
    if (i18nConfig.locales.includes(firstSegment)) {
      return firstSegment
    }

    // If no locale in URL, it's the default locale
    return i18nConfig.defaultLocale
  }

  const currentLocale = getCurrentLocale()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value

    if (newLocale === currentLocale) return

    // Set cookie for next-i18n-router
    const expires = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    ).toUTCString()
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

    // Remove current locale from the path if it exists
    const pathSegments = currentPathname.split('/').filter(Boolean)
    let pathWithoutLocale = currentPathname

    // If first segment is a locale, remove it
    if (i18nConfig.locales.includes(pathSegments[0])) {
      pathWithoutLocale = '/' + pathSegments.slice(1).join('/')
    }

    // Clean up the path
    if (pathWithoutLocale === '/') pathWithoutLocale = ''

    // Build new path with new locale (always include locale prefix)
    const newPathname = `/${newLocale}${pathWithoutLocale}`

    // Direct navigation for speed
    window.location.href = newPathname
  }

  return (
    <div className="relative">
      <select
        onChange={handleChange}
        value={currentLocale}
        className="cursor-pointer w-full text-xs md:text-base bg-transparent transition-all ease-in-out duration-300 
             text-gray-900 dark:text-white rounded-md px-2 md:px-4 py-1 
            focus:outline-none appearance-none"
      >
        <option
          className="dark:bg-gray-800 text-gray-900 dark:text-white"
          value="en"
        >
          En
        </option>
        <option
          className="dark:bg-gray-800 text-gray-900 dark:text-white"
          value="fr"
        >
          Fr
        </option>
      </select>
    </div>
  )
}
