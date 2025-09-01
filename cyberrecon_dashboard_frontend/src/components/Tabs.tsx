import React from 'react';
import { TABS, TabKey } from '../state/store';
import { motion } from 'framer-motion';

export interface TabsProps {
  activeTab: TabKey;
  onTabChange: (_: TabKey) => void;
}

/**
 * Tabs component bridging store state and parent handler.
 * PUBLIC_INTERFACE
 */
export default function Tabs({ activeTab, onTabChange }: TabsProps): JSX.Element {
  const tabs: ReadonlyArray<{ id: TabKey; label: string }> = [
    { id: TABS.FETCH_CVE, label: 'Fetch CVE' },
    { id: TABS.GRAPH_GEN, label: 'Graph Generation' },
    { id: TABS.ATTACK_DEF, label: 'Attack Defense' },
    { id: TABS.PATH_ANALYZER, label: 'Path Analyzer' },
  ];

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = tabs.findIndex((t) => t.id === activeTab);
    if (e.key === 'ArrowRight') {
      const next = tabs[(idx + 1) % tabs.length].id;
      onTabChange(next);
    } else if (e.key === 'ArrowLeft') {
      const prev = tabs[(idx - 1 + tabs.length) % tabs.length].id;
      onTabChange(prev);
    }
  };

  return (
    <div className="border-b border-white/10" role="navigation" aria-label="Section tabs">
      <div
        className="-mb-px flex gap-4 relative"
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
      >
        {tabs.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`relative whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                active ? 'tab-active' : 'tab-inactive'
              }`}
            >
              {item.label}
              {active && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute left-0 right-0 -bottom-[2px] h-0.5 bg-primary"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
