import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

/**
 * PUBLIC_INTERFACE
 * PlaybookProgress
 * A vertical stepper showing progress through the CyberRecon workflow.
 * Props (future extension):
 *  - steps: custom list of steps
 *  - currentStep: index of current step
 *  - completed: set of completed step indices
 */
export default function PlaybookProgress() {
  // For initial integration we use a fixed sequence; can be wired to Zustand/Redux later.
  const steps = [
    { id: 1, label: 'Fetch CVE Data', description: 'Retrieve latest CVEs and advisories' },
    { id: 2, label: 'Generate Attack Graph', description: 'Build graph from assets and CVEs' },
    { id: 3, label: 'Threat & Risk Analysis', description: 'Score and categorize risks' },
    { id: 4, label: 'Defense Strategy', description: 'Recommend remediation and mitigation' },
    { id: 5, label: 'Path Analyzer', description: 'Analyze and validate attack paths' },
  ];

  const currentStep = 2; // 0-based index, example: third step "Threat & Risk Analysis"
  const completed = new Set([0, 1]); // Completed first two steps

  return (
    <div className="relative">
      <ol className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = completed.has(index);
          const isActive = index === currentStep;
          return (
            <li key={step.id} className="relative flex gap-3">
              {/* Connector line */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  ) : isActive ? (
                    <motion.div
                      className="w-5 h-5 rounded-full border-2 border-primary grid place-items-center bg-bg-card"
                      animate={{ boxShadow: ['0 0 0 0 rgba(99,102,241,0.45)', '0 0 0 8px rgba(99,102,241,0)'] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                    >
                      <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                    </motion.div>
                  ) : (
                    <Circle className="w-5 h-5 text-text-muted" />
                  )}
                </div>
                {/* vertical line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 w-px bg-border/70 my-1 mx-auto"></div>
                )}
              </div>

              {/* Content */}
              <motion.div
                className={`flex-1 p-3 rounded-lg border ${
                  isActive
                    ? 'bg-primary/5 border-primary/40 shadow-glow'
                    : 'bg-bg-card border-border'
                }`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <div className="flex items-center gap-2">
                  <p className="font-medium">{step.label}</p>
                  {isCompleted && (
                    <span className="text-xs text-secondary px-2 py-0.5 rounded-full bg-secondary/10 border border-secondary/30">
                      Completed
                    </span>
                  )}
                  {isActive && (
                    <span className="text-xs text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30">
                      In Progress
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-soft mt-1">{step.description}</p>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
