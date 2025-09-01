Modified:
- src/components/Tabs.tsx (onTabChange param name anonymized in type)
- src/state/store.ts (function type params anonymized to argN to avoid ESLint false positives)
- src/state/theme.tsx (ThemeContextValue setter param anonymized)

Result:
- Addresses remaining ESLint 'no-unused-vars' false positives reported on type parameter names in CI.
