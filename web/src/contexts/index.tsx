import React from 'react';

import { AuthProvider } from './ReactAuthContext';
import { ThemeProvider } from './ReactThemeContext';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export { AppProvider };
