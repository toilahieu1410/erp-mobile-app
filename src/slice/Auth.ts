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

const tokenKey = 'token'

export const checkToken = createAsyncThunk<boolean>(
  'auth/checkToken',
  async (_, {rejectWithValue}) => {
    try {
      const token = await Token.getToken();

      if(token) {
        return true
      } else {
        return false
      }
      // Code này để điều kiện mỗi khi mở lại app sẽ auto về form đăng nhập
      // if (token) {
      //   const expireAccessToken = new Date(token.expireAccessToken).getTime();
      //   const expireRefreshToken = new Date(token.expireRefreshToken).getTime();
      //   if (now < expireAccessToken || now < expireRefreshToken) {
      //     return true;
      //   } else {
      //     await Token.removeToken();
      //     return false;
      //   }
      // } else {
      //   return false;
      // }
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
      const tokenData = new Token(
        response.value.accessToken,
        '',
        response.value.refreshToken,
        '',
        response.value
      );
 
      console.log('Token data to save:', tokenData.accessToken);
      await Token.saveToken(tokenData);
      return response
    } catch (err) {
      throw rejectWithValue(err);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const token = await Token.getToken();

    if (token) {
      try {
        await AuthenticateService.RevokeToken(token.accessToken, token.refreshToken);
        console.log('Token revoked');
      } catch (revokeError) {
        console.error('Error revoking token:', revokeError);
        // Không làm gì thêm ở đây, vì vẫn cần xóa token và điều hướng về màn hình đăng nhập
      }
    }

    await Token.removeToken();
    await AsyncStorage.removeItem('accessToken');
    console.log('Token removed and logout key removed');
    return true;

  } catch (error) {
    console.error('Logout error:', error);
    return rejectWithValue({
      error: {
        code: 'LOGOUT_ERROR',
        message: error.message || 'Unknown error occurred',
      },
    });
  }
});


export const checkLogin = createAsyncThunk<boolean>(
  'auth/checkLogin',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem(tokenKey);
 

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
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    }
  },
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
    .addCase(checkToken.pending, (state) => {
      state.loading = true;
    })
    .addCase(checkToken.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload;
      state.loading = false;
    })
    .addCase(checkToken.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
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
