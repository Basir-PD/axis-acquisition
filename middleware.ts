import { i18nRouter } from 'next-i18n-router'
import i18nConfig from './i18nConfig'

// Function that runs before every request
export function middleware(request: any) {
  return i18nRouter(request, i18nConfig)
}

// applies this middleware only to files in the app directory
// and not to the api, static, or _next directories
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}
