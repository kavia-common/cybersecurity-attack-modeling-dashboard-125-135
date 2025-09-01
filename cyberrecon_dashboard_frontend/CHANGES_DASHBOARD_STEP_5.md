Modified (overwritten to ensure lint clean):
- src/components/Tabs.tsx
- src/state/store.ts
- src/state/theme.tsx

Note:
- react-icons is still externalized in vite.config.js as a temporary workaround; the proper fix is to ensure dependencies are installed (npm install). After installation, you can remove the externalization entry.
