import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AuthenticateService} from '../services/Auth';
import {FulfilledAction, PendingAction, RejectedAction} from '../type';
import {BaseResponse} from '../models/BaseResponse';
import {Token} from '../services/Token';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean | null;
  user: any;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: null,
  user: {},
  error: null
};

export const checkToken = createAsyncThunk<boolean>(
  'auth/checkToken',
  async (_, {rejectWithValue}) => {
    try {
      const token = await Token.getToken();
      if (token) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return rejectWithValue('Error checking token')
    }
  },
);

export const login = createAsyncThunk<BaseResponse<Token>, {username: string; password: string}>(
  'auth/login',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AuthenticateService.Login(data)
      await Token.saveToken(response.value)
      console.log(response,'ádasdas')
      return response
    } catch (err) {
      throw rejectWithValue(err);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await Token.removeToken();
    return true
  } catch (err) {
    throw err
  }
});


export const checkLogin = createAsyncThunk<boolean>(
  'auth/checkLogin',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.value;
    })
    .addCase(login.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
    })
    .addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
    })
    .addCase(logout.rejected, (state, action) => {
      state.error = action.error.message || null;
    })
    .addCase(checkLogin.pending, (state) => {
      state.loading = true;
    })
    .addCase(checkLogin.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload;
      state.loading = false;
    })
    .addCase(checkLogin.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
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



export default authSlice.reducer;
