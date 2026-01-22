# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 14 web application for a digital agency offering web development, mobile development, marketing, and AI automation services. The site features a bilingual interface (English/French), a client portal with project management, and integrates with Appwrite for backend services.

## Common Commands

### Development
```bash
npm run dev        # Start development server on http://localhost:3000
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run Biome linter and formatter checks
npm run lint:fix   # Run Biome and fix issues automatically
npm run format     # Format all files with Biome
```

### Testing
The project uses Jest and React Testing Library. Tests are located in `__tests__/` directory:
```bash
# Note: No test script defined in package.json yet
# Tests exist but need to be configured with a test runner
```

### Git Hooks
Husky is configured with pre-commit hooks:
- `npx lint-staged` - Runs Biome on staged files (check and format)

## Project Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **UI**: React 18, Tailwind CSS, Radix UI, Framer Motion
- **Backend**: Appwrite (cloud database, authentication, storage)
- **Forms**: react-hook-form with Zod validation
- **i18n**: next-i18n-router with react-intl
- **Email**: Resend with react-email
- **Analytics**: Vercel Analytics, Google Analytics, Meta Pixel
- **Code Quality**: Biome (linting, formatting, import sorting)

### Directory Structure

#### `/app/[locale]`
Next.js 14 App Router with locale-based routing (en, fr):
- `(home)/` - Marketing site pages (home, pricing, contact, FAQ, packages)
- `portal/` - Authenticated client portal (projects, settings, team, admin)
- `leads/` - Lead management (admin)
- `login/` - Legacy login page

#### `/components`
Feature-organized components:
- `ui/` - shadcn/ui components (button, dialog, form, etc.)
- `shared/` - Reusable components (Header, Footer, CalButton, GoogleAnalytics)
- `hero/` - Hero section components with TypeForm modals (AIAutomationTypeForm, WebsiteTypeForm)
- `contact/` - Contact form components
- `pricing/` - Pricing tier cards and packages
- `portal/` - Client portal components (ProjectCard, PhaseProgress, etc.)
- `animations/` - Animation components (3D globe, particles, etc.)

#### `/lib`
Core business logic and utilities:
- `appwrite.ts` - Client-side Appwrite SDK configuration with auth helpers
- `appwrite-server.ts` - Server-side Appwrite SDK with API key for admin operations
- `portal-services.ts` - Type definitions and service configurations for portal (Projects, Phases, Invoices, Messages, Files, Notifications)
- `form-submission.ts` - Form submission handlers for lead generation
- `pricing-packages.ts` - Package tier configurations
- `send-email.ts` - Email service integration
- `turnstile-validation.ts` - Cloudflare Turnstile captcha validation

#### `/contexts`
React Context providers:
- `AuthContext.tsx` - Authentication state management (user, profile, role-based access)
- `ProjectContext.tsx` - Project management state for portal

#### `/constants`
Static data and configurations:
- Services, features, testimonials, products, tiers
- `LanguageChanger.tsx` - Language switcher component

#### `/locales`
i18n translation files:
- `en.json` - English translations
- `fr.json` - French translations
- `es.json` - Spanish translations (present but not configured)

#### `/hooks`
Custom React hooks for reusable logic

#### `/utils`
Utility functions (cn.ts for className merging)

### Internationalization (i18n)

The app supports English and French via next-i18n-router:
- Routes are prefixed with locale: `/en/`, `/fr/`
- `i18nConfig.ts` - i18n configuration (locales: en, fr)
- `middleware.ts` - Handles locale routing
- Translation files in `/locales/` directory
- Use react-intl's `useIntl()` hook and `FormattedMessage` component

**Important**: When adding new user-facing text:
1. Add the text to both `locales/en.json` and `locales/fr.json`
2. Use `useIntl()` or `<FormattedMessage id="..." />` to reference translations
3. Do NOT hardcode English text in components

### Authentication & Authorization

