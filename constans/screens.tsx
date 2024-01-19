type BaseScreenObject = {
  KEY: string;
  NAME: string;
};

export const SCREENS: {[key: string]: BaseScreenObject} = {
  LOGIN: {KEY: 'LoginScreen', NAME: 'Đăng nhập'},
  MAIN: {KEY: 'MainScreen', NAME: 'Main'},
  HOME: {KEY: 'HomeScreen', NAME: 'Trang chủ'},
  PROFILE: {KEY: 'ProfileScreen', NAME: 'Tài khoản'},
  WORK: {KEY: 'WorkScreen', NAME: 'Công việc'},
  NOTIFICATION: {KEY: 'NotificationScreen', NAME: 'Thông báo'},
};
