import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  name: string;
  // Các trường khác nếu cần
}

export class Token {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  value: any;

  constructor(
    accessToken: string,
    refreshToken: string,
    refreshTokenExpiryTime: string,
    value: any,
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.refreshTokenExpiryTime = refreshTokenExpiryTime;
    this.value = value;
  }

  static async saveToken(token: Token) {
    try {
      if (token.accessToken) {
        await AsyncStorage.setItem('accessToken', token.accessToken);
      }
      if (token.refreshToken) {
        await AsyncStorage.setItem('refreshToken', token.refreshToken);
      }
      if (token.refreshTokenExpiryTime) {  // Chỉ lưu nếu giá trị tồn tại
        await AsyncStorage.setItem('refreshTokenExpiryTime', token.refreshTokenExpiryTime);
      }
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
      const refreshTokenExpiryTime = await AsyncStorage.getItem('refreshTokenExpiryTime');
      if (accessToken && refreshToken && refreshTokenExpiryTime) {
        return new Token(accessToken, refreshToken, refreshTokenExpiryTime, {});
      } else {
        return null; // Không tìm thấy token
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
      await AsyncStorage.removeItem('refreshTokenExpiryTime');
    } catch (error) {
      console.error('Không thể xóa token', error);
    }
  }
}
