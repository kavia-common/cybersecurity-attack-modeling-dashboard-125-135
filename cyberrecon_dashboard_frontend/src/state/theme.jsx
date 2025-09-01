import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * ThemeProvider toggles light/dark by setting data-theme attribute on <html>.
 */

// PUBLIC_INTERFACE
export const ThemeContext = createContext({
  theme: 'dark',
  setTheme: (_t) => {},
});

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// PUBLIC_INTERFACE
export function useTheme() {
  return useContext(ThemeContext);
}
