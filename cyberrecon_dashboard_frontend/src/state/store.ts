import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TabKey = "fetch-cve" | "graph" | "defense" | "path";

export interface CVEItem {
  id: string;
  cwe?: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  score: number;
  description: string;
  published: string;
  vector?: string;
  product?: string;
}

interface UIState {
  theme: "auto" | "dark" | "light";
  currentTab: TabKey;
  sidebarOpen: boolean;

  setTab: (tab: TabKey) => void;
  toggleSidebar: () => void;
  setTheme: (t: UIState["theme"]) => void;

  cves: CVEItem[];
  setCVEs: (list: CVEItem[]) => void;

  playbookStep: number;
  setPlaybookStep: (step: number) => void;
}

export const useUIStore = create<UIState>()(
  immer((set) => ({
    theme: "auto",
    currentTab: "fetch-cve",
    sidebarOpen: false,

    setTab: (tab) =>
      set((s) => {
        s.currentTab = tab;
      }),
    toggleSidebar: () =>
      set((s) => {
        s.sidebarOpen = !s.sidebarOpen;
      }),
    setTheme: (t) =>
      set((s) => {
        s.theme = t;
        if (t === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
        } else if (t === "light") {
          document.documentElement.setAttribute("data-theme", "light");
        } else {
          document.documentElement.removeAttribute("data-theme");
        }
      }),

    cves: [],
    setCVEs: (list) =>
      set((s) => {
        s.cves = list;
      }),

    playbookStep: 0,
    setPlaybookStep: (step) =>
      set((s) => {
        s.playbookStep = step;
      }),
  }))
);
