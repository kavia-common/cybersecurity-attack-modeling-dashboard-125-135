CyberRecon Dashboard Frontend

This app implements:
- Sidebar navigation, header, and card-based main layout
- Vertical Playbook Progress as a prominent UI section
- Modern, dark-themed styling with Tailwind CSS
- Subtle animations via Framer Motion

Tech:
- React + Vite
- Tailwind CSS
- Framer Motion
- Zustand (ready for future state integration)

Development:
- npm run dev (served on 0.0.0.0:3000 per vite.config.js)

The PlaybookProgress component is located at:
src/components/PlaybookProgress.jsx

It currently uses a fixed step list and a sample progress state.
Wire it to global state (Zustand/Redux) as needed.
