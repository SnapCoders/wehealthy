import { useContext } from 'react';

import { IThemeContext, ThemeContext } from '@contexts/ReactThemeContext';

function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);

  return context;
}

export { useTheme };
