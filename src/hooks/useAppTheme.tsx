import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { useThemeStore } from '../store/ThemeStore';
import {
  DarkTheme,
  LightTheme,
  PremiumTheme,
  ThemeColors,
} from '../constant/AppThemes';
import { ThemeMode } from '../store/ThemeStore';

interface ThemeContextType {
  colors: ThemeColors;
  themeMode: ThemeMode;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const themeMode = useThemeStore(state => state.themeMode);
  const systemScheme = useColorScheme();

  const value = useMemo(() => {
    let colors: ThemeColors;
    let isDark = false;

    if (themeMode === 'premium') {
      colors = PremiumTheme;
      isDark = true;
    } else if (themeMode === 'dark') {
      colors = DarkTheme;
      isDark = true;
    } else if (themeMode === 'light') {
      colors = LightTheme;
      isDark = false;
    } else {
      // system
      if (systemScheme === 'dark') {
        colors = DarkTheme;
        isDark = true;
      } else {
        colors = LightTheme;
        isDark = false;
      }
    }

    return { colors, themeMode, isDark };
  }, [themeMode, systemScheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return context;
};
