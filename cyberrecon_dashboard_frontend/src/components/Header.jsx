import React from 'react';
import { useTheme } from '../state/theme';
import { useAppStore } from '../state/store';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[rgb(var(--color-surface))]/80 backdrop-blur">
      <div className="px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle sidebar"
            className="btn-ghost"
            onClick={toggleSidebar}
            title="Toggle sidebar"
          >
            ☰
          </button>
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-primary shadow-[0_0_12px_theme(colors.primary)]"></div>
            <span className="font-semibold">CyberRecon Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="btn-ghost"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle theme"
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
            <span className="text-xs">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}
