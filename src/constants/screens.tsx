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
  EDITTASK: {KEY: 'EditTask', NAME: 'Sửa công việc'},

  // =========================== thông báo ==========================================

  NOTIFICATION: {KEY: 'NotificationScreen', NAME: 'Thông báo'},

  //============================== Tài khoản =======================================
  ACCOUNTSTACK: {KEY: 'AccountStackScreen', NAME: 'Tài khoản'},
  ACCOUNT: {KEY: 'AccountScreen', NAME: 'Tài khoản'},

  INFORACCOUNT: {KEY: 'InforAccountScreen', NAME: 'Thông tin tài khoản'},
  CHANGEPASSWORD: {KEY: 'ChangePasswordScreen', NAME: 'Đổi mật khẩu'},

  CHECKIN_WFH: {KEY: 'CheckInWFHScreen', NAME: 'Chấm công WFH'},

  PAYROLL: {KEY: 'PayRollScreen', NAME: 'Bảng lương'},

  //============================== Các loại đơn, đề nghị =======================================
  //Xac nhan
  XIN_XAC_NHAN: {KEY: 'ConfirmScreen', NAME: 'Xin Xác nhận'},

  DETAIL_XAC_NHAN: {KEY: 'ItemDetailConfirm', NAME: 'Chi tiết đơn Xác nhận'},

  //Nghi phep
  XIN_NGHI_PHEP: {KEY: 'TakeLeaveScreen', NAME: 'Xin nghỉ phép'},

  DETAIL_NGHI_PHEP: {KEY: 'ItemDetailTakeLeave', NAME: 'Chi tiết đơn nghỉ phép'},

  //work from home
  WORK_FROM_HOME: {KEY: 'WorkFromHomeScreen', NAME: 'Xin làm việc tại nhà'},

    //đề nghị thanh toán thường
  OFFERPAYMENTS: {KEY: 'OfferPaymentsScreen', NAME: 'Đề nghị thanh toán thường'},

};


export const COLORS = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  PRIMARY: '#027BE3',
  GRAY: 'gray',
  RED: 'Red',
};

export const IMAGES = {
  HOME: require('../assets/images/navigator/home.png'),
  USER: require('../assets/images/navigator/user.png'),
  NOTIFICATION: require('../assets/images/navigator/notify.png'),
  TASK: require('../assets/images/navigator/work.png'),
  SEARCH: require('../assets/images/app/search.png'),
  DOLLAR: require('../assets/images/app/dollar.png'),
  SPLASHSCREEN: require('../assets/images/splash.jpg'),
  CLOCKCHECK: require('../assets/images/app/clock-check.png'),
  ADD_TO_DO_LIST: require('../assets/images/app/add-to-do-list.png'),
  OVERVIEW_TO_DO: require('../assets/images/app/overview-to-do.png'),
  TO_DO_LIST: require('../assets/images/app/to-do-list.png'),
  SET_TEXT_COLOR: require('../assets/images/app/setTextColor.png'),
  FILL_COLOR: require('../assets/images/app/fillColor.png'),
  WFH: require('../assets/images/app/work-from-home.png'),
  SCHEDULE: require('../assets/images/app/schedule.png'),
  WARNING: require('../assets/images/app/warning.png'),
  MENU: require('../assets/images/navigator/menu.png'),
};
