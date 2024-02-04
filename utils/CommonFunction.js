export const fomatNumber = number => {
  if (number == undefined || number == null) {
    return 0;
  } else {
    return number.toLocaleString('en-US'); // Định dạng số với dấu phẩy
  }
};
