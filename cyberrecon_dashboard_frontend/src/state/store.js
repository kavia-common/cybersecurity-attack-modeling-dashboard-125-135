/**
 * Global application state using Zustand.
 * Tracks current tab, sidebar visibility, and lightweight UI flags.
 */

// PUBLIC_INTERFACE
export const TABS = {
  FETCH_CVE: 'fetch-cve',
  GRAPH_GEN: 'graph-generation',
  ATTACK_DEF: 'attack-defense',
  PATH_ANALYZER: 'path-analyzer',
};

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      activeTab: TABS.FETCH_CVE,
      sidebarOpen: true,
      setActiveTab: (tab) => set({ activeTab: tab }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    }),
    {
      name: 'cyberrecon-ui',
      partialize: (s) => ({ activeTab: s.activeTab, sidebarOpen: s.sidebarOpen }),
    }
  )
);
