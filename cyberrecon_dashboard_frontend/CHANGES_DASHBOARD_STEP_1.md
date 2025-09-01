Created:
- src/main.tsx
- src/App.tsx
- src/components/Header.tsx
- src/components/Sidebar.tsx
- src/components/Tabs.tsx
- src/components/WorkflowAndData.tsx
- src/components/index.ts
- src/pages/FetchCVE.tsx
- src/pages/GraphGeneration.tsx
- src/pages/AttackDefense.tsx
- src/pages/PathAnalyzer.tsx
- src/state/store.ts
- src/state/theme.tsx

Modified:
- index.html (entry script to /src/main.tsx)
- package.json (add react-icons)

Removed (replaced by TS files):
- src/main.jsx
- src/App.jsx
- src/components/Header.jsx
- src/components/Sidebar.jsx
- src/components/Tabs.jsx
- src/pages/FetchCVE.jsx
- src/pages/GraphGeneration.jsx
- src/pages/AttackDefense.jsx
- src/pages/PathAnalyzer.jsx
- src/state/store.js
- src/state/theme.jsx

Notes:
- All components are typed and accessible (ARIA roles, labels, keyboard navigation).
- Tabs sync with route state; panels are lazy loaded and animated.
- Workflow Stepper and Data Progress panels are global-state driven using Zustand.
- Framer Motion and React Icons integrated.
- Tailwind responsive grid layout is preserved and responsive by design.
