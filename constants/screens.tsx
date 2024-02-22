interface BaseScreenObject {
  KEY: string;
  NAME: string;
}

export const SCREENS: {[key: string]: BaseScreenObject} = {
  LOGIN: {KEY: 'LoginScreen', NAME: 'Đăng nhập'},
  MAIN: {KEY: 'MainScreen', NAME: 'Main'},

  // =========================== Home ==========================================

  HOME: {KEY: 'HomeScreen', NAME: 'Bảng tin'},
  HOMEDETAIL: {KEY: 'HomeDetailScreen', NAME: 'Chi tiết bảng tin'},
  HOMESTACK: {KEY: 'HomeStackScreen', NAME: 'Bảng tin'},

  // =========================== Công việc ==========================================

  TASKSTACK: {KEY: 'TaskStackScreen', NAME: 'Lịch công việc'},
  TASK: {KEY: 'TaskScreen', NAME: 'Lịch công việc'},
  SEARCHTASK: {KEY: 'SearchTaskScreen', NAME: 'Tìm kiếm công việc cần làm'},
  ADDNEWTASK: {KEY: 'AddNewTaskScreen', NAME: 'Thêm mới công việc'},
  DETAILTASK: {KEY: 'DetailTaskScreen', NAME: 'Chi tiết công việc'},
  TASK_LIST: {KEY: 'TaskListScreen', NAME: 'Danh sách công việc'},

  // =========================== thông báo ==========================================

  NOTIFICATION: {KEY: 'NotificationScreen', NAME: 'Thông báo'},

  //============================== Tài khoản =======================================
  ACCOUNTSTACK: {KEY: 'AccountStackScreen', NAME: 'Tài khoản'},
  ACCOUNT: {KEY: 'AccountScreen', NAME: 'Tài khoản'},

  INFORACCOUNT: {KEY: 'InforAccountScreen', NAME: 'Thông tin tài khoản'},
  CHANGEPASSWORD: {KEY: 'ChangePasswordScreen', NAME: 'Đổi mật khẩu'},
  ATTENDANCESHEET: {KEY: 'AttendanceSheetScreen', NAME: 'Bảng chấm công'},

  PAYROLL: {KEY: 'PayRollScreen', NAME: 'Bảng lương'},
};
