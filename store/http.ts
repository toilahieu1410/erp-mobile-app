import axios, {AxiosInstance} from 'axios';
import {Token} from '../src/services/Token';
import {BaseResponse} from '../src/models/BaseResponse';
import {API_BASE_URL} from '../constants/base';

class Http {
  instance: AxiosInstance;
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
        config.headers.Authorization = `Bearer ${token?.accessToken}`;
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const refreshToken = await this.GetRefreshToken();
        if (error.response && error.response.status === 401 && refreshToken) {
          try {
            await this.RefreshToken(refreshToken).then(async data => {
              await Token.saveToken(data.data);
              const config = error.config;
              config.headers.Authorization = `Bearer ${data.data.accessToken}`;
              return axios(config);
            });
          } catch (error) {
            return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
      },
    );
  }

  async RefreshToken(refreshToken: string): Promise<BaseResponse<Token>> {
    const data = {
      token: refreshToken,
    };
    const url = `/api/Authentication/GetAccessToken`;
    try {
      const res = await this.instance.post(url, data);
      return res.data;
    } catch (err: unknown) {
      // @ts-ignore
      throw err?.response.data;
    }
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
}

const http = new Http().instance;

export default http;
