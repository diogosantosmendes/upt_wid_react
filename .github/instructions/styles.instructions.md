---
applyTo: "src/**/*.{tsx,css}"
---

# Styling instructions

## Use the existing styling system

- Use Bootstrap 5, which is already imported globally in `src/main.tsx`. Prefer its existing component classes and utilities; do not add another CSS framework or a component library for styling.
- Write React classes with `className`. Follow existing patterns such as `container`/`row`/`col-*` for responsive layouts, `card`/`card-body`/`card-footer` for grouped content, and `btn` with a contextual variant for actions.
- Prefer Bootstrap spacing, sizing, display, flex, and alignment utilities (for example `p-*`, `m*`, `gap-*`, `w-*`, and responsive breakpoint variants) over custom CSS when they express the design clearly.
- Use Bootstrap form classes such as `form-label`, `form-control`, and `form-select` for inputs, and Bootstrap feedback patterns such as `alert` and `spinner-border` for status and loading UI.

## Theme and custom CSS

- Keep UI compatible with both Bootstrap light and dark themes. Prefer semantic classes such as `bg-body-tertiary`, `text-body-secondary`, and contextual button variants instead of hard-coded foreground/background colors.
- `ThemeProvider` sets `data-bs-theme` on the document root. Do not implement a separate theme mechanism or bypass it with fixed colors.
- If Bootstrap cannot express the required styling, add a focused rule to the existing `src/App.css` or `src/index.css`. Avoid duplicate rules, broad global selectors, and one-off inline styles; use inline styles only when a value genuinely needs to be computed dynamically.
- Keep responsive behavior in Bootstrap breakpoint utilities where practical. Add custom media queries only when the design cannot be expressed with the existing utilities.

## Accessibility and interaction

- Use semantic HTML and preserve keyboard accessibility when styling interactive elements. Use actual buttons and links, set appropriate button types, and retain accessible names and ARIA attributes where needed.
- Associate each form control with its label, and use visible focus indicators. Do not remove Bootstrap's default focus styling without providing an accessible replacement.
- Use React state for interactive behavior and keep visual state reflected in accessible attributes (such as `aria-expanded`); do not introduce a separate styling-driven behavior system.