Uses Appwrite authentication with role-based access control:
- **Roles**: `client`, `admin`, `manager` (defined in `lib/appwrite.ts`)
- **Client-side**: `lib/appwrite.ts` - User auth with document-level permissions
- **Server-side**: `lib/appwrite-server.ts` - Admin operations bypassing permissions (uses API key)
- **Context**: `contexts/AuthContext.tsx` - Auth state and helpers
- **Helpers**: `authHelpers.isAdmin()`, `authHelpers.hasRole()`, `authHelpers.isManagerOrAdmin()`

### Portal System

Client portal for project management (`app/[locale]/portal/`):
- **Projects**: Track web/mobile/marketing/AI projects with phases, status, timeline
- **Phases**: Custom phases per project with progress tracking
- **Invoices**: Billing and payment tracking
- **Messages**: Client-admin communication system
- **Files**: Project deliverables and attachments (Appwrite Storage)
- **Notifications**: Real-time updates

Service types and project structure defined in `lib/portal-services.ts`.

### Environment Variables

Required environment variables (see `.env.example`):
- Appwrite: Project ID, endpoint, database/collection IDs
- Appwrite API key (server-side only, for admin operations)
- Resend API key (email)
- Calendly URL (booking widget)

**Never commit** `.env` or `.env.local` files.

### Modal & Script Loading

**Known Issue**: Cal.com and other third-party scripts must be loaded once globally to avoid duplicate registration errors. See `MODAL_ERRORS_FIX.md` for details.

**Pattern**:
```typescript
useEffect(() => {
  // Check if script already exists
  const existingScript = document.querySelector('script[src="..."]')
  if (!existingScript) {
    const script = document.createElement('script')
    // ... load script
    document.head.appendChild(script)
  }
  // Don't remove on unmount - persist globally
}, [])
```

**Modal cleanup**: Use setTimeout before resetting state to allow animations to complete (300ms delay).

## Coding Guidelines

### Component Structure
- **Single Responsibility**: Each component/function should do one job
- **File Organization**: Create mini-components for specific tasks
- **Readability**: Prioritize clear, readable code over clever solutions

### Code Style
- Use TypeScript path alias `@/*` to reference project root
- Use `cn()` utility (from `utils/cn.ts`) for conditional className merging
- Prefix unused variables with `_` (Biome will not warn about these)
- Avoid `console.log` (use `console.warn` or `console.error` if needed - enforced by Biome)
- Code formatting is handled by Biome (single quotes, 2 spaces, semicolons as needed)
- Biome automatically organizes imports on save

### Comments
- Add comments with examples when logic is non-obvious
- Avoid "frilly" language - be direct and technical

### Writing Copy
- Write as a professional copywriter
- Avoid overly salesy or "frilly" language
- Influence users to take action without being pushy
- Consider Alex Hormozi's principles for persuasive writing

### Styling
- Use Tailwind CSS utility classes
- Custom color palette: sage (primary), stone (secondary), sky (accent), cream (background)
- Theme supports dark mode via `darkMode: 'class'`
- Custom animations: scroll, fade-in, shimmer, pulse-soft, float, breathe

### Forms
- Use react-hook-form for form state management
- Use Zod for schema validation
- Example pattern in TypeForm modals and contact forms

### Data Fetching
- **Client components**: Use Appwrite client SDK (`lib/appwrite.ts`)
- **Server components/API routes**: Use Appwrite server SDK (`lib/appwrite-server.ts`)
- Server SDK bypasses document permissions - use for admin operations only

## Path Aliases

TypeScript path alias configured in `tsconfig.json`:
```typescript
"@/*" => "./*"
```

Example:
```typescript
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { account } from '@/lib/appwrite'
```

## Known Issues & Documentation

- **Modal Errors**: See `MODAL_ERRORS_FIX.md` for Cal.com script loading fixes
- **No Test Runner**: Tests exist in `__tests__/` but package.json doesn't define a test script
- **Spanish locale**: `locales/es.json` exists but not configured in `i18nConfig.ts`

## Important Reminders

- **Always translate**: Add text to both English and French locale files
- **Don't create .md files** unless explicitly requested (per .cursorrules)
- **Environment security**: Never expose API keys, especially `APPWRITE_API_KEY`
- **Role-based access**: Use `AuthContext` helpers to check permissions before showing/allowing actions
