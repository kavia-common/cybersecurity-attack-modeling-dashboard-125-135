import React from "react";
import { motion } from "framer-motion";
import { useUIStore } from "../../state/store";
import Progress from "../../components/ui/Progress";

const steps = [
  { title: "Ingest Findings", desc: "Import CVEs and asset inventory" },
  { title: "Prioritize Risks", desc: "Rank by exploitability and impact" },
  { title: "Select Controls", desc: "Map mitigations to threats" },
  { title: "Simulate Effects", desc: "Assess residual risks" },
  { title: "Generate Playbook", desc: "Produce executable runbook" },
];

export default function AttackDefense(): JSX.Element {
  const { playbookStep, setPlaybookStep } = useUIStore();
  const [prog, setProg] = React.useState(20);

  React.useEffect(() => {
    const id = setInterval(() => setProg((p) => (p >= 100 ? 20 : p + 10)), 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
      <div className="card p-4">
        <h3 className="font-medium">Defense Playbook Builder</h3>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {steps.map((s, idx) => {
            const active = idx === playbookStep;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg border ${active ? "border-primary/50 bg-primary/10" : "border-border bg-zinc-900/40"}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{idx + 1}. {s.title}</p>
                    <p className="text-sm text-muted">{s.desc}</p>
                  </div>
                  {active && <span className="badge bg-secondary/30 text-secondary">Active</span>}
                </div>
                <div className="mt-3 flex gap-2">
                  {idx > 0 && (
                    <button className="btn" onClick={() => setPlaybookStep(idx - 1)}>
                      Back
                    </button>
                  )}
                  {idx < steps.length - 1 && (
                    <button className="btn btn-primary" onClick={() => setPlaybookStep(idx + 1)}>
                      Next
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="space-y-4">
        <div className="card p-4">
          <h3 className="font-medium mb-2">Workflow Progress</h3>
          <Progress value={prog} color="accent" />
          <p className="text-xs text-muted mt-2">Auto-simulated processing state</p>
        </div>
        <div className="card p-4">
          <h3 className="font-medium mb-2">Notes</h3>
          <ul className="text-sm text-muted list-disc pl-5 space-y-1">
            <li>Iteratively refine control selection with stakeholders</li>
            <li>Use simulation to estimate residual risk reduction</li>
            <li>Export playbook to integrate with SOAR</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
