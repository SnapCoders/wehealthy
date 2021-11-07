import React, { createContext, useState, useMemo, useCallback } from 'react';

import { ThemeProvider as StyledProvider } from 'styled-components';

import { themes } from '@styles/themes';

export interface IThemeContext {
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  const value: IThemeContext = useMemo(() => {
    return { toggleTheme };
  }, [toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <StyledProvider theme={themes[theme]}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
