import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  name: string;
  // Các trường khác nếu cần
}

export class Token {
  accessToken: string;
  expireAccessToken: string;
  refreshToken: string;
  expireRefreshToken: string;
  value: any;

  constructor(
    accessToken: string,
    expireAccessToken: string,
    refreshToken: string,
    expireRefreshToken: string,
    value: any,
  ) {
    this.accessToken = accessToken;
    this.expireAccessToken = expireAccessToken;
    this.refreshToken = refreshToken;
    this.expireRefreshToken = expireRefreshToken;
    this.value = value;
  }

  static async saveToken(token: Token) {
    try {
      await AsyncStorage.setItem('accessToken', token.accessToken);
      await AsyncStorage.setItem('refreshToken', token.refreshToken);
      console.log('Token đã được lưu:', token);
    } catch (error) {
      console.error('Không thể lưu token', error);
    }
  }

  // Static method to load tokens from SecureStore
  static async getToken(): Promise<Token | null> {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        return new Token(accessToken, '', refreshToken, '', {});
      } else {
        return null; // No token found
      }
    } catch (error) {
      return null;
    }
  }

  static async getDecodeToken(): Promise<DecodedToken | null> {
    try {
      const storedToken = await AsyncStorage.getItem('token'); 
      if(storedToken) {
        const parsedToken = JSON.parse(storedToken);
        const decoded: DecodedToken = jwtDecode(parsedToken.accessToken);
        return decoded;
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }

  static async removeToken() {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
    } catch (error) {}
  }
}
