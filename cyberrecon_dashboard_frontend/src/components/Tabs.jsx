import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Network, CloudDownload, Cpu, Shield, Workflow, OctagonAlert } from 'lucide-react';

/**
 * Simple event bus to coordinate tab switches across components without a heavy global store.
 * PUBLIC_INTERFACE
 */
export const TabBus = {
  _listeners: new Set(),
  // PUBLIC_INTERFACE
  subscribe(fn) {
    /** Subscribe to tab change events. Returns an unsubscribe function. */
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  },
  // PUBLIC_INTERFACE
  emit(key) {
    /** Emit a request to switch to the given tab key. */
    for (const fn of this._listeners) fn(key);
  },
};

/**
 * PUBLIC_INTERFACE
 * Tabs
 * A simple, accessible tab interface.
 * Props:
 *  - tabs: Array<{ key: string, label: string, icon?: ReactNode, content: ReactNode }>
 *  - initialKey?: string
 */
export default function Tabs({ tabs = [], initialKey }) {
  const [active, setActive] = useState(initialKey || (tabs[0]?.key ?? ''));

  // Listen for external tab change requests (from sidebar/quick actions)
  useEffect(() => {
    const unsub = TabBus.subscribe((key) => {
      if (tabs.find((t) => t.key === key)) setActive(key);
    });
    return unsub;
  }, [tabs]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 border-b border-line mb-4">
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-t-lg border transition-colors
                ${isActive
                  ? 'bg-[color:color-mix(in_oklab,var(--primary)_12%,transparent)] border-[color:color-mix(in_oklab,var(--primary)_30%,transparent)]'
                  : 'bg-transparent border-transparent text-soft hover:bg-surface-2 hover:text-[var(--fg)]'}`}
              onClick={() => setActive(t.key)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${t.key}`}
            >
              {t.icon ? <t.icon className="w-4 h-4 text-primary" /> : null}
              <span className="text-sm font-medium">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-2">
        <AnimatePresence mode="wait">
          {tabs.map((t) =>
            active === t.key ? (
              <motion.div
                key={t.key}
                id={`panel-${t.key}`}
                role="tabpanel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="min-h-[120px]"
              >
                {t.content}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * getDefaultDashboardTabs
 * Returns full dashboard tab set including:
 * - Fetch CVE
 * - Graph Generation
 * - Attack Defense
 * - Path Analyzer
 * - Threat Matrix / Risk Analysis
 * - Vulnerabilities (table)
 */
export function getDefaultDashboardTabs() {
  const cveExamples = [
    { CVE: 'CVE-2022-1234', Description: 'Sample buffer overflow in DeviceX allows elevation of privilege.', Severity: 'High', Status: 'Unpatched' },
    { CVE: 'CVE-2021-5678', Description: 'Remote code exec in service Z via crafted request.', Severity: 'Critical', Status: 'Mitigated' },
    { CVE: 'CVE-2023-1111', Description: 'Improper input validation leads to DoS condition in API gateway.', Severity: 'Medium', Status: 'Under Review' },
  ];

  const defenseExamples = [
    { Suggestion: 'Enable strict firewall rules for exposed service ports.', Impact: 'Prevents lateral movement', Priority: 'High' },
    { Suggestion: 'Apply patch for DeviceX (CVE-2022-1234) immediately.', Impact: 'Removes privilege escalation vector', Priority: 'Critical' },
    { Suggestion: 'Harden API gateway rate limits and validation.', Impact: 'Reduces DoS risk and abuse', Priority: 'Medium' },
  ];

  return [
    {
      key: 'fetch-cve',
      label: 'Fetch CVE',
      icon: CloudDownload,
      content: <FetchCVETab />,
    },
    {
      key: 'graph-gen',
      label: 'Graph Generation',
      icon: Cpu,
      content: <GraphGenerationTab />,
    },
    {
      key: 'defense',
      label: 'Attack Defense',
      icon: Shield,
      content: <DefenseTab data={defenseExamples} />,
    },
    {
      key: 'analyze',
      label: 'Path Analyzer',
      icon: Network,
      content: <AnalyzePathTab />,
    },
    {
      key: 'threat-matrix',
      label: 'Threat Matrix / Risk',
      icon: OctagonAlert,
      content: <ThreatMatrixTab />,
    },
    {
      key: 'vulns',
      label: 'Vulnerabilities',
      icon: Activity,
      content: <VulnerabilitiesTab data={cveExamples} />,
    },
  ];
}

/**
 * VulnerabilitiesTab
 * Renders a small summary and a table of CVEs using provided mock data.
 */
function VulnerabilitiesTab({ data }) {
  const severityColors = {
    Critical: 'text-[color:var(--warning)]',
    High: 'text-primary',
    Medium: 'text-[color:var(--success)]',
    Low: 'text-soft',
  };

  const statusChip = (status) => {
    const map = {
      Unpatched: 'chip chip-primary',
      Mitigated: 'chip chip-success',
      'Under Review': 'chip',
    };
    return <span className={map[status] || 'chip'}>{status}</span>;
  };

  const totals = data.reduce((acc, row) => {
    acc.total += 1;
    acc[row.Severity] = (acc[row.Severity] || 0) + 1;
    return acc;
  }, { total: 0 });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="card p-4">
          <p className="text-sm text-soft">Total</p>
          <p className="text-xl font-semibold">{totals.total}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-soft">Critical</p>
          <p className="text-xl font-semibold">{totals.Critical || 0}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-soft">High</p>
          <p className="text-xl font-semibold">{totals.High || 0}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-soft">Medium</p>
          <p className="text-xl font-semibold">{totals.Medium || 0}</p>
        </div>
      </div>

      <div className="overflow-auto rounded-xl border border-line">
        <table className="min-w-full text-sm">
          <thead className="bg-surface-1">
            <tr className="text-left">
              <th className="px-4 py-3 border-b border-line">CVE</th>
              <th className="px-4 py-3 border-b border-line">Description</th>
              <th className="px-4 py-3 border-b border-line">Severity</th>
              <th className="px-4 py-3 border-b border-line">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.CVE} className="odd:bg-[color:color-mix(in_oklab,var(--bg-2)_96%,transparent)]">
                <td className="px-4 py-3 font-medium">{row.CVE}</td>
                <td className="px-4 py-3 text-soft">{row.Description}</td>
                <td className={`px-4 py-3 font-medium ${severityColors[row.Severity] || ''}`}>{row.Severity}</td>
                <td className="px-4 py-3">{statusChip(row.Status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * DefenseTab
 * Displays example defense suggestions in a list with priority badges.
 */
function DefenseTab({ data }) {
  const priorityChip = (priority) => {
    const map = {
      Critical: 'chip chip-primary',
      High: 'chip chip-success',
      Medium: 'chip',
      Low: 'chip',
    };
    return <span className={map[priority] || 'chip'}>{priority}</span>;
  };

  return (
    <div className="space-y-3">
      {data.map((row, idx) => (
        <motion.div
          key={idx}
          className="card p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between"
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: idx * 0.05 }}
        >
          <div>
            <p className="font-medium">{row.Suggestion}</p>
            <p className="text-sm text-soft mt-1">{row.Impact}</p>
          </div>
          <div className="flex items-center gap-2">
            {priorityChip(row.Priority)}
            <button className="btn">Acknowledge</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * AnalyzePathTab
 * Placeholder panel for future path analysis features.
 */
function AnalyzePathTab() {
  return (
    <div className="card p-6">
      <p className="text-soft">
        Path Analyzer placeholder — upcoming features will visualize attack paths, calculate traversal costs,
        and recommend optimal mitigation points across the graph.
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {['Nodes', 'Edges', 'Resolved'].map((label, i) => (
          <div key={label} className="p-4 rounded-lg border border-line bg-surface-1">
            <p className="text-sm text-soft">{label}</p>
            <p className="mt-1 text-xl font-semibold">{[48, 122, 34][i]}</p>
            <div className="mt-3 h-1.5 rounded-full overflow-hidden bg-[color:color-mix(in_oklab,var(--line)_70%,transparent)]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${[45, 70, 80][i]}%`,
                  backgroundColor: i === 2 ? 'var(--success)' : 'var(--primary)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * FetchCVETab
 * Placeholder form and progress to simulate CVE fetch pipeline.
 */
function FetchCVETab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="card p-4">
          <p className="text-sm text-soft">Last Sync</p>
          <p className="text-xl font-semibold">3h ago</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-soft">New Items</p>
          <p className="text-xl font-semibold">57</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-soft">Vendors</p>
          <p className="text-xl font-semibold">12</p>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-line bg-surface-1"
            placeholder="Filter by vendor or product (e.g., Microsoft, OpenSSL)"
          />
          <button className="btn">
            <CloudDownload className="w-4 h-4 text-primary" />
            Fetch Latest
          </button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-soft mb-2">Ingestion Progress</p>
          <div className="h-2 rounded-full overflow-hidden bg-[color:color-mix(in_oklab,var(--line)_70%,transparent)]">
            <div className="h-full w-2/3 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * GraphGenerationTab
 * Placeholder controls and status for attack graph generation.
 */
function GraphGenerationTab() {
  return (
    <div className="space-y-4">
      <div className="card p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <p className="text-sm text-soft mb-1">Asset Scope</p>
            <select className="w-full px-3 py-2 rounded-lg border border-line bg-surface-1">
              <option>All</option>
              <option>DMZ</option>
              <option>Internal</option>
            </select>
          </div>
          <div>
            <p className="text-sm text-soft mb-1">Depth</p>
            <select className="w-full px-3 py-2 rounded-lg border border-line bg-surface-1">
              <option>Shallow</option>
              <option>Balanced</option>
              <option>Deep</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="btn w-full">
              <Workflow className="w-4 h-4 text-primary" />
              Generate Graph
            </button>
          </div>
        </div>
      </div>

      <div className="card p-5">
        <p className="text-sm text-soft mb-2">Generation Status</p>
        <div className="h-2 rounded-full overflow-hidden bg-[color:color-mix(in_oklab,var(--line)_70%,transparent)]">
          <div className="h-full w-1/2 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
        </div>
        <p className="text-xs text-soft mt-2">Computing shortest paths and critical nodes…</p>
      </div>
    </div>
  );
}

/**
 * ThreatMatrixTab
 * Placeholder heatmap-like grid and risk summary.
 */
function ThreatMatrixTab() {
  const severities = ['Low', 'Medium', 'High', 'Critical'];
  const likelihoods = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        <div className="md:col-span-2">
          <p className="text-sm text-soft">Risk Summary</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {['Critical', 'High', 'Medium', 'Low'].map((s, i) => (
              <div key={s} className="p-3 rounded-lg border border-line bg-surface-1">
                <p className="text-xs text-soft">{s}</p>
                <p className="text-lg font-semibold">{[7, 19, 33, 12][i]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-4 card p-4">
          <p className="text-sm text-soft mb-3">Threat Matrix</p>
          <div className="grid grid-cols-6 gap-1">
            <div />
            {severities.map((s) => (
              <div key={s} className="text-xs text-soft text-center px-1">{s}</div>
            ))}
            {likelihoods.map((l, r) => (
              <React.Fragment key={l}>
                <div className="text-xs text-soft pr-2 flex items-center">{l}</div>
                {severities.map((_, c) => {
                  const intensity = (r + c + 2) / (likelihoods.length + severities.length);
                  const bg = `color-mix(in oklab, var(--warning) ${Math.round(intensity * 70)}%, transparent)`;
                  return <div key={`${l}-${c}`} className="h-6 rounded border border-line" style={{ backgroundColor: bg }} />;
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
