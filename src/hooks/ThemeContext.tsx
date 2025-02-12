import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useStore } from '../utils/store';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { colorThemeTg, setColorThemeTg } = useStore();

  const toggleTheme = () => {
    setColorThemeTg(colorThemeTg === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (colorThemeTg) {
      document.body.className = colorThemeTg;
    } else {
      document.body.className = 'light';
    }
  }, [colorThemeTg]);

  return (
    <ThemeContext.Provider value={{ theme: colorThemeTg, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
