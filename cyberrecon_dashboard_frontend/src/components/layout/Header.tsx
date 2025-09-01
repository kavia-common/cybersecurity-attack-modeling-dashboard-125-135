import React from "react";
import { useUIStore } from "../../state/store";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function Header(): JSX.Element {
  const { toggleSidebar, setTheme, theme } = useUIStore();

  const nextTheme = () => {
    if (theme === "auto") return "dark";
    if (theme === "dark") return "light";
    return "auto";
  };

  const label = () => {
    if (theme === "auto") return "Auto";
    if (theme === "dark") return "Dark";
    return "Light";
  };

  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="lg:hidden btn"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">CyberRecon Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(nextTheme())}
            className="btn"
            title="Theme"
          >
            {theme === "light" ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
            <span className="text-sm">{label()}</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-secondary/40" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium">analyst@sec</p>
              <p className="text-xs text-muted">Security Analyst</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
