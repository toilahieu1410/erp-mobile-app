import {BaseResponse} from '../models/BaseResponse';
import {Token} from '../services/Token';
import http from '../../store/http';

export const AuthenticateService = {
  
  async Login(data: {username: string; password: string}): Promise<BaseResponse<Token>> {
    const response = await http.post('/auth', data)
    return response.data
  },

  async Logout(accessToken: string): Promise<void> {
    const url = `/user/logout`
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    await http.post(url, {}, { headers });
  },

  async GetUser(): Promise<BaseResponse<any>> {
    const token = await Token.getToken();
    if (token) {
      const response = await http.get('/user/get_user', {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        }
      });
      return response.data;
    }
    throw new Error('Token không tồn tại');
  },

  async UpdateUser(id: string, data: any): Promise<BaseResponse<any>> {
    const token = await Token.getToken()
    if(token) {
      const response = await http.put(`/user/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      return response.data
    }
    throw new Error('Token không tồn tại')
  },
  // async UpdateAvatar(avatarUrl: string): Promise<BaseResponse<any>> {
  //   const token = await Token.getToken()
  //   if(token) {
  //     const response = await http.post()
  //   }
  // }
  // async GetUser() {
  //   const url = `/api/Authentication/GetUser`;
  //   try {
  //     const res = await http.get(url);
  //     return res.data;
  //   } catch (err: any) {
  //     throw err.response.data;
  //   }
  // },

  async RevokeToken(accessToken: string, refreshToken: string): Promise<void> {
    const url = `/token/revoke`
    const data = {accessToken, refreshToken}
    const response = await http.post(url, data)
    return response.data
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
