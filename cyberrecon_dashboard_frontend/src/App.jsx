import React from 'react';
import { motion } from 'framer-motion';
import { Menu, LayoutGrid, ShieldCheck, Network, Activity, User, LogOut, Bot, Play, CheckCircle2, CloudDownload, Cpu, Shield } from 'lucide-react';
import PlaybookProgress from './components/PlaybookProgress';
import Tabs, { getDefaultDashboardTabs, TabBus } from './components/Tabs';

// PUBLIC_INTERFACE
export default function App() {
  /** App shell with sidebar navigation, top header, and main dashboard content. */
  const tabDefs = getDefaultDashboardTabs();

  return (
    <div className="min-h-screen bg-surface-0 text-[var(--fg)] antialiased">
      <div className="flex h-full">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <Header />

          <main className="p-6 lg:p-8 space-y-6">
            <DashboardOverview />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <motion.section
                className="xl:col-span-1 card p-5"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Play className="w-4 h-4 text-primary" />
                  Playbook Progress
                </h3>
                <PlaybookProgress />
              </motion.section>

              <motion.section
                className="xl:col-span-2 card p-5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Network className="w-4 h-4 text-[color:var(--success)]" />
                  System Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Vulnerability Feed', value: 'Synced', icon: Activity, color: 'text-primary', target: 'fetch-cve' },
                    { title: 'Graph Engine', value: 'Active', icon: LayoutGrid, color: 'text-[color:var(--success)]', target: 'graph-gen' },
                    { title: 'Defense Model', value: 'Ready', icon: ShieldCheck, color: 'text-[color:var(--warning)]', target: 'defense' },
                  ].map((stat) => (
                    <motion.button
                      key={stat.title}
                      className="card p-4 text-left"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      onClick={() => TabBus.emit(stat.target)}
                    >
                      <div className="flex items-center gap-3">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        <div>
                          <p className="text-soft text-sm">{stat.title}</p>
                          <p className="font-semibold">{stat.value}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.section>
            </div>

            <motion.section
              className="card p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Fetch CVEs', icon: CloudDownload, target: 'fetch-cve' },
                  { label: 'Generate Graph', icon: Cpu, target: 'graph-gen' },
                  { label: 'Plan Defense', icon: Shield, target: 'defense' },
                  { label: 'Analyze Paths', icon: Network, target: 'analyze' },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="btn"
                    onClick={() => TabBus.emit(action.target)}
                  >
                    <action.icon className="w-4 h-4 text-primary" />
                    {action.label}
                  </button>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="card p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-primary" />
                Analysis & Defense
              </h3>
              <Tabs tabs={tabDefs} initialKey="vulns" />
            </motion.section>
          </main>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-line bg-surface-1">
      <div className="h-16 px-5 flex items-center gap-2 border-b border-line">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-glow" style={{ backgroundColor: 'color-mix(in oklab, var(--primary) 20%, transparent)' }}>
          <CheckCircle2 className="w-5 h-5 text-primary" />
        </div>
        <span className="font-semibold tracking-wide">CyberRecon</span>
      </div>
      <nav className="p-3 space-y-1">
        {[
          { label: 'Dashboard', icon: LayoutGrid, target: null, active: true },
          { label: 'Fetch CVE', icon: CloudDownload, target: 'fetch-cve' },
          { label: 'Graph Generation', icon: Cpu, target: 'graph-gen' },
          { label: 'Attack Defense', icon: ShieldCheck, target: 'defense' },
          { label: 'Path Analyzer', icon: Network, target: 'analyze' },
          { label: 'Threat Matrix / Risk', icon: Activity, target: 'threat-matrix' },
          { label: 'Vulnerabilities', icon: Activity, target: 'vulns' },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => item.target && TabBus.emit(item.target)}
            className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg border transition ${
              item.active
                ? 'bg-[color:color-mix(in_oklab,var(--primary)_12%,transparent)] border-[color:color-mix(in_oklab,var(--primary)_30%,transparent)]'
                : 'bg-transparent border-transparent text-soft hover:bg-surface-2 hover:border-line hover:text-[var(--fg)]'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function Header() {
  return (
    <header className="h-16 border-b border-line bg-surface-1 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <button className="md:hidden p-2 rounded-lg border border-line bg-surface-2">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg md:text-xl font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg border border-line bg-surface-2">
          <div className="w-2 h-2 rounded-full bg-[color:var(--success)] animate-pulseSoft" />
          <span className="text-sm text-soft">Online</span>
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line bg-surface-2">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Profile</span>
        </button>
        <button className="p-2 rounded-lg border border-line bg-surface-2" aria-label="Logout">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

function DashboardOverview() {
  return (
    <motion.section
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card p-5">
        <p className="text-soft text-sm mb-1">Active Alerts</p>
        <p className="text-2xl font-semibold">12</p>
        <div className="mt-3 h-1.5 bg-[color:color-mix(in_oklab,var(--line)_70%,transparent)] rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-primary rounded-full animate-[pulseSoft_2s_infinite]" />
        </div>
      </div>
      <div className="card p-5">
        <p className="text-soft text-sm mb-1">Open CVEs</p>
        <p className="text-2xl font-semibold">248</p>
        <div className="mt-3 h-1.5 bg-[color:color-mix(in_oklab,var(--line)_70%,transparent)] rounded-full overflow-hidden">
          <div className="h-full w-3/5 rounded-full animate-[pulseSoft_2s_infinite]" style={{ backgroundColor: 'var(--success)' }} />
        </div>
      </div>
      <div className="card p-5">
        <p className="text-soft text-sm mb-1">Resolved Paths</p>
        <p className="text-2xl font-semibold">34</p>
        <div className="mt-3 h-1.5 bg-[color:color-mix(in_oklab,var(--line)_70%,transparent)] rounded-full overflow-hidden">
          <div className="h-full w-4/5 rounded-full animate-[pulseSoft_2s_infinite]" style={{ backgroundColor: 'var(--warning)' }} />
        </div>
      </div>
    </motion.section>
  );
}
