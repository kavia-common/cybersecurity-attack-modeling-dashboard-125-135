import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface ThemeContextValue {
  theme: 'dark' | 'light';
  setTheme: (arg0: 'dark' | 'light') => void;
}

// PUBLIC_INTERFACE
export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  // default no-op setter
  setTheme: () => {},
});

// PUBLIC_INTERFACE
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// PUBLIC_INTERFACE
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
