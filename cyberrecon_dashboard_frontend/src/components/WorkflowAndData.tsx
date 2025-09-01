import React from 'react';
import { useAppStore } from '../state/store';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertTriangle, FiPlay, FiLoader, FiShield, FiServer, FiBarChart2 } from 'react-icons/fi';

// PUBLIC_INTERFACE
export function WorkflowStepper(): JSX.Element {
  const steps = useAppStore((s) => s.workflowSteps);
  const start = useAppStore((s) => s.startWorkflow);
  const reset = useAppStore((s) => s.resetWorkflow);
  const running = useAppStore((s) => s.workflowRunning);

  const statusDot = (status: string) => {
    switch (status) {
      case 'done':
        return <FiCheckCircle className="text-emerald-400" aria-hidden />;
      case 'in-progress':
        return <FiLoader className="animate-spin text-primary" aria-hidden />;
      case 'error':
        return <FiAlertTriangle className="text-amber-400" aria-hidden />;
      default:
        return <div className="size-3 rounded-full bg-white/30" aria-hidden />;
    }
  };

  return (
    <div className="container-card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="container-header">Workflow Progress</div>
        <div className="flex gap-2">
          <button
            className="btn-ghost"
            aria-label="Reset workflow"
            title="Reset"
            onClick={reset}
            disabled={running}
          >
            Reset
          </button>
          <button
            className="btn-primary"
            aria-label="Start workflow"
            onClick={start}
            disabled={running}
          >
            {running ? <FiLoader className="animate-spin" /> : <FiPlay />}
            {running ? 'Running...' : 'Start'}
          </button>
        </div>
      </div>
      <ol className="relative flex items-center justify-between gap-2" aria-label="Workflow steps">
        {steps.map((s, idx) => {
          const isLast = idx === steps.length - 1;
          const color =
            s.status === 'done'
              ? 'bg-emerald-500'
              : s.status === 'in-progress'
              ? 'bg-primary'
              : s.status === 'error'
              ? 'bg-amber-500'
              : 'bg-white/20';
          return (
            <li key={s.id} className="flex-1 flex items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-8 rounded-full border border-white/15 bg-white/5">
                  {statusDot(s.status)}
                </div>
                <div className="text-sm">
                  <div className="text-white/90">{s.label}</div>
                  <div className="text-xs text-white/60">{s.status}</div>
                </div>
              </div>
              {!isLast && (
                <motion.div
                  className={`mx-3 h-1 rounded ${color} flex-1`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: s.status === 'done' || s.status === 'in-progress' ? 1 : 0.3 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ProgressBar({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center">{icon}</div>
          <div className="text-sm">{label}</div>
        </div>
        <div className="text-sm text-white/70">{Math.min(100, Math.max(0, value))}%</div>
      </div>
      <div className="h-2 bg-white/10 rounded overflow-hidden">
        <motion.div
          className={`h-full rounded ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
          aria-label={`${label} progress`}
        />
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DataProgressPanel(): JSX.Element {
  const dp = useAppStore((s) => s.dataProgress);
  return (
    <div className="container-card p-4 sm:p-5">
      <div className="container-header mb-3">Data Progress</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <ProgressBar icon={<FiServer />} label="Received Scan" value={dp.receivedScan} color="bg-primary" />
        <ProgressBar icon={<FiShield />} label="Firewall" value={dp.firewall} color="bg-emerald-500" />
        <ProgressBar icon={<FiBarChart2 />} label="BIA Impact" value={dp.biaImpact} color="bg-amber-500" />
      </div>
    </div>
  );
}
