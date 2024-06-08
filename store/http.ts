import axios, {AxiosInstance} from 'axios';
import {Token} from '../src/services/Token';
import {BaseResponse} from '../src/models/BaseResponse';
import {API_BASE_URL} from '../src/constants/base';
import { SCREENS } from '../src/constants/screens';
import { navigate } from './navigationRef';
import { store } from './store';
import { logout } from '../src/slice/Auth';

class Http {
  instance: AxiosInstance;
  isRefreshing: boolean = false;
  failedQueue: any[] = [];

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.request.use(
      async config => {
        const token = await Token.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token.accessToken}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

      this.instance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise(function (resolve, reject) {
              this.failedQueue.push({ resolve, reject });
            }).then(token => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return axios(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          const refreshToken = await this.GetRefreshToken();
          if (refreshToken) {
            try {
              const { value } = await this.RefreshToken(refreshToken);
              await Token.saveToken(value);
              originalRequest.headers['Authorization'] = 'Bearer ' + value.accessToken;
              this.isRefreshing = false;
              this.onRefreshed(value.accessToken);
              return axios(originalRequest);
            } catch (err) {
              this.isRefreshing = false;
              this.failedQueue = [];
              navigate(SCREENS.LOGIN.KEY)
              store.dispatch(logout())
              return Promise.reject(err);
            }
          } else {
            navigate(SCREENS.LOGIN.KEY)
            store.dispatch(logout())
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async RefreshToken(refreshToken: string): Promise<BaseResponse<Token>> {
    console.log('Refreshing token with refresh token:', refreshToken);
    const url = `/token/refresh`; // Endpoint API refresh token mới
    const data = { refreshToken };
    const res = await this.instance.post(url, data);
    console.log('Token refreshed successfully:', res.data);
    return res.data;
  }

  async GetRefreshToken() {
    try {
      const token = await Token.getToken();
      if (token) {
        const expireRefreshToken = token?.expireRefreshToken;
        const expireRefreshTokenDate = new Date(expireRefreshToken);
        const currentDate = new Date();
        if (currentDate > expireRefreshTokenDate) {
          return null;
        }
        return token.refreshToken;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  onRefreshed(token: string) {
    this.failedQueue.forEach(prom => {
      prom.resolve(token);
    });
    this.failedQueue = [];
  }
}

const http = new Http().instance;

export default http;
