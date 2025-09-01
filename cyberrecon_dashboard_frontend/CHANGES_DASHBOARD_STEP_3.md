Modified:
- src/components/Tabs.tsx (rename map param to item, avoid unused var lint)
- src/state/store.ts (use variables in setStepStatus signature and implementation)
- src/state/theme.tsx (ensure no unused variable in default setter)

Note:
- CI build may still require installing react-icons dependency. If unresolved, run `npm ci` or `npm install` in the container root to fetch dependencies.
