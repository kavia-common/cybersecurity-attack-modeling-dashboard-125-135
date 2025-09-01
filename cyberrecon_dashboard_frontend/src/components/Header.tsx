import React from 'react';
import { useTheme } from '../state/theme';
import { useAppStore } from '../state/store';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiSearch, FiChevronDown, FiSun, FiMoon, FiMenu } from 'react-icons/fi';

function useDropdown() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return { open, setOpen, ref };
}

export default function Header(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const profile = useDropdown();

  // PUBLIC_INTERFACE
  const onGlobalSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = (fd.get('q') as string) || '';
    // Placeholder for future search integration
    console.log('Global search:', q);
  };

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
            <FiMenu aria-hidden className="text-lg" />
          </button>
          <div className="flex items-center gap-2" aria-label="CyberRecon Dashboard">
            <div className="size-2.5 rounded-full bg-primary shadow-[0_0_12px_theme(colors.primary)]" />
            <span className="font-semibold">CyberRecon Dashboard</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 flex-1 max-w-2xl mx-4">
          <form onSubmit={onGlobalSearch} className="relative w-full" role="search" aria-label="Global">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              name="q"
              aria-label="Global search"
              placeholder="Search across CVEs, graphs, defenses..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 focus:ring-primary focus:border-primary"
            />
          </form>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="btn-ghost"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? <FiMoon aria-hidden /> : <FiSun aria-hidden />}
            <span className="sr-only">Toggle theme</span>
          </button>

          <div className="relative">
            <button
              aria-haspopup="true"
              aria-expanded={notifOpen}
              onClick={() => setNotifOpen((o) => !o)}
              className="btn-ghost"
              title="Notifications"
            >
              <FiBell aria-hidden />
              <span className="sr-only">Open notifications</span>
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-72 container-card p-3"
                  role="dialog"
                  aria-label="Notifications"
                >
                  <div className="container-header mb-2">Notifications</div>
                  <div className="text-sm text-white/70">No new notifications</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={profile.ref}>
            <button
              aria-haspopup="true"
              aria-expanded={profile.open}
              onClick={() => profile.setOpen((v) => !v)}
              className="btn-ghost"
              title="User menu"
            >
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                <span className="text-xs">U</span>
              </div>
              <FiChevronDown className="text-white/60" aria-hidden />
            </button>
            <AnimatePresence>
              {profile.open && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 container-card p-2"
                  role="menu"
                  aria-label="User menu"
                >
                  <button className="w-full text-left btn-ghost" role="menuitem">Profile</button>
                  <button className="w-full text-left btn-ghost" role="menuitem">Settings</button>
                  <button className="w-full text-left btn-ghost" role="menuitem">Sign out</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
