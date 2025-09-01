import React from "react";
import { useUIStore, TabKey } from "../../state/store";
import { motion } from "framer-motion";

const tabs: { key: TabKey; label: string }[] = [
  { key: "fetch-cve", label: "Fetch CVE" },
  { key: "graph", label: "Graph Generation" },
  { key: "defense", label: "Attack Defense" },
  { key: "path", label: "Path Analyzer" },
];

export default function Sidebar(): JSX.Element {
  const { setTab, currentTab, sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-30 lg:hidden ${sidebarOpen ? "" : "hidden"}`}
        onClick={toggleSidebar}
      />
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "tween", duration: 0.25 }}
        className="fixed z-40 top-0 left-0 h-full w-[260px] lg:static lg:translate-x-0 bg-zinc-950 border-r border-border p-4 flex flex-col gap-4"
      >
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-md bg-primary/30" />
          <div>
            <p className="font-semibold">CyberRecon</p>
            <p className="text-xs text-muted">Attack Modeling</p>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          {tabs.map((t) => {
            const active = currentTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => {
                  setTab(t.key);
                  if (sidebarOpen) toggleSidebar();
                }}
                className={`text-left tab ${active ? "tab-active" : ""}`}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
        <div className="text-xs text-muted">
          v1.0 • Dark theme • Tailwind + React
        </div>
      </motion.aside>
    </>
  );
}
