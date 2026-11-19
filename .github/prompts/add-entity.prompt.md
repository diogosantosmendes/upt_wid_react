---
name: add-entity
description: Create a complete CRUD feature for a new API entity, following the existing Station feature architecture.
---

# Add entity

Implement a complete feature for a new entity in this React + TypeScript application, following the existing Station feature as the architectural reference.

## Feature details

- Entity name (singular, PascalCase): ${input:entityName}
- Entity name (plural, for user-facing text): ${input:entityPlural}
- URL slug (lowercase, URL-safe): ${input:entitySlug}
- API collection resource/path: /classes/${input:entityName}
- Entity fields with TypeScript types, defaults, and validation rules: ${input:entityFields}
- Required entity-specific interactions or behaviors: ${input:behaviors}

Use the supplied details as the source of truth. Do not invent fields, API response shapes, endpoint behavior, or business rules. If essential information is missing or contradictory, ask for clarification before implementing.

## Start by inspecting the existing feature

Read the relevant project instructions and inspect the current Station implementation before changing files, including:

- `src/types/Station.ts`
- `src/services/StationService.ts` and `src/services/configs.ts`
- `src/pages/StationsListPage.tsx` and `src/pages/StationDetailsPage.tsx`
- `src/components/stations/StationForm.tsx` and `src/components/stations/StationComponent.tsx`
- `src/App.tsx`

Also follow `.github/copilot-instructions.md` and the styling guidance in `.github/instructions/styles.instructions.md`. Match current file naming, imports, formatting, Bootstrap use, and feature-folder structure.

## Implement the feature end to end

Create the entity's typed domain model and form-data type under `src/types/`. Include an `id` on the persisted entity and use a derived form type when form submissions omit the ID, unless the supplied API contract requires a different shape.

Add a dedicated service under `src/services/` that owns API calls for this entity. Follow `StationService` for the service-object and typed-result conventions. Implement the operations required by the feature (list/page, get by ID, create, update, and delete when supported). Route requests through `authenticatedFetch` from `src/services/configs.ts`; do not call `fetch` from pages or components or add a competing API access path. Use the supplied API resource and response contract, and surface failed requests with useful errors.

Add an entity-specific form component under `src/components/<entity-slug>/`. It must support the required create and edit flows, initialize and validate fields from the supplied requirements, call the entity service, and notify its parent through typed props when a save succeeds. Keep API submission in the component/service pattern used by Station; do not duplicate API logic in pages.

Add a reusable entity component under `src/components/<entity-slug>/` that can render as a widget in the list and as the shared summary/action component on the details page. Give it explicit typed props and use the entity service only for actions that belong to this shared component. Report successful changes/deletions to its parent through callbacks so the page can keep its state and navigation consistent.

Add:

- A list page in `src/pages/` that loads and displays the entity collection, includes the create form, and renders the shared entity component in a responsive grid.
- A details page in `src/pages/` that reads the entity ID from the route, loads the entity through the service, renders the same shared entity component, and provides the edit form with a success callback that updates the displayed entity.
- Routes in `src/App.tsx` for `/<entity-slug>` and `/<entity-slug>/:id`, without replacing or breaking the existing station routes or authenticated layout. Preserve the router base path configured in `src/main.tsx`.
- A navigation link or other clear in-app entry point to the new list page, following the existing navigation conventions.

## Quality requirements

- Keep responsibilities aligned with the current architecture: route-level loading and orchestration in pages, reusable UI in components, domain types in `types/`, and network operations in services.
- Handle loading and failures explicitly; do not silently swallow errors or show success-shaped fallback data. Avoid introducing stale asynchronous updates when a page unmounts or its route ID changes.
- Preserve TypeScript safety and use Bootstrap 5 classes and existing styling conventions. Do not add dependencies, a new state-management layer, or unrelated refactors.
- Add or update tests only if the repository has an established test setup for the behavior being added. Do not introduce a test framework for this feature.
- Run `npm run build` and `npm run lint`. Report their actual results, including any lint failures in unchanged files, without fixing unrelated issues.

After implementation, summarize the created/updated files, the implemented routes and service operations, and validation results.
