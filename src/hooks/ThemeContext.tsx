// ThemeContext.tsx
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useStore } from '../utils/store'; // Импортируем Zustand store

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Контекст с дефолтным значением
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { colorThemeTg, setColorThemeTg } = useStore();

  // Функция для переключения темы
  const toggleTheme = () => {
    setColorThemeTg(colorThemeTg === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (colorThemeTg) {
      document.body.className = colorThemeTg; // Убедимся, что значение не null или undefined
    } else {
      document.body.className = 'light'; // Устанавливаем тему по умолчанию
    }
  }, [colorThemeTg]);

  return (
    <ThemeContext.Provider value={{ theme: colorThemeTg, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Хук для использования контекста
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
