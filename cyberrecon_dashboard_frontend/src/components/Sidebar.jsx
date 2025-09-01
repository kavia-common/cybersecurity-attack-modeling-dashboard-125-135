import React from 'react';
import { NavLink } from 'react-router-dom';
import { TABS } from '../state/store';

const navItems = [
  { to: `/${TABS.FETCH_CVE}`, label: 'Fetch CVE', icon: '🛡️' },
  { to: `/${TABS.GRAPH_GEN}`, label: 'Graph Generation', icon: '🕸️' },
  { to: `/${TABS.ATTACK_DEF}`, label: 'Attack Defense', icon: '🧭' },
  { to: `/${TABS.PATH_ANALYZER}`, label: 'Path Analyzer', icon: '🌲' },
];

export default function Sidebar() {
  return (
    <aside className="border-r border-white/10 overflow-hidden">
      <div className="h-full w-[260px] bg-[rgb(var(--color-surface))] px-3 py-4">
        <div className="text-xs uppercase tracking-wider text-white/50 px-2 mb-2">Navigation</div>
        <nav className="flex flex-col gap-1">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 border ${
                  isActive ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="text-lg">{n.icon}</span>
              <span className="text-sm">{n.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
