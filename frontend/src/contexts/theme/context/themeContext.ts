import { createContext } from 'react';

export interface ThemeContextProps {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);