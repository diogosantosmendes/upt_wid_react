# Copilot instructions

## Project shape

- This is a React 19 + TypeScript single-page application built with Vite.
- Keep the existing feature-oriented structure under `src/`: pages compose UI from `components/`, domain types live in `types/`, API calls live in `services/`, and shared state belongs in `contexts/` with consumer hooks in `hooks/`.
- `src/main.tsx` sets up the providers and `BrowserRouter`; `src/App.tsx` owns the authenticated route layout. Preserve the router base path `/upt_wid_react/`.
- Station API operations go through `StationService` and authenticated requests through `authenticatedFetch`; do not introduce a second API access path for the same backend.
- Bootstrap 5 is the existing UI and theme system. Prefer its classes and the existing CSS files over adding a styling framework.

## Implementation conventions

- Use TypeScript and React function components. Define explicit interfaces or types for domain data, component props, and service results; reuse the existing `Station` and `StationForm` types where applicable.
- Follow the formatting and import conventions of the files you touch. Use existing hooks and context APIs for shared state rather than duplicating state across screens.
- Keep UI composition in components, route-level loading and orchestration in pages, and network operations in services. Avoid moving logic across these boundaries without a clear need.
- Handle asynchronous failures explicitly and preserve useful error information. Do not silently swallow errors or add success-shaped fallbacks.
- Keep changes focused. Reuse existing dependencies and helpers; do not add packages or new architecture for a localized feature.
- Keep credentials out of source control. `VITE_` variables are bundled into client code and must never contain private secrets. The Google OAuth client ID is configured as `VITE_GOOGLE_CLIENT_ID`.
- Do not edit generated output, `node_modules`, or local environment files.

## Validation

- Run `npm run build` for TypeScript checking and production compilation.
- Run `npm run lint` for ESLint.
- If a change cannot be exercised by these commands, state what was and was not verified. Do not claim tests passed unless they were run.
