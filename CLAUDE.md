# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Axis Acquisition is a Next.js 14 marketing website and client portal for a Canadian digital agency offering websites, AI automation, chatbots, and voice assistants. The application uses Appwrite for backend services (authentication, database) and supports English/French internationalization.

## Commands

```bash
yarn dev          # Start development server (localhost:3000)
yarn build        # Production build
yarn lint         # Run ESLint
yarn start        # Start production server
```

Pre-commit hooks run `lint-staged` which applies ESLint and Prettier to staged files.

## Architecture

### Routing Structure

- **`app/[locale]/`** - All routes are locale-prefixed (en, fr)
- **`app/[locale]/(home)/`** - Public marketing pages (homepage, pricing, contact, FAQ, packages)
- **`app/[locale]/portal/`** - Authenticated client portal (dashboard, projects, settings, team, admin)
- **`app/api/`** - API routes for email sending and admin operations

### Key Architectural Patterns

**Internationalization (i18n)**
- Uses `next-i18n-router` middleware for locale routing
- Translation files in `locales/en.json` and `locales/fr.json`
- Messages are flattened and provided via `react-intl` through `ClientIntlProvider`
- Config in `i18nConfig.ts` - locales: `['en', 'fr']`, default: `'en'`

**Authentication & Authorization**
- Appwrite handles auth via `lib/appwrite.ts`
- `AuthContext` provides `user`, `profile`, `signIn`, `signUp`, `signOut`
- Three roles: `client`, `manager`, `admin`
- Role checks: `isAdmin`, `isManager`, `isClient`, `hasRole(roles[])`

**State Management**
- `AuthContext` - Authentication state
- `ProjectContext` - Client project management
- `ContactPopupContext` - Contact form modal state

**Backend Services (Appwrite)**
- Client setup in `lib/appwrite.ts`
- Server-side operations use `lib/appwrite-server.ts`
- CRUD services in `lib/portal-services.ts` for projects, invoices, messages, notifications, files
- Document-level permissions for access control

### Component Organization

- **`components/ui/`** - shadcn/ui primitives (button, input, dialog, etc.)
- **`components/shared/`** - Reusable components (Logo, CTASection, CalButton, etc.)
- **`components/hero/`** - Homepage hero section with TypeForm integrations
- **`components/portal/`** - Portal-specific components (admin tables, auth forms, project management)
- **`components/contact/`**, **`components/faq/`**, **`components/pricing/`** - Page-specific components

### Environment Variables

Required variables (see `.env.example`):
- `NEXT_PUBLIC_APPWRITE_*` - Appwrite project, database, and collection IDs
- `APPWRITE_API_KEY` - Server-side API key for admin operations
- `RESEND_API_KEY` - Email service
- `NEXT_PUBLIC_CALENDLY_URL` - Scheduling integration

## Coding Conventions

**Translations**
- All user-facing text must have translations in both `locales/en.json` and `locales/fr.json`
- Use `useIntl()` hook and `formatMessage()` for translated strings

**Component Design**
- Single responsibility - one component, one job
- Small, focused files preferred over large monolithic components

**Styling**
- Tailwind CSS with shadcn/ui component library
- Config: `components.json` defines aliases and Tailwind setup
- Global styles in `app/[locale]/globals.css`

## Portal Database Collections

| Collection | Purpose |
|------------|---------|
| Users | User profiles linked to Appwrite Auth |
| Projects | Client project records with status tracking |
| Project Phases | Phase progress within projects |
| Invoices | Billing and payment tracking |
| Messages | Support tickets and client communication |
| Message Replies | Threaded message responses |
| Files | Project file attachments |
| Notifications | User notification system |
