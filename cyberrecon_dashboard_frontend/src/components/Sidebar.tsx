import React from 'react';
import { NavLink } from 'react-router-dom';
import { TABS } from '../state/store';
import { FiShield, FiGitBranch, FiCompass, FiActivity } from 'react-icons/fi';

const navItems = [
  { to: `/${TABS.FETCH_CVE}`, label: 'Fetch CVE', icon: <FiShield aria-hidden /> },
  { to: `/${TABS.GRAPH_GEN}`, label: 'Graph Generation', icon: <FiGitBranch aria-hidden /> },
  { to: `/${TABS.ATTACK_DEF}`, label: 'Attack Defense', icon: <FiCompass aria-hidden /> },
  { to: `/${TABS.PATH_ANALYZER}`, label: 'Path Analyzer', icon: <FiActivity aria-hidden /> },
];

export default function Sidebar(): JSX.Element {
  return (
    <aside className="border-r border-white/10 overflow-hidden" aria-label="Primary">
      <div className="h-full w-[260px] bg-[rgb(var(--color-surface))] px-3 py-4">
        <div className="text-xs uppercase tracking-wider text-white/50 px-2 mb-2">Navigation</div>
        <nav className="flex flex-col gap-1">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 border transition-colors ${
                  isActive
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-transparent border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
              aria-label={n.label}
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
