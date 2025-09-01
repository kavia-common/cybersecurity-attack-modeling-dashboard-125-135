import React from 'react';
import { motion } from 'framer-motion';
import { Menu, LayoutGrid, ShieldCheck, Network, Activity, User, LogOut, Bot, Play, CheckCircle2 } from 'lucide-react';
import PlaybookProgress from './components/PlaybookProgress';

// PUBLIC_INTERFACE
export default function App() {
  /** App shell with sidebar navigation, top header, and main dashboard content. */
  return (
    <div className="min-h-screen bg-bg text-text">
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
                  <Network className="w-4 h-4 text-secondary" />
                  System Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Vulnerability Feed', value: 'Synced', icon: Activity, color: 'text-primary' },
                    { title: 'Graph Engine', value: 'Active', icon: LayoutGrid, color: 'text-secondary' },
                    { title: 'Defense Model', value: 'Ready', icon: ShieldCheck, color: 'text-accent' },
                  ].map((stat) => (
                    <motion.div
                      key={stat.title}
                      className="card p-4 border-border/60 bg-bg-soft"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <div className="flex items-center gap-3">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        <div>
                          <p className="text-text-soft text-sm">{stat.title}</p>
                          <p className="font-semibold">{stat.value}</p>
                        </div>
                      </div>
                    </motion.div>
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
                  { label: 'Fetch CVEs', icon: Activity },
                  { label: 'Generate Graph', icon: LayoutGrid },
                  { label: 'Plan Defense', icon: ShieldCheck },
                  { label: 'Analyze Paths', icon: Network },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-text hover:bg-primary/20 border border-border transition-colors"
                  >
                    <action.icon className="w-4 h-4 text-primary" />
                    {action.label}
                  </button>
                ))}
              </div>
            </motion.section>
          </main>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-border bg-bg-soft">
      <div className="h-16 px-5 flex items-center gap-2 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shadow-glow">
          <CheckCircle2 className="w-5 h-5 text-primary" />
        </div>
        <span className="font-semibold tracking-wide">CyberRecon</span>
      </div>
      <nav className="p-3 space-y-1">
        {[
          { label: 'Dashboard', icon: LayoutGrid, active: true },
          { label: 'Vulnerabilities', icon: Activity },
          { label: 'Graph', icon: Network },
          { label: 'Defense', icon: ShieldCheck },
          { label: 'Analyzer', icon: Play },
        ].map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition ${
              item.active
                ? 'bg-primary/10 border-primary/30 text-text'
                : 'bg-transparent border-transparent text-text-soft hover:bg-bg-card hover:border-border hover:text-text'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

function Header() {
  return (
    <header className="h-16 border-b border-border bg-bg-soft px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <button className="md:hidden p-2 rounded-lg border border-border bg-bg-card">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg md:text-xl font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg border border-border bg-bg-card">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulseSoft" />
          <span className="text-sm text-text-soft">Online</span>
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-bg-card">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Profile</span>
        </button>
        <button className="p-2 rounded-lg border border-border bg-bg-card" aria-label="Logout">
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
        <p className="text-text-soft text-sm mb-1">Active Alerts</p>
        <p className="text-2xl font-semibold">12</p>
        <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-primary rounded-full animate-[pulseSoft_2s_infinite]" />
        </div>
      </div>
      <div className="card p-5">
        <p className="text-text-soft text-sm mb-1">Open CVEs</p>
        <p className="text-2xl font-semibold">248</p>
        <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
          <div className="h-full w-3/5 bg-secondary rounded-full animate-[pulseSoft_2s_infinite]" />
        </div>
      </div>
      <div className="card p-5">
        <p className="text-text-soft text-sm mb-1">Resolved Paths</p>
        <p className="text-2xl font-semibold">34</p>
        <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
          <div className="h-full w-4/5 bg-accent rounded-full animate-[pulseSoft_2s_infinite]" />
        </div>
      </div>
    </motion.section>
  );
}
