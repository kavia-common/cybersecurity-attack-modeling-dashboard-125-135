# Cybersecurity Attack Modeling Dashboard

This repository contains the CyberRecon Dashboard frontend built with Vite + React + TypeScript.

Features:
- Tab navigation: Fetch CVE, Graph Generation, Attack Defense, Path Analyzer
- React Query for data fetching (mocked)
- Zustand global state
- React Hook Form for forms
- Framer Motion animations and skeletons
- Recharts and D3 visualizations
- Tailwind CSS with dark/light/auto theme

Getting started:
1. cd cyberrecon_dashboard_frontend
2. npm install
3. npm run dev

Environment:
- No environment variables are required for the mocked data.
- To connect real APIs, replace calls in src/lib/api.ts with your endpoints and add env usage as needed.
