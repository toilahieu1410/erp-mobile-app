// authMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';

import { AnyAction } from 'redux';
import { navigate } from './navigationRef';

const authMiddleware: Middleware = store => next => (action: AnyAction) => {
  if (action.type === 'auth/setIsAuthenticated' && action.payload === false) {
    navigate('LoginScreen');
  }
  return next(action);
};

export default authMiddleware;