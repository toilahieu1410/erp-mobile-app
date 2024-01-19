import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import authenticateReducer from '../src/slice/Auth';
export const store = configureStore({
  reducer: {
    Auth: authenticateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
