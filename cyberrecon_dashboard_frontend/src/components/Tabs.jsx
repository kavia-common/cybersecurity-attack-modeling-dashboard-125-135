import React from 'react';
import { TABS } from '../state/store';

/**
 * Tabs component bridging store state and parent handler.
 * PUBLIC_INTERFACE
 */
export default function Tabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: TABS.FETCH_CVE, label: 'Fetch CVE' },
    { id: TABS.GRAPH_GEN, label: 'Graph Generation' },
    { id: TABS.ATTACK_DEF, label: 'Attack Defense' },
    { id: TABS.PATH_ANALYZER, label: 'Path Analyzer' },
  ];

  return (
    <div className="border-b border-white/10">
      <nav className="-mb-px flex gap-4" aria-label="Tabs">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                active ? 'tab-active' : 'tab-inactive'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
