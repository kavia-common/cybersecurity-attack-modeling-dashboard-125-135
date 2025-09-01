Modified:
- src/components/Tabs.tsx (type annotate map item to avoid shadowing/unused issues)
- src/state/store.ts (use tab argument to satisfy strict lint)
- src/state/theme.tsx (commented default setter)
- vite.config.js (temporarily externalize react-icons to avoid rollup resolution error until dependencies are installed)

Notes:
- Externalizing react-icons is a stopgap; proper fix is ensuring `npm install` runs to fetch react-icons.
