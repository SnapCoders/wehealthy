import { useContext } from 'react';

import { IAuthContext, AuthContext } from '@contexts/ReactAuthContext';

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { useAuth };
