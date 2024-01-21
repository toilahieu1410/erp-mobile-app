import {BaseResponse} from '../models/BaseResponse';
import {Token} from '../services/Token';

import http from '../../store/http';

const AuthenticateService = {
  async Login(data: unknown): Promise<BaseResponse<Token>> {
    const url = `/api/Authentication/Login`;
    try {
      const res = await http.post(url, data);
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw err.response.data;
    }
  },

  async GetUser() {
    const url = `/api/Authentication/GetUser`;
    try {
      const res = await http.get(url);
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw err.response.data;
    }
  },

  async GetToken(): Promise<Token | null> {
    try {
      const loadedToken = await Token.getToken();
      return loadedToken;
    } catch (error) {
      throw error;
    }
  },
  async CheckToken() {
    const token = await Token.getToken();
    if (token) {
      const expireAccessToken = token?.expireAccessToken;
      const expireAccessTokenDate = new Date(expireAccessToken);

      const expireRefreshToken = token?.expireRefreshToken;
      const expireRefreshTokenDate = new Date(expireRefreshToken);

      const currentDate = new Date();

      if (
        currentDate > expireAccessTokenDate &&
        currentDate > expireRefreshTokenDate
      ) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  },
};

export default AuthenticateService;
