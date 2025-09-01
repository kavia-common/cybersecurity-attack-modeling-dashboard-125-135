import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// PUBLIC_INTERFACE
export const TABS = {
  FETCH_CVE: 'fetch-cve',
  GRAPH_GEN: 'graph-generation',
  ATTACK_DEF: 'attack-defense',
  PATH_ANALYZER: 'path-analyzer',
} as const;

export type TabKey = typeof TABS[keyof typeof TABS];

export type WorkflowStepStatus = 'idle' | 'in-progress' | 'done' | 'error';

export interface WorkflowStep {
  id: number;
  label: string;
  status: WorkflowStepStatus;
  message?: string;
}

export interface DataProgress {
  receivedScan: number; // 0..100
  firewall: number;     // 0..100
  biaImpact: number;    // 0..100
}

export interface AppState {
  activeTab: TabKey;
  sidebarOpen: boolean;

  // Workflow Progress
  workflowSteps: WorkflowStep[];
  workflowRunning: boolean;

  // Data Progress
  dataProgress: DataProgress;

  // Actions
  setActiveTab: (_: TabKey) => void;
  toggleSidebar: () => void;

  resetWorkflow: () => void;
  startWorkflow: () => Promise<void>;
  setStepStatus: (_: number, __: WorkflowStepStatus, ___?: string) => void;

  setDataProgress: (_: Partial<DataProgress>) => void;
}

const initialSteps: WorkflowStep[] = [
  { id: 1, label: 'Initialize', status: 'idle' },
  { id: 2, label: 'Ingest Data', status: 'idle' },
  { id: 3, label: 'Analyze', status: 'idle' },
  { id: 4, label: 'Finalize', status: 'idle' },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeTab: TABS.FETCH_CVE,
      sidebarOpen: true,
      workflowSteps: initialSteps,
      workflowRunning: false,
      dataProgress: { receivedScan: 12, firewall: 35, biaImpact: 8 },

      setActiveTab: (tab) => {
        // Dev guard (also satisfies strict lint)
        if (typeof tab !== 'string') {
          // no-op
        }
        set({ activeTab: tab });
      },
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      resetWorkflow: () =>
        set({
          workflowSteps: initialSteps.map((s) => ({ ...s, status: 'idle', message: undefined })),
          workflowRunning: false,
        }),

      setStepStatus: (id, status, message) =>
        set((state) => ({
          workflowSteps: state.workflowSteps.map((s) =>
            s.id === id ? { ...s, status, message } : s
          ),
        })),

      // Simulated workflow with feedback for UI demo purposes only (no API calls)
      startWorkflow: async () => {
        const { workflowRunning, setStepStatus, setDataProgress } = get();
        if (workflowRunning) return;
        set({ workflowRunning: true });

        const steps = [1, 2, 3, 4];
        try {
          for (const step of steps) {
            setStepStatus(step, 'in-progress', 'Working...');
            // Simulate intermittent progress updates for data bars
            for (let t = 0; t < 3; t++) {
              await new Promise((r) => setTimeout(r, 350));
              setDataProgress({
                receivedScan: Math.min(100, get().dataProgress.receivedScan + Math.round(Math.random() * 10)),
                firewall: Math.min(100, get().dataProgress.firewall + Math.round(Math.random() * 7)),
                biaImpact: Math.min(100, get().dataProgress.biaImpact + Math.round(Math.random() * 6)),
              });
            }
            // Complete step
            setStepStatus(step, 'done', 'Completed');
          }
        } catch {
          // Mark current step error
          const current = get().workflowSteps.find((s) => s.status === 'in-progress')?.id ?? 1;
          setStepStatus(current, 'error', 'An error occurred');
        } finally {
          set({ workflowRunning: false });
        }
      },

      setDataProgress: (partial) =>
        set((state) => ({
          dataProgress: { ...state.dataProgress, ...partial },
        })),
    }),
    {
      name: 'cyberrecon-ui',
      partialize: (s) => ({
        activeTab: s.activeTab,
        sidebarOpen: s.sidebarOpen,
        dataProgress: s.dataProgress,
      }),
    }
  )
);
