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
      await AsyncStorage.setItem('token', JSON.stringify(token));
    } catch (error) {}
  }

  // Static method to load tokens from SecureStore
  static async getToken(): Promise<Token | null> {
    try {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        const parsedToken = JSON.parse(storedToken);
        return new Token(
          parsedToken.accessToken,
          parsedToken.expireAccessToken,
          parsedToken.refreshToken,
          parsedToken.expireRefreshToken,
          parsedToken.value,
        );
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
      await AsyncStorage.removeItem('token');
    } catch (error) {}
  }
}
