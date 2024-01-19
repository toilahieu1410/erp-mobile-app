import AsyncStorage from '@react-native-async-storage/async-storage';

export class Token {
  accessToken: string;
  expireAccessToken: string;
  refreshToken: string;
  expireRefreshToken: string;
  data: any;

  constructor(
    accessToken: string,
    expireAccessToken: string,
    refreshToken: string,
    expireRefreshToken: string,
    data: any,
  ) {
    this.accessToken = accessToken;
    this.expireAccessToken = expireAccessToken;
    this.refreshToken = refreshToken;
    this.expireRefreshToken = expireRefreshToken;
    this.data = data;
  }

  static async saveToken(token: Token) {
    try {
      await AsyncStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
      console.error('Error saving token:', error);
    }
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
          parsedToken.data,
        );
      } else {
        return null; // No token found
      }
    } catch (error) {
      console.error('Error loading token:', error);
      return null;
    }
  }

  static async removeToken() {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  }
}
