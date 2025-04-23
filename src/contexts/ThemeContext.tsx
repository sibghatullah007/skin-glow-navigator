
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'light' | 'dark' | 'nature';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  // Load theme from localStorage on app start
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as ThemeType;
    if (storedTheme && ['light', 'dark', 'nature'].includes(storedTheme)) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    }
  }, []);

  // Update theme in localStorage and apply it
  const updateTheme = (newTheme: ThemeType) => {
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
