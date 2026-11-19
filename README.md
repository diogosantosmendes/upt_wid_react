# UPT WID React

A React single-page application for viewing and managing charging stations. The frontend is built with TypeScript and Vite, uses React Router for navigation, Bootstrap for styling, Google OAuth for sign-in, and the station API for authenticated data operations.

## Getting started

Requirements: Node.js and npm.

```sh
npm install
```

Create a `.env.local` file in the project root and provide the Google OAuth client ID:

```dotenv
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

The client ID is public configuration, not a secret. Never put private credentials or API secrets in `VITE_` variables because Vite exposes them to browser code.

Start the development server:

```sh
npm run dev
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check the app and create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
src/
  auth/         Google OAuth integration and auth-related props
  components/   Reusable UI, grouped by feature
  contexts/     Session and theme providers
  hooks/        Hooks for consuming shared contexts
  pages/        Route-level screens
  services/     API access and shared request configuration
  types/        Domain and shared TypeScript types
  assets/       Static data and assets imported by the app
```

The app is bootstrapped in `src/main.tsx`, where the session and theme providers wrap the router. `src/App.tsx` defines the authenticated application routes. Pages compose feature components; components use typed props and call services for API operations. Shared session and theme state belongs in their existing contexts and is consumed through hooks. Station API requests are centralized in `src/services/StationService.ts` and use the shared authenticated request helper in `src/services/configs.ts`.

The router uses `/upt_wid_react/` as its base path. Preserve this when changing route or deployment behavior.

## AI-assisted development

GitHub Copilot's repository-specific guidance is in [`.github/copilot-instructions.md`](.github/copilot-instructions.md). Read it along with the relevant neighboring code before making changes.
