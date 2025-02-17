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
  EDIT_ACCOUNT: {KEY: 'EditAccountScreen', NAME: 'Cập nhật tài khoản'},
  INFOACCOUNT: {KEY: 'InfoAccountScreen', NAME: 'Thông tin tài khoản'},
  CHANGEPASSWORD: {KEY: 'ChangePasswordScreen', NAME: 'Đổi mật khẩu'},

  CHECKIN_WFH: {KEY: 'CheckInWFHScreen', NAME: 'Chấm công WFH'},

  PAYROLL: {KEY: 'PayRollScreen', NAME: 'Bảng lương'},

  //============================== Các loại đơn, đề nghị =======================================
  //Xac nhan

  TAO_DON_XAC_NHAN: {KEY: 'CreateConfirm', NAME: 'Tạo đơn xác nhận'},
  LIST_DON_XAC_NHAN: {KEY: 'ListConfirm', NAME: 'Danh sách đơn xác nhận'},
  SEARCH_DON_XAC_NHAN: {KEY: 'SearchConfirm', NAME: 'Tìm kiếm đơn xác nhận'},
  // DETAIL_XAC_NHAN: {KEY: 'ItemDetailConfirm', NAME: 'Chi tiết đơn Xác nhận'},
  EDIT_XAC_NHAN: {KEY: 'EditConfirm', NAME: 'Sửa đơn xác nhận'},
  
  //Nghi phep
  TAO_DON_NGHI_PHEP: {KEY: 'CreateTakeLeave', NAME: 'Tạo đơn nghỉ phép'},
  LIST_DON_NGHI_PHEP: {KEY: 'ListTakeLeave', NAME: 'Danh sách đơn nghỉ phép'},
  SEARCH_DON_NGHI_PHEP: {KEY: 'SearchTakeLeave', NAME: 'Tìm kiếm đơn nghỉ phép'},
  EDIT_NGHI_PHEP: {KEY: 'EditTakeLeave', NAME: 'Sửa đơn nghỉ phép'},

  //work from home
  CREATE_WORK_FROM_HOME: {KEY: 'CreateWorkFromHome', NAME: 'Tạo đơn làm việc tại nhà'},
  // WORK_FROM_HOME: {KEY: 'WorkFromHomeScreen', NAME: 'Xin làm việc tại nhà'},
  LIST_WORK_FROM_HOME: {KEY: 'ListWorkFromHome', NAME: 'Danh sách đơn làm tại nhà'},
  SEARCH_WORK_FROM_HOME: {KEY: 'SearchWorkFromHome', NAME: 'Tìm kiếm đơn làm tại nhà'},
  EDIT_WORK_FROM_HOME: {KEY: 'EditWorkFromHome', NAME: 'Sửa đơn làm tại nhà'},

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

export const ICON_INFO_ACCOUNT = {
  AVATAR_ICON: require('../assets/images/icon/avatar.png'),
  CONTACTINFO_ICON: require('../assets/images/icon/contact-info.png'),
  PORTFOLIO_ICON: require('../assets/images/icon/portfolio.png'),
}