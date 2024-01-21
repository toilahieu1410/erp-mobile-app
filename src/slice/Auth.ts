import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AuthenticateService from '../services/Auth';
import {FulfilledAction, PendingAction, RejectedAction} from '../type';
import {BaseResponse} from '../models/BaseResponse';
import {Token} from '../services/Token';

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: any;
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  user: {},
};
export const checkToken = createAsyncThunk<boolean>(
  'authen/checkToken',
  async () => {
    try {
      const check = await AuthenticateService.CheckToken();
      if (check) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
);

export const login = createAsyncThunk<BaseResponse<Token>, unknown>(
  'authen/login',
  async (data: unknown, {rejectWithValue}) => {
    try {
      const res = await AuthenticateService.Login(data);
      await Token.saveToken(res.data);
      return res;
    } catch (err) {
      throw rejectWithValue(err);
    }
  },
);

export const logout = createAsyncThunk('authen/logout', async () => {
  try {
    await Token.removeToken();
  } catch (err) {}
});

const authenticateSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
      })

      .addCase(checkToken.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
      })

      .addMatcher<PendingAction>(
        action => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true;
        },
      )
      .addMatcher<FulfilledAction>(
        action => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.loading = false;
        },
      )
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
        },
      );
  },
});

const authenticateReducer = authenticateSlice.reducer;

export default authenticateReducer;
