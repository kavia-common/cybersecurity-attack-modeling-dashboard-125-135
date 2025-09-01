import React from "react";
import { useUIStore, TabKey } from "../../state/store";

const tabs: { key: TabKey; label: string }[] = [
  { key: "fetch-cve", label: "Fetch CVE" },
  { key: "graph", label: "Graph Generation" },
  { key: "defense", label: "Attack Defense" },
  { key: "path", label: "Path Analyzer" },
];

export default function Tabs(): JSX.Element {
  const { currentTab, setTab } = useUIStore();
  return (
    <div className="card p-2">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const active = currentTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`tab ${active ? "tab-active" : ""}`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
