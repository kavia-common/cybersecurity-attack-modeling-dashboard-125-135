Modified:
- eslint.config.mjs (JSX/runtime and globals to fix no-undef for JSX, console, setTimeout; TS unused var rule)
- tsconfig.json (add DOM libs)

Fixed minor code style/typing:
- src/components/Tabs.tsx (keyboard nav typing, remove unused var)
- src/components/Header.tsx (remove unused eslint-disable)
- src/pages/FetchCVE.tsx (remove eslint-disable)
- src/state/store.ts (underscore unused params, adjust catch)

Note:
- react-icons dependency added previously in package.json; ensure install step runs to resolve modules.
