type BaseScreenObject = {
  KEY: string;
  NAME: string;
};

export const SCREENS: {[key: string]: BaseScreenObject} = {
  LOGIN: {KEY: 'LoginScreen', NAME: 'Đăng nhập'},
  MAIN: {KEY: 'MainScreen', NAME: 'Main'},

  // =========================== Home ==========================================

  HOME: {KEY: 'HomeScreen', NAME: 'Bảng tin'},
  HOMESTACK: {KEY: 'HomeStackScreen', NAME: 'Bảng tin'},

  // =========================== Công việc ==========================================

  WORK: {KEY: 'WorkScreen', NAME: 'Công việc'},

  // =========================== thông báo ==========================================

  NOTIFICATION: {KEY: 'NotificationScreen', NAME: 'Thông báo'},

  //============================== Tài khoản =======================================
  ACCOUNTSTACK: {KEY: 'AccountStackScreen', NAME: 'Tài khoản'},
  ACCOUNT: {KEY: 'AccountScreen', NAME: 'Tài khoản'},

  INFORACCOUNT: {KEY: 'InforAccountScreen', NAME: 'Thông tin tài khoản'},
  CHANGEPASSWORD: {KEY: 'ChangePasswordScreen', NAME: 'Đổi mật khẩu'},
};
